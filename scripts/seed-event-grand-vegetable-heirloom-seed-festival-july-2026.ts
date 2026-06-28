/**
 * Grand Vegetable Exhibition & Heirloom Seed Festival — T. Nagar (26 Jul 2026).
 *
 * Dev:  `npm run db:seed:event:grand-vegetable-heirloom-seed-festival`
 * Live: `npm run db:seed:event:grand-vegetable-heirloom-seed-festival:live`
 *
 * Poster: `public/images/events/grand-vegetable-exhibition-heirloom-seed-festival-t-nagar-july-2026.png`
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

export const GRAND_VEGETABLE_SEED_FESTIVAL_SLUG =
  "grand-vegetable-exhibition-heirloom-seed-festival-t-nagar-july-2026";

const PHONE_1 = "9280236503";
const PHONE_2 = "8667213182";
const TEL_1 = "tel:+919280236503";
const TEL_2 = "tel:+918667213182";
const WA_1 = `https://wa.me/919280236503?text=${encodeURIComponent(
  "Hi, I saw the Grand Vegetable Exhibition & Heirloom Seed Festival (T. Nagar) on MyChennaiCity and would like to know more.",
)}`;

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Free exhibition of 100+ heirloom vegetables — seminar, discussion, and seed exchange at T. Nagar, Chennai, Sun 26 Jul 2026, 9 AM–5 PM.

**Organiser:** Sudhakar Krishnan · Rooftop / Home Garden Seed Collectors Federation

**Grand Vegetable Exhibition & Heirloom Seed Festival** — an **exhibition** of **100+ heirloom vegetables** with **seminar**, **discussion**, and **seed exchange**. **Free admission** — all are welcome.

**When:** **Sunday, 26 July 2026** · **9:00 AM – 5:00 PM IST**

**Where:** **Thakkar Baba Vidyalaya School**, Venkatnarayana Road, T. Nagar, Chennai 600017

### What to expect

- Exhibition of **100+ heirloom vegetable varieties**
- **Seminar** and **discussion** on home and rooftop gardening
- **Seed exchange** — bring and swap heirloom seeds with fellow gardeners

### Admission

**Free** — no ticket required. Open to families, terrace gardeners, and seed savers.

### Stall booking and enquiries

Call **[${PHONE_1}](${TEL_1})** or **[${PHONE_2}](${TEL_2})** · [WhatsApp ${PHONE_1}](${WA_1})

Mention that you saw the listing on MyChennaiCity. Confirm timings and stall availability with the organiser before you travel.`;

async function main() {
  const cityId = await getChennaiCityId(db);
  const row = {
    slug: GRAND_VEGETABLE_SEED_FESTIVAL_SLUG,
    title:
      "Grand Vegetable Exhibition & Heirloom Seed Festival — T. Nagar, Chennai (26 Jul 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 7, 26, 9, 0),
    endsAt: istToUtcDate(2026, 7, 26, 17, 0),
    allDay: false,
    venueName: "Thakkar Baba Vidyalaya School",
    venueAddress: "Venkatnarayana Road, T. Nagar, Chennai 600017",
    localityLabel: "T. Nagar",
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
    eventSlug: GRAND_VEGETABLE_SEED_FESTIVAL_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
