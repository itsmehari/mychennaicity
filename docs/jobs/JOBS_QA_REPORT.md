# Jobs QA report

Date: 2026-11-19.

## Ran and passed

`npx vitest run` on:

- `src/lib/seo/job-posting-jsonld.test.ts` — address, remote `TELECOMMUTE`, omitted salary, null schema for the cafe pre-opening slug, monthly unit above ₹1,20,000
- `src/lib/jobs/job-slice.test.ts` — gate, OMR token, driver match, IT non-match, open vs closed vs draft
- `src/lib/jobs/format-compensation.test.ts` — stored MONTH override
- `src/content/aeo/jobs-events-passages.test.ts` — poster passage contains the free-posting and hire-local phrases and the same strings reach FAQ and `llms.txt`
- `src/domains/jobs/public-open.test.ts`

19 tests passed.

`npx tsc --noEmit` still reports older errors in `src/ads/select-creative.test.ts`, `src/lib/env.test.ts`, and `src/lib/seo/article-rich-snippets.test.ts`. None of those paths are in this jobs change. The jobs files did not appear in the filtered error list after middleware was made async.

Schema SQL `db:jobs:seo-columns` and `db:jobs:seo-columns:live` both printed “columns ready.”

## Local server, 2026-11-19

Against `next dev` on the local database:

- `/chennai-jobs` returned 200, H1 `Jobs in Chennai`, canonical `https://mychennaicity.in/chennai-jobs`, no `JobPosting`.
- `/chennai-jobs?area=omr` returned 200, `noindex, follow`, canonical still the hub.
- `/advertise/jobs` title and H1 were `Post a job vacancy in Chennai`. The draft form was filled and submitted. The page said the notice was received as a draft. The row was `status = draft` and was deleted afterwards, along with the throwaway employer.
- `/chennai-jobs/locations/omr` and `/chennai-jobs/categories/walk-in` were `noindex` because the local inventory did not clear 5 notices and 3 employers. `/jobs-sitemap.xml` listed 43 URLs and no `?area=` links and no location URLs.
- `/chennai-jobs/iti-diploma-ro-water-purifier-technician-aquastar-porur` included `JobPosting` with hiring organisation AquaStar.
- The Bajaj work-from-home listing included `TELECOMMUTE`.
- `/chennai-jobs/office-manager-parrys-kilpauk-advocate-chennai` returned 410. An unknown slug returned 404.
- `/areas/saidapet-guindy-alandur` rendered “Jobs in this area”, a link to `/chennai-jobs/locations/guindy`, and “Post a local job”.

## Not run

- Google Rich Results Test on a live URL
- Search Console URL Inspection
- A full `next build`
- Production HTTP 410 on `https://mychennaicity.in` (this code is not deployed yet)

## Expected failures if the columns are missing

Any page that selects `job_postings` will error until `0020` is applied. Both databases used by the npm scripts were altered in this session.
