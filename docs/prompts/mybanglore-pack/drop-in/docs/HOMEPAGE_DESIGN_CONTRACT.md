# Homepage design contract

The page should feel like mychennaicity.in on first glance: a warm editorial city magazine with a product-style hero, not a portal from 2014 and not a SaaS landing page.

Reference feelings to hit:

- Paper background, white cards, hairline borders, generous radius.
- One teal for links and the header stripe. One terracotta for the explore button and a few card tops. Forest green and mustard live inside the hero only.
- Small tracked eyebrows, bold tight titles, light muted decks.
- Sticky frosted header. Dark fat footer with a teal top rule.
- Mobile first. The hero search stacks. The tool row scrolls sideways. Nothing depends on hover to be usable.

## Tokens

Put these in `public/assets/css/tokens.css` on `:root`.

Light:

- `--background: #faf8f5`
- `--foreground: #14121a`
- `--muted: #5c5866`
- `--surface: #ffffff`
- `--border: #e8e4dc`
- `--home-section-border:` mix of foreground 14% into border
- `--accent: #0d6e6e`
- `--accent-hover: #0a5757`
- `--accent-fg: #f4fffe`
- `--accent-warm: #c45c3a`
- `--footer-bg: #1a1724`
- `--footer-fg: #f4f2fa`
- `--footer-muted: #a8a1ba`
- `--footer-elevated: #242030`
- `--footer-border: #38344a`
- `--footer-link-hover: #7fd9d1`
- Hero only: `--hero-bg: #153529`, `--hero-mustard: #c9a227`, `--hero-mustard-dim: #a6841c`

Dark (`prefers-color-scheme: dark`):

- `--background: #0c0b10`
- `--foreground: #f2f0f7`
- `--muted: #a39eb5`
- `--surface: #15141c`
- `--border: #2a2836`
- `--accent: #3ec9c0`
- `--accent-hover: #5fd9d0`
- `--accent-fg: #051312`
- `--accent-warm: #e07a5f`
- Footer shifts slightly darker. The hero slab stays forest green in both themes.

Body: background `--background`, colour `--foreground`, Geist Sans, 16px base. Selection uses the accent at low opacity. Focus visible is a 2px accent outline, offset 2px. On the footer, focus uses the mint hover colour.

## Type

- Eyebrow: 11px, weight 600, uppercase, tracking `0.22em`, colour muted. Warm eyebrows on the explore band use `--accent-warm` and tracking `0.28em`.
- Display title: weight 700, tracking `-0.02em`.
- Deck / lede: weight 300, colour muted.
- Hero H1: `clamp(1.45rem, 3.6vw, 2.5rem)`, weight 700, line-height 1.14, white. The plain parts of the sentence are weight 300 at 75% white. The bold phrase is full white. The domain, when shown, is mustard.
- Section H2: 1.5rem, 1.875rem from 640px.
- Explore H2 is the only serif: Source Serif 4, about `clamp(1.65rem, 3vw, 2.15rem)`, colour `#0f2f28` (light) or a pale green (dark).

## Layout

- Header inner max width 1536px. Page content max width 1280px. Horizontal padding 16px, 24px from 640px.
- Homepage sections sit in frames: top border `--home-section-border`, padding-top 48px, 64px from 640px. `scroll-margin-top: 7rem` on anchors.
- A frame may contain an inner rule (same idea, 75% border) between jobs, events, and directory.
- Cards: radius 1rem to 1.25rem, border `--border`, surface fill, hover lift of 3px and a soft shadow on bento tiles. Transition 200ms.
- Pills: full radius, 14px type, semibold, border, small shadow.

## Header

Sticky, top 0, z-index above the page. Frosted white surface (about 78–92% opacity plus `backdrop-filter: blur`). Bottom border `--border`. **3px solid accent stripe on the very top.** A 1px accent sheen under that stripe.

Row, max 1536px:

1. Brand: rounded square 44–48px, accent fill, letters **MB**, accent-fg text. Wordmark `mybanglore` and a quiet line “News · directory · jobs · local events” (hide the quiet line below 1280px, hide the wordmark below 640px).
2. Desktop mega nav: News, Explore, Areas, Work. Each opens a panel (surface, soft mesh of accent and terracotta, rounded link cards). News panel can list the latest three published headlines when they exist.
3. Right cluster: Contact pill (accent tint), WhatsApp pill (green tint, links to `/whatsapp-community/join`), search icon that opens a site search form, hamburger below 768px.

Mobile drawer lists the same four groups. Close on navigation.

## Footer

