/**
 * Public WhatsApp link types. Invite URLs are never built here.
 */

import { getSiteUrl } from "@/lib/env";
import {
  WHATSAPP_COMMUNITY_JOIN_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL,
  sanitizeWhatsappJoinSource,
  whatsappCommunityJoinHref,
} from "@/lib/whatsapp-community";
import { whatsappCommunityAccepting } from "@/lib/whatsapp-community-flags";

export type WhatsappLinkType = "learn" | "request" | "chat" | "share" | "listing";

export type WhatsappLinkOpts = {
  placement?: string;
  lang?: "en" | "ta";
  source?: string;
  /** Absolute or site-relative URL to share (share type). */
  url?: string;
  /** Prefilled chat text. Never the group invite. */
  text?: string;
  /** Business listing digits (listing type). */
  phoneE164?: string;
};

function withPlacement(path: string, placement?: string): string {
  if (!placement) return path;
  const joiner = path.includes("?") ? "&" : "?";
  return `${path}${joiner}placement=${encodeURIComponent(placement.slice(0, 40))}`;
}

/**
 * Build a public WhatsApp-related href. Refuses `invite`.
 * `whatsappCommunityJoinHref()` remains the wrapper for older call sites.
 */
export function waLink(type: WhatsappLinkType, opts: WhatsappLinkOpts = {}): string {
  const placement = opts.placement?.trim().slice(0, 40) || undefined;
  const source = sanitizeWhatsappJoinSource(opts.source || placement || type);

  if (type === "learn") {
    const path =
      opts.lang === "ta"
        ? WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL
        : WHATSAPP_COMMUNITY_PAGE_PATH;
    return withPlacement(path, placement);
  }

  if (type === "request") {
    return withPlacement(whatsappCommunityJoinHref(source), placement);
  }

  if (type === "share") {
    const raw = opts.url?.trim() || getSiteUrl();
    const absolute = raw.startsWith("http")
      ? raw
      : `${getSiteUrl()}${raw.startsWith("/") ? raw : `/${raw}`}`;
    const u = new URL(absolute);
    u.searchParams.set("utm_source", "whatsapp");
    u.searchParams.set("utm_medium", "share");
    if (!u.searchParams.get("utm_campaign")) {
      u.searchParams.set("utm_campaign", "community_share");
    }
    const text = opts.text?.trim()
      ? `${opts.text.trim()} ${u.toString()}`
      : u.toString();
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }

  if (type === "listing") {
    const digits = (opts.phoneE164 ?? "").replace(/\D/g, "");
    if (!digits) return "#";
    const base = `https://wa.me/${digits}`;
    return opts.text ? `${base}?text=${encodeURIComponent(opts.text.slice(0, 600))}` : base;
  }

  // chat — official desk. Digits stay server-side; public pages use /api/contact/whatsapp.
  return "/contact";
}

export function whatsappRequestCtaLabel(lang: "en" | "ta" = "en"): string {
  if (!whatsappCommunityAccepting()) {
    return lang === "ta" ? "காத்திருப்பு பட்டியலில் சேர" : "Join the waitlist";
  }
  return lang === "ta" ? "சேர கோரிக்கை" : "Request to join";
}

export function memberInviteShareHref(): string {
  const learn = `${getSiteUrl()}${WHATSAPP_COMMUNITY_PAGE_PATH}`;
  const u = new URL(learn);
  u.searchParams.set("ref", "member");
  u.searchParams.set("utm_source", "whatsapp");
  u.searchParams.set("utm_medium", "member_invite");
  return `https://wa.me/?text=${encodeURIComponent(
    `Join the official Chennai WhatsApp group through this form: ${u.toString()}`,
  )}`;
}

export function joinFormPath(): string {
  return WHATSAPP_COMMUNITY_JOIN_PATH;
}
