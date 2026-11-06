import Link from "next/link";
import { setJobCallFollowed } from "@/app/admin/jobs/actions";
import { DeskActionForm } from "@/components/super-admin/desk-action-form";
import {
  DeskDisclosure,
  DeskLookup,
  DeskNotice,
  DeskPager,
  DeskSegments,
} from "@/components/super-admin/desk-queue";
import { DeskPageHeader, deskGhostButton } from "@/components/super-admin/desk-ui";
import {
  loadJobCallDesk,
  type JobCallDeskSegment,
} from "@/domains/jobs/call-reveals-admin";
import { formatIndianMobile } from "@/lib/classifieds/phone-gate";
import {
  CHENNAI_JOBS_HUB_PATH,
  CHENNAI_JOBS_LOOKING_PATH,
  chennaiJobsDetailPath,
} from "@/lib/routes/chennai-jobs";
import { formatDeskStamp } from "@/lib/super-admin/desk-format";
import { deskHref } from "@/lib/super-admin/desk-return";

export const dynamic = "force-dynamic";

const PATH = "/super-admin/job-call-requests";
const SEGMENTS = [
  { id: "new", label: "New" },
  { id: "followed", label: "Followed up" },
  { id: "all", label: "All" },
] as const;

function parseSegment(raw: string | undefined): JobCallDeskSegment {
  if (raw && SEGMENTS.some((item) => item.id === raw)) return raw as JobCallDeskSegment;
  return "new";
}

function noticeText(code: string | undefined): string | null {
  if (code === "followed") return "Marked followed up.";
  if (code === "cleared") return "Cleared. It is back in New.";
  return null;
}

export default async function JobCallRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string; notice?: string }>;
}) {
  const params = await searchParams;
  const segment = parseSegment(params.status);
  const q = (params.q ?? "").trim();
  let desk: Awaited<ReturnType<typeof loadJobCallDesk>>;
  try {
    desk = await loadJobCallDesk({ segment, q, pageRaw: params.page });
  } catch (err) {
    const message = err instanceof Error ? err.message : "db error";
    const missingTable = /job_phone_reveals|does not exist/i.test(message);
    return (
      <p className="p-4 text-sm text-red-700">
        Could not load job call requests.{" "}
        {missingTable
          ? "Apply drizzle/0018_job_phone_reveals.sql on production before using this desk."
          : message}
      </p>
    );
  }
  const returnTo = deskHref(PATH, {
    status: segment,
    q: q || undefined,
    page: desk.page > 1 ? desk.page : undefined,
  });
  const rangeStart = desk.total === 0 ? 0 : (desk.page - 1) * 40 + 1;
  const rangeEnd = desk.total === 0 ? 0 : rangeStart + desk.rows.length - 1;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6">
      <DeskPageHeader
        title="Job call requests"
        lede="Mobile numbers saved when someone unlocks the Call button on a job or looking-for-work profile."
      />
      <DeskNotice notice={noticeText(params.notice)} error={null} />
      <DeskSegments
        items={SEGMENTS.map((item) => ({
          href: deskHref(PATH, { status: item.id, q: q || undefined }),
          label: item.label,
          count: desk.counts[item.id] ?? 0,
          active: item.id === segment,
        }))}
      />
      <DeskLookup
        action={PATH}
        status={segment}
        q={q}
        placeholder="Mobile or listing title"
        rangeLabel={`${rangeStart}–${rangeEnd} of ${desk.total}`}
      />
      <ul className="space-y-2">
        {desk.rows.length === 0 ? (
          <li className="text-sm text-zinc-600">No requests in this segment.</li>
        ) : (
          desk.rows.map((row) => {
            const listingHref =
              row.source === "job_seeker"
                ? `${CHENNAI_JOBS_LOOKING_PATH}/${encodeURIComponent(row.slug)}`
                : chennaiJobsDetailPath(row.slug);
            const sourceLabel = row.source === "job_seeker" ? "Seeker" : "Job";
            return (
              <DeskDisclosure
                key={`${row.source}-${row.id}`}
                summary={
                  <span className="grid gap-1 sm:grid-cols-[8.5rem_8rem_minmax(0,1fr)] sm:items-center">
                    <span className="text-xs text-zinc-500">{formatDeskStamp(row.createdAt)}</span>
                    <span>
                      <span className="block font-mono text-xs">{formatIndianMobile(row.phone)}</span>
                      <span className="text-[10px] uppercase tracking-wide text-zinc-500">{sourceLabel}</span>
                    </span>
                    <span className="truncate text-zinc-700 dark:text-zinc-300">{row.title}</span>
                  </span>
                }
                actions={
                  <DeskActionForm action={setJobCallFollowed}>
                    <input type="hidden" name="id" value={row.id} />
                    <input type="hidden" name="source" value={row.source} />
                    <input type="hidden" name="clear" value={row.followedUpAt ? "true" : "false"} />
                    <input type="hidden" name="returnTo" value={returnTo} />
                    <button type="submit" className={deskGhostButton}>
                      {row.followedUpAt ? "Clear" : "Followed up"}
                    </button>
                  </DeskActionForm>
                }
              >
                <p className="text-zinc-600 dark:text-zinc-300">
                  <a className="underline" href={`tel:+91${row.phone}`}>
                    Call {formatIndianMobile(row.phone)}
                  </a>
                  {" · "}
                  {row.followedUpAt ? `Followed up ${formatDeskStamp(row.followedUpAt)}. ` : "Not followed up. "}
                  <Link className="underline" href={listingHref}>
                    {row.title}
                  </Link>
                  {" · "}
                  <Link className="underline" href={CHENNAI_JOBS_HUB_PATH}>
                    Jobs hub
                  </Link>
                </p>
              </DeskDisclosure>
            );
          })
        )}
      </ul>
      <DeskPager
        page={desk.page}
        pageCount={desk.pageCount}
        prevHref={desk.page > 1 ? deskHref(PATH, { status: segment, q: q || undefined, page: desk.page - 1 }) : null}
        nextHref={
          desk.page < desk.pageCount
            ? deskHref(PATH, { status: segment, q: q || undefined, page: desk.page + 1 })
            : null
        }
      />
    </div>
  );
}
