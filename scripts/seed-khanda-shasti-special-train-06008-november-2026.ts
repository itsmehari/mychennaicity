/**
 * Khanda Shasti festival — Southern Railway specials 06007 (Egmore→Tiruchendur) & 06008 (return).
 *
 * Dev:  `npm run db:seed:khanda-shasti-special-train-06008-november-2026`
 * Live: `npm run db:seed:khanda-shasti-special-train-06008-november-2026:live`
 *
 * Hero: Wikimedia — Kerala Express (Southern Railway zone); illustrative, not the festival rake.
 * In-body: Wikimedia — Tiruchendur Subramaniya Swamy (Murugan) temple beach.
 *
 * X/Twitter (after live):
 * Khanda Shasti at Tiruchendur: Southern Railway specials 06007 (Egmore 4:10 pm, 14 Nov) and 06008 (Tiruchendur 10:30 pm, 15 Nov). Booking for 06008 opens 14 Nov, 8 am.
 * https://mychennaicity.in/chennai-local-news/khanda-shasti-special-train-06008-tiruchendur-chennai-november-2026
 * #KhandaShastiFestival #SpecialTrain #Chennai #Tiruchendur #SouthernRailway #mychennaicity
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const SR = "https://sr.indianrailways.gov.in/";

/** Southern Railway — illustrative express (Wikimedia CC BY-SA, Superfast1111) */
const HERO_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Kerala_Express_with_Erode_WAP_4.jpg/1280px-Kerala_Express_with_Erode_WAP_4.jpg";

/** Arulmigu Subramaniya Swamy Temple, Tiruchendur — beach (Wikimedia CC BY-SA, Aravind Sivaraj) */
const TIRUCHENDUR_TEMPLE_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Beach_at_the_Thiruchendur_Murugan_Temple.JPG/1280px-Beach_at_the_Thiruchendur_Murugan_Temple.JPG";

const SLUG =
  "khanda-shasti-special-train-06008-tiruchendur-chennai-november-2026";

const live =
  process.env.SEED_LIVE === "1" || process.argv.includes("--live");

