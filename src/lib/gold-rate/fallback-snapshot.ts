import type { GoldRateSnapshotView } from "@/domains/gold-rate";

/** Editorial fallback when Neon is unavailable — update via seed in production. */
export const FALLBACK_GOLD_RATE_SNAPSHOT: GoldRateSnapshotView = {
  rateDate: "2026-07-05",
  rate24kPerGram: 14_946,
  rate22kPerGram: 13_700,
  rate18kPerGram: 11_440,
  silverPerGram: 95,
  platinumPerGram: null,
  sourceName: "Chennai retail benchmark (indicative)",
  sourceNote:
    "Fallback snapshot for build/preview. Run db:seed:chennai-gold-rate for live DB rows.",
  fetchedAt: new Date("2026-07-05T03:30:00.000Z"),
  isFallback: true,
};
