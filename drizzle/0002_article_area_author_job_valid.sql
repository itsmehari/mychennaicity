ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "area_hub_slug" text;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "author_byline" text;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "author_same_as" text;--> statement-breakpoint
ALTER TABLE "job_postings" ADD COLUMN IF NOT EXISTS "valid_through" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "job_postings" ADD COLUMN IF NOT EXISTS "employment_type" text;
