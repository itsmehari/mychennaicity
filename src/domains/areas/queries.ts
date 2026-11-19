import { and, count, desc, eq, ilike, isNotNull, or, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import {
  articles,
  cities,
  classifiedListings,
  employers,
  jobPostings,
} from "@/db/schema/tables";
import { reviveArticleRow, type PublicArticleRow } from "@/domains/news/queries";
import type { ClassifiedListingRow } from "@/domains/classifieds/queries";
import { patternsForAreaHub } from "@/content/jobs/job-localities";
import { publiclyOpenJobSql } from "@/domains/jobs/public-open";
import type { JobPostingWithEmployer } from "@/domains/jobs/queries";

const CHENNAI_CITY_SLUG = "chennai";

async function getChennaiCityId(): Promise<string | null> {
  const db = getDb();
  const row = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_CITY_SLUG))
    .limit(1);
  return row[0]?.id ?? null;
}

export async function listArticlesByAreaHubForChennai(
  areaHubSlug: string,
  limit = 8,
): Promise<PublicArticleRow[]> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const rows = await db
    .select()
    .from(articles)
    .where(
      and(
        eq(articles.cityId, cityId),
        eq(articles.status, "published"),
        isNotNull(articles.publishedAt),
        eq(articles.areaHubSlug, areaHubSlug),
      ),
    )
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
  return rows.map(reviveArticleRow);
}

export async function listClassifiedsByAreaHubForChennai(
  areaHubSlug: string,
  limit = 6,
): Promise<ClassifiedListingRow[]> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  return db
    .select()
    .from(classifiedListings)
    .where(
      and(
        eq(classifiedListings.cityId, cityId),
        eq(classifiedListings.status, "open"),
        eq(classifiedListings.areaHubSlug, areaHubSlug),
      ),
    )
    .orderBy(
      desc(classifiedListings.featured),
      desc(classifiedListings.publishedAt),
      desc(classifiedListings.createdAt),
    )
    .limit(limit);
}

function locationPatternSql(patterns: string[]) {
  return or(
    ...patterns.map((pattern) => ilike(jobPostings.locationLabel, pattern)),
  );
}

export async function summarizeJobsMatchingLocationPatterns(
  patterns: string[],
  limit = 24,
): Promise<{
  rows: JobPostingWithEmployer[];
  total: number;
  employers: number;
}> {
  if (patterns.length === 0) return { rows: [], total: 0, employers: 0 };
  const cityId = await getChennaiCityId();
  if (!cityId) return { rows: [], total: 0, employers: 0 };
  const db = getDb();
  const where = and(
    eq(jobPostings.cityId, cityId),
    publiclyOpenJobSql(),
    locationPatternSql(patterns),
  );
  const [stats] = await db
    .select({
      total: count(),
      employers: sql<number>`count(distinct ${jobPostings.employerId})`,
    })
    .from(jobPostings)
    .where(where);
  const rows = await db
    .select({ job: jobPostings, employer: employers })
    .from(jobPostings)
    .innerJoin(employers, eq(jobPostings.employerId, employers.id))
    .where(where)
    .orderBy(desc(employers.verified), desc(jobPostings.createdAt))
    .limit(limit);
  return {
    rows,
    total: Number(stats?.total ?? 0),
    employers: Number(stats?.employers ?? 0),
  };
}

export async function listJobsMatchingLocationPatterns(
  patterns: string[],
  limit = 6,
): Promise<JobPostingWithEmployer[]> {
  const summary = await summarizeJobsMatchingLocationPatterns(patterns, limit);
  return summary.rows;
}

export async function listJobsForAreaHub(
  areaHubSlug: string,
  limit = 6,
): Promise<JobPostingWithEmployer[]> {
  return listJobsMatchingLocationPatterns(
    patternsForAreaHub(areaHubSlug),
    limit,
  );
}

export async function listOmrCorridorJobsForChennai(
  limit = 6,
): Promise<JobPostingWithEmployer[]> {
  return listJobsForAreaHub("omr-perungudi-sholinganallur", limit);
}
