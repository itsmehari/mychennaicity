import { and, desc, eq, ilike, isNotNull, or } from "drizzle-orm";
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
import type { JobPostingWithEmployer } from "@/domains/jobs/queries";

const CHENNAI_CITY_SLUG = "chennai";

const OMR_JOB_LOCATION_PATTERNS = [
  "%OMR%",
  "%Perungudi%",
  "%Sholinganallur%",
  "%Navalur%",
  "%Thoraipakkam%",
  "%Siruseri%",
  "%Pallikaranai%",
];

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
      desc(classifiedListings.publishedAt),
      desc(classifiedListings.createdAt),
    )
    .limit(limit);
}

export async function listOmrCorridorJobsForChennai(
  limit = 6,
): Promise<JobPostingWithEmployer[]> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const locationMatch = or(
    ...OMR_JOB_LOCATION_PATTERNS.map((pattern) =>
      ilike(jobPostings.locationLabel, pattern),
    ),
  );
  const rows = await db
    .select({ job: jobPostings, employer: employers })
    .from(jobPostings)
    .innerJoin(employers, eq(jobPostings.employerId, employers.id))
    .where(
      and(
        eq(jobPostings.cityId, cityId),
        eq(jobPostings.status, "open"),
        locationMatch,
      ),
    )
    .orderBy(desc(employers.verified), desc(jobPostings.createdAt))
    .limit(limit);
  return rows;
}
