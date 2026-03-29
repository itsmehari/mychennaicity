ALTER TABLE "job_postings" ADD COLUMN IF NOT EXISTS "application_url" text;--> statement-breakpoint
ALTER TABLE "job_postings" ADD COLUMN IF NOT EXISTS "published_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "employers" ADD COLUMN IF NOT EXISTS "verified" boolean DEFAULT false NOT NULL;
