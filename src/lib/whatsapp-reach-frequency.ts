/** Session cap for contextual placement CTAs — aligned with site modal auto cap (2). */

export const WA_REACH_SESSION_CAP = 2;
const STORAGE_KEY = "wa_reach_session_impressions";

/** Claim one impression slot; safe for multiple placements mounting in the same tick. */
export function claimWaReachImpression(): boolean {
  if (typeof sessionStorage === "undefined") return false;
  const n = Number(sessionStorage.getItem(STORAGE_KEY) || "0");
  if (!Number.isFinite(n) || n >= WA_REACH_SESSION_CAP) return false;
  sessionStorage.setItem(STORAGE_KEY, String(n + 1));
  return true;
}

export function waReachSessionCapReached(): boolean {
  if (typeof sessionStorage === "undefined") return true;
  const n = Number(sessionStorage.getItem(STORAGE_KEY) || "0");
  return Number.isFinite(n) && n >= WA_REACH_SESSION_CAP;
}