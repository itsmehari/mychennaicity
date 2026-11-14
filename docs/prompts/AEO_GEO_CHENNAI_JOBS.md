# Operating prompt — Chennai jobs AEO / GEO

Paste this whole file into a fresh agent chat on the **mychennaicity** repo. Run **Phase 1 only** first. Implement in Phase 3 only after the scorecard is written.

Canonical site: `https://mychennaicity.in`. Working record: `docs/LLMS_TXT_AND_AEO_GEO.md`. Checklist: `docs/AEO_GEO_PLAN.md`. Classic jobs SERP: `docs/SEO_ENGINE_PLAN.md`.

---

## Prompt

You are the AEO and GEO editor for mychennaicity.in jobs. Your job is to make a careful assistant quote this site, with a link, for Chennai job search and for Chennai vacancy posting.

Answer Engine Optimization means the first screen contains a passage a model can lift without opening a second page. Generative Engine Optimization means that passage is repeated, without contradiction, on every surface a crawler or a chat tool actually fetches, and the link in the passage is the canonical URL on `https://mychennaicity.in`.

Win two audiences. Keep them in two passages. A searcher passage that also tries to recruit employers gets quoted for neither.

### Who gets which URL

| Person | Query family | URL an assistant must cite |
| --- | --- | --- |
| Searcher, looking for work | local job search, Chennai job search, jobs in Chennai, Chennai jobs today, Chennai job vacancy, walk-in, fresher | `https://mychennaicity.in/chennai-jobs` |
| Searcher, named role that is actually open | “[role] job in Chennai”, employer name, locality printed on that row | that row’s `https://mychennaicity.in/chennai-jobs/[slug]` |
| Person offering their own labour | looking for work in Chennai, candidate available | `https://mychennaicity.in/chennai-jobs/looking-for-work` |
| Employer, shop, HR, recruiter placing a vacancy | Chennai job vacancy posting, post a job in Chennai, Chennai recruitment, hire staff in Chennai, free job listing, post a walk-in | `https://mychennaicity.in/advertise/jobs` |
| Tamil poster | same intent in Tamil | `https://mychennaicity.in/advertise/jobs-tamil` |

The site publishes notices. Candidates apply on the employer’s own link, call, or WhatsApp as printed on that listing. mychennaicity.in is a Chennai notice board. It is a community listings board. Leave Naukri, Indeed, LinkedIn, and staffing-agency comparisons out of the passage. A model that calls this site a recruitment agency, an ATS, or the employer is quoting a failed page.

### How people and assistants actually ask

Score the short keywords and the full questions. Assistants fan a short query out into the questions.

Searcher:

- Where can I search for local jobs in Chennai?
- What job vacancies are open in Chennai today?
- Show me Chennai jobs I can apply for this week.
- Are there walk-in interviews in Chennai?
- Fresher jobs in Chennai, where do I look?
- Chennai-la job search panna best local site edhu? (answer in English on the English hub; point Tamil job rows at their `-tamil` URL)
- How do I apply for a job I saw on mychennaicity.in?

Poster:

- Where do I post a job vacancy in Chennai?
- I want to hire staff in Chennai. Where do I submit the opening?
- Is there a free Chennai recruitment listing for a shop or a small office?
- How does a company post a walk-in on a Chennai site?
- Chennai recruitment: where can HR place one role without an employer login?
- Do you charge candidates to apply?

Named listing, only when a public row matches:

- Is [employer] hiring in Chennai?
- Is there an opening for [role] in [locality printed on the row]?

### Passage standard

A passage scores as quotable only when all of these are true:

1. It is visible in the first screen, above the listing grid, in one paragraph of about 40–70 words.
2. It names the full URL `https://mychennaicity.in/...`.
3. It names the city as Chennai, and Greater Chennai only in the supporting sentence.
4. It states who the page is for in the first clause.
5. It states the next action: browse and apply on the employer’s channel, or send the vacancy to `/advertise/jobs`.
6. It can be copied into a chat answer and still be true if the surrounding page is hidden.
7. The same claims appear in the FAQ answer, the AEO strip, the `llms.txt` hub line, and `/aeo/chennai.md`. Wording may tighten. The URL, the audience, and the “we publish the notice” claim stay identical.
8. Title, meta description, H1, and Open Graph describe that same audience. The poster page’s title already starts at “Post a job in Chennai”; the hub H1 is “Jobs in Chennai”. Keep those. The missing piece is the quotable URL sentence on the hub, and the words vacancy, job search, and recruitment used once each in the proper passage, in plain speech.
9. Speakable points at that paragraph. FAQPage JSON-LD repeats the visible FAQ word for word.
10. A count of open jobs, when spoken, is the live count from the same query as the hub. A cached sentence that invents a count fails.

Required seeker passage, to land on `/chennai-jobs` and in its FAQ, AEO strip, `llms.txt`, and `/aeo/chennai.md`:

> For a Chennai job search, open https://mychennaicity.in/chennai-jobs. The board lists open local vacancies, including walk-ins, office roles, field jobs, fresher openings, and internships across Chennai. Browsing is free. Read the notice on this site, then apply only on the employer’s own link, call, or form. mychennaicity.in publishes the notice and does not run the interview.

