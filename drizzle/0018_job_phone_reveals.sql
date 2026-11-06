CREATE TABLE IF NOT EXISTS "job_phone_reveals" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "job_id" uuid NOT NULL,
  "enquirer_phone" text NOT NULL,
  "followed_up_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
  ALTER TABLE "job_phone_reveals"
    ADD CONSTRAINT "job_phone_reveals_job_id_job_postings_id_fk"
    FOREIGN KEY ("job_id") REFERENCES "job_postings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "job_phone_reveals_job_phone_uidx"
  ON "job_phone_reveals" USING btree ("job_id", "enquirer_phone");

CREATE TABLE IF NOT EXISTS "job_seeker_phone_reveals" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "job_seeker_post_id" uuid NOT NULL,
  "enquirer_phone" text NOT NULL,
  "followed_up_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
  ALTER TABLE "job_seeker_phone_reveals"
    ADD CONSTRAINT "job_seeker_phone_reveals_post_id_job_seeker_posts_id_fk"
    FOREIGN KEY ("job_seeker_post_id") REFERENCES "job_seeker_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "job_seeker_phone_reveals_post_phone_uidx"
  ON "job_seeker_phone_reveals" USING btree ("job_seeker_post_id", "enquirer_phone");
