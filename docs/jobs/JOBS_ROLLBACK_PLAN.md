# Jobs rollback

## Copy and routes

Revert the commit. Locality and category URLs that were never indexed need no redirect. If any slice URL was indexed, add a 308 from that path to `/chennai-jobs`.

## Database

`drizzle/0020_job_salary_unit_schema_eligible.sql` only adds columns. Rolling the code back first is safe: old code does not select the new columns.

To drop them after the old code is deployed:

```sql
ALTER TABLE "job_postings" DROP COLUMN IF EXISTS "salary_unit";
ALTER TABLE "job_postings" DROP COLUMN IF EXISTS "schema_eligible";
```

Do not drop the columns while the new code is still running. Draft rows created by the public form stay `draft` and are not public. Close or delete them in super-admin if you do not want them in the desk.

## Indexing API

Unset `GOOGLE_INDEXING_CLIENT_EMAIL` and `GOOGLE_INDEXING_PRIVATE_KEY`. The notify function returns without calling Google.

## 410

Removing the middleware rewrite restores the previous 404 for closed slugs. No data change.