`margin-top` about 5rem. Background `--footer-bg`. **4px accent top border.** A faint accent wash at the top of the slab.

1. Elevated card: eyebrow “Backup navigation”, display line “Everything worth a second click — without scrolling the home page again.” Buttons: Top story (accent pill), Email digest (ghost), WhatsApp community (green ghost → join form).
2. Brand column: MB tile, `mybanglore.in`, one sentence covering Greater Bengaluru from the petes and Basavanagudi to Whitefield, Electronic City, and Yelahanka. One line that map pins are for browsing, not a cadastral survey.
3. Link columns: News, Discover, Areas, Work, Company, Legal. Plus a row of small topic pills (Metro, Traffic, Jobs, Whitefield, Weekend).
4. Bottom line: copyright year, city desk name, link to editorial standards.

## Homepage order (do not reorder)

Wrap everything after the hero in `max-width: 1280px`.

### 1. Hero

Full-bleed inside the page padding (16px, more on large screens), radius `2rem`, forest background, 1px mustard-tinted border, large soft shadow. A faint mustard radial blob in the top-right corner.

Two columns from 1024px. Left: copy and search. Right: photograph.

Left stack:

- Eyebrow, 10–11px, uppercase, tracking ~0.2em, white at 55%.
- H1 as in Type.
- Deck, 14–16px, weight 300, white at 70%.
- Search row: pill input (white at 10%, white border at 20%), pill select, mustard submit button with near-black text `#1a1a1a`. Stacks on small screens. Min height 44px, 48px from 640px.
- Text links under the form: primary mustard, secondary white at 60%, separated by a dim pipe.
- Tip line, 12–14px, white at 55%. The word Tip is semibold white.

Right: photo with an asymmetric radius — large rounding on the top-left and bottom-right, square on the other two corners: `clamp(1.25rem, 4vw, 3rem) 0 clamp(1.25rem, 4vw, 3rem) 0`. Mobile aspect 2/1, max height about 210–230px. Desktop height `min(480px, 47svh)`, between 280px and 520px. A mustard stat card overlaps the lower-left of the photo, square on the bottom-left, rounded on the top-right. It shows a label, a short value, and a hint. Values may be the words “Live” or “As published”. Do not invent a number.

Under the grid, a darker strip holds **four tabs** in a row (one column on very small screens, two from 640px, four from 1024px). Each tab: icon in mustard, bold title, one-line deck, the word More with a mustard underline. The active tab is a white card with a mustard border. Inactive tabs are white at about 95% with a faint border.

Tabs, in order:

| Key | Card title | Intent |
| --- | --- | --- |
| news | Local news | Opens Bengaluru local news, optional topic |
| events | Things to do | Opens the events hub |
| directory | Places & services | Opens the directory |
| jobs | Bengaluru jobs | Opens the jobs hub |

The hero auto-advances every 7 seconds. Pause while the pointer is over the hero. Stop entirely when reduced motion is requested. Changing tab resets the search box and the filter.

Slide copy (use this voice; you may tighten a line, do not turn it into a slogan):

1. News. Eyebrow “News you can use”. Before: “See what’s happening in”. Bold: “your part of Bengaluru”. After: “— in clear language, on”. Then the mustard word **mybanglore.in**. Deck: traffic, Namma Metro, civic notes, and everyday costs. Tip: the desk covers the whole city, from Basavanagudi and Majestic to Whitefield and Electronic City. Filter topics: City & civic, Travel & Metro, Shops & prices, Weather & civic alerts. Submit “Open news”. Stat label “Story cadence”, value “As published”.
2. Events. Eyebrow “Things to do”. Bold phrase “festivals, concerts, and local meets”. Deck mentions weekend markets, talks, and community gatherings, then the map below. Submit “See events”. Secondary link jumps to `#areas`.
3. Directory. Bold phrase “schools, hospitals, food, and transit”. Deck: a number, a location, or a starting point. Tip mentions the neighbourhood hubs. Submit “Open directory”. Secondary “List your business” → `/contact`. Stat value is the count of area hubs once they exist (start at 12), label “Area hubs”.
4. Jobs. Bold phrase “open roles”. After: “in offices, shops, IT, sites, and daily work — free to read.” Deck: office hiring and local hiring sit on the same list. The resident still applies with the employer. Filter: All jobs, Mostly office, Hybrid, Remote-friendly. Many shop, site, and delivery roles are simply “All jobs”. Submit “View jobs”. Secondary “Post a job” → `/contact`.

