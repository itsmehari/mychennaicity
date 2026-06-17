/**
 * Jolly Phonics Workshop — Tweeties Institute of Education × Jolly Learning (Jul 2026).
 *
 * Dev:  `npm run db:seed:event:jolly-phonics-workshop`
 * Live: `npm run db:seed:event:jolly-phonics-workshop:live`
 *
 * Poster: `public/images/events/jolly-phonics-workshop-tweeties-july-2026.jpg`
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

export const JOLLY_PHONICS_WORKSHOP_SLUG =
  "jolly-phonics-workshop-tweeties-online-july-2026";

const PHONE_DISPLAY = "8169241794";
const WA_APPLY = `https://wa.me/918169241794?text=${encodeURIComponent(
  "Hi, I saw the Jolly Phonics Workshop (Tweeties Institute of Education) on MyChennaiCity and would like to register.",
)}`;

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `8-day online Jolly Phonics workshop for educators — live weekday evenings, Jul 2026. Call or WhatsApp **[${PHONE_DISPLAY}](${WA_APPLY})** to register.

**Organiser:** Tweeties Institute of Education · Jolly Learning

**Tweeties Institute of Education** (Activity Centre | Teacher Training), in association with **Jolly Learning**, presents an **8-day online Jolly Phonics Workshop** — empowering educators with tools to take young learners from sounds to fluent readers.

**Trainer:** **Jayeshtaa Dedhia** — Jolly Learning Trainer · POSH & POCSO Trainer · Teacher Trainer · Author · Consultant

**When:** **1–10 July 2026** · **8:30 PM – 10:30 PM IST** (weekdays only — **Saturday and Sunday off**)

**Where:** **Online** (live sessions — join link shared after registration)

### What you will learn

- Whys & hows of Jolly Phonics
- Scarborough's Reading Rope
- Complete roadmap to reading & writing
- The 5 skills of Jolly Phonics
- 42 Jolly Phonics actions, songs & stories
- Multi-sensory teaching strategies
- Encoding & decoding skills
- Effective blending & segmenting strategies
- Guided reading & comprehension strategies
- Tricky words, spelling rules & alternatives
- Using teaching aids for better classroom learning
- How to launch your Jolly Phonics classes

### Takeaways

- Ready-to-use resources (PDF)
- Alphabet Code for progressive learning
- Day-wise lesson plans & yearly curriculum guidance
- Hardcopy: Jolly Phonics Pupil Books 1, 2 & 3

### Who it's for

Schools, preschools, daycares, and after-school activity centres looking to strengthen literacy through comprehensive Jolly Phonics and Jolly Literacy programmes.

### Registration

Call or WhatsApp **[${PHONE_DISPLAY}](${WA_APPLY})** for fees, seat availability, and the session link. Mention that you saw the listing on MyChennaiCity.

Details from the organiser flyer (July 2026). Confirm schedule and materials with Tweeties before you pay.`;

async function main() {
  const cityId = await getChennaiCityId(db);
  const row = {
    slug: JOLLY_PHONICS_WORKSHOP_SLUG,
    title:
      "Jolly Phonics Workshop — 8-day online training (Tweeties · July 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 7, 1, 20, 30),
    endsAt: istToUtcDate(2026, 7, 10, 22, 30),
    allDay: false,
    venueName: "Online (live sessions)",
    venueAddress:
      "Weekday evening sessions — join link shared after registration",
    localityLabel: "Online",
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
    eventSlug: JOLLY_PHONICS_WORKSHOP_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
