/**
 * WhatsApp community feature switches. New reach and funnel behaviour defaults
 * off until verified on live. Join-path bug fixes are not gated.
 *
 * A form always records a request and shows the group link. Approve, decline,
 * message, and spam stay manual on the desk. The accepting switch no longer
 * files people onto a waitlist or hides the invite.
 */

function truthy(raw: string | undefined): boolean {
  const value = raw?.trim().toLowerCase() ?? "";
  return value === "1" || value === "true" || value === "yes" || value === "on";
}

function falsey(raw: string | undefined): boolean {
  const value = raw?.trim().toLowerCase() ?? "";
  return value === "0" || value === "false" || value === "no" || value === "off";
}

/** Contextual CTAs, joined-state suppression, desktop QR, digest, neighbour invite. */
export function waReachEnabled(): boolean {
  return truthy(process.env.NEXT_PUBLIC_WA_REACH_ENABLED);
}

/** GA4 funnel events (wa_cta_view / click / form). Old whatsapp_community_click still fires. */
export function waFunnelEventsEnabled(): boolean {
  return truthy(process.env.NEXT_PUBLIC_WA_FUNNEL_EVENTS_ENABLED);
}

/** The public form always accepts a request. The desk decides afterwards. */
export function whatsappCommunityAccepting(): boolean {
  return true;
}

/** Hours before a waiting row may get one reply-first nudge. Default 12 (daytime desk). */
export function whatsappApprovalHours(): number {
  const n = Number(process.env.WHATSAPP_COMMUNITY_APPROVAL_HOURS);
  if (Number.isFinite(n) && n > 0 && n < 24 * 14) return Math.round(n);
  return 12;
}

/** IST desk hours for the optional Message nudge: 08:00–20:00. */
export function isWhatsappDeskDaytimeIst(now = new Date()): boolean {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now).find((part) => part.type === "hour")?.value,
  );
  return Number.isFinite(hour) && hour >= 8 && hour < 20;
}

/** Optional public member count. Hidden when unset. TODO_OWNER: who updates this. */
export function whatsappMemberCount(): { count: number; updated: string } | null {
  const n = Number(process.env.WHATSAPP_COMMUNITY_MEMBER_COUNT);
  if (!Number.isFinite(n) || n < 1) return null;
  const updated =
    process.env.WHATSAPP_COMMUNITY_MEMBER_COUNT_DATE?.trim() || "TODO_OWNER";
  return { count: Math.round(n), updated };
}

export const WA_NUDGE_DAILY_CAP = 10;
export const WA_SOCIAL_PROOF_MIN_ROWS = 5;
export const WA_JOIN_STATE_COOKIE = "wa_join_state";
export const WA_JOIN_STATE_MAX_AGE_SEC = 180 * 24 * 60 * 60;
