# mychennaicity.in — product features (inventory)

**Scope:** This list reflects the **Next.js app** in this repository (`src/app`, shared components, and related libs) as of the current codebase. The live site brand and canonical URL are **mychennaicity.in** (`NEXT_PUBLIC_SITE_URL`). If you also use **chennaicity.in** as a domain alias, behaviour should match once DNS and env point here.

**Implementation note:** Several verticals still use **curated mock data** in `src/lib/home-mock.ts` while the database and APIs are wired up. Where that matters, it is called out below.

---

## 1. Public pages and hubs

| Area | Route(s) | What it does today |
|------|----------|-------------------|
| **Home** | `/` | City positioning, “explore Chennai” map/bento, stat ribbon (includes jobs signal), jobs spotlight, events spotlight, peer listings preview, zone shortcuts, sponsors/trending (mock-backed sections as documented in code). |
| **Chennai local news — hub** | `/chennai-local-news` | Newspaper-style listing; loads **published articles from Neon** when `DATABASE_URL` is available, otherwise falls back to mock articles. Dynamic rendering to avoid empty builds without DB at deploy time. |
| **Article detail** | `/chennai-local-news/[slug]` | Single story page with metadata and layout from the news domain. |
| **Topic desks** | `/chennai-local-news/topic/[topic]` | Topic-filtered news views driven by `TOPIC_SLUG_TO_CATEGORY` / DB topic keys. |
| **RSS** | `/chennai-local-news/feed.xml` | XML feed for the news hub. |
| **Legacy news path** | `/news` | **301** to `/chennai-local-news`. |
| **Chennai local events** | `/chennai-local-events` | Curated **mock** event cards (external links); copy asks users to confirm on organiser sites. |
| **Jobs** | `/jobs` | Curated **mock** job list; many rows link out to **employer career sites**; on-site apply described as “soon”. |
| **Directory** | `/directory` | Vertical tiles (schools, hospitals, food, etc.) and sample **mock** listings; trust strip; cross-links to area explorer. |
| **Area (macro) pages** | `/areas/[slug]` | Greater Chennai zone hubs: blurb, deep links toward news, jobs, directory (filters “will arrive” with listings API per page copy). |

---

## 2. Site chrome and navigation

- **Alert bar** — Top-of-site notice with CTA (configurable message in `alert-bar.tsx`).
- **Header** — Mega navigation: News (hub, RSS, topics), Explore (directory, area anchor), Jobs, Local events, Areas (zone grid).
- **Footer** — Standard site footer links and positioning.
- **Interior chrome** — Breadcrumbs, cross-navigation between major hubs (`interior-chrome.tsx`).
- **Typography / layout** — Geist fonts, responsive layout, 1280px-aligned max width patterns on key sections.

---

## 3. Discovery, SEO, and measurement

- **Sitemap** — `sitemap.ts`: home, news hub, events, jobs, directory, all area pages, article URLs, topic URLs (articles/topics require DB).
- **Robots** — `robots.ts` policy for crawlers.
- **Metadata** — Page titles, descriptions, Open Graph, canonical URLs where implemented.
- **Analytics** — Optional **GA4** (`NEXT_PUBLIC_GA_MEASUREMENT_ID`), **Vercel Analytics**, **Vercel Speed Insights** (`SiteAnalytics`).

---

## 4. Admin and authentication

- **Admin shell** | `/admin` | Session-aware placeholder: sign-in link, user email/name, role display, sign-out (Auth.js v5).
- **Auth API** | `/api/auth/[...nextauth]` | NextAuth route handler.
- **Middleware** | `/admin/*` | Redirects unauthenticated visitors to sign-in with `callbackUrl`.

---

## 5. Data and backend (supporting features)

- **Neon + Drizzle** — Articles (and related news queries) when `DATABASE_URL` is set; seeds/scripts for content exist under `scripts/`.
- **CI** — GitHub Actions workflow for checks (see repo `.github/workflows`).

---

## 6. On the roadmap (called out in product copy, not fully built here)

From jobs page and roadmap docs:

- Jobs: **saved searches**, **email alerts**, **authenticated listings in DB**, **apply on-site**.
- Directory / listings: **unified listings API**, area-scoped filters, verified detail pages.
- Events: **DB-backed calendar**, submission + moderation (per `docs/EXECUTION_ROADMAP.md`).
- Trust: **editorial standards & corrections** page (“publishing soon” on home trust strip).

---

# Service design blueprint — Jobs (employers ↔ job seekers)

**Strategy:** Digital service delivery for **connecting people who hire** and **people who want to work** in Greater Chennai, aligned with a classic **service blueprint** (journey stages × front/back stage × support).

**Line of interaction:** Separates what the **customer** (job seeker or employer) does from what the **organisation** (mychennaicity.in) does visibly or in the back office.

**Current state vs target:** Today the product behaves as an **editorial shortlist + outbound links**. The blueprint below describes the **intended end-to-end service** once listings, auth, and applications exist—so you can implement and staff against it.

