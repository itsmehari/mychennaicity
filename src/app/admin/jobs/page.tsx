import Link from "next/link";
import { closeStaleJobsAction, setJobStatus } from "@/app/admin/jobs/actions";
import { DeskActionForm } from "@/components/super-admin/desk-action-form";
import {
  DeskLookup,
  DeskNotice,
  DeskPager,
  DeskSegments,
} from "@/components/super-admin/desk-queue";
import {
  DeskPageHeader,
  DeskTable,
  deskGhostButton,
  deskSolidButton,
  statusPill,
} from "@/components/super-admin/desk-ui";
import { loadJobDesk, type JobPostingStatus } from "@/domains/jobs";
import { isJobPubliclyOpen } from "@/domains/jobs/public-open";
import { deskHref } from "@/lib/super-admin/desk-return";

export const dynamic = "force-dynamic";

const PATH = "/super-admin/jobs";
const FILTERS = ["all", "open", "closed", "draft", "expired"] as const;
type Filter = (typeof FILTERS)[number];

function parseFilter(raw: string | undefined): Filter {
  if (raw && (FILTERS as readonly string[]).includes(raw)) return raw as Filter;
  return "all";
}

function noticeText(code: string | undefined): string | null {
  if (code === "open") return "Published.";
  if (code === "draft") return "Unpublished.";
  if (code === "closed") return "Closed.";
  if (code === "closed-expired") return "Expired open roles are now closed.";
  return null;
}

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string; notice?: string }>;
}) {
  const params = await searchParams;
  const filter = parseFilter(params.status);
  const q = (params.q ?? "").trim();
  const now = new Date();
  let desk: Awaited<ReturnType<typeof loadJobDesk>>;
  try {
    desk = await loadJobDesk({
      status: filter as JobPostingStatus | "all" | "expired",
      q,
      pageRaw: params.page,
      now,
    });
  } catch (err) {
    return (
      <p className="p-4 text-sm text-red-700">
        Could not load jobs: {err instanceof Error ? err.message : "db error"}
      </p>
    );
  }
  const returnTo = deskHref(PATH, {
    status: filter === "all" ? undefined : filter,
    q: q || undefined,
    page: desk.page > 1 ? desk.page : undefined,
  });
  const rangeStart = desk.total === 0 ? 0 : (desk.page - 1) * 40 + 1;
  const rangeEnd = desk.total === 0 ? 0 : rangeStart + desk.rows.length - 1;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6">
      <DeskPageHeader
        title="Job listings"
        lede="Create or edit a listing, then publish (open), unpublish (draft), or close. The public hub only includes open rows whose valid-through date is empty or still ahead. Do not invent an employer phone or a salary band."
        actions={
          <Link href="/super-admin/jobs/new" className={deskSolidButton}>
            New job
          </Link>
        }
      />
      <DeskNotice notice={noticeText(params.notice)} error={null} />
      <div className="flex flex-wrap items-center gap-2">
        <DeskSegments
          items={FILTERS.map((item) => ({
            href: deskHref(PATH, { status: item === "all" ? undefined : item, q: q || undefined }),
            label: item === "all" ? "All" : item.charAt(0).toUpperCase() + item.slice(1),
            count: desk.counts[item] ?? 0,
            active: filter === item,
          }))}
        />
        {(desk.counts.expired ?? 0) > 0 ? (
          <DeskActionForm action={closeStaleJobsAction}>
            <input type="hidden" name="returnTo" value={returnTo} />
            <button type="submit" className={deskGhostButton}>
              Close {desk.counts.expired} expired
            </button>
          </DeskActionForm>
        ) : (
          <span className="text-xs text-zinc-500">No expired-open rows</span>
        )}
      </div>
      <DeskLookup
        action={PATH}
        status={filter === "all" ? undefined : filter}
        q={q}
        placeholder="Title, employer, area, or slug"
        rangeLabel={`${rangeStart}–${rangeEnd} of ${desk.total}`}
      />
      <DeskTable>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-950">
            <tr>
              <th className="px-3 py-2 font-medium">Title</th>
              <th className="px-3 py-2 font-medium">Employer</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Valid through</th>
              <th className="px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {desk.rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-zinc-500">
                  No jobs in this filter.
                </td>
              </tr>
            ) : (
              desk.rows.map((row) => {
                const publicOpen = isJobPubliclyOpen(row, now);
                return (
                  <tr key={row.id} className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="max-w-md px-3 py-2">
                      <p className="font-medium">{row.title}</p>
                      <p className="text-xs text-zinc-500">{row.slug}</p>
                    </td>
                    <td className="px-3 py-2">{row.employerName}</td>
                    <td className="px-3 py-2">
                      <span className={statusPill(row.status)}>{row.status}</span>
                      {row.status === "open" && !publicOpen ? (
                        <span className="ml-1 text-xs text-red-700">expired</span>
                      ) : null}
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {row.validThrough ? row.validThrough.toISOString().slice(0, 10) : "—"}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-2">
                        <Link href={`/super-admin/jobs/${row.id}`} className={deskGhostButton}>
                          Edit
                        </Link>
                        {row.status !== "open" ? (
                          <DeskActionForm action={setJobStatus}>
                            <input type="hidden" name="id" value={row.id} />
                            <input type="hidden" name="status" value="open" />
                            <input type="hidden" name="returnTo" value={returnTo} />
                            <button type="submit" className={deskGhostButton}>
                              Publish
                            </button>
                          </DeskActionForm>
                        ) : (
                          <DeskActionForm action={setJobStatus}>
                            <input type="hidden" name="id" value={row.id} />
                            <input type="hidden" name="status" value="draft" />
                            <input type="hidden" name="returnTo" value={returnTo} />
                            <button type="submit" className={deskGhostButton}>
                              Unpublish
                            </button>
                          </DeskActionForm>
                        )}
                        {row.status !== "closed" ? (
                          <DeskActionForm action={setJobStatus}>
                            <input type="hidden" name="id" value={row.id} />
                            <input type="hidden" name="status" value="closed" />
                            <input type="hidden" name="returnTo" value={returnTo} />
                            <button type="submit" className={deskGhostButton}>
                              Close
                            </button>
                          </DeskActionForm>
                        ) : null}
                        {publicOpen ? (
                          <Link href={`/chennai-jobs/${row.slug}`} className={deskGhostButton} target="_blank">
                            View
                          </Link>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </DeskTable>
      <DeskPager
        page={desk.page}
        pageCount={desk.pageCount}
        prevHref={
          desk.page > 1
            ? deskHref(PATH, { status: filter === "all" ? undefined : filter, q: q || undefined, page: desk.page - 1 })
            : null
        }
        nextHref={
          desk.page < desk.pageCount
            ? deskHref(PATH, { status: filter === "all" ? undefined : filter, q: q || undefined, page: desk.page + 1 })
            : null
        }
      />
    </div>
  );
}
