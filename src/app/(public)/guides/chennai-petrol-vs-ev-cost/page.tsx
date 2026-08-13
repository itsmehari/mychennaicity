import type { Metadata } from "next";
import { PetrolVsEvCalculator } from "@/components/compulsive/petrol-vs-ev-calculator";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { PETROL_VS_EV_FAQ, PETROL_VS_EV_PATH } from "@/content/compulsive/petrol-vs-ev";
import { compulsivePath } from "@/content/compulsive/index";
import { CHENNAI_EV_GUIDE_PATH } from "@/content/guides/chennai-ev-charging";
import { CHENNAI_SALARY_GUIDE_PATH } from "@/content/guides/chennai-salary-guide-2026";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai petrol vs EV cost calculator";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai petrol vs EV cost-of-day calculator — edit km, mileage, and ₹/kWh for a shareable monthly comparison.",
  alternates: { canonical: `${getSiteUrl()}${PETROL_VS_EV_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Personal petrol vs EV rupee math for Chennai commutes.",
    url: `${getSiteUrl()}${PETROL_VS_EV_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function PetrolVsEvPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Petrol vs EV" },
      ]}
      eyebrow="Cost desk · Chennai"
      title="Petrol vs EV cost-of-day"
      dek="A personal, shareable number for Chennai km — not a dealer brochure. Edit today’s fuel and charger rates."
      related={[
        { href: CHENNAI_EV_GUIDE_PATH, label: "EV charging guide" },
        { href: compulsivePath("ac-bill"), label: "AC bill predictor" },
        { href: compulsivePath("afford-area"), label: "Afford-this-area calculator" },
        { href: CHENNAI_SALARY_GUIDE_PATH, label: "Salary guide 2026" },
        { href: "/chennai-gold-rate", label: "Gold rate desk" },
      ]}
    >
      <GuideDisclaimer kind="money" />
      <PetrolVsEvCalculator />
      <h2>FAQ</h2>
      {PETROL_VS_EV_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
