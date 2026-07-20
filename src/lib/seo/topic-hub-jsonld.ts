import type { PublicArticleRow } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";

export function buildTopicHubJsonLd(
  topicSlug: string,
  categoryLabel: string,
  articles: PublicArticleRow[],
  maxItems = 24,
) {
  const base = getSiteUrl();
  const pageUrl = `${base}/chennai-local-news/topic/${topicSlug}`;
  const slice = articles.slice(0, maxItems);
  const latest = articles[0]?.publishedAt ?? null;

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": pageUrl,
    url: pageUrl,
    name: `${categoryLabel} — Chennai local news`,
    description: `Latest ${categoryLabel} news for Chennai and nearby on mychennaicity.in.`,
    isPartOf: { "@id": `${base}/#website` },
    inLanguage: "en-IN",
    about: CHENNAI_PLACE_GRAPH,
    contentLocation: CHENNAI_PLACE_GRAPH,
    ...(latest ? { dateModified: latest.toISOString() } : {}),
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryLabel} articles — Chennai`,
    numberOfItems: slice.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: slice.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${base}/chennai-local-news/${a.slug}`,
      name: a.title,
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
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
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabel,
        item: pageUrl,
      },
    ],
  };

  return { collectionPage, itemList, breadcrumbs };
}
