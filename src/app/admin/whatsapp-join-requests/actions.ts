"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb } from "@/db/client";
import { whatsappJoinVerifications } from "@/db/schema/tables";
import {
  type WhatsappJoinStatus,
  whatsappJoinWaMeUrl,
} from "@/lib/whatsapp-join";
import { trackedWhatsappCommunityInvite } from "@/lib/whatsapp-server";

const QUEUE = "/admin/whatsapp-join-requests";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Sign in required");
  }
  return session;
}

function parseStatus(raw: string): WhatsappJoinStatus | null {
  if (
    raw === "submitted" ||
    raw === "approved" ||
    raw === "declined" ||
    raw === "spam"
  ) {
    return raw;
  }
  return null;
}

export async function setWhatsappJoinStatus(formData: FormData) {
  const session = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = parseStatus(String(formData.get("status") ?? ""));
  if (!id || !status) return;

  const now = new Date();
  const actor = session.user.email ?? session.user.name ?? session.user.id ?? "admin";
  await getDb()
    .update(whatsappJoinVerifications)
    .set({
      status,
      updatedAt: now,
      approvedAt: status === "approved" ? now : null,
      approvedBy: status === "approved" ? actor.slice(0, 80) : null,
    })
    .where(eq(whatsappJoinVerifications.id, id));
  revalidatePath(QUEUE);
}

export async function recordWhatsappJoinNudge(
  id: string,
): Promise<{ ok: true; url: string } | { ok: false; message: string }> {
  await requireAdmin();
  if (!id) return { ok: false, message: "Missing row." };

  const [row] = await getDb()
    .select()
    .from(whatsappJoinVerifications)
    .where(eq(whatsappJoinVerifications.id, id))
    .limit(1);
  if (!row) return { ok: false, message: "Row not found." };

  const url = whatsappJoinWaMeUrl({
    displayName: row.displayName,
    status: row.status,
    phoneE164: row.phoneE164,
    inviteForNudge: trackedWhatsappCommunityInvite("admin-nudge", "admin"),
  });
  if (!url) return { ok: false, message: "No message for this row." };

  await getDb()
    .update(whatsappJoinVerifications)
    .set({ lastContactedAt: new Date() })
    .where(eq(whatsappJoinVerifications.id, id));
  revalidatePath(QUEUE);
  return { ok: true, url };
}
