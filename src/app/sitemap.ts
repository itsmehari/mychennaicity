import type { MetadataRoute } from "next";
import { listClassifiedListingsForSitemap } from "@/domains/classifieds";
import { listEventsForSitemap } from "@/domains/events";
import { listJobsForSitemap } from "@/domains/jobs";
import { listJobSeekerPostsForSitemap } from "@/domains/job-seekers";
import { listDirectoryEntriesForSitemap } from "@/domains/directory";
import {
  listArticlesForSitemap,
  listTopicKeysForChennai,
  type SitemapArticleRow,
} from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import { chennaiZones } from "@/lib/chennai-zones";
import { categoryToTopicSlug } from "@/lib/news-topics";
import { getGoldRateLastModifiedForSitemap } from "@/domains/gold-rate";
import { CHENNAI_GOLD_RATE_HUB_PATH } from "@/lib/routes/chennai-gold-rate";
import { CHENNAI_CLASSIFIEDS_HUB_PATH, chennaiClassifiedDetailPath } from "@/lib/routes/chennai-classifieds";
import { CHENNAI_JOBS_HUB_PATH, CHENNAI_JOBS_LOOKING_PATH, chennaiJobsDetailPath, chennaiJobSeekerDetailPath } from "@/lib/routes/chennai-jobs";
import { directoryDetailPath } from "@/lib/routes/directory";
import {
  WHATSAPP_ADMINS_TOOLKIT_PATH,
  WHATSAPP_COMMUNITY_GUIDE_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL,
  WHATSAPP_COMMUNITY_PARTNERS_PATH,
  WHATSAPP_SPAMMERS_PAGE_PATH,
} from "@/lib/whatsapp-community";
import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { CHENNAI_SALARY_GUIDE_PATH } from "@/content/guides/chennai-salary-guide-2026";
import { CHENNAI_EV_GUIDE_PATH } from "@/content/guides/chennai-ev-charging";
import { COMPULSIVE_SITEMAP_ENTRIES, COMPULSIVE_TAMIL_SITEMAP_PATHS } from "@/content/compulsive/index";
import { CIVIC_TOOL_SITEMAP_PATHS } from "@/lib/routes/civic-tools";

/** Always read Neon for open jobs / scheduled events — no stale build-time sitemap. */
export const dynamic = "force-dynamic";

