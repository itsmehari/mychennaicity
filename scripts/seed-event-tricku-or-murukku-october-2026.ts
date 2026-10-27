/**
 * Tricku or Murukku — Curious Korner Halloween ghost party for ages 5–12.
 * Saturday 31 October 2026, 10:00 AM–1:00 PM. Hall shared after RSVP.
 * Source: organiser poster plus the FOMRRA family note (₹200 off, dance party, Google form).
 *
 * Dev:  `npm run db:seed:event:tricku-or-murukku`
 * Live: `npm run db:seed:event:tricku-or-murukku:live`
 *
 * Poster: `public/images/events/tricku-or-murukku-halloween-curious-korner-october-2026.jpg`
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

export const TRICKU_OR_MURUKKU_SLUG =
  "tricku-or-murukku-halloween-curious-korner-october-2026";

const REGISTER = "https://forms.gle/HggAQxxV6NTRg19BA";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Tricku or Murukku: Halloween ghost party for ages 5–12, Saturday 31 October 2026, 10:00 AM–1:00 PM, hosted by Curious Korner. Hall shared after RSVP.

**Organiser:** Curious Korner

Curious Korner is holding a three-hour Halloween morning for children on the OMR belt. The poster calls it a ghost party for little ones and names FOMRRA as community partner. Curious Korner’s own line on the poster is “Where Curiosity Sparks in every Corner.”

**When:** Saturday, **31 October 2026**, **10:00 AM to 1:00 PM IST**.

**Who:** Ages **5 to 12**. Halloween costumes are preferred, not described as compulsory.

**Where:** The poster says the **location is revealed on RSVP**. This listing does not invent a hall. Curious Korner’s public base is Sholinganallur, and the note went to FOMRRA families along OMR. Treat the pin as that belt, then use the address you receive after you register.

**Booking:** [Register on the Curious Korner form](${REGISTER})

Call or WhatsApp **+91 90475 83033**.

### What the morning includes

Printed on the poster:

- Spooky stories
- Magic show
- DIY lanterns
- Decorate a treat box
- Sticker goodie bag

The family note sent with the poster also names a **spooky dance party**. That line is not on the printed activity row.

### FOMRRA families

The note to FOMRRA families offers **flat ₹200 off** the ticket. On the registration form, under “How did you hear about this workshop?”, choose **FOMRRA WhatsApp group**. The poster does not print the full ticket price, so this page does not guess it. The discount is ₹200 off, not a free seat.

Spots are described as limited. Book on the form if you want a place.

This note is written for Chennai parents from the Curious Korner poster and the FOMRRA family message. Confirm the hall, the fare, and the costume note on the form or by WhatsApp before you travel.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: TRICKU_OR_MURUKKU_SLUG,
    title:
      "Tricku or Murukku Halloween ghost party for ages 5 to 12, 31 Oct 2026",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 10, 31, 10, 0),
    endsAt: istToUtcDate(2026, 10, 31, 13, 0),
    allDay: false,
    venueName: "Hall shared after RSVP",
    venueAddress: "Old Mahabalipuram Road, Chennai",
    localityLabel: "OMR",
    featured: false,
  });
  console.log(
    "[seed-event-tricku-or-murukku]",
    result,
    TRICKU_OR_MURUKKU_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: TRICKU_OR_MURUKKU_SLUG,
    label: "seed-event-tricku-or-murukku",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
