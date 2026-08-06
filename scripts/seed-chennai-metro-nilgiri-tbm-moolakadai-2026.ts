/**
 * CMRL Phase 2 — TBM Nilgiri (S96) breakthrough at Moolakadai (English).
 *
 * Dev:  npm run db:seed:chennai-metro-nilgiri-tbm-moolakadai-2026
 * Live: npm run db:seed:chennai-metro-nilgiri-tbm-moolakadai-2026:live
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL =
  "/images/articles/chennai-metro-nilgiri-tbm-moolakadai-breakthrough-2026.jpg";

const CMRL_PROJECT_STATUS = "https://chennaimetrorail.org/project-status/";
const CMRL_SITE = "https://chennaimetrorail.org/";
const RELATED_TAMIL =
  "/chennai-local-news/chennai-metro-nilgiri-tbm-breakthrough-moolakadai-2026-tamil";
const RELATED_C5 =
  "/chennai-local-news/chennai-metro-corridor-5-u-girders-completed-2026";
const RELATED_RIDERSHIP =
  "/chennai-local-news/chennai-metro-may-2026-ridership-90-lakh-passengers";
const RELATED_PHASE1 =
  "/chennai-local-news/chennai-metro-phase-1-stations-refurbishment-upgrade-2026";
const RELATED_MOBILITY = "/chennai-local-news/topic/mobility";

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
const SLUG = "chennai-metro-nilgiri-tbm-breakthrough-moolakadai-2026";

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

  const publishedAt = new Date("2026-08-06T12:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Tunnel boring machine **Nilgiri (S 96)** has completed its **up-line** drive and broken through at **Moolakadai Metro station** on **Corridor 3** of Chennai Metro Phase 2.
- The drive covered about **819 metres** from **Madhavaram High Road** to Moolakadai under the **TU-01** package executed by **Tata Projects**.
- CMRL says this is the **11th** successful TBM breakthrough under TU-01 and the **24th** Phase 2 TBM breakthrough citywide so far.
- The stretch passed under the **Buckingham Canal** and a busy road; CMRL says more than **14 deep borewells** were protected with alternate drinking-water arrangements, and ground movement stayed within permitted limits.
- This is a **construction milestone**, not a passenger-opening announcement.

[தமிழ் பதிப்பு](${RELATED_TAMIL})

## Disclaimer

This article is **civic journalism** for public-interest information. It summarises a **CMRL press note** and published CMRL project materials available at the time of writing. It is **not** an official CMRL communication, tender notice or passenger-service advisory.

Construction figures, timelines and opening dates can change after publication. Items marked **[unconfirmed]** were not stated in the sources reviewed here. Verify current information with [CMRL](${CMRL_SITE}) before relying on this article for travel, property or worksite decisions.

## Summary

**Chennai, 6 August 2026** — Chennai Metro Rail Limited (CMRL) has reported that tunnel boring machine **Nilgiri (S 96)** has successfully completed tunnelling on the **up line** between **Madhavaram High Road** and **Moolakadai** Metro stations and reached Moolakadai station box.

The about **819-metre** drive falls under **Corridor 3** of Phase 2 — specifically the first roughly **9 km** underground package from **Madhavaram Milk Colony to Kellys**, being built by **Tata Projects** under contract **TU-01**. CMRL describes the Moolakadai arrival as the **11th** TBM breakthrough under that package and part of **24** Phase 2 TBM breakthroughs completed so far across the project.

## Where this sits on Corridor 3

Corridor 3 is the north–south spine of Phase 2: **Madhavaram Milk Colony to Siruseri SIPCOT**, about **45.8 km** in CMRL’s published project summary (about **19.1 km** elevated and **26.7 km** underground).

The Nilgiri breakthrough is on the **northern underground head** of that corridor — the Madhavaram–Kellys tunnelling package — not on the elevated OMR / SIPCOT end. In plain terms: machines are still assembling the buried twin tunnels that will eventually carry trains through dense North Chennai before the line continues south toward the IT corridor.

Nearby stations on this northern package include **Madhavaram Milk Colony**, **Madhavaram High Road**, **Moolakadai** and onward toward **Kellys**. Passenger service dates for these stations remain **[unconfirmed]** in public CMRL project materials cited here.

## Phase 2 at a glance

| Item | CMRL published figure |
| --- | --- |
| Phase 2 length | **118.9 km** |
| Corridors | **3** (Corridors 3, 4 and 5) |
| Stations (planned) | **128** |
| Corridor 3 | Madhavaram Milk Colony → Siruseri SIPCOT — **45.8 km** |
| Corridor 4 | Lighthouse → Poonamallee Bypass — **26.1 km** |
| Corridor 5 | Madhavaram → Sholinganallur — **47.0 km** |
| Elevated / underground (Phase 2) | About **76.3 km** elevated · **42.6 km** underground |
| Estimated cost (incl. IDC) | About **₹63,246 crore** |
| Target completion (CMRL project status) | End of **2028** |

Phase 1 and Phase 1 Extension are already in passenger service; Phase 2 is the large expansion still under construction.

## The seven TBMs on the Madhavaram–Kellys package

CMRL has said **seven** tunnel boring machines are mobilised for the first **9 km** underground section from Madhavaram Milk Colony to Kellys under Tata Projects (TU-01). Machines on Corridor 3 are named after Tamil Nadu mountains and rivers. The seven TU-01 names published by CMRL for the northern package are:

| TBM | Early published drive (CMRL naming note) |
| --- | --- |
| **Nilgiri** | Madhavaram Milk Colony → Madhavaram High Road |
| **Podhigai** | Madhavaram Milk Colony → Madhavaram High Road |
| **Anaimalai** | Madhavaram Milk Colony → Venugopal Nagar |
| **Servarayan** | Madhavaram Milk Colony → Venugopal Nagar |
| **Kalvarayan** | Ayanavaram → Perambur |
| **Melagiri** | Ayanavaram → Perambur |
| **Kolli** | Ayanavaram → Otteri |

TBMs are often **launched, retrieved and redeployed**. Nilgiri’s first major public milestone was the **1.4 km** drive from Madhavaram Milk Colony to Madhavaram High Road (launched **13 October 2022**, breakthrough **7 August 2023**). The latest drive — Madhavaram High Road → Moolakadai (**up line**, ~**819 m**) — is a later assignment of the same machine family on the twin-tunnel alignment. Exact launch date for this second Nilgiri drive is **[unconfirmed]** in the press note summarised here.

## Timeline of Nilgiri so far

| Date | Milestone |
| --- | --- |
| **13 Oct 2022** | CM inaugurates Nilgiri drive: Madhavaram Milk Colony → Madhavaram High Road |
| **7 Aug 2023** | Nilgiri breakthrough at Madhavaram High Road after ~**1.4 km** |
| **[unconfirmed]** | Nilgiri starts up-line drive Madhavaram High Road → Moolakadai |
| **Aug 2026 (this note)** | Nilgiri breakthrough at **Moolakadai** after ~**819 m** |
| Next for passengers | Station box finishing, track, systems, trials — opening date **[unconfirmed]** |

## Funding and agencies

Phase 2 is a joint Centre–State metro expansion implemented by **CMRL**, with multilateral lending supporting large packages:

- **JICA** has been tied to about **52.01 km** (Madhavaram–Sholinganallur portion of Corridor 3 and Madhavaram–CMBT portion of Corridor 5), as a State Sector project in CMRL’s project-status note.
- The balance about **66.89 km** (full Corridor 4 and remaining Corridor 3 & 5 sections) has been posed for funding from multilateral banks including **ADB**, **AIIB** and **NDB**.
- Day-to-day delivery on this stretch also involves the **General Consultant** team and contractor **Tata Projects** under TU-01.

Readers should treat funding labels as **project-finance context**, not as a claim that every local bore is paid from a single lender’s line.

## Why Moolakadai and Madhavaram High Road matter on the ground

**Madhavaram High Road** and **Moolakadai** sit on one of North Chennai’s busiest road spines — a mix of GNT Road / Inner Ring Road traffic, wholesale and logistics movement, and dense neighbourhood access. Peak-hour queues, canal-side constraints and utility conflicts are everyday facts of life here.

Boring under the **Buckingham Canal** and a live carriageway is exactly the kind of urban tunnelling that residents notice only when something goes wrong. CMRL’s note stresses that vibration and settlement stayed within permitted limits, continuous instrumentation was used, and more than **14 deep borewells** were managed with **alternate water supply** so drinking-water access was not left hanging during the drive.

For people living above the alignment, the practical message is: this breakthrough reduces one underground construction risk on this short link — it does **not** yet mean metro trains are running under Moolakadai.

## What happened at the breakthrough

- Nilgiri completed ~**819 m** of up-line tunnel and entered the **Moolakadai** station structure.
- CMRL calls it the **11th** TU-01 TBM breakthrough and the **24th** Phase 2 TBM breakthrough overall so far.
- Works under Buckingham Canal and busy road sections were completed with monitoring; borewell mitigation was arranged.
- Officials present included CMRL AGM (Tunnels) **Kolli Venkata Ramana**, GC Chief Mapping Engineer **PSS Naidu**, Tata Projects Project Manager **Vijaya Kumar**, and other CMRL, Tata Projects and General Consultant staff.

## Fact box

| Item | Detail |
| --- | --- |
| Story type | Civic / metro construction news |
| Neighbourhood | Madhavaram High Road · Moolakadai (North Chennai) |
| Corridor | Phase 2 Corridor 3 |
| Package | TU-01 · Tata Projects · Madhavaram Milk Colony–Kellys (~9 km UG) |
| Machine | Nilgiri (S 96) · up line |
| Drive length (this breakthrough) | ~819 m |
| Phase 2 TBM breakthroughs so far (CMRL) | 24 |
| Passenger opening | [unconfirmed] |
| Category | Mobility |
| Verification | Based on CMRL press note + CMRL project-status / earlier CMRL TBM naming releases |

## Sources

- Primary: Chennai Metro Rail Limited press note on Nilgiri (S 96) breakthrough at Moolakadai (as provided for this report)
- Project figures: [CMRL Phase 2 project status](${CMRL_PROJECT_STATUS})
- Earlier Nilgiri timeline / TU-01 context: CMRL press releases on TBM naming and Madhavaram High Road breakthrough (2023)
- Agency site: [${CMRL_SITE}](${CMRL_SITE})`;

  const analysisBody = `## Why Chennai readers should care

North Chennai’s underground metro works are slow, technical and easy to misread as “almost open.” A TBM breakthrough is real progress on the **tunnel shell** — not a timetable for tickets. Still, each completed drive on the Madhavaram–Kellys package shortens the list of unfinished twin-tunnel links that must exist before Corridor 3 can run through this belt.

For Madhavaram and Moolakadai residents, the local stakes are concrete: fewer months of settlement risk on this segment, clearer water-mitigation outcomes from the borewell plan, and one less reason for prolonged shaft and road conflict once station and systems works take over.

## What changes for citizens

1. Treat this as a **construction update**, not a service start.
2. Watch CMRL / traffic-police advisories around Madhavaram High Road and Moolakadai while station and utility works continue.
3. Separate **TBM breakthroughs** from **track laying, signalling, power and trial runs**.
4. Follow official CMRL notices for any revised diversion or water-supply arrangements near the alignment.

## Conclusion

Nilgiri’s arrival at Moolakadai is a hard-earned civil milestone on Corridor 3’s toughest northern underground stretch — under canal, road and living neighbourhoods, with utility protection built into the story. Phase 2’s larger map still stretches to SIPCOT, Poonamallee and Sholinganallur; funding partners and three corridors are still years of systems work away from a finished network. For Chennai, the right reading is steady: another tunnel is in place, North Chennai’s metro spine is closer to continuous underground connectivity — and passenger opening remains a later chapter that only CMRL’s trial-run calendar can unlock.

## Related reading on mychennaicity.in

- [தமிழ் பதிப்பு — நீலகிரி TBM முலாக்கடை](${RELATED_TAMIL})
- [Mobility topic hub](${RELATED_MOBILITY})
- [Corridor-5 U-girder casting milestone](${RELATED_C5})
- [May 2026 metro ridership](${RELATED_RIDERSHIP})
- [Phase-1 station refurbishment](${RELATED_PHASE1})

## Editorial note

Opening dates, remaining TBM launch schedules and exact second-drive start date for Nilgiri toward Moolakadai are marked **[unconfirmed]** where the summarised press note or cited CMRL pages do not state them. Photo shows the cutterhead breakthrough at the Moolakadai station structure (CMRL / project site image supplied with the press note).

## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can sometimes make mistakes — misread numbers, miss nuance, or invent detail.
Please cross-check important facts with CMRL or other primary sources before acting on them.`;

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
      "Chennai Metro Phase 2: Nilgiri TBM breaks through at Moolakadai",
    summary:
      "TBM Nilgiri (S 96) completes an 819 m up-line drive from Madhavaram High Road to Moolakadai under Corridor 3 — the 11th TU-01 breakthrough and 24th Phase 2 TBM success so far.",
    dek: "Under Buckingham Canal and a busy North Chennai road, Tata Projects’ TU-01 machine reaches Moolakadai — construction progress, not passenger opening.",
    body,
    reportBody,
    analysisBody,
    category: "Mobility",
    areaHubSlug: "madhavaram-madhavaram" as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: CMRL_PROJECT_STATUS,
    sourceName: "CMRL press note on Nilgiri (S 96) Moolakadai breakthrough; CMRL project status",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "Does this mean metro trains will start at Moolakadai soon?",
          answer:
            "No. A TBM breakthrough finishes a tunnel drive into the station box. Track, systems, station finishing and trial runs still remain. Passenger opening is unconfirmed.",
        },
        {
          question: "What is Corridor 3?",
          answer:
            "Corridor 3 of Chennai Metro Phase 2 runs from Madhavaram Milk Colony to Siruseri SIPCOT — about 45.8 km in CMRL’s project summary, with a long underground northern section.",
        },
        {
          question: "What is TU-01?",
          answer:
            "TU-01 is the Tata Projects tunnelling package for the first about 9 km underground section from Madhavaram Milk Colony to Kellys on Corridor 3, using seven TBMs.",
        },
        {
          question: "Which TBMs are on this package?",
          answer:
            "CMRL’s naming note lists Nilgiri, Podhigai, Anaimalai, Servarayan, Kalvarayan, Melagiri and Kolli for the Madhavaram–Kellys TU-01 package. Machines can be redeployed after retrieval.",
        },
        {
          question: "Who funds Phase 2?",
          answer:
            "CMRL lists an estimated project cost of about ₹63,246 crore. About 52.01 km is tied to JICA; the balance about 66.89 km has been linked to multilateral banks including ADB, AIIB and NDB, alongside Centre–State roles.",
        },
        {
          question: "Why did the work need alternate water supply?",
          answer:
            "CMRL says the drive affected more than 14 deep borewells along the alignment. Alternate drinking-water arrangements were provided so public supply was not disrupted.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-nilgiri-en] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-nilgiri-en] Inserted article:", SLUG);
  }

  console.log(
    "[seed-nilgiri-en] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-nilgiri-en",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
