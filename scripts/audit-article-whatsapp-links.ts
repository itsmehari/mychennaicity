/**
 * List published articles whose HTML body still links to chat.whatsapp.com or bare group invites.
 *
 * Dev:  npx tsx scripts/audit-article-whatsapp-links.ts
 * Live: npx tsx scripts/audit-article-whatsapp-links.ts --live
 */

import { sql } from "drizzle-orm";
import { getDb } from "../src/db/client";

const live = process.argv.includes("--live");
const patterns = [
  "chat.whatsapp.com",
  "api.whatsapp.com/send",
  "whatsapp.com/invite",
] as const;

async function main() {
  if (live && !process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL missing for --live");
  }
  const db = getDb();
  const rows = await db.execute(sql`
    SELECT slug, title, published_at
    FROM articles
    WHERE status = 'published'
      AND (
        COALESCE(report_body, '') ILIKE '%chat.whatsapp.com%'
        OR COALESCE(report_body, '') ILIKE '%api.whatsapp.com/send%'
        OR COALESCE(report_body, '') ILIKE '%whatsapp.com/invite%'
        OR COALESCE(summary, '') ILIKE '%chat.whatsapp.com%'
      )
    ORDER BY published_at DESC NULLS LAST
    LIMIT 200
  `);
  const list = Array.isArray(rows)
    ? rows
    : ((rows as { rows?: { slug?: string; title?: string; published_at?: string }[] }).rows ?? []);

  console.log(`audit ${live ? "live" : "dev"}: ${list.length} article(s) with raw WhatsApp invite patterns`);
  for (const row of list) {
    const slug = String((row as { slug?: string }).slug ?? "");
    const title = String((row as { title?: string }).title ?? "");
    console.log(`- /chennai-local-news/${slug} — ${title}`);
  }
  if (list.length) {
    console.log("Fix: point copy to /whatsapp-community/join or /chennai-whatsapp-group (never chat.whatsapp.com).");
    process.exitCode = 2;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});