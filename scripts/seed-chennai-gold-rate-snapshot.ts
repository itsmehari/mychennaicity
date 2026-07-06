/**
 * Idempotent daily gold rate snapshot for Chennai.
 *
 * Dev:  `npm run db:seed:chennai-gold-rate`
 * Live: `npm run db:seed:chennai-gold-rate:live`
 *
 * Override rates via env (whole INR per gram):
 *   GOLD_RATE_24K=14946 GOLD_RATE_22K=13700 GOLD_RATE_18K=11440 npm run db:seed:chennai-gold-rate
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { cities, goldRateSnapshots } from "../src/db/schema/tables";
import { getIstCalendarDate } from "../src/lib/gold-rate/ist-date";

const live =
  process.env.SEED_LIVE === "1" || process.argv.includes("--live");

if (live) {
  loadEnv({ path: ".env.production.local" });
} else {
  loadEnv({ path: "secrets/database.local.env" });
  loadEnv({ path: ".env.local" });
  loadEnv({ path: ".env" });
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    live
      ? "Live: DATABASE_URL missing (.env.production.local)."
      : "DATABASE_URL missing — add to .env.local",
  );
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

function parseRateEnv(key: string, fallback: number): number {
  const raw = process.env[key]?.trim();
  if (!raw) return fallback;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found.");
    process.exit(1);
  }

  const rate24k = parseRateEnv("GOLD_RATE_24K", 14_946);
  const rate22k = parseRateEnv("GOLD_RATE_22K", 13_700);
  const rate18k = parseRateEnv("GOLD_RATE_18K", 11_440);
  const silver = parseRateEnv("GOLD_RATE_SILVER", 95);
  const platinumRaw = process.env.GOLD_RATE_PLATINUM?.trim();
  const platinum = platinumRaw ? parseInt(platinumRaw, 10) : null;

  const rateDate = process.env.GOLD_RATE_DATE?.trim() || getIstCalendarDate();
  const fetchedAt = new Date();
  const sourceName =
    process.env.GOLD_RATE_SOURCE?.trim() ||
    "Chennai retail benchmark (IBJA/MCX-derived, indicative)";

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

  const payload = {
    rate24kPerGram: rate24k,
    rate22kPerGram: rate22k,
    rate18kPerGram: rate18k,
    silverPerGram: silver,
    platinumPerGram: Number.isFinite(platinum) && platinum! > 0 ? platinum : null,
    sourceName,
    sourceNote:
      "Indicative Chennai retail rates for jewellery buyers. Confirm at the shop counter before paying.",
    fetchedAt,
    updatedAt: fetchedAt,
  };

  if (existing[0]) {
    await db
      .update(goldRateSnapshots)
      .set(payload)
      .where(eq(goldRateSnapshots.id, existing[0].id));
    console.log(`Updated gold rate snapshot for ${rateDate}`);
  } else {
    await db.insert(goldRateSnapshots).values({
      cityId: city.id,
      rateDate,
      ...payload,
    });
    console.log(`Inserted gold rate snapshot for ${rateDate}`);
  }

  console.log(
    `24K ₹${rate24k}/g · 22K ₹${rate22k}/g · 18K ₹${rate18k}/g · silver ₹${silver}/g`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
