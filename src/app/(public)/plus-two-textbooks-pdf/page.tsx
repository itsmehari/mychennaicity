import type { Metadata } from "next";
import { EducationCampaignPage } from "@/components/education/education-campaign-page";
import { HSE_M2 } from "@/content/education/hse-magnets";
import { educationHreflang } from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { buildEducationExplainerJsonLd } from "@/lib/seo/education-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const metadata: Metadata = {
  title: HSE_M2.seoTitle,
  description: HSE_M2.seoDescription,
  alternates: educationHreflang(HSE_M2.path, HSE_M2.taPath, getSiteUrl()),
  openGraph: {
    title: fullSiteTitle(HSE_M2.seoTitle),
    description: HSE_M2.seoDescription,
    url: `${getSiteUrl()}${HSE_M2.path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function PlusTwoTextbooksPdfPage() {
  const jsonLd = buildEducationExplainerJsonLd({
    path: HSE_M2.path,
    name: HSE_M2.seoTitle,
    description: HSE_M2.seoDescription,
    faq: HSE_M2.faq,
    faqFragment: HSE_M2.faqFragment,
  });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EducationCampaignPage page={HSE_M2} />
    </>
  );
}
