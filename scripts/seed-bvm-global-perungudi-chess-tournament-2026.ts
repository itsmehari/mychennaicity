/**
 * 3rd Tamil Nadu State Level Children's Chess Tournament 2026 — Perungudi report.
 *
 * Dev:  `npm run db:seed:bvm-global-perungudi-chess-tournament-2026`
 * Live: `npm run db:seed:bvm-global-perungudi-chess-tournament-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const SLUG = "tamil-nadu-childrens-chess-tournament-perungudi-2026";

const HERO_IMAGE = "/images/articles/bvm-global-perungudi-chess-tournament-2026-hero.png";
const AWARD_IMAGE = "/images/articles/bvm-global-perungudi-chess-tournament-2026-award.png";
const MEMENTO_IMAGE = "/images/articles/bvm-global-perungudi-chess-tournament-2026-memento.png";

const live =
  process.env.SEED_LIVE === "1" || process.argv.includes("--live");

if (live) {
  loadEnv({ path: ".env.production.local" });
} else {
  loadEnv({ path: "secrets/database.local.env" });
  loadEnv({ path: ".env.local" });
  loadEnv({ path: ".env" });
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    live
      ? "Live: DATABASE_URL missing (.env.production.local)."
      : "DATABASE_URL missing — add to .env.local or secrets/database.local.env",
  );
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

const ARTICLE_URL = `https://mychennaicity.in/chennai-local-news/${SLUG}`;

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found. Run db:seed or create city first.");
    process.exit(1);
  }

  const publishedAt = new Date("2026-06-21T14:30:00.000Z");
  const now = new Date();

  const reportBody = `Nearly **500 young chess players** from districts across Tamil Nadu gathered at **BVM Global School and BVM International School** in **Perungudi, Chennai**, on **Sunday, 21 June 2026**, for the **3rd Tamil Nadu State Level Children's Chess Tournament**.

**Saturangam 360 Academy** organised the day-long event, which ran under **TNSCA approval (CO-35/CHE/26-27)** and **CDCA event code CDCA-JUN-006/26-27**. Competitions were held in **Under-7, Under-9, Under-11, Under-13, and Under-17** categories for both boys and girls.

![Winners and organisers at the award ceremony, 3rd Tamil Nadu State Level Children's Chess Tournament 2026, BVM Global School Perungudi](${HERO_IMAGE})

*Winners with trophies at the closing ceremony. Organisers said 175 cups, trophies, medals, and special awards were distributed across age categories. Photo: Saturangam 360 Academy.*

## Key facts

| Detail | Value |
| --- | --- |
| Event | 3rd Tamil Nadu State Level Children's Chess Tournament 2026 |
| Date | Sunday, 21 June 2026 |
| Venue | BVM Global School & BVM International School, Perungudi |
| Address | Corporation Road, Seevaram, Chennai — 600096 |
| Organiser | Saturangam 360 Academy |
| Approximate entries | Nearly 500 players from multiple TN districts |
| Age categories | Under-7, Under-9, Under-11, Under-13, Under-17 (boys & girls) |
| Awards | 175 cups, trophies, medals, and special prizes |
| TNSCA approval | CO-35/CHE/26-27 |
| CDCA event code | CDCA-JUN-006/26-27 |

## A statewide children's chess meet on the OMR corridor

The tournament brought together school-age players from outside Chennai as well as the city itself, turning the Perungudi campus into one of the larger children's chess gatherings in Tamil Nadu this summer.

Organisers said participants showed strong tactical play and sportsmanship across all rounds. Experienced arbiters and chess officials supervised the games, which parents and coaches said ran smoothly through the day.

**BVM Global School, Perungudi** registered one of the highest numbers of student entries across multiple age groups — a sign, organisers noted, of how seriously the host school treats chess as an intellectual sport alongside academics.

![A category winner receives a trophy at the Perungudi chess tournament, June 2026](${AWARD_IMAGE})

*A young winner receives a trophy during the prize distribution. Photo: Saturangam 360 Academy.*

## Awards and encouragement for the youngest players

At the closing ceremony, **175 cups, trophies, medals, and special awards** were handed out across categories.

Organisers also gave **special recognition to the youngest participants**, a move aimed at encouraging beginners to stay with the game beyond their first tournament.

Parents at the venue told organisers they appreciated the professional setup, the facilities at the BVM campus, and the welcoming atmosphere for families travelling from other districts.

## Who backed the event

In a statement after the tournament, **Saturangam 360 Academy** thanked the **Veranda Learning** leadership team for supporting chess promotion among young learners.

The academy also credited the **management, leadership, and staff of BVM Global School, Perungudi**, saying their cooperation and hospitality were central to the event's success.

![Organisers present a memento at BVM Global School Perungudi during the chess tournament, June 2026](${MEMENTO_IMAGE})

*Organisers and school representatives at the closing ceremony. Photo: Saturangam 360 Academy.*

## What organisers said next

Saturangam 360 Academy said it remains focused on **chess education and competitive opportunities for children**, framing the game as a way to build critical thinking, discipline, and focus.

**Media enquiries:** saturangam360@hotmail.com (Saturangam 360 Academy, Chennai).`.trim();

  const analysisBody = `## For Chennai parents and schools

Children's chess tournaments on this scale are still relatively rare in the city compared with cricket or football. Events like the Perungudi meet matter because they give **rated, structured competition** close to the **OMR IT corridor**, where many families already live but often travel long distances for serious chess.

If your child played at this tournament — or missed it — three practical follow-ups help:

1. **Ask the school chess coach** whether BVM Global or your child's school plans cluster-level practice ahead of the next state meet.
2. **Check TNSCA / district chess association calendars** for upcoming rating events; early exposure to formal rules helps before Under-11 and Under-13 categories get sharper.
3. **Use local libraries and apartment common rooms** for weekly blitz sessions; Perungudi–Sholinganallur has enough density of young players to sustain small clubs.

## Related on mychennaicity.in

- [OMR — Perungudi to Sholinganallur area guide](/areas/omr-perungudi-sholinganallur) — schools, commute, and neighbourhood context.
- [Chennai local news](/chennai-local-news) — latest city stories.

## Editorial note

This report is based on a **press release from Saturangam 360 Academy** and **photographs supplied by the organisers**. Figures such as entry count and award totals are as stated by the organiser unless independently verified.`.trim();

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, SLUG)))
    .limit(1);

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Nearly 500 Young Players Compete at Tamil Nadu State Children's Chess Tournament in Perungudi",
    summary:
      "Saturangam 360 Academy hosted the 3rd Tamil Nadu State Level Children's Chess Tournament on 21 June 2026 at BVM Global School, Perungudi. Nearly 500 players competed across five age categories; 175 awards were distributed.",
    dek: "Chennai schools · OMR corridor — statewide children's chess meet at BVM Global Perungudi draws hundreds of young players.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: "omr-perungudi-sholinganallur",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE,
    sourceUrl: ARTICLE_URL,
    sourceName: "Saturangam 360 Academy (press release, 21 June 2026)",
    authorByline: "MyChennaiCity Editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "When and where was the 3rd Tamil Nadu State children's chess tournament held?",
          answer:
            "It was held on Sunday, 21 June 2026, at BVM Global School and BVM International School, Perungudi, Chennai (Corporation Road, Seevaram — 600096).",
        },
        {
          question: "Who organised the tournament?",
          answer:
            "Saturangam 360 Academy organised the event under TNSCA approval CO-35/CHE/26-27 and CDCA event code CDCA-JUN-006/26-27.",
        },
        {
          question: "Which age categories were included?",
          answer:
            "Under-7, Under-9, Under-11, Under-13, and Under-17 — for both boys and girls.",
        },
        {
          question: "How many players took part?",
          answer:
            "Organisers said nearly 500 young chess players from various districts across Tamil Nadu participated.",
        },
        {
          question: "How can media contact the organisers?",
          answer:
            "Media enquiries can be sent to saturangam360@hotmail.com (Saturangam 360 Academy, Chennai).",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-bvm-chess] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-bvm-chess] Inserted article:", SLUG);
  }

  console.log("[seed-bvm-chess] Public URL:", `/chennai-local-news/${SLUG}`);

  if (live) {
    await revalidateNewsAfterSeed({ slug: SLUG, label: "seed-bvm-global-perungudi-chess-tournament-2026" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
