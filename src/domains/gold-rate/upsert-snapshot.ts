import { and, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, goldRateSnapshots } from "@/db/schema/tables";
import { getIstCalendarDate } from "@/lib/gold-rate/ist-date";
import { CHENNAI_CITY_SLUG } from "./queries";

export type GoldRateSnapshotUpsertInput = {
  rateDate?: string;
  rate24kPerGram: number;
  rate22kPerGram: number;
  rate18kPerGram: number;
  silverPerGram: number | null;
  platinumPerGram?: number | null;
  sourceName: string;
  sourceNote?: string | null;
  fetchedAt?: Date;
};

export async function upsertChennaiGoldRateSnapshot(
  input: GoldRateSnapshotUpsertInput,
): Promise<{ rateDate: string; action: "inserted" | "updated" }> {
  const db = getDb();
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_CITY_SLUG))
    .limit(1);

  if (!city) {
    throw new Error("City slug 'chennai' not found");
  }

  const rateDate = input.rateDate?.trim() || getIstCalendarDate();
  const fetchedAt = input.fetchedAt ?? new Date();
  const payload = {
    rate24kPerGram: input.rate24kPerGram,
    rate22kPerGram: input.rate22kPerGram,
    rate18kPerGram: input.rate18kPerGram,
    silverPerGram: input.silverPerGram,
    platinumPerGram: input.platinumPerGram ?? null,
    sourceName: input.sourceName,
    sourceNote: input.sourceNote ?? null,
    fetchedAt,
    updatedAt: fetchedAt,
  };

  const existing = await db
    .select({ id: goldRateSnapshots.id })
    .from(goldRateSnapshots)
    .where(
      and(
        eq(goldRateSnapshots.cityId, city.id),
        eq(goldRateSnapshots.rateDate, rateDate),
      ),
    )
    .limit(1);

  if (existing[0]) {
    await db
      .update(goldRateSnapshots)
      .set(payload)
      .where(eq(goldRateSnapshots.id, existing[0].id));
    return { rateDate, action: "updated" };
  }

  await db.insert(goldRateSnapshots).values({
    cityId: city.id,
    rateDate,
    ...payload,
  });
  return { rateDate, action: "inserted" };
}
