/**
 * Frequency & path policy for site modals (MCC — not MyOMR hire defaults).
 */

import type { SiteModalPolicy } from "./types";

export const siteModalPolicy: SiteModalPolicy = {
  /** Auto-pop homepage only; click triggers work site-wide (except suppressed). */
  autoHomeOnly: true,
  firstVisitDelayMs: 1_500,
  /** Interleaved rotation — only while under session cap. */
  rotationIntervalMs: 3 * 60_000,
  maxAutoShowsPerSession: 2,
  scrollSettleMs: 280,
  suppressPathPrefixes: [
    "/admin",
    "/api",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/community-guidelines",
    "/chennai-whatsapp-group",
    "/chennai-whatsapp-group-tamil",
    "/chennai-whatsapp-community-guide",
    "/chennai-whatsapp-spammers",
    "/whatsapp-community",
    "/guides/bulk-waste-generator-readiness-checklist-2026",
    "/civic-tools/boundary-feedback",
  ],
  suppressPaths: [],
  rotationSlots: [
    "top-story",
    "whatsapp",
    "top-story",
    "today",
    "newsletter",
    "top-story",
    "civic",
  ],
  storageKeys: {
    firstVisitShown: "mcc_site_modal_first_visit_shown",
    rotationIndex: "mcc_site_modal_rotation_index",
    newsIndex: "mcc_site_modal_news_index",
    autoShowCount: "mcc_site_modal_auto_show_count",
  },
};

export function isSiteModalPathSuppressed(pathname: string): boolean {
  const path = pathname || "/";
  if (siteModalPolicy.suppressPaths.includes(path)) return true;
  return siteModalPolicy.suppressPathPrefixes.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

export function isSiteModalAutoPathAllowed(pathname: string): boolean {
  const path = pathname || "/";
  if (isSiteModalPathSuppressed(path)) return false;
  if (siteModalPolicy.autoHomeOnly) {
    return path === "/" || path === "";
  }
  return true;
}
