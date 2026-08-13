import type { Metadata } from "next";
import { PropertyTaxChecklist } from "@/components/compulsive/property-tax-checklist";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  PROPERTY_TAX_FAQ,
  PROPERTY_TAX_OFFICIAL_NOTE,
  PROPERTY_TAX_PATH,
} from "@/content/compulsive/property-tax";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai property tax overpay checklist";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Interactive Chennai property-tax checklist — early-bird windows, wrong classification, vacant land, and name mismatch. Verify every figure on the official GCC portal.",
  alternates: { canonical: `${getSiteUrl()}${PROPERTY_TAX_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Self-check themes for GCC property tax — not a calculator or official notice.",
    url: `${getSiteUrl()}${PROPERTY_TAX_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function PropertyTaxChecklistPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Property tax checklist" },
      ]}
      eyebrow="Money desk · GCC tax"
      title="Property tax overpay checklist"
      dek="Four common Chennai assessment mismatches — tick what you have verified on the official GCC portal. Progress stays in this browser only."
      related={[
        { href: CIVIC_TOOL_PATHS.zoneWardFinder, label: "Zone & Ward Finder" },
        { href: compulsivePath("address-fixer"), label: "Address form fixer" },
        { href: compulsivePath("afford-area"), label: "Afford-this-area calculator" },
        { href: CIVIC_TOOL_PATHS.responsibilityRouter, label: "Civic responsibility router" },
        { href: compulsivePath("ac-bill"), label: "AC bill predictor" },
      ]}
    >
      <GuideDisclaimer
        kind="money"
        extra={`${PROPERTY_TAX_OFFICIAL_NOTE} This is not tax, legal, or financial advice.`}
      />
      <PropertyTaxChecklist />
      <h2>FAQ</h2>
      {PROPERTY_TAX_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
