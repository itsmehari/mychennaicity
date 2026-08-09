/**
 * Frangipani Tour — Kaber Vasuki at The Music Academy (22 Aug 2026).
 * Upserts the existing Ticket9 slug so the hub stays a single listing.
 *
 * Dev:  `npm run db:seed:event:frangipani-kaber-vasuki`
 * Live: `npm run db:seed:event:frangipani-kaber-vasuki:live`
 *
 * Poster: `public/images/events/frangipani-tour-kaber-vasuki-august-2026.webp`
 * (registered in `src/lib/events/event-poster-image.ts`)
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import {
  finishListingSeedLive,
  getChennaiCityId,
  istToUtcDate,
  isLiveSeed,
  loadEventSeedEnv,
  requireDatabaseUrl,
  upsertEvent,
} from "./lib/seed-event-shared";

/** Keep Ticket9 slug — already seeded via ticket9 bulk import. */
export const FRANGIPANI_KABER_SLUG = "ticket9-frangipani-tour-chennai";

const TICKET9 =
  "https://www.theticket9.com/event/frangipani-tour-chennai";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Tamil indie storytelling concert — **Kaber Vasuki** brings the **Frangipani Tour** to Chennai for a seated indoor auditorium night at **The Music Academy**.

**Music & culture** in **Royapettah, Chennai**

**Organiser / tickets:** [Book on Ticket9](${TICKET9}) (seating maps and digital passes)

**When:** Saturday, **22 August 2026** · **5:00 PM – 8:00 PM IST**

**Where:** The Music Academy, Old No. 306, New No. 168, TTK Road, Royapettah, Chennai 600014

### What to expect

- Intimate, family-friendly listening room — not an open-ground festival or pub gig
- Philosophical lyrics and narrative storytelling in Tamil indie / alternative style
- Quiet, orderly auditorium setting so the songwriting lands clearly

### Before you go

- Arrive early for security and seating (central Chennai traffic on TTK Road)
- Confirm final door time and pricing on [Ticket9](${TICKET9}) before you travel
- Kid-friendly / family-accessible seated show

Details from Ticket9 and tour listings (August 2026).`;

async function main() {
  const cityId = await getChennaiCityId(db);
  await upsertEvent(db, cityId, {
    slug: FRANGIPANI_KABER_SLUG,
    title: "Frangipani Tour with Kaber Vasuki — The Music Academy (22 Aug 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 8, 22, 17, 0),
    endsAt: istToUtcDate(2026, 8, 22, 20, 0),
    allDay: false,
    venueName: "The Music Academy",
    venueAddress:
      "Old No. 306, New No. 168, TTK Road, Royapettah, Chennai 600014",
    localityLabel: "Royapettah",
    featured: true,
  });
  await finishListingSeedLive({
    eventSlug: FRANGIPANI_KABER_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
