/**
 * BNI Vetri — The CRORE MINDSET visitors day, reported from the two invitations.
 *
 * Dev:  `npm run db:seed:bni-vetri-crore-mindset-november-2026`
 * Live: `npm run db:seed:bni-vetri-crore-mindset-november-2026:live`
 *
 * Source is the chapter note and the two posters shared with this desk.
 * Do not turn “Crore Mindset” into a published income figure.
 * Hall, fee, and finish time are not on the invitations.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const SLUG = "bni-vetri-crore-mindset-visitors-day-november-2026";
const EVENT =
  "/chennai-local-events/bni-vetri-crore-mindset-visitors-day-november-2026";
/**
 * Same files as `public/images/articles/…`. The live page uses the GitHub
 * copy because the Vercel production deploy is failing, so `/images/…` 404s.
 */
const HERO =
  "https://raw.githubusercontent.com/itsmehari/mychennaicity/main/public/images/articles/bni-vetri-crore-mindset-visitors-day-november-2026.jpg";
const WOMEN =
  "https://raw.githubusercontent.com/itsmehari/mychennaicity/main/public/images/articles/bni-vetri-crore-mindset-women-entrepreneurs-november-2026.jpg";

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
    console.error("City slug 'chennai' not found.");
    process.exit(1);
  }

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, SLUG)))
    .limit(1);

  /** 13 Nov 2026, 2:40 p.m. IST */
  const publishedAt = new Date("2026-11-13T09:10:00.000Z");
  const now = new Date();

  const reportBody = `## Disclaimer

This is a MyChennaiCity report on a visitors morning called by BNI Vetri. The date, the time, and the contact come from the chapter’s invitations. It is not an official BNI notice. The hall has not been announced. Confirm the place with the organiser before you travel.

## Summary

**Chennai, 13 November 2026** — BNI Vetri will bring business owners together on **Wednesday, 25 November 2026**, for a visitors morning it has named **The Crore Mindset**. The sitting starts at **7:29 AM**.

The chapter is inviting entrepreneurs who want new relationships and referral work. Women who run businesses have a direct invitation to the same morning. People who want to attend can call **Riyaz Ahamed** on **77088 37509**.

The gathering is in Chennai. A hall has not been named yet.

![BNI Vetri Business Visitors Day, The Crore Mindset, Chennai, 25 November 2026](${HERO})

*BNI Vetri’s visitors morning, The Crore Mindset, is set for 25 November at 7:29 AM.*

## A morning for referrals

BNI, Business Network International, is a referral network. Members meet so that business owners and professionals can pass work to one another. The line the chapter uses for that habit is **Givers Gain**: help someone else’s business, and your own chances grow with it.

BNI Vetri says that is the work of its regular meetings, its business presentations, and its visitor sessions. The Crore Mindset is the next of those visitor mornings. The chapter’s own words for the day are to build connections, unlock opportunities, and grow a business, and to **connect, collaborate, and grow together**.

No speaker list has been released, and the chapter has not said how many people it expects in the room.

## Women entrepreneurs are invited

The chapter has also addressed the morning to women entrepreneurs, under the line **She leads. She connects. She grows.**

The invitation tells them their ambition deserves a stronger network: meet other business owners, look for referrals, and build relationships that help the business grow. It closes with a plain ask. Step forward. Build connections. Grow your business.

Registration for that invitation is the same call, to Riyaz Ahamed on 77088 37509. The chapter has put both invitations on one date and one clock, so they are one morning.

![Women entrepreneurs are invited to BNI Vetri’s Crore Mindset morning on 25 November](${WOMEN})

*Women entrepreneurs are invited to the same visitors morning.*

## How to attend

Call **77088 37509** and ask Riyaz Ahamed for the building. Also ask whether a visitor pays, and what time the morning ends. Neither has been announced. The name of the morning is The Crore Mindset. The chapter has not tied that name to any figure for turnover or income.

A listing, with the date and the phone number, is on the [events page](${EVENT}).

## Fact box

| Detail | As announced |
| --- | --- |
| What | The Crore Mindset, BNI Vetri Business Visitors Day |
| When | Wednesday 25 November 2026, 7:29 AM |
| Where | Chennai. Hall yet to be announced |
| Who | Business owners, with a direct invitation to women entrepreneurs |
| Contact | Riyaz Ahamed, 77088 37509 |

## Key takeaways

- BNI Vetri’s visitors morning, The Crore Mindset, is on Wednesday 25 November 2026 at 7:29 AM.
- The chapter wants business owners in the room to exchange referrals and build relationships.
- Women entrepreneurs have their own invitation to that same morning.
- Register with Riyaz Ahamed on 77088 37509, and ask him for the hall.

## Fine print

This report was drafted with AI assistance and checked against the BNI Vetri invitations shared with MyChennaiCity. AI can miss a line. Confirm the hall with the organiser before you go.`.trim();

  const analysisBody = "";

  const body = `BNI Vetri will host The Crore Mindset, a business visitors morning, in Chennai on Wednesday 25 November 2026 at 7:29 AM. Women entrepreneurs are invited to the same sitting. Enquiries: Riyaz Ahamed, 77088 37509.`;

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "BNI Vetri invites Chennai business owners to The Crore Mindset on 25 November",
    summary:
      "The chapter’s visitors morning starts at 7:29 AM on Wednesday 25 November 2026. Women entrepreneurs are invited to the same sitting. Call Riyaz Ahamed on 77088 37509.",
    dek: "BNI Vetri is opening the morning to visitors who want referrals and new business relationships. The hall is still to be announced.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    status: "published" as const,
    publishedAt,
    featured: false,
    heroImageUrl: HERO,
    sourceUrl: `https://mychennaicity.in${EVENT}`,
    sourceName: "BNI Vetri invitation",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "When is BNI Vetri’s Crore Mindset visitors day?",
          answer:
            "Wednesday 25 November 2026 at 7:29 AM in Chennai. Ask Riyaz Ahamed what time it ends.",
        },
        {
          question: "Where is it?",
          answer:
            "Chennai. The hall has not been announced. Call Riyaz Ahamed on 77088 37509 before you travel.",
        },
        {
          question: "Who can attend?",
          answer:
            "Business owners and professionals. Women entrepreneurs have a direct invitation to the same morning.",
        },
        {
          question: "How do I register?",
          answer:
            "Call Riyaz Ahamed on 77088 37509. Ask for the hall, and whether a visitor pays.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-bni-vetri-news] Refreshed:", SLUG);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-bni-vetri-news] Inserted:", SLUG);
  }

  console.log(
    "[seed-bni-vetri-news] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-bni-vetri-news",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
