import type { Metadata } from "next";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  CHENNAI_FESTIVAL_CALENDAR,
  CHENNAI_FESTIVALS_GUIDE_PATH,
} from "@/content/guides/chennai-festivals-calendar";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai festivals calendar";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Month-by-month Chennai festivals guide — Pongal, Panguni, Margazhi music season, Deepavali, Vinayaka Chaturthi and more. Plan weekends with temple and city notes.",
  alternates: { canonical: `${getSiteUrl()}${CHENNAI_FESTIVALS_GUIDE_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Chennai festival calendar for residents and visitors — when, where, and why it matters.",
    url: `${getSiteUrl()}${CHENNAI_FESTIVALS_GUIDE_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ChennaiFestivalsCalendarPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Festivals calendar" },
      ]}
      eyebrow="Culture · Chennai"
      title="Chennai festivals calendar"
      dek="A practical year-round map of the festivals and seasons that reshape traffic, temple streets, and weekend plans across Chennai. Lunar dates move — always confirm with temple or city notices."
      related={[
        { href: "/chennai-local-events", label: "Chennai local events hub" },
        { href: "/chennai-local-events#events-weekend", label: "This weekend’s listed events" },
        { href: "/areas", label: "Area hubs" },
      ]}
    >
      <p>
        <strong>Disclaimer:</strong> This is civic / culture journalism for planning — not an
        official temple or GCC calendar. Immersion routes, cracker timings, and road closures
        change yearly.
      </p>

      <h2>How to use this calendar</h2>
      <ul>
        <li>Use it to anticipate <strong>crowds and traffic</strong>, not as a ticket listing.</li>
        <li>
          Pair with our{" "}
          <a href="/chennai-local-events">events hub</a> for concerts, markets, and meetups on
          the same weekend.
        </li>
        <li>Temple festivals follow the Tamil lunar calendar — weekdays shift each year.</li>
      </ul>

      <h2>Season-by-season</h2>
      <div className="not-prose overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] text-[var(--foreground)]">
            <tr>
              <th className="px-3 py-2 font-bold">Festival / season</th>
              <th className="px-3 py-2 font-bold">Typically when</th>
              <th className="px-3 py-2 font-bold">Where</th>
              <th className="px-3 py-2 font-bold">Why it matters</th>
            </tr>
          </thead>
          <tbody>
            {CHENNAI_FESTIVAL_CALENDAR.map((row) => (
              <tr key={row.name} className="border-t border-[var(--border)]">
                <td className="px-3 py-2 font-semibold text-[var(--foreground)]">{row.name}</td>
                <td className="px-3 py-2 text-[var(--muted)]">{row.typicallyWhen}</td>
                <td className="px-3 py-2 text-[var(--muted)]">{row.whereNote}</td>
                <td className="px-3 py-2 text-[var(--muted)]">{row.whyItMatters}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Margazhi tip</h2>
      <p>
        December–January is peak sabha season. If you are visiting for kutcheris, stay near
        Mylapore / T. Nagar and book early — last-minute tickets and parking are the hard part,
        not finding a concert.
      </p>
    </ReachGuideShell>
  );
}
