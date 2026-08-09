/**
 * Tabla Poetry Live — Bhupendra Singh Khidia at Music Academy Mini Hall (20 Sep 2026).
 *
 * Dev:  `npm run db:seed:event:tabla-poetry`
 * Live: `npm run db:seed:event:tabla-poetry:live`
 *
 * Poster: `public/images/events/tabla-poetry-bhupendra-singh-september-2026.jpg`
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

export const TABLA_POETRY_SLUG =
  "tabla-poetry-bhupendra-singh-music-academy-september-2026";

const BMS_EXPLORE =
  "https://in.bookmyshow.com/explore/events-chennai";
const ALLEVENTS =
  "https://allevents.in/chennai/tabla-poetry-live/3900030402294445";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Experimental **spoken-word poetry** layered over live **Hindustani tabla** — **Tabla Poetry Live** by **Bhupendra Singh Khidia** at **The Music Academy Mini Hall**.

**Music & culture** in **Royapettah / Alwarpet, Chennai**

**When:** Sunday, **20 September 2026** · **5:00 PM – 6:30 PM IST** (about 1 hour 30 minutes)

**Where:** Music Academy Mini Hall, New No. 168 (Old No. 306), TTK Road, Chennai 600014

**Tickets:** Search **Tabla Poetry Live** on [BookMyShow](${BMS_EXPLORE}) for M-tickets and seat choices (also mirrored on [AllEvents](${ALLEVENTS}))

### What to expect

- Hindi spoken-word / poetry fused with improvised classical tabla rhythms
- Contemporary cultural showcase — not a conventional kutcheri or standup set
- Strictly **16+** (valid photo ID required; under-16 not admitted)

### Before you go

- **No parking** for this show tier — use rideshare, metro / bus, or drop-off
- Confirm door time and hall (Mini Hall vs main) on the live ticket page
- Language: Hindi

Details from public event listings (September 2026). Verify tickets and age policy on BookMyShow before you travel.`;

async function main() {
  const cityId = await getChennaiCityId(db);
  await upsertEvent(db, cityId, {
    slug: TABLA_POETRY_SLUG,
    title:
      "Tabla Poetry Live by Bhupendra Singh Khidia — Music Academy Mini Hall (20 Sep 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 9, 20, 17, 0),
    endsAt: istToUtcDate(2026, 9, 20, 18, 30),
    allDay: false,
    venueName: "Music Academy Mini Hall",
    venueAddress:
      "New No. 168 (Old No. 306), TTK Road, Royapettah, Chennai 600014",
    localityLabel: "Royapettah",
    featured: true,
  });
  await finishListingSeedLive({
    eventSlug: TABLA_POETRY_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
