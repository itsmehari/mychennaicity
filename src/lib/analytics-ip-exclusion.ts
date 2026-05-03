import "server-only";

/**
 * Comma-separated IPv4/IPv6 addresses (server-only env). When the incoming
 * request IP matches any value, we skip loading Google Analytics and AdSense
 * scripts in the root layout — complements GA4 Admin “internal traffic” filters.
 */
export function analyticsExcludeIpList(): string[] {
  const raw = process.env.ANALYTICS_EXCLUDE_IPS?.trim();
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

/** First hop in X-Forwarded-For, else X-Real-Ip (typical on Vercel). */
export function clientIpFromHeaders(headersList: Headers): string | null {
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = headersList.get("x-real-ip")?.trim();
  return real || null;
}

export function shouldSuppressGoogleMeasurementForRequest(
  headersList: Headers,
): boolean {
  const ip = clientIpFromHeaders(headersList);
  if (!ip) return false;
  return analyticsExcludeIpList().includes(ip);
}
