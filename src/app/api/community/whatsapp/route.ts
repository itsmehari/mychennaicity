import { NextRequest, NextResponse } from "next/server";
import { getWhatsAppCommunityInviteUrl } from "@/lib/whatsapp-server";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const fallback = new URL("/contact", origin);
  const invite = getWhatsAppCommunityInviteUrl();
  if (!invite) {
    return NextResponse.redirect(fallback, 302);
  }
  return NextResponse.redirect(invite, 302);
}
