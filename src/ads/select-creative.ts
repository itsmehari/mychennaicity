import type { AdCreative, AdSize } from "@/ads/registry";
import { ADS } from "@/ads/registry";

/** DJB2 — deterministic 32-bit unsigned for stable picks across Node versions. */
export function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

/** UTC calendar date `YYYY-MM-DD` for daily creative rotation. */
export function utcDateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function getEligibleCreatives(
  slotId: string,
  size: AdSize,
  ads: readonly AdCreative[],
): AdCreative[] {
  return ads.filter(
    (a) =>
      a.active && a.slot_ids.includes(slotId) && a.sizes.includes(size),
  );
}

export type SelectCreativeOptions = {
  dateKey?: string;
  ads?: readonly AdCreative[];
  /** Suffix for multi-slot rows, e.g. `|0` — changes hash without new slot id. */
  pickKeySuffix?: string;
};

export function selectCreative(
  slotId: string,
  size: AdSize,
  options?: SelectCreativeOptions,
): AdCreative | null {
  const pool = options?.ads ?? ADS;
  const eligible = getEligibleCreatives(slotId, size, pool);
  if (eligible.length === 0) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        `[ads] No eligible creative for slot="${slotId}" size="${size}"`,
      );
    }
    return null;
  }
  const dateKey = options?.dateKey ?? utcDateKey();
  const suffix = options?.pickKeySuffix ?? "";
  const key = `${slotId}|${size}|${dateKey}${suffix}`;
  const idx = hashString(key) % eligible.length;
  return eligible[idx] ?? null;
}

/** Uniform pick for rotating house ads (new choice each render / visitor session on the server). */
export function selectCreativeRandom(
  slotId: string,
  size: AdSize,
  options?: SelectCreativeOptions,
): AdCreative | null {
  const pool = options?.ads ?? ADS;
  const eligible = getEligibleCreatives(slotId, size, pool);
  if (eligible.length === 0) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        `[ads] No eligible creative for slot="${slotId}" size="${size}" (random)`,
      );
    }
    return null;
  }
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  const idx = buf[0]! % eligible.length;
  return eligible[idx] ?? null;
}
