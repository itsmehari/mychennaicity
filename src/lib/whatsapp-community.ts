/**
 * Single source of truth for the Chennai WhatsApp community landing funnel.
 * Invite URLs stay server-only — UI links to /api/community/whatsapp or these page paths.
 */

import { getSiteUrl } from "@/lib/env";

/** Canonical English landing page */
export const WHATSAPP_COMMUNITY_PAGE_PATH = "/chennai-whatsapp-group";

/** Tamil companion page */
export const WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL = "/chennai-whatsapp-group-tamil";

/** AEO guide hub */
export const WHATSAPP_COMMUNITY_GUIDE_PATH = "/chennai-whatsapp-community-guide";

/** Partner badge / embed */
export const WHATSAPP_COMMUNITY_PARTNERS_PATH = "/whatsapp-community/partners";

/** Flagged invite-flood / spam numbers for group admins */
export const WHATSAPP_SPAMMERS_PAGE_PATH = "/chennai-whatsapp-spammers";

export const WHATSAPP_COMMUNITY_OG_IMAGE =
  "/images/mychennaicity-whatsapp-community-og.svg";

export const WHATSAPP_COMMUNITY_BADGE_IMAGE =
  "/images/mychennaicity-whatsapp-community-badge.svg";

/** Documented default — production uses WHATSAPP_COMMUNITY_INVITE_URL env. */
export const WHATSAPP_COMMUNITY_INVITE_URL_DEFAULT =
  "https://chat.whatsapp.com/CnxfxABnv3YCgxhdSqEigd";

export const WHATSAPP_COMMUNITY_GROUP_NAME = "my chennai city";

export const WHATSAPP_COMMUNITY_LAST_UPDATED = "18 June 2026";

const UTM_SOURCE = "mychennaicity";
const UTM_MEDIUM = "landing";
const UTM_CAMPAIGN = "whatsapp_community";

export function siteWhatsappCommunityPageUrl(
  query?: Record<string, string>,
): string {
  const base = `${getSiteUrl()}${WHATSAPP_COMMUNITY_PAGE_PATH}`;
  if (!query || Object.keys(query).length === 0) return base;
  const params = new URLSearchParams(query);
  return `${base}?${params.toString()}`;
}

export function siteWhatsappCommunityTamilPageUrl(): string {
  return `${getSiteUrl()}${WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL}`;
}

export function siteWhatsappCommunityGuideUrl(): string {
  return `${getSiteUrl()}${WHATSAPP_COMMUNITY_GUIDE_PATH}`;
}

export function siteWhatsappCommunityPartnersUrl(): string {
  return `${getSiteUrl()}${WHATSAPP_COMMUNITY_PARTNERS_PATH}`;
}

export function siteWhatsappSpammersUrl(): string {
  return `${getSiteUrl()}${WHATSAPP_SPAMMERS_PAGE_PATH}`;
}

/**
 * Server-side redirect path with UTM content label for GA4 (`event_label`).
 * Client components should use this — never embed the raw chat.whatsapp.com URL.
 */
export function whatsappCommunityJoinRedirectPath(utmContent: string): string {
  const params = new URLSearchParams({ utm_content: utmContent });
  return `/api/community/whatsapp?${params.toString()}`;
}

/**
 * Append standard UTMs to the invite URL (used by the API redirect handler).
 */
export function appendWhatsappCommunityUtms(
  inviteUrl: string,
  utmContent: string,
): string {
  try {
    const u = new URL(inviteUrl);
    u.searchParams.set("utm_source", UTM_SOURCE);
    u.searchParams.set("utm_medium", UTM_MEDIUM);
    u.searchParams.set("utm_campaign", UTM_CAMPAIGN);
    u.searchParams.set("utm_content", utmContent);
    return u.toString();
  } catch {
    return inviteUrl;
  }
}

/** GEO meta tags for Chennai landing pages */
export const WHATSAPP_COMMUNITY_GEO_META = {
  "geo.region": "IN-TN",
  "geo.placename": "Chennai",
  "geo.position": "13.0827;80.2707",
  ICBM: "13.0827, 80.2707",
} as const;