---

## Journey stages (horizontal)

1. **Awareness** — Noticing Chennai-relevant hiring or the platform.
2. **Consideration** — Comparing fit, trust, and effort to apply or post.
3. **Action** — Posting a role, applying, screening, interviewing (core value exchange).
4. **Retention** — Repeat use (new roles, alerts, hiring success).
5. **Advocacy** — Referring others (candidates or employers).

---

## Layer definitions (vertical)

| Layer | Meaning |
|-------|--------|
| **Experience models** | Mindset / emotions for each side. |
| **Physical / digital evidence** | Touchpoints: pages, email, forms, ATS, phone, brand assets. |
| **User actions** | What the job seeker or employer does (above the line of interaction). |
| **Front-of-stage** | Visible service: UI, confirmations, support replies, editorial curation surfaced as product. |
| **Back-of-stage** | Internal ops: moderation, data entry, employer verification, copy updates. |
| **Support processes** | Systems & teams: CMS/DB, email/CRM, legal, infra, analytics. |

---

## A. Job seeker (employee) blueprint

| Layer | Awareness | Consideration | Action | Retention | Advocacy |
|-------|------------|---------------|--------|-----------|----------|
| **Experience** | Curious / scanning the market | Evaluating trust & relevance | Hopeful, time-pressed | Habitual (“check Chennai pulse”) | Proud / helpful |
| **Evidence** | Social posts, search results, news cross-links (`/jobs`, Economy topic) | Job list UI, company names, salary/location cues, employer domains | Application form or external ATS, email receipts, saved-search UI (future) | Alert emails, “new matches” digest | Share link, referral message |
| **User actions** | Lands from home spotlight, nav, or Google | Reads cards, filters by area/role, opens employer site | Submits application or profile; answers recruiter follow-up | Toggles alerts; returns for new postings | Shares job or site with peers |
| **Front-of-stage** | Editorial framing (“how we pick”), clear outbound-link labelling | FAQ on verifying URLs, location/hybrid notes | Confirmation screens, status messaging (when on-platform) | Preference centre for alerts | Testimonial prompts (optional) |
| **Back-of-stage** | Editorial selection of featured roles | Normalise listing quality; hide stale jobs | Route applications to employer workflow; spam checks | Refresh curated picks; tune alert rules | Capture success stories with consent |
| **Support** | Marketing / SEO, analytics | Taxonomy (role, area), DB schema for jobs | Integrations (ATS links, webhooks TBD), rate limits | Email provider, queue workers | Brand/legal for quotes |

---

## B. Employer blueprint

| Layer | Awareness | Consideration | Action | Retention | Advocacy |
|-------|------------|---------------|--------|-----------|----------|
| **Experience** | Opportunistic / recruiting under pressure | Weighing cost, reach, and admin effort | Busy; needs qualified pipeline | Wants reliable channel for next reqs | Will refer other hiring managers |
| **Evidence** | Inbound email, sales one-pager, newsroom adjacency | “Post a job” flow, pricing/help, brand guidelines | Employer dashboard, applicant list or export, invoices (if paid) | Performance report (views, clicks, applies) | Logo on partner strip, case study |
| **User actions** | Hears about Chennai audience on platform | Compares to other boards; reads T&Cs | Creates listing, pays (if any), responds to candidates | Reposts roles, upgrades bump | Refers another company |
| **Front-of-stage** | Clear value prop on `/jobs` and hire CTA | Onboarding tips, verification steps | Published listing with consistent formatting | Check-in on listing health | Co-marketing where agreed |
| **Back-of-stage** | Lead logging | KYC / company verification, fraud checks | Moderate copy; enforce salary clarity & EEO guidance | Account management touchpoints | Collect NPS / referral |
| **Support** | CRM, ad ops | Legal (terms), payments (if any) | Admin tools, audit trail | Data warehouse / dashboards | Partner programme |

---

## C. Key intersections (both sides at “Action”)

- **Single source of truth:** Job record in DB (title, location, employer, apply URL or in-app apply, expiry).
- **Trust chain:** User verifies employer domain; platform verifies publisher identity for posted roles.
- **Metrics:** Views, click-outs, on-site applies, time-to-fill (employer-reported optional).
- **Governance:** Moderation queue, appeals, takedowns for fraud or misrepresentation.

---

## D. How this maps to today’s codebase

| Blueprint part | Today (`/jobs`) | Next implementation step |
|----------------|-----------------|---------------------------|
| Evidence | Static page + mock rows in `home-mock.ts` | Replace with DB-driven list + detail `/jobs/[slug]` |
| User (seeker) | Click through to external careers pages | Optional native apply + application store |
| User (employer) | Copy points to news topics for “submission openings” | Employer auth + post flow + admin moderation |
| Support | Same stack as rest of site (Vercel, Neon) | Jobs tables, email for alerts, rate limits |

---

*This document is maintained for product and engineering alignment; update the inventory when new routes or behaviours ship.*
