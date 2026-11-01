CREATE TABLE IF NOT EXISTS "content_engagement_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_kind" text NOT NULL,
	"content_slug" text NOT NULL,
	"event_kind" text NOT NULL,
	"visitor_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "content_engagement_events_lookup_idx" ON "content_engagement_events" USING btree ("content_kind","content_slug","event_kind","created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "content_engagement_events_visitor_idx" ON "content_engagement_events" USING btree ("content_kind","content_slug","event_kind","visitor_id","created_at");
