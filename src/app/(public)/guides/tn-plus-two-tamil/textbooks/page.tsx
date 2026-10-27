import type { Metadata } from "next";
import { EducationTextbooksHub } from "@/components/education/education-textbook-finder";
import { HSE_PILLAR_TA } from "@/content/education/hse-tamil";
import {
  EDUCATION_TEXTBOOKS_PATH,
  educationClusterPath,
  educationHreflang,
} from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const copy = HSE_PILLAR_TA.textbooks;
const taPath = educationClusterPath("textbooks", "ta");

export const metadata: Metadata = {
  title: copy.seoTitle,
  description: copy.seoDescription,
  alternates: educationHreflang(EDUCATION_TEXTBOOKS_PATH, taPath, getSiteUrl()),
  openGraph: {
    title: fullSiteTitle(copy.seoTitle),
    description: copy.seoDescription,
    url: `${getSiteUrl()}${taPath}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  other: { ...CHENNAI_GEO_META },
};

export default function Page() {
  return (
    <EducationTextbooksHub
      locale="ta"
      title={copy.title}
      dek={copy.dek}
      paragraphs={copy.paragraphs}
    />
  );
}
