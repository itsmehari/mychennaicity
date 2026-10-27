import type { Metadata } from "next";
import { EducationExplainerPage } from "@/components/education/education-explainer-page";
import type { EducationExplainer } from "@/content/education/hse-pathways";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import {
  buildEducationCollectionJsonLd,
  buildEducationExplainerJsonLd,
} from "@/lib/seo/education-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import { educationHreflang } from "@/content/education/paths";

export function explainerMetadata(page: EducationExplainer): Metadata {
  const base = getSiteUrl();
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: page.taPath
      ? educationHreflang(page.path, page.taPath, base)
      : { canonical: `${base}${page.path}` },
    openGraph: {
      title: fullSiteTitle(page.seoTitle),
      description: page.seoDescription,
      url: `${base}${page.path}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    ...(page.geo ? { other: { ...CHENNAI_GEO_META } } : {}),
  };
}

export function EducationExplainerRoute({ page }: { page: EducationExplainer }) {
  const jsonLd = page.aeo
    ? buildEducationCollectionJsonLd({
        path: page.path,
        name: page.seoTitle,
        description: page.seoDescription,
        faq: page.faq,
        faqFragment: page.faqFragment,
        children: page.childLinks
          .filter((l) => l.href.startsWith("/"))
          .map((l) => ({ name: l.label, path: l.href })),
        speakable: true,
      })
    : buildEducationExplainerJsonLd({
        path: page.path,
        name: page.seoTitle,
        description: page.seoDescription,
        faq: page.faq,
        faqFragment: page.faqFragment,
      });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EducationExplainerPage page={page} />
    </>
  );
}
