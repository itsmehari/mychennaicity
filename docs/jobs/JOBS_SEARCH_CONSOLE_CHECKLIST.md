# Jobs Search Console checklist

Do this after the commit is deployed to `https://mychennaicity.in`. Nothing below was completed in the coding session.

1. Submit `https://mychennaicity.in/jobs-sitemap.xml` in addition to the existing sitemap. The main sitemap also includes indexable slices.
2. URL Inspection:
   - `/chennai-jobs` — indexable, H1 `Jobs in Chennai`, no `JobPosting`
   - `/chennai-jobs?area=omr` — `noindex`, canonical `/chennai-jobs`
   - `/advertise/jobs` — title `Post a job vacancy in Chennai`
   - one open job with salary, one without, one remote
   - one multi-role slug such as the cafe pre-opening notice — page can be 200, `JobPosting` absent
   - one closed slug that used to be public — HTTP 410, `noindex`, no `JobPosting`
   - one locality URL — indexable only if the live count clears 5 notices and 3 employers
3. Rich Results Test on one eligible job URL. Record the screenshot in this file. Do not claim the jobs box from a passing test alone.
4. Compare 28 days before and after on queries containing job and Chennai, split by landing page. Keep Tamil queries separate. Do not publish a rank change without that export.
5. Indexing API: add the service account in Google Cloud, enable the Indexing API, and set `GOOGLE_INDEXING_CLIENT_EMAIL` and `GOOGLE_INDEXING_PRIVATE_KEY` on Vercel. Then `npm run jobs:indexing-notify -- URL_UPDATED <slug>`. A 200 is not an indexed page. Confirm later with URL Inspection.
