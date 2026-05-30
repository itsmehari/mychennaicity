import type { PublicArticleRow } from "@/domains/news";
import {
  normalizeArticleHeroUrl,
  resolveArticleHeroAbsoluteUrl,
} from "@/lib/article-hero-image";
import { chennaiZones } from "@/lib/chennai-zones";
import { getSiteUrl } from "@/lib/env";
import { normalizeAreaHubSlug } from "@/lib/news-area-hint";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";
import { orgSameAsUrls } from "@/lib/seo/site-defaults";

function stripMarkdownLite(s: string): string {
  return s
    .replace(/^#+\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 160);
}

export type NewsArticleJsonLdOptions = {
  /** When true, both `[data-speakable=article-title]` and `[data-speakable=article-lead]` exist in DOM. */
  speakableSummaryLead?: boolean;
};

export function buildNewsArticleJsonLd(
  article: PublicArticleRow,
  options?: NewsArticleJsonLdOptions,
) {
  const base = getSiteUrl();
  const url = `${base}/chennai-local-news/${article.slug}`;
  const desc =
    article.summary ??
    article.dek ??
    stripMarkdownLite(article.reportBody ?? article.body ?? "");
  const image =
    normalizeArticleHeroUrl(article.heroImageUrl) != null
      ? resolveArticleHeroAbsoluteUrl(article)
      : `${base}/favicon.ico`;
  const published = article.publishedAt?.toISOString() ?? article.createdAt.toISOString();
  const modified = article.updatedAt.toISOString();
  const sameAs = orgSameAsUrls();
  const keywords =
    article.category != null && article.category.trim()
      ? [article.category.trim(), "Chennai", "Tamil Nadu", "Greater Chennai"]
      : ["Chennai", "Tamil Nadu", "Greater Chennai"];

  const publisher: Record<string, unknown> = {
    "@type": "Organization",
    name: "mychennaicity.in",
    url: base,
    logo: {
      "@type": "ImageObject",
      url: `${base}/opengraph-image`,
      width: 1200,
      height: 630,
    },
  };
  if (sameAs.length) publisher.sameAs = sameAs;

  const core: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: desc,
    image,
    datePublished: published,
    dateModified: modified,
    inLanguage: "en-IN",
    spatialCoverage: CHENNAI_PLACE_GRAPH,
    articleLocation: (() => {
      const hub = normalizeAreaHubSlug(article.areaHubSlug);
      const zone = hub ? chennaiZones.find((z) => z.slug === hub) : undefined;
      if (zone) {
        return {
          "@type": "Place",
          name: zone.label,
          url: `${base}/areas/${zone.slug}`,
          containedInPlace: {
            "@type": "Place",
            name: "Greater Chennai",
            containedInPlace: CHENNAI_PLACE_GRAPH,
          },
        };
      }
      return {
        "@type": "Place",
        name: "Greater Chennai",
        containedInPlace: CHENNAI_PLACE_GRAPH,
      };
    })(),
    keywords: keywords.join(", "),
    author: (() => {
      const byline = article.authorByline?.trim();
      if (byline) {
        const person: Record<string, unknown> = {
          "@type": "Person",
          name: byline,
        };
        const rawSame = article.authorSameAs?.trim();
        if (rawSame) {
          const urls = rawSame
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          if (urls.length) person.sameAs = urls;
        }
        return person;
      }
      return {
        "@type": "Organization",
        name: "mychennaicity.in editorial",
        url: base,
      };
    })(),
    publisher,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isAccessibleForFree: true,
    url,
  };

  if (article.category?.trim()) {
    core.articleSection = article.category.trim();
  }

  if (article.sourceUrl?.trim()) {
    const sourceUrl = article.sourceUrl.trim();
    core.isBasedOn = {
      "@type": "CreativeWork",
      url: sourceUrl,
      ...(article.sourceName?.trim()
        ? { name: article.sourceName.trim() }
        : {}),
    };
    if (sourceUrl.toLowerCase().includes(".pdf")) {
      core.associatedMedia = {
        "@type": "MediaObject",
        contentUrl: sourceUrl,
        encodingFormat: "application/pdf",
        ...(article.sourceName?.trim()
          ? { name: article.sourceName.trim() }
          : {}),
      };
    }
  }

  const reportText = article.reportBody ?? article.body ?? "";
  if (/G\.O\.\s*\(Rt\.\)/i.test(`${article.title}\n${reportText}`)) {
    core.about = [
      {
        "@type": "GovernmentOrganization",
        name: "Government of Tamil Nadu",
      },
      {
        "@type": "Thing",
        name: "Tamil Nadu IAS cadre transfer and posting order",
      },
    ];
  }

  if (options?.speakableSummaryLead) {
    core.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: [
        '[data-speakable="article-title"]',
        '[data-speakable="article-lead"]',
      ],
    };
  }

  return core;
}

export function buildBreadcrumbJsonLd(
  slug: string,
  title: string,
  options?: { category?: string | null; topicHref?: string | null },
) {
  const base = getSiteUrl();
  const elements: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: base,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Chennai local news",
      item: `${base}/chennai-local-news`,
    },
  ];

  const category = options?.category?.trim();
  const topicHref = options?.topicHref?.trim();
  if (category) {
    elements.push({
      "@type": "ListItem",
      position: elements.length + 1,
      name: category,
      item: topicHref
        ? `${base}${topicHref.startsWith("/") ? topicHref : `/${topicHref}`}`
        : `${base}/chennai-local-news`,
    });
  }

  elements.push({
    "@type": "ListItem",
    position: elements.length + 1,
    name: title,
    item: `${base}/chennai-local-news/${slug}`,
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements,
  };
}
