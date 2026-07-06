import {
  computeRetailRatesFromSpot,
  type ComputedMetalRates,
} from "./spot-math";

const FETCH_TIMEOUT_MS = 12_000;

export type FetchedGoldRates = ComputedMetalRates & {
  sourceName: string;
  sourceNote: string;
  usdInr: number;
  xauUsdPerTroyOz: number;
  xagUsdPerTroyOz: number;
  retailMarkupPercent: number;
};

function parseMarkupPercent(): number {
  const raw = process.env.GOLD_RATE_RETAIL_MARKUP_PERCENT?.trim();
  if (!raw) return 10.5;
  const n = parseFloat(raw);
  return Number.isFinite(n) && n >= 0 ? n : 10.5;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.json() as Promise<T>;
}

type ErApiResponse = {
  result?: string;
  rates?: { INR?: number };
};

type GoldPriceOrgResponse = {
  items?: Array<{
    xauPrice?: number;
    xagPrice?: number;
  }>;
};

/** Free USD/INR — open.er-api.com (no API key, ~1500 req/month). */
async function fetchUsdInr(): Promise<number> {
  const data = await fetchJson<ErApiResponse>(
    "https://open.er-api.com/v6/latest/USD",
  );
  const inr = data.rates?.INR;
  if (!inr || inr <= 0) throw new Error("USD/INR missing from er-api");
  return inr;
}

/** Free spot XAU/XAG in USD per troy oz — public JSON feed. */
async function fetchUsdSpotMetals(): Promise<{
  xauUsdPerTroyOz: number;
  xagUsdPerTroyOz: number;
}> {
  const data = await fetchJson<GoldPriceOrgResponse>(
    "https://data-asg.goldprice.org/dbXRates/USD",
  );
  const item = data.items?.[0];
  const xau = item?.xauPrice;
  const xag = item?.xagPrice;
  if (!xau || xau <= 0 || !xag || xag <= 0) {
    throw new Error("XAU/XAG missing from spot feed");
  }
  return { xauUsdPerTroyOz: xau, xagUsdPerTroyOz: xag };
}

/**
 * Fetches international spot + USD/INR, applies Chennai retail markup.
 * **Cost: ₹0** — no paid API key required (uses free public endpoints).
 */
export async function fetchLiveChennaiGoldRates(): Promise<FetchedGoldRates> {
  const retailMarkupPercent = parseMarkupPercent();
  const [usdInr, spot] = await Promise.all([
    fetchUsdInr(),
    fetchUsdSpotMetals(),
  ]);

  const rates = computeRetailRatesFromSpot({
    ...spot,
    usdInr,
    retailMarkupPercent,
  });

  if (rates.rate24kPerGram < 1000 || rates.silverPerGram < 1) {
    throw new Error("Computed rates out of expected range");
  }

  return {
    ...rates,
    usdInr,
    xauUsdPerTroyOz: spot.xauUsdPerTroyOz,
    xagUsdPerTroyOz: spot.xagUsdPerTroyOz,
    retailMarkupPercent,
    sourceName: "International spot + USD/INR (auto, indicative)",
    sourceNote: `Computed from live spot with ${retailMarkupPercent}% Chennai retail markup. Not an IBJA/MCX quote — confirm at the shop.`,
  };
}