if (live) {
  loadEnv({ path: ".env.production.local" });
} else {
  loadEnv({ path: "secrets/database.local.env" });
  loadEnv({ path: ".env.local" });
  loadEnv({ path: ".env" });
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    live
      ? "Live: DATABASE_URL missing (.env.production.local)."
      : "DATABASE_URL missing — add to .env.local or secrets/database.local.env",
  );
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found. Run db:seed or create city first.");
    process.exit(1);
  }

  /** Saturday 14 November 2026, afternoon IST */
  const publishedAt = new Date("2026-11-14T09:15:00.000+05:30");
  const now = new Date();

  const reportBody = `## Disclaimer

This is **civic / travel journalism** for Chennai and Tamil Nadu readers. It summarises **Southern Railway** festival special notices for trains **06007** and **06008** (Khanda Shasti / Skanda Sashti season at Tiruchendur). It is **not** an official railway circular, a ticket, or a guarantee of berth availability.

Festival specials can be altered, combined or cancelled. **Confirm train number, date, time and quota on [IRCTC](https://www.irctc.co.in/) or at the station** before you travel or cancel other plans.

## Key takeaways

- **Train 06007** — **one-way superfast special**, **Chennai Egmore → Tiruchendur**, for devotees leaving the capital for the festival.
- **06007 — Departure:** **16:10 hrs (4:10 pm) on Saturday, 14 November 2026** from Chennai Egmore.
- **06007 — Arrival:** **04:00 hrs (4:00 am) on Sunday, 15 November 2026** at Tiruchendur.
- **06007 — Booking:** advance reservation was listed as opening **18:00 hrs (6:00 pm) on Thursday, 13 November 2026** (re-check IRCTC for berths if you missed the first window).
- **Train 06008** — **one-way express special**, **Tiruchendur → Chennai Egmore**, for the return after festival night.
- **06008 — Departure:** **22:30 hrs (10:30 pm) on Sunday, 15 November 2026** from Tiruchendur.
- **06008 — Arrival:** **12:00 hrs (noon) on Monday, 16 November 2026** at Chennai Egmore.
- **06008 — Booking:** advance reservation opens **08:00 hrs (8:00 am) on Saturday, 14 November 2026**.
- **Neither train is a round trip** — book **outbound (06007)** and **return (06008)** separately if you need both.

## Fact box — train 06007 (Chennai → Tiruchendur)

| Item | Detail |
| --- | --- |
| **Train** | 06007 (festival superfast special) |
| **Direction** | Chennai Egmore → Tiruchendur (**one way**) |
| **Run date** | 14 November 2026 (Saturday afternoon departure) |
| **Departure** | Chennai Egmore **16:10 hrs** |
| **Arrival** | Tiruchendur **04:00 hrs**, **15 November 2026** |
| **Booking open** | **13 November 2026, 18:00 hrs** (per Southern Railway notice) |
| **Coach composition (as listed)** | 5 × AC three tier · 7 × AC three tier **economy** · 3 × sleeper · 1 × luggage-cum-brake van |
| **Zone** | Southern Railway |

## Fact box — train 06008 (Tiruchendur → Chennai)

| Item | Detail |
| --- | --- |
| **Train** | 06008 (festival express special) |
| **Direction** | Tiruchendur → Chennai Egmore (**one way**) |
| **Run date** | 15 November 2026 (Sunday night departure) |
| **Departure** | Tiruchendur **22:30 hrs** |
| **Arrival** | Chennai Egmore **12:00 hrs**, **16 November 2026** |
| **Booking open** | **14 November 2026, 08:00 hrs** (per Southern Railway notice) |
| **Zone** | Southern Railway |

**Official zone site:** [sr.indianrailways.gov.in](${SR})

## Why these trains matter for Chennai travellers

**Chennai, 14 November 2026** — **Skanda Sashti** / **Khanda Shasti** brings lakhs of devotees to **Tiruchendur**, where Lord Murugan’s shrine sits on the **Bay of Bengal** shore in Thoothukudi district. Southern Railway has pinned **paired one-way specials**: **06007** lifts Chennai crowds **south on Saturday evening** in time for the pre-dawn temple window on **15 November**; **06008** brings people **back into Egmore at Monday noon** after the festival night.

![Southern Railway express train hauled by a WAP-4 locomotive — illustrative photo, not trains 06007 or 06008](${HERO_IMAGE_URL})

*Illustration: a Southern Railway express (Kerala Express with Erode WAP-4, Wikimedia Commons). Festival rake, loco and coach order may differ from regular mail/express services.*

![The beach beside Arulmigu Subramaniya Swamy Temple, Tiruchendur — Murugan Kovil on the Bay of Bengal](${TIRUCHENDUR_TEMPLE_IMAGE_URL})

*Tiruchendur temple beach (Wikimedia Commons). Verify temple rituals, darshan queues and local crowd advisories on the ground.*

## Train 06007 — Chennai Egmore to Tiruchendur (14 November)

Southern Railway’s notice describes **06007** as a **one-way superfast special**. That matters if you were waiting for a **Saturday afternoon** escape from Egmore without juggling multiple mail-train connections.

### Coach composition

The poster lists:

- **5** AC three tier coaches  
- **7** AC three tier **economy** coaches  
- **3** sleeper class coaches  
- **1** luggage-cum-brake van  

Festival specials sometimes announce **3E (economy AC)** berths separately on IRCTC. If you need **sleeper** only, quota may be tight against the AC-heavy rake — try **Tambaram** or **Madurai** boarding if your ticket allows a lower fare station and you can reach the halt.

### Key stoppages — 06007

As listed on the Southern Railway notice (Egmore → Tiruchendur):

1. Chennai Egmore  
2. Tambaram  
3. Chengalpattu  
4. Melmaruvathur  
5. Villupuram  
6. Vriddhachalam  
7. Ariyalur  
8. Srirangam  
9. Tiruchirappalli  
10. **Dindigul**  
11. **Madurai**  
12. Virudhunagar  
13. Sattur  
14. Kovilpatti  
15. Tirunelveli  
16. **Tiruchendur**

**Dindigul and Madurai** appear on **06007** but not on the **06008** halt list published for the return — the two specials do **not** mirror identical routes. Do not assume you can use the same boarding or alighting pattern both ways.

### Planning the Egmore departure

- Reach **Chennai Egmore** early on **14 November** — **16:10** is a busy Saturday slot; suburban EMUs from Beach/Tambaram should be planned with buffer.
- You land at **Tiruchendur at 04:00 on 15 November** — arrange local stay, auto or lodge if you cannot go straight to the temple shore.
- Reservation for **06007** opened **13 November at 18:00** per the zone poster. If seats show waitlisted, check **Tambaram** origin or regular **Pearl City / Tuticorin** services as backup.

## Train 06008 — Tiruchendur to Chennai Egmore (15 November)

**06008** is the **return** special after festival night:

- **Departs Tiruchendur 22:30 on 15 November 2026**
- **Arrives Chennai Egmore 12:00 on 16 November 2026**
- **Reservation opens 14 November at 08:00**

### Scheduled stoppages — 06008

1. Tiruchendur  
2. Tirunelveli  
3. Kovilpatti  
4. Sattur  
5. Virudhunagar  
6. Aruppukkottai  
7. Sivaganga  
8. Karaikudi  
9. Pudukkottai  
10. Tiruchirappalli  
11. Srirangam  
12. Ariyalur  
13. Vriddhachalam  
14. Villupuram  
15. Melmaruvathur  
16. Chengalpattu  
17. Tambaram  
18. Chennai Egmore  

South Chennai passengers may prefer **alighting at Tambaram** only if the ticket is valid to that halt.

## Booking and travel tips

- **Two trains, two booking clocks:** **06007** → **13 Nov, 6:00 pm**; **06008** → **14 Nov, 8:00 am** (per notices). Search **06007** / **06008** on IRCTC when they appear in the special train master.
- Book **outbound and return separately** if you need the full Chennai ↔ Tiruchendur pair — there is **no return inclusion** on either notice.
- Carry **photo ID** matching the ticket; special trains follow normal checking rules.
- Festival crowds stack at **Tiruchendur station** on night departures — arrive early for **06008** on the 15th.
- Follow **@GMSRailway** and [Southern Railway](${SR}) for last-minute time changes.

## Fine print

This report was prepared with **AI-assisted drafting and human editorial review**. AI tools can err on times, dates, halt lists and coach counts. Cross-check **06007** (**14 Nov**, **16:10** Egmore), **06008** (**15 Nov**, **22:30** Tiruchendur), and booking times against the **Southern Railway** posters, station enquiry (**139**), or IRCTC before you pay. Photographs are **illustrative** from Wikimedia Commons under Creative Commons licences; they are not official railway publicity stills for these specials.`;

  const analysisBody = `## Pairing 06007 and 06008 on one trip

| Leg | Train | When | From → To |
| --- | --- | --- | --- |
| **Southbound** | **06007** | Sat **14 Nov**, dep **16:10** | Chennai Egmore → Tiruchendur (arr **04:00** Sun) |
| **Northbound** | **06008** | Sun **15 Nov**, dep **22:30** | Tiruchendur → Chennai Egmore (arr **12:00** Mon) |

If you only need **Chennai → Tiruchendur** this weekend, **06007** is the pinned special. If you are already in the south and only need **Monday noon at Egmore**, **06008** is the return piece.

A **noon Egmore** arrival on **16 November** connects to **suburban EMUs**, buses and **Metro** (Government Estate / LIC area from Egmore exits). When in doubt, ask the **station master** at Egmore or Tiruchendur.

**Official zone site:** [${SR}](${SR})`;

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, SLUG)))
    .limit(1);

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Khanda Shasti Festival Specials: Trains 06007 & 06008 Between Chennai Egmore and Tiruchendur",
    summary:
      "Southern Railway is running Khanda Shasti specials 06007 (Chennai Egmore to Tiruchendur, 14 Nov, 4:10 pm) and 06008 (return 15 Nov, 10:30 pm). 06007 booking opened 13 Nov at 6 pm; 06008 booking opens 14 Nov at 8 am.",
    dek: "Mobility desk — paired one-way superfast and express extras for Skanda Sashti; different halt lists via Madurai southbound; confirm on IRCTC.",
    body,
    reportBody,
    analysisBody,
    category: "Mobility",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: SR,
    sourceName: "Southern Railway (zone notices / festival special posters)",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "What time does train 06007 leave Chennai Egmore?",
          answer:
            "The Southern Railway notice lists departure at 16:10 hrs (4:10 pm) on Saturday, 14 November 2026 from Chennai Egmore.",
        },
        {
          question: "When does 06007 reach Tiruchendur?",
          answer:
            "Arrival is listed at 04:00 hrs (4:00 am) on Sunday, 15 November 2026 at Tiruchendur.",
        },
        {
          question: "When did booking open for train 06007?",
          answer:
            "The notice states advance reservation for 06007 opens at 18:00 hrs (6:00 pm) on 13 November 2026. Check IRCTC for current availability.",
        },
        {
          question: "What about train 06008 on the return?",
          answer:
            "Train 06008 leaves Tiruchendur at 22:30 hrs on 15 November 2026 and reaches Chennai Egmore at 12:00 hrs on 16 November 2026. Reservation opens 14 November at 08:00 hrs.",
        },
        {
          question: "Are 06007 and 06008 the same route in reverse?",
          answer:
            "No. The published halt lists differ — for example 06007 includes Dindigul and Madurai; the 06008 list includes Aruppukkottai, Karaikudi and Pudukkottai. Match each notice to the direction you are travelling.",
        },
        {
          question: "Is this a round-trip package?",
          answer:
            "No. Both are one-way specials. Book 06007 for Egmore to Tiruchendur and 06008 for the return separately if you need both legs.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-khanda-shasti-06008] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-khanda-shasti-06008] Inserted article:", SLUG);
  }

  console.log(
    "[seed-khanda-shasti-06008] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-khanda-shasti-06008",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});