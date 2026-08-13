import type { Metadata } from "next";
import { AreaRivalryCards } from "@/components/compulsive/area-rivalry-cards";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  AREA_RIVALRIES_FAQ,
  AREA_RIVALRIES_PATH,
} from "@/content/compulsive/area-rivalries";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai area rivalry cards";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Playful Chennai neighbourhood rivalry cards — Adyar vs Besant, OMR vs ECR, T Nagar vs Mylapore and more, with food, commute, vibe, and peace tips.",
  alternates: { canonical: `${getSiteUrl()}${AREA_RIVALRIES_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "A vs B neighbourhood contrasts — playful, not mean.",
    url: `${getSiteUrl()}${AREA_RIVALRIES_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ChennaiAreaRivalriesPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Area rivalries" },
      ]}
      eyebrow="Culture desk · Neighbourhoods"
      title="Chennai area rivalry cards"
      dek="Toggle A vs B for classic city debates — food, commute, vibe, and a peace tip so nobody has to “win.”"
      related={[
        { href: compulsivePath("which-chennai"), label: "Which Chennai are you?" },
        { href: compulsivePath("afford-area"), label: "Afford-this-area calculator" },
        { href: compulsivePath("moved-checklist"), label: "Moved to Chennai checklist" },
        { href: compulsivePath("slang"), label: "Chennai slang decoder" },
        { href: "/directory", label: "City directory" },
      ]}
    >
      <GuideDisclaimer kind="culture" />
      <AreaRivalryCards />
      <h2>FAQ</h2>
      {AREA_RIVALRIES_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
