import type { MetadataRoute } from "next";
import { listEventsForSitemap } from "@/domains/events";
import { listJobsForSitemap } from "@/domains/jobs";
import {
  listArticlesForSitemap,
  listTopicKeysForChennai,
  type SitemapArticleRow,
} from "@/domains/news";
import { chennaiZones } from "@/lib/chennai-zones";
import { categoryToTopicSlug } from "@/lib/news-topics";
import { CHENNAI_JOBS_HUB_PATH, chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mychennaicity.in";
  const now = new Date();

  let articleRows: SitemapArticleRow[] = [];
  let topicKeys: string[] = [];
  let eventRows: { slug: string; lastModified: Date }[] = [];
  let jobRows: { slug: string; lastModified: Date }[] = [];
  try {
    articleRows = await listArticlesForSitemap();
    topicKeys = await listTopicKeysForChennai();
    eventRows = await listEventsForSitemap();
    jobRows = await listJobsForSitemap();
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
      url: `${base}/chennai-local-events`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}${CHENNAI_JOBS_HUB_PATH}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/guides/chennai-tech-careers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${base}/directory`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/elections-2026`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.72,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}/editorial-standards`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}/glossary`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.35,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${base}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${base}/community-guidelines`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.35,
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
    ...(a.heroImageUrl
      ? { images: [a.heroImageUrl] }
      : {}),
  }));

  const topicEntries: MetadataRoute.Sitemap = topicKeys.map((cat) => ({
    url: `${base}/chennai-local-news/topic/${categoryToTopicSlug(cat)}`,
    lastModified: hubLastModified,
    changeFrequency: "weekly" as const,
    priority: 0.55,
  }));

  const eventEntries: MetadataRoute.Sitemap = eventRows.map((e) => ({
    url: `${base}/chennai-local-events/${e.slug}`,
    lastModified: e.lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const jobEntries: MetadataRoute.Sitemap = jobRows.map((j) => ({
    url: `${base}${chennaiJobsDetailPath(j.slug)}`,
    lastModified: j.lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [
    ...staticEntries,
    ...areaEntries,
    ...articleEntries,
    ...topicEntries,
    ...eventEntries,
    ...jobEntries,
  ];
}
