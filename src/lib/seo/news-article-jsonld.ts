import type { PublicArticleRow } from "@/domains/news";
import {
  normalizeArticleHeroUrl,
  resolveArticleHeroAbsoluteUrl,
} from "@/lib/article-hero-image";
import { chennaiZones } from "@/lib/chennai-zones";
import { isSwmRulesArticleSlug } from "@/content/civic-swm/swm-rules-aeo";
import { getSiteUrl } from "@/lib/env";
import { normalizeAreaHubSlug } from "@/lib/news-area-hint";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";
import { defaultOgImageAbsoluteUrl, orgSameAsUrls } from "@/lib/seo/site-defaults";

function stripMarkdownLite(s: string): string {
  return s
    .replace(/^#+\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 160);
}

function countWords(...parts: (string | null | undefined)[]): number {
  const text = parts
    .filter((p): p is string => Boolean(p?.trim()))
    .join(" ")
    .replace(/[#*_`[\]()]/g, " ");
  const words = text.match(/\b[\p{L}\p{N}']+\b/gu);
  return words?.length ?? 0;
}

function buildPublisher(base: string): Record<string, unknown> {
  const sameAs = orgSameAsUrls();
  const publisher: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${base}/#org`,
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
  return publisher;
}

/** Article images for JSON-LD — always includes a 1200×630 OG image for Google Article eligibility. */
export function buildArticleImageObjects(
  article: Pick<PublicArticleRow, "slug" | "heroImageUrl">,
): Record<string, unknown>[] {
  const ogImage = defaultOgImageAbsoluteUrl();
  const images: Record<string, unknown>[] = [
    {
      "@type": "ImageObject",
      url: ogImage,
      width: 1200,
      height: 630,
    },
  ];

  const heroNorm = normalizeArticleHeroUrl(article.heroImageUrl);
  if (heroNorm) {
    const heroAbs = resolveArticleHeroAbsoluteUrl(article);
    if (heroAbs !== ogImage) {
      images.unshift({
        "@type": "ImageObject",
        url: heroAbs,
      });
    }
  }

  return images;
}

export type NewsArticleJsonLdOptions = {
  /** When true, both `[data-speakable=article-title]` and `[data-speakable=article-lead]` exist in DOM. */
  speakableSummaryLead?: boolean;
  /** Extra CSS selectors for SpeakableSpecification (must exist in the rendered DOM). */
  speakableExtraSelectors?: string[];
};

export function buildNewsArticleJsonLd(
  article: PublicArticleRow,
  options?: NewsArticleJsonLdOptions,
) {
  const base = getSiteUrl();
  const url = `${base}/chennai-local-news/${article.slug}`;
  const webpageId = `${url}#webpage`;
  const articleId = `${url}#article`;
  const primaryImageId = `${url}#primaryimage`;
  const desc =
    article.summary ??
    article.dek ??
    stripMarkdownLite(article.reportBody ?? article.body ?? "");
  const imageObjects = buildArticleImageObjects(article);
  const primaryImage =
    imageObjects.find(
      (img) => typeof img.width === "number" && img.width >= 1200,
    ) ?? imageObjects[0]!;
  const published = article.publishedAt?.toISOString() ?? article.createdAt.toISOString();
  const modified = article.updatedAt.toISOString();
  const keywords =
    article.category != null && article.category.trim()
      ? [article.category.trim(), "Chennai", "Tamil Nadu", "Greater Chennai"]
      : ["Chennai", "Tamil Nadu", "Greater Chennai"];

  const author = (() => {
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
  })();

  const articleLocation = (() => {
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
  })();

  const newsArticle: Record<string, unknown> = {
    "@type": ["NewsArticle", "Article"],
    "@id": articleId,
    headline: article.title,
    description: desc,
    image: imageObjects.map((img) =>
      img.url === primaryImage.url
        ? { "@id": primaryImageId }
        : img,
    ),
    thumbnailUrl:
      typeof primaryImage.url === "string" ? primaryImage.url : defaultOgImageAbsoluteUrl(),
    datePublished: published,
    dateModified: modified,
    inLanguage: "en-IN",
    spatialCoverage: CHENNAI_PLACE_GRAPH,
    articleLocation,
    keywords: keywords.join(", "),
    author,
    publisher: { "@id": `${base}/#org` },
    isPartOf: { "@id": webpageId },
    mainEntityOfPage: { "@id": webpageId },
    isAccessibleForFree: true,
    url,
    wordCount: countWords(
      article.title,
      article.summary,
      article.dek,
      article.reportBody,
      article.analysisBody,
      article.body,
    ),
  };

  if (article.category?.trim()) {
    newsArticle.articleSection = article.category.trim();
  }

  if (article.sourceUrl?.trim()) {
    const sourceUrl = article.sourceUrl.trim();
    newsArticle.isBasedOn = {
      "@type": "CreativeWork",
      url: sourceUrl,
      ...(article.sourceName?.trim()
        ? { name: article.sourceName.trim() }
        : {}),
    };
    if (sourceUrl.toLowerCase().includes(".pdf")) {
      newsArticle.associatedMedia = {
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
    newsArticle.about = [
      {
        "@type": "GovernmentOrganization",
        name: "Government of Tamil Nadu",
      },
      {
        "@type": "Thing",
        name: "Tamil Nadu IAS cadre transfer and posting order",
      },
    ];
  } else if (isSwmRulesArticleSlug(article.slug)) {
    newsArticle.about = [
      {
        "@type": "Thing",
        name: "Solid Waste Management Rules, 2026",
      },
      {
        "@type": "GovernmentOrganization",
        name: "Greater Chennai Corporation",
      },
      {
        "@type": "GovernmentOrganization",
        name: "Ministry of Environment, Forest and Climate Change",
      },
    ];
  }

  const speakableSelectors: string[] = [];
  if (options?.speakableSummaryLead) {
    speakableSelectors.push(
      '[data-speakable="article-title"]',
      '[data-speakable="article-lead"]',
    );
  }
  if (options?.speakableExtraSelectors?.length) {
    if (!options.speakableSummaryLead) {
      speakableSelectors.push('[data-speakable="article-title"]');
    }
    for (const sel of options.speakableExtraSelectors) {
      const t = sel.trim();
      if (t && !speakableSelectors.includes(t)) speakableSelectors.push(t);
    }
  }
  if (speakableSelectors.length > 0) {
    newsArticle.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: speakableSelectors,
    };
  }

  const webpage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": webpageId,
    url,
    name: article.title,
    description: desc,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: base,
      name: "mychennaicity.in",
    },
    primaryImageOfPage: { "@id": primaryImageId },
    datePublished: published,
    dateModified: modified,
    inLanguage: "en-IN",
  };

  const primaryImageNode: Record<string, unknown> = {
    "@type": "ImageObject",
    "@id": primaryImageId,
    ...primaryImage,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webpage, primaryImageNode, buildPublisher(base), newsArticle],
  };
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
