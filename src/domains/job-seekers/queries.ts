import { and, count, desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, jobSeekerPosts } from "@/db/schema/tables";

export const CHENNAI_CITY_SLUG = "chennai";

export type JobSeekerPostRow = typeof jobSeekerPosts.$inferSelect;

async function getChennaiCityId(): Promise<string | null> {
  const db = getDb();
  const row = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_CITY_SLUG))
    .limit(1);
  return row[0]?.id ?? null;
}

export async function listOpenJobSeekerPostsForChennaiHub(
  limit = 20,
  offset = 0,
) {
  const cityId = await getChennaiCityId();
  if (!cityId) return [] as JobSeekerPostRow[];
  const db = getDb();
  return db
    .select()
    .from(jobSeekerPosts)
    .where(
      and(eq(jobSeekerPosts.cityId, cityId), eq(jobSeekerPosts.status, "open")),
    )
    .orderBy(desc(jobSeekerPosts.publishedAt), desc(jobSeekerPosts.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function countOpenJobSeekerPostsForChennaiHub(): Promise<number> {
  const cityId = await getChennaiCityId();
  if (!cityId) return 0;
  const db = getDb();
  const [row] = await db
    .select({ n: count() })
    .from(jobSeekerPosts)
    .where(
      and(eq(jobSeekerPosts.cityId, cityId), eq(jobSeekerPosts.status, "open")),
    );
  return Number(row?.n ?? 0);
}

export async function getOpenJobSeekerPostBySlug(
  slug: string,
): Promise<JobSeekerPostRow | null> {
  const cityId = await getChennaiCityId();
  if (!cityId) return null;
  const db = getDb();
  const rows = await db
    .select()
    .from(jobSeekerPosts)
    .where(
      and(
        eq(jobSeekerPosts.cityId, cityId),
        eq(jobSeekerPosts.slug, slug),
        eq(jobSeekerPosts.status, "open"),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}

export async function listJobSeekerPostsForSitemap(): Promise<
  { slug: string; lastModified: Date }[]
> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const rows = await db
    .select({
      slug: jobSeekerPosts.slug,
      updatedAt: jobSeekerPosts.updatedAt,
    })
    .from(jobSeekerPosts)
    .where(
      and(eq(jobSeekerPosts.cityId, cityId), eq(jobSeekerPosts.status, "open")),
    );
  return rows.map((r) => ({
    slug: r.slug,
    lastModified: r.updatedAt,
  }));
}
