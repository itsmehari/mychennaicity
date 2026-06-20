import { NextResponse } from "next/server";
import {
  adsTxtBody,
  resolveAdsensePublisherId,
} from "@/lib/adsense-config";

/**
 * Serves https://mychennaicity.in/ads.txt for AdSense seller verification.
 * Format per https://support.google.com/adsense/answer/12171612
 *
 * Uses `ADSENSE_PUBLISHER_ID` when set; otherwise the site default pub id.
 * Static copy also lives at `public/ads.txt` for crawlers that read files directly.
 */
export function GET() {
  const pub = resolveAdsensePublisherId(process.env.ADSENSE_PUBLISHER_ID);
  const body = adsTxtBody(pub);

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
