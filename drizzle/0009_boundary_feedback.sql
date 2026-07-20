CREATE TABLE IF NOT EXISTS "boundary_feedback" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "type" text NOT NULL,
  "lat" double precision NOT NULL,
  "lng" double precision NOT NULL,
  "ward_hint" text,
  "note" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
