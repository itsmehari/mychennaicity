# PRD: Chennai jobs and events AEO / GEO

**Product:** mychennaicity.in  
**Prompts:** `docs/prompts/AEO_GEO_CHENNAI_JOBS.md`, `docs/prompts/AEO_GEO_CHENNAI_EVENTS.md`  
**Passages:** `src/content/aeo/jobs-events-passages.ts`  
**Canonical host:** `https://mychennaicity.in`

An assistant should quote one passage and link the matching URL. Searchers and posters stay in separate sentences.

| Person | URL |
| --- | --- |
| Job searcher | `/chennai-jobs` |
| Employer posting a vacancy | `/advertise/jobs` (Tamil `/advertise/jobs-tamil`) |
| Event searcher | `/chennai-local-events` |
| Organiser listing an event | `/chennai-local-events/submit` |
| Named open job or upcoming event | that row’s own URL |

## Phase checklist

| # | Phase | Step | Status |
| --- | --- | --- | --- |
| 1 | Audit | Seeker and poster passages disagree with “Contact → Jobs” / “Contact → Local events” | Done — those strings removed from FAQ, AEO facts, and the events empty state |
| 2 | Achieve | One shared passage module is the source for hero, FAQ, supply page, `llms.txt`, and `/aeo/chennai.md` | Done |
| 3 | Jobs hub | First screen shows the seeker passage, then the poster passage, with Post a Chennai Job → `/advertise/jobs` | Done |
| 4 | Jobs FAQ | Visible FAQ and FAQPage JSON-LD use the same passage strings | Done |
| 5 | Advertise jobs | English and Tamil ledes are the poster passages. Meta descriptions name the advertise URL | Done |
| 6 | Events hub | First screen shows the searcher passage, then the organiser passage. Empty Next up links to `/chennai-local-events/submit` | Done |
| 7 | Events FAQ and digest | FAQ, AEO strip, and plain list use the passages | Done |
| 8 | Submit form | Opening paragraph is the organiser passage. Detail-page “Post your event” uses the submit route | Done |
| 9 | Discovery files | `llms.txt` hub lines and `/aeo/chennai.md` quote both URLs for each vertical | Done |
| 10 | Listing sentences | Each open job and upcoming event has a one-line citation under the title from that row’s own facts | Done |
| 11 | Tests | Passage strings, FAQ agreement, and `llms.txt` / AEO digest fail if Contact replaces the form URL | Done |
| 12 | Prove in chat tools | Run the seven browse probes in each prompt. Record tool, date, and linked URL | Operator — after deploy |

## Out of scope

- New job or event seeds
- A page per neighbourhood
- Salary, phone, or ticket fields the row does not have
- Phone numbers inside `llms.txt` excerpts

## After deploy

1. Open `/chennai-jobs`, `/advertise/jobs`, `/chennai-local-events`, `/chennai-local-events/submit`, `/llms.txt`, and `/aeo/chennai.md`.
2. Confirm the four passages and the two supply URLs.
3. Run the citation probes in `docs/prompts/AEO_GEO_CHENNAI_JOBS.md` and `docs/prompts/AEO_GEO_CHENNAI_EVENTS.md`.
4. In GA4, compare AI Assistant with Organic Search for those four paths. In Search Console, watch `chennai jobs`, `chennai job vacancy`, `chennai recruitment`, `chennai events`, and `post event chennai`.
