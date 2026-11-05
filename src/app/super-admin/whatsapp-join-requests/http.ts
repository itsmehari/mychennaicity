import { NextResponse } from "next/server";
import { readSuperAdminEmail } from "@/lib/super-admin/require";
import { safeWhatsappQueueReturn, withQueueFlag } from "@/lib/whatsapp-join-desk";

export async function readQueuePost(request: Request): Promise<
  | { ok: false; response: NextResponse }
  | { ok: true; email: string; form: FormData; back: string }
> {
  const form = await request.formData();
  const back = safeWhatsappQueueReturn(String(form.get("returnTo") ?? ""));
  const email = await readSuperAdminEmail();
  if (!email) {
    return {
      ok: false,
      response: NextResponse.redirect(new URL("/super-admin", request.url), 303),
    };
  }
  return { ok: true, email, form, back };
}

export function queueRedirect(
  request: Request,
  back: string,
  key: "notice" | "error",
  value: string,
): NextResponse {
  return NextResponse.redirect(new URL(withQueueFlag(back, key, value), request.url), 303);
}
