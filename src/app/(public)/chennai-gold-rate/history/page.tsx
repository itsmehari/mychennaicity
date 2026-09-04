import type { Metadata } from "next";
import Link from "next/link";
import { GoldRateHistoryChart } from "@/components/gold-rate/gold-rate-history-chart";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { listGoldRateHistoryForChennai } from "@/domains/gold-rate";
import { getSiteUrl } from "@/lib/env";
import { formatInrWhole } from "@/lib/gold-rate/format-inr";
import {
  CHENNAI_BUYING_GOLD_GUIDE_PATH,
  CHENNAI_GOLD_RATE_HISTORY_PATH,
  CHENNAI_GOLD_RATE_HUB_PATH,
} from "@/lib/routes/chennai-gold-rate";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const dynamic = "force-dynamic";

const titleSegment = "Chennai gold rate history";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Recent daily Chennai 22K and 24K snapshots from mychennaicity.in — indicative retail planning numbers, not an IBJA chart.",
  alternates: { canonical: `${getSiteUrl()}${CHENNAI_GOLD_RATE_HISTORY_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    url: `${getSiteUrl()}${CHENNAI_GOLD_RATE_HISTORY_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default async function GoldRateHistoryPage() {
  let points: Awaited<ReturnType<typeof listGoldRateHistoryForChennai>> = [];
  try {
    points = await listGoldRateHistoryForChennai(30);
  } catch {
    points = [];
  }

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai gold rate", href: CHENNAI_GOLD_RATE_HUB_PATH },
          { label: "History" },
        ]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Gold desk</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Chennai gold rate history
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Daily IST snapshots we publish on the hub. Indicative — confirm at the
        counter.{" "}
        <Link href={CHENNAI_GOLD_RATE_HUB_PATH} className="font-semibold text-[var(--accent)] hover:underline">
          Today’s rate
        </Link>
        {" · "}
        <Link href={CHENNAI_BUYING_GOLD_GUIDE_PATH} className="font-semibold text-[var(--accent)] hover:underline">
          Buying guide
        </Link>
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        A snapshot is the IST calendar date we recorded on the Chennai gold-rate
        hub — one pair of 22K and 24K per-gram figures for that day. It is not a
        tick-by-tick feed and it is not updated every hour.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        It is not IBJA, not a jeweller invoice, and not a buy or sell signal.
        Use the{" "}
        <Link href={CHENNAI_GOLD_RATE_HUB_PATH} className="font-semibold text-[var(--accent)] hover:underline">
          today’s hub
        </Link>{" "}
        for the latest snapshot and the{" "}
        <Link href={CHENNAI_BUYING_GOLD_GUIDE_PATH} className="font-semibold text-[var(--accent)] hover:underline">
          buying-gold guide
        </Link>{" "}
        for making charges, hallmarking, and what to ask at the counter.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Read the table as 24K versus 22K per gram on that IST date. Wastage,
        making charges, and buy-back live at the shop — they are not in this
        chart. If the table is empty, no snapshots are in the database yet; open
        today’s hub instead.
      </p>

      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
        <GoldRateHistoryChart
          points={points.map((p) => ({
            rateDate: p.rateDate,
            rate22kPerGram: p.rate22kPerGram,
            rate24kPerGram: p.rate24kPerGram,
          }))}
        />
      </div>

      {points.length > 0 ? (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--border)]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">IST date</th>
                <th className="px-4 py-3">24K / g</th>
                <th className="px-4 py-3">22K / g</th>
              </tr>
            </thead>
            <tbody>
              {[...points].reverse().map((p) => (
                <tr key={p.rateDate} className="border-t border-[var(--border)]">
                  <td className="px-4 py-2 text-[var(--foreground)]">{p.rateDate}</td>
                  <td className="px-4 py-2">{formatInrWhole(p.rate24kPerGram)}</td>
                  <td className="px-4 py-2">{formatInrWhole(p.rate22kPerGram)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <InteriorCrossNav />
    </div>
  );
}
