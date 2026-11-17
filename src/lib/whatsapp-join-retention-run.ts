import { createHash } from "node:crypto";
import { sql } from "drizzle-orm";
import { getDb } from "@/db/client";

export type WhatsappJoinRetentionResult = {
  deletedDeclined: number;
  reducedSpam: number;
};

export async function runWhatsappJoinRetention(): Promise<WhatsappJoinRetentionResult> {
  const db = getDb();
  const declined = await db.execute(sql`
    DELETE FROM whatsapp_join_verifications
    WHERE status = 'declined'
      AND COALESCE(declined_at, updated_at) < NOW() - INTERVAL '12 months'
    RETURNING id
  `);
  const spam = await db.execute(sql`
    SELECT id, phone_e164, notes
    FROM whatsapp_join_verifications
    WHERE status = 'spam'
      AND updated_at < NOW() - INTERVAL '12 months'
  `);
  type SpamRow = { id: string; phone_e164: string; notes: string | null };
  const spamRows: SpamRow[] = Array.isArray(spam)
    ? (spam as SpamRow[])
    : (((spam as unknown as { rows?: SpamRow[] }).rows ?? []) as SpamRow[]);
  for (const row of spamRows) {
    const hash = createHash("sha256").update(row.phone_e164).digest("hex").slice(0, 16);
    await db.execute(sql`
      UPDATE whatsapp_join_verifications
      SET
        display_name = 'redacted',
        phone_raw = ${hash},
        phone_e164 = ${`hash:${hash}`},
        phone_last4 = '0000',
        intro = NULL,
        ip_hash = NULL,
        user_agent = NULL,
        notes = ${`retention: ${row.notes ?? ""}`.slice(0, 2000)}
      WHERE id = ${row.id}::uuid
    `);
  }
  const declinedRows = Array.isArray(declined)
    ? declined
    : ((declined as { rows?: unknown[] }).rows ?? []);
  return { deletedDeclined: declinedRows.length, reducedSpam: spamRows.length };
}