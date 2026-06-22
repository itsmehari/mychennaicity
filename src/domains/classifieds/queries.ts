import { and, count, desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, classifiedListings } from "@/db/schema/tables";

export const CHENNAI_CITY_SLUG = "chennai";

export type ClassifiedListingRow = typeof classifiedListings.$inferSelect;

async function getChennaiCityId(): Promise<string | null> {
  const db = getDb();
  const row = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_CITY_SLUG))
    .limit(1);
  return row[0]?.id ?? null;
}

export async function listOpenClassifiedListingsForChennaiHub(
  limit = 20,
  offset = 0,
) {
  const cityId = await getChennaiCityId();
  if (!cityId) return [] as ClassifiedListingRow[];
  const db = getDb();
  return db
    .select()
    .from(classifiedListings)
    .where(
      and(
        eq(classifiedListings.cityId, cityId),
        eq(classifiedListings.status, "open"),
      ),
    )
    .orderBy(
      desc(classifiedListings.publishedAt),
      desc(classifiedListings.createdAt),
    )
    .limit(limit)
    .offset(offset);
}

export async function countOpenClassifiedListingsForChennaiHub(): Promise<number> {
  const cityId = await getChennaiCityId();
  if (!cityId) return 0;
  const db = getDb();
  const [row] = await db
    .select({ n: count() })
    .from(classifiedListings)
    .where(
      and(
        eq(classifiedListings.cityId, cityId),
        eq(classifiedListings.status, "open"),
      ),
    );
  return Number(row?.n ?? 0);
}

export async function getOpenClassifiedListingBySlug(
  slug: string,
): Promise<ClassifiedListingRow | null> {
  const cityId = await getChennaiCityId();
  if (!cityId) return null;
  const db = getDb();
  const rows = await db
    .select()
    .from(classifiedListings)
    .where(
      and(
        eq(classifiedListings.cityId, cityId),
        eq(classifiedListings.slug, slug),
        eq(classifiedListings.status, "open"),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}

export async function listClassifiedListingsForSitemap(): Promise<
  { slug: string; lastModified: Date }[]
> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const rows = await db
    .select({
      slug: classifiedListings.slug,
      updatedAt: classifiedListings.updatedAt,
    })
    .from(classifiedListings)
    .where(
      and(
        eq(classifiedListings.cityId, cityId),
        eq(classifiedListings.status, "open"),
      ),
    );
  return rows.map((r) => ({
    slug: r.slug,
    lastModified: r.updatedAt,
  }));
}
