/**
 * Sukoon Baithak — Utkarsh Sharma at Mathsya Adyar (5 Sep 2026).
 *
 * Dev:  `npm run db:seed:event:sukoon-baithak-adyar`
 * Live: `npm run db:seed:event:sukoon-baithak-adyar:live`
 *
 * Poster: `public/images/events/sukoon-baithak-utkarsh-sharma-adyar-september-2026.jpg`
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

export const SUKOON_BAITHAK_ADYAR_SLUG =
  "sukoon-baithak-utkarsh-sharma-mathsya-adyar-september-2026";

const OUI_HOME = "https://www.onceuponindia.com/";
const OUI_BAITHAKS = "https://www.onceuponindia.com/baithaks";
const DISTRICT =
  "https://www.district.in/events/chennai-sukoon-baithak-aug5-2026-buy-tickets";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Intimate **ghazal / poetry baithak** — **Sukoon** with **Utkarsh Sharma**, part of **Once Upon India**’s national tour. Tribute-style evening of Jagjit Singh ghazals, vintage Hindi melodies, and Gulzar poetry with live acoustic backing.

**Music & culture** in **Adyar, Chennai**

**Organiser:** [Once Upon India](${OUI_HOME})

**When:** Saturday, **5 September 2026** · **6:30 PM – 9:30 PM IST**

**Where:** Radhakrishna Hall, Mathsya (Adayar Branch), No. 53 / 26, Gandhi Nagar 1st Main Road (opp. GRT Jewellers), Gandhi Nagar, Adyar, Chennai 600020

**Tickets:** About **₹4,248** (inclusive of GST) on the organiser desk — book via [Once Upon India baithaks](${OUI_BAITHAKS}) or the [District event page](${DISTRICT}). Cozy rooftop-café layout; limited seats — book early.

### What to expect

- Mehfil / baithak format (not a large concert stage)
- Unplugged ensemble: sarangi, tabla, guitar, and harmonium
- Warm, seated cultural gathering for lovers of Urdu poetry, ghazals, and vintage melodies

### Before you go

- Space is constrained — confirm your pass before travelling
- Verify exact entry time and seating notes on District / Once Upon India
- Kid-friendly entry policy is listed on the District page; confirm age rules when booking

Details from Once Upon India (September 2026). Confirm price and door policy on the live ticket link.`;

async function main() {
  const cityId = await getChennaiCityId(db);
  await upsertEvent(db, cityId, {
    slug: SUKOON_BAITHAK_ADYAR_SLUG,
    title:
      "Sukoon Baithak by Utkarsh Sharma — Mathsya Adyar (5 Sep 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 9, 5, 18, 30),
    endsAt: istToUtcDate(2026, 9, 5, 21, 30),
    allDay: false,
    venueName: "Radhakrishna Hall, Mathsya Adyar",
    venueAddress:
      "No. 53 / 26, Gandhi Nagar 1st Main Road, Opposite GRT Jewellers, Gandhi Nagar, Adyar, Chennai 600020",
    localityLabel: "Adyar",
    featured: true,
  });
  await finishListingSeedLive({
    eventSlug: SUKOON_BAITHAK_ADYAR_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
