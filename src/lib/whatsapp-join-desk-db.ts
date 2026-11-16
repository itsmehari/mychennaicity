import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { whatsappJoinVerifications } from "@/db/schema/tables";
import {
  whatsappJoinNudgeEligible,
  whatsappJoinWaMeUrl,
  type WhatsappJoinStatus,
} from "@/lib/whatsapp-join";
import {
  WA_NUDGE_DAILY_CAP,
  whatsappApprovalHours,
} from "@/lib/whatsapp-community-flags";
import {
  clearWhatsappJoinDeclinedAt,
  stampWhatsappJoinDeclinedAt,
} from "@/lib/whatsapp-join-attribution";

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
  if (rows.length === 0) return false;
  if (status === "declined" || status === "spam") {
    await stampWhatsappJoinDeclinedAt(id);
  }
  if (status === "submitted" || status === "approved") {
    await clearWhatsappJoinDeclinedAt(id);
  }
  return true;
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
  if (
    !whatsappJoinNudgeEligible({
      status: row.status,
      lastContactedAt: row.lastContactedAt,
      createdAt: row.createdAt,
      approvalHours: whatsappApprovalHours(),
    })
  ) {
    return null;
  }
  const today = await todaysWhatsappNudgeCount();
  if (today >= WA_NUDGE_DAILY_CAP) return null;
  const url = whatsappJoinWaMeUrl({
    displayName: row.displayName,
    status: row.status,
    phoneE164: row.phoneE164,
    locality: row.locality,
  });
  if (!url) return null;
  await getDb()
    .update(whatsappJoinVerifications)
    .set({ lastContactedAt: new Date() })
    .where(eq(whatsappJoinVerifications.id, id));
  return url;
}

export async function todaysWhatsappNudgeCount(): Promise<number> {
  try {
    const raw = await getDb().execute(sql`
      SELECT COUNT(*)::int AS n
      FROM whatsapp_join_verifications
      WHERE last_contacted_at >= (NOW() AT TIME ZONE 'Asia/Kolkata')::date
        AT TIME ZONE 'Asia/Kolkata'
    `);
    const rows = Array.isArray(raw) ? raw : ((raw as { rows?: { n?: number }[] }).rows ?? []);
    return Number(rows[0]?.n ?? 0);
  } catch {
    return 0;
  }
}
