import { applyWhatsappJoinNotes } from "@/lib/whatsapp-join-desk-db";
import { isWhatsappJoinId } from "@/lib/whatsapp-join-desk";
import { queueRedirect, readQueuePost } from "../http";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const posted = await readQueuePost(request);
  if (!posted.ok) return posted.response;
  const id = String(posted.form.get("id") ?? "");
  if (!isWhatsappJoinId(id)) {
    return queueRedirect(request, posted.back, "error", "missing");
  }
  const notes = String(posted.form.get("notes") ?? "");
  try {
    const saved = await applyWhatsappJoinNotes(id, notes);
    if (!saved) return queueRedirect(request, posted.back, "error", "missing");
  } catch {
    return queueRedirect(request, posted.back, "error", "save");
  }
  return queueRedirect(request, posted.back, "notice", "noted");
}
