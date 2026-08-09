/**
 * Saturangam 360 Academy — Chess Endgame Fundamentals webinar (22 Aug 2026).
 *
 * Dev:  `npm run db:seed:event:saturangam-chess-webinar`
 * Live: `npm run db:seed:event:saturangam-chess-webinar:live`
 *
 * Poster: `public/images/events/saturangam-360-chess-endgame-webinar-august-2026.png`
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

export const SATURANGAM_CHESS_WEBINAR_SLUG =
  "saturangam-360-chess-endgame-webinar-august-2026";

const PHONE_DISPLAY = "63806 06143";
const ZOOM_REGISTER =
  "https://us06web.zoom.us/meeting/register/325vdTMvTMCccdcke-Jpww";
const WA_REGISTER = `https://wa.me/916380606143?text=${encodeURIComponent(
  "Hi, I saw the Saturangam 360 Chess Endgame Fundamentals webinar (22 Aug 2026) on MyChennaiCity and would like to register.",
)}`;

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Online chess webinar on **game concept and endgame fundamentals** for players rated **below 1500**. Fee **₹100**. **[Register on Zoom](${ZOOM_REGISTER})**, or call / WhatsApp **[${PHONE_DISPLAY}](${WA_REGISTER})**.

**Organiser:** Saturangam 360 Academy

**Speaker:** **Mr. J. Banel Andross** — International Chess Arbiter · National Instructor

**When:** **Saturday, 22 August 2026** · **4:00 PM – 5:30 PM IST**

**Where:** **Online (Zoom)** — [register for the webinar](${ZOOM_REGISTER})

### What you will learn

- **Build strong chess basics** — understand game concepts and develop the right thinking habits early
- **Master endgame fundamentals** — simple principles to convert winning positions and avoid unnecessary mistakes
- **Think better, play better** — improve decision-making, understand mistakes, and build a structured approach to every move

### Who it's for

Students, parents, coaches, and chess enthusiasts — all welcome. Best suited for players **below 1500 rating**.

### Fee & registration

- **Fee:** ₹100
- **Register on Zoom:** [${ZOOM_REGISTER}](${ZOOM_REGISTER})
- Scan & pay via the organiser flyer, or call / WhatsApp **[${PHONE_DISPLAY}](${WA_REGISTER})** (contact: **B. Vidya**)
- Email: [saturangam360@hotmail.com](mailto:saturangam360@hotmail.com) · [saturangam360@gmail.com](mailto:saturangam360@gmail.com)

Confirm payment and seat availability with Saturangam 360 before the session. Details from the organiser flyer (August 2026).`;

async function main() {
  const cityId = await getChennaiCityId(db);
  await upsertEvent(db, cityId, {
    slug: SATURANGAM_CHESS_WEBINAR_SLUG,
    title:
      "Chess Endgame Fundamentals webinar — Saturangam 360 (22 Aug 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 8, 22, 16, 0),
    endsAt: istToUtcDate(2026, 8, 22, 17, 30),
    allDay: false,
    venueName: "Online (Zoom)",
    venueAddress:
      "Live Zoom webinar — https://us06web.zoom.us/meeting/register/325vdTMvTMCccdcke-Jpww",

    localityLabel: "Online",
    featured: false,
  });

  await finishListingSeedLive({
    eventSlug: SATURANGAM_CHESS_WEBINAR_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
