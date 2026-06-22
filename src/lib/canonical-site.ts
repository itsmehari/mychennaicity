/** Official public origin — apex .in only (not .com, not www). */
export const CANONICAL_SITE_HOST = "mychennaicity.in";

export const CANONICAL_SITE_URL = `https://${CANONICAL_SITE_HOST}`;

/**
 * Hostnames that should 308 to {@link CANONICAL_SITE_URL} on Vercel production.
 * Includes common typos and legacy/alternate domains.
 */
export const SITE_HOST_ALIASES = new Set([
  "www.mychennaicity.in",
  "mychennaicity.com",
  "www.mychennaicity.com",
  "chennaicity.in",
  "www.chennaicity.in",
]);

export function isWrongSiteHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (host === CANONICAL_SITE_HOST) return false;
  return SITE_HOST_ALIASES.has(host) || host.endsWith(".mychennaicity.com");
}
