import type { Metadata } from "next";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { BwgReadinessGuide } from "@/components/guides/bwg-readiness/bwg-readiness-guide";
import {
  BWG_DATE_MODIFIED,
  BWG_DATE_PUBLISHED,
  BWG_GUIDE_PATH,
  BWG_H1,
  BWG_META_DESCRIPTION,
  BWG_SEO_TITLE,
  BWG_STANDFIRST,
} from "@/content/guides/bwg-readiness-2026/meta";
import { MYTHS } from "@/content/guides/bwg-readiness-2026/myths";
import { ACTION_ITEMS } from "@/content/guides/bwg-readiness-2026/action-plan";
import { getSiteUrl } from "@/lib/env";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const pageUrl = `${getSiteUrl()}${BWG_GUIDE_PATH}`;

export const metadata: Metadata = {
  title: BWG_SEO_TITLE,
  description: BWG_META_DESCRIPTION,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: fullSiteTitle(BWG_SEO_TITLE),
    description: BWG_META_DESCRIPTION,
    url: pageUrl,
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(BWG_SEO_TITLE),
    description: BWG_META_DESCRIPTION,
    images: ["/twitter-image"],
  },
};

export default function BulkWasteGeneratorReadinessGuidePage() {
  const faqLd = buildFaqPageJsonLdFromItems(
    MYTHS.map((m) => ({
      question: `Myth: ${m.myth}`,
      answer: m.reality,
    })),
    { pageUrl, fragment: "section-myths" },
  );

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: BWG_SEO_TITLE,
        description: BWG_META_DESCRIPTION,
        isPartOf: { "@id": `${getSiteUrl()}/#website` },
        datePublished: BWG_DATE_PUBLISHED,
        dateModified: BWG_DATE_MODIFIED,
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: BWG_H1,
        description: BWG_STANDFIRST,
        datePublished: BWG_DATE_PUBLISHED,
        dateModified: BWG_DATE_MODIFIED,
        author: {
          "@type": "Organization",
          name: "MyChennaiCity Editorial",
          url: getSiteUrl(),
        },
        publisher: {
          "@type": "Organization",
          name: "MyChennaiCity",
          url: getSiteUrl(),
        },
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        articleSection: "Chennai Civic Awareness",
        keywords: [
          "Bulk Waste Generator",
          "Solid Waste Management Rules 2026",
          "Chennai",
          "compliance checklist",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: getSiteUrl(),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guides",
            item: `${getSiteUrl()}/guides/chennai-tech-careers`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "BWG readiness checklist 2026",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "30-day Bulk Waste Generator readiness action plan",
        description:
          "A structured 30-day plan for Chennai organisations to improve BWG operational and documentary readiness under the Solid Waste Management Rules, 2026.",
        step: ACTION_ITEMS.slice(0, 12).map((item, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: item.title,
          text: `${item.phase}: ${item.title}`,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}

      <div className={`${interiorMainClassName} !max-w-none !px-0`}>
        <div className="mx-auto max-w-[1120px] px-4">
          <PageBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides" },
              { label: "BWG readiness checklist 2026" },
            ]}
          />
        </div>

        <BwgReadinessGuide />

        <div className="mx-auto max-w-[1120px] px-4">
          <InteriorCrossNav />
        </div>
      </div>
    </>
  );
}
