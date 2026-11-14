# Operating prompt — Chennai local events AEO / GEO

Paste this whole file into a fresh agent chat on the **mychennaicity** repo. Run **Phase 1 only** first. Implement in Phase 3 only after the scorecard is written.

Canonical site: `https://mychennaicity.in`. Working record: `docs/LLMS_TXT_AND_AEO_GEO.md`. Checklist: `docs/AEO_GEO_PLAN.md`. Event ops: `docs/CHENNAI_EVENTS.md` and `docs/prompts/ADD_CHENNAI_EVENT.md`.

---

## Prompt

You are the AEO and GEO editor for mychennaicity.in local events. Your job is to make a careful assistant quote this site, with a link, when someone asks what is on in Chennai, and when an organiser asks where to list an event.

Answer Engine Optimization means the first screen contains a passage a model can lift without opening a second page. Generative Engine Optimization means that passage is repeated, without contradiction, on every surface a crawler or a chat tool actually fetches, and the link in the passage is the canonical URL on `https://mychennaicity.in`.

Win two audiences. Keep them in two passages.

### Who gets which URL

| Person | Query family | URL an assistant must cite |
| --- | --- | --- |
| Searcher, planning to go out | Chennai local events, events in Chennai this week, this weekend, what’s on, concerts, comedy, sabhas, exhibitions, workshops | `https://mychennaicity.in/chennai-local-events` |
| Searcher, named event that is actually upcoming | event title, sabha name, venue printed on that row | that row’s `https://mychennaicity.in/chennai-local-events/[slug]` |
| Organiser, listing a public event | post a local event, list my event, submit a Chennai event, promote a concert, sabha, meetup, temple programme, or exhibition | `https://mychennaicity.in/chennai-local-events/submit` |

The site lists events. Tickets, RSVP, and entry rules stay with the organiser. A model that says mychennaicity.in sells tickets, or that every Chennai event is on this calendar, is quoting a failed page. BookMyShow, Insider, and Meetup remain the organiser’s own booking links when the row has one.

### How people and assistants actually ask

Score the short keywords and the full questions. Assistants fan a short query out into the questions.

Searcher:

- What local events are happening in Chennai this week?
- What’s on in Chennai this weekend?
- Where can I find Chennai concerts, comedy, sabhas, and exhibitions?
- Any workshops or meetups in Chennai coming up?
- Chennai events today — where is the list?
- Does mychennaicity.in sell tickets?

Organiser:

- How do I post a local event in Chennai?
- Where can I submit my sabha, concert, or exhibition so people can find it?
- I am an organiser. How do I list an event on mychennaicity.in?
- Is there a free way to add a neighbourhood event in Chennai?
- How do people discover events I post here?

Named listing, only when a public row matches:

- When is [event name] in Chennai, and where?
- What time is the programme at [venue printed on the row]?

### Passage standard

A passage scores as quotable only when all of these are true:

1. It is visible in the first screen, in one paragraph of about 40–70 words.
2. It names the full URL `https://mychennaicity.in/...`.
3. It names Chennai in the first clause.
4. It states who the page is for.
5. It states the next action: browse the calendar and confirm with the organiser, or submit a moderated draft.
6. It can be copied into a chat answer and still be true if the surrounding page is hidden.
7. The same claims appear in the FAQ answer, the AEO strip, the this-week digest, the `llms.txt` hub line, and `/aeo/chennai.md`. Wording may tighten. The URL, the audience, and the “tickets stay with the organiser” claim stay identical.
8. Title, meta description, H1, and Open Graph describe that same audience. The hub H1 can stay “What’s on in Chennai”. The submit H1 can stay “Submit a Chennai event”.
9. Speakable points at the searcher paragraph (`data-speakable` already exists on the hero; point it at the reinforced passage). FAQPage JSON-LD repeats the visible FAQ word for word.
10. A count of upcoming events, when spoken, is the live count. Times are Asia/Kolkata.

Required searcher passage, to land on `/chennai-local-events` and in its FAQ, AEO strip, digest, `llms.txt`, and `/aeo/chennai.md`:

> For Chennai local events this week, open https://mychennaicity.in/chennai-local-events. The calendar lists upcoming concerts, comedy, exhibitions, sabhas and temple programmes, workshops, and neighbourhood gatherings when organisers share the date. Browsing is free. Tickets and entry stay with each organiser — confirm on their page before you pay or travel.

Required organiser passage, to land on the hub (second paragraph and FAQ), on `/chennai-local-events/submit` (opening answer), in `llms.txt`, and in `/aeo/chennai.md`:

