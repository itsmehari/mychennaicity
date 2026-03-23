import type { MetadataRoute } from "next";
import { listArticlesForSitemap, listTopicKeysForChennai } from "@/domains/news";
import { chennaiZones } from "@/lib/chennai-zones";
import { categoryToTopicSlug } from "@/lib/news-topics";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mychennaicity.in";
  const now = new Date();

  let articleRows: { slug: string; lastModified: Date }[] = [];
  let topicKeys: string[] = [];
  try {
    articleRows = await listArticlesForSitemap();
    topicKeys = await listTopicKeysForChennai();
  } catch {
    /* DATABASE_URL unset or DB unreachable */
  }

  const hubLastModified =
    articleRows.length > 0
      ? new Date(
          Math.max(
            ...articleRows.map((r) => r.lastModified.getTime()),
          ),
        )
      : now;

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/chennai-local-news`,
      lastModified: hubLastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/events`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/jobs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/directory`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const areaEntries: MetadataRoute.Sitemap = chennaiZones.map((z) => ({
    url: `${base}/areas/${z.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articleEntries: MetadataRoute.Sitemap = articleRows.map((a) => ({
    url: `${base}/chennai-local-news/${a.slug}`,
    lastModified: a.lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const topicEntries: MetadataRoute.Sitemap = topicKeys.map((cat) => ({
    url: `${base}/chennai-local-news/topic/${categoryToTopicSlug(cat)}`,
    lastModified: hubLastModified,
    changeFrequency: "weekly" as const,
    priority: 0.55,
  }));

  return [
    ...staticEntries,
    ...areaEntries,
    ...articleEntries,
    ...topicEntries,
  ];
}
