/** Anonymous visitor id for first-party event view deduplication (HttpOnly cookie). */
export const EVENT_VIEWER_COOKIE = "mcc_vid";

export const EVENT_VIEWER_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidVisitorId(value: string | null | undefined): value is string {
  return typeof value === "string" && UUID_RE.test(value);
}

export function createVisitorId(): string {
  return crypto.randomUUID();
}

export function eventViewerCookieOptions(): {
  httpOnly: true;
  sameSite: "lax";
  path: string;
  maxAge: number;
  secure: boolean;
} {
  return {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: EVENT_VIEWER_COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  };
}
