-- Email/password admin. Adds a hash column and the Auth.js user table when missing.
-- Safe to run once. Does not store a plain password.
CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text,
  "email" text NOT NULL,
  "emailVerified" timestamp,
  "image" text,
  "role" text DEFAULT 'reader' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "password_hash" text,
  CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "password_hash" text;
