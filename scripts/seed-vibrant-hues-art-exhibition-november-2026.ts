/**
 * Vibrant Hues at Art Cube Gallery — short What’s-On coverage.
 *
 * Dev:  `npm run db:seed:vibrant-hues-art-exhibition-november-2026`
 * Live: `npm run db:seed:vibrant-hues-art-exhibition-november-2026:live`
 *
 * Source: organiser poster (31 Oct–7 Nov 2026; 32 artists; paintings and sculptures).
 * Wall photographs supplied with the listing. Artist names are not printed on the poster.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const SLUG = "vibrant-hues-art-exhibition-virugambakkam-november-2026";
const EVENT =
  "/chennai-local-events/vibrant-hues-art-cube-gallery-virugambakkam-november-2026";
const HERO =
  "/images/articles/vibrant-hues-art-cube-gallery-virugambakkam-november-2026.png";
const WALL1 = "/images/articles/vibrant-hues-art-cube-gallery-wall-1.jpg";
const WALL2 = "/images/articles/vibrant-hues-art-cube-gallery-wall-2.jpg";
const SITE = "https://www.artcubegallery.biz";

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

  /** Sunday 1 November 2026, 1:30 p.m. IST — day two of the hang. */
  const publishedAt = new Date("2026-11-01T08:00:00.000Z");
  const now = new Date();

  const reportBody = `## Disclaimer

This is a MyChennaiCity listing note on a gallery exhibition in Virugambakkam. Dates, hours, artist count, and the venue address are taken from the Art Cube Gallery poster for **Vibrant Hues**. It is not a gallery press release or a review of every work on the wall. Hours and hang can change. Confirm at [artcubegallery.biz](${SITE}) or on **87545 55769** before you travel.

## Summary

**Chennai, 1 November 2026** — Art Cube Gallery in Virugambakkam is showing **Vibrant Hues — Celebration of life**, a week of paintings and sculptures by **32 artists**, through **Friday 7 November**.

The poster puts the run at **31 October to 7 November 2026**, **11:00 AM to 6:00 PM**. There is no printed ticket price, no named guest list, and no last-entry time.

The practical listing, with map and calendar, is on the [events page](${EVENT}).

![Art Cube Gallery poster for Vibrant Hues, Virugambakkam](${HERO})

*The organiser poster: Art Cube Gallery presents Vibrant Hues, paintings and sculptures, 31 October to 7 November, 11 AM to 6 PM.*

## What is on

This is a neighbourhood gallery hang, not a trade fair. The poster’s own line is **celebration of life**. The two rooms photographed this week mix framed oils and watercolours with wood relief, circular canvases, and a few sculptural pieces on a low plinth.

One wall leans toward temple streets, a Ganesha panel, a seated Buddha, and a shivalingam study. Another hangs three round canvases over portrait and lotus works. The poster does not name the 32 artists, so this note does not invent a roll call.

![Paintings and wood relief on the main wall at Art Cube Gallery](${WALL1})

*The main hang this week: framed paintings, a gold-ground portrait, and carved wood reliefs.*

![Circular canvases and portraits on a second wall](${WALL2})

*A second wall of round canvases, portraits, and a lotus study.*

## Where to go

**Art Cube Gallery**, Plot No. 13, 2nd Street, Elango Nagar, Virugambakkam, Chennai 600092. The poster prints **Chennai 92**. The gallery site is [artcubegallery.biz](${SITE}). The printed phone is **87545 55769**.

Virugambakkam sits west of Kodambakkam. The poster does not print parking, Metro, or bus notes. Ask the gallery if you are driving.

## If you are going this week

- Remaining days: **today through Friday 7 November 2026**
- Hours on the poster: **11:00 AM to 6:00 PM**
- Media: paintings and sculptures; **32 artists** named as a count, not as a list
- Ticket: **not printed** — ask at the desk
- Listing: [Vibrant Hues on the events hub](${EVENT})

## Fine print — AI-assisted authoring

This note was drafted with AI assistance and checked against the gallery poster and wall photographs supplied for the listing. AI can err. Cross-check dates, hours, and any entry fee with Art Cube Gallery before you go.`.trim();

  const analysisBody = `## Why this is a short listing, not a review

City event desks usually print the hang, the hours, and the door. They do not grade every canvas from a photograph. Vibrant Hues is a week-long group show in a west Chennai gallery. The useful facts are the dates, the 11-to-6 clock, the 32-artist count, and the Elango Nagar address. The rest belongs at the desk on 2nd Street.`;

  const body = `${reportBody}

${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, SLUG)))
    .limit(1);

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Vibrant Hues is up in Virugambakkam: 32 artists, through 7 November",
    summary:
      "Art Cube Gallery is showing paintings and sculptures from 31 October to 7 November 2026, 11 AM to 6 PM, at Elango Nagar, Virugambakkam. The poster names 32 artists and does not print a ticket price.",
    dek: "A week-long group hang on 2nd Street — the hours and the artist count are on the gallery poster; the names are not.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO,
    areaHubSlug: "kodambakkam-t-nagar",
    sourceUrl: SITE,
    sourceName: "Art Cube Gallery",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "When is Vibrant Hues on in Chennai?",
          answer:
            "Friday 31 October to Friday 7 November 2026, 11:00 AM to 6:00 PM IST, at Art Cube Gallery, Plot No. 13, 2nd Street, Elango Nagar, Virugambakkam, Chennai 600092.",
        },
        {
          question: "Is there a ticket price?",
          answer:
            "The gallery poster does not print a ticket price. Ask at the desk or on 87545 55769.",
        },
        {
          question: "How many artists are showing?",
          answer:
            "The poster says 32 artists, in paintings and sculptures. It does not print a named list.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-vibrant-hues-art-exhibition] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-vibrant-hues-art-exhibition] Inserted article:", SLUG);
  }

  console.log(
    "[seed-vibrant-hues-art-exhibition] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-vibrant-hues-art-exhibition",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
