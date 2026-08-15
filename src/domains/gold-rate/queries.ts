import { and, desc, eq, lt } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, goldRateSnapshots } from "@/db/schema/tables";
import { previousIstCalendarDate } from "@/lib/gold-rate/ist-date";

export const CHENNAI_CITY_SLUG = "chennai";

export type GoldRateSnapshotRow = typeof goldRateSnapshots.$inferSelect;

export type GoldRateSnapshotView = {
  rateDate: string;
  rate24kPerGram: number;
  rate22kPerGram: number;
  rate18kPerGram: number;
  silverPerGram: number | null;
  platinumPerGram: number | null;
  sourceName: string;
  sourceNote: string | null;
  fetchedAt: Date;
  isFallback?: boolean;
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

function toView(row: GoldRateSnapshotRow): GoldRateSnapshotView {
  return {
    rateDate: row.rateDate,
    rate24kPerGram: row.rate24kPerGram,
    rate22kPerGram: row.rate22kPerGram,
    rate18kPerGram: row.rate18kPerGram,
    silverPerGram: row.silverPerGram,
    platinumPerGram: row.platinumPerGram,
    sourceName: row.sourceName,
    sourceNote: row.sourceNote,
    fetchedAt: row.fetchedAt,
  };
}

export async function getLatestGoldRateSnapshotForChennai(): Promise<GoldRateSnapshotView | null> {
  const cityId = await getChennaiCityId();
  if (!cityId) return null;
  const db = getDb();
  const rows = await db
    .select()
    .from(goldRateSnapshots)
    .where(eq(goldRateSnapshots.cityId, cityId))
    .orderBy(desc(goldRateSnapshots.rateDate), desc(goldRateSnapshots.fetchedAt))
    .limit(1);
  const row = rows[0];
  return row ? toView(row) : null;
}

export async function getGoldRateSnapshotForChennaiByDate(
  rateDate: string,
): Promise<GoldRateSnapshotView | null> {
  const cityId = await getChennaiCityId();
  if (!cityId) return null;
  const db = getDb();
  const rows = await db
    .select()
    .from(goldRateSnapshots)
    .where(
      and(
        eq(goldRateSnapshots.cityId, cityId),
        eq(goldRateSnapshots.rateDate, rateDate),
      ),
    )
    .limit(1);
  const row = rows[0];
  return row ? toView(row) : null;
}

/** Snapshot strictly before the given IST date (for day-on-day delta). */
export async function getPreviousGoldRateSnapshotForChennai(
  beforeRateDate: string,
): Promise<GoldRateSnapshotView | null> {
  const cityId = await getChennaiCityId();
  if (!cityId) return null;
  const db = getDb();
  const rows = await db
    .select()
    .from(goldRateSnapshots)
    .where(
      and(
        eq(goldRateSnapshots.cityId, cityId),
        lt(goldRateSnapshots.rateDate, beforeRateDate),
      ),
    )
    .orderBy(desc(goldRateSnapshots.rateDate))
    .limit(1);
  const row = rows[0];
  return row ? toView(row) : null;
}

export async function getGoldRateSnapshotPairForChennai(): Promise<{
  latest: GoldRateSnapshotView;
  previous: GoldRateSnapshotView | null;
}> {
  const latest = await getLatestGoldRateSnapshotForChennai();
  if (!latest) {
    throw new Error("No gold rate snapshot in DB");
  }
  const prevDate = previousIstCalendarDate(latest.rateDate);
  const previous =
    (await getGoldRateSnapshotForChennaiByDate(prevDate)) ??
    (await getPreviousGoldRateSnapshotForChennai(latest.rateDate));
  return { latest, previous };
}

export async function listGoldRateHistoryForChennai(
  limit = 30,
): Promise<GoldRateSnapshotView[]> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const rows = await db
    .select()
    .from(goldRateSnapshots)
    .where(eq(goldRateSnapshots.cityId, cityId))
    .orderBy(desc(goldRateSnapshots.rateDate))
    .limit(limit);
  return rows.map(toView).reverse();
}

export async function getGoldRateLastModifiedForSitemap(): Promise<Date | null> {
  const latest = await getLatestGoldRateSnapshotForChennai();
  return latest?.fetchedAt ?? null;
}
