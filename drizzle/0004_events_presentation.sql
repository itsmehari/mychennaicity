ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "presentation_key" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "content_ref" text;
