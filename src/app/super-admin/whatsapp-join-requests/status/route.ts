import { applyWhatsappJoinStatus } from "@/lib/whatsapp-join-desk-db";
import { isWhatsappJoinId, parseWhatsappJoinStatus } from "@/lib/whatsapp-join-desk";
import { queueRedirect, readQueuePost } from "../http";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const posted = await readQueuePost(request);
  if (!posted.ok) return posted.response;
  const id = String(posted.form.get("id") ?? "");
  const status = parseWhatsappJoinStatus(String(posted.form.get("status") ?? ""));
  if (!isWhatsappJoinId(id) || !status || status === "submitted") {
    return queueRedirect(request, posted.back, "error", "missing");
  }
  try {
    const saved = await applyWhatsappJoinStatus(id, status, posted.email);
    if (!saved) return queueRedirect(request, posted.back, "error", "missing");
  } catch {
    return queueRedirect(request, posted.back, "error", "save");
  }
  return queueRedirect(request, posted.back, "notice", status);
}
