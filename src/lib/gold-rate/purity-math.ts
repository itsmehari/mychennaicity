export type GoldPurity = "24k" | "22k" | "18k";

const PURITY_RATIOS: Record<GoldPurity, number> = {
  "24k": 1,
  "22k": 22 / 24,
  "18k": 18 / 24,
};

/** Derive 22K and 18K per-gram rates from 24K (rounded to nearest rupee). */
export function derivePurityRatesFrom24k(rate24kPerGram: number): {
  rate24kPerGram: number;
  rate22kPerGram: number;
  rate18kPerGram: number;
} {
  return {
    rate24kPerGram,
    rate22kPerGram: Math.round(rate24kPerGram * PURITY_RATIOS["22k"]),
    rate18kPerGram: Math.round(rate24kPerGram * PURITY_RATIOS["18k"]),
  };
}

export function rateForPurity(
  purity: GoldPurity,
  rates: { rate24kPerGram: number; rate22kPerGram: number; rate18kPerGram: number },
): number {
  switch (purity) {
    case "24k":
      return rates.rate24kPerGram;
    case "22k":
      return rates.rate22kPerGram;
    case "18k":
      return rates.rate18kPerGram;
  }
}

/** Standard sovereign weight in grams (India). */
export const SOVEREIGN_GRAMS = 8;

export function sovereignValue(ratePerGram: number): number {
  return Math.round(ratePerGram * SOVEREIGN_GRAMS);
}

export type RateDelta = {
  amount: number;
  percent: number;
  direction: "up" | "down" | "flat";
};

export function computeRateDelta(current: number, previous: number | null): RateDelta | null {
  if (previous == null || previous <= 0) return null;
  const amount = current - previous;
  const percent = Math.round((amount / previous) * 1000) / 10;
  if (amount === 0) return { amount: 0, percent: 0, direction: "flat" };
  return {
    amount,
    percent,
    direction: amount > 0 ? "up" : "down",
  };
}
