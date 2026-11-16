/**
 * Retention for WhatsApp join rows.
 * Declined rows older than 12 months are deleted.
 * Spam rows older than 12 months are reduced to a phone hash and reason.
 *
 * Dev:  npx tsx scripts/whatsapp-join-retention.ts
 * Live: npx tsx scripts/whatsapp-join-retention.ts --live
 * STOP: do not run --live until the owner says so.
 */

import { createHash } from "node:crypto";
import { sql } from "drizzle-orm";
import { getDb } from "../src/db/client";

const live = process.argv.includes("--live");

async function main() {
  if (live && !process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL missing");
  }
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
  const spamRows = Array.isArray(spam) ? spam : ((spam as { rows?: { id: string; phone_e164: string; notes: string | null }[] }).rows ?? []);
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
  console.log(
    `retention ${live ? "live" : "dev"}: deleted ${declinedRows.length} declined; reduced ${spamRows.length} spam`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
