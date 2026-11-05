"use server";

import { revalidatePath } from "next/cache";
import {
  applyWhatsappJoinNotes,
  applyWhatsappJoinNudge,
  applyWhatsappJoinStatus,
} from "@/lib/whatsapp-join-desk-db";
import { parseWhatsappJoinStatus } from "@/lib/whatsapp-join-desk";
import { requireSuperAdmin } from "@/lib/super-admin/require";

const QUEUE = "/super-admin/whatsapp-join-requests";

/** Kept for callers that still invoke the server action. The queue buttons post to the route handlers. */
export async function setWhatsappJoinStatus(formData: FormData) {
  const session = await requireSuperAdmin();
  const id = String(formData.get("id") ?? "");
  const status = parseWhatsappJoinStatus(String(formData.get("status") ?? ""));
  if (!id || !status) throw new Error("Could not update that row.");
  const saved = await applyWhatsappJoinStatus(id, status, session.email);
  if (!saved) throw new Error("That row is no longer in the list.");
  revalidatePath(QUEUE);
}

export async function recordWhatsappJoinNudge(
  id: string,
): Promise<{ ok: true; url: string } | { ok: false; message: string }> {
  await requireSuperAdmin();
  if (!id) return { ok: false, message: "Missing row." };
  const url = await applyWhatsappJoinNudge(id);
  if (!url) return { ok: false, message: "No message for this row." };
  revalidatePath(QUEUE);
  return { ok: true, url };
}

export async function saveWhatsappJoinNotes(formData: FormData) {
  await requireSuperAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Could not save that note.");
  const notes = String(formData.get("notes") ?? "");
  const saved = await applyWhatsappJoinNotes(id, notes);
  if (!saved) throw new Error("That row is no longer in the list.");
  revalidatePath(QUEUE);
}
