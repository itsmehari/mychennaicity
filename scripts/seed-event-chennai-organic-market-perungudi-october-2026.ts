/**
 * Chennai Organic Market — monthly market, third location, OMR Perungudi.
 * Sunday 11 October 2026, 10:00 AM–5:00 PM, Vallalar Sanmargam Arangam.
 * Source: organiser flyer (TNIVF and OFM marks).
 *
 * Dev:  `npm run db:seed:event:chennai-organic-market-perungudi`
 * Live: `npm run db:seed:event:chennai-organic-market-perungudi:live`
 *
 * Poster: `public/images/events/chennai-organic-market-perungudi-october-2026.jpg`
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

export const CHENNAI_ORGANIC_MARKET_PERUNGUDI_SLUG =
  "chennai-organic-market-perungudi-october-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** OFM — Organic Farmers Market

The flyer also prints the **TNIVF** mark. The initials are not expanded on the poster.

**Chennai Organic Market** is billed as a **monthly market starting at a third location**. The flyer does not name the other two locations.

**When:** Sunday, **11 October 2026**, **10:00 AM to 5:00 PM IST**.

**Where:** **Vallalar Sanmargam Arangam**, Rajivgandhi Salai, OMR, Perungudi, Chennai 97. The poster says it is near Selva Vinayagar Temple and opposite the Kuin Skoda car showroom.

### On the floor

The stall list as printed:

- Leafy greens, vegetables, fruits
- Sweets and savouries, ready to cook, snacks
- Organic grocery, herbal plants, organic clothes
- Workshops, storytelling, and games for kids

The poster asks visitors to **bring their own bags** for purchases, and containers for organic cold-pressed oil and other treats.

### Workshop

**Marudilla Marudhuvam**, marked as a new workshop.

- **Timing:** 11:00 AM to 1:00 PM
- **Fee:** ₹100 per person

The flyer does not print a separate entry charge for the market itself.

### Activities and timings

- **Storytelling:** 4:00 PM to 5:00 PM
- **Kids’ games:** 11:00 AM to 4:00 PM
- **Craft activity:** 2:00 PM to 4:00 PM

### Contact

**81222 64595** and **70946 61985**.

This listing is compiled from the organiser flyer. It is not an official hall notice. Confirm the stall list and workshop seats before you go.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: CHENNAI_ORGANIC_MARKET_PERUNGUDI_SLUG,
    title:
      "Chennai Organic Market, Vallalar Sanmargam Arangam, Perungudi (11 Oct 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 10, 11, 10, 0),
    endsAt: istToUtcDate(2026, 10, 11, 17, 0),
    allDay: false,
    venueName: "Vallalar Sanmargam Arangam",
    venueAddress:
      "Rajivgandhi Salai, OMR, Perungudi, Chennai 97 (near Selva Vinayagar Temple, opposite the Kuin Skoda showroom)",
    localityLabel: "Perungudi",
    featured: false,
  });
  console.log(
    "[seed-event-chennai-organic-market-perungudi]",
    result,
    CHENNAI_ORGANIC_MARKET_PERUNGUDI_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: CHENNAI_ORGANIC_MARKET_PERUNGUDI_SLUG,
    label: "seed-event-chennai-organic-market-perungudi",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
