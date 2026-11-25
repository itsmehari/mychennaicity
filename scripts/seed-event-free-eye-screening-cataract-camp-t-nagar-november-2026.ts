/**
 * Lions Clubs International, District 324 1C — free eye screening and
 * cataract surgery camp, T. Nagar, Sunday 29 November 2026.
 * In memory of Baby Charumathi. Medical partner: Aravind Eye Hospital, Chennai.
 *
 * Source: English translation of a Tamil invitation supplied to the desk.
 * Name spellings are transliterations and should be confirmed with the organisers.
 *
 * Dev:  `npm run db:seed:event:eye-screening-cataract-t-nagar`
 * Live: `npm run db:seed:event:eye-screening-cataract-t-nagar:live`
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

export const EYE_CAMP_T_NAGAR_SLUG =
  "free-eye-screening-cataract-surgery-camp-t-nagar-november-2026";

const NEWS =
  "/chennai-local-news/free-eye-screening-cataract-camp-t-nagar-november-29-2026";

const PHONE_1 = "98217 33100";
const PHONE_2 = "86089 65647";
const TEL_1 = "tel:+919821733100";
const TEL_2 = "tel:+918608965647";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** Lions Clubs International, District 324 1C, in association with Aravind Eye Hospital, Chennai

A community eye-care camp in memory of **Baby Charumathi** (born 4 June 1994; died 30 September 1994). Her eyes were donated. The camp invites the public for screening, and it promotes eye donation and treatment people can reach without a fee for the cataract package named below.

**When:** Sunday, **29 November 2026**, **9:00 AM to 1:30 PM** IST

**Where:** **Sringeri Bharathi Vidyashram**, **11, Venkat Narayana Road, T. Nagar, Chennai 600017**

Read the reported note: [Free eye screening and cataract surgery camp in T. Nagar](${NEWS})

### What the invitation says is free

- General eye examination
- Cataract screening
- Cataract surgery
- Intraocular lens (IOL) implantation
- Medicines associated with cataract surgery
- Accommodation, food, and transportation for cataract surgery patients
- Post-operative examination one month after surgery

People identified with cataract are to be taken to **Aravind Eye Hospital, Chennai**, on the day of the camp. The invitation does not print a separate hospital address or a seat cap.

### Also available at the camp

- Diabetic retinal screening
- Glaucoma screening and eye-pressure testing
- Children's eye examination
- Spectacles **at reduced prices** (the invitation does not print the reduced rate)

The invitation marks diabetic retinal screening, glaucoma testing, children's examination, and spectacles as **available**. It marks the cataract package above as **free**. Do not assume every test or a pair of spectacles is free.

### If you may need cataract surgery

People with high blood pressure, asthma, diabetes, heart disease, or any other health complication should see a general physician near home **before** the camp. Bring a **medical fitness certificate** that says you are suitable for cataract surgery, plus your **regular medicines**.

Also bring a **spare saree or veshti (dhoti)** if you are preparing for surgery.

### For everyone attending

- Aadhaar card photocopy
- Your mobile number

### Children's eye care

Parents are asked to bring children for examination if there is congenital cataract, squint (strabismus), congenital glaucoma, or night blindness.

### Diabetes and glaucoma

The invitation says people with diabetes can lose vision from retinal complications without obvious symptoms, and it asks them to come for a retinal examination. It also says glaucoma can affect eyesight without symptoms, particularly above 40, and that intraocular pressure can be checked at the camp.

### Dignitaries (spellings transliterated from Tamil)

- **Event coordinator:** PMJF Lion V. Ravichandran — District Chairperson, Global Vision Service Projects
- **Chief guest:** PMJF Lion Rajesh M. Joshi — District Governor, District 324 1C, Chennai
- **Special guest:** Mr. S. Machendranathan, IAS (Retd.) — Former Secretary (Coordination), Cabinet Secretariat, Government of India
- **Special invitee:** PMJF Lion PNS Udhayasuriyan — Vice District Governor
- **Special invitee:** MJF Lion Ramesh Raghavan — Vice District Governor
- **Special invitee:** MJF Lion A.S. Muthu — District Secretary
- **Special invitee:** PMJF Lion K.R. Balamurali — District Treasurer

Confirm these spellings with the organisers before you print them on a formal card.

### Lines from the invitation

- இன்று இரத்ததானம்! — Donate blood today!
- நாளை கண்தானம்!! — Donate eyes tomorrow!
- அனைவரும் வருக! — Everyone is welcome!
- சிகிச்சை பெறுக!! — Receive treatment!
- ஆரோக்கியம் பெறுக!!! — Attain good health!

### Enquiries

- [${PHONE_1}](${TEL_1})
- [${PHONE_2}](${TEL_2})

These are organiser numbers, not mychennaicity.in.

This listing is compiled from an English translation of the Tamil invitation. It is not an official circular from Lions Clubs International or Aravind Eye Hospital. Confirm timing, fitness papers, and what is free with the numbers above before you travel.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: EYE_CAMP_T_NAGAR_SLUG,
    title:
      "Free eye screening and cataract surgery camp — T. Nagar (29 Nov 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 11, 29, 9, 0),
    endsAt: istToUtcDate(2026, 11, 29, 13, 30),
    allDay: false,
    venueName: "Sringeri Bharathi Vidyashram",
    venueAddress: "11, Venkat Narayana Road, T. Nagar, Chennai 600017",
    localityLabel: "T. Nagar",
    featured: true,
  });
  console.log(
    "[seed-event-eye-camp-t-nagar]",
    result,
    EYE_CAMP_T_NAGAR_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: EYE_CAMP_T_NAGAR_SLUG,
    label: "seed-event-eye-camp-t-nagar",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