function absoluteAssetUrl(base: string, url: string | null): string | null {
  if (!url?.trim()) return null;
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `${base}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
}

/**
 * Next.js sitemap XML does not escape `&` inside `<image:loc>` query strings.
 * Strip search params (e.g. Twitter `?format=jpg&name=large`) so the file stays valid.
 */
function sitemapSafeImageUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    parsed.search = "";
    const sanitized = parsed.toString();
    return sanitized.includes("&") ? null : sanitized;
  } catch {
    return url.includes("&") ? null : url;
  }
}

function latestModified(dates: Date[], fallback: Date): Date {
  if (dates.length === 0) return fallback;
  return new Date(Math.max(...dates.map((d) => d.getTime())));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  let articleRows: SitemapArticleRow[] = [];
  let topicKeys: string[] = [];
  let eventRows: { slug: string; lastModified: Date }[] = [];
  let jobRows: { slug: string; lastModified: Date }[] = [];
  let jobSeekerRows: { slug: string; lastModified: Date }[] = [];
  let classifiedRows: { slug: string; lastModified: Date }[] = [];
  let directoryRows: {
    type: string;
    slug: string;
    lastModified: Date;
  }[] = [];
  let goldRateLastModified: Date | null = null;
  try {
    articleRows = await listArticlesForSitemap();
    topicKeys = await listTopicKeysForChennai();
    eventRows = await listEventsForSitemap();
    jobRows = await listJobsForSitemap();
    jobSeekerRows = await listJobSeekerPostsForSitemap();
    classifiedRows = await listClassifiedListingsForSitemap();
    directoryRows = await listDirectoryEntriesForSitemap();
    goldRateLastModified = await getGoldRateLastModifiedForSitemap();
  } catch (err) {
    console.warn(
      "[sitemap] DB unreachable or misconfigured — emitting static URLs only (no article/topic/event/job/directory entries).",
      err,
    );
  }

  const hubLastModified = latestModified(
    articleRows.map((r) => r.lastModified),
    now,
  );

  const eventsLastModified = latestModified(
    eventRows.map((e) => e.lastModified),
    now,
  );

  const jobsLastModified = latestModified(
    [
      ...jobRows.map((j) => j.lastModified),
      ...jobSeekerRows.map((j) => j.lastModified),
    ],
    now,
  );

  const classifiedsLastModified = latestModified(
    classifiedRows.map((c) => c.lastModified),
    now,
  );

  const directoryLastModified = latestModified(
    directoryRows.map((d) => d.lastModified),
    now,
  );

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/llms.txt`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${base}/llms-full.txt`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${base}/aeo/chennai.md`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.75,
    },
    {
      url: `${base}/humans.txt`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/chennai-local-news`,
      lastModified: hubLastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/chennai-local-news/feed.xml`,
      lastModified: hubLastModified,
      changeFrequency: "hourly",
      priority: 0.65,
    },
    {
      url: `${base}${CHENNAI_JOBS_HUB_PATH}/feed.xml`,
      lastModified: jobsLastModified,
      changeFrequency: "hourly",
      priority: 0.55,
    },
    {
      url: `${base}/chennai-local-events/feed.xml`,
      lastModified: eventsLastModified,
      changeFrequency: "hourly",
      priority: 0.55,
    },
    {
      url: `${base}/areas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/chennai-local-events`,
      lastModified: eventsLastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}${CHENNAI_JOBS_HUB_PATH}`,
      lastModified: jobsLastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}${CHENNAI_JOBS_LOOKING_PATH}`,
      lastModified: jobsLastModified,
      changeFrequency: "weekly",
      priority: 0.68,
    },
    {
      url: `${base}${CHENNAI_CLASSIFIEDS_HUB_PATH}`,
      lastModified: classifiedsLastModified,
      changeFrequency: "weekly",
      priority: 0.66,
    },
    {
      url: `${base}${CHENNAI_GOLD_RATE_HUB_PATH}`,
      lastModified: goldRateLastModified ?? now,
      changeFrequency: "daily",
      priority: 0.88,
    },
    {
      url: `${base}/guides/chennai-tech-careers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${base}${CHENNAI_SALARY_GUIDE_PATH}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}${CHENNAI_FESTIVALS_GUIDE_PATH}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.68,
    },
    {
      url: `${base}${CHENNAI_EV_GUIDE_PATH}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.66,
    },
    ...COMPULSIVE_SITEMAP_ENTRIES.map((entry) => ({
      url: `${base}${entry.path}`,
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
    ...COMPULSIVE_TAMIL_SITEMAP_PATHS.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.68,
    })),
    {
      url: `${base}/guides/how-to-use-mychennaicity`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${base}/guides/bulk-waste-generator-readiness-checklist-2026`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/directory`,
      lastModified: directoryLastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/elections-2026`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.72,
    },
    ...CIVIC_TOOL_SITEMAP_PATHS.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/civic-tools" ? 0.74 : 0.7,
    })),
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
    {
      url: `${base}${WHATSAPP_COMMUNITY_PAGE_PATH}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}${WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}${WHATSAPP_COMMUNITY_GUIDE_PATH}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${base}${WHATSAPP_COMMUNITY_PARTNERS_PATH}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${base}${WHATSAPP_SPAMMERS_PAGE_PATH}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}${WHATSAPP_ADMINS_TOOLKIT_PATH}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.62,
    },
    {
      url: `${base}/business-profile/abk-liaison-llp`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const areaEntries: MetadataRoute.Sitemap = chennaiZones.map((z) => ({
    url: `${base}/areas/${z.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articleEntries: MetadataRoute.Sitemap = articleRows.map((a) => {
    const imageUrl = absoluteAssetUrl(base, a.heroImageUrl);
    const safeImageUrl = imageUrl ? sitemapSafeImageUrl(imageUrl) : null;
    return {
      url: `${base}/chennai-local-news/${a.slug}`,
      lastModified: a.lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.75,
      ...(safeImageUrl ? { images: [safeImageUrl] } : {}),
    };
  });

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

  const directoryEntries: MetadataRoute.Sitemap = directoryRows.map((d) => ({
    url: `${base}${directoryDetailPath(d.type, d.slug)}`,
    lastModified: d.lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.62,
  }));

  const jobSeekerEntries: MetadataRoute.Sitemap = jobSeekerRows.map((j) => ({
    url: `${base}${chennaiJobSeekerDetailPath(j.slug)}`,
    lastModified: j.lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.64,
  }));

  const classifiedEntries: MetadataRoute.Sitemap = classifiedRows.map((c) => ({
    url: `${base}${chennaiClassifiedDetailPath(c.slug)}`,
    lastModified: c.lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.63,
  }));

  return [
    ...staticEntries,
    ...areaEntries,
    ...articleEntries,
    ...topicEntries,
    ...eventEntries,
    ...jobEntries,
    ...jobSeekerEntries,
    ...classifiedEntries,
    ...directoryEntries,
  ];
}
