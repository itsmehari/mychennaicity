import { NextRequest, NextResponse } from "next/server";
import {
  buildWaMeRedirectUrl,
  sanitizeWaPrefillParam,
} from "@/lib/whatsapp-server";

export const dynamic = "force-dynamic";

const NOINDEX_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "no-store",
} as const;

/** Alphanumeric + underscore, max 48 — safe for WhatsApp prefill tagging. */
function sanitizeSourceParam(value: string | null): string | null {
  if (value == null) return null;
  const t = value.trim().slice(0, 48);
  if (!t || !/^[a-z0-9_]+$/i.test(t)) return null;
  return t;
}

export function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const fallback = new URL("/contact", origin);
  const source = sanitizeSourceParam(
    request.nextUrl.searchParams.get("source"),
  );
  let prefill = sanitizeWaPrefillParam(
    request.nextUrl.searchParams.get("text"),
  );
  if (source) {
    const tag = `[ref:${source}]`;
    prefill = prefill ? `${prefill} ${tag}` : `Hi — enquiry from mychennaicity.in ${tag}`;
  }
  const target = buildWaMeRedirectUrl(prefill);
  if (!target) {
    return NextResponse.redirect(fallback, {
      status: 302,
      headers: NOINDEX_HEADERS,
    });
  }
  return NextResponse.redirect(target, {
    status: 302,
    headers: NOINDEX_HEADERS,
  });
}
