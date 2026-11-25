# Music artist page — design guide

**Use this file** when you add a musician or change `/music/artist` or `/music/artist/[slug]`.

**Also read:** [`docs/CHENNAI_EVENTS.md`](../CHENNAI_EVENTS.md) §7 · Cursor rule [`.cursor/rules/music-artist-pages.mdc`](../../.cursor/rules/music-artist-pages.mdc)

Facts still come only from the printed sheet. This guide is how those facts are laid out. Both artists share one stage. A new musician is a new file in `src/content/music/artists/`, not a new page design.

**Component:** `ArtistStage` and `ArtistDirectoryList` in `src/components/music/artist-schedule.tsx`.

---

## Do not

- Do not render the dates as one vertical list.
- Do not build a one-off layout for a single artist.
- Do not invent a fare, a closing time, a street, a PIN, or a biography the sheet does not print.
- Do not repeat the full “no street / no fare” note on every card. That sentence lives once, under the hall stacks.
- Do not give an out-of-city date (`eventSlug: null`) a Chennai listing link.

Calendar end times stay three-hour holds. The card may say “held to” that time. The sheet did not print it.

---

## One stage, five readings

The page reads the same `concerts` array five ways. Skip a block only when that artist has nothing for it.

| Section | Layout | What it shows |
| --- | --- | --- |
| Hero | Magazine spread | Poster in a tall panel beside the name, role, summary, and ticket link. Counts: number of dates, number of halls, number of mornings (`startHour` before 12). First date to last date. |
| Path | Staggered rail | Every date in sheet order, alternating up and down. A date whose note contains `event label` uses the dark card. Each chip links to `#date-{id}` on the season board. |
| Featured | Bento | See the rule below. Large cards, uneven spans. The first card is the biggest. |
| Season boards | Month grids | One board per `YYYY-MM`. Dates the sheet marks with `event label` span the row. Morning cards sit lower than evening cards. This is the only place with `id="date-{id}"`. |
| Halls | Masonry | One stack per `venueName`, in the order the halls first appear. Taller stacks are halls with more dates. Each row links to the Chennai listing when `eventSlug` is set. |

Related links are cards, not a text list. The directory (`/music/artist`) uses poster tiles in an uneven grid, not equal text cards.

### Featured bento

1. If any concert note contains `event label`, those dates are the bento. Add the first other concert that has a `withLine`, so a named collaborator is not dropped.
2. If the sheet marks no date that way, use dates with `eventSlug: null`, then the first concert and the last concert. Cap the set at three.

Jayanthi’s sheet marks three dates “event” and names Anil Srinivasan once, so her bento is those four cards. Charumathi’s sheet marks none, so hers is the Hyderabad date plus the opening and closing concerts.

---

## Search

These come from the registry. A new artist file picks them up. Do not write a one-off title, FAQ, or footer link.

- Title, description, Open Graph, and Twitter: `musicArtistMetadata` in `src/content/music/search-copy.ts`. The description is the same sentence as the answer at the top of the page. H1 is `{Name} — concert schedule, Chennai`.
- Hub title is “Music season in Chennai”. The visible answer is `MUSIC_SEASON_PASSAGE`.
- JSON-LD: `Person` plus `MusicEvent` items, `FAQPage` with the same three questions, `BreadcrumbList`, and a hub `CollectionPage`. Chennai places use `PostalAddress` with Tamil Nadu and `IN`. Do not add `Offer`. Do not put the three-hour calendar hold in `endDate`.
- A linked Chennai event row is a `MusicEvent` whose performer URL is the artist page. It does not get an `Offer` from the ticket link.
- `llms.txt` and `/aeo/chennai.md` list the hub and every artist from `listMusicArtists()`.
- Sitemap already lists the hub and each artist.
- Footer Discover has one link, “Music season”, to `/music/artist`. Do not list every artist in the footer.
- Each sheet links the hub and the other artists automatically. Hand-written `related` links stay for Margazhi, festivals, and events.

## When you add an artist

1. Add `src/content/music/artists/{slug}.ts` and export it from `src/content/music/index.ts`.
2. Put only printed facts on each concert. `withLine` is null when the sheet names no one. `eventSlug` is null outside Chennai.
3. One poster under `public/images/music/`. `getEventPosterImage` already uses it for every linked event slug.
4. Seed Chennai rows from that file. Do not hand-build a second schedule in the seed.
5. Open both `/music/artist/{slug}` and an existing artist page. The sections must match. Only the facts change.
