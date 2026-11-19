# Jobs search changelog

Date: 2026-11-19. Code is in the working tree. Production deploy of this commit is not claimed.

## Schema

- `drizzle/0020_job_salary_unit_schema_eligible.sql`
- `job_postings.salary_unit` (nullable `MONTH` or `YEAR`)
- `job_postings.schema_eligible` (boolean, default true)
- Applied with `npm run db:jobs:seo-columns` and `npm run db:jobs:seo-columns:live`. Both completed. Rollback is the two `DROP COLUMN` lines in that SQL file. Existing rows keep `schema_eligible = true` and `salary_unit` null, so pay display stays on the old threshold until an editor sets a unit.

## Pages

- `/chennai-jobs` H1 is `Jobs in Chennai`. The seeker passage is in the first screen. FAQ groups include every FAQPage question. Area and category links are in the HTML. `?area=` and `?type=` are `noindex` and canonical to the hub.
- `/advertise/jobs` title and H1 are `Post a job vacancy in Chennai`. Poster passage names free posting and hiring local staff once. Draft form inserts `status = draft`. WhatsApp remains.
- `/chennai-jobs/locations/[locality]` and `/chennai-jobs/categories/[category]` render real matches. They are self-canonical only when at least 5 open notices and 3 employers match. Otherwise `noindex` and canonical `/chennai-jobs`.
- Area guides load matching jobs for every hub that has locality patterns, not only OMR.
- A previously public closed job is rewritten to HTTP 410 with no `JobPosting`. Unknown and unpublished draft slugs stay 404.

## Schema markup

- Remote rows add `jobLocationType: TELECOMMUTE` and `applicantLocationRequirements` for India.
- Multi-role slug markers and `schema_eligible = false` omit `JobPosting`.
- Salary uses `salary_unit` when set.

## Indexing

- `/jobs-sitemap.xml` lists the hub, looking-for-work, both advertise jobs URLs, open job URLs, and indexable slices.
- `scripts/google-indexing-notify.ts` and admin publish/close call the Indexing API only when `GOOGLE_INDEXING_CLIENT_EMAIL` and `GOOGLE_INDEXING_PRIVATE_KEY` are set. Those secrets are not in the repo. No ping was sent in this session.

## Not verified

- Google Rich Results Test was not run against a live URL.
- Search Console impressions and indexing were not measured.
- Keyword volumes were not measured.
