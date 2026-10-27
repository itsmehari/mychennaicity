import { and, count, desc, eq, inArray } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, employers, jobPostings } from "@/db/schema/tables";
import { jobSlugLookupCandidates } from "@/lib/jobs/job-language";
import { publiclyOpenJobSql } from "./public-open";

export const CHENNAI_CITY_SLUG = "chennai";

export type JobPostingRow = typeof jobPostings.$inferSelect;
export type EmployerRow = typeof employers.$inferSelect;

export type JobPostingWithEmployer = {
  job: JobPostingRow;
  employer: EmployerRow;
};

async function getChennaiCityId(): Promise<string | null> {
  const db = getDb();
  const row = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_CITY_SLUG))
    .limit(1);
  return row[0]?.id ?? null;
}

export async function listOpenJobPostingsForChennaiHub(
  limit = 20,
  offset = 0,
) {
  const cityId = await getChennaiCityId();
  if (!cityId) return [] as JobPostingWithEmployer[];
  const db = getDb();
  const rows = await db
    .select({ job: jobPostings, employer: employers })
    .from(jobPostings)
    .innerJoin(employers, eq(jobPostings.employerId, employers.id))
    .where(and(eq(jobPostings.cityId, cityId), publiclyOpenJobSql()))
    .orderBy(desc(employers.verified), desc(jobPostings.createdAt))
    .limit(limit)
    .offset(offset);
  return rows;
}

export async function countOpenJobPostingsForChennaiHub(): Promise<number> {
  const cityId = await getChennaiCityId();
  if (!cityId) return 0;
  const db = getDb();
  const [row] = await db
    .select({ n: count() })
    .from(jobPostings)
    .where(and(eq(jobPostings.cityId, cityId), publiclyOpenJobSql()));
  return Number(row?.n ?? 0);
}

export async function getOpenJobPostingWithEmployerBySlug(
  slug: string,
): Promise<JobPostingWithEmployer | null> {
  const cityId = await getChennaiCityId();
  if (!cityId) return null;
  const candidates = jobSlugLookupCandidates(slug);
  const db = getDb();
  const rows = await db
    .select({ job: jobPostings, employer: employers })
    .from(jobPostings)
    .innerJoin(employers, eq(jobPostings.employerId, employers.id))
    .where(
      and(
        eq(jobPostings.cityId, cityId),
        inArray(jobPostings.slug, candidates),
        publiclyOpenJobSql(),
      ),
    )
    .limit(candidates.length);
  const row = rows.find((r) => r.job.slug === slug) ?? rows[0] ?? null;
  if (!row) return null;
  return { job: row.job, employer: row.employer };
}

export async function listJobsForSitemap(): Promise<
  { slug: string; lastModified: Date }[]
> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const rows = await db
    .select({
      slug: jobPostings.slug,
      updatedAt: jobPostings.updatedAt,
    })
    .from(jobPostings)
    .where(
      and(eq(jobPostings.cityId, cityId), publiclyOpenJobSql()),
    );
  return rows.map((r) => ({
    slug: r.slug,
    lastModified: r.updatedAt,
  }));
}