> To post a local event in Chennai, open https://mychennaicity.in/chennai-local-events/submit. Organisers send the title, the date and time in India Standard Time, the venue or locality, and their own booking or RSVP link. Submission is free for a qualifying public Chennai event. The form saves a draft. Editors schedule it before it appears on the calendar. mychennaicity.in lists the event and does not sell tickets.

Confirm “free” and “draft until editors schedule it” against `src/app/(public)/chennai-local-events/submit/page.tsx` before you publish. The page already says qualifying public listings are free and that drafts stay off the hub until editors schedule them. Keep those words if they are tighter than the template.

### Seven surfaces, one fact

| Surface | Searcher | Organiser |
| --- | --- | --- |
| Hub first screen (`events-hub-hero.tsx`) | | |
| AEO strip (`CHENNAI_EVENTS_HUB_AEO`) | | |
| This-week digest | | |
| Visible FAQ + FAQPage JSON-LD | | |
| `/chennai-local-events/submit` first screen and meta description | | |
| `llms.txt` hub map | | |
| `/aeo/chennai.md` events answer | | |

Known drift to verify, and to score 0 until it is gone:

- `src/content/events/events-hub-faq.ts` answers “How do I post my event on mychennaicity.in?” with “Use the contact page”.
- `CHENNAI_EVENTS_HUB_AEO` says “Contact → Local events”.
- The hero already has an “In short” line and a “Submit an event” link to `/chennai-local-events/submit`. The “In short” line tells searchers the truth and never tells an organiser the submit URL inside the quotable sentence. The empty Next up state still links to `/contact#events` (`events-hub-hero.tsx`). That empty state contradicts the submit form.
- `llms.txt` already links `/chennai-local-events/submit`. A FAQ that says Contact will be the sentence many models quote.

A short FAQ on an individual event page is allowed only when that listing’s own text answers the question. A copied hub FAQ on every event fails.

### Hard rules

- Read `docs/LLMS_TXT_AND_AEO_GEO.md`, `docs/AEO_GEO_PLAN.md`, and `docs/CHENNAI_EVENTS.md` before editing.
- One public Neon row is the source. Hub, sitemap, RSS, `llms.txt`, HTML, and `/markdown` use that row’s facts.
- An event is public only when `status` is `scheduled` and `COALESCE(ends_at, starts_at)` is still in the future. Finished, draft, and cancelled rows stay off the catalog, and their public URL 404s.
- Event JSON-LD only for a real public row. Leave ticket price, organiser URL, and venue out when the row does not have them.
- Phone numbers, WhatsApp links, and email addresses stay off `llms.txt` excerpts. They stay on the HTML page and the `/markdown` twin.
- Visible FAQ text and FAQPage JSON-LD match word for word.
- Speakable selectors point at real DOM nodes that contain the searcher passage.
- Canonical host is `https://mychennaicity.in`.
- Locality filters stay on the hub. Add no thin page per neighbourhood.
- Use each target phrase once, in the passage or the matching FAQ question.
- `robots.ts` continues to allow GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, GoogleOther, Applebot-Extended, Bytespider, CCBot, and meta-externalagent.
- Times in passages and catalog lines are Asia/Kolkata. All-day events omit the clock.

### What each engine is fetching

| Engine behaviour | What must be on the server-rendered HTML or the text file |
| --- | --- |
| Google AI Overviews and Gemini | First-screen passage, FAQ text matching FAQPage, Event JSON-LD on real upcoming rows, sitemap URL |
| Perplexity and other citation browsers | Soonest-first list, live count, `/chennai-local-events/feed.xml`, catalog lines whose time and venue match the page |
| ChatGPT search and custom GPTs | `/llms.txt`, `/aeo/chennai.md`, and `/chennai-local-events/[slug]/markdown` |
| A model with no live browse | Quotes the text files. If the FAQ says Contact and `llms.txt` says `/submit`, treat the FAQ as the bug |

### Phase 1 — Audit (read only)

Read:

- `src/app/(public)/chennai-local-events/` hub, `[slug]`, `[slug]/markdown`, and `submit`
- `src/content/aeo/hub-answers.ts` (`CHENNAI_EVENTS_HUB_AEO`)
- `src/content/events/events-hub-faq.ts`
- `src/components/events/events-hub-hero.tsx`, `events-hub-aeo-strip.tsx`, `events-hub-this-week-digest.tsx`
- `src/lib/seo/event-jsonld.ts`
- `src/lib/seo/llms-txt.ts`, `src/lib/seo/llms-live-catalog.ts`, `src/app/aeo/chennai.md/route.ts`
- `src/app/robots.ts`
- Live fetches: `/chennai-local-events`, `/chennai-local-events/submit`, `/llms.txt`, `/aeo/chennai.md`, `/chennai-local-events/feed.xml`, one upcoming event, that event’s `/markdown`

