/**
 * mychennaicity.in AdSense publisher id (public — published in /ads.txt).
 * Override with `ADSENSE_PUBLISHER_ID` in Vercel if the account changes.
 * @see https://support.google.com/adsense/answer/12171612
 */
export const ADSENSE_PUBLISHER_ID_DEFAULT = "pub-5760699639501978";

/** AdSense script client id — same numeric id as `pub-…` in ads.txt. */
export const ADSENSE_CLIENT_ID_DEFAULT = "ca-pub-5760699639501978";

/** Google `DIRECT` certification authority id for AdSense ads.txt lines. */
export const ADSENSE_GOOGLE_DIRECT_CERT = "f08c47fec0942fa0";

export function normalizeAdsenseClientId(raw: string): string | null {
  let v = raw.trim().toLowerCase();
  if (!v) return null;
  if (!v.startsWith("ca-pub-")) {
    const pub = normalizeAdsensePublisherId(v);
    if (pub) v = pub.replace(/^pub-/, "ca-pub-");
  }
  if (/^ca-pub-\d{6,22}$/.test(v)) return v;
  return null;
}

export function resolveAdsenseClientId(
  envValue: string | undefined,
): string {
  const fromEnv = normalizeAdsenseClientId(envValue?.trim() ?? "");
  return fromEnv ?? ADSENSE_CLIENT_ID_DEFAULT;
}

export function normalizeAdsensePublisherId(raw: string): string | null {
  let v = raw.trim().toLowerCase();
  if (!v) return null;
  v = v.replace(/^ca-pub-/, "pub-");
  if (/^pub-\d{6,22}$/.test(v)) return v;
  if (/^\d{6,22}$/.test(v)) return `pub-${v}`;
  return null;
}

export function resolveAdsensePublisherId(
  envValue: string | undefined,
): string {
  const fromEnv = normalizeAdsensePublisherId(envValue?.trim() ?? "");
  return fromEnv ?? ADSENSE_PUBLISHER_ID_DEFAULT;
}

export function adsTxtBody(publisherId: string): string {
  return `google.com, ${publisherId}, DIRECT, ${ADSENSE_GOOGLE_DIRECT_CERT}\n`;
}
