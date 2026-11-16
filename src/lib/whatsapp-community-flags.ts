/**
 * WhatsApp community feature switches. New reach and funnel behaviour defaults
 * off until verified on live. Join-path bug fixes are not gated.
 *
 * TODO_OWNER: set approval hours and member count in env when you want them
 * shown. Waitlist is off while WHATSAPP_COMMUNITY_ACCEPTING is unset/true.
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

/** When false, the form saves waitlist rows and every Request label changes. Default: accepting. */
export function whatsappCommunityAccepting(): boolean {
  if (falsey(process.env.WHATSAPP_COMMUNITY_ACCEPTING)) return false;
  if (falsey(process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_ACCEPTING)) return false;
  return true;
}

/** TODO_OWNER: hours before a waiting row may get one reply-first nudge. Default 24. */
export function whatsappApprovalHours(): number {
  const n = Number(process.env.WHATSAPP_COMMUNITY_APPROVAL_HOURS);
  if (Number.isFinite(n) && n > 0 && n < 24 * 14) return Math.round(n);
  return 24;
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
