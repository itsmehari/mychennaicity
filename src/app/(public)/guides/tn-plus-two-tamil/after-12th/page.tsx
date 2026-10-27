import type { Metadata } from "next";
import { EducationTamilPillar } from "@/components/education/education-tamil-pillar";
import { HSE_PILLAR_TA } from "@/content/education/hse-tamil";
import {
  EDUCATION_AFTER_12TH_PATH,
  educationClusterPath,
  educationHreflang,
} from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const copy = HSE_PILLAR_TA["after-12th"];
const taPath = educationClusterPath("after-12th", "ta");

export const metadata: Metadata = {
  title: copy.seoTitle,
  description: copy.seoDescription,
  alternates: educationHreflang(EDUCATION_AFTER_12TH_PATH, taPath, getSiteUrl()),
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
    <EducationTamilPillar
      enPath={EDUCATION_AFTER_12TH_PATH}
      taPath={taPath}
      title={copy.title}
      dek={copy.dek}
      crumb="12-க்குப் பிறகு"
      paragraphs={copy.paragraphs}
    />
  );
}
