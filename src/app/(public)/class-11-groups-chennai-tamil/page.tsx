import type { Metadata } from "next";
import { EducationCampaignPage } from "@/components/education/education-campaign-page";
import { HSE_M1 } from "@/content/education/hse-magnets";
import { HSE_M1_TA } from "@/content/education/hse-tamil";
import { educationHreflang } from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const metadata: Metadata = {
  title: HSE_M1_TA.seoTitle,
  description: HSE_M1_TA.seoDescription,
  alternates: educationHreflang(HSE_M1.path, HSE_M1.taPath, getSiteUrl()),
  openGraph: {
    title: fullSiteTitle(HSE_M1_TA.seoTitle),
    description: HSE_M1_TA.seoDescription,
    url: `${getSiteUrl()}${HSE_M1.taPath}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  other: { ...CHENNAI_GEO_META },
};

export default function Page() {
  return (
    <EducationCampaignPage
      page={HSE_M1}
      locale="ta"
      title={HSE_M1_TA.title}
      dek={HSE_M1_TA.dek}
      paragraphs={HSE_M1_TA.paragraphs}
    />
  );
}
