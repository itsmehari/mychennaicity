import { and, desc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, employers, jobPostings } from "@/db/schema/tables";
import { DESK_PAGE_SIZE, deskLikeTerm, deskPage } from "@/lib/super-admin/desk-return";
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

export async function loadJobDesk(input: {
  status: JobPostingStatus | "all" | "expired";
  q: string;
  pageRaw?: string;
  now?: Date;
}): Promise<{
  rows: AdminJobListRow[];
  total: number;
  counts: Record<string, number>;
  page: number;
  pageCount: number;
}> {
  const empty = { rows: [], total: 0, counts: { all: 0 }, page: 1, pageCount: 1 };
  const cityId = await getChennaiCityId();
  if (!cityId) return empty;
  const db = getDb();
  const now = input.now ?? new Date();
  const countRows = await db
    .select({ status: jobPostings.status, n: sql<number>`count(*)::int` })
    .from(jobPostings)
    .where(eq(jobPostings.cityId, cityId))
    .groupBy(jobPostings.status);
  const counts: Record<string, number> = { all: 0, expired: 0 };
  for (const row of countRows) {
    counts[row.status] = Number(row.n);
    counts.all += Number(row.n);
  }
  const [expired] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(jobPostings)
    .where(and(eq(jobPostings.cityId, cityId), staleOpenJobSql(now)));
  counts.expired = Number(expired?.n ?? 0);

  const filters: SQL[] = [eq(jobPostings.cityId, cityId)];
  if (input.status === "expired") {
    const stale = staleOpenJobSql(now);
    if (stale) filters.push(stale);
  } else if (input.status !== "all") filters.push(eq(jobPostings.status, input.status));
  const q = input.q.trim();
  if (q) {
    const term = deskLikeTerm(q);
    const search = or(
      ilike(jobPostings.title, term),
      ilike(jobPostings.slug, term),
      ilike(jobPostings.locationLabel, term),
      ilike(employers.name, term),
    );
    if (search) filters.push(search);
  }
  const where = and(...filters);
  const [{ total: totalRaw } = { total: 0 }] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(jobPostings)
    .innerJoin(employers, eq(jobPostings.employerId, employers.id))
    .where(where);
  const total = Number(totalRaw);
  const pageCount = Math.max(1, Math.ceil(total / DESK_PAGE_SIZE));
  const page = deskPage(input.pageRaw, pageCount);
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
    .where(where)
    .orderBy(desc(jobPostings.updatedAt))
    .limit(DESK_PAGE_SIZE)
    .offset((page - 1) * DESK_PAGE_SIZE);
  return { rows: rows as AdminJobListRow[], total, counts, page, pageCount };
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
