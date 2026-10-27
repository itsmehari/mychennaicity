/**
 * Server-only helpers for WhatsApp redirects. Never import from client components.
 */

const BUSINESS_ENV = "WHATSAPP_BUSINESS_E164";
const COMMUNITY_INVITE_ENV = "WHATSAPP_COMMUNITY_INVITE_URL";

/** Max length for optional `text` query passed to wa.me. */
const MAX_PREFILL = 600;

export function isWhatsAppBusinessConfigured(): boolean {
  return normalizeBusinessDigits(process.env[BUSINESS_ENV]?.trim() ?? "") != null;
}

export function isWhatsAppCommunityInviteConfigured(): boolean {
  const raw = process.env[COMMUNITY_INVITE_ENV]?.trim();
  if (!raw) return false;
  try {
    const u = new URL(raw);
    return u.protocol === "https:" && u.hostname.endsWith("whatsapp.com");
  } catch {
    return false;
  }
}

export function getWhatsAppCommunityInviteUrl(): string | null {
  const raw = process.env[COMMUNITY_INVITE_ENV]?.trim();
  if (!raw || !isWhatsAppCommunityInviteConfigured()) return null;
  return raw;
}

/**
 * TODO(owner): set WHATSAPP_COMMUNITY_INVITE_URL to the Chennai group invite.
 * Do not paste another city's invite and do not generate a new one here.
 * Until the env var is set, the success screen hides "Join on WhatsApp".
 */
export const WHATSAPP_COMMUNITY_INVITE_TODO =
  "Set WHATSAPP_COMMUNITY_INVITE_URL to the Chennai group invite before the success screen can show Join on WhatsApp.";

/**
 * Invite UTMs. `utm_content=join-verified` after the form; `admin-nudge` on the admin Message link.
 */
export function appendWhatsappCommunityUtms(
  inviteUrl: string,
  utmContent: string,
  medium: "join_form" | "admin" = "join_form",
): string | null {
  try {
    const u = new URL(inviteUrl);
    u.searchParams.set("utm_source", "mychennaicity");
    u.searchParams.set("utm_medium", medium);
    u.searchParams.set("utm_campaign", "whatsapp_community");
    u.searchParams.set("utm_content", utmContent.slice(0, 80));
    return u.toString();
  } catch {
    return null;
  }
}

export function trackedWhatsappCommunityInvite(
  utmContent: string,
  medium: "join_form" | "admin" = "join_form",
): string | null {
  const invite = getWhatsAppCommunityInviteUrl();
  if (!invite) return null;
  return appendWhatsappCommunityUtms(invite, utmContent, medium);
}

/**
 * Accepts +91…, 91…, spaces; returns digits suitable for https://wa.me/{digits}
 * (country code + national number, no leading +).
 */
export function normalizeBusinessDigits(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.length === 0) return null;
  if (d.startsWith("0")) d = d.replace(/^0+/, "") || d;
  if (d.length === 10) d = `91${d}`;
  if (d.length < 10 || d.length > 15) return null;
  return d;
}

export function buildWaMeRedirectUrl(prefill: string | null): string | null {
  const digits = normalizeBusinessDigits(
    process.env[BUSINESS_ENV]?.trim() ?? "",
  );
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  if (!prefill?.trim()) return base;
  const t = prefill.trim().slice(0, MAX_PREFILL);
  return `${base}?text=${encodeURIComponent(t)}`;
}

export function sanitizeWaPrefillParam(value: string | null): string | null {
  if (value == null) return null;
  const t = value.trim();
  if (!t) return null;
  return t.slice(0, MAX_PREFILL);
}
