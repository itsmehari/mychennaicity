/**
 * Rolling “last 20 days” sitemap for Search Console recrawl.
 * Live URL: /sitemap-recent.xml
 *
 * Includes indexable DB rows whose lastmod falls in the window, plus hubs
 * shipped or materially updated in that window. Does not replace sitemap.xml.
 */
import { listClassifiedListingsForSitemap } from "@/domains/classifieds";
import { listDirectoryEntriesForSitemap } from "@/domains/directory";
import { listEventsForSitemap } from "@/domains/events";
import { listJobSeekerPostsForSitemap } from "@/domains/job-seekers";
import { listJobsForSitemap } from "@/domains/jobs";
import { listArticlesForSitemap } from "@/domains/news";
import { COMPULSIVE_SITEMAP_ENTRIES, COMPULSIVE_TAMIL_SITEMAP_PATHS } from "@/content/compulsive/index";
import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { CHENNAI_EV_GUIDE_PATH } from "@/content/guides/chennai-ev-charging";
import { CHENNAI_SALARY_GUIDE_PATH } from "@/content/guides/chennai-salary-guide-2026";
import {
  CHENNAI_TOURISM_HUB_PATH,
  ECR_WEEKEND_PLAN_PATH,
} from "@/content/tourism";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_CLASSIFIEDS_HUB_PATH, chennaiClassifiedDetailPath } from "@/lib/routes/chennai-classifieds";
import { CHENNAI_GOLD_RATE_HUB_PATH } from "@/lib/routes/chennai-gold-rate";
import {
  CHENNAI_JOBS_HUB_PATH,
  CHENNAI_JOBS_LOOKING_PATH,
  chennaiJobsDetailPath,
  chennaiJobSeekerDetailPath,
} from "@/lib/routes/chennai-jobs";
import { directoryDetailPath } from "@/lib/routes/directory";
import {
  WHATSAPP_ADMINS_TOOLKIT_PATH,
  WHATSAPP_SPAMMERS_PAGE_PATH,
} from "@/lib/whatsapp-community";

export const RECENT_SITEMAP_WINDOW_DAYS = 20;
export const RECENT_SITEMAP_PATH = "/sitemap-recent.xml";

export type RecentSitemapUrl = {
  loc: string;
  lastModified: Date;
};

/** High-churn hubs — lastmod is request time so Google keeps recrawling them. */
const DAILY_HUB_PATHS = [
  "/",
  "/chennai-local-news",
  "/chennai-local-events",
  CHENNAI_JOBS_HUB_PATH,
  CHENNAI_JOBS_LOOKING_PATH,
  CHENNAI_CLASSIFIEDS_HUB_PATH,
  CHENNAI_GOLD_RATE_HUB_PATH,
  "/chennai-today",
  "/directory",
  "/contact",
] as const;

/**
 * One-shot launches / substantial updates. Drop out of the recent sitemap
 * automatically once lastmod ages past the 20-day window.
 */
const RECENT_LAUNCH_PATHS: { path: string; lastModified: string }[] = [
  { path: "/chennai-today-tamil", lastModified: "2026-08-14" },
  { path: CHENNAI_TOURISM_HUB_PATH, lastModified: "2026-08-15" },
  { path: ECR_WEEKEND_PLAN_PATH, lastModified: "2026-08-15" },
  { path: CHENNAI_FESTIVALS_GUIDE_PATH, lastModified: "2026-08-11" },
  { path: CHENNAI_SALARY_GUIDE_PATH, lastModified: "2026-08-11" },
  { path: CHENNAI_EV_GUIDE_PATH, lastModified: "2026-08-11" },
  { path: WHATSAPP_ADMINS_TOOLKIT_PATH, lastModified: "2026-08-11" },
  { path: WHATSAPP_SPAMMERS_PAGE_PATH, lastModified: "2026-08-08" },
  { path: "/guides/how-to-use-mychennaicity", lastModified: "2026-08-08" },
  { path: "/guides/bulk-waste-generator-readiness-checklist-2026", lastModified: "2026-08-08" },
  { path: "/civic-tools/address-form-fixer", lastModified: "2026-08-12" },
  { path: "/civic-tools/streetlight-dead-spots", lastModified: "2026-08-12" },
  ...COMPULSIVE_SITEMAP_ENTRIES.map((entry) => ({
    path: entry.path,
    lastModified: "2026-08-12",
  })),
  ...COMPULSIVE_TAMIL_SITEMAP_PATHS.map((path) => ({
    path,
    lastModified: "2026-08-14",
  })),
];

export function recentSitemapSince(now = new Date()): Date {
  return new Date(now.getTime() - RECENT_SITEMAP_WINDOW_DAYS * 24 * 60 * 60 * 1000);
}

function inWindow(date: Date, since: Date): boolean {
  return date.getTime() >= since.getTime();
}

function abs(base: string, path: string): string {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function parseDay(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00.000+05:30`);
}

export async function listRecentSitemapUrls(
  now = new Date(),
): Promise<RecentSitemapUrl[]> {
  const base = getSiteUrl().replace(/\/$/, "");
  const since = recentSitemapSince(now);
  const byLoc = new Map<string, Date>();

  const add = (loc: string, lastModified: Date) => {
    if (!inWindow(lastModified, since)) return;
    const prev = byLoc.get(loc);
    if (!prev || lastModified.getTime() > prev.getTime()) {
      byLoc.set(loc, lastModified);
    }
  };

  for (const path of DAILY_HUB_PATHS) {
    add(abs(base, path), now);
  }

  for (const entry of RECENT_LAUNCH_PATHS) {
    add(abs(base, entry.path), parseDay(entry.lastModified));
  }

  try {
    const [
      articleRows,
      eventRows,
      jobRows,
      jobSeekerRows,
      classifiedRows,
      directoryRows,
    ] = await Promise.all([
      listArticlesForSitemap(),
      listEventsForSitemap(),
      listJobsForSitemap(),
      listJobSeekerPostsForSitemap(),
      listClassifiedListingsForSitemap(),
      listDirectoryEntriesForSitemap(),
    ]);

    for (const row of articleRows) {
      add(abs(base, `/chennai-local-news/${row.slug}`), row.lastModified);
    }
    for (const row of eventRows) {
      add(abs(base, `/chennai-local-events/${row.slug}`), row.lastModified);
    }
    for (const row of jobRows) {
      add(abs(base, chennaiJobsDetailPath(row.slug)), row.lastModified);
    }
    for (const row of jobSeekerRows) {
      add(abs(base, chennaiJobSeekerDetailPath(row.slug)), row.lastModified);
    }
    for (const row of classifiedRows) {
      add(abs(base, chennaiClassifiedDetailPath(row.slug)), row.lastModified);
    }
    for (const row of directoryRows) {
      add(abs(base, directoryDetailPath(row.type, row.slug)), row.lastModified);
    }
  } catch (err) {
    console.warn(
      "[sitemap-recent] DB unreachable — emitting static recent hubs only.",
      err,
    );
  }

  return [...byLoc.entries()]
    .map(([loc, lastModified]) => ({ loc, lastModified }))
    .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
}

export function escapeSitemapXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function recentSitemapXml(urls: RecentSitemapUrl[]): string {
  const rows = urls
    .map((u) => {
      const lastmod = u.lastModified.toISOString();
      return `  <url>
    <loc>${escapeSitemapXml(u.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows}
</urlset>
`;
}
