import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  CANONICAL_SITE_HOST,
  isWrongSiteHost,
} from "@/lib/canonical-site";
import { markdownTwinPath, prefersMarkdown } from "@/lib/seo/content-markdown";

function nextWithPath(request: NextRequest): NextResponse {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-mcc-path", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
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
    request.nextUrl.pathname === "/admin" ||
    request.nextUrl.pathname.startsWith("/admin/") ||
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname.startsWith("/login/")
  ) {
    const url = request.nextUrl.clone();
    url.pathname =
      url.pathname === "/login" || url.pathname.startsWith("/login/")
        ? "/super-admin"
        : url.pathname.replace(/^\/admin/, "/super-admin");
    return NextResponse.redirect(url, 308);
  }

  // Server Actions and the WhatsApp queue posts must keep their body.
  // Rewriting the request headers on those calls drops the form fields, so the
  // button returns without saving.
  if (
    request.headers.has("next-action") ||
    (request.method === "POST" &&
      request.nextUrl.pathname.startsWith("/super-admin/whatsapp-join-requests/"))
  ) {
    return NextResponse.next();
  }

  const twin = markdownTwinPath(request.nextUrl.pathname);
  if (twin && (request.method === "GET" || request.method === "HEAD")) {
    if (prefersMarkdown(request.headers.get("accept"))) {
      const url = request.nextUrl.clone();
      url.pathname = twin;
      const rewritten = NextResponse.rewrite(url, {
        request: { headers: new Headers(request.headers) },
      });
      rewritten.headers.set("Vary", "Accept");
      return rewritten;
    }
    const next = nextWithPath(request);
    const markdownUrl = new URL(twin, request.nextUrl.origin);
    next.headers.set(
      "Link",
      `<${markdownUrl.href}>; rel="alternate"; type="text/markdown"`,
    );
    next.headers.set("Vary", "Accept");
    return next;
  }

  return nextWithPath(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
