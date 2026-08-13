import type { Metadata } from "next";
import { AffordAreaCalculator } from "@/components/compulsive/afford-area-calculator";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { AFFORD_AREA_FAQ, AFFORD_AREA_PATH } from "@/content/compulsive/afford-area";
import { compulsivePath } from "@/content/compulsive/index";
import { CHENNAI_SALARY_GUIDE_PATH } from "@/content/guides/chennai-salary-guide-2026";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Can I afford Adyar on this CTC?";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai afford-this-area calculator — compare take-home vs directional 2BHK rents for Adyar, OMR, Velachery, Anna Nagar and more.",
  alternates: { canonical: `${getSiteUrl()}${AFFORD_AREA_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Salary × rent reality check for Chennai neighbourhoods.",
    url: `${getSiteUrl()}${AFFORD_AREA_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function AffordAreaPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Afford this area" },
      ]}
      eyebrow="Cost desk · Housing"
      title="Can I afford this area on my CTC?"
      dek="Start with Adyar — or switch corridors. Directional 2026 rent mids meet your take-home for a shareable verdict."
      related={[
        { href: CHENNAI_SALARY_GUIDE_PATH, label: "Salary guide 2026" },
        { href: CHENNAI_JOBS_HUB_PATH, label: "Chennai jobs" },
        { href: compulsivePath("petrol-vs-ev"), label: "Petrol vs EV calculator" },
        { href: compulsivePath("moved-checklist"), label: "Moved to Chennai checklist" },
        { href: "/areas/adyar-thiruvanmiyur", label: "Adyar area hub" },
      ]}
    >
      <GuideDisclaimer kind="money" />
      <AffordAreaCalculator />
      <h2>FAQ</h2>
      {AFFORD_AREA_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
