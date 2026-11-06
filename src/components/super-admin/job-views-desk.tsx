import Link from "next/link";
import { jobIsExpiredOpen, JOB_VIEWS_SORTS, type JobViewsSort } from "@/domains/analytics/job-views";
import type { CatalogItem, SuperAdminSnapshot } from "@/domains/analytics/super-admin-catalog";
import { contentKindToParam } from "@/lib/analytics/engagement-events";
import { CANONICAL_SITE_URL } from "@/lib/canonical-site";
import { DESK_PAGE_SIZE, deskHref } from "@/lib/super-admin/desk-return";
import { DeskCopyButton } from "./desk-copy-button";
import { DeskDisclosure, DeskLookup, DeskPager, DeskSegments } from "./desk-queue";
import { deskGhostButton, statusPill } from "./desk-ui";

const numberFormat = new Intl.NumberFormat("en-IN");
const PATH = "/super-admin";

function formatCount(value: number): string {
  return numberFormat.format(value);
}

function formatWhen(value: Date | null | undefined): string {
  if (!value) return "—";
  return value.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function sortLabel(sort: JobViewsSort): string {
  if (sort === "readers") return "Most readers";
  if (sort === "calls") return "Most calls";
  if (sort === "whatsapp") return "Most WhatsApp";
  if (sort === "newest") return "Newest";
  if (sort === "quiet") return "Quiet open roles";
  return "Busiest 7 days";
}

function jobViewsHref(
  snapshot: SuperAdminSnapshot,
  extra: Record<string, string | number | undefined>,
): string {
  const jv = snapshot.jobViews;
  return deskHref(PATH, {
    desk: "jobs",
    status: extra.status !== undefined ? extra.status : jv.status === "all" ? undefined : jv.status,
    kind: extra.kind !== undefined ? extra.kind : jv.kind === "all" ? undefined : jv.kind,
    sort: extra.sort !== undefined ? extra.sort : jv.sort === "heat" ? undefined : jv.sort,
    q: extra.q !== undefined ? extra.q : snapshot.query || undefined,
    page: extra.page,
  });
}

function Metric({ value, sub }: { value: number; sub?: string }) {
  return (
    <span className="tabular-nums">
      {formatCount(value)}
      {sub ? <span className="block text-[11px] text-zinc-500">{sub}</span> : null}
    </span>
  );
}

function JobViewsRow({ item }: { item: CatalogItem }) {
  const expired = jobIsExpiredOpen(item);
  const publicUrl = `${CANONICAL_SITE_URL}${item.href}`;
  const chartHref = `/super-admin/${contentKindToParam(item.kind)}/${encodeURIComponent(item.slug)}`;
  const legacy = item.legacyReaders ?? 0;
  const status = expired ? "expired" : item.status;

  return (
    <DeskDisclosure
      summary={
        <span className="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-[minmax(0,1.6fr)_5.5rem_4.5rem_4.5rem_4.5rem_4.5rem] sm:items-center">
          <span className="col-span-2 min-w-0 sm:col-span-1">
            <span className="block font-medium">{item.title}</span>
            <span className="mt-0.5 line-clamp-2 block text-xs text-zinc-600 dark:text-zinc-400">
              {item.kindLabel}
              {item.detail ? ` · ${item.detail}` : ""}
            </span>
          </span>
          <span className={statusPill(status)}>{status}</span>
          <Metric value={item.views} sub={`${formatCount(item.views7d)} in 7 days`} />
          <Metric
            value={item.uniqueReaders}
            sub={legacy > 0 && item.uniqueReaders > item.views ? "includes older counter" : undefined}
          />
          <Metric
            value={item.callClicks}
            sub={`${formatCount(item.callClicks7d ?? 0)} in 7 days`}
          />
          <Metric
            value={item.whatsappClicks}
            sub={`${formatCount(item.whatsappClicks7d ?? 0)} in 7 days`}
          />
        </span>
      }
      actions={
        <>
          <a href={item.href} className={deskGhostButton} target="_blank" rel="noopener noreferrer">
            Open
          </a>
          <Link href={chartHref} className={deskGhostButton}>
            Chart
          </Link>
          {item.postingId ? (
            <Link href={`/super-admin/jobs/${item.postingId}`} className={deskGhostButton}>
              Edit
            </Link>
          ) : null}
          <DeskCopyButton value={publicUrl} label="Copy URL" />
        </>
      }
    >
      <dl className="grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="font-semibold uppercase tracking-wide text-zinc-500">Slug</dt>
          <dd className="mt-0.5 break-all">{item.slug}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wide text-zinc-500">Employer / area</dt>
          <dd className="mt-0.5">{item.detail || "—"}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wide text-zinc-500">Published</dt>
          <dd className="mt-0.5">{formatWhen(item.when)}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wide text-zinc-500">Valid through</dt>
          <dd className="mt-0.5">{formatWhen(item.validThrough ?? null)}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wide text-zinc-500">Readers</dt>
          <dd className="mt-0.5">
            {formatCount(item.uniqueReaders)} unique
            {legacy ? ` · older counter ${formatCount(legacy)}` : ""}
          </dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wide text-zinc-500">Public page</dt>
          <dd className="mt-0.5 break-all">{publicUrl}</dd>
        </div>
      </dl>
    </DeskDisclosure>
  );
}

export function JobViewsDesk({ snapshot }: { snapshot: SuperAdminSnapshot }) {
  const jv = snapshot.jobViews;
  const rangeStart = jv.matched === 0 ? 0 : (jv.page - 1) * DESK_PAGE_SIZE + 1;
  const rangeEnd = jv.matched === 0 ? 0 : rangeStart + snapshot.items.length - 1;
  const contactRate =
    jv.readers > 0 ? Math.round((jv.contactClicks / jv.readers) * 1000) / 10 : null;
  const exportHref = deskHref("/super-admin/job-views/export", {
    status: jv.status === "all" ? undefined : jv.status,
    kind: jv.kind === "all" ? undefined : jv.kind,
    sort: jv.sort === "heat" ? undefined : jv.sort,
    q: snapshot.query || undefined,
  });

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">All posts in this desk</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <a href={exportHref} className="underline">
            Export CSV
          </a>
          <Link href="/super-admin/jobs" className="underline">
            Job listings
          </Link>
        </div>
      </div>
      <p className="max-w-3xl text-xs text-zinc-600 dark:text-zinc-400">
        Click a row to open slug, dates, and the older reader counter. Open, Chart, Edit, and Copy
        URL sit beside the row. Quiet open roles have readers and no call or WhatsApp click.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Open roles</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{formatCount(jv.openRoles)}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Readers</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{formatCount(jv.readers)}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Quiet open</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{formatCount(jv.quietOpen)}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Contact rate</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">
            {contactRate == null ? "—" : `${contactRate}%`}
          </p>
          <p className="mt-1 text-xs text-zinc-500">Calls + WhatsApp against readers</p>
        </div>
      </div>

      {jv.worthQuiet.length || jv.worthExpired.length ? (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          <p className="font-medium">Worth a look</p>
          {jv.worthQuiet.length ? (
            <p className="mt-1">
              Quiet open:{" "}
              {jv.worthQuiet.map((item, i) => (
                <span key={item.slug}>
                  {i ? ", " : ""}
                  <Link
                    href={`/super-admin/${contentKindToParam(item.kind)}/${encodeURIComponent(item.slug)}`}
                    className="underline"
                  >
                    {item.title}
                  </Link>
                </span>
              ))}
              {" · "}
              <Link href={jobViewsHref(snapshot, { sort: "quiet", status: "open", page: undefined })} className="underline">
                Sort quiet
              </Link>
            </p>
          ) : null}
          {jv.worthExpired.length ? (
            <p className="mt-1">
              Expired still marked open:{" "}
              {jv.worthExpired.map((item, i) => (
                <span key={item.slug}>
                  {i ? ", " : ""}
                  {item.title}
                </span>
              ))}
              {" · "}
              <Link href="/super-admin/jobs?status=expired" className="underline">
                Close expired
              </Link>
            </p>
          ) : null}
        </div>
      ) : null}

      <DeskSegments
        items={[
          { href: jobViewsHref(snapshot, { status: "", page: undefined }), label: "All", count: jv.counts.all, active: jv.status === "all" },
          { href: jobViewsHref(snapshot, { status: "open", page: undefined }), label: "Open", count: jv.counts.open, active: jv.status === "open" },
          { href: jobViewsHref(snapshot, { status: "expired", page: undefined }), label: "Expired", count: jv.counts.expired, active: jv.status === "expired" },
          { href: jobViewsHref(snapshot, { status: "closed", page: undefined }), label: "Closed", count: jv.counts.closed, active: jv.status === "closed" },
          { href: jobViewsHref(snapshot, { status: "draft", page: undefined }), label: "Draft", count: jv.counts.draft, active: jv.status === "draft" },
        ]}
      />
      <DeskSegments
        items={[
          { href: jobViewsHref(snapshot, { kind: "", page: undefined }), label: "Jobs + seekers", count: jv.counts.all, active: jv.kind === "all" },
          { href: jobViewsHref(snapshot, { kind: "job", page: undefined }), label: "Jobs", count: jv.counts.job, active: jv.kind === "job" },
          {
            href: jobViewsHref(snapshot, { kind: "job_seeker", page: undefined }),
            label: "Looking for work",
            count: jv.counts.job_seeker,
            active: jv.kind === "job_seeker",
          },
        ]}
      />

      <form method="get" action={PATH} className="flex flex-wrap items-center gap-2">
        <input type="hidden" name="desk" value="jobs" />
        {jv.status !== "all" ? <input type="hidden" name="status" value={jv.status} /> : null}
        {jv.kind !== "all" ? <input type="hidden" name="kind" value={jv.kind} /> : null}
        {snapshot.query ? <input type="hidden" name="q" value={snapshot.query} /> : null}
        <label className="text-xs text-zinc-500" htmlFor="job-views-sort">
          Sort
        </label>
        <select
          id="job-views-sort"
          name="sort"
          defaultValue={jv.sort}
          className="rounded-lg border border-zinc-300 bg-white px-2 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          {JOB_VIEWS_SORTS.map((sort) => (
            <option key={sort} value={sort}>
              {sortLabel(sort)}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Apply
        </button>
      </form>

      <DeskLookup
        action={PATH}
        status={jv.status === "all" ? undefined : jv.status}
        q={snapshot.query}
        placeholder="Title, employer, area, or slug"
        rangeLabel={`${rangeStart}–${rangeEnd} of ${jv.matched}`}
        hidden={{
          desk: "jobs",
          kind: jv.kind === "all" ? undefined : jv.kind,
          sort: jv.sort === "heat" ? undefined : jv.sort,
        }}
      />

      {snapshot.items.length === 0 ? (
        <p className="rounded-xl border border-zinc-200 bg-white px-3 py-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
          No posts match this view.
        </p>
      ) : (
        <ul className="space-y-2">
          {snapshot.items.map((item) => (
            <JobViewsRow key={`${item.kind}:${item.slug}`} item={item} />
          ))}
        </ul>
      )}

      <DeskPager
        page={jv.page}
        pageCount={jv.pageCount}
        prevHref={
          jv.page > 1 ? jobViewsHref(snapshot, { page: jv.page - 1 }) : null
        }
        nextHref={
          jv.page < jv.pageCount ? jobViewsHref(snapshot, { page: jv.page + 1 }) : null
        }
      />
    </div>
  );
}
