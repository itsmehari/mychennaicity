import type { Metadata } from "next";
import { EducationTextbooksHub } from "@/components/education/education-textbook-finder";
import { HSE_TEXTBOOKS_HUB } from "@/content/education/hse-textbooks";
import {
  EDUCATION_TEXTBOOKS_PATH,
  educationClusterPath,
  educationHreflang,
} from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildEducationCollectionJsonLd } from "@/lib/seo/education-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import type { HubAeoContent } from "@/content/aeo/hub-answers";
import { EDUCATION_PAGES } from "@/content/education/index";

const aeo: HubAeoContent = {
  id: "tn-plus-two-textbooks-aeo",
  eyebrow: "Official books",
  title: "Where are the Plus Two textbook PDFs?",
  dek: "On the Tamil Nadu Textbook Corporation / SCERT channel — not hosted here.",
  directAnswer:
    "Tamil Nadu Class 11 and 12 textbooks are official SCERT / Textbook Corporation works. This catalogue names the volumes each group needs and sends you to the government portal. mychennaicity.in does not upload the files. If a PDF URL is missing, the finder stays and the button says verify on official portal.",
  contextParagraphs: [
    "Last checked 12 September 2026. Use textbookcorp.in. Ignore pirate “Samacheer PDF” hosts.",
  ],
  facts: [
    { term: "Catalogue", definition: "This page lists class and subject finders." },
    { term: "Campaign", definition: "How-to-download copy lives on /plus-two-textbooks-pdf." },
  ],
  disclaimer: "Copyright stays with the state textbook system.",
};

export const metadata: Metadata = {
  title: HSE_TEXTBOOKS_HUB.seoTitle,
  description: HSE_TEXTBOOKS_HUB.seoDescription,
  alternates: educationHreflang(
    EDUCATION_TEXTBOOKS_PATH,
    educationClusterPath("textbooks", "ta"),
    getSiteUrl(),
  ),
  openGraph: {
    title: fullSiteTitle(HSE_TEXTBOOKS_HUB.seoTitle),
    description: HSE_TEXTBOOKS_HUB.seoDescription,
    url: `${getSiteUrl()}${EDUCATION_TEXTBOOKS_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  other: { ...CHENNAI_GEO_META },
};

export default function TnPlusTwoTextbooksPage() {
  const children = EDUCATION_PAGES.filter((p) => p.id.startsWith("textbooks-"));
  const jsonLd = buildEducationCollectionJsonLd({
    path: EDUCATION_TEXTBOOKS_PATH,
    name: HSE_TEXTBOOKS_HUB.seoTitle,
    description: HSE_TEXTBOOKS_HUB.seoDescription,
    children: children.map((p) => ({ name: p.title, path: p.path })),
    speakable: true,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EducationTextbooksHub
        title={HSE_TEXTBOOKS_HUB.title}
        dek={HSE_TEXTBOOKS_HUB.dek}
        paragraphs={HSE_TEXTBOOKS_HUB.paragraphs}
        aeo={aeo}
      />
    </>
  );
}
