# AEO / GEO plan — mychennaicity.in

Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) for Chennai news, jobs, and events. Complements classic SEO in `SEO_ENGINE_PLAN.md`.

## Important honesty note

`llms.txt` is a **useful discovery file**, not a guaranteed ranking factor. Google has not confirmed it as a ranking signal for AI Overviews. Treat it as a low-cost, high-clarity map for AI crawlers and RAG tools — pair it with entity-clear content, FAQ/Speakable schema, fresh sitemaps, and citation-ready reporting.

## Live discovery surfaces

| URL | Role |
| --- | --- |
| `/llms.txt` | Curated Markdown index (llmstxt.org style) |
| `/llm.txt` | 308 alias → `/llms.txt` |
| `/llms-full.txt` | Index + recent news/jobs/events digests |
| `/aeo/chennai.md` | Answer-first Chennai digest |
| `/humans.txt` | Human credits |
| `/robots.txt` | Crawl policy + explicit AI-bot Allow |
| `/sitemap.xml` + `/news-sitemap.xml` | Crawl inventory |
| Hub RSS | `/chennai-local-news/feed.xml`, `/chennai-jobs/feed.xml`, `/chennai-local-events/feed.xml` |

## Content rules that move AEO

1. **Answer first** — lead hubs and explainers with a direct answer paragraph AI systems can quote.
2. **Visible FAQ = FAQPage JSON-LD** — never emit FAQ schema without matching on-page text.
3. **Speakable selectors** — only for real DOM nodes (title, lede, FAQ).
4. **Attribution** — official claims stay attributed; no fake conclusions in digests.
5. **Entity grounding** — Chennai / Greater Chennai Place graph; Organization `sameAs` via env.
6. **Freshness** — force-dynamic hubs + RSS + digest routes; revalidate after seeds.
7. **Internal links** — news ↔ jobs ↔ events ↔ areas so crawlers see topical clusters.
8. **Canonical host** — always `https://mychennaicity.in` (never `.com`).

## Hub parity checklist

| Hub | GEO meta | FAQ | Speakable | RSS | ItemList | Place about |
| --- | --- | --- | --- | --- | --- | --- |
| News | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Jobs | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Events | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## On-page AEO modules (code)

| Module | Where |
| --- | --- |
| `AeoAnswerBlock` | Shared hub answer strip (`src/components/seo/aeo-answer-block.tsx`) |
| Jobs “Who this is for” | `/chennai-jobs` via `ChennaiJobsHubAeoStrip` |
| Events digest | `/chennai-local-events` via `EventsHubThisWeekDigest` |
| Article context cluster | News articles via `ArticleChennaiContextCluster` (related news + area + jobs + events) |
| SWM Quick answers | SWM Rules article series (unchanged specialty block) |

## Ops after deploy

1. Confirm `https://mychennaicity.in/llms.txt` returns `text/plain` 200.
2. Confirm `/robots.txt` lists AI bots and both sitemaps.
3. Submit/refresh sitemaps in GSC (`npm run gsc:submit-sitemap` if configured).
4. Spot-check JSON-LD with Rich Results Test on news, jobs, events hubs.
5. Keep `llms.txt` hubs accurate when adding major public routes.

## What not to do

- Do not keyword-stuff `llms.txt` descriptions.
- Do not list every URL — keep the index curated; put volume in sitemap + `llms-full.txt`.
- Do not block GPTBot/ClaudeBot/Perplexity if citation is the goal.
- Do not emit JobPosting/Event/NewsArticle schema for mock or unpublished rows.
