import type { Metadata } from "next";
import { AcBillPredictor } from "@/components/compulsive/ac-bill-predictor";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { AC_BILL_FAQ, AC_BILL_PATH } from "@/content/compulsive/ac-bill";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai AC bill predictor";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Directional Chennai AC bill predictor — estimate monthly units from tonnage and hours, then stress-test summer habits.",
  alternates: { canonical: `${getSiteUrl()}${AC_BILL_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "If I run 2 ACs 8 hours, what’s my EB risk? Illustrative only.",
    url: `${getSiteUrl()}${AC_BILL_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function AcBillPredictorPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "AC bill predictor" },
      ]}
      eyebrow="Cost desk · EB"
      title="AC bill predictor"
      dek="Rough units and rupee bands for Chennai summers — not a TNPDCL invoice. Pair with your actual bill slabs."
      related={[
        { href: compulsivePath("petrol-vs-ev"), label: "Petrol vs EV calculator" },
        { href: compulsivePath("afford-area"), label: "Afford-this-area calculator" },
        {
          href: "/chennai-local-news/tamil-nadu-high-electricity-bills-july-august-2026-tnpdcl-reinspection",
          label: "TN high electricity bills desk",
        },
        { href: "/chennai-gold-rate", label: "Gold rate desk" },
      ]}
    >
      <GuideDisclaimer
        kind="money"
        extra="Not an official TANGEDCO / TNPDCL estimate."
      />
      <AcBillPredictor />
      <h2>FAQ</h2>
      {AC_BILL_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
