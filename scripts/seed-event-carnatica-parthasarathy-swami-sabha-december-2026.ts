/**
 * Carnatica & Sri Parthasarathy Swami Sabha — Margazhi evening (15 Dec 2026).
 * Violin: Nagai R. Muralidharan (4:30 PM). Vocal: Palghat Ramprasad (6:45 PM).
 * Sri Sankara Vidhyashramam school auditorium, Chennai-41. MDnD ticketing (per poster).
 *
 * Dev:  `npm run db:seed:event:carnatica-parthasarathy-dec-15`
 * Live: `npm run db:seed:event:carnatica-parthasarathy-dec-15:live`
 *
 * Poster: `public/images/events/carnatica-parthasarathy-swami-sabha-muralidharan-ramprasad-december-2026.png`
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

export const CARNATICA_PARTHASARATHY_DEC_15_SLUG =
  "carnatica-parthasarathy-swami-sabha-muralidharan-ramprasad-december-2026";

const MDND = "https://www.mdnd.in";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Presented by:** **Carnatica** and **Sri Parthasarathy Swami Sabha** — the sabha’s flyer marks its **125th year** celebrations.

A **Margazhi / December Season** double bill at **Sri Sankara Vidhyashramam Mat. Hr. Sec. School Auditorium** — violin kutcheri followed by vocal.

**Music & culture** in **West Mambalam, Chennai**

**When:** Tuesday, **15 December 2026** · first concert **4:30 PM IST**, second concert **6:45 PM IST**. The poster does not print closing times. This listing keeps the calendar open until **8:45 PM** so you can block the full evening. Confirm finish times on [MDnD](${MDND}) or with the organisers before you plan your commute.

**Where:** **Sri Sankara Vidhyashramam Mat. Hr. Sec. School Auditorium** — Chennai **600041**

**Tickets:** [Book on MDnD](${MDND}) — the poster prints “Tickets On MDnD”. Search for Carnatica or Sri Parthasarathy Swami Sabha on MDnD for this date. Ticket prices are not on the flyer; pay on MDnD, not on this listing page.

### 4:30 PM — Violin

**Nagai R. Muralidharan** (violin)

### 6:45 PM — Carnatic vocal

**Palghat Ramprasad** (vocal)

### Before you go

- Seated indoor auditorium kutcheri — arrive a little early so the first piece can start on time
- Two concerts on one evening — check MDnD whether one booking covers both slots or whether each kutcheri is ticketed separately
- December Season programmes often run close to 8:30 PM; allow time for traffic or Metro if you are heading home after the second concert

Details from the Carnatica / Sri Parthasarathy Swami Sabha festival flyer (15 December 2026). Verify artist names, timings, and ticket rules on MDnD before you travel.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: CARNATICA_PARTHASARATHY_DEC_15_SLUG,
    title:
      "Carnatica & Parthasarathy Swami Sabha — Nagai R. Muralidharan violin & Palghat Ramprasad vocal (15 Dec 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 12, 15, 16, 30),
    endsAt: istToUtcDate(2026, 12, 15, 20, 45),
    allDay: false,
    venueName: "Sri Sankara Vidhyashramam Mat. Hr. Sec. School Auditorium",
    venueAddress:
      "Sri Sankara Vidhyashramam Mat. Hr. Sec. School Auditorium, Chennai 600041",
    localityLabel: "West Mambalam",
    featured: true,
  });
  console.log(
    "[seed-event-carnatica-parthasarathy-dec-15]",
    result,
    CARNATICA_PARTHASARATHY_DEC_15_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: CARNATICA_PARTHASARATHY_DEC_15_SLUG,
    label: "seed-event-carnatica-parthasarathy-dec-15",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});