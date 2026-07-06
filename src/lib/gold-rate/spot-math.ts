/** Troy ounce → grams (fine gold). */
export const TROY_OZ_GRAMS = 31.1034768;

export type SpotInputs = {
  xauUsdPerTroyOz: number;
  xagUsdPerTroyOz: number;
  usdInr: number;
  /** Retail premium over international spot (Chennai import duty + local spread). */
  retailMarkupPercent?: number;
};

export type ComputedMetalRates = {
  rate24kPerGram: number;
  rate22kPerGram: number;
  rate18kPerGram: number;
  silverPerGram: number;
};

export function computeInrPerGramFromUsdTroyOz(
  usdPerTroyOz: number,
  usdInr: number,
  retailMarkupPercent = 0,
): number {
  if (usdPerTroyOz <= 0 || usdInr <= 0) return 0;
  const inrPerTroyOz = usdPerTroyOz * usdInr;
  const inrPerGram = inrPerTroyOz / TROY_OZ_GRAMS;
  const markup = 1 + Math.max(0, retailMarkupPercent) / 100;
  return Math.round(inrPerGram * markup);
}

export function computeRetailRatesFromSpot(
  input: SpotInputs,
): ComputedMetalRates {
  const markup = input.retailMarkupPercent ?? 0;
  const rate24kPerGram = computeInrPerGramFromUsdTroyOz(
    input.xauUsdPerTroyOz,
    input.usdInr,
    markup,
  );
  const rate22kPerGram = Math.round(rate24kPerGram * (22 / 24));
  const rate18kPerGram = Math.round(rate24kPerGram * (18 / 24));
  const silverPerGram = computeInrPerGramFromUsdTroyOz(
    input.xagUsdPerTroyOz,
    input.usdInr,
    markup * 0.6,
  );

  return {
    rate24kPerGram,
    rate22kPerGram,
    rate18kPerGram,
    silverPerGram,
  };
}

/** Snapshot older than this is shown as potentially stale on the hub. */
export const GOLD_RATE_STALE_HOURS = 36;

export function isGoldRateSnapshotStale(fetchedAt: Date, now = new Date()): boolean {
  const ageMs = now.getTime() - fetchedAt.getTime();
  return ageMs > GOLD_RATE_STALE_HOURS * 60 * 60 * 1000;
}
