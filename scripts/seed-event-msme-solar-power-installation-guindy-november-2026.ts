/**
 * MSME TDC Chennai — Solar Power Installation training (Guindy, 13–15 Nov 2026).
 * Govt. of India certificate; CFTI campus.
 *
 * Dev:  `npm run db:seed:event:msme-solar-power-installation-guindy`
 * Live: `npm run db:seed:event:msme-solar-power-installation-guindy:live`
 *
 * Poster: `public/images/events/msme-solar-power-installation-guindy-november-2026.png`
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

export const MSME_SOLAR_INSTALLATION_GUINDY_SLUG =
  "msme-solar-power-installation-training-guindy-november-2026";

const SITE = "https://www.cftichennai.in";
const EMAIL = "msmetdc@cftichennai.in";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** MSME Technology Development Centre, Chennai (Ministry of Micro, Small & Medium Enterprises, Government of India) · **CFTI Campus, Guindy**

### Tamil note (as shared)

அனைவருக்கும் வணக்கம்.

**மத்திய அரசு சான்றிதழுடன்** **SOLAR POWER INSTALLATION** (சோலார் பவர் இன்ஸ்டாலேஷன்) பயிற்சிக்கு ஓர் அரிய வாய்ப்பு. MSME-ல் இந்தப் படிப்பின் மூலம் **TEDA & MNRE registration** செய்து கொள்ளலாம் என்றும், **மத்திய & மாநில அரசு மானியங்கள்** பெறுவதற்கான வழிமுறைகளை விளக்குவதாக centre குறிப்பிடுகிறது. மானியம்/registration eligibility-யை MNRE, TEDA மற்றும் centre-இல் நேரில் confirm செய்யுங்கள்.

**When:** **Friday 13 to Sunday 15 November 2026** (Fri, Sat & Sun), **10:00 AM to 5:00 PM IST** each day, as on the poster.

**Where:** **MSME Technology Development Centre (TDC)**, **CFTI Campus**, **65/1, G.S.T. Road, Guindy, Chennai 600032**.

### Course (English, as on poster)

**SOLAR POWER INSTALLATION** — **Government of India certificate** for successful candidates.

**Coverage includes:** electricity basics; solar panel types and functions; charge controller; battery types; series and parallel connections; inverter types; DC to AC converters; power and load calculation formulas; design; model project; market rate analysis; central and state policies; subsidy schemes.

**Eligibility:** 10th standard and above · age **18+**.

**Who may attend (as printed):** people in service, job seekers, self-employed, engineers, corporate students, NRI returnees, retired persons, and other interested candidates.

### Fees and payment (as on poster)

**Course fee:** **₹9,000** (including GST).

Pay by **bank transfer / NEFT** or **demand draft**.

| | |
| --- | --- |
| Account name | DIRECTOR, MSME TDC, Chennai |
| Bank | SBI, Guindy |
| Account no. | 39868874350 |
| IFSC | SBIN0000956 |
| MICR | 600002072 |

DD in favour of **“DIRECTOR, MSME TDC”**, payable at **Chennai**.

### Contact

- **Phone:** **94440 34246** · **98410 99911** · **91595 87689** (centre numbers, not mychennaicity.in)
- **Email:** [${EMAIL}](mailto:${EMAIL})
- **Website:** [cftichennai.in](${SITE})

This listing is compiled from the centre’s training poster and the Tamil note shared with MyChennaiCity. It is not an official MNRE or TEDA notice. Confirm seats, fee receipt, and subsidy or registration claims with MSME TDC before you pay.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: MSME_SOLAR_INSTALLATION_GUINDY_SLUG,
    title:
      "Solar Power Installation training — MSME TDC, Guindy (13–15 Nov 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 11, 13, 10, 0),
    endsAt: istToUtcDate(2026, 11, 15, 17, 0),
    allDay: false,
    venueName: "MSME Technology Development Centre · CFTI Campus",
    venueAddress: "65/1, G.S.T. Road, Guindy, Chennai 600032",
    localityLabel: "Guindy",
    featured: true,
  });
  console.log(
    "[seed-event-msme-solar-guindy]",
    result,
    MSME_SOLAR_INSTALLATION_GUINDY_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: MSME_SOLAR_INSTALLATION_GUINDY_SLUG,
    label: "seed-event-msme-solar-guindy",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
