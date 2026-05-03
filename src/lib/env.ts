/** Shared env helpers. Prefer reading at call sites for tree-shaking. */

const DEFAULT_SITE_URL = "https://mychennaicity.in";

/**
 * Canonical origin for metadata, sitemaps, JSON-LD, and Open Graph.
 * Trims whitespace, strips trailing slashes, and uses `URL.origin` so paths
 * on `NEXT_PUBLIC_SITE_URL` do not leak into canonicals.
 * In production, `http:` is upgraded to `https:` to avoid duplicate signals.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  try {
    let href = raw.replace(/\/+$/, "");
    const parsed = new URL(href);
    if (parsed.protocol === "http:" && process.env.NODE_ENV === "production") {
      parsed.protocol = "https:";
    }
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/**
 * Public inbox for tips, corrections, and privacy requests (mailto target).
 * Set in Vercel as `NEXT_PUBLIC_CONTACT_EMAIL` when the inbox is ready.
 */
export function getPublicContactEmail(): string | null {
  const raw = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (!raw || !raw.includes("@")) return null;
  return raw;
}
