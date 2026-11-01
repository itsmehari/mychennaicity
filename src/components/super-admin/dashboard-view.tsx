import Link from "next/link";
import { contentKindToParam } from "@/lib/analytics/engagement-events";
import type { CatalogItem, SuperAdminDesk, SuperAdminSnapshot } from "@/domains/analytics/super-admin-catalog";
import { superAdminSignOutAction } from "@/app/super-admin/actions";

const desks: { id: SuperAdminDesk; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "news", label: "News" },
  { id: "jobs", label: "Jobs" },
  { id: "events", label: "Events" },
  { id: "classifieds", label: "Classifieds" },
];

const numberFormat = new Intl.NumberFormat("en-IN");

function formatCount(value: number): string {
  return numberFormat.format(value);
}

function formatWhen(value: Date | null): string {
  if (!value) return "—";
  return value.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function deskHref(desk: SuperAdminDesk, query: string): string {
  const params = new URLSearchParams();
  if (desk !== "overview") params.set("desk", desk);
  if (query) params.set("q", query);
  const search = params.toString();
  return search ? `/super-admin?${search}` : "/super-admin";
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{formatCount(value)}</p>
    </div>
  );
}

function PostLink({ item }: { item: CatalogItem }) {
  return (
    <Link
      href={`/super-admin/${contentKindToParam(item.kind)}/${encodeURIComponent(item.slug)}`}
      className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
    >
      {item.title}
    </Link>
  );
}

export function SuperAdminDashboard({
  email,
  snapshot,
}: {
  email: string;
  snapshot: SuperAdminSnapshot;
}) {
  const showRequests = snapshot.items.some((item) => item.contactRequests != null);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">mychennaicity.in</p>
          <h1 className="text-2xl font-semibold">Super admin</h1>
          <p className="mt-1 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Page views, call clicks, and WhatsApp clicks for news, jobs, events, and classifieds.
            A repeat view by the same visitor counts again after 30 minutes. Jobs and events also
            keep their older unique-reader totals.
          </p>
        </div>
        <form action={superAdminSignOutAction}>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{email}</p>
          <button type="submit" className="mt-1 text-sm underline">
            Sign out
          </button>
        </form>
      </header>

      {!snapshot.analyticsReady ? (
        <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-950">
          The analytics table is not on this database yet. Posts are listed, and counts stay at zero
          until <span className="font-medium">npm run db:push</span> has been applied.
        </p>
      ) : null}
      {snapshot.databaseError ? (
        <p className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-900">
          {snapshot.databaseError}
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Posts" value={snapshot.totals.posts} />
        <Stat label="Page views, 7 days" value={snapshot.totals.views7d} />
        <Stat label="Call clicks, 7 days" value={snapshot.totals.callClicks7d} />
        <Stat label="WhatsApp clicks, 7 days" value={snapshot.totals.whatsappClicks7d} />
      </div>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Content desks">
        {desks.map((desk) => {
          const current = desk.id === snapshot.desk;
          return (
            <Link
              key={desk.id}
              href={deskHref(desk.id, snapshot.query)}
              aria-current={current ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 text-sm ${
                current
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-white text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-700"
              }`}
            >
              {desk.label}
            </Link>
          );
        })}
      </nav>

      <form action="/super-admin" method="get" className="mt-4 flex max-w-md gap-2">
        {snapshot.desk !== "overview" ? (
          <input type="hidden" name="desk" value={snapshot.desk} />
        ) : null}
        <label className="sr-only" htmlFor="super-admin-q">
          Search posts
        </label>
        <input
          id="super-admin-q"
          name="q"
          defaultValue={snapshot.query}
          placeholder="Search title or slug"
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Search
        </button>
      </form>

      <section className="mt-4">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          {snapshot.desk === "overview" ? "Busiest posts" : "All posts in this desk"}
        </h2>
        <div className="mt-2 overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">
              {snapshot.desk === "overview" ? "Busiest posts" : `${snapshot.desk} posts`}
            </caption>
            <thead className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
              <tr>
                <th className="px-3 py-2 font-medium">Post</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium" title="Visits recorded here. A repeat by the same visitor counts again after 30 minutes.">
                  Views
                </th>
                <th className="px-3 py-2 font-medium" title="Different visitors. Jobs and events include the older reader counter.">
                  Readers
                </th>
                <th className="px-3 py-2 font-medium">Calls</th>
                <th className="px-3 py-2 font-medium">WhatsApp</th>
                {showRequests ? <th className="px-3 py-2 font-medium">Contact requests</th> : null}
              </tr>
            </thead>
            <tbody>
              {snapshot.items.length === 0 ? (
                <tr>
                  <td colSpan={showRequests ? 8 : 7} className="px-3 py-6 text-zinc-500">
                    No posts match this view.
                  </td>
                </tr>
              ) : (
                snapshot.items.map((item) => (
                  <tr key={`${item.kind}:${item.slug}`} className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="px-3 py-2">
                      <PostLink item={item} />
                      <p className="text-xs text-zinc-500">
                        {item.kindLabel}
                        {item.detail ? ` · ${item.detail}` : ""}
                      </p>
                    </td>
                    <td className="px-3 py-2 capitalize">{item.status}</td>
                    <td className="whitespace-nowrap px-3 py-2">{formatWhen(item.when)}</td>
                    <td className="px-3 py-2 tabular-nums">
                      {formatCount(item.views)}
                      <span className="block text-xs text-zinc-500">{formatCount(item.views7d)} in 7 days</span>
                    </td>
                    <td className="px-3 py-2 tabular-nums">{formatCount(item.uniqueReaders)}</td>
                    <td className="px-3 py-2 tabular-nums">{formatCount(item.callClicks)}</td>
                    <td className="px-3 py-2 tabular-nums">{formatCount(item.whatsappClicks)}</td>
                    {showRequests ? (
                      <td className="px-3 py-2 tabular-nums">
                        {item.contactRequests == null ? "—" : formatCount(item.contactRequests)}
                      </td>
                    ) : null}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {snapshot.hidden > 0 ? (
          <p className="mt-2 text-xs text-zinc-500">
            {formatCount(snapshot.hidden)} more posts are not on this page. Search to narrow the list.
          </p>
        ) : null}
      </section>
    </div>
  );
}
