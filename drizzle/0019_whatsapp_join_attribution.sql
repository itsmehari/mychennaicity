-- WhatsApp join attribution, waitlist, and operator timestamps.
-- Additive only. Safe to run more than once.
-- Neon / Postgres (this site). phpMyAdmin is not used here.
-- STOP: do not apply to production until the owner says so.
--
-- After apply: redeploy Vercel so the join form and queue can write the new columns.
-- If this file is skipped, join still saves on the original columns (code try/catches extras).

ALTER TABLE "whatsapp_join_verifications"
  ADD COLUMN IF NOT EXISTS "placement" text,
  ADD COLUMN IF NOT EXISTS "partner_code" text,
  ADD COLUMN IF NOT EXISTS "lang" text,
  ADD COLUMN IF NOT EXISTS "utm_source" text,
  ADD COLUMN IF NOT EXISTS "utm_medium" text,
  ADD COLUMN IF NOT EXISTS "utm_campaign" text,
  ADD COLUMN IF NOT EXISTS "first_source" text,
  ADD COLUMN IF NOT EXISTS "verified_at" timestamp with time zone,
  ADD COLUMN IF NOT EXISTS "declined_at" timestamp with time zone;

CREATE INDEX IF NOT EXISTS "whatsapp_join_verifications_first_source_status_idx"
  ON "whatsapp_join_verifications" ("first_source", "status");

DO $$ BEGIN
  ALTER TYPE "whatsapp_join_status" ADD VALUE IF NOT EXISTS 'waitlist';
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN others THEN NULL;
END $$;

-- Pending lookup by last 4 (admin fallback if the queue page 500s):
--   SELECT display_name, phone_e164, phone_last4, locality, intent, status, source, created_at
--   FROM whatsapp_join_verifications
--   WHERE phone_last4 = '3210' AND status = 'submitted'
--   ORDER BY created_at DESC;

-- If CREATE/ALTER failed: the public form still inserts the original columns from
-- drizzle/0013_whatsapp_join_verifications.sql. Re-run this file, then reload /super-admin.
