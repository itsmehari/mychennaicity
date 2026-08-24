import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ChennaiMinistersShelf } from "@/components/government/chennai-ministers-shelf";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { AeoAnswerBlock } from "@/components/seo/aeo-answer-block";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import { GOVERNMENT_CHENNAI_AEO } from "@/content/government/aeo";
import {
  GOVERNMENT_DISCLAIMER_EXTRA,
  GOVERNMENT_FINE_PRINT_EXTRA,
} from "@/content/government/disclaimers";
import {
  GOVERNMENT_CHENNAI_PATH,
  GOVERNMENT_CHENNAI_TA_PATH,
  GOVERNMENT_HUB_PATH,
  GOVERNMENT_HUB_TA_PATH,
  governmentHreflang,
} from "@/content/government/paths";
import { getSiteUrl } from "@/lib/env";
import { buildGovernmentExplainerJsonLd } from "@/lib/seo/government-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai — which minister handles what?";
const description =
  "GCC, CMDA, TANGEDCO, MTC, WRD floods, TNPCB and ration — map citizen concerns to Tamil Nadu ministers (May 2026).";

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: governmentHreflang(
    GOVERNMENT_CHENNAI_PATH,
    GOVERNMENT_CHENNAI_TA_PATH,
    getSiteUrl(),
  ),
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${GOVERNMENT_CHENNAI_PATH}`,
  },
};

export default function ChennaiGovernmentPage() {
  const jsonLd = buildGovernmentExplainerJsonLd({
    path: GOVERNMENT_CHENNAI_PATH,
    name: titleSegment,
    description,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReachGuideShell
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Council of Ministers", href: GOVERNMENT_HUB_PATH },
          { label: "Chennai" },
        ]}
        eyebrow="Government desk · Chennai citizens"
        title="Who is answerable for my street?"
        dek="Water, roads, power, buses, schools, pollution and urban planning — which state minister holds the portfolio that affects Greater Chennai."
        related={[
          { href: "/civic-tools", label: "Civic tools hub" },
          { href: GOVERNMENT_HUB_PATH, label: "Full minister roster" },
        ]}
      >
        <BilingualToggle
          enHref={GOVERNMENT_CHENNAI_PATH}
          taHref={GOVERNMENT_CHENNAI_TA_PATH}
          current="en"
        />

        <GuideDisclaimer kind="civic" extra={GOVERNMENT_DISCLAIMER_EXTRA} />
        <AeoAnswerBlock content={GOVERNMENT_CHENNAI_AEO} />
        <ChennaiMinistersShelf locale="en" />
        <GuideFinePrint extra={GOVERNMENT_FINE_PRINT_EXTRA} />
      </ReachGuideShell>
    </>
  );
}
