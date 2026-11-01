# How `llms.txt` works, and what else can lift AEO / GEO

Written 1 November 2026 for mychennaicity.in. This is an operator note, not a ranking promise.

Answer Engine Optimization (AEO) means writing so a system can quote a direct answer. Generative Engine Optimization (GEO) means making that answer easy for ChatGPT, Gemini, Perplexity, Claude, Copilot, and similar tools to find, trust, and cite with a link back to `https://mychennaicity.in`.

`llms.txt` helps the second job. It does not replace the pages, the sitemap, or the reporting.

## What `llms.txt` is, and what it is not

The file follows the community convention at [llmstxt.org](https://llmstxt.org): a short Markdown map at a well-known URL, written for language models rather than for a browser layout.

It is useful because many assistants fetch one obvious text file before they crawl the whole site. Ours is generated from the live database, so a tool that only opens this URL can see which Chennai jobs are open and which events have not ended.

It is not a confirmed Google ranking signal. Google has not said that `llms.txt` changes AI Overviews. A model can still ignore the file, use an old copy, or answer from some other site. The file works when three things are true:

1. The crawler is allowed to read it (`robots.txt` allows the major AI bots).
2. The file names a specific public URL.
3. That URL is a real page with the same facts, plus the detail the file left out.

If the page and the file disagree, the page wins. The file tells the model not to invent a listing.

## The live URLs

| URL | What a tool receives |
| --- | --- |
| `https://mychennaicity.in/llms.txt` | Curated map of hubs, feeds, and trust pages, then the live catalog |
| `https://mychennaicity.in/llm.txt` | Permanent redirect (308) to `/llms.txt`. Some tools guess this shorter name |
| `https://mychennaicity.in/llms-full.txt` | The same map and catalog, plus the latest published news |
| `https://mychennaicity.in/aeo/chennai.md` | The same jobs, notices, and events, written as direct answers |
| `https://mychennaicity.in/humans.txt` | Who the site is for, for people |

The HTML layout also advertises the text files with `alternates.types`, and the footer links to `/llms.txt`. That gives a human and a crawler the same entry point.

## What happens on a request

`/llms.txt` is a Next.js route: `src/app/llms.txt/route.ts`. It is `force-dynamic`. Nothing is baked in at build time.

1. `loadLlmsLiveCatalog()` in `src/lib/seo/llms-live-catalog.ts` reads Neon.
2. Open jobs come from `listOpenJobPostingsForChennaiHub`. A row is included only when `status` is `open` and `valid_through` is empty or still in the future. That is the same rule as the public jobs hub, the sitemap, and JobPosting JSON-LD.
3. Looking-for-work notices come from open `job_seeker_posts`.
4. Events come from `listPublicEventsForChennaiHub`: `status` is `scheduled`, and the end (or the start, if there is no end) is still in the future. Ended, draft, and cancelled events are left out. The public event URL for an ended row 404s, so the file must not keep citing it.
5. `buildLlmsTxtMarkdown()` in `src/lib/seo/llms-txt.ts` turns those rows into Markdown with absolute `https://mychennaicity.in/...` links.
6. The response is `text/plain; charset=utf-8`, with `X-Robots-Tag: all`. Shared caches may hold it for about five minutes (`s-maxage=300`, `stale-while-revalidate=600`).

Each section stops at 400 rows. Past that, the file says how many further rows are only on the hub. On 1 November 2026 the live file was well under the cap: 51 open jobs, 2 looking-for-work notices, and 8 upcoming events.

`/llms-full.txt` and `/aeo/chennai.md` call the same catalog loader. News on the full file is the latest 15 published Chennai articles. The AEO digest uses 8 news rows and the full job and event catalog.

## What each listing line contains

**Jobs.** English page once. If the Tamil twin is also open, the English line names that Tamil URL. The line can include employer, place, full-time or part-time, office or field, published pay, opening count, walk-in, apply-by date in India time, a short excerpt, and the featured-campaign sentence when one is active (the Guindy office assistant is the current example).

**Looking for work.** Role, place, availability, whether they need a place to stay, and a short excerpt. These are people seeking work, not employer vacancies. The file says so.

**Events.** Soonest first. Start and end in India Standard Time, venue, locality, address, and a short description.

Phone numbers, email addresses, and WhatsApp links are stripped from the excerpts. The model is told to send the reader to the listing page for how to apply or how to buy a ticket. That keeps a personal number from being copied into every chat transcript, and it keeps the citeable URL as ours.

## Why this helps this website

The site’s useful facts change every few days: a walk-in closes, an exhibition ends on 7 November, a new fair is seeded. A model that only remembers an old crawl will name a job that is already closed or an event that already happened. The file is one place that stays aligned with the public database.

It is especially useful for four questions people actually ask assistants:

- What jobs are open in Chennai right now?
- Who in Chennai has posted that they are looking for work?
- What is on in Chennai this week?
- Where should I read Chennai civic news, and which page is the source?

Without the file, a tool must discover `/chennai-jobs`, page through it, and hope it did not stop after the first screen. The jobs RSS feed still lists only the latest 40 roles. The file lists the open set, with pay and apply-by dates already in the sentence.

For news, the file is a map plus a short digest, not the article. Civic claims still have to be read on the story, where the disclaimer, the named source, and the AI-assisted fine print sit. The file’s instruction is to link the specific article, job, or event URL, and to keep official claims attributed.

The practical outcome we want is a citation, not a paraphrase with no link: “Male office assistant, Guindy Race Course, ₹15,000 a month, apply by 1 December” pointing at `/chennai-jobs/male-office-assistant-guindy-race-course`.

## What already sits around the file

These are in production and do more for AEO and GEO than the text file alone.

| Mechanism | Where | Why it matters |
| --- | --- | --- |
| AI bots allowed | `/robots.txt` lists GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, and others, with the same allow rules as everyone else | A blocked bot cannot cite the page |
| Three sitemaps | `/sitemap.xml`, `/news-sitemap.xml`, `/sitemap-recent.xml` | Discovery and recrawl. The recent sitemap is the last 30 days |
| Hub RSS | News, jobs, and events `feed.xml` | Older aggregators and some assistants still prefer RSS |
| Answer-first hubs | `AeoAnswerBlock` on jobs and events; news FAQ | A quotable paragraph that matches the visible page |
| Visible FAQ = FAQPage JSON-LD | News, jobs, and rich festival events, only when the questions are on the page | Machines and readers see the same answers |
| Speakable | News articles, and the SWM quick-answer block | Marks the title, lead, and FAQ as the part worth reading aloud |
| Typed structured data | `NewsArticle` or `Article`, `JobPosting`, `Event`, `BreadcrumbList`, home `Organization` + `WebSite` + `SearchAction` | Eligibility for rich results, and a typed reading of the page |
| Same public-row rules | Sitemap, JSON-LD, hubs, and `llms.txt` all hide expired jobs and ended events | Stops fake or stale schema |
| Canonical host | `https://mychennaicity.in` only | One URL to cite |
| Primary source on news | `source_url` / `source_name` on the article | The model can see who the fact came from |
| Glossary `sameAs` | `/glossary`, only where the external URL was checked | Ties a local term to a stable entity |
| Chennai Today | `/chennai-today` and the Tamil twin | The “what is happening today” page, separate from the jobs file |
| Footer and layout link | Footer “AI / LLM site index”; layout `alternates.types` | The file is not a secret URL |

Code lives under `src/lib/seo/`, `src/app/llms.txt/`, `src/app/llms-full.txt/`, `src/app/llm.txt/`, and `src/app/aeo/chennai.md/`. The shorter plan is `docs/AEO_GEO_PLAN.md`. Classic SEO ops are in `docs/SEO_ENGINE_PLAN.md`.

## Mechanisms we have not built yet

Ordered by how directly they help a Chennai reader get a cited answer from this site. None of these are guaranteed ranking factors. The first group is the one worth doing next.

### Do these next

1. **Markdown for the page itself, not only the index.**  
   `llms.txt` is a directory. The article, job, and event pages are still HTML. An agent that follows a link then has to parse navigation, ads, and layout. A clean Markdown twin (content negotiation on `Accept: text/markdown`, or a stable `/chennai-local-news/[slug].md` style URL) lets the model read the disclaimer, the source, the pay, and the venue without the chrome. Keep one generator per template so the Markdown cannot drift from the HTML.

2. **Put today’s civic facts in the same file.**  
   The catalog is jobs and events. Questions about the gold rate, Metro Water, a fare card, or “what is happening in Chennai this morning” still depend on `/chennai-today` and `/chennai-gold-rate`. A short “Today in Chennai” section, generated with those pages, would answer the query the file currently only links.

3. **IndexNow when a row is published or closed.**  
   Bing, and other engines that share the IndexNow protocol, can be told about a new or expired URL immediately instead of waiting for the next sitemap read. Ping the detail URL, the hub, and `/llms.txt` from the existing seed and admin publish path. Submit the sitemaps in Bing Webmaster Tools as well. `docs/CONTENT_ARCHITECTURE.md` already names Bing; the repo has a Google Search Console submit script and no IndexNow client.

4. **Refresh the AI URLs in the same breath as the sitemap.**  
   `revalidateListingsSurfaces()` refreshes hubs and sitemap routes. It does not mention `/llms.txt`, `/llms-full.txt`, `/aeo/chennai.md`, or the jobs and events RSS feeds. The routes are dynamic, and the CDN may still serve the previous body for up to a few minutes. Add those paths, and ping IndexNow, inside that helper.

5. **A quote box on civic stories.**  
   Generative engines prefer a sentence that already contains the number, the date, the place, and the named source. Many of our articles have that in the lead. It is not a required block. A visible “Key facts” list (three to six lines, each with a date and a source) that matches the prose gives the model something safe to quote. Do not add a fact that is not in the story.

6. **Raise the jobs RSS cap to the open set.**  
   `/chennai-jobs/feed.xml` still stops at 40. The text file lists every open role. Anything that reads RSS instead of `llms.txt` still sees a partial board. The events feed should be checked for the same gap.

7. **Classifieds in the catalog, with the same contact rule.**  
   Property and other reader listings are a public hub and are absent from `llms.txt`. Add open classifieds as their own section: title, locality, asking price only when we actually publish one, and the URL. Keep phone numbers on the page, behind the existing reveal gate. Do not describe a draft or a taken-down ad.

### Worth doing after that

8. **A Tamil digest.**  
   Tamil twins exist for many jobs, guides, and Chennai Today. The AI files are English, with a Tamil job URL in the margin. A `/llms-ta.txt` or a Tamil block in `/aeo/chennai.md` is how a Tamil prompt finds the Tamil page first instead of an English paraphrase.

9. **JSON Feed next to RSS.**  
   `application/feed+json` is easier for an agent to parse than RSS XML. One feed per hub, same rows as the XML feed, is enough. Do not invent a fourth set of listing rules.

10. **Author pages.**  
    News JSON-LD can already emit a `Person` when `author_byline` and `author_same_as` are set. There is no public author archive. A real byline page, with the same name and profile links, makes the cite “mychennaicity.in, by …” a stable entity. Do not invent degrees or titles.

11. **A dated corrections list.**  
    `/editorial-standards` explains that we correct. It does not list corrections. A short public log (date, URL, what changed) is both an editorial habit and a trust signal for a model that is deciding whether to repeat us. No `Correction` schema until the list is real.

12. **Image facts on original photos.**  
    Hero images should carry a visible caption, who made the picture, and `ImageObject` only for photos we actually host. Classified walkthrough videos have no `VideoObject`. Unique photos of a Virugambakkam gallery or a job flyer are hard for another site to copy into an answer. Stock or unmarked images are not.

13. **Gold-rate and other civic numbers as data, not only as a page.**  
    A small JSON document for today’s 22k and 24k rates, with the timestamp and the method note already on `/chennai-gold-rate`, lets an agent quote the figure and the time together. The same pattern fits a reservoir or fare table only when the page already shows that table. Do not wrap an estimate in `Dataset` schema and call it an official statistic.

14. **Speakable and FAQ on ordinary event pages.**  
    Hubs and rich festivals have them. A standard event page is a prose listing. One visible “When, where, and how to enter” FAQ, matching the poster, is the piece an assistant will read. Skip the FAQ when the poster does not answer the question.

15. **Watch the bots.**  
    Super-admin counts human page views and call or WhatsApp clicks. It does not show whether GPTBot, ClaudeBot, or PerplexityBot fetched `/llms.txt` or a job URL. A monthly log of those user agents, without storing visitor IPs in the engagement table, tells us whether the file is being read. Pair that with Search Console and Bing query reports. Citations in the wild still have to be checked by hand.

16. **Wikidata, only after the item exists.**  
    Organization `sameAs` is already wired for profile URLs we control. A Wikidata item for the publication, pointing at `https://mychennaicity.in`, is the usual way to join that graph. Create it when the about page and the profiles are stable. Do not invent a Wikipedia article.

17. **Area answer files, later.**  
    “Jobs in Velachery” and “events in Virugambakkam” are answered today only if the model filters the citywide list. Area hubs exist. A later pass can add a line for the area, or rely on the model following the area hub. Do not generate a thin page per neighbourhood just to have a URL.

### Leave these alone

- Keyword-stuffed `llms.txt` descriptions, or a file that lists every guide URL. Hubs stay curated. Volume belongs to the live catalog, the sitemap, and `llms-full.txt`.
- Fake `JobPosting`, `Event`, `NewsArticle`, or FAQ schema for mock, closed, or unpublished rows.
- Blocking GPTBot, ClaudeBot, or PerplexityBot in the hope of “protecting” copy. That removes the citation.
- A `llms.txt` claim that a tool must prefer us. The file can request a citation. It cannot enforce one.
- Publishing seeker or classified phone numbers into the AI file. The page is the contact point.
- Treating ChatGPT memory or a one-off custom GPT as a substitute for the public file. The public URL is what any tool can fetch without our login.

## How to tell whether it is working

Check the file after a seed:

1. `https://mychennaicity.in/llms.txt` returns `text/plain` and includes the new job or event URL.
2. The same URL returns 200 on the site, and the pay, time, and place match the file.
3. An expired job or a finished event disappears from the file on the next uncached request.
4. Ask a tool that can browse: “What Chennai jobs does mychennaicity.in list?” The useful answer links to `/chennai-jobs/...`, not to a recalled summary with no URL.

Search Console and Bing still measure ordinary search. AI citations will not show up there in full. Keep a note when a chat actually links a listing, including the date and the tool.

## Related files

- `src/app/llms.txt/route.ts`, `src/app/llm.txt/route.ts`, `src/app/llms-full.txt/route.ts`, `src/app/aeo/chennai.md/route.ts`
- `src/lib/seo/llms-txt.ts`, `src/lib/seo/llms-live-catalog.ts`, `src/lib/seo/llms-txt.test.ts`
- `src/app/robots.ts`
- `docs/AEO_GEO_PLAN.md`, `docs/SEO_ENGINE_PLAN.md`, `docs/CONTENT_ARCHITECTURE.md`
