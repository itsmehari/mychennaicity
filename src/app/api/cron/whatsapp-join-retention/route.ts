import { NextRequest, NextResponse } from "next/server";
import { runWhatsappJoinRetention } from "@/lib/whatsapp-join-retention-run";
import { isAuthorizedCronRequest } from "@/lib/gold-rate/verify-cron-auth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Monthly retention for declined/spam WhatsApp join rows (12-month policy).
 * Vercel Cron (Bearer CRON_SECRET) or manual: GET ?secret=REVALIDATE_SECRET
 * Owner must enable cron in Vercel; default schedule in vercel.json is 03:30 UTC on day 1.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json({ ok: false, error: "DATABASE_URL missing" }, { status: 503 });
  }

  try {
    const result = await runWhatsappJoinRetention();
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[cron/whatsapp-join-retention]", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Retention failed" },
      { status: 502 },
    );
  }
}