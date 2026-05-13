import type { PublicArticleRow } from "@/domains/news";
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

/** Slugs published as reader / advertiser listings (not editorial news). */
export function isReaderListingSlug(slug: string): boolean {
  return slug.startsWith("reader-listing-");
}

/**
 * WebPage JSON-LD for classified-style posts routed under Chennai local news.
 * Avoids NewsArticle when the page is not a news report.
 */
export function buildReaderListingWebPageJsonLd(article: PublicArticleRow) {
  const base = getSiteUrl();
  const url = `${base}/chennai-local-news/${article.slug}`;
  const desc =
    article.summary ??
    article.dek ??
    stripMarkdownLite(article.reportBody ?? article.body ?? "");
  const image = article.heroImageUrl ?? `${base}/favicon.ico`;
  const published = article.publishedAt?.toISOString() ?? article.createdAt.toISOString();
  const modified = article.updatedAt.toISOString();
  const sameAs = orgSameAsUrls();

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

  const hub = normalizeAreaHubSlug(article.areaHubSlug);
  const zone = hub ? chennaiZones.find((z) => z.slug === hub) : undefined;
  const aboutPlace =
    zone != null
      ? {
          "@type": "Place" as const,
          name: zone.label,
          url: `${base}/areas/${zone.slug}`,
          containedInPlace: CHENNAI_PLACE_GRAPH,
        }
      : ({
          "@type": "Place" as const,
          name: "Saidapet, Chennai",
          containedInPlace: CHENNAI_PLACE_GRAPH,
        } as const);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: article.title,
    description: desc,
    url,
    image,
    inLanguage: "en-IN",
    datePublished: published,
    dateModified: modified,
    isPartOf: { "@type": "WebSite", name: "mychennaicity.in", url: base },
    publisher,
    about: aboutPlace,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
