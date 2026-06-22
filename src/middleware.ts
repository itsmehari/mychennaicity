import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  CANONICAL_SITE_HOST,
  isWrongSiteHost,
} from "@/lib/canonical-site";

/**
 * Session cookies for Auth.js v5 (names vary by dev/prod/https).
 * Full session validation happens in Server Components / Route Handlers via `auth()`.
 */
function hasAuthSessionCookie(request: NextRequest): boolean {
  const names = request.cookies.getAll().map((c) => c.name);
  return names.some(
    (n) =>
      n === "authjs.session-token" ||
      n.startsWith("__Secure-authjs") ||
      n.startsWith("__Host-authjs"),
  );
}

function canonicalHostRedirect(request: NextRequest): NextResponse | null {
  if (process.env.VERCEL_ENV !== "production") return null;

  const host = request.headers.get("host")?.split(":")[0];
  if (!host || !isWrongSiteHost(host)) return null;

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.host = CANONICAL_SITE_HOST;
  return NextResponse.redirect(url, 308);
}

export function middleware(request: NextRequest) {
  const hostRedirect = canonicalHostRedirect(request);
  if (hostRedirect) return hostRedirect;

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !hasAuthSessionCookie(request)
  ) {
    const signIn = new URL("/api/auth/signin", request.nextUrl.origin);
    signIn.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signIn);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
