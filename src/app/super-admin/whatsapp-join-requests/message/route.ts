import { NextResponse } from "next/server";
import { applyWhatsappJoinNudge } from "@/lib/whatsapp-join-desk-db";
import { isWhatsappJoinId } from "@/lib/whatsapp-join-desk";
import { readSuperAdminEmail } from "@/lib/super-admin/require";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const email = await readSuperAdminEmail();
  if (!email) {
    return NextResponse.redirect(new URL("/super-admin", request.url), 303);
  }
  const form = await request.formData();
  const id = String(form.get("id") ?? "");
  if (!isWhatsappJoinId(id)) {
    return new NextResponse("That row is missing.", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
    });
  }
  try {
    const url = await applyWhatsappJoinNudge(id);
    if (!url) {
      return new NextResponse("No WhatsApp message for this row.", {
        status: 400,
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
      });
    }
    return NextResponse.redirect(url, 303);
  } catch {
    return new NextResponse("Could not open WhatsApp. Try again.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
    });
  }
}
