/**
 * Farmers' welfare grievance day meeting — Tiruvallur district (DIPR poster).
 * Friday 30 October 2026, 10:00 AM at the District Collectorate.
 *
 * Dev:  `npm run db:seed:event:tiruvallur-farmers-grievance-day`
 * Live: `npm run db:seed:event:tiruvallur-farmers-grievance-day:live`
 *
 * Poster: `public/images/events/farmers-grievance-day-meeting-tiruvallur-october-2026.jpg`
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

export const TIRUVALLUR_FARMERS_GRIEVANCE_DAY_SLUG =
  "farmers-grievance-day-meeting-tiruvallur-october-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Government grievance day for farmers in Tiruvallur district, **Friday 30 October 2026**, **10:00 AM**, at the **District Collectorate, Tiruvallur**. The Tamil poster title is *விவசாயிகள் நலன் காக்கும் நாள் கூட்டம்* (farmers' welfare protection day meeting).

**Organiser:** Government of Tamil Nadu · Tiruvallur district administration

The notice is issued through the Department of Information and Public Relations (DIPR). The district collector signs the poster as **S. Kavitha, I.A.S.**, District Collector, Tiruvallur.

**When:** **Friday, 30 October 2026**, **10:00 AM IST**. The poster does not print a closing time. The calendar holds the listing through **11:59 PM** on that day so it stays visible on 30 October. Confirm how long counters stay open on the day.

**Where:** **District Collectorate, Tiruvallur** (மாவட்ட ஆட்சியர் அலுவலகம், திருவள்ளூர்). Tiruvallur district, Tamil Nadu. The poster does not print a street line on the flyer.

### Who should attend

Farmers in **Tiruvallur district** who want to raise agriculture-related grievances and seek solutions at the collector's office.

### Departments on the poster

Officials from **Agriculture**, **Horticulture**, **Animal Husbandry**, **Tamil Nadu Electricity Board (TNEB)**, and other related departments are expected to attend.

The poster asks farmers in the district to take part and benefit from the meeting.

### Note

This listing is compiled from the Tamil Nadu DIPR poster shared for Tiruvallur district. It is not a live order sheet from the collectorate. Carry any papers that support your grievance. Mention that you saw the listing on MyChennaiCity.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: TIRUVALLUR_FARMERS_GRIEVANCE_DAY_SLUG,
    title:
      "Farmers' welfare grievance day meeting, Tiruvallur district (30 Oct 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 10, 30, 10, 0),
    endsAt: istToUtcDate(2026, 10, 30, 23, 59),
    allDay: false,
    venueName: "District Collectorate, Tiruvallur",
    venueAddress: "Tiruvallur district, Tamil Nadu",
    localityLabel: "Tiruvallur",
    featured: false,
  });
  console.log(
    "[seed-event-tiruvallur-farmers-grievance-day]",
    result,
    TIRUVALLUR_FARMERS_GRIEVANCE_DAY_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: TIRUVALLUR_FARMERS_GRIEVANCE_DAY_SLUG,
    label: "seed-event-tiruvallur-farmers-grievance-day",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
