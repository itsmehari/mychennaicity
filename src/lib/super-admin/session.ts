import { createHmac, timingSafeEqual } from "node:crypto";

/** Site-wide so the engagement API can skip a signed-in desk session on public pages. */
export const SUPER_ADMIN_COOKIE = "mcc_sa";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 14;

type Payload = { email: string; exp: number };

function sessionSecret(): string | null {
  const secret =
    process.env.AUTH_SECRET?.trim() || process.env.SUPER_ADMIN_SESSION_SECRET?.trim();
  return secret || null;
}

export function signSuperAdminSession(email: string, now = Date.now()): string | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const payload = Buffer.from(
    JSON.stringify({ email, exp: now + MAX_AGE_MS } satisfies Payload),
  ).toString("base64url");
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function readSuperAdminSession(
  token: string | undefined | null,
  now = Date.now(),
): { email: string } | null {
  if (!token) return null;
  const secret = sessionSecret();
  if (!secret) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const got = Buffer.from(sig);
  const want = Buffer.from(expected);
  if (got.length !== want.length || !timingSafeEqual(got, want)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Payload;
    if (!data.email || typeof data.exp !== "number" || data.exp < now) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}
