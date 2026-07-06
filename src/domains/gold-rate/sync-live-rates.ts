import { fetchLiveChennaiGoldRates } from "@/lib/gold-rate/fetch-live-rates";
import { upsertChennaiGoldRateSnapshot } from "./upsert-snapshot";

export type SyncGoldRatesResult =
  | {
      ok: true;
      rateDate: string;
      action: "inserted" | "updated";
      rates: {
        rate24kPerGram: number;
        rate22kPerGram: number;
        rate18kPerGram: number;
        silverPerGram: number;
      };
      sourceName: string;
    }
  | {
      ok: false;
      error: string;
    };

export async function syncChennaiGoldRatesFromSpot(): Promise<SyncGoldRatesResult> {
  try {
    const live = await fetchLiveChennaiGoldRates();
    const { rateDate, action } = await upsertChennaiGoldRateSnapshot({
      rate24kPerGram: live.rate24kPerGram,
      rate22kPerGram: live.rate22kPerGram,
      rate18kPerGram: live.rate18kPerGram,
      silverPerGram: live.silverPerGram,
      sourceName: live.sourceName,
      sourceNote: live.sourceNote,
    });

    return {
      ok: true,
      rateDate,
      action,
      rates: {
        rate24kPerGram: live.rate24kPerGram,
        rate22kPerGram: live.rate22kPerGram,
        rate18kPerGram: live.rate18kPerGram,
        silverPerGram: live.silverPerGram,
      },
      sourceName: live.sourceName,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}