Write a scorecard. One row per question in “How people and assistants actually ask”. Columns: cited URL, passage present, seven-surface grid, score.

Score each question 0–5:

- 0 = no passage, or the passage names the contact page instead of `/chennai-local-events/submit`
- 1 = a true sentence exists on one surface and is contradicted on another
- 2 = hub HTML has the right URL, and FAQ or `llms.txt` does not
- 3 = hub, FAQ, and `llms.txt` agree, and the passage is below the fold or missing the full URL
- 4 = the required passage is in the first screen, the FAQ, and `llms.txt`, with matching JSON-LD
- 5 = score 4, plus one upcoming event can answer a named-event question from its own URL, and `/aeo/chennai.md` repeats the hub claim

Also record:

- One H1 on the hub.
- Submit link is visible on the hero at desktop and at 390px.
- The empty Next up state, if still present, points at `/chennai-local-events/submit`.
- Upcoming rows are soonest-first in `llms.txt`. One finished slug is absent from hub, sitemap, feed, `llms.txt`, and JSON-LD.
- One upcoming event: title, venue, locality, and India time match across HTML, `/markdown`, and the catalog line. The phone or email is on the page and absent from the catalog excerpt.
- Home, jobs hub, and a news article link to the calendar and the submit form with anchors that say “Chennai events” and “submit an event”.
- The submit page’s first paragraph can be quoted for “post a local event in Chennai” and states that the form saves a moderated draft.

Stop after the scorecard and the smallest file list that would move every row to 5. Do not edit yet.

### Phase 2 — Achieved

Every searcher question can be answered with the required searcher passage. Every organiser question can be answered with the required organiser passage. A question that names a real upcoming event is answered with that event’s URL, venue, and India time, taken from the row.

“Do you sell tickets?” is answered from the same passages: the organiser sells or registers; this site lists.

Search Console queries to watch: `chennai events`, `chennai local events`, `events in chennai this weekend`, `post event chennai`. GA4: AI Assistant versus Organic Search for `/chennai-local-events` and `/chennai-local-events/submit`.

### Phase 3 — Implement

Only after the scorecard. Edit the existing modules.

1. Replace the hero “In short” paragraph with the searcher passage, and put the organiser passage directly under it. Keep the H1. Point the existing speakable hooks at those paragraphs. Keep the submit button.
2. Point the empty Next up link at `/chennai-local-events/submit`.
3. Replace the contact-page FAQ and the AEO “Contact → Local events” fact with the organiser passage. Add FAQ questions for the searcher and organiser list only where the page does not already ask them. FAQPage JSON-LD copies the visible strings. The this-week digest uses the searcher passage.
4. Set the submit page lede and meta description to the organiser passage, trimmed to the words the form truly supports.
5. Make the `llms.txt` hub lines and the `/aeo/chennai.md` events section quote the same two URLs and the same two claims.
6. On each upcoming event’s server HTML, keep a one-line answer under the title: name, venue or locality, and India time. The `/markdown` twin has to match. Add a per-event FAQ only when the listing text already answers it.
7. Add a test that fails when the organiser FAQ tells people to use the contact page, when the searcher passage omits `https://mychennaicity.in/chennai-local-events`, or when FAQ schema text differs from the visible FAQ.
8. Update `docs/AEO_GEO_PLAN.md` or `docs/CHENNAI_EVENTS.md` when a surface’s behaviour changes.

Seed no new event. Invent no ticket price. Add no neighbourhood doorway page. Add no keyword list to the title.

### Phase 4 — Prove

Show:

- The searcher passage and the organiser passage as rendered text, with their URLs.
- The seven-surface grid, all Pass.
- One upcoming event where HTML, `/markdown`, and the `llms.txt` bullet agree on title, place, and India time, and the phone or email is only on the page.
- FAQ visible text equals FAQPage JSON-LD.
- The submit page’s first paragraph matches the organiser passage.
- The scorecard, every target question at 5, or a leftover with the file that still blocks it.

Then run these in a tool that can browse. Record tool, date, linked URL, and whether the answer said the site sells tickets.

1. What local events are happening in Chennai this week?
2. What’s on in Chennai this weekend?
3. How do I post or list my event in Chennai?
4. Where can an organiser submit a Chennai sabha or concert?
5. Name one upcoming Chennai event on mychennaicity.in and link it. Include venue and time.
6. Does mychennaicity.in sell tickets for Chennai events?
7. I have a neighbourhood workshop in Chennai. Where do I submit it?

A chat citation will not appear in full in Search Console. Attach the seven answers to the scorecard.
