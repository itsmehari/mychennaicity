import Link from "next/link";
import type { BannerPlacementRow, CatalogItem } from "@/domains/analytics/super-admin-catalog";
import type { EngagementDay, RecentEngagement } from "@/domains/analytics/content-engagement";
import { parseBannerClickSlug, partnerPlacementLabel } from "@/lib/partner-ads";

const numberFormat = new Intl.NumberFormat("en-IN");

function formatCount(value: number): string {
  return numberFormat.format(value);
}

const eventLabels: Record<string, string> = {
  pageview: "Page view",
  call_click: "Call",
  whatsapp_click: "WhatsApp",
  banner_click: "Banner click",
};

function activityLabel(row: RecentEngagement): string {
  const base = eventLabels[row.eventKind] ?? row.eventKind;
  if (row.eventKind !== "banner_click") return base;
  const parsed = parseBannerClickSlug(row.contentSlug);
  return parsed ? `${base} · ${partnerPlacementLabel(parsed.placement)}` : base;
}

export function SuperAdminPostDetail({
  item,
  days,
  recent,
  placements = [],
}: {
  item: CatalogItem;
  days: EngagementDay[];
  recent: RecentEngagement[];
  placements?: BannerPlacementRow[];
}) {
  const banner = item.kind === "banner";
  const maxViews = Math.max(1, ...days.map((day) => (banner ? day.bannerClicks : day.views)));

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <p className="text-sm">
        <Link
          href={
            item.kind === "classified"
              ? "/super-admin?desk=classifieds"
              : item.kind === "news"
                ? "/super-admin?desk=news"
                : item.kind === "event"
                  ? "/super-admin?desk=events"
                  : item.kind === "banner"
                    ? "/super-admin?desk=banners"
                    : "/super-admin?desk=jobs"
          }
          className="underline"
        >
          Back to desk
        </Link>
        {" · "}
        <Link href="/super-admin" className="underline">
          All posts
        </Link>
      </p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">{item.kindLabel}</p>
      <h1 className="mt-1 text-2xl font-semibold">{item.title}</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        <span className="capitalize">{item.status}</span>
        {item.detail ? ` · ${item.detail}` : ""}
      </p>
      <p className="mt-2 text-sm">
        <a href={item.href} className="underline" target="_blank" rel="noopener noreferrer">
          {banner ? "Open the partner site" : "Open the public page"}
        </a>
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(banner
          ? [
              ["Clicks", item.views],
              ["People", item.uniqueReaders],
              ["Last 7 days", item.views7d],
            ]
          : [
              ["Page views", item.views],
              ["Unique readers", item.uniqueReaders],
              ["Call clicks", item.callClicks],
              ["WhatsApp clicks", item.whatsappClicks],
              ...(item.contactRequests != null
                ? ([["Contact requests", item.contactRequests]] as const)
                : []),
            ]
        ).map(([label, value]) => (
          <div key={String(label)} className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
            <dt className="text-xs uppercase tracking-wide text-zinc-500">{label}</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums">{formatCount(Number(value))}</dd>
          </div>
        ))}
      </dl>
      {item.contactRequests != null ? (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Contact requests stored for this classified: {formatCount(item.contactRequests)}. Names and
          numbers stay on the{" "}
          <Link href="/super-admin/classified-phone-reveals" className="underline">
            classified contact list
          </Link>
          .
        </p>
      ) : null}

      {banner && placements.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-sm font-semibold">Where it ran</h2>
          <div className="mt-2 overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <table className="min-w-full text-left text-sm">
              <caption className="sr-only">Clicks by placement</caption>
              <thead className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
                <tr>
                  <th className="px-3 py-2 font-medium">Placement</th>
                  <th className="px-3 py-2 font-medium">Clicks</th>
                  <th className="px-3 py-2 font-medium">People</th>
                  <th className="px-3 py-2 font-medium">Last 7 days</th>
                </tr>
              </thead>
              <tbody>
                {placements.map((row) => (
                  <tr key={row.placement} className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="px-3 py-2">{row.placementLabel}</td>
                    <td className="px-3 py-2 tabular-nums">{formatCount(row.clicks)}</td>
                    <td className="px-3 py-2 tabular-nums">{formatCount(row.people)}</td>
                    <td className="px-3 py-2 tabular-nums">{formatCount(row.clicks7d)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="text-sm font-semibold">Last 30 days</h2>
        <div className="mt-2 overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">
              {banner ? "Daily banner clicks" : "Daily page views, call clicks, and WhatsApp clicks"}
            </caption>
            <thead className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
              <tr>
                <th className="px-3 py-2 font-medium">Day</th>
                {banner ? (
                  <th className="px-3 py-2 font-medium">Clicks</th>
                ) : (
                  <>
                    <th className="px-3 py-2 font-medium">Views</th>
                    <th className="px-3 py-2 font-medium">Calls</th>
                    <th className="px-3 py-2 font-medium">WhatsApp</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const barValue = banner ? day.bannerClicks : day.views;
                return (
                <tr key={day.day} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="whitespace-nowrap px-3 py-1.5">{day.day}</td>
                  <td className="px-3 py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-8 tabular-nums">{formatCount(barValue)}</span>
                      <span className="h-2 flex-1 rounded bg-zinc-100 dark:bg-zinc-800" aria-hidden>
                        <span
                          className="block h-2 rounded bg-zinc-800 dark:bg-zinc-200"
                          style={{ width: `${Math.round((barValue / maxViews) * 100)}%` }}
                        />
                      </span>
                    </div>
                  </td>
                  {banner ? null : (
                    <>
                      <td className="px-3 py-1.5 tabular-nums">{formatCount(day.callClicks)}</td>
                      <td className="px-3 py-1.5 tabular-nums">{formatCount(day.whatsappClicks)}</td>
                    </>
                  )}
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold">Recent activity</h2>
        {recent.length === 0 ? (
          <p className="mt-2 text-sm text-zinc-500">No recorded activity yet.</p>
        ) : (
          <ul className="mt-2 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
            {recent.map((row, index) => {
              const at = row.createdAt instanceof Date ? row.createdAt : new Date(row.createdAt);
              return (
              <li key={`${at.toISOString()}-${index}`} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                <span>{activityLabel(row)}</span>
                <span className="text-zinc-500">
                  Visitor {row.visitorId.slice(0, 8)}
                  {" · "}
                  {at.toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
