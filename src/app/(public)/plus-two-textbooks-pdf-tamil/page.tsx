import type { Metadata } from "next";
import { EducationCampaignPage } from "@/components/education/education-campaign-page";
import { HSE_M2 } from "@/content/education/hse-magnets";
import { HSE_M2_TA } from "@/content/education/hse-tamil";
import { educationHreflang } from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const metadata: Metadata = {
  title: HSE_M2_TA.seoTitle,
  description: HSE_M2_TA.seoDescription,
  alternates: educationHreflang(HSE_M2.path, HSE_M2.taPath, getSiteUrl()),
  openGraph: {
    title: fullSiteTitle(HSE_M2_TA.seoTitle),
    description: HSE_M2_TA.seoDescription,
    url: `${getSiteUrl()}${HSE_M2.taPath}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <EducationCampaignPage
      page={HSE_M2}
      locale="ta"
      title={HSE_M2_TA.title}
      dek={HSE_M2_TA.dek}
      paragraphs={HSE_M2_TA.paragraphs}
    />
  );
}
