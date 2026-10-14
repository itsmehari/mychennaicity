/**
 * Chennai Organic Market — next monthly dates after the October 2026 flyer.
 * October 4, 10, and 11 had already ended when this was seeded (14 Oct 2026),
 * so the public pages use the printed monthly cadence:
 * Shenoy Nagar 1st Sunday, Velachery 2nd Saturday, Perungudi 2nd Sunday.
 *
 * Dev:  `npm run db:seed:event:chennai-organic-market-november`
 * Live: `npm run db:seed:event:chennai-organic-market-november:live`
 *
 * Poster: `public/images/events/chennai-organic-market-three-locations-2026.jpg`
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
  type EventSeedRow,
} from "./lib/seed-event-shared";

export const ORGANIC_MARKET_SHENOY_NAGAR_SLUG =
  "chennai-organic-market-shenoy-nagar-november-2026";
export const ORGANIC_MARKET_VELACHERY_SLUG =
  "chennai-organic-market-velachery-november-2026";
export const ORGANIC_MARKET_PERUNGUDI_NOV_SLUG =
  "chennai-organic-market-perungudi-november-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const SHARED = `The organiser flyer (October 2026) says the market is now in **three locations**, with the same guarantee: **100% organic, safe and fair for consumers**.

### What is sold

Local vegetables, local fruits, traditional rice varieties, millets, pulses and groceries, bakes, snacks and sweets, cooked food and beverages, cold-pressed oils, leafy greens, and other household goods.

### What to bring

Bring your own bags, bottles for oils and bio-enzymes, and your own cup, plate, or tiffin box. The market is marked **zero / one-time-use plastic free**.

### Contact

**81222 64595**, **99620 43710**, and **99622 25225**.

This listing follows the monthly pattern printed on the flyer. The October dates on that poster (4, 10, and 11 October 2026) had already passed when this was published. Confirm the November date with the organiser before you travel. Mention that you saw the listing on MyChennaiCity.`;

const rows: EventSeedRow[] = [
  {
    slug: ORGANIC_MARKET_SHENOY_NAGAR_SLUG,
    title:
      "Chennai Organic Market, Shenoy Nagar (1 Nov 2026)",
    description: `Monthly organic farmers’ market on the **1st Sunday** of the month.

**Organiser:** Chennai Organic Market (OFM mark on the flyer)

**When:** Sunday, **1 November 2026**, **9:00 AM – 4:00 PM IST**. The October flyer noted a change in market timings for this location (9:00 AM to 4:00 PM).

**Where:** **Corporation Middle School**, Manjakollai, 1st Main Road W, Gajalakshmi Colony, Kathiravan Colony, Shenoy Nagar, Chennai 600030.

${SHARED}`,
    startsAt: istToUtcDate(2026, 11, 1, 9, 0),
    endsAt: istToUtcDate(2026, 11, 1, 16, 0),
    allDay: false,
    venueName: "Corporation Middle School, Shenoy Nagar",
    venueAddress:
      "Manjakollai, 1st Main Road W, Gajalakshmi Colony, Kathiravan Colony, Shenoy Nagar, Chennai 600030",
    localityLabel: "Shenoy Nagar",
    featured: false,
  },
  {
    slug: ORGANIC_MARKET_VELACHERY_SLUG,
    title: "Chennai Organic Market, Velachery (14 Nov 2026)",
    description: `Monthly organic farmers’ market on the **2nd Saturday** of every month.

**Organiser:** Chennai Organic Market (OFM mark on the flyer)

**When:** Saturday, **14 November 2026**, **10:00 AM – 5:00 PM IST**.

**Where:** **Arsha Vidya Mandir**, 114, Velachery Road, Guindy, Chennai 600032.

${SHARED}`,
    startsAt: istToUtcDate(2026, 11, 14, 10, 0),
    endsAt: istToUtcDate(2026, 11, 14, 17, 0),
    allDay: false,
    venueName: "Arsha Vidya Mandir",
    venueAddress: "114, Velachery Road, Guindy, Chennai 600032",
    localityLabel: "Velachery",
    featured: false,
  },
  {
    slug: ORGANIC_MARKET_PERUNGUDI_NOV_SLUG,
    title:
      "Chennai Organic Market, Vallalar Sanmargam Arangam, Perungudi (8 Nov 2026)",
    description: `Monthly organic farmers’ market on the **2nd Sunday** of every month.

**Organiser:** Chennai Organic Market (OFM mark on the flyer)

**When:** Sunday, **8 November 2026**, **10:00 AM – 5:00 PM IST**.

**Where:** **Vallalar Sanmargam Arangam**, Rajiv Gandhi Salai (OMR), Perungudi, Chennai 600097. Landmark on the flyer: near Selva Vinayagar Temple, opposite the Kun Skoda car showroom.

${SHARED}`,
    startsAt: istToUtcDate(2026, 11, 8, 10, 0),
    endsAt: istToUtcDate(2026, 11, 8, 17, 0),
    allDay: false,
    venueName: "Vallalar Sanmargam Arangam",
    venueAddress:
      "Rajiv Gandhi Salai (OMR), Perungudi, Chennai 600097 (near Selva Vinayagar Temple, opposite the Kun Skoda car showroom)",
    localityLabel: "Perungudi",
    featured: false,
  },
];

async function main() {
  const cityId = await getChennaiCityId(db);
  for (const row of rows) {
    const result = await upsertEvent(db, cityId, row);
    console.log("[seed-event-chennai-organic-market-november]", result, row.slug);
    await finishListingSeedLive({
      eventSlug: row.slug,
      label: "seed-event-chennai-organic-market-november",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
