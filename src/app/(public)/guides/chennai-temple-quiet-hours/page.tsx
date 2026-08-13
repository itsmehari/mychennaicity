import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { TempleQuietHoursTool } from "@/components/compulsive/temple-quiet-hours-tool";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  TEMPLE_QUIET_FAQ,
  TEMPLE_QUIET_PATH,
} from "@/content/compulsive/temple-quiet-hours";
import { compulsivePath } from "@/content/compulsive/index";
import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai temple quiet-hour guide";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Quiet-window notes for major Chennai temples — crowd patterns, respect and dress tips. Verify timings with temple authorities; cross-check festivals.",
  alternates: { canonical: `${getSiteUrl()}${TEMPLE_QUIET_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Editorial quiet hours + respect notes — not official aarti schedules.",
    url: `${getSiteUrl()}${TEMPLE_QUIET_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ChennaiTempleQuietHoursPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Temple quiet hours" },
      ]}
      eyebrow="Culture desk · Temples"
      title="Chennai temple quiet-hour guide"
      dek="Ten major temples with quieter-window notes, crowd patterns, and respect/dress guidance — confirm with temple authorities, especially on festival days."
      related={[
        { href: CHENNAI_FESTIVALS_GUIDE_PATH, label: "Festivals calendar" },
        { href: compulsivePath("margazhi"), label: "Margazhi kutcheri desk" },
        { href: compulsivePath("filter-coffee"), label: "Filter coffee map" },
        { href: "/chennai-local-events", label: "Chennai local events" },
        { href: compulsivePath("slang"), label: "Chennai slang decoder" },
      ]}
    >
      <GuideDisclaimer kind="culture" />
      <TempleQuietHoursTool />
      <h2>FAQ</h2>
      {TEMPLE_QUIET_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
