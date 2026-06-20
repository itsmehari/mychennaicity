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
    const href = raw.replace(/\/+$/, "");
    const parsed = new URL(href);
    if (parsed.protocol === "http:" && process.env.NODE_ENV === "production") {
      parsed.protocol = "https:";
    }
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/** Official public inbox for tips, listings, corrections, and privacy requests. */
export const OFFICIAL_PUBLIC_CONTACT_EMAIL = "mychennaicityportal@gmail.com";

/** Verified organization profiles for footer links and JSON-LD `sameAs`. */
export const OFFICIAL_ORG_SAME_AS_URLS = [
  "https://www.instagram.com/mychennaicityportal/",
] as const;

function parseSameAsEnv(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((href) => href.startsWith("http"));
}

/** Organization profile URLs — official list plus optional env extras (dev/staging). */
export function orgSameAsUrls(): string[] {
  const extra =
    process.env.NODE_ENV !== "production"
      ? parseSameAsEnv(process.env.NEXT_PUBLIC_ORG_SAME_AS)
      : parseSameAsEnv(process.env.NEXT_PUBLIC_ORG_SAME_AS);
  return [...new Set([...OFFICIAL_ORG_SAME_AS_URLS, ...extra])];
}

function socialLabelForUrl(href: string): string {
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    if (host.includes("twitter.com") || host === "x.com") return "X / Twitter";
    if (host.includes("youtube.com") || host === "youtu.be") return "YouTube";
    if (host.includes("instagram.com")) return "Instagram";
    if (host.includes("facebook.com")) return "Facebook";
    if (host.includes("linkedin.com")) return "LinkedIn";
    return host;
  } catch {
    return "Profile";
  }
}

/**
 * Public contact email (mailto target). In production always returns the official
 * inbox. `NEXT_PUBLIC_CONTACT_EMAIL` may override in non-production for local testing.
 */
export function getPublicContactEmail(): string {
  const raw = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (
    process.env.NODE_ENV !== "production" &&
    raw &&
    raw.includes("@")
  ) {
    return raw;
  }
  return OFFICIAL_PUBLIC_CONTACT_EMAIL;
}

export type OrgSocialLink = {
  href: string;
  label: string;
};

/** Footer / nav links for verified organization profiles. */
export function getOrgSocialLinks(): OrgSocialLink[] {
  return orgSameAsUrls().map((href) => ({
    href,
    label: socialLabelForUrl(href),
  }));
}
