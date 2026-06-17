import { NextRequest, NextResponse } from "next/server";
import { appendWhatsappCommunityUtms } from "@/lib/whatsapp-community";
import { getWhatsAppCommunityInviteUrl } from "@/lib/whatsapp-server";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const fallback = new URL("/contact", origin);
  const invite = getWhatsAppCommunityInviteUrl();
  if (!invite) {
    return NextResponse.redirect(fallback, 302);
  }
  const utmContent =
    req.nextUrl.searchParams.get("utm_content")?.trim() || "direct";
  const target = appendWhatsappCommunityUtms(invite, utmContent);
  return NextResponse.redirect(target, 302);
}
