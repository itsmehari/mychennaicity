# AdSense content and user experience audit

Page-wise check of **mychennaicity.in** against Google’s AdSense help article [Make sure your site's pages are ready for AdSense](https://support.google.com/adsense/answer/7299563) (unique content, no duplicate/scraped pages, navigation that works, no thin or missing pages).

**Date:** 4 September 2026  
**Canonical site:** https://mychennaicity.in  
**Companion ops runbook:** [ADSENSE_PRE_FLIGHT.md](ADSENSE_PRE_FLIGHT.md)

Reviewers look at the **live site**. Live status is called out separately from what is still only in the repo.

**P0–P2 code (4 Sep 2026, this deploy):** footer/nav, ads deny-list, civic preview `noindex`, cabinet sitemap = hubs + IAS (ministers off sitemap / `noindex`), three custom area packs, IAS copy, gold-history, salary trust blocks, glossary +8, WhatsApp/quiz/education/topic empty. See [adsense-content-ux-gaps.plan.md](../.cursor/plans/adsense-content-ux-gaps.plan.md).

---

## Bottom line

The live site already has a real Chennai identity (news, jobs, events, area guides, civic tools, bilingual pages). Legal pages, `ads.txt`, and the AdSense meta tag are in place.

The main review risks are:

- Thin or empty civic pages
- Templated area hubs (and, in the repo, 70 minister template pages)
- Footer links that do not match their labels
- Education + cabinet desks that **404 on production**

---

## How this maps to Google’s four points

| Google ask | Site status |
| --- | --- |
| **Enough unique content** | Strong on news, area hubs, long guides, jobs/events listings. Weak on empty civic trackers, quizzes, calculators with little editorial, and (in the repo) 70 minister template pages. |
| **No duplicate / scraped content** | Original editorial + tools, not a scrape farm. Risks: templated area FAQs, EN/TA twins (OK if `hreflang` is correct), repeated disclaimer/fine print, gold hub vs history overlap, WhatsApp cluster overlap. |
| **Navigation + UX** | Mega-nav and breadcrumbs work. Footer has **inaccurate labels** (several tags point at the same URL). Auto-modals are off by default (good). |
| **Submit for review** | Operational pieces (`/privacy`, `/cookies`, `/terms`, `/ads.txt`) are live. Do **not** turn on first-visit interstitials. Do **not** put AdSense units on legal, search, empty, or form-only pages. |

Live sitemap (4 Sep 2026): **294 URLs**. TN Plus Two and Council of Ministers are **not** in that live sitemap (they 404 on production). They **are** in the repo and **will** appear in sitemap after the next deploy — that is a review risk if you ship them as-is.

---

## Legend

| Verdict | Meaning |
| --- | --- |
| **Ready** | Unique enough and navigable |
| **Watch** | Could look thin or similar to a reviewer |
| **Fix** | Thin, duplicate-pattern, missing, or misleading — address before review |

Word counts below are **rendered page text** (including nav/footer chrome). Unique body copy is shorter.

---

## Site-wide (every page)

### Ready

- Header mega-nav: News, Explore, Jobs, Events, Areas — clickable, aligned, topic-grouped.
- Breadcrumbs on interior pages.
- Mobile + desktop nav exist.
- Legal footer: Privacy, Terms, Cookies, Community guidelines.
- `ads.txt` live: `google.com, pub-5760699639501978, DIRECT, f08c47fec0942fa0`.
- Auto campaign/newsletter modals default **off** (`NEXT_PUBLIC_SITE_MODAL_AUTO`).
- Partner ads skipped on `/privacy`, `/terms`, `/cookies`, `/contact`, `/about`, `/glossary`.
- `/search` is `noindex`. `/news` 308s to `/chennai-local-news` (works; extra hop).
- Tamil twins use `hreflang` (language variants, not scraped clones).

### Fix before review

- Footer **News**: “Editor’s picks” goes to the same hub as “Chennai local news”.
- Footer **tags**: “GCC”, “Monsoon”, and “Marina” all go to `/chennai-local-news/topic/chennai`. “Startups” and “Remote” both go to jobs. That is **inaccurate navigation** (Google’s list: links that lead to irrelevant/misleading pages).
- Footer **Company**: “Advertise” and “Careers” both go to `/contact`.
- Mega-nav “News index” → `/news` → redirect. Link straight to `/chennai-local-news`.
- Same Disclaimer + AI fine print on every guide is short (not a long copyright dump). Fine. Do not lengthen it on every page.
- **Do not deploy** the 35+35 minister pages until each one has more original Chennai copy, or keep them out of sitemap / `noindex` until they do.

---

## Home and chrome

| Page | Unique content | Duplicate / thin | Nav / UX | Verdict |
| --- | --- | --- | --- | --- |
| `/` | Home ~2,600+ words of rendered text; news, areas, tools | Shared chrome, not scraped | Mega-nav works | **Ready** |
| `/search` | Query UI | Thin by nature | `noindex` | **Ready** (keep ads off) |
| `/news` | Redirect only | — | 308 to news hub | **Watch** (link directly) |

---

## News (best AdSense inventory)

| Page | Unique content | Duplicate / thin | Nav / UX | Verdict |
| --- | --- | --- | --- | --- |
| `/chennai-local-news` | Hub ~3,100 words; living feed | Listing chrome | Topics in nav | **Ready** — best review landing |
| `/chennai-local-news/[slug]` | Full reports + disclaimer + AI fine print | Not scrape-copies if seeds stay original | TOC, breadcrumbs | **Ready** |
| `/chennai-local-news/topic/politics` | Filtered list | Thin if topic has few stories | Accurate | **Watch** if empty |
| `/chennai-local-news/topic/chennai` | Same | Same | Footer misuses this URL for “Monsoon” / “Marina” | **Watch** |
| `/chennai-local-news/topic/elections` | Same | Same | Accurate | **Watch** |
| `/chennai-local-news/topic/economy` | Same | Same | Accurate | **Watch** |
| `/chennai-local-news/topic/consumer` | Same | Same | Accurate | **Watch** |
| `/chennai-local-news/topic/mobility` | Live 200 | Same | Accurate | **Watch** |
| `/chennai-local-news/feed.xml` | Machine feed | Not a content page | In sitemap | **Watch** (no ads) |

---

## Areas (templated, but not empty)

10 macro hubs. OMR has a hand-written pack; the other nine are generated from the same FAQ/map-blurb pattern with the zone name swapped. Live sample `/areas/madhavaram-madhavaram` is ~1,700 words (locality cards help).

| Page | Unique content | Duplicate / thin | Nav / UX | Verdict |
| --- | --- | --- | --- | --- |
| `/areas` | Index of hubs | Short | Map + list | **Ready** |
| `/areas/tiruvottiyur-manali-belt` | Highlights + localities | Shared FAQ template | Nav Areas column | **Watch** |
| `/areas/madhavaram-madhavaram` | Same | Same | Same | **Watch** |
| `/areas/royapuram-tondiarpet` | Same | Same | Same | **Watch** |
| `/areas/ambattur-annanagar` | Same | Same | Same | **Watch** |
| `/areas/teynampet-nungambakkam` | Same | Same | Same | **Watch** |
| `/areas/kodambakkam-t-nagar` | Same | Same | Same | **Watch** |
| `/areas/saidapet-guindy-alandur` | Same | Same | Same | **Watch** |
| `/areas/adyar-thiruvanmiyur` | Same | Same | Same | **Watch** |
| `/areas/omr-perungudi-sholinganallur` | Custom hub copy | Least templated | Same | **Ready** |
| `/areas/valasaravakkam-porur` | Generated | Shared FAQ template | Same | **Watch** |
| `/chennai-map` | Interactive ward map | Tool + chrome | Featured in Areas nav | **Ready** |

Google’s note: “If you have many pages that are similar… expand each page or consolidate.” These 10 hubs are the closest thing to **doorway pages**. Expand 2–3 more like OMR, or keep them as map+news indexes and do not run AdSense on them.

---

## Jobs, classifieds, directory, events

Listing pages are unique **when rows exist**. Empty detail pages would be thin.

| Page | Unique content | Duplicate / thin | Nav / UX | Verdict |
| --- | --- | --- | --- | --- |
| `/chennai-jobs` | Hub + listings | Shared safety copy | Jobs mega-nav | **Ready** |
| `/chennai-jobs/[slug]` | Per-job body | Thin if body is a stub | Breadcrumbs | **Ready** if listings are real |
| `/chennai-jobs/looking-for-work` | Candidate notices | Same | Accurate | **Ready** |
| `/chennai-jobs/looking-for-work/[slug]` | Per-seeker | Thin stubs | Accurate | **Watch** |
| `/chennai-classifieds` | Hub | Same | Explore nav | **Ready** |
| `/chennai-classifieds/[slug]` | Per listing | Thin ads | Accurate | **Watch** (UGC; ads only if body is substantial) |
| `/directory` | Hub | Same | Explore featured | **Ready** |
| `/directory/[type]/[slug]` | Per entry | Thin if summary-only | Accurate | **Watch** |
| `/chennai-local-events` | Calendar hub | Same | Events mega-nav | **Ready** |
| `/chennai-local-events/[slug]` | Per event | Thin if date+venue only | Accurate | **Ready** if writeups exist |
| `/chennai-local-events/submit` | Form | Little editorial | Accurate | **Fix** — no Google ads on a form |

---

## Civic tools (biggest thin-content risk on the live site)

Hub copy still says “ten civic tools”; there are more than ten. `/civic-tools/area-sabha` is live but **`AREA_SABHA_MEETINGS` is an empty array** (~555 words including nav/footer). That matches Google’s “pages with little to no content.”

| Page | Unique content | Duplicate / thin | Nav / UX | Verdict |
| --- | --- | --- | --- | --- |
| `/civic-tools` | Tool index | Hub chrome | Explore → Civic tools | **Ready** (fix “ten tools” copy) |
| `/civic-tools/zone-ward-finder` | Interactive lookup | Tool + notes | In mega-nav | **Ready** |
| `/civic-tools/zone-map` | Map | Tool | Accurate | **Ready** |
| `/civic-tools/ward-migration` | Migration data | Thin if few rows | Accurate | **Watch** |
| `/civic-tools/responsibility-router` | Complaint routing | Tool | Accurate | **Ready** |
| `/civic-tools/zonal-office-access` | Office finder | Tool | Accurate | **Ready** |
| `/civic-tools/zone-dashboard` | Metrics UI | Empty/estimated cells | Accurate | **Watch** |
| `/civic-tools/reorg-tracker` | Tracker | Thin until GOs ingested | Accurate | **Watch** |
| `/civic-tools/civic-card` | Printable card | Utility, little article | Accurate | **Watch** |
| `/civic-tools/area-sabha` | Empty state only | **Little to no content** | Promises meetings/minutes | **Fix** — noindex or fill, no ads |
| `/civic-tools/boundary-feedback` | Report map | Form-like | Accurate | **Watch** |
| `/civic-tools/address-form-fixer` | Ward vs pincode | Tool + FAQ | Accurate | **Ready** |
| `/civic-tools/streetlight-dead-spots` | Editorial map | Tool | Accurate | **Ready** |
| `/civic-tools/power-feeder-desk` | Feeder vs streetlight | Tool + helpline | In mega-nav | **Ready** |
| `/civic-tools/metro-water-schedule` | Supply-day desk | Tool, not live valves (disclosed) | In mega-nav | **Ready** |
| `/civic-tools/flood-street-score` | Street scores | Original editorial | In mega-nav | **Ready** |

---

## Daily / money / culture guides (live)

Calculators and quizzes need **enough original explanation** around the widget. Tamil twins are translations with `hreflang` — allowed, not “duplicate scraped content.”

| Page | Unique content | Duplicate / thin | Nav / UX | Verdict |
| --- | --- | --- | --- | --- |
| `/chennai-today` | Daily card + FAQ | Aggregates other desks | Explore nav | **Ready** (keep updating) |
| `/chennai-today-tamil` | Tamil twin | Same facts, different language | Toggle | **Ready** |
| `/chennai-gold-rate` | Daily rates + calc | Original desk | Explore nav | **Ready** |
| `/chennai-gold-rate/history` | Chart + table | Overlaps hub numbers | Linked from hub | **Watch** — add distinct commentary |
| `/guides/buying-gold-in-chennai` | Guide | Original | Linked | **Ready** |
| `/guides/chennai-salary-guide-2026` | ~1,100 words | A bit short for a “guide” | Jobs nav | **Watch** — expand |
| `/guides/chennai-petrol-vs-ev-cost` | Calc + copy | Money disclaimer repeated | Accurate | **Ready** |
| `/guides/chennai-petrol-vs-ev-cost-tamil` | Tamil twin | Translation | Toggle | **Ready** |
| `/guides/chennai-ac-bill-predictor` | Calc | Same | Accurate | **Ready** |
| `/guides/chennai-ac-bill-predictor-tamil` | Tamil twin | Translation | Toggle | **Ready** |
| `/guides/chennai-afford-area-calculator` | Calc | Same | Jobs nav | **Ready** |
| `/guides/chennai-afford-area-calculator-tamil` | Tamil twin | Translation | Toggle | **Ready** |
| `/guides/which-chennai-are-you` | Quiz + FAQ (~1,000 words) | Playful, not deep | Explore nav | **Watch** |
| `/guides/which-chennai-are-you-tamil` | Tamil twin | Translation | Toggle | **Watch** |
| `/guides/chennai-area-rivalries` | Cards | Culture desk | Related links | **Ready** |
| `/guides/moved-to-chennai-checklist` | Checklist | Original | Accurate | **Ready** |
| `/guides/chennai-pg-flatmate-red-flags` | Signals | Original | Accurate | **Ready** |
| `/guides/chennai-pg-flatmate-red-flags-tamil` | Tamil twin | Translation | Toggle | **Ready** |
| `/guides/chennai-slang-decoder` | Decoder | Original | Accurate | **Ready** |
| `/guides/chennai-slang-decoder-tamil` | Tamil twin | Translation | Toggle | **Ready** |
| `/guides/chennai-property-tax-checklist` | Checklist | Original | Accurate | **Ready** |
| `/guides/chennai-property-tax-checklist-tamil` | Tamil twin | Translation | Toggle | **Ready** |
| `/guides/chennai-filter-coffee-map` | Curated map | Original | Explore nav | **Ready** |
| `/guides/chennai-biryani-bracket` | Bracket | Original | Footer | **Ready** |
| `/guides/chennai-temple-quiet-hours` | Hours guide | Original | Accurate | **Ready** |
| `/guides/chennai-margazhi-this-week` | Seasonal | Thin off-season | Accurate | **Watch** off-season |
| `/guides/chennai-used-vehicle-price-pulse` | Pulse | Original | Accurate | **Ready** |
| `/guides/chennai-wedding-venue-costs` | Costs | Original | Accurate | **Ready** |
| `/guides/chennai-auto-fare` | Fare cards | Original | Mega-nav | **Ready** |
| `/guides/chennai-dengue-week` | Civic week | Seasonal | Accurate | **Ready** |
| `/guides/chennai-ev-charging` | Guide | Original | Explore nav | **Ready** |
| `/guides/chennai-festivals-calendar` | Calendar | Original | Events nav | **Ready** |
| `/guides/chennai-tech-careers` | How to read job ads | Original | Jobs nav | **Ready** |
| `/guides/how-to-use-mychennaicity` | Usage | Original | Footer | **Ready** |
| `/guides/bulk-waste-generator-readiness-checklist-2026` | Long civic guide | Original | Accurate | **Ready** |
| `/chennai-tourism` | Hub | Original | Explore | **Ready** |
| `/chennai-tourism/this-weekend-ecr-plan` | Plan | Original | Events nav | **Ready** |
| `/elections-2026` | Map + copy | Original + disclaimer | Explore | **Ready** |

---

## WhatsApp cluster (overlapping purpose)

| Page | Unique content | Duplicate / thin | Nav / UX | Verdict |
| --- | --- | --- | --- | --- |
| `/chennai-whatsapp-group` | Join landing | Overlaps Tamil twin | Explore | **Ready** |
| `/chennai-whatsapp-group-tamil` | Tamil twin | Translation | Toggle | **Ready** |
| `/chennai-whatsapp-community-guide` | How-to | Overlaps landing | Accurate | **Watch** — differentiate |
| `/chennai-whatsapp-group-admins` | Admin toolkit | Distinct | Explore | **Ready** |
| `/chennai-whatsapp-spammers` | Spam desk | Distinct | Accurate | **Ready** |
| `/whatsapp-community/partners` | Badge embed | Thin partner page | Accurate | **Watch** — no ads |

---

## Legal / about (needed for AdSense; keep ads off)

| Page | Unique content | Duplicate / thin | Nav / UX | Verdict |
| --- | --- | --- | --- | --- |
| `/privacy` | AdSense-required wording | Legal | Footer | **Ready** |
| `/cookies` | Partner-sites + Ads Settings | Legal | Footer | **Ready** |
| `/terms` | Terms | Legal | Footer | **Ready** |
| `/community-guidelines` | Guidelines | Legal | Footer | **Ready** |
| `/editorial-standards` | Standards | Legal | Footer | **Ready** |
| `/about` | About | Short | Footer | **Ready** |
| `/contact` | Tip / jobs / events intake | Form | Footer | **Ready** (ads already blocked) |
| `/glossary` | ~7 terms, ~900 words with chrome | Short reference | Footer | **Watch** — add terms or keep ads off |
| `/business-profile/abk-liaison-llp` | One business profile | Unique | Sitemap only | **Watch** (one-off, not a content farm) |

---

## In the repo, 404 on live (do not submit until this is clean)

These exist in code and will enter sitemap on the next production deploy. Live HEAD on 4 Sep 2026 was **404**. Google’s UX list explicitly flags **missing pages**.

| Page | What’s in the repo | Live | Verdict |
| --- | --- | --- | --- |
| `/guides/tn-plus-two` | Education hub | **404** | **Fix** — deploy or drop from sitemap |
| `/guides/tn-plus-two/groups/2502` … `2802` (6 pages) | Unique group copy, but EN+TA mixed on one URL | **404** | **Watch** when live (template family) |
| `/guides/tn-plus-two/compare` | Compare table | **404** | Deploy with hub |
| `/guides/tn-plus-two/hse-structure` | Structure explainer | **404** | Deploy with hub |
| `/guides/tn-plus-two/how-to-choose` | Chooser | **404** | Deploy with hub |
| `/guides/tn-council-of-ministers` | Roster hub | **404** | **Fix** |
| `/guides/tn-council-of-ministers/ministers/[slug]` × **35** | Name + portfolios + ~1 Chennai paragraph | **404** | **Fix** — thin/doorway farm |
| `/guides/tn-council-of-ministers-tamil` + 35 Tamil ministers | Same template | **404** | Same |
| `/guides/tn-council-of-ministers/departments` | Lookup | **404** | OK if hub is substantial |
| `/guides/tn-council-of-ministers/chennai` | Chennai shelf | **404** | Better than minister stubs |
| `/guides/tn-council-of-ministers/ias-leadership` | **3 news links only** | **404** | **Fix** — thin; merge into hub |
| `/guides/tn-council-of-ministers/official-sources` | PDFs | **404** | OK as a source page |
| Tamil twins of departments / Chennai / IAS / sources | Translations | **404** | Same as EN |

Minister pages are the largest **“similar pages / little content”** cluster in the whole project. Portfolios are official lists, not original journalism. Do not run AdSense on them until each page has a real Chennai-use section (more than one paragraph).

---

## What to do before “Submit your site for review”

1. **Reviewer path:** home → news hub → one long article → one area hub (OMR) → civic finder → privacy. Those are the strongest unique-content pages.
2. **`/civic-tools/area-sabha`:** fill meetings or `noindex` until it has records. Same for any civic tracker that is still an empty shell.
3. **Footer:** make every label go where it says (Monsoon ≠ generic Chennai topic; Advertise ≠ generic Contact unless the page says so).
4. **Do not deploy** 70 minister URLs into production sitemap until they are expanded — or ship the hub only.
5. **If Plus Two / cabinet should be live:** deploy them so they stop 404ing, then keep ads off the thinnest URLs.
6. Keep **auto modals off**. Keep Google display units off legal, search, submit forms, and empty tools.
7. Keep publishing original news (regular updates is an explicit AdSense tip). Listing hubs already refresh from the database.

---

## Related

- **Implementation plan (P0–P2 fixes):** [`.cursor/plans/adsense-content-ux-gaps.plan.md`](../.cursor/plans/adsense-content-ux-gaps.plan.md)
- [ADSENSE_PRE_FLIGHT.md](ADSENSE_PRE_FLIGHT.md) — env, `ads.txt`, Search Console, submit steps
- [AGENT_LEARNINGS_AND_SOPS.md](AGENT_LEARNINGS_AND_SOPS.md) — SOP E (AdSense / ads.txt / legal)
- Google: [Content and user experience](https://support.google.com/adsense/answer/7299563), [Program policies](https://support.google.com/adsense/answer/48182), [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies)
