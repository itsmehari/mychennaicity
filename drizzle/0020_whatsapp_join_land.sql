-- First site and first page on a WhatsApp join row.
-- Additive only. Safe to run more than once.
-- first_site is the first mychennaicity.in URL in the visit.
-- first_page is the join path and query that posted the form.
-- Older rows stay blank. A later submit fills a blank, and does not replace a value.

ALTER TABLE "whatsapp_join_verifications"
  ADD COLUMN IF NOT EXISTS "first_site" text,
  ADD COLUMN IF NOT EXISTS "first_page" text;
