/**
 * Flipkart Seller Summit 2026 — Chennai (StartupTN × Sathyabama).
 * Checked 24 November 2026:
 * - https://form.startuptn.in/FSS (Flipkart X StartupTN D2C Summit 2026 — Chennai)
 * - organiser poster (Tamil/English, 28 Nov 2026)
 *
 * Poster prints **2:30 PM** start; the registration form lists **1:00 PM–6:00 PM**.
 * Poster note: GST-registered sellers only. The form also offers a non-GST path
 * with spot registration help — confirm eligibility before you book.
 *
 * Dev:  `npm run db:seed:event:flipkart-seller-summit`
 * Live: `npm run db:seed:event:flipkart-seller-summit:live`
 *
 * Poster: `public/images/events/flipkart-seller-summit-sathyabama-chennai-november-2026.png`
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

export const FLIPKART_SELLER_SUMMIT_CHENNAI_SLUG =
  "flipkart-seller-summit-sathyabama-chennai-november-2026";

const REGISTER = "https://form.startuptn.in/FSS";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Presented by:** Flipkart and Shopsy, in association with **StartupTN** and **Sathyabama Institute of Science and Technology**

**Flipkart Seller Summit 2026** brings Tamil Nadu sellers to Chennai for onboarding support, catalog guidance, and growth sessions with Flipkart leaders. The summit is part of the StartupTN roadshow; the public registration page titles this stop **Flipkart X StartupTN D2C Summit 2026 — Chennai**.

**When:** **Saturday 28 November 2026**. The flyer prints **from 2:30 PM IST**. The [StartupTN registration form](${REGISTER}) lists **1:00 PM–6:00 PM**. Confirm the gate time when your pass is confirmed.

**Where:** **Sathyabama Institute of Science and Technology** (Sathyabama University campus), **Semmancheri, Chennai 600119**.

### What is on offer (as promoted)

- **Fast-tracked onboarding** — dedicated support to get seller accounts moving without the usual back-and-forth.
- **End-to-end business setup** — walk-through of listing, catalog, and day-to-day seller operations.
- **Networking with leaders** — meet Flipkart experts and expand your business contacts.
- **Growth strategies** — practical tactics for scaling on Flipkart and Shopsy.

The registration form also highlights **spot onboarding** (live store setup at the venue), **GST and trademark guidance**, **seller bank-loan orientation**, and a **cataloging workshop**. Those lines are on the official form, not repeated on every flyer.

### Register

**Booking:** [Reserve your entry pass](${REGISTER}) (StartupTN / Flipkart form)

Seats are filling quickly on the organisers’ messaging. Pre-registration is required. The form notes **up to two attendees per seller registration**.

**Eligibility:** The Tamil flyer states that **only GST-registered sellers** may register. The same form also offers a **non-GST** option with spot help to register. If you are not GST-registered, read the form carefully before you submit — do not assume walk-in entry.

### Tamil (as on the flyer)

தமிழ்நாடு விற்பனையாளர்களின் கவனத்திற்கு! Flipkart மற்றும் Shopsy மூலம் உங்கள் வணிகத்தை அடுத்த கட்டத்திற்கு எடுத்துச் செல்லுங்கள். StartupTN உடன் இணைந்து Flipkart Seller Summit 2026 நிகழ்வை சென்னைக்குக் கொண்டு வருகிறோம்.

உங்களுக்காகக் காத்திருப்பவை:

- **விரைவான ஆன்போர்டிங்** — குழப்பங்களைத் தவிர்த்து, பிரத்யேக மற்றும் விரைவான ஆன்போர்டிங் ஆதரவு.
- **முழுமையான வணிக அமைப்பு** — வணிகச் செயல்பாடுகளை அமைப்பதற்கான முழு வழிகாட்டுதல்.
- **தலைவர்களுடன் நெட்வொர்க்கிங்** — Flipkart நிபுணர்களைச் சந்தித்து தொடர்புகளை விரிவுபடுத்துதல்.
- **வளர்ச்சி உத்திகள்** — சவால்களைச் சமாளித்து வெற்றிக்கான துல்லியமான உத்திகள்.

📍 **இடம்:** சத்யபாமா அறிவியல் மற்றும் தொழில்நுட்ப நிறுவனம், சென்னை  
📅 **நேரம்:** 28 நவம்பர், 2026 \| பிற்பகல் 2:30 மணி முதல் (பதிவுப் படிவம் 1:00–6:00 மணி என்றும் குறிப்பிடுகிறது)

இடங்கள் வேகமாக நிரம்பி வருகின்றன. உங்கள் இடத்தை உறுதி செய்ய இப்போதே முன்பதிவு செய்யுங்கள். (GST பதிவு பெற்ற விற்பனையாளர்களுக்கு மட்டுமே முன்பதிவு செய்ய அனுமதி உண்டு.)

This listing is compiled from the StartupTN registration page and the summit flyer shared with MyChennaiCity. It is not an official Flipkart or StartupTN press release. Confirm your pass, GST eligibility, and hall entry on the form before you travel.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: FLIPKART_SELLER_SUMMIT_CHENNAI_SLUG,
    title:
      "Flipkart Seller Summit 2026, Sathyabama Chennai (28 November 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 11, 28, 14, 30),
    endsAt: istToUtcDate(2026, 11, 28, 18, 0),
    allDay: false,
    venueName:
      "Sathyabama Institute of Science and Technology, Semmancheri",
    venueAddress:
      "Sathyabama University campus, Semmancheri, Chennai, Tamil Nadu 600119",
    localityLabel: "Semmancheri",
    featured: true,
  });
  console.log(
    "[seed-event-flipkart-seller-summit]",
    result,
    FLIPKART_SELLER_SUMMIT_CHENNAI_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: FLIPKART_SELLER_SUMMIT_CHENNAI_SLUG,
    label: "seed-event-flipkart-seller-summit",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});