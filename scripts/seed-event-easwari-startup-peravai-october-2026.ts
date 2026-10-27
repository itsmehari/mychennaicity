/**
 * Easwari Startup Peravai — student startup summit, Ramapuram.
 * 30–31 October 2026. Sources checked 18 October 2026:
 * - https://www.startupperavai.in/
 * - https://www.startupperavai.in/events
 * - organiser brochure (also at /assets/EVENT_BROCHURE-B6vO_Cz_.pdf)
 *
 * A closing time is not published. Session rules for three contests
 * still contain placeholder Latin on the organiser site; those lines
 * are not copied here. Pitch Perfect lists ₹500 and ₹700. Both stay.
 *
 * Dev:  `npm run db:seed:event:easwari-startup-peravai`
 * Live: `npm run db:seed:event:easwari-startup-peravai:live`
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

export const EASWARI_STARTUP_PERAVAI_SLUG =
  "easwari-startup-peravai-october-2026";

const NEWS =
  "/chennai-local-news/easwari-startup-peravai-ramapuram-october-2026";
const SITE = "https://www.startupperavai.in/";
const CATALOG = "https://www.startupperavai.in/events";
const BROCHURE =
  "https://www.startupperavai.in/assets/EVENT_BROCHURE-B6vO_Cz_.pdf";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** Easwari Engineering College (SRM Group)

**Easwari Startup Peravai** is a two-day student startup summit on the Ramapuram campus. The college’s site calls it a student-driven platform run with StartupTN. The summit itself was launched on **18 September 2026**, when Higher Education Minister P. Viswanathan opened the SRM Easwari Innovation Centre. This listing is the October gathering.

**When:** **Friday 30 and Saturday 31 October 2026**. The earliest session on the public catalogue starts at **9:00 AM**. A closing time is **not published**.

**Where:** Easwari Engineering College (Autonomous), Bharathi Salai, Ramapuram, Chennai 600089.

### Register

**Booking:** [Register on the official site](${SITE})

The catalogue of sessions is at [startupperavai.in/events](${CATALOG}).

The registration screen prices a **visitor pass at free** and an **event pass at ₹499**. The site says an event pass is required before you can register for the contests. Each contest then lists its own fee. Passes are non-refundable and non-transferable. Carry the pass and a college or other ID card. The organiser can change speakers, halls, and timings.

### Sessions on the catalogue

These are the seven sessions published on 18 October 2026. “Onwards” is the organiser’s word. No end time is printed.

| Session | Format | When | Hall | Catalogue fee |
| --- | --- | --- | --- | --- |
| Hackathon, with CUMTA | Teams of 3–5 | Both days, 1:00 PM onwards | MLCP labs | ₹1,500 |
| Rupees to Reality | Up to 3 | Day 1, 12:00 PM onwards | Academic Block | ₹600 |
| Pitch Perfect, with Nebula | 1–5 | Both days, 12:00 PM onwards | Listed only as EEC | ₹500 on the fee field |
| ScaleUp Studio | Up to 3 | Day 2, 9:00 AM onwards | Academic Block | ₹600 |
| Rise Her | Individual | Both days, 9:00 AM onwards | MBA Seminar Hall 1 | ₹200 |
| Design Thinking Bootcamp | Individual | Both days, 11:30 AM onwards | MBA Seminar Hall 2 | ₹500 |
| The Art of Selling Nothing | Solo | Day 1, 9:00 AM onwards | Hi-Tech Hall 2 | ₹200 |

**Pitch Perfect** is the conflict to check at checkout. The fee field is **₹500**. The rules text says the team leader pays **₹700** for the team. Pitches are **5 minutes**, then **3 minutes** of questions. Slides are PPT or PDF.

**Hackathon** problem statements are revealed on the day. The team leader registers and pays for the members. The brief is a 24-hour challenge on how Chennai moves, set with the Chennai Unified Metropolitan Transport Authority.

**Rise Her** is described as a women-only cohort with TN RISE. The rules line on the same page says the session is open to all interested participants. Confirm which line applies before you pay ₹200.

**Rupees to Reality**, **ScaleUp Studio**, and the **Design Thinking Bootcamp** still show unfinished placeholder rules on the organiser site. This listing uses only the session descriptions and the fees, halls, and clocks that are real copy. Design Thinking is led on the page by Lavanya G.

### People listed for this summit

The site’s guest row, with the titles it prints: Mohan K (IppoPay), C.K. Kumaravel (Naturals Salon & Spa), Singai G. Ramachandran (listed as chairperson, StartupTN), Dilip Kumar Devanathan (HCL Technologies), Balaji Arumugam (Big Bucks Innovation), Rajalingam Rathinam (NestOne Group), Reji Joseph (Infinity Advisors), Rohini Manohar (Chennai Yoga Studio and Mitra Yoga Fest), Bharathan Prahalad (Aziro). A timed agenda for these names is not published.

### Contact

Event queries: **Hemachandra, 97890 34548**. Email: **office@startupperavai.in**. Technical support: **70109 97679**. Instagram: **@easwari_startup_peravai**.

Official brochure: [PDF on the organiser site](${BROCHURE}). A copy is also at [/documents/events/easwari-startup-peravai-2026-brochure.pdf](/documents/events/easwari-startup-peravai-2026-brochure.pdf).

The reported account of the launch, the campus events that came before it, and what the brochure claims beyond this catalogue is [Easwari Startup Peravai opens in Ramapuram on 30 October](${NEWS}).

Headcounts (“8,000+ participants”, “100+ founders”), a “biggest summit” line, and an “up to ₹1 crore” investment commitment are the organiser’s claims. This listing does not treat them as results. Confirm your hall and fee on the catalogue before you pay.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: EASWARI_STARTUP_PERAVAI_SLUG,
    title: "Easwari Startup Peravai, Ramapuram (30 and 31 October 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 10, 30, 9, 0),
    endsAt: istToUtcDate(2026, 10, 31, 23, 59),
    allDay: false,
    venueName: "Easwari Engineering College",
    venueAddress:
      "Easwari Engineering College (Autonomous), Bharathi Salai, Ramapuram, Chennai 600089",
    localityLabel: "Ramapuram",
    featured: true,
  });
  console.log(
    "[seed-event-easwari-startup-peravai]",
    result,
    EASWARI_STARTUP_PERAVAI_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: EASWARI_STARTUP_PERAVAI_SLUG,
    label: "seed-event-easwari-startup-peravai",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
