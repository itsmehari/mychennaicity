import type { Metadata } from "next";
import { BiryaniBracketTool } from "@/components/compulsive/biryani-bracket-tool";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  BIRYANI_BRACKET_FAQ,
  BIRYANI_BRACKET_PATH,
} from "@/content/compulsive/biryani-bracket";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai biryani war bracket";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Playful Chennai biryani style bracket — Ambur-style, Donne-style, Thalassery-inspired, military hotel, and area legends. Editorial picks only; not official brand winners.",
  alternates: { canonical: `${getSiteUrl()}${BIRYANI_BRACKET_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Pick a side by style — share “I crowned X.” Not a trademark ranking.",
    url: `${getSiteUrl()}${BIRYANI_BRACKET_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ChennaiBiryaniBracketPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Biryani bracket" },
      ]}
      eyebrow="Culture desk · Biryani"
      title="Chennai biryani war bracket"
      dek="A playful editorial bracket of styles and area legends — Ambur-style, Donne heat, Thalassery perfume, military-hotel punch, and neighbourhood loyalty lanes. Crown a side in this browser; we do not award official brand winners."
      related={[
        { href: compulsivePath("filter-coffee"), label: "Filter coffee map" },
        { href: compulsivePath("rivalries"), label: "Area rivalry cards" },
        { href: compulsivePath("slang"), label: "Chennai slang decoder" },
        { href: "/chennai-local-events", label: "Chennai local events" },
        { href: compulsivePath("which-chennai"), label: "Which Chennai are you?" },
      ]}
    >
      <GuideDisclaimer kind="culture" />
      <BiryaniBracketTool />
      <h2>FAQ</h2>
      {BIRYANI_BRACKET_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
