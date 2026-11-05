import Link from "next/link";
import { contentKindToParam } from "@/lib/analytics/engagement-events";
import type {
  BannerPartnerRow,
  BannerPlacementRow,
  CatalogItem,
  SuperAdminDesk,
  SuperAdminSnapshot,
} from "@/domains/analytics/super-admin-catalog";

const desks: { id: SuperAdminDesk; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "news", label: "News" },
  { id: "jobs", label: "Job views" },
  { id: "events", label: "Events" },
  { id: "classifieds", label: "Classified views" },
  { id: "banners", label: "Banner ads" },
];

const publishTools = [
  {
    href: "/super-admin/articles",
    title: "Articles",
    body: "Publish, unpublish, or feature a story.",
  },
  {
    href: "/super-admin/jobs",
    title: "Job listings",
    body: "Search, edit, publish, or close a role.",
  },
  {
    href: "/super-admin/events",
    title: "Event listings",
    body: "Schedule a draft, or cancel one that is live.",
  },
  {
    href: "/super-admin/classifieds",
    title: "Classifieds",
    body: "Publish or close an ad.",
  },
  {
    href: "/super-admin/whatsapp-join-requests",
    title: "WhatsApp queue",
    body: "Match join requests and open a message.",
  },
  {
    href: "/super-admin/classified-phone-reveals",
    title: "Contact requests",
    body: "Search enquiries and mark them followed up.",
  },
] as const;

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

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{formatCount(value)}</p>
    </div>
  );
}

