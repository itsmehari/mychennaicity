/**
 * Go JobSync Mega Job Fair — Dr. M.G.R. Educational and Research Institute,
 * Maduravoyal (Saturday 12 December 2026).
 *
 * Hours are not printed. Register page (30 Oct 2026) says ₹99; the note
 * sent with the poster said ₹100. Poster WhatsApp QR is private and is
 * not on the public image.
 *
 * Dev:  `npm run db:seed:event:gojobsync-mega-job-fair`
 * Live: `npm run db:seed:event:gojobsync-mega-job-fair:live`
 *
 * Poster: `public/images/events/gojobsync-mega-job-fair-maduravoyal-december-2026.jpg`
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

export const GOJOBSYNC_MEGA_JOB_FAIR_SLUG =
  "gojobsync-mega-job-fair-maduravoyal-december-2026";

const REGISTER_URL =
  "https://www.gojobsync.com/careers/mega-job-fair/register";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `One-day job fair at Dr. M.G.R. Educational and Research Institute, Maduravoyal, on Saturday 12 December 2026. The poster and the register page do not print opening or closing times.

**Organiser:** Go JobSync

**Go JobSync Mega Job Fair 2026.** The poster line is *Right Job. Right Candidate. Right Time.*

**When:** **Saturday, 12 December 2026**. No start or finish time is printed. The calendar holds the date as all day so the listing stays on 12 December. Confirm the hours with Go JobSync before you travel.

**Where:** **Dr. M.G.R. Educational and Research Institute** (Deemed to be University), Periyar E.V.R. High Road (NH 4), Maduravoyal, Chennai 600095. The poster and the register page call the venue Dr. M.G.R. University, Maduravoyal. The university office address is from the university’s contact page.

### Who can attend

Freshers and experienced candidates. The poster also says all graduates.

### What the poster says

- **500+ companies**
- Sectors named on the poster: IT and software, engineering and manufacturing, automobile and auto components, logistics and supply chain, plus finance, HR, sales, and more
- Poster line: meet top recruiters from 500+ leading companies

The note sent with this listing also says **25,000+** job openings. That count is not printed on the poster or on the public register page. Treat it as the organiser’s claim.

The register page headline (checked 30 October 2026) says **500+** top tech and core companies are hiring.

### Registration

**Booking:** [Register on Go JobSync](${REGISTER_URL})

The same page says registration is **₹99** per candidate and describes a career bundle: a dynamic resume builder, an AI mock interview, and a personal portfolio website. The note sent with this listing said **₹100** per candidate. Pay on the register page and read the amount there before you pay. The page also asks you to choose a city and venue. This listing is the Chennai edition at Dr. M.G.R. University.

The poster includes a WhatsApp group QR and says the code is private. This listing does not republish that code.

### Contact

**Poster enquiries:** 90320 73539 · Chandrapalreddyhr@gmail.com

The register page also prints **73059 40312**.

This listing is compiled from the organiser poster, the note sent to MyChennaiCity, and the public register page. It is not a notice from the university. Confirm the company list, documents to carry, and the day’s hours before you travel. Mention that you saw the listing on MyChennaiCity.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: GOJOBSYNC_MEGA_JOB_FAIR_SLUG,
    title:
      "Go JobSync Mega Job Fair 2026 at Dr. M.G.R. University, Maduravoyal (12 Dec)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 12, 12, 0, 0),
    endsAt: istToUtcDate(2026, 12, 12, 23, 59),
    allDay: true,
    venueName: "Dr. M.G.R. Educational and Research Institute",
    venueAddress:
      "Periyar E.V.R. High Road (NH 4), Maduravoyal, Chennai 600095",
    localityLabel: "Maduravoyal",
    featured: false,
  });
  console.log(
    "[seed-event-gojobsync-mega-job-fair]",
    result,
    GOJOBSYNC_MEGA_JOB_FAIR_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: GOJOBSYNC_MEGA_JOB_FAIR_SLUG,
    label: "seed-event-gojobsync-mega-job-fair",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
