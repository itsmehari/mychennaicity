import { and, asc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, events } from "@/db/schema/tables";

export const CHENNAI_CITY_SLUG = "chennai";

export type PublicEventRow = typeof events.$inferSelect;

async function getChennaiCityId(): Promise<string | null> {
  const db = getDb();
  const row = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_CITY_SLUG))
    .limit(1);
  return row[0]?.id ?? null;
}

/** Scheduled, not ended (COALESCE(ends_at, starts_at) >= now). */
function notEndedCondition() {
  return sql`COALESCE(${events.endsAt}, ${events.startsAt}) >= NOW()`;
}

export async function listPublicEventsForChennaiHub(limit = 40) {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  return db
    .select()
    .from(events)
    .where(
      and(
        eq(events.cityId, cityId),
        eq(events.status, "scheduled"),
        notEndedCondition(),
      ),
    )
    .orderBy(asc(events.startsAt))
    .limit(limit);
}

export async function getPublicEventBySlug(
  slug: string,
): Promise<PublicEventRow | null> {
  const cityId = await getChennaiCityId();
  if (!cityId) return null;
  const db = getDb();
  const rows = await db
    .select()
    .from(events)
    .where(
      and(
        eq(events.cityId, cityId),
        eq(events.slug, slug),
        eq(events.status, "scheduled"),
        notEndedCondition(),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}

export async function listEventsForSitemap(): Promise<
  { slug: string; lastModified: Date }[]
> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const rows = await db
    .select({
      slug: events.slug,
      updatedAt: events.updatedAt,
    })
    .from(events)
    .where(
      and(
        eq(events.cityId, cityId),
        eq(events.status, "scheduled"),
        notEndedCondition(),
      ),
    );
  return rows.map((r) => ({
    slug: r.slug,
    lastModified: r.updatedAt,
  }));
}
