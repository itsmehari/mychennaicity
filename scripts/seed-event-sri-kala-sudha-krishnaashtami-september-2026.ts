/**
 * Sri Kala Sudha Telugu Association — Krishnaashtami & 28th anniversary
 * at The Music Academy, TTK Road (13 Sep 2026, 5:00 PM). Source: organiser poster.
 *
 * Dev:  `npm run db:seed:event:sri-kala-sudha-krishnaashtami`
 * Live: `npm run db:seed:event:sri-kala-sudha-krishnaashtami:live`
 *
 * Poster: `public/images/events/sri-kala-sudha-telugu-association-krishnaashtami-september-2026.png`
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

export const SRI_KALA_SUDHA_KRISHNAASHTAMI_SLUG =
  "sri-kala-sudha-telugu-association-krishnaashtami-september-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** Sri Kala Sudha Telugu Association (est. 21 November 1998; registered), as printed on the Krishnaashtami flyer.

A **community** Krishnaashtami gathering for the association’s **28th anniversary**, hosted at **The Music Academy** on TTK Road.

**When:** Sunday, **13 September 2026** · **5:00 PM IST**. The poster does **not** print a close time.

**Where:** **The Music Academy**, T.T.K. Road, Chennai 600014 (Chennai-14)

**Contact (as printed):** 85239 49669

### Guests on the poster

Names below are transcribed from the flyer. Confirm the live dais list with the organiser.

- **Chief guest:** K. Rammohan Naidu, Minister of Civil Aviation, India
- Dr G. Vivek Venkataswamy, Minister for Labour, Telangana
- P. Viswanathan, Minister for Higher Education, Tamil Nadu
- Sahya Kumar Yadav, Minister for Health, Andhra Pradesh (as printed)
- S. Keerthana, Minister for Industries, Tamil Nadu
- Rajgopal Reddy, MLA, and Komathireddy Laxmi
- Mamidala Buddhaprasad, MLA, Guntur, Andhra Pradesh
- Nannapaneni Venkatarao, MLA, Repalle, Guntur district, Andhra Pradesh (as printed)
- K.S. Chithra
- Ramya Nandakumar
- Dr Tejaswini Manogna

### Admission

The poster marks **All are Welcome**. It does **not** print a ticket price. It also says **each family will get 1 gram silver coin** — treat that as the organiser’s printed offer, not a guarantee from this site. Confirm at the door.

### Sponsor mark

**South East Constructions Company Pvt. Ltd.** (engineers and contractors, Chennai) is printed as the sponsor on the same flyer. That is not an endorsement by this site.

This listing is compiled from the organiser poster. It is not an official association or Music Academy notice. Confirm time, hall, and entry rules before you go.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: SRI_KALA_SUDHA_KRISHNAASHTAMI_SLUG,
    title:
      "Sri Kala Sudha Telugu Association Krishnaashtami — Music Academy (13 Sep 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 9, 13, 17, 0),
    endsAt: istToUtcDate(2026, 9, 13, 21, 0),
    allDay: false,
    venueName: "The Music Academy",
    venueAddress: "T.T.K. Road, Royapettah, Chennai 600014",
    localityLabel: "Royapettah",
    featured: true,
  });
  console.log(
    "[seed-event-sri-kala-sudha-krishnaashtami]",
    result,
    SRI_KALA_SUDHA_KRISHNAASHTAMI_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: SRI_KALA_SUDHA_KRISHNAASHTAMI_SLUG,
    label: "seed-event-sri-kala-sudha-krishnaashtami",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
