import type { Metadata } from "next";
import { FilterCoffeeMap } from "@/components/compulsive/filter-coffee-map";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  FILTER_COFFEE_FAQ,
  FILTER_COFFEE_PATH,
} from "@/content/compulsive/filter-coffee";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai filter coffee map";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Editorial Chennai filter coffee corridor map — Mylapore, Triplicane, T Nagar, Anna Nagar, Adyar, Velachery, OMR and more. No fake ratings.",
  alternates: { canonical: `${getSiteUrl()}${FILTER_COFFEE_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Corridor chips + editorial decoction stops — playful city desk, not a ranking.",
    url: `${getSiteUrl()}${FILTER_COFFEE_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ChennaiFilterCoffeeMapPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Filter coffee map" },
      ]}
      eyebrow="Culture desk · Filter coffee"
      title="Chennai filter coffee map"
      dek="Corridor chips for decoction hunts — Mylapore to OMR — with editorial names and neighbourhood notes. No star scores, no paid crowns."
      related={[
        { href: compulsivePath("rivalries"), label: "Area rivalry cards" },
        { href: compulsivePath("slang"), label: "Chennai slang decoder" },
        { href: "/chennai-local-events", label: "Chennai local events" },
        { href: compulsivePath("biryani"), label: "Biryani war bracket" },
        { href: compulsivePath("which-chennai"), label: "Which Chennai are you?" },
      ]}
    >
      <GuideDisclaimer kind="culture" />
      <FilterCoffeeMap />
      <h2>FAQ</h2>
      {FILTER_COFFEE_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
