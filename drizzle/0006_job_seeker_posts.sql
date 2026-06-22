DO $$ BEGIN
 CREATE TYPE "public"."job_seeker_post_status" AS ENUM('draft', 'open', 'closed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_seeker_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"city_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"seeker_label" text,
	"location_label" text,
	"role_sought" text,
	"needs_accommodation" boolean DEFAULT false NOT NULL,
	"availability" text,
	"contact_phone" text,
	"contact_whatsapp" text,
	"contact_email" text,
	"status" "job_seeker_post_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_seeker_posts" ADD CONSTRAINT "job_seeker_posts_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "job_seeker_posts_city_slug_uidx" ON "job_seeker_posts" USING btree ("city_id","slug");
