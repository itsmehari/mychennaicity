import "server-only";

import { cookies } from "next/headers";
import { openJoinUnlock, sealJoinUnlock } from "@/lib/whatsapp-join";
import {
  WA_JOIN_STATE_COOKIE,
  WA_JOIN_STATE_MAX_AGE_SEC,
} from "@/lib/whatsapp-community-flags";

const COOKIE = "wa_join_ok";
const MAX_AGE_SEC = 60 * 60 * 24;

function joinCookieSecret(): string | null {
  const secret =
    process.env.AUTH_SECRET?.trim() || process.env.NEXTAUTH_SECRET?.trim() || "";
  return secret || null;
}

export async function setJoinUnlockCookie(
  name: string,
  phoneDisplay: string,
  locality = "",
): Promise<boolean> {
  const secret = joinCookieSecret();
  if (!secret) return false;
  const jar = await cookies();
  jar.set(COOKIE, sealJoinUnlock(secret, name, phoneDisplay, Date.now(), locality), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/whatsapp-community/join",
    maxAge: MAX_AGE_SEC,
  });
  jar.set(WA_JOIN_STATE_COOKIE, "verified", {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WA_JOIN_STATE_MAX_AGE_SEC,
  });
  return true;
}

export async function readJoinUnlock(): Promise<{
  name: string;
  phone: string;
  locality: string;
} | null> {
  const secret = joinCookieSecret();
  if (!secret) return null;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  return openJoinUnlock(secret, token);
}
