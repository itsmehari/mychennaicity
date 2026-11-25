/**
 * Apply drizzle/0020_whatsapp_join_land.sql (first_site, first_page).
 *
 * Dev:  npx tsx scripts/apply-whatsapp-0020.ts
 * Live: npx tsx scripts/apply-whatsapp-0020.ts --live
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";

const live = process.argv.includes("--live");

if (live) {
  loadEnv({ path: ".env.production.local" });
} else {
  loadEnv({ path: "secrets/database.local.env" });
  loadEnv({ path: ".env.local" });
  loadEnv({ path: ".env" });
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    live
      ? "Live: DATABASE_URL missing (.env.production.local)."
      : "DATABASE_URL missing — add to .env.local",
  );
  process.exit(1);
}

const sql = neon(url);

async function main() {
  await sql`
    ALTER TABLE "whatsapp_join_verifications"
      ADD COLUMN IF NOT EXISTS "first_site" text,
      ADD COLUMN IF NOT EXISTS "first_page" text
  `;

  const cols = await sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'whatsapp_join_verifications'
      AND column_name IN ('first_site', 'first_page')
  `;
  const names = cols.map((row) => String((row as { column_name: string }).column_name));
  const missing = ["first_site", "first_page"].filter((name) => !names.includes(name));
  console.log(
    `whatsapp 0020 ${live ? "live" : "dev"}: ${missing.length ? `MISSING ${missing.join(",")}` : "ok"}`,
  );
  if (missing.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
