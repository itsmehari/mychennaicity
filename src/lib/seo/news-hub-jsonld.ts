import type { PublicArticleRow } from "@/domains/news";
import { CHENNAI_NEWS_HUB_FAQ } from "@/content/news/chennai-news-hub-faq";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";

const PAGE_PATH = "/chennai-local-news";

export function buildNewsHubJsonLdGraph(articles: PublicArticleRow[]) {
  const base = getSiteUrl();
  const pageUrl = `${base}${PAGE_PATH}`;
  const slice = articles.slice(0, 24);
  const latest = articles[0]?.publishedAt;
  const latestIso =
    latest instanceof Date
      ? latest.toISOString()
      : latest
        ? new Date(latest).toISOString()
        : null;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Chennai Local News — civic, neighbourhood & city updates",
      description:
        "Latest Chennai civic updates, neighbourhood developments, government announcements, transport, consumer reports, and public-interest stories for Greater Chennai residents.",
      isPartOf: { "@id": `${base}/#website` },
      inLanguage: "en-IN",
      about: CHENNAI_PLACE_GRAPH,
      contentLocation: CHENNAI_PLACE_GRAPH,
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": `${pageUrl}#storylist` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [
          ".mcc-news-hero__title",
          ".mcc-news-hero__lede",
          "#news-hub-faq",
        ],
      },
      ...(latestIso
        ? {
            dateModified: latestIso,
          }
        : {}),
    },
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collection`,
      url: pageUrl,
      name: "Chennai local news",
      isPartOf: { "@id": `${pageUrl}#webpage` },
      inLanguage: "en-IN",
      about: CHENNAI_PLACE_GRAPH,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
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
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#storylist`,
      name: "Latest Chennai local news",
      numberOfItems: slice.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: slice.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${base}/chennai-local-news/${a.slug}`,
        name: a.title,
        ...(a.publishedAt
          ? {
              datePublished:
                a.publishedAt instanceof Date
                  ? a.publishedAt.toISOString()
                  : new Date(a.publishedAt).toISOString(),
            }
          : {}),
      })),
    },
  ];

  const faq = buildFaqPageJsonLdFromItems(CHENNAI_NEWS_HUB_FAQ, {
    pageUrl,
    fragment: "news-hub-faq",
  });
  if (faq) {
    const { "@context": _c, ...faqNode } = faq as Record<string, unknown>;
    graph.push({ ...faqNode, "@id": `${pageUrl}#faq` });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
