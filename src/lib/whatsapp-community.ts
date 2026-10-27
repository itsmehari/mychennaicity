/**
 * Public WhatsApp community paths. Join CTAs use `whatsappCommunityJoinHref`.
 * The group invite is never exported from this module.
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

/** Form gate. The invite is shown only after a successful submit. */
export const WHATSAPP_COMMUNITY_JOIN_PATH = "/whatsapp-community/join";

/** Flagged invite-flood / spam numbers for group admins */
export const WHATSAPP_SPAMMERS_PAGE_PATH = "/chennai-whatsapp-spammers";

/** Neighbourhood admin toolkit (rules, spam workflow, links) */
export const WHATSAPP_ADMINS_TOOLKIT_PATH = "/chennai-whatsapp-group-admins";

export const WHATSAPP_COMMUNITY_OG_IMAGE =
  "/images/mychennaicity-whatsapp-community-og.svg";

export const WHATSAPP_COMMUNITY_BADGE_IMAGE =
  "/images/mychennaicity-whatsapp-community-badge.svg";

export const WHATSAPP_COMMUNITY_GROUP_NAME = "my chennai city";

export const WHATSAPP_COMMUNITY_LAST_UPDATED = "18 June 2026";

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

/** Keep CTA labels short and free of characters that would break a query string. */
export function sanitizeWhatsappJoinSource(raw: string | null | undefined): string {
  const cleaned = (raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 40);
  return cleaned || "join-page";
}

/** Shared public join URL. Every nav, footer, float, modal, and page CTA uses this. */
export function whatsappCommunityJoinHref(source?: string | null): string {
  const src = sanitizeWhatsappJoinSource(source);
  return `${WHATSAPP_COMMUNITY_JOIN_PATH}?src=${encodeURIComponent(src)}`;
}

export function siteWhatsappCommunityJoinUrl(source?: string | null): string {
  return `${getSiteUrl()}${whatsappCommunityJoinHref(source)}`;
}

/**
 * Older call sites passed a GA label here. It now opens the form, not the invite.
 */
export function whatsappCommunityJoinRedirectPath(utmContent: string): string {
  return whatsappCommunityJoinHref(utmContent);
}

/**
 * UTMs for a mychennaicity.in link that will be pasted inside the group later.
 * This is not the group invite.
 */
export function withWhatsappGroupShareUtms(pathOrUrl: string): string {
  const absolute = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${getSiteUrl()}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
  const u = new URL(absolute);
  u.searchParams.set("utm_source", "whatsapp");
  u.searchParams.set("utm_medium", "group");
  u.searchParams.set("utm_campaign", "community_share");
  return u.toString();
}

/** GEO meta tags for Chennai landing pages */
export const WHATSAPP_COMMUNITY_GEO_META = {
  "geo.region": "IN-TN",
  "geo.placename": "Chennai",
  "geo.position": "13.0827;80.2707",
  ICBM: "13.0827, 80.2707",
} as const;
