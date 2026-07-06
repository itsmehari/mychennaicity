CREATE TABLE IF NOT EXISTS "gold_rate_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"city_id" uuid NOT NULL,
	"rate_date" text NOT NULL,
	"rate_24k_per_gram" integer NOT NULL,
	"rate_22k_per_gram" integer NOT NULL,
	"rate_18k_per_gram" integer NOT NULL,
	"silver_per_gram" integer,
	"platinum_per_gram" integer,
	"source_name" text NOT NULL,
	"source_note" text,
	"fetched_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gold_rate_snapshots" ADD CONSTRAINT "gold_rate_snapshots_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "gold_rate_snapshots_city_date_uidx" ON "gold_rate_snapshots" USING btree ("city_id","rate_date");
