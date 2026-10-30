ALTER TABLE "classified_listings" ADD COLUMN IF NOT EXISTS "video_url" text;
--> statement-breakpoint
ALTER TABLE "classified_phone_reveals" ADD COLUMN IF NOT EXISTS "enquirer_name" text;
