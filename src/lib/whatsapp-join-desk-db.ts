import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { whatsappJoinVerifications } from "@/db/schema/tables";
import { whatsappJoinWaMeUrl, type WhatsappJoinStatus } from "@/lib/whatsapp-join";
import { trackedWhatsappCommunityInvite } from "@/lib/whatsapp-server";

export async function applyWhatsappJoinStatus(
  id: string,
  status: WhatsappJoinStatus,
  actorEmail: string,
): Promise<boolean> {
  const now = new Date();
  const rows = await getDb()
    .update(whatsappJoinVerifications)
    .set({
      status,
      updatedAt: now,
      approvedAt: status === "approved" ? now : null,
      approvedBy: status === "approved" ? actorEmail.slice(0, 80) : null,
    })
    .where(eq(whatsappJoinVerifications.id, id))
    .returning({ id: whatsappJoinVerifications.id });
  return rows.length > 0;
}

export async function applyWhatsappJoinNotes(id: string, notes: string): Promise<boolean> {
  const rows = await getDb()
    .update(whatsappJoinVerifications)
    .set({
      notes: notes.trim().slice(0, 2000) || null,
      updatedAt: new Date(),
    })
    .where(eq(whatsappJoinVerifications.id, id))
    .returning({ id: whatsappJoinVerifications.id });
  return rows.length > 0;
}

/** Stamps last-contacted and returns the wa.me URL, or null when this row must not be messaged. */
export async function applyWhatsappJoinNudge(id: string): Promise<string | null> {
  const [row] = await getDb()
    .select()
    .from(whatsappJoinVerifications)
    .where(eq(whatsappJoinVerifications.id, id))
    .limit(1);
  if (!row) return null;
  const url = whatsappJoinWaMeUrl({
    displayName: row.displayName,
    status: row.status,
    phoneE164: row.phoneE164,
    inviteForNudge: trackedWhatsappCommunityInvite("admin-nudge", "admin"),
  });
  if (!url) return null;
  await getDb()
    .update(whatsappJoinVerifications)
    .set({ lastContactedAt: new Date() })
    .where(eq(whatsappJoinVerifications.id, id));
  return url;
}
