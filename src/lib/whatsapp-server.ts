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