Hero photos, until the operator supplies files: a credited photograph of Namma Metro, one of Vidhana Soudha or Lalbagh, one of a real neighbourhood street. Store under `public/assets/images/hero/`. Alt text names the place. If a photo is missing, use a flat forest panel, not a random remote image.

### 2. Trust strip

Three equal cards. Radius 1rem. Centered text on mobile, left-aligned from 640px.

- Access — “Free to browse — no paywall on public discovery.”
- Trust — link “Editorial standards & corrections”.
- Mobile — “Built for mobile Bengaluru — fast pages, clear type.”

Eyebrow on each card is 10px, accent, tracking 0.2em: Access, Trust, Mobile.

### 3. Everyday tools

Eyebrow “Everyday tools”. Title “Tools Bengaluru uses”. Deck names the five jobs of the row. Action “All civic tools” may go to a short `/civic-tools` index that links onward.

A thin horizontal scroller of five cards (grid of five from 640px). Each card: bold label, muted one-line dek. v1 labels:

- Afford this area — “Your pay vs your rent”
- Commute and Metro — “Bus, Metro, and the long roads”
- Water — “Cauvery, borewell, tanker”
- Khata and tax — “PIN, khata, and the tax bill”
- Bengaluru today — “One story, one event, the date”

Each page in v1 is an honest explainer. Rent math uses only numbers the resident types. The commute page names Namma Metro, BMTC, the Outer Ring Road, and Silk Board, and links to the official Metro and bus sites. It does not show live traffic. The water page explains Cauvery supply, borewells, and tankers, and links to BWSSB. It does not quote a tanker rate. The khata page explains that a PIN code, a khata or PID, and a property-tax bill are different records. It does not look up a property. Bengaluru today shows the date, the latest story or “none filed”, the next event or “none listed”, and outbound links for Metro and BESCOM. BESCOM is a link on that card, not its own lead tool. Do not scrape outages, forecasts, or fares.

Above the row, a slim “this weekend” pin is allowed when a real event exists. Hide it when the calendar is empty.

### 4. Explore Bengaluru

A band with background `#eceae5` (light) and a deep green mix (dark), radius `2rem`, generous padding.

Two columns. Left: a 4/3 photograph in a white 3px frame (Vidhana Soudha or an equivalent civic landmark) and a smaller square inset overlapping the bottom-right (Lalbagh glasshouse, a temple gopuram, or a market). Right:

- Warm eyebrow “Explore Bengaluru”.
- Serif title: “Your map to Bengaluru and nearby — neighbourhoods, news, and everyday city life.”
- A left terracotta border quote: one place for jobs, events, civic notes, and listings.
- A muted paragraph naming real ends of the city (Basavanagudi and Majestic to Yelahanka, Whitefield, and Electronic City).
- Six checks with green round ticks (`#2d6a4f`): schools and colleges; hospitals and clinics; meals and coffee; parks and lakes; civic services; Metro, BMTC, and the commute.
- Terracotta button, uppercase, tracking 0.2em: “Discover more” → `/directory`.

### 5. Zone shortcuts

Eyebrow “Macro hubs”. Title “Zone shortcuts”. Deck: “Jump straight into macro hubs — same destinations as the map below.” Action “Skip to map” → `#areas`.

Horizontal pills, wrap from 640px. Twelve hubs. Whitefield and Electronic City stay separate. One pin cannot stand for both ends of the city.

1. Malleswaram · Rajajinagar — `/areas/malleswaram-rajajinagar`
2. Majestic · Chickpet · KR Market — `/areas/majestic-chickpet`
3. Indiranagar · HAL · Domlur — `/areas/indiranagar-hal-domlur`
4. MG Road · Shivajinagar — `/areas/mg-road-shivajinagar`
5. Basavanagudi · Chamarajpet — `/areas/basavanagudi-chamarajpet`
6. Jayanagar · JP Nagar · Banashankari — `/areas/jayanagar-jp-nagar`
7. Koramangala · HSR · BTM — `/areas/koramangala-hsr-btm`
8. Sarjapur · Bellandur — `/areas/sarjapur-bellandur`
9. Whitefield · Marathahalli · KR Puram — `/areas/whitefield-marathahalli`
10. Electronic City · Bommanahalli — `/areas/electronic-city-bommanahalli`
11. Hebbal · Yelahanka — `/areas/hebbal-yelahanka`
12. Jalahalli · Peenya · Yeshwanthpur — `/areas/jalahalli-peenya-yeshwanthpur`

Blurbs are one sentence a resident would accept. No population figures and no typical rents.

### 6. Map

