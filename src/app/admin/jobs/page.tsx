import Link from "next/link";
import { auth } from "@/auth";
import {
  closeStaleJobsAction,
  setJobStatus,
} from "@/app/admin/jobs/actions";
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
  const session = await auth();
  if (!session?.user) {
    return (
      <p className="text-sm">
        <Link href="/api/auth/signin" className="underline">
          Sign in
        </Link>{" "}
        to manage jobs.
      </p>
    );
  }

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
      <p className="text-sm text-red-700">
        Could not load jobs: {err instanceof Error ? err.message : "db error"}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-lg font-semibold">Jobs</h1>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/admin/jobs/new" className="underline">
            New job
          </Link>
          <Link href="/admin/articles" className="underline">
            Articles
          </Link>
          <Link href="/admin" className="underline">
            Admin home
          </Link>
        </div>
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        Create / edit listings, then publish (open), unpublish (draft), or
        close. Public hub, sitemap, and JobPosting JSON-LD only include{" "}
        <span className="font-medium">open</span> rows whose{" "}
        <span className="font-medium">valid through</span> is empty or still in
        the future. Do not invent employer phones or salary bands.
      </p>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {FILTERS.map((f) => (
          <Link
            key={f}
            href={f === "all" ? "/admin/jobs" : `/admin/jobs?status=${f}`}
            className={
              filter === f ? "font-semibold underline" : "underline opacity-80"
            }
          >
            {f}
          </Link>
        ))}
        {staleCount > 0 ? (
          <form action={closeStaleJobsAction}>
            <button type="submit" className="underline">
              Close {staleCount} expired
            </button>
          </form>
        ) : (
          <span className="text-xs text-zinc-500">No expired-open rows</span>
        )}
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-900">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Employer</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Valid through</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const publicOpen = isJobPubliclyOpen(row, now);
              return (
                <tr
                  key={row.id}
                  className="border-t border-zinc-200 dark:border-zinc-800"
                >
                  <td className="max-w-md px-3 py-2">
                    <p className="font-medium">{row.title}</p>
                    <p className="text-xs text-zinc-500">{row.slug}</p>
                  </td>
                  <td className="px-3 py-2">{row.employerName}</td>
                  <td className="px-3 py-2">
                    {row.status}
                    {row.status === "open" && !publicOpen ? (
                      <span className="ml-1 text-xs text-red-700">
                        (expired)
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {row.validThrough
                      ? row.validThrough.toISOString().slice(0, 10)
                      : "—"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/admin/jobs/${row.id}`} className="underline">
                        Edit
                      </Link>
                      {row.status !== "open" ? (
                        <form action={setJobStatus}>
                          <input type="hidden" name="id" value={row.id} />
                          <input type="hidden" name="status" value="open" />
                          <button type="submit" className="underline">
                            Publish
                          </button>
                        </form>
                      ) : (
                        <form action={setJobStatus}>
                          <input type="hidden" name="id" value={row.id} />
                          <input type="hidden" name="status" value="draft" />
                          <button type="submit" className="underline">
                            Unpublish
                          </button>
                        </form>
                      )}
                      {row.status !== "closed" ? (
                        <form action={setJobStatus}>
                          <input type="hidden" name="id" value={row.id} />
                          <input type="hidden" name="status" value="closed" />
                          <button type="submit" className="underline">
                            Close
                          </button>
                        </form>
                      ) : null}
                      {publicOpen ? (
                        <Link
                          href={`/chennai-jobs/${row.slug}`}
                          className="underline"
                          target="_blank"
                        >
                          View
                        </Link>
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
