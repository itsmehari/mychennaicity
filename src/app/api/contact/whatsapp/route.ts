import { NextRequest, NextResponse } from "next/server";
import { rateLimitConsume } from "@/lib/rate-limit";
import {
  buildWaMeRedirectUrl,
  sanitizeWaPrefillParam,
} from "@/lib/whatsapp-server";

export const dynamic = "force-dynamic";

const PRIVATE_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "no-referrer",
} as const;

/** Alphanumeric + underscore, max 48 — safe for WhatsApp prefill tagging. */
function sanitizeSourceParam(value: string | null): string | null {
  if (value == null) return null;
  const t = value.trim().slice(0, 48);
  if (!t || !/^[a-z0-9_]+$/i.test(t)) return null;
  return t;
}

function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function sameOriginClick(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    if (new URL(origin).origin !== request.nextUrl.origin) return false;
  } catch {
    return false;
  }
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;
  return true;
}

/** Crawlers only GET. This must never redirect to WhatsApp or include the desk number. */
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/contact", request.nextUrl.origin), {
    status: 302,
    headers: PRIVATE_HEADERS,
  });
}

/** Browser button click. The WhatsApp address is returned only to that POST. */
export async function POST(request: NextRequest) {
  if (!sameOriginClick(request)) {
    return NextResponse.json({ ok: false }, { status: 403, headers: PRIVATE_HEADERS });
  }

  const limit = rateLimitConsume(
    `contact-wa:${clientIp(request)}`,
    30,
    60 * 60 * 1000,
  );
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false },
      {
        status: 429,
        headers: {
          ...PRIVATE_HEADERS,
          "Retry-After": String(limit.retryAfterSec),
        },
      },
    );
  }

  let text: string | null = null;
  let source: string | null = null;
  try {
    const body = (await request.json()) as { text?: unknown; source?: unknown };
    text = sanitizeWaPrefillParam(typeof body.text === "string" ? body.text : null);
    source = sanitizeSourceParam(
      typeof body.source === "string" ? body.source : null,
    );
  } catch {
    text = null;
    source = null;
  }

  if (source) {
    const tag = `[ref:${source}]`;
    text = text ? `${text} ${tag}` : `Hi — enquiry from mychennaicity.in ${tag}`;
  }

  const target = buildWaMeRedirectUrl(text);
  if (!target) {
    return NextResponse.json({ ok: false }, { status: 404, headers: PRIVATE_HEADERS });
  }

  return NextResponse.json(
    { ok: true, url: target },
    { status: 200, headers: PRIVATE_HEADERS },
  );
}