Anchor `areas`. Eyebrow “Explore”. Title “Interactive Bengaluru map”. Deck: editorial pins for the twelve hubs; confirm boundaries on official city maps before any planning or legal use. Action “Browse all listings” → `/directory`.

Leaflet, centre `12.9716, 77.5946`, zoom about 11. Circle markers for the twelve hubs, popup with name and link. OSM attribution visible. Height about 420px, radius 1.25rem, border. If JavaScript is off, the zone pills above still work.

### 7. Stats ribbon

One rounded panel, three cells: Open jobs, Upcoming events, Published stories. Icon in a small gradient tile (accent, and terracotta for events). Numbers come from SQL counts of **open jobs**, **scheduled events that have not ended**, and **published articles**. Zero is allowed. Do not add a fake baseline.

### 8. Classifieds spotlight

Render only when at least one public classified exists. Until then, omit the block. When present: eyebrow, title, three cards, link to `/bengaluru-classifieds`.

### 9. Jobs spotlight

Omit when there are zero open jobs. When present: eyebrow “Careers”, title “Jobs spotlight”, deck with the live count and today’s date in India long form (for example 5 November 2026). “Read the full post on mybanglore.in — apply on the employer’s site when listed.” Action “Browse Bengaluru jobs”. Cards show title, area, and work style. No invented salary.

### 10. Featured events

Omit when empty. Eyebrow “Calendar”. Title “Featured events”. Deck asks the reader to confirm time, venue, and tickets on the listing. Action “All local events”.

### 11. Directory teaser

If listings exist: eyebrow “Directory”, title “Places & services on mybanglore.in”, three cards with a 4px terracotta top border, “View listing →”. If none exist: title “List your business” and a dashed empty panel pointing at `/contact#directory`. The empty panel **stays** — it is the honest state, unlike jobs and events which hide.

### 12. Trending topics

Eyebrow “Discover”. Title “Trending topics”. Pills that are real links: Metro, BMTC, Rent, Water, Jobs, Basavanagudi, Bellandur, Weekend. Each pill goes to a topic, area, or hub that exists. Hover lifts 2px.

### 13. News bulletin

A white rounded panel. Two stacked sections separated by a home rule.

- “News bulletin” — latest published stories. Empty copy: “Stories will appear here as they are filed.” plus a link to the news hub. Do not fill with sample headlines.
- “Editor's picks” — featured stories, or the latest three when none are featured. Cards: 16/10 image, category, date in `en-IN` with `Asia/Kolkata`, title, one-line dek. Desktop hover may reveal a longer line. Mobile shows the line without hover.

### 14. City pulse

Eyebrow “Infra & civic”. Title “City pulse”. A divided list, each row a link with a round arrow that fills accent on hover. v1 rows link to the commute guide, the water guide, the khata guide, BMTC, and Bengaluru Traffic Police only when the page exists. If a row has no destination yet, leave it out.

### 15. Seasonal band

One timely block (monsoon lakes, a festival week, a public exam calendar). Forest or deep surface, mustard eyebrow, white title, two buttons. GSAP fades it in on scroll. Reduced motion shows it already visible. If nothing timely is true, use a quiet “How this desk works” band linking to `/about` and `/editorial-standards` — do not invent a festival.

### 16. Sources and roadmap

Eyebrow “Editorial note”. Title “Sources & roadmap”. Deck: “Nothing here is a paid sponsor yet — we label commercial partners clearly when they appear.” Two cards: one external (an official city or metro source, labelled External) and one internal (editorial standards, labelled Editorial).

### 17. Community

Eyebrow “Community”. Title “Stay in the loop”. A WhatsApp banner that goes to the join form. Then a split card: weekly digest form (name + email, stored, no third-party script required in v1) and a join card. Under that, a short “Who this site is for” strip: residents, people who just moved, employers listing a role.

### 18. Footer

As specified above.

## Interior pages (so the homepage is not a one-off)

Same header, footer, tokens, and type. Interior width can stay 1280px. A left-aligned serif or sans H1, a one-sentence dek, then the list. Breadcrumb above the title. Empty hubs explain how an item gets published (`/contact`) and do not show fake cards.

## Motion

- Hero crossfade or instant swap of copy. 7s. Pause on hover.
- Card hover: translateY(-3px).
- Seasonal band: GSAP only.
- Respect `prefers-reduced-motion`.

## Do not

- Do not use a purple-blue “tech city” palette.
- Do not use stock illustrations of flat people.
- Do not put a giant “Welcome to the Silicon Valley of India” headline in the hero.
- Do not carousel the whole homepage.
- Do not add a chatbot.
