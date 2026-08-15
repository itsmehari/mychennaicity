/**
 * 5th Tamil Nadu International Kite Festival — TTDC Ocean View, Mamallapuram (14–16 Aug 2026).
 *
 * Dev:  `npm run db:seed:event:tn-international-kite-festival`
 * Live: `npm run db:seed:event:tn-international-kite-festival:live`
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
import {
  ECR_WEEKEND_PLAN_PATH,
  KITE_FESTIVAL_EVENT_SLUG,
  KITE_FESTIVAL_NEWS_PATH,
} from "../src/content/tourism";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** Department of Tourism, Tamil Nadu, with Global Media Box

The **5th Tamil Nadu International Kite Festival (TNIKF)** fills the sky over **TTDC Ocean View**, Mamallapuram ECR, across Independence Day weekend.

**When:** **Friday 14 – Sunday 16 August 2026** · professional kites typically **2:00 pm until sunset** (weather permitting); LED kites after sunset toward 7:00 pm

**Where:** **TTDC Ocean View**, Devaneri / East Coast Road, Mamallapuram

**Entry:** Free beach event (official site). **Do not fly personal kites** on the festival ground — this is a professional show.

### What to expect

- Flyers from Thailand, Singapore, Malaysia, Indonesia, Vietnam and India
- Giant and inflatable show kites; 2026 theme **Save Marine Life**
- Family carnival notes (kids photo corner, beach food) — confirm on the ground
- **16 August:** Red Bull F1 static display (as listed by TNIKF)

### Chennai loop

This festival is the afternoon beat on Tamil Nadu Tourism’s **This Weekend ECR Plan**. Stop-by-stop from the city: [ECR weekend plan](${ECR_WEEKEND_PLAN_PATH}). News: [kite festival desk](${KITE_FESTIVAL_NEWS_PATH}) · [TTDC ECR plan](/chennai-local-news/ttdc-this-weekend-ecr-plan-august-2026).

**Official:** [tnikf.com](https://tnikf.com/) · enquiries listed on that site (95000 90850)

Rain cancels kite flying. Recheck the official page before you drive the length of ECR.
`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: KITE_FESTIVAL_EVENT_SLUG,
    title: "Tamil Nadu International Kite Festival, Mamallapuram",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 8, 14, 14, 0),
    endsAt: istToUtcDate(2026, 8, 16, 19, 0),
    allDay: false,
    venueName: "TTDC Ocean View",
    venueAddress: "ECR, Devaneri, Mamallapuram, Tamil Nadu",
    localityLabel: "Mamallapuram",
    featured: true,
  });
  console.log("[seed-event-tnikf]", result, KITE_FESTIVAL_EVENT_SLUG);
  await finishListingSeedLive({
    eventSlug: KITE_FESTIVAL_EVENT_SLUG,
    label: "seed-event-tnikf",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
