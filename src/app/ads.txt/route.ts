import { NextResponse } from "next/server";

/** Fixed certification authority ID for Google AdSense `DIRECT` lines. */
const GOOGLE_DIRECT_CERT = "f08c47fec0942fa0";

/**
 * Normalises env to ads.txt publisher token (`pub-` + digits).
 * Accepts `pub-…`, `ca-pub-…`, or digits only.
 */
function normalizeAdsensePublisherId(raw: string): string | null {
  let v = raw.trim().toLowerCase();
  if (!v) return null;
  v = v.replace(/^ca-pub-/, "pub-");
  if (/^pub-\d{6,22}$/.test(v)) return v;
  if (/^\d{6,22}$/.test(v)) return `pub-${v}`;
  return null;
}

/**
 * Serves https://example.com/ads.txt for AdSense seller verification.
 * Set `ADSENSE_PUBLISHER_ID` in Vercel (e.g. `pub-1234567890123456`).
 * Returns 404 when unset so we never publish a placeholder seller record.
 */
export function GET() {
  const raw = process.env.ADSENSE_PUBLISHER_ID?.trim() ?? "";
  const pub = normalizeAdsensePublisherId(raw);
  if (!pub) {
    return new NextResponse(null, { status: 404 });
  }

  const body = `google.com, ${pub}, DIRECT, ${GOOGLE_DIRECT_CERT}\n`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
