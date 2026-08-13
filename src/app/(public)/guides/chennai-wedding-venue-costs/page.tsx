import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { WeddingVenueCosts } from "@/components/compulsive/wedding-venue-costs";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { compulsivePath } from "@/content/compulsive/index";
import {
  WEDDING_VENUE_FAQ,
  WEDDING_VENUE_PATH,
} from "@/content/compulsive/wedding-venue";
import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai wedding venue cost reality";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Directional Chennai wedding hall and catering bands by zone and season, plus a hidden-cost checklist — planning figures, not venue quotes.",
  alternates: { canonical: `${getSiteUrl()}${WEDDING_VENUE_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Hall + plate bands for Chennai zones and seasons, with the extras that blow family budgets.",
    url: `${getSiteUrl()}${WEDDING_VENUE_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function WeddingVenueCostsPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Wedding venue costs" },
      ]}
      eyebrow="Cost desk · Family"
      title="Wedding venue cost reality"
      dek="Pick a Chennai zone and season for directional hall + catering bands, then tick the hidden costs that rarely sit in the brochure quote."
      related={[
        { href: "/chennai-gold-rate", label: "Gold rate desk" },
        { href: CHENNAI_FESTIVALS_GUIDE_PATH, label: "Festivals calendar" },
        { href: "/areas", label: "Area hubs" },
        { href: compulsivePath("afford-area"), label: "Afford-this-area calculator" },
        { href: compulsivePath("used-vehicle"), label: "Used vehicle pulse" },
      ]}
    >
      <GuideDisclaimer kind="money" />
      <WeddingVenueCosts />
      <h2>FAQ</h2>
      {WEDDING_VENUE_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
