ALTER TABLE "job_postings" ADD COLUMN IF NOT EXISTS "salary_unit" text;
ALTER TABLE "job_postings" ADD COLUMN IF NOT EXISTS "schema_eligible" boolean DEFAULT true NOT NULL;

-- Rollback:
-- ALTER TABLE "job_postings" DROP COLUMN IF EXISTS "salary_unit";
-- ALTER TABLE "job_postings" DROP COLUMN IF EXISTS "schema_eligible";
