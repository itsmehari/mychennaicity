ALTER TABLE "classified_listings" ADD COLUMN IF NOT EXISTS "contact_phone_gated" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "classified_phone_reveals" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "listing_id" uuid NOT NULL,
  "enquirer_phone" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "classified_phone_reveals"
    ADD CONSTRAINT "classified_phone_reveals_listing_id_classified_listings_id_fk"
    FOREIGN KEY ("listing_id") REFERENCES "public"."classified_listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "classified_phone_reveals_listing_phone_uidx"
  ON "classified_phone_reveals" USING btree ("listing_id","enquirer_phone");
