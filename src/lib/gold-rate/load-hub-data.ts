import type { GoldRateSnapshotView } from "@/domains/gold-rate";
import {
  getLatestGoldRateSnapshotForChennai,
  getPreviousGoldRateSnapshotForChennai,
} from "@/domains/gold-rate";
import { FALLBACK_GOLD_RATE_SNAPSHOT } from "@/lib/gold-rate/fallback-snapshot";

export async function loadChennaiGoldRateHubData(): Promise<{
  snapshot: GoldRateSnapshotView;
  previous: GoldRateSnapshotView | null;
  fromDatabase: boolean;
}> {
  try {
    const latest = await getLatestGoldRateSnapshotForChennai();
    if (!latest) {
      return {
        snapshot: FALLBACK_GOLD_RATE_SNAPSHOT,
        previous: null,
        fromDatabase: false,
      };
    }
    const previous = await getPreviousGoldRateSnapshotForChennai(latest.rateDate);
    return { snapshot: latest, previous, fromDatabase: true };
  } catch {
    return {
      snapshot: FALLBACK_GOLD_RATE_SNAPSHOT,
      previous: null,
      fromDatabase: false,
    };
  }
}
