/**
 * WSL Shore Temple Classic QS 2000 & Pro Junior — Mahabalipuram (12–16 Aug 2026).
 *
 * Dev:  `npm run db:seed:event:shore-temple-classic-surfing`
 * Live: `npm run db:seed:event:shore-temple-classic-surfing:live`
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
import { ECR_WEEKEND_PLAN_PATH, SURFING_EVENT_SLUG } from "../src/content/tourism";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const WSL_URL =
  "https://www.worldsurfleague.com/events/2026/qs/547/shore-temple-classic-qs-2000-pro-junior/main";

const DESCRIPTION = `**Organiser:** World Surf League (WSL)

The **Shore Temple Classic QS 2,000 & Pro Junior** returns international contest surfing to **Mahabalipuram** — WSL’s India comeback and the country’s **first WSL Pro Junior**.

**When:** **Wednesday 12 – Sunday 16 August 2026** · heat times depend on swell (standby calls are normal)

**Where:** Mahabalipuram beach / Shore Temple break, Tamil Nadu

This is a **spectator sport event**, not a public surf lesson. Stay clear of the contest zone and camera lanes. About **120** surfers from around **12** countries were expected (Sportstar).

### Chennai loop

Tamil Nadu Tourism’s **This Weekend ECR Plan** lists a surfing championship as the last adventure stop after the kite festival and UNESCO monuments. Practical loop: [ECR weekend plan](${ECR_WEEKEND_PLAN_PATH}). News: [TTDC ECR plan](/chennai-local-news/ttdc-this-weekend-ecr-plan-august-2026).

**Official:** [WSL event page](${WSL_URL})

Always recut the morning call on WSL — rain and flat spells pause heats.
`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: SURFING_EVENT_SLUG,
    title: "Shore Temple Classic QS 2000 & Pro Junior, Mamallapuram",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 8, 12, 6, 30),
    endsAt: istToUtcDate(2026, 8, 16, 18, 0),
    allDay: false,
    venueName: "Mahabalipuram Shore Temple beach",
    venueAddress: "Mamallapuram (Mahabalipuram), Chengalpattu district, Tamil Nadu",
    localityLabel: "Mamallapuram",
    featured: true,
  });
  console.log("[seed-event-wsl-shore]", result, SURFING_EVENT_SLUG);
  await finishListingSeedLive({
    eventSlug: SURFING_EVENT_SLUG,
    label: "seed-event-wsl-shore",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
