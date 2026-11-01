/**
 * Vibrant Hues — paintings and sculptures at Art Cube Gallery, Virugambakkam.
 * 31 October – 7 November 2026, 11:00 AM to 6:00 PM.
 * Source: organiser poster (Art Cube Gallery; 32 artists; artcubegallery.biz).
 *
 * Dev:  `npm run db:seed:event:vibrant-hues-art-cube`
 * Live: `npm run db:seed:event:vibrant-hues-art-cube:live`
 *
 * Poster: `public/images/events/vibrant-hues-art-cube-gallery-virugambakkam-november-2026.png`
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

export const VIBRANT_HUES_EVENT_SLUG =
  "vibrant-hues-art-cube-gallery-virugambakkam-november-2026";

const NEWS =
  "/chennai-local-news/vibrant-hues-art-exhibition-virugambakkam-november-2026";
const GALLERY = "https://www.artcubegallery.biz";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Art Cube Gallery** presents **Vibrant Hues — Celebration of life**, a week-long art exhibition of paintings and sculptures in Virugambakkam.

**When:** **Friday 31 October to Friday 7 November 2026**, **11:00 AM to 6:00 PM IST** each day, as printed on the gallery poster.

**Where:** **Art Cube Gallery**, Plot No. 13, 2nd Street, Elango Nagar, Virugambakkam, Chennai 600092.

**Organiser:** Art Cube Gallery

The poster names **32 artists** and the media as **paintings | sculptures**. It does not print a ticket price, a catalogue of names, or a closing-day last-entry time. Treat entry as a gallery visit unless the desk says otherwise.

### Contact, as printed

- Gallery site: [artcubegallery.biz](${GALLERY})
- Phone: **87545 55769** (gallery number, not mychennaicity.in)

### Nearby note

Virugambakkam sits west of Kodambakkam on the Arcot Road side of the city. Confirm parking and last entry at the gallery before you travel.

A short city note is on the [news page](${NEWS}).

This listing is compiled from the organiser poster. It is not an official Art Cube Gallery notice. Confirm dates, hours, and any entry fee at the gallery before you go.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: VIBRANT_HUES_EVENT_SLUG,
    title:
      "Vibrant Hues — paintings and sculptures at Art Cube Gallery, Virugambakkam",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 10, 31, 11, 0),
    endsAt: istToUtcDate(2026, 11, 7, 18, 0),
    allDay: false,
    venueName: "Art Cube Gallery",
    venueAddress:
      "Plot No. 13, 2nd Street, Elango Nagar, Virugambakkam, Chennai 600092",
    localityLabel: "Virugambakkam",
    featured: true,
  });
  console.log("[seed-event-vibrant-hues-art-cube]", result, VIBRANT_HUES_EVENT_SLUG);
  await finishListingSeedLive({
    eventSlug: VIBRANT_HUES_EVENT_SLUG,
    label: "seed-event-vibrant-hues-art-cube",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
