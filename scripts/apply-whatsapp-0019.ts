/**
 * Apply drizzle/0019_whatsapp_join_attribution.sql (additive columns + waitlist enum).
 *
 * Dev:  npx tsx scripts/apply-whatsapp-0019.ts
 * Live: npx tsx scripts/apply-whatsapp-0019.ts --live
 *       (uses .env.production.local — same host as Vercel)
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
      ADD COLUMN IF NOT EXISTS "placement" text,
      ADD COLUMN IF NOT EXISTS "partner_code" text,
      ADD COLUMN IF NOT EXISTS "lang" text,
      ADD COLUMN IF NOT EXISTS "utm_source" text,
      ADD COLUMN IF NOT EXISTS "utm_medium" text,
      ADD COLUMN IF NOT EXISTS "utm_campaign" text,
      ADD COLUMN IF NOT EXISTS "first_source" text,
      ADD COLUMN IF NOT EXISTS "verified_at" timestamp with time zone,
      ADD COLUMN IF NOT EXISTS "declined_at" timestamp with time zone
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS "whatsapp_join_verifications_first_source_status_idx"
      ON "whatsapp_join_verifications" ("first_source", "status")
  `;
  try {
    await sql`ALTER TYPE "whatsapp_join_status" ADD VALUE IF NOT EXISTS 'waitlist'`;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!/already exists|duplicate/i.test(message)) {
      throw err;
    }
  }

  const cols = await sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'whatsapp_join_verifications'
    ORDER BY ordinal_position
  `;
  const names = cols.map((row) => String((row as { column_name: string }).column_name));
  const needed = [
    "placement",
    "partner_code",
    "lang",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "first_source",
    "verified_at",
    "declined_at",
  ];
  const missing = needed.filter((name) => !names.includes(name));
  console.log(
    `whatsapp 0019 ${live ? "live" : "dev"}: columns ${names.length}; extras ${
      missing.length ? `MISSING ${missing.join(",")}` : "ok"
    }`,
  );
  if (missing.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
