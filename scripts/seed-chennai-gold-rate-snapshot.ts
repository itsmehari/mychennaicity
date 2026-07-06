/**
 * Idempotent daily gold rate snapshot for Chennai.
 *
 * Dev:  `npm run db:seed:chennai-gold-rate`
 * Live: `npm run db:seed:chennai-gold-rate:live`
 * Auto: Vercel Cron → GET /api/cron/gold-rate (twice daily IST)
 *
 * Manual override (whole INR per gram):
 *   GOLD_RATE_24K=14946 npm run db:seed:chennai-gold-rate
 */
import { config as loadEnv } from "dotenv";
import { upsertChennaiGoldRateSnapshot } from "../src/domains/gold-rate/upsert-snapshot";
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

function parseRateEnv(key: string, fallback: number): number {
  const raw = process.env[key]?.trim();
  if (!raw) return fallback;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

async function main() {
  const rate24k = parseRateEnv("GOLD_RATE_24K", 14_946);
  const rate22k = parseRateEnv("GOLD_RATE_22K", 13_700);
  const rate18k = parseRateEnv("GOLD_RATE_18K", 11_440);
  const silver = parseRateEnv("GOLD_RATE_SILVER", 95);
  const platinumRaw = process.env.GOLD_RATE_PLATINUM?.trim();
  const platinum = platinumRaw ? parseInt(platinumRaw, 10) : null;

  const rateDate = process.env.GOLD_RATE_DATE?.trim() || getIstCalendarDate();
  const sourceName =
    process.env.GOLD_RATE_SOURCE?.trim() ||
    "Chennai retail benchmark (manual seed, indicative)";

  const { action } = await upsertChennaiGoldRateSnapshot({
    rateDate,
    rate24kPerGram: rate24k,
    rate22kPerGram: rate22k,
    rate18kPerGram: rate18k,
    silverPerGram: silver,
    platinumPerGram: Number.isFinite(platinum) && platinum! > 0 ? platinum : null,
    sourceName,
    sourceNote:
      "Indicative Chennai retail rates for jewellery buyers. Confirm at the shop counter before paying.",
  });

  console.log(`${action} gold rate snapshot for ${rateDate}`);
  console.log(
    `24K ₹${rate24k}/g · 22K ₹${rate22k}/g · 18K ₹${rate18k}/g · silver ₹${silver}/g`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
