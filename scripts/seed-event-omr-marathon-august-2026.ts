/**
 * OMR Marathon — Anti-Drug Awareness Marathon, Padur (9 Aug 2026).
 *
 * Dev:  `npm run db:seed:event:omr-marathon`
 * Live: `npm run db:seed:event:omr-marathon:live`
 *
 * Poster: `public/images/events/omr-marathon-anti-drug-awareness-padur-august-2026.png`
 * (registered in `src/lib/events/event-poster-image.ts`)
 */
import { neon } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { events } from "../src/db/schema/tables";
import {
  finishListingSeedLive,
  getChennaiCityId,
  insertEventIfMissing,
  istToUtcDate,
  isLiveSeed,
  loadEventSeedEnv,
  requireDatabaseUrl,
} from "./lib/seed-event-shared";

export const OMR_MARATHON_SLUG =
  "omr-marathon-anti-drug-awareness-padur-august-2026";

/** Sparse Ticket9 stub for the same race — hide to avoid a duplicate hub card. */
const TICKET9_OMR_MARATHON_SLUG = "ticket9-omr-marathon";

const REGISTRATION_URL = "https://www.omrmarathon.org";
const TICKET9_URL = "https://www.theticket9.com/event/omr-marathon";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Anti-Drug Awareness Marathon** on OMR — **3 km, 5 km, 10 km & 21 km** at Padur, Sunday 9 August 2026.

**Community run** in **Padur, OMR, Chennai**

**Organiser:** Maattrathai Nokki Charitable Trust (மாற்றத்தை நோக்கி…)

**OMR Marathon** is an anti-drug awareness run along the OMR corridor, co-presented with **Supreme Speciality Hospitals**. Categories cover fun run through half marathon — pick the distance that fits you.

**When:** **Sunday, 9 August 2026** · early morning start (confirm gun time on the official site)

**Where:** **Padur, OMR (Rajiv Gandhi Salai), Chennai**

### Distances

- **3 km**
- **5 km**
- **10 km**
- **21 km**

### What's included

Breakfast · T-shirt · Medal · Goodie bag · Digital certificate · Race bib · Hydration stations on route · Photography coverage

### Register

- Official site: [omrmarathon.org](${REGISTRATION_URL})
- Also listed on Ticket9: [theticket9.com/event/omr-marathon](${TICKET9_URL})
- Ticketing partners on the flyer: BookMyShow, Ticket9, allevents

### Partners (from organiser flyer)

Co-presented by Supreme Speciality Hospitals · Sports partner Decathlon · Radio partner BIG / 92.7 BIG FM · Community partners including FOMRRA · Fitness partner SLAM · Good food partner Akshayakalpa Organic · Hydration partner Leo ION · Majaa / Mojo partner Wonderla · and others listed on the poster.

Confirm category fees, reporting time, and bib collection on [omrmarathon.org](${REGISTRATION_URL}) before race day. Details from the organiser poster (August 2026).`;

async function cancelTicket9Duplicate(cityId: string): Promise<void> {
  const [existing] = await db
    .select({ id: events.id, status: events.status })
    .from(events)
    .where(
      and(eq(events.cityId, cityId), eq(events.slug, TICKET9_OMR_MARATHON_SLUG)),
    )
    .limit(1);
  if (!existing) return;
  if (existing.status === "cancelled") {
    console.log("Ticket9 duplicate already cancelled:", TICKET9_OMR_MARATHON_SLUG);
    return;
  }
  await db
    .update(events)
    .set({ status: "cancelled", updatedAt: new Date() })
    .where(eq(events.id, existing.id));
  console.log("Cancelled Ticket9 duplicate:", TICKET9_OMR_MARATHON_SLUG);
}

async function main() {
  const cityId = await getChennaiCityId(db);
  const row = {
    slug: OMR_MARATHON_SLUG,
    title:
      "OMR Marathon — Anti-Drug Awareness Marathon, Padur (9 Aug 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 8, 9, 4, 0),
    endsAt: istToUtcDate(2026, 8, 9, 10, 0),
    allDay: false,
    venueName: "Padur, OMR",
    venueAddress: "Padur, Rajiv Gandhi Salai (OMR), Chennai",
    localityLabel: "Padur",
    featured: true,
  };

  const result = await insertEventIfMissing(db, cityId, row);
  if (result === "exists") {
    await db
      .update(events)
      .set({
        title: row.title,
        description: row.description,
        startsAt: row.startsAt,
        endsAt: row.endsAt,
        allDay: row.allDay,
        venueName: row.venueName,
        venueAddress: row.venueAddress,
        localityLabel: row.localityLabel,
        featured: row.featured,
        status: "scheduled",
        updatedAt: new Date(),
      })
      .where(and(eq(events.cityId, cityId), eq(events.slug, row.slug)));
    console.log("Refreshed event:", row.slug);
  }

  await cancelTicket9Duplicate(cityId);

  await finishListingSeedLive({
    eventSlug: OMR_MARATHON_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
