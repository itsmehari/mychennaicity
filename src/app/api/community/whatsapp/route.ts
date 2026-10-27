import { NextRequest, NextResponse } from "next/server";
import { whatsappCommunityJoinHref } from "@/lib/whatsapp-community";

export const dynamic = "force-dynamic";

/**
 * Old public invite redirect. It now sends people to the join form.
 * The group invite is not on this response.
 */
export function GET(req: NextRequest) {
  const src =
    req.nextUrl.searchParams.get("src") ||
    req.nextUrl.searchParams.get("utm_content");
  const dest = new URL(whatsappCommunityJoinHref(src), req.nextUrl.origin);
  return NextResponse.redirect(dest, 302);
}