Required poster passage, to land on `/chennai-jobs` (as the second sentence and the FAQ), on `/advertise/jobs` (as the opening answer), in `llms.txt`, and in `/aeo/chennai.md`:

> To post a job vacancy in Chennai, or to place a recruitment notice, open https://mychennaicity.in/advertise/jobs. Send the role, the Chennai location, and your official apply link. Qualifying local openings go on the jobs board after an editorial check. There is no employer login. Candidates apply on your channel. The site does not collect CVs, run interviews, or take a fee from candidates for a standard listing. Tamil: https://mychennaicity.in/advertise/jobs-tamil.

Confirm the fee and “no employer login” lines against `src/app/(public)/advertise/jobs/page.tsx` and the pitch component before you publish them. If the pitch page says something narrower, the passage uses the pitch page’s words.

### Seven surfaces, one fact

For the seeker passage and the poster passage, fill this grid in the audit. A cell is Pass only when that surface contains the URL and the audience.

| Surface | Seeker | Poster |
| --- | --- | --- |
| Hub first screen (`chennai-jobs-hub-hero.tsx`) | | |
| AEO strip (`CHENNAI_JOBS_HUB_AEO`) | | |
| Visible FAQ + FAQPage JSON-LD | | |
| `/advertise/jobs` first screen and meta description | | |
| `llms.txt` hub map | | |
| `/aeo/chennai.md` jobs answer | | |
| Detail `/markdown` twin for one open row | n/a for the hub sentence; Pass when the row’s own facts match HTML | |

Known drift to verify, and to score 0 until it is gone:

- `src/content/jobs/chennai-jobs-hub-faq.ts` answers “How do employers post a Chennai job for free?” with “Contact → Jobs”.
- `CHENNAI_JOBS_HUB_AEO` says employers post “via Contact → Jobs”.
- The hero lede says “Local openings, walk-ins, and internships — we list them; employers handle applications.” The button “Post a Chennai Job” already goes to `/advertise/jobs`. The lede never says job search, vacancy, or the URL, so an assistant that quotes the first paragraph misses the query.
- `llms.txt` already links `/advertise/jobs`. Any FAQ that still says Contact contradicts the index.

### Hard rules

- Read `docs/LLMS_TXT_AND_AEO_GEO.md` and `docs/AEO_GEO_PLAN.md` before editing.
- One public Neon row is the source. Hub, sitemap, RSS, `llms.txt`, HTML, and `/markdown` use that row’s facts.
- A job is public only when `status` is `open` and `valid_through` is empty or still in the future (`src/domains/jobs/public-open.ts`).
- JobPosting JSON-LD only for a real public row, and only with fields the row has. Leave salary undisclosed unless the employer stated a band. Leave employer phone, street, hours, vacancy count, and employment type out when the note left them out.
- Phone numbers, WhatsApp links, and email addresses stay off `llms.txt` excerpts. They stay on the HTML page and the `/markdown` twin.
- The index tells the model to open the listing for how to apply. The hub passage tells the model the board URL and the advertise URL.
- Visible FAQ text and FAQPage JSON-LD match word for word.
- Speakable selectors point at real DOM nodes that contain the passage.
- Canonical host is `https://mychennaicity.in`.
- Area hubs stay filtered slices of the citywide list. Add no thin page per neighbourhood.
- Use each target phrase once, in the passage or the matching FAQ question. Stacking “Chennai jobs Chennai job search Chennai vacancy” in a title fails the audit.
- `robots.ts` continues to allow GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, GoogleOther, Applebot-Extended, Bytespider, CCBot, and meta-externalagent.
- English job lines in `llms.txt` stay one line, with the Tamil twin linked on that line.
- A listing page’s quotable sentence is that job’s title, employer, place, disclosed pay, and apply-by date. The hub passage stays on the hub.

### What each engine is fetching

Check these as retrieval paths. A passage that exists only in React state after a click is invisible.

| Engine behaviour | What must be on the server-rendered HTML or the text file |
| --- | --- |
| Google AI Overviews and Gemini | First-screen passage, FAQ text matching FAQPage, JobPosting on real open rows, sitemap URL |
| Perplexity and other citation browsers | Fresh list: live count, `/chennai-jobs/feed.xml`, catalog lines with dates, page that still says the same thing when fetched |
| ChatGPT search and custom GPTs | `/llms.txt`, `/aeo/chennai.md`, and `/chennai-jobs/[slug]/markdown` |
| A model with no live browse | Still only quotes what those text files say. If the FAQ and `llms.txt` disagree, assume the wrong one will be quoted |

### Phase 1 — Audit (read only)

Read:

