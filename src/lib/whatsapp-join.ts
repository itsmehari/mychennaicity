/**
 * WhatsApp join gate — phone checks, copy, and the admin nudge line.
 * The invite URL is passed in by server code. This file does not read it.
 */

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { WHATSAPP_COMMUNITY_LOCALITIES } from "@/content/whatsapp-community/localities";
import { WHATSAPP_SPAMMERS } from "@/content/whatsapp-community/spammers";

export const WHATSAPP_JOIN_OTHER_AREA = "Other Chennai area";

export const WHATSAPP_JOIN_INTENTS = {
  news: "Local news",
  jobs: "Jobs",
  events: "Events",
  neighbour: "Neighbour help",
  listings: "Listings",
} as const;

export const WHATSAPP_JOIN_INTENTS_TA = {
  news: "உள்ளூர் செய்தி",
  jobs: "வேலை",
  events: "நிகழ்வுகள்",
  neighbour: "அண்டை உதவி",
  listings: "விளம்பரங்கள்",
} as const;

export type WhatsappJoinIntent = keyof typeof WHATSAPP_JOIN_INTENTS;
export type WhatsappJoinStatus = "submitted" | "approved" | "declined" | "spam";

export type NormalizedIndianMobile = {
  ok: true;
  e164: string;
  last4: string;
  display: string;
  raw: string;
};

const spamE164 = new Set(
  WHATSAPP_SPAMMERS.map((row) => row.e164.replace(/\D/g, "")).filter(Boolean),
);

export function whatsappJoinLocalities(): string[] {
  return [
    ...WHATSAPP_COMMUNITY_LOCALITIES.map((row) => row.label),
    WHATSAPP_JOIN_OTHER_AREA,
  ];
}

export function normalizeIndianMobile(phone: string): NormalizedIndianMobile | null {
  const raw = phone.trim();
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }
  if (!/^[6-9]\d{9}$/.test(digits)) return null;
  return {
    ok: true,
    e164: `91${digits}`,
    last4: digits.slice(-4),
    display: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`,
    raw: raw || `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`,
  };
}

export function isWhatsappJoinSpamNumber(e164: string): boolean {
  const digits = e164.replace(/\D/g, "");
  return digits.length > 0 && spamE164.has(digits);
}

export function hashJoinIp(ip: string): string {
  return createHash("sha256").update(`${ip}|mychennaicity-wa-join`).digest("hex");
}

export function whatsappJoinFirstName(displayName: string): string {
  const first = displayName.trim().split(/\s+/)[0] ?? "";
  return first.slice(0, 40);
}

/**
 * Ready rows include the tracked invite. Approved rows do not.
 * Declined, spam, spam-list numbers, and invalid phones return null (no Message link).
 */
export function whatsappJoinFollowupMessage(input: {
  displayName: string;
  status: string;
  phoneE164: string;
  inviteForNudge: string | null;
}): string | null {
  if (input.status !== "submitted" && input.status !== "approved") return null;
  const phone = normalizeIndianMobile(input.phoneE164);
  if (!phone) return null;
  if (isWhatsappJoinSpamNumber(phone.e164)) return null;
  const first = whatsappJoinFirstName(input.displayName);
  const hi = first ? `Hi ${first}, ` : "Hi, ";
  if (input.status === "approved") {
    return `${hi}you're in the MyChennai Chennai community. Open the group from the link we sent.`;
  }
  const invite = input.inviteForNudge?.trim() ?? "";
  const line = `${hi}we have your MyChennai join request. Open the group link and tap Join so we can approve you.`;
  return invite ? `${line} ${invite}` : line;
}

export function whatsappJoinWaMeUrl(input: {
  displayName: string;
  status: string;
  phoneE164: string;
  inviteForNudge: string | null;
}): string | null {
  const text = whatsappJoinFollowupMessage(input);
  if (!text) return null;
  const phone = normalizeIndianMobile(input.phoneE164);
  if (!phone) return null;
  return `https://wa.me/${phone.e164}?text=${encodeURIComponent(text)}`;
}

export type WhatsappJoinSavePlan = "reject-spam" | "insert" | "update";

export function whatsappJoinSavePlan(
  existingStatus: WhatsappJoinStatus | null,
  e164: string,
): WhatsappJoinSavePlan {
  if (isWhatsappJoinSpamNumber(e164) || existingStatus === "spam") {
    return "reject-spam";
  }
  return existingStatus ? "update" : "insert";
}

const UNLOCK_TTL_MS = 24 * 60 * 60 * 1000;

export function sealJoinUnlock(
  secret: string,
  name: string,
  phoneDisplay: string,
  now = Date.now(),
): string {
  const body = Buffer.from(
    JSON.stringify({
      exp: now + UNLOCK_TTL_MS,
      name: name.slice(0, 80),
      phone: phoneDisplay.slice(0, 32),
    }),
    "utf8",
  ).toString("base64url");
  const sig = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function openJoinUnlock(
  secret: string,
  token: string,
  now = Date.now(),
): { name: string; phone: string } | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
      exp?: number;
      name?: string;
      phone?: string;
    };
    if (!parsed.exp || parsed.exp < now) return null;
    if (!parsed.name || !parsed.phone) return null;
    return { name: parsed.name, phone: parsed.phone };
  } catch {
    return null;
  }
}
