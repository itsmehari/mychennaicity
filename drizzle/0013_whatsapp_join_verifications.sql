-- WhatsApp community join gate. Safe to run once: enum, table, column, and indexes
-- are created only when missing. Join rows stay out of articles.
DO $$ BEGIN
  CREATE TYPE "whatsapp_join_status" AS ENUM ('submitted', 'approved', 'declined', 'spam');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "whatsapp_join_verifications" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "display_name" text NOT NULL,
  "phone_raw" text NOT NULL,
  "phone_e164" text NOT NULL,
  "phone_last4" text NOT NULL,
  "locality" text NOT NULL,
  "intent" text NOT NULL,
  "intro" text,
  "status" "whatsapp_join_status" DEFAULT 'submitted' NOT NULL,
  "source" text,
  "ip_hash" text,
  "user_agent" text,
  "notes" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "approved_at" timestamp with time zone,
  "approved_by" text,
  "last_contacted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "whatsapp_join_verifications"
  ADD COLUMN IF NOT EXISTS "last_contacted_at" timestamp with time zone;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "whatsapp_join_verifications_phone_uidx"
  ON "whatsapp_join_verifications" ("phone_e164");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "whatsapp_join_verifications_last4_idx"
  ON "whatsapp_join_verifications" ("phone_last4");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "whatsapp_join_verifications_status_created_idx"
  ON "whatsapp_join_verifications" ("status", "created_at");
