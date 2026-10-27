/**
 * Idhu Ungal Sothu — Mega Property Expo (18th edition), ARK Eventz.
 * 10–11 October 2026 at two venues: Old Pallavaram and Urapakkam.
 * Source: organiser WhatsApp note (19 Aug thread, republished 30 Sep 2026).
 * Hours and a ticket price were not stated. Do not invent them.
 *
 * Dev:  `npm run db:seed:event:idhu-ungal-sothu-property-expo`
 * Live: `npm run db:seed:event:idhu-ungal-sothu-property-expo:live`
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

export const IDHU_UNGAL_SOTHU_PROPERTY_EXPO_SLUG =
  "idhu-ungal-sothu-mega-property-expo-october-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const REGISTER_URL = "https://forms.gle/cLn2o1LaoFgKj1Ht9";

const DESCRIPTION = `**Organiser:** ARK Eventz

**Idhu Ungal Sothu** is the **Mega Property Expo**, described in the invite as the **18th edition**. The same note calls it a property showcase with **50+ builders** and **500+ projects** under two roofs. Those counts are the organiser’s claim; this listing does not independently verify them.

**When:** **Saturday 10 and Sunday 11 October 2026**. Opening and closing times are **not printed** in the note. Confirm hours with ARK Eventz before you travel.

**Where (both venues, same dates):**

- **Arul Murugan Towers**, 200 Feet Radial Road, Old Pallavaram, Chennai 117
- **Swapna Thirumana Maaligai**, GST Road, Urapakkam, Chennai

### Register

**Booking:** [Register for a VIP pass](${REGISTER_URL})

The invite says registration includes a **free VIP pass**. It does not print a walk-in ticket price.

### Contact

For more details: **94444 56087**.

This listing is compiled from the organiser’s message. It is not an official notice from either venue. Confirm which hall you are visiting, and the hours, before you go.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: IDHU_UNGAL_SOTHU_PROPERTY_EXPO_SLUG,
    title:
      "Idhu Ungal Sothu Mega Property Expo, Old Pallavaram and Urapakkam (10 and 11 Oct 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 10, 10, 0, 0),
    endsAt: istToUtcDate(2026, 10, 11, 23, 59),
    allDay: true,
    venueName: "Arul Murugan Towers and Swapna Thirumana Maaligai",
    venueAddress:
      "Arul Murugan Towers, 200 Feet Radial Road, Old Pallavaram, Chennai 117; Swapna Thirumana Maaligai, GST Road, Urapakkam, Chennai",
    localityLabel: "Old Pallavaram and Urapakkam",
    featured: false,
  });
  console.log(
    "[seed-event-idhu-ungal-sothu-property-expo]",
    result,
    IDHU_UNGAL_SOTHU_PROPERTY_EXPO_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: IDHU_UNGAL_SOTHU_PROPERTY_EXPO_SLUG,
    label: "seed-event-idhu-ungal-sothu-property-expo",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
