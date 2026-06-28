/**
 * myAvtar SheWorks! Career Fair — MOP Vaishnav College for Women (4 Jul 2026).
 *
 * Dev:  `npm run db:seed:event:myavtar-sheworks-career-fair`
 * Live: `npm run db:seed:event:myavtar-sheworks-career-fair:live`
 *
 * Poster: `public/images/events/myavtar-sheworks-career-fair-mop-vaishnav-july-2026.png`
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

export const MYAVTAR_SHEWORKS_CAREER_FAIR_SLUG =
  "myavtar-sheworks-career-fair-mop-vaishnav-july-2026";

const REGISTRATION_URL = "https://www.myavtar.com/events";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Free one-day career fair for women — assessments, employer chair time, and industry panels at MOP Vaishnav College, Nungambakkam, Sat 4 Jul 2026, 10 AM–2 PM.

**Organiser:** Avtar Career Creators Limited · **myAvtar** (Pioneering Pathways)

**Hosted at:** M.O.P. Vaishnav College for Women (Autonomous)

**myAvtar SheWorks! Career Fair** — *100s of Women. One Saturday. One Campus.* A free, on-campus career fair for women professionals, career restarters, and graduates. Theme: **Restart. Rebuild. Rise.**

**When:** **Saturday, 4 July 2026** · **10:00 AM – 2:00 PM IST**

**Where:** **M.O.P. Vaishnav College for Women (Autonomous)**, 20, IV Lane, Nungambakkam High Road, Nungambakkam, Chennai 600034

### What to expect

- **Personal career assessment**
- **60-day action plan** and **certificate**
- Connect with **like-minded peers**
- **Exclusive chair time with employers**
- **Industry exposure panels**

### Admission

**Free entry** — no ticket fee. Women professionals, career restarters, and recent graduates welcome.

### Registration

[Register on myAvtar.com](${REGISTRATION_URL}) or scan the QR code on the organiser flyer. Confirm your slot and any walk-in policy with Avtar before you travel.

Details from the organiser flyer (July 2026). Mention that you saw the listing on MyChennaiCity.`;

async function main() {
  const cityId = await getChennaiCityId(db);
  const row = {
    slug: MYAVTAR_SHEWORKS_CAREER_FAIR_SLUG,
    title:
      "myAvtar SheWorks! Career Fair — MOP Vaishnav College, Chennai (4 Jul 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 7, 4, 10, 0),
    endsAt: istToUtcDate(2026, 7, 4, 14, 0),
    allDay: false,
    venueName: "M.O.P. Vaishnav College for Women (Autonomous)",
    venueAddress:
      "20, IV Lane, Nungambakkam High Road, Nungambakkam, Chennai 600034",
    localityLabel: "Nungambakkam",
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
    eventSlug: MYAVTAR_SHEWORKS_CAREER_FAIR_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
