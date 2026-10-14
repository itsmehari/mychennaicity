/**
 * Rotary Club of Chennai Galaxy Mega Job Fair — Madras Seva Sadan (17 Oct 2026).
 *
 * Dev:  `npm run db:seed:event:rotary-chennai-galaxy-job-fair`
 * Live: `npm run db:seed:event:rotary-chennai-galaxy-job-fair:live`
 *
 * Poster: `public/images/events/rotary-chennai-galaxy-mega-job-fair-october-2026.jpg`
 */
import { neon } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { events } from "../src/db/schema/tables";
import {
  getChennaiCityId,
  insertEventIfMissing,
  istToUtcDate,
  isLiveSeed,
  loadEventSeedEnv,
  requireDatabaseUrl,
  finishListingSeedLive,
} from "./lib/seed-event-shared";

export const ROTARY_CHENNAI_GALAXY_JOB_FAIR_SLUG =
  "rotary-chennai-galaxy-mega-job-fair-madras-seva-sadan-october-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `One-day mega job fair with 40+ companies at The Madras Seva Sadan, Chennai, Saturday 17 October 2026, 8:00 AM–2:00 PM.

**Organiser:** Rotary Club of Chennai Galaxy (Rotary District 3234 · Club No. 61151), in association with Equitas Development Initiatives Trust

**Mega Job Fair 2026** — *Connecting Talent, Transforming Lives.*

**When:** **Saturday, 17 October 2026** · **8:00 AM – 2:00 PM IST**

**Where:** **The Madras Seva Sadan**, 31 Casa Major Road, Egmore, Chennai 600008

**Chief guest:** Honourable Dr. JCD Prabhakar, Speaker, Tamil Nadu Legislative Assembly (as named on the organiser poster)

### Who can attend

- **Age:** 18–35 years
- **School and vocational:** 8th, 10th, 12th, Diploma, ITI, B.Ed
- **Graduation:** all UG and PG, including B.E, B.Tech, MBA, and MCA

### What the poster says

- **40+ companies** in one place
- Tagline: **One place. Many opportunities.**

### Contact

**Gunasekhar** — +91 87545 42234

Confirm walk-in rules, documents to carry, and company list with the organiser before you travel. Details from the Rotary Club of Chennai Galaxy / Equitas poster (October 2026). Mention that you saw the listing on MyChennaiCity.`;

async function main() {
  const cityId = await getChennaiCityId(db);
  const row = {
    slug: ROTARY_CHENNAI_GALAXY_JOB_FAIR_SLUG,
    title:
      "Mega Job Fair 2026 — Rotary Club of Chennai Galaxy, Madras Seva Sadan (17 Oct)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 10, 17, 8, 0),
    endsAt: istToUtcDate(2026, 10, 17, 14, 0),
    allDay: false,
    venueName: "The Madras Seva Sadan",
    venueAddress: "31 Casa Major Road, Egmore, Chennai 600008",
    localityLabel: "Egmore",
    featured: false,
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
  await finishListingSeedLive({
    eventSlug: ROTARY_CHENNAI_GALAXY_JOB_FAIR_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
