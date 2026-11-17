/**
 * Kartik Fine Arts — 52nd Year Art Festival evening (7 Dec 2026).
 * Vocal kutcheris: K. Bharat Sundar (4:30 PM) and Trichur Brothers (6:45 PM), Narada Gana Sabha.
 * Source: organiser flyer; MDnD ticketing (per poster).
 *
 * Dev:  `npm run db:seed:event:kartik-fine-arts-dec-7`
 * Live: `npm run db:seed:event:kartik-fine-arts-dec-7:live`
 *
 * Poster: `public/images/events/kartik-fine-arts-52nd-art-festival-narada-gana-sabha-december-2026.png`
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

export const KARTIK_FINE_ARTS_DEC_7_SLUG =
  "kartik-fine-arts-bharat-sundar-trichur-brothers-narada-december-2026";

const MDND = "https://www.mdnd.in";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** Kartik Fine Arts — **52nd Year Art Festival 2026**

A December Season evening at **Narada Gana Sabha** with two vocal kutcheris on the bill. The flyer names **Neelamani Foundation** as main sponsor and **Shriram Finance** as associate sponsor.

**Music & culture** in **Teynampet, Chennai**

**When:** Monday, **7 December 2026** · first concert **4:30 PM IST**, second concert **6:45 PM IST**. The poster does not print closing times. This listing keeps the calendar open until **8:45 PM** so you can block the full evening. Confirm finish times on [MDnD](${MDND}) or at the sabha before you plan your commute.

**Where:** **Narada Gana Sabha**, Main Hall — TTK Road, Teynampet, Chennai 600018

**Tickets:** [Book on MDnD](${MDND}) — the poster prints “Tickets on MDnD”. Search for Kartik Fine Arts at Narada Gana Sabha on the MDnD site for this date. Ticket prices are not on the flyer; pay on MDnD, not on this listing page.

### 4:30 PM — Carnatic vocal

**'Isai Peroli' K. Bharat Sundar** (vocal)

- **Violin:** S. Sayee Rakshith
- **Mridangam:** Sumesh Narayanan
- **Kanjira:** K.V. Gopalakrishnan

### 6:45 PM — Carnatic vocal

**'Isai Peroli' Trichur Brothers** (vocal)

- **Violin:** Delhi R. Sridhar
- **Mridangam:** Akshay Ram
- **Ghatam:** D.V. Venkatasubramaniam

### Before you go

- December Season sabha kutcheri — seated indoor hall; arrive a little early so the first piece can start on time
- Two concerts on one ticket day — check MDnD whether one booking covers both slots or whether each kutcheri is ticketed separately
- Evening programmes at Narada Gana Sabha often run close to 8:30 PM during the Season; allow time for Metro / traffic if you are heading home after the second concert

Details from the Kartik Fine Arts festival flyer (7 December 2026). Verify artist names, timings, and ticket rules on MDnD before you travel.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  await upsertEvent(db, cityId, {
    slug: KARTIK_FINE_ARTS_DEC_7_SLUG,
    title:
      "Kartik Fine Arts — Bharat Sundar & Trichur Brothers vocal concerts, Narada Gana Sabha (7 Dec 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 12, 7, 16, 30),
    endsAt: istToUtcDate(2026, 12, 7, 20, 45),
    allDay: false,
    venueName: "Narada Gana Sabha Main Hall",
    venueAddress: "TTK Road, Teynampet, Chennai 600018",
    localityLabel: "Teynampet",
    featured: true,
  });
  await finishListingSeedLive({
    eventSlug: KARTIK_FINE_ARTS_DEC_7_SLUG,
    label: "seed-event-kartik-fine-arts-dec-7",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});