import { and, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, employers, jobPostings } from "@/db/schema/tables";
import { staleOpenJobSql } from "./public-open";
import { CHENNAI_CITY_SLUG, type JobPostingWithEmployer } from "./queries";

export type JobPostingStatus = "draft" | "open" | "closed";

export type AdminJobListRow = {
  id: string;
  slug: string;
  title: string;
  status: JobPostingStatus;
  validThrough: Date | null;
  publishedAt: Date | null;
  updatedAt: Date;
  employerName: string;
  employerSlug: string;
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

export async function listAdminJobsForChennai(options?: {
  status?: JobPostingStatus | "all" | "expired";
  limit?: number;
}): Promise<AdminJobListRow[]> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const status = options?.status ?? "all";
  const limit = options?.limit ?? 120;
  const now = new Date();

  const statusFilter =
    status === "all"
      ? undefined
      : status === "expired"
        ? staleOpenJobSql(now)
        : eq(jobPostings.status, status);

  const rows = await db
    .select({
      id: jobPostings.id,
      slug: jobPostings.slug,
      title: jobPostings.title,
      status: jobPostings.status,
      validThrough: jobPostings.validThrough,
      publishedAt: jobPostings.publishedAt,
      updatedAt: jobPostings.updatedAt,
      employerName: employers.name,
      employerSlug: employers.slug,
    })
    .from(jobPostings)
    .innerJoin(employers, eq(jobPostings.employerId, employers.id))
    .where(
      statusFilter
        ? and(eq(jobPostings.cityId, cityId), statusFilter)
        : eq(jobPostings.cityId, cityId),
    )
    .orderBy(desc(jobPostings.updatedAt))
    .limit(limit);

  return rows as AdminJobListRow[];
}

export async function getAdminJobById(
  id: string,
): Promise<JobPostingWithEmployer | null> {
  const db = getDb();
  const rows = await db
    .select({ job: jobPostings, employer: employers })
    .from(jobPostings)
    .innerJoin(employers, eq(jobPostings.employerId, employers.id))
    .where(eq(jobPostings.id, id))
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  return { job: row.job, employer: row.employer };
}

export async function listEmployersForAdmin() {
  const db = getDb();
  return db
    .select({
      id: employers.id,
      name: employers.name,
      slug: employers.slug,
    })
    .from(employers)
    .orderBy(employers.name);
}

export async function closeStaleOpenJobPostings(now = new Date()): Promise<{
  closed: number;
  slugs: string[];
}> {
  const db = getDb();
  const stale = await db
    .select({
      id: jobPostings.id,
      slug: jobPostings.slug,
    })
    .from(jobPostings)
    .where(staleOpenJobSql(now));

  if (stale.length === 0) {
    return { closed: 0, slugs: [] };
  }

  await db
    .update(jobPostings)
    .set({ status: "closed", updatedAt: now })
    .where(staleOpenJobSql(now));

  return { closed: stale.length, slugs: stale.map((r) => r.slug) };
}

export async function countStaleOpenJobPostings(
  now = new Date(),
): Promise<number> {
  const db = getDb();
  const [row] = await db
    .select({ n: sql<number>`count(*)` })
    .from(jobPostings)
    .where(staleOpenJobSql(now));
  return Number(row?.n ?? 0);
}
