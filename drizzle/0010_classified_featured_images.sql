ALTER TABLE "classified_listings" ADD COLUMN IF NOT EXISTS "featured" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE "classified_listings" ADD COLUMN IF NOT EXISTS "image_urls" jsonb;
