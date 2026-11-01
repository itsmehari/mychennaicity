import Link from "next/link";
import type { CatalogItem } from "@/domains/analytics/super-admin-catalog";
import type { EngagementDay, RecentEngagement } from "@/domains/analytics/content-engagement";

const numberFormat = new Intl.NumberFormat("en-IN");

function formatCount(value: number): string {
  return numberFormat.format(value);
}

const eventLabels: Record<string, string> = {
  pageview: "Page view",
  call_click: "Call",
  whatsapp_click: "WhatsApp",
};

export function SuperAdminPostDetail({
  item,
  days,
  recent,
}: {
  item: CatalogItem;
  days: EngagementDay[];
  recent: RecentEngagement[];
}) {
  const maxViews = Math.max(1, ...days.map((day) => day.views));

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <p className="text-sm">
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
          Open the public page
        </a>
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Page views", item.views],
          ["Unique readers", item.uniqueReaders],
          ["Call clicks", item.callClicks],
          ["WhatsApp clicks", item.whatsappClicks],
        ].map(([label, value]) => (
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
          <Link href="/admin/classified-phone-reveals" className="underline">
            classified contact list
          </Link>
          .
        </p>
      ) : null}

      <section className="mt-8">
        <h2 className="text-sm font-semibold">Last 30 days</h2>
        <div className="mt-2 overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">Daily page views, call clicks, and WhatsApp clicks</caption>
            <thead className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
              <tr>
                <th className="px-3 py-2 font-medium">Day</th>
                <th className="px-3 py-2 font-medium">Views</th>
                <th className="px-3 py-2 font-medium">Calls</th>
                <th className="px-3 py-2 font-medium">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day.day} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="whitespace-nowrap px-3 py-1.5">{day.day}</td>
                  <td className="px-3 py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-8 tabular-nums">{formatCount(day.views)}</span>
                      <span className="h-2 flex-1 rounded bg-zinc-100 dark:bg-zinc-800" aria-hidden>
                        <span
                          className="block h-2 rounded bg-zinc-800 dark:bg-zinc-200"
                          style={{ width: `${Math.round((day.views / maxViews) * 100)}%` }}
                        />
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-1.5 tabular-nums">{formatCount(day.callClicks)}</td>
                  <td className="px-3 py-1.5 tabular-nums">{formatCount(day.whatsappClicks)}</td>
                </tr>
              ))}
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
                <span>{eventLabels[row.eventKind] ?? row.eventKind}</span>
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
