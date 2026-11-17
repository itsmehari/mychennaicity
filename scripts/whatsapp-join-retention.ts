/**
 * Retention for WhatsApp join rows.
 * Declined rows older than 12 months are deleted.
 * Spam rows older than 12 months are reduced to a phone hash and reason.
 *
 * Dev:  npx tsx scripts/whatsapp-join-retention.ts
 * Live: npx tsx scripts/whatsapp-join-retention.ts --live
 * STOP: do not run --live until the owner says so.
 */

import { runWhatsappJoinRetention } from "../src/lib/whatsapp-join-retention-run";

const live = process.argv.includes("--live");

async function main() {
  if (live && !process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL missing");
  }
  const result = await runWhatsappJoinRetention();
  console.log(
    `retention ${live ? "live" : "dev"}: deleted ${result.deletedDeclined} declined; reduced ${result.reducedSpam} spam`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
