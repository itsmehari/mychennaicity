import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { MargazhiDeskTool } from "@/components/compulsive/margazhi-desk-tool";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  MARGAZHI_DESK_PATH,
  MARGAZHI_FAQ,
} from "@/content/compulsive/margazhi-desk";
import { compulsivePath } from "@/content/compulsive/index";
import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai Margazhi kutcheri desk";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Evergreen Margazhi / Music Season how-to for Chennai plus a seasonal pack. Honest off-season note outside ~15 Dec–15 Jan IST. Links to events and festivals.",
  alternates: { canonical: `${getSiteUrl()}${MARGAZHI_DESK_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Kutcheri habits + seasonal checklist — verify live sabha listings.",
    url: `${getSiteUrl()}${MARGAZHI_DESK_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ChennaiMargazhiDeskPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Margazhi desk" },
      ]}
      eyebrow="Culture desk · Margazhi"
      title="Margazhi kutcheri desk"
      dek="Evergreen how-to for Chennai’s Music Season, plus a seasonal pack. Outside ~15 Dec–15 Jan IST we say so plainly — use events and festivals for dated listings."
      related={[
        { href: "/chennai-local-events", label: "Chennai local events" },
        { href: CHENNAI_FESTIVALS_GUIDE_PATH, label: "Festivals calendar" },
        { href: compulsivePath("temple-quiet"), label: "Temple quiet hours" },
        { href: compulsivePath("filter-coffee"), label: "Filter coffee map" },
        { href: compulsivePath("slang"), label: "Chennai slang decoder" },
      ]}
    >
      <GuideDisclaimer kind="culture" />
      <MargazhiDeskTool />
      <h2>FAQ</h2>
      {MARGAZHI_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
