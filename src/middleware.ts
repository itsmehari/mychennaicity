import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  CANONICAL_SITE_HOST,
  isWrongSiteHost,
} from "@/lib/canonical-site";
import { lookupJobAvailability } from "@/lib/jobs/job-availability-lookup";
import { markdownTwinPath, prefersMarkdown } from "@/lib/seo/content-markdown";
import {
  shouldStampFirstLand,
  WHATSAPP_FIRST_LAND_COOKIE,
} from "@/lib/whatsapp-join-land";

const JOB_PATH_RESERVED = new Set([
  "looking-for-work",
  "locations",
  "categories",
  "feed.xml",
]);

function closedJobSlug(pathname: string): string | null {
  const match = pathname.match(/^\/chennai-jobs\/([^/]+)$/);
  if (!match) return null;
  let slug = match[1];
  try {
    slug = decodeURIComponent(slug);
  } catch {
    return null;
  }
  if (JOB_PATH_RESERVED.has(slug)) return null;
  return slug;
}

function rememberFirstLand(request: NextRequest, response: NextResponse): NextResponse {
  const value = shouldStampFirstLand({
    method: request.method,
    existing: request.cookies.get(WHATSAPP_FIRST_LAND_COOKIE)?.value,
    pathname: request.nextUrl.pathname,
    search: request.nextUrl.search,
    prefetch:
      request.headers.has("next-router-prefetch") ||
      request.headers.get("purpose") === "prefetch",
    rsc: request.headers.has("rsc"),
    dest: request.headers.get("sec-fetch-dest"),
  });
  if (!value) return response;
  response.cookies.set(WHATSAPP_FIRST_LAND_COOKIE, value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
  return response;
}

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

export async function middleware(request: NextRequest) {
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

  const joinPath = "/whatsapp-community/join";
  if (
    request.nextUrl.pathname === joinPath &&
    request.nextUrl.search.length > 0 &&
    (request.method === "GET" || request.method === "HEAD")
  ) {
    const response = nextWithPath(request);
    response.headers.set("X-Robots-Tag", "noindex, follow");
    return rememberFirstLand(request, response);
  }

  if (request.method === "GET" || request.method === "HEAD") {
    const closedSlug = closedJobSlug(request.nextUrl.pathname);
    if (closedSlug) {
      const availability = await lookupJobAvailability(closedSlug);
      if (availability === "gone") {
        const url = request.nextUrl.clone();
        url.pathname = `/job-closed/${encodeURIComponent(closedSlug)}`;
        const rewritten = NextResponse.rewrite(url);
        rewritten.headers.set("X-Robots-Tag", "noindex, follow");
        return rememberFirstLand(request, rewritten);
      }
    }
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
      return rememberFirstLand(request, rewritten);
    }
    const next = nextWithPath(request);
    const markdownUrl = new URL(twin, request.nextUrl.origin);
    next.headers.set(
      "Link",
      `<${markdownUrl.href}>; rel="alternate"; type="text/markdown"`,
    );
    next.headers.set("Vary", "Accept");
    return rememberFirstLand(request, next);
  }

  return rememberFirstLand(request, nextWithPath(request));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
