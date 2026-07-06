import { NextRequest, NextResponse } from "next/server";
import { syncChennaiGoldRatesFromSpot } from "@/domains/gold-rate/sync-live-rates";
import { isAuthorizedCronRequest } from "@/lib/gold-rate/verify-cron-auth";
import { revalidatePath } from "next/cache";
import { CHENNAI_GOLD_RATE_HUB_PATH } from "@/lib/routes/chennai-gold-rate";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * Auto-update Chennai gold/silver snapshot from free spot feeds.
 * Vercel Cron (Bearer CRON_SECRET) or manual: GET ?secret=REVALIDATE_SECRET
 */
export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const result = await syncChennaiGoldRatesFromSpot();

  if (!result.ok) {
    console.error("[cron/gold-rate] sync failed:", result.error);
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 502 },
    );
  }

  revalidatePath(CHENNAI_GOLD_RATE_HUB_PATH);

  return NextResponse.json({
    ok: true,
    rateDate: result.rateDate,
    action: result.action,
    rates: result.rates,
    source: result.sourceName,
  });
}
