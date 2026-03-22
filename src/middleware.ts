import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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

export function middleware(request: NextRequest) {
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
  matcher: ["/admin/:path*"],
};
