import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { UsedVehiclePulse } from "@/components/compulsive/used-vehicle-pulse";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { compulsivePath } from "@/content/compulsive/index";
import {
  USED_VEHICLE_FAQ,
  USED_VEHICLE_PATH,
} from "@/content/compulsive/used-vehicle";
import { CHENNAI_SALARY_GUIDE_PATH } from "@/content/guides/chennai-salary-guide-2026";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai used vehicle price pulse";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Directional Chennai used price bands for hatchbacks, compact SUVs, Activa-class scooters, and 150cc bikes — by year bucket. Editorial synthesis, not classified ads.",
  alternates: { canonical: `${getSiteUrl()}${USED_VEHICLE_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Chennai used hatch, SUV, scooter, and bike price pulse by year — planning figures, not live listings.",
    url: `${getSiteUrl()}${USED_VEHICLE_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function UsedVehiclePricePulsePage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Used vehicle pulse" },
      ]}
      eyebrow="Cost desk · Mobility"
      title="Used vehicle price pulse"
      dek="Directional Chennai bands for hatch, compact SUV, Activa-class scooter, and 150cc bike — filter by segment, read by year. Editorial synthesis, not classified ads."
      related={[
        { href: compulsivePath("petrol-vs-ev"), label: "Petrol vs EV calculator" },
        { href: compulsivePath("afford-area"), label: "Afford-this-area calculator" },
        { href: CHENNAI_SALARY_GUIDE_PATH, label: "Salary guide 2026" },
        { href: compulsivePath("wedding-venue"), label: "Wedding venue costs" },
      ]}
    >
      <GuideDisclaimer kind="money" />
      <UsedVehiclePulse />
      <h2>FAQ</h2>
      {USED_VEHICLE_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
