import { NextRequest, NextResponse } from "next/server";
import {
  buildWaMeRedirectUrl,
  sanitizeWaPrefillParam,
} from "@/lib/whatsapp-server";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const fallback = new URL("/contact", origin);
  const prefill = sanitizeWaPrefillParam(
    request.nextUrl.searchParams.get("text"),
  );
  const target = buildWaMeRedirectUrl(prefill);
  if (!target) {
    return NextResponse.redirect(fallback, 302);
  }
  return NextResponse.redirect(target, 302);
}