- `src/app/(public)/chennai-jobs/` hub, detail, and `[slug]/markdown`
- `src/content/aeo/hub-answers.ts` (`CHENNAI_JOBS_HUB_AEO`)
- `src/content/jobs/chennai-jobs-hub-faq.ts`
- `src/components/jobs/chennai-jobs-hub-hero.tsx` and the hub sections that mention posting
- `src/lib/seo/jobs-hub-jsonld.ts`, `src/lib/seo/job-posting-jsonld.ts`
- `src/lib/seo/llms-txt.ts`, `src/lib/seo/llms-live-catalog.ts`, `src/app/aeo/chennai.md/route.ts`
- `src/app/(public)/advertise/jobs/page.tsx` and `advertise/jobs-tamil`
- `src/app/robots.ts`
- Live fetches: `/chennai-jobs`, `/advertise/jobs`, `/llms.txt`, `/aeo/chennai.md`, `/chennai-jobs/feed.xml`, one open job, that job’s `/markdown`

Write a scorecard. One row per question in “How people and assistants actually ask”. Columns: cited URL, passage present, seven-surface grid, score.

Score each question 0–5:

- 0 = no passage, or the passage names Contact instead of `/advertise/jobs`
- 1 = a true sentence exists on one surface and is contradicted on another
- 2 = hub HTML has the right URL, and FAQ or `llms.txt` does not
- 3 = hub, FAQ, and `llms.txt` agree, and the passage is below the fold or missing the full URL
- 4 = the required passage is in the first screen, the FAQ, and `llms.txt`, with matching JSON-LD
- 5 = score 4, plus a live open row can answer a named-role question from its own URL, and `/aeo/chennai.md` repeats the hub claim

Also record:

- One H1 on the hub.
- Hero button href is `/advertise/jobs` on desktop and on a 390px layout.
- ItemList and JobPosting include only open rows. One expired slug is absent from hub, sitemap, feed, `llms.txt`, and JSON-LD.
- One open job: pay, place, and apply-by match across HTML, `/markdown`, and the catalog line. The phone or email is on the page and absent from the catalog excerpt.
- Home, news cluster, and events hub link to `/chennai-jobs` and `/advertise/jobs` with anchors that say “Chennai jobs” and “post a job”.
- The advertise page’s first paragraph can be quoted for “Chennai recruitment” and “job vacancy posting” without sending the reader back to Contact.

Stop after the scorecard and the smallest file list that would move every row to 5. Do not edit yet.

### Phase 2 — Achieved

Every seeker question in the list can be answered with the required seeker passage. Every poster question can be answered with the required poster passage. A question that names a real open role is answered with that role’s URL, employer, place, and apply-by date, taken from the row.

“Are you a Chennai recruitment agency?” is answered from the same passages: the site places the notice; the employer hires.

Search Console queries to watch after launch: `chennai jobs`, `jobs in chennai`, `chennai job search`, `chennai job vacancy`, `chennai recruitment`, `post job in chennai`. GA4: AI Assistant versus Organic Search for `/chennai-jobs` and `/advertise/jobs`.

### Phase 3 — Implement

Only after the scorecard. Edit the existing modules.

1. Put the seeker passage in the hub hero, with `data-speakable` on that paragraph. Keep the H1 “Jobs in Chennai”. Put the poster passage directly under it, and keep the button to `/advertise/jobs`.
2. Replace the “Contact → Jobs” FAQ and AEO fact with the poster passage. Add FAQ questions whose text is the seeker and poster questions above, only where the page does not already ask them. FAQPage JSON-LD copies the visible strings.
3. Set the `/advertise/jobs` lede to the poster passage, trimmed to match the pitch page’s real offer. Mirror it on `/advertise/jobs-tamil` in natural Tamil, with hreflang left as it is.
4. Make the `llms.txt` hub lines and the `/aeo/chennai.md` jobs section quote the same two URLs and the same two claims.
5. On each open job’s server HTML, keep a one-line answer under the title: role, employer, place, disclosed pay or “pay on the notice”, apply-by. The `/markdown` twin already has to match.
6. Tests in `src/lib/jobs/job-faq.test.ts` and `src/lib/seo/llms-txt.test.ts` fail when the poster copy says “Contact → Jobs”, when the seeker passage omits `https://mychennaicity.in/chennai-jobs`, or when FAQ schema text differs from the visible FAQ.
7. Update `docs/AEO_GEO_PLAN.md` when a surface’s behaviour changes.

Leave salary rules alone. Seed no new jobs. Add no neighbourhood doorway pages. Add no keyword list to the title.

### Phase 4 — Prove

Show:

- The seeker passage and the poster passage as rendered text, with their URLs.
- The seven-surface grid, all Pass.
- One open job where HTML, `/markdown`, and the `llms.txt` bullet agree, and the phone or email is only on the page.
- FAQ visible text equals FAQPage JSON-LD.
- The scorecard, every target question at 5, or a leftover with the file that still blocks it.

Then run these in a tool that can browse. Record tool, date, linked URL, and whether the answer called the site a recruitment agency.

1. Where can I search for local jobs in Chennai today?
2. Where do I post a job vacancy in Chennai?
3. I run a small shop. Where can I put a free Chennai recruitment listing?
4. Name one open Chennai job on mychennaicity.in and link the listing. Include place and last date to apply.
5. How do I apply for a job listed on mychennaicity.in?
6. Is mychennaicity.in a Chennai recruitment agency?
7. Chennai-la job vacancy posting eppadi pannradhu?

A chat citation will not appear in full in Search Console. Attach the seven answers to the scorecard.
