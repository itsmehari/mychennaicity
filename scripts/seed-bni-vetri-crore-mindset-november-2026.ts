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

This is a MyChennaiCity report on a business visitors morning called by BNI Vetri. The date, the clock, the contact name, and the wording are taken from two invitations and a short note the chapter shared with this desk. It is not an official notice from BNI or from BNI Vetri. The hall is not on those pages. Confirm the place, the close, and any fee with the organiser before you travel.

## Summary

**Chennai, 13 November 2026** — BNI Vetri has invited business owners to a visitors morning it is calling **The Crore Mindset**. The date on both posters is **Wednesday, 25 November 2026**. The time printed on both is **7:29 AM**.

The place is given only as **Chennai**. Neither poster names a hall, a street, or a hotel. Neither poster prints a ticket price or a finish time.

Enquiries and registration are directed to **Riyaz Ahamed** on **77088 37509**.

A practical listing is on the [events page](${EVENT}).

![BNI Vetri poster for The Crore Mindset Business Visitors Day, 25 November 2026 at 7:29 AM](${HERO})

*The visitors-day poster. It names the morning, the date, and Riyaz Ahamed. It does not name a hall.*

## What the invitation is asking people to do

The visitors-day poster is addressed to entrepreneurs. Its own line under the title is **BNI Vetri Business Visitors Day**. The sentence underneath is short: build connections, unlock opportunities, grow your business.

The chapter’s note, sent with the posters, describes the morning as a chance to meet business owners, look for referrals, and build relationships. The close it wants remembered is **Connect. Collaborate. Grow together.**

That is the whole public programme. There is no speaker list, no agenda of presentations, and no count of members or visitors.

## A second poster, for women entrepreneurs

The same date and the same 7:29 AM appear on a second poster. The line at the top is **An invitation to women entrepreneurs**. The headline under that is **She leads. She connects. She grows.** The red band repeats the event name, The Crore Mindset, and the black band under it again says BNI Vetri Business Visitors Day.

The body copy on that poster is more specific than the first. It says a person’s ambition deserves a stronger network, then: connect with business owners, discover referral opportunities, and build relationships that help the business grow. The last line is **Step forward. Build connections. Grow your business.**

The phone number at the foot is the same: Riyaz Ahamed, 77088 37509.

This desk is treating the two posters as one morning. Nothing on them says the women-entrepreneurs invitation is a separate sitting, a different hall, or a different fee.

![BNI Vetri invitation to women entrepreneurs for The Crore Mindset, 25 November 2026 at 7:29 AM](${WOMEN})

*The women-entrepreneurs poster. Same morning, same phone, a different headline.*

## What the chapter says it is

The note that came with the posters introduces BNI, Business Network International, as a referral network for entrepreneurs, business owners, and professionals. The philosophy it prints is **Givers Gain**: help other people grow their businesses, and opportunities for one’s own business follow.

On BNI Vetri itself, the note does not give a founding year, a member count, or a rupee total of referrals passed. It says the chapter regularly holds structured networking meetings, business presentations, visitor sessions, and networking events, and that those meetings are where people connect, look for collaborations, and exchange referrals.

That is a description of the chapter’s usual work. It is not a dated list of past meetings. No earlier date was supplied with these posters, so this report does not invent one.

## What the posters do not say

Three things a visitor usually needs are missing.

**The hall.** “Chennai” is the only place name. Until Riyaz Ahamed gives a building, the morning cannot be mapped.

**The close.** 7:29 AM is the start. There is no end. The [events listing](${EVENT}) holds the calendar to **10:00 AM** so the row does not vanish at the start time. That 10:00 AM is this site’s hold. It is not printed on the invitation.

**The fee.** Nothing on either poster says the morning is free, and nothing prints a price. Ask before you treat it as an open house.

The title needs the same care. **The Crore Mindset** is the name of the visitors day. The posters do not say that attendance produces a crore in turnover, referrals, or income. A crore is a unit of money. Here it is a slogan.

## Fact box

| Detail | What is printed |
| --- | --- |
| Event | The Crore Mindset — BNI Vetri Business Visitors Day |
| When | Wednesday 25 November 2026, 7:29 AM |
| Where | Chennai. No hall or street is printed |
| Finish | Not printed. This site’s calendar hold is 10:00 AM |
| Fee | Not printed |
| Contact | Riyaz Ahamed, 77088 37509 |
| Second poster | Invitation to women entrepreneurs, same date and time |

## Key takeaways

- BNI Vetri has called a visitors morning for Wednesday 25 November 2026 at 7:29 AM.
- Both posters say Chennai and do not name a hall.
- A second poster invites women entrepreneurs to the same clock and the same phone.
- No fee and no finish time are printed. The 10:00 AM on the events page is ours.
- “Crore Mindset” is the title of the morning, not a published income figure.

## Before you go

Call **77088 37509** and ask for the building, whether a visitor pays, what time the morning ends, and whether the women-entrepreneurs poster is the same sitting. The name on the poster for that call is **Riyaz Ahamed**.

## Fine print

This report was drafted with AI assistance and checked against the two BNI Vetri invitations and the note shared with MyChennaiCity. AI can miss a line or smooth a claim. Read the posters and confirm the hall with the organiser before you act on it.`.trim();

  const analysisBody = `## Analysis

The invitations are doing two jobs at once. One poster is a general visitors call. The other speaks to women who run businesses, with the same morning and the same registration number. The chapter’s note supplies the idea it wants associated with that morning: Givers Gain, which it explains as growth that comes from helping someone else’s business first.

What the pages do not do is turn that idea into a programme. There is no timetable, no list of trades in the room, and no figure for referrals the chapter has passed. The strongest commercial phrase on the posters, The Crore Mindset, is a title. A reader who arrives expecting a priced workshop, or a promise of a crore, is reading something the invitation does not actually say.

The useful question is the practical one. A 7:29 AM start is specific. A city with no hall is not. Until the address is given, this is a reported invitation, not a set of directions.`.trim();

  const body = `BNI Vetri has invited business owners to The Crore Mindset, a visitors morning on Wednesday 25 November 2026 at 7:29 AM in Chennai. The hall, the fee, and the finish time are not on the posters. Enquiries: Riyaz Ahamed, 77088 37509.`;

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "BNI Vetri calls a 7:29 AM visitors morning on 25 November. The hall is not on the invitation",
    summary:
      "The Crore Mindset is BNI Vetri’s business visitors day in Chennai on Wednesday 25 November 2026. A second poster invites women entrepreneurs to the same time. No hall, fee, or finish time is printed.",
    dek: "Both invitations name Riyaz Ahamed on 77088 37509. The chapter’s note describes the morning as a referral meeting under its Givers Gain line.",
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
            "Wednesday 25 November 2026 at 7:29 AM. The invitations do not print a finish time.",
        },
        {
          question: "Where is it?",
          answer:
            "The posters say Chennai. They do not name a hall, a street, or a hotel. Ask Riyaz Ahamed on 77088 37509 before you travel.",
        },
        {
          question: "Is there a fee?",
          answer:
            "Neither poster prints a price, and neither says the morning is free.",
        },
        {
          question: "Is the women-entrepreneurs poster a different event?",
          answer:
            "It uses the same date, the same 7:29 AM, the same event name, and the same phone number. This report treats it as one morning.",
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
