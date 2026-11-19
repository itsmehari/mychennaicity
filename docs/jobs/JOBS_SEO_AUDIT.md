# Jobs SEO audit

Date: 2026-11-19. Evidence is the repository plus the columns applied to the databases this session. Rankings are not verified.

## What was already true

- Next.js server-rendered `/chennai-jobs`, `/chennai-jobs/[slug]`, `/advertise/jobs`, and `/advertise/jobs-tamil`.
- `JobPosting` only on an open detail page. Hiring organisation is `employers.name`. Salary is omitted unless both bounds exist.
- Public rows require `status = open` and a future or empty `valid_through`.
- Open jobs were already in `/sitemap.xml`. Expired slugs 404 and drop out of the sitemap.
- Preview hosts send `noindex` from middleware.
- Employer intake was WhatsApp plus the contact channel. Editors publish in super-admin.

## Gaps this work closed

- Seeker H1 did not match the title `Jobs in Chennai`.
- Employer page did not use “post a job vacancy in Chennai”.
- Area, fresher, and walk-in filters were client-only.
- Only the OMR area guide queried local jobs.
- Remote rows had no `TELECOMMUTE`.
- One poster with several roles could still emit one `JobPosting`.
- Monthly pay at or above ₹1,20,000 was labelled yearly unless an editor now sets `salary_unit`.
- Closed public URLs were 404, not 410.
- There was no draft form and no Indexing API hook.

## Still true after the change

- Filters `?area=` and `?type=` are not indexable.
- A locality or category URL is not in the sitemap until the inventory gate passes. The gate was not counted against production in this session, so those URLs may all be `noindex` until the live board has enough matches.
- Indexing API does nothing until the Google service account is added in Vercel.
- Tamil seeker queries do not have a separate hub. The employer Tamil page remains `/advertise/jobs-tamil`.
