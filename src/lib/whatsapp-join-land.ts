/**
 * First landing on this site, kept until the join form is saved.
 * The cookie is a path on mychennaicity.in. It is not a referrer from another site.
 */

export const WHATSAPP_FIRST_LAND_COOKIE = "mcc_first_land";
const MAX_LAND = 180;

export function firstLandPath(pathname: string, search: string): string | null {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) return null;
  if (pathname.includes("..") || pathname.includes("\\") || pathname.includes("\0")) return null;
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/super-admin") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/sitemap") ||
    pathname.endsWith(".xml")
  ) {
    return null;
  }
  if (!/^\/[A-Za-z0-9/_.-]*$/.test(pathname)) return null;

  let query = "";
  if (search) {
    const raw = search.startsWith("?") ? search : `?${search}`;
    if (raw.length <= 120 && /^\?[A-Za-z0-9._~=&%+-]*$/.test(raw)) query = raw;
  }
  const value = `${pathname}${query}`;
  return value.length > MAX_LAND ? value.slice(0, MAX_LAND) : value;
}

export function firstLandPathFromCookie(value: string | undefined): string | null {
  if (!value) return null;
  const queryAt = value.indexOf("?");
  if (queryAt === -1) return firstLandPath(value, "");
  return firstLandPath(value.slice(0, queryAt), value.slice(queryAt));
}

export function absoluteFirstSite(origin: string, landPath: string | null): string | null {
  if (!landPath) return null;
  try {
    const base = new URL(origin);
    const url = new URL(landPath, base.origin);
    if (url.origin !== base.origin) return null;
    return url.href.slice(0, 240);
  } catch {
    return null;
  }
}

/** Path of the join page that posted the form, when the referrer is this site. */
export function firstPageFromReferer(referer: string | null, origin: string): string | null {
  if (!referer) return null;
  try {
    const url = new URL(referer);
    const base = new URL(origin);
    if (url.host !== base.host) return null;
    return firstLandPath(url.pathname, url.search);
  } catch {
    return null;
  }
}

export function shouldStampFirstLand(input: {
  method: string;
  existing: string | undefined;
  pathname: string;
  search: string;
  prefetch: boolean;
  rsc: boolean;
  dest: string | null;
}): string | null {
  if (input.method !== "GET" && input.method !== "HEAD") return null;
  if (input.existing) return null;
  if (input.prefetch || input.rsc) return null;
  if (input.dest && input.dest !== "document") return null;
  return firstLandPath(input.pathname, input.search);
}
