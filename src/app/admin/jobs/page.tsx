import Link from "next/link";
import {
  closeStaleJobsAction,
  setJobStatus,
} from "@/app/admin/jobs/actions";
import {
  DeskPageHeader,
  DeskTable,
  deskGhostButton,
  deskSolidButton,
  statusPill,
} from "@/components/super-admin/desk-ui";
import {
  countStaleOpenJobPostings,
  listAdminJobsForChennai,
  type JobPostingStatus,
} from "@/domains/jobs";
import { isJobPubliclyOpen } from "@/domains/jobs/public-open";

export const dynamic = "force-dynamic";

const FILTERS = ["all", "open", "closed", "draft", "expired"] as const;
type Filter = (typeof FILTERS)[number];

function parseFilter(raw: string | undefined): Filter {
  if (raw && (FILTERS as readonly string[]).includes(raw)) {
    return raw as Filter;
  }
  return "all";
}

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const filter = parseFilter(params.status);
  const now = new Date();

  let rows: Awaited<ReturnType<typeof listAdminJobsForChennai>> = [];
  let staleCount = 0;
  try {
    rows = await listAdminJobsForChennai({
      status: filter as JobPostingStatus | "all" | "expired",
    });
    staleCount = await countStaleOpenJobPostings(now);
  } catch (err) {
    return (
      <p className="p-4 text-sm text-red-700">
        Could not load jobs: {err instanceof Error ? err.message : "db error"}
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6">
      <DeskPageHeader
        title="Job listings"
        lede="Create or edit a listing, then publish (open), unpublish (draft), or close. The public hub, sitemap, and JobPosting markup only include open rows whose valid-through date is empty or still ahead. Do not invent an employer phone or a salary band."
        actions={
          <Link href="/super-admin/jobs/new" className={deskSolidButton}>
            New job
          </Link>
        }
      />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {FILTERS.map((f) => (
          <Link
            key={f}
            href={f === "all" ? "/super-admin/jobs" : `/super-admin/jobs?status=${f}`}
            className={
              filter === f
                ? "rounded-full bg-zinc-900 px-3 py-1 text-white capitalize dark:bg-zinc-100 dark:text-zinc-900"
                : "rounded-full border border-zinc-300 bg-white px-3 py-1 capitalize dark:border-zinc-700 dark:bg-zinc-900"
            }
          >
            {f}
          </Link>
        ))}
        {staleCount > 0 ? (
          <form action={closeStaleJobsAction}>
            <button type="submit" className={deskGhostButton}>
              Close {staleCount} expired
            </button>
          </form>
        ) : (
          <span className="text-xs text-zinc-500">No expired-open rows</span>
        )}
      </div>
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
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-zinc-500">
                  No jobs in this filter.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
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
                          <form action={setJobStatus}>
                            <input type="hidden" name="id" value={row.id} />
                            <input type="hidden" name="status" value="open" />
                            <button type="submit" className={deskGhostButton}>
                              Publish
                            </button>
                          </form>
                        ) : (
                          <form action={setJobStatus}>
                            <input type="hidden" name="id" value={row.id} />
                            <input type="hidden" name="status" value="draft" />
                            <button type="submit" className={deskGhostButton}>
                              Unpublish
                            </button>
                          </form>
                        )}
                        {row.status !== "closed" ? (
                          <form action={setJobStatus}>
                            <input type="hidden" name="id" value={row.id} />
                            <input type="hidden" name="status" value="closed" />
                            <button type="submit" className={deskGhostButton}>
                              Close
                            </button>
                          </form>
                        ) : null}
                        {publicOpen ? (
                          <Link
                            href={`/chennai-jobs/${row.slug}`}
                            className={deskGhostButton}
                            target="_blank"
                          >
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
    </div>
  );
}
