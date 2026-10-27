import type { Metadata } from "next";
import { EducationCampaignPage } from "@/components/education/education-campaign-page";
import { HSE_M1 } from "@/content/education/hse-magnets";
import { educationHreflang } from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildEducationExplainerJsonLd } from "@/lib/seo/education-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const metadata: Metadata = {
  title: HSE_M1.seoTitle,
  description: HSE_M1.seoDescription,
  alternates: educationHreflang(HSE_M1.path, HSE_M1.taPath, getSiteUrl()),
  openGraph: {
    title: fullSiteTitle(HSE_M1.seoTitle),
    description: HSE_M1.seoDescription,
    url: `${getSiteUrl()}${HSE_M1.path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  other: { ...CHENNAI_GEO_META },
};

export default function Class11GroupsChennaiPage() {
  const jsonLd = buildEducationExplainerJsonLd({
    path: HSE_M1.path,
    name: HSE_M1.seoTitle,
    description: HSE_M1.seoDescription,
    faq: HSE_M1.faq,
    faqFragment: HSE_M1.faqFragment,
  });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EducationCampaignPage page={HSE_M1} />
    </>
  );
}