function PartnerLink({ row }: { row: BannerPartnerRow | BannerPlacementRow }) {
  return (
    <Link
      href={`/super-admin/banner/${encodeURIComponent(row.partnerId)}`}
      className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
    >
      {row.partner}
    </Link>
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

export function SuperAdminDashboard({ snapshot }: { snapshot: SuperAdminSnapshot }) {
  const classifiedDesk = snapshot.desk === "classifieds";
  const bannerDesk = snapshot.desk === "banners";
  const showBannerSummary = snapshot.desk === "overview" || bannerDesk;
  const showRequests =
    classifiedDesk || snapshot.items.some((item) => item.contactRequests != null);

  const deskLabel = desks.find((desk) => desk.id === snapshot.desk)?.label ?? "Overview";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">{deskLabel}</h1>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Views are visits from 1 Nov 2026 IST (same visitor counts again after 30 minutes).
          Readers are unique people. Jobs and events also keep older unique-reader totals.
          Classifieds hid the number behind a form, so older ads show contact requests, not
          calls.
        </p>
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

      {classifiedDesk ? (
        <p className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          Most classifieds keep the poster number behind a name-and-mobile form. That form is the
          contact-request count. Call and WhatsApp only increment after the number is shown and
          someone taps those buttons.
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {bannerDesk ? (
          <>
            <Stat label="Partners" value={snapshot.bannerPartners.length} />
            <Stat label="Banner clicks, 7 days" value={snapshot.bannerTotals.clicks7d} />
            <Stat label="Banner clicks, all" value={snapshot.bannerTotals.clicks} />
            <Stat label="People who clicked" value={snapshot.bannerTotals.people} />
          </>
        ) : (
          <>
            <Stat
              label={snapshot.desk === "overview" ? "Posts" : "Posts in this desk"}
              value={snapshot.totals.posts}
            />
            <Stat label="Page views, 7 days" value={snapshot.totals.views7d} />
            <Stat label="Call clicks, 7 days" value={snapshot.totals.callClicks7d} />
            <Stat label="WhatsApp clicks, 7 days" value={snapshot.totals.whatsappClicks7d} />
            {snapshot.desk === "overview" ? (
              <Stat label="Banner clicks, 7 days" value={snapshot.bannerTotals.clicks7d} />
            ) : null}
            {showRequests ? (
              <>
                <Stat label="Contact requests, 7 days" value={snapshot.totals.contactRequests7d} />
                <Stat label="Contact requests, all" value={snapshot.totals.contactRequests} />
              </>
            ) : null}
          </>
        )}
      </div>

      {snapshot.desk === "overview" ? (
        <section className="mt-6" aria-label="Publishing tools">
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Publish</h2>
          <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {publishTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
              >
                <p className="font-medium">{tool.title}</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{tool.body}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <form action="/super-admin" method="get" className="mt-4 flex max-w-md gap-2">
        {snapshot.desk !== "overview" ? (
          <input type="hidden" name="desk" value={snapshot.desk} />
        ) : null}
        <label className="sr-only" htmlFor="super-admin-q">
          {bannerDesk ? "Search banner ads" : "Search posts"}
        </label>
        <input
          id="super-admin-q"
          name="q"
          defaultValue={snapshot.query}
          placeholder={bannerDesk ? "Search partner or placement" : "Search title or slug"}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Search
        </button>
      </form>

      {showBannerSummary ? (
        <section className="mt-6">
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {bannerDesk ? "Where the banners ran" : "Banner ads"}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            A click is someone opening a partner banner. The same person on the same banner counts
            again after 8 seconds. A signed-in super-admin session is not counted.
          </p>
          {bannerDesk ? (
            <BannerPlacementTable rows={snapshot.bannerPlacements} />
          ) : (
            <BannerPartnerTable rows={snapshot.bannerPartners} />
          )}
          {snapshot.hidden > 0 && bannerDesk ? (
            <p className="mt-2 text-xs text-zinc-500">
              {formatCount(snapshot.hidden)} more rows are not on this page. Search to narrow the
              list.
            </p>
          ) : null}
        </section>
      ) : null}

      {bannerDesk ? null : (
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
                <th
                  className="px-3 py-2 font-medium"
                  title="Visits from 1 Nov 2026. A repeat by the same visitor counts again after 30 minutes."
                >
                  Views
                </th>
                <th
                  className="px-3 py-2 font-medium"
                  title="Different visitors. Jobs and events include the older reader counter."
                >
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
                        {" · "}
                        <a href={item.href} className="underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
                          Open
                        </a>
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
                        {item.contactRequests == null ? (
                          "—"
                        ) : (
                          <>
                            {formatCount(item.contactRequests)}
                            <span className="block text-xs text-zinc-500">
                              {formatCount(item.contactRequests7d ?? 0)} in 7 days
                            </span>
                          </>
                        )}
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
      )}
    </div>
  );
}

function BannerPartnerTable({ rows }: { rows: BannerPartnerRow[] }) {
  return (
    <div className="mt-2 overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <table className="min-w-full text-left text-sm">
        <caption className="sr-only">Partner banner clicks</caption>
        <thead className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
          <tr>
            <th className="px-3 py-2 font-medium">Partner</th>
            <th className="px-3 py-2 font-medium">Clicks</th>
            <th className="px-3 py-2 font-medium">People</th>
            <th className="px-3 py-2 font-medium">Last 7 days</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.partnerId} className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2">
                <PartnerLink row={row} />
                <p className="text-xs text-zinc-500">{row.kicker}</p>
              </td>
              <td className="px-3 py-2 tabular-nums">{formatCount(row.clicks)}</td>
              <td className="px-3 py-2 tabular-nums">{formatCount(row.people)}</td>
              <td className="px-3 py-2 tabular-nums">{formatCount(row.clicks7d)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BannerPlacementTable({ rows }: { rows: BannerPlacementRow[] }) {
  return (
    <div className="mt-2 overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <table className="min-w-full text-left text-sm">
        <caption className="sr-only">Banner clicks by partner and placement</caption>
        <thead className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
          <tr>
            <th className="px-3 py-2 font-medium">Partner</th>
            <th className="px-3 py-2 font-medium">Where it ran</th>
            <th className="px-3 py-2 font-medium">Clicks</th>
            <th className="px-3 py-2 font-medium">People</th>
            <th className="px-3 py-2 font-medium">Last 7 days</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-3 py-6 text-zinc-500">
                No banner clicks match this search.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={`${row.partnerId}:${row.placement || "none"}`}
                className="border-t border-zinc-100 dark:border-zinc-800"
              >
                <td className="px-3 py-2">
                  <PartnerLink row={row} />
                </td>
                <td className="px-3 py-2">{row.placementLabel}</td>
                <td className="px-3 py-2 tabular-nums">{formatCount(row.clicks)}</td>
                <td className="px-3 py-2 tabular-nums">{formatCount(row.people)}</td>
                <td className="px-3 py-2 tabular-nums">{formatCount(row.clicks7d)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
