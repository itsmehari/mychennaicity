/**
 * Tamil Nadu IAS reshuffle & collector transfers — May 2026 (G.O. Rt. No. 1883).
 *
 * Dev:  `npm run db:seed:tn-ias-reshuffle-may-2026`
 * Live: `npm run db:seed:tn-ias-reshuffle-may-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL = "/images/articles/tamil-nadu-cabinet-portfolios-hero.jpg";

const OFFICIAL_GO_PDF =
  "/documents/Tamilnadu-Collectors-Reshuffle-May-2026-IAS TN_1780065440019.pdf";
const SOURCE_URL = `https://mychennaicity.in${encodeURI(OFFICIAL_GO_PDF)}`;

const SECRETARIAT_URL =
  "https://thesecretariat.in/article/tamil-nadu-announces-major-ias-reshuffle-new-postings-across-key-departments";

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

const SLUG = "tamil-nadu-ias-reshuffle-collectors-may-2026";

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

  const publishedAt = new Date("2026-05-29T05:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Tamil Nadu issued **G.O. (Rt.) No. 1883** on **29 May 2026** (Public Special-A Department), transferring and posting **more than 30 IAS officers** across departments, districts, and state corporations.
- **14 district collectors** were reassigned, including a direct swap of **Madurai** and **Nagapattinam** between **P. Akash** and **K.J. Praveen Kumar**.
- The government **created temporary IAS cadre posts** for one year: **Commissioner, Prohibition and Excise** (Super Time Scale); and **Director, Town Panchayats**; **Director, Indian Medicine and Homeopathy**; and **Director, Rehabilitation and Welfare of Non-Resident Tamils** (Senior Scale).
- **R. Lalitha** moves from MD, New Tiruppur Area Development Corporation to **Secretary to Government (Expenditure), Finance Department**.
- **Official source:** [Download G.O. (Rt.) No. 1883 — 29.05.2026 (PDF)](${SOURCE_URL}) — full transfer list as notified by the government.

## What was announced

**Chennai, 29 May 2026** — The Tamil Nadu government has carried out a major **Indian Administrative Service (IAS)** reshuffle, notifying transfers and postings under **Rule 4(2) of the IAS (Cadre) Rules, 1954**, and placing several officers on **deputation** to state corporations and special-purpose bodies.

The order is issued as **G.O. (Rt.) No. 1883**, **Public (Special-A) Department**, dated **29.05.2026**, and signed by **Chief Secretary M. Sai Kumar** (by order of the Governor). It amends and builds on a chain of earlier Special-A orders from **July 2024** through **May 2026**.

Reporting by [The Secretariat](${SECRETARIAT_URL}) on **29 May 2026** highlighted **E. Sundaravalli** (Collegiate Education → Special Secretary, Public and Rehabilitation) and **R. Lalitha** (Expenditure Secretary, Finance) among the headline moves, alongside multiple new district collectors.

## New temporary IAS posts (one year)

The government sanctioned **temporary cadre posts** for one year from appointment, or until need ceases:

| Post | Scale |
|------|--------|
| Commissioner, Prohibition and Excise | Super Time Scale |
| Director, Town Panchayats | Senior Scale |
| Director, Indian Medicine and Homeopathy | Senior Scale |
| Director, Rehabilitation and Welfare of Non-Resident Tamils | Senior Scale |

**Pay equivalence:** Under Rule 12(1) of the IAS (Pay) Rules, 2016, the Commissioner post is declared equivalent to **Registrar of Cooperative Societies**; the three Director posts are equivalent to **Director of Social Welfare** (Schedule II-A / II-B).

## Department and secretariat transfers

| Officer | From | To |
|---------|------|-----|
| **E. Sundaravalli** | Commissioner, Collegiate Education | Special Secretary to Government, Public and Rehabilitation Department |
| **R. Lalitha** | MD, New Tiruppur Area Development Corporation | Secretary to Government (Expenditure), Finance Department |
| **A.K. Kamal Kishore** | District Collector, Tenkasi | Joint Secretary to Government, Finance Department |
| **M.S. Prasanth** | District Collector, Kallakurichi | Joint Secretary to Government, Finance Department |
| **R. Alagumeena** | District Collector, Kanniyakumari | Deputy Secretary to Government, Health and Family Welfare |
| **Pooja Kulkarni** | CEO, Tamil Nadu Infrastructure Development Board | Commissioner, Prohibition and Excise |
| **V. Amuthavalli** | (formerly Handlooms Secretary) | Commissioner, Rural Development |
| **P. Ponniah** | Commissioner, Rural Development | Commissioner, Collegiate Education |
| **Dr. T.G. Vinay** | MD, Tamil Nadu Green Energy Corporation | Commissioner, HR&CE |
| **R. Kannan** | VC / MD, Tamil Nadu Watershed Development Agency | Commissioner, Sugar *(retains TNWDA MD in full additional charge)* |
| **Chandra Sekhar Sakhamuri** | CEO, Chennai Metropolitan Development Authority (CMDA) | Director, Agricultural Marketing and Agri Business |
| **Dr. S. Uma** | Additional Secretary, Health and Family Welfare | Project Director, Tamil Nadu Health Systems Project |
| **B. Priyanka** | District Collector, Thanjavur | Director, Town Panchayats |
| **K. Balasubramaniam** | Additional Secretary, Public and Rehabilitation | Director, Indian Medicine and Homeopathy |
| **K. Tharpagaraj** | District Collector, Tiruvannamalai | Additional Registrar of Cooperative Societies |
| **R. Sadheesh** | District Collector, Dharmapuri | Director, Rehabilitation and Welfare of Non-Resident Tamils |

## District collector transfers (14 districts)

| Officer | From | To |
|---------|------|-----|
| **P. Akash** | Nagapattinam | **Madurai** |
| **K.J. Praveen Kumar** | Madurai | **Nagapattinam** |
| **Dr. R. Vaithinathan** | (ex-DIPR / Tamil Development) | **Theni** |
| **V. Saravanan** | Tiruchirappalli | **Dharmapuri** |
| **M. Prathap** | Tiruvallur | **Kanniyakumari** |
| **Pratik Tayal** | Joint Secretary, Finance | **Tiruchirappalli** |
| **Vandana Garg** | (return from leave) | **Tiruvannamalai** |
| **J.E. Padmaja** | Additional Collector (DRDA), Viluppuram | **Kallakurichi** |
| **N. Priya** | Joint MD / PD, TNUHDB | **Ranipet** |
| **L. Madhubalan** | Commissioner, Tiruchirappalli Corporation | **Namakkal** |
| **Anand Mohan** | Joint MD, TWAD Board | **Tirunelveli** |
| **P.S. Leela Alex** | Member Secretary, Chennai Rivers Restoration Trust; MD, Chennai Rivers Transformation Company | **Vellore** |
| **R. Revathi** | Deputy Secretary, Higher Education | **Thanjavur** |
| **Dr. M. Veerappan** | Additional Registrar of Cooperative Societies | **Chengalpattu** |

### Madurai ↔ Nagapattinam swap

The order explicitly pairs **Akash** and **Praveen Kumar** as mutual replacements — a straight two-district exchange rather than a one-way vacancy fill.

## Corporation and special-body deputations

| Officer | Placed at disposal of | Role |
|---------|------------------------|------|
| **Mangat Ram Sharma** | TN Power Fin and Infrastructure Development Corp. (POWERFIN) | Chairman and MD |
| **J. Jayakanthan** | Poompuhar Shipping Corporation | Chairman and MD |
| **E. Saravanavelraj** | Tamil Nadu Minerals Limited | MD *(+ full additional charge, TN Magnesite Ltd., Salem)* |
| **P.N. Sridhar** | Tamil Nadu Green Energy Corporation | MD |
| **S.P. Karthikaa** | Chennai Metropolitan Development Authority (CMDA) | CEO |
| **R.V. Shajeevana** | Tamil Nadu Textbook and Educational Services Corporation | MD |
| **Simranjeet Singh Kahlon** | Chennai Rivers Restoration Trust | Member Secretary *(+ additional charge, TN Skill Development Corporation)* |
| **B. Ganesan** | New Tiruppur Area Development Corporation | MD |
| **Ranjeet Singh** | Tamil Nadu Urban Infrastructure Financial Services Limited | MD |
| **V.R. Subbulaxmi** | Tamil Nadu Rural Transformation Project | Chief Operating Officer *(+ full additional charge, TN Women Employment and Safety Project)* |

Deputation terms for foreign service are governed by **G.O.Ms. No. 167**, Public (Special-A), dated **21.02.1994**.

## Fact box

| Item | Detail |
|------|--------|
| **Order** | G.O. (Rt.) No. 1883 |
| **Department** | Public (Special-A) |
| **Date** | 29 May 2026 |
| **Signatory** | M. Sai Kumar, Chief Secretary to Government |
| **Legal basis** | IAS (Cadre) Rules, 1954; IAS (Pay) Rules, 2016 |
| **Collectors shifted** | 14 (per notified district collector postings) |
| **IAS officers named** | 30+ in transfer notification; additional corporation deputations |

## Sources

- **Primary:** [G.O. (Rt.) No. 1883 — 29.05.2026 (PDF)](${SOURCE_URL}) hosted on mychennaicity.in
- **Context:** [The Secretariat — TN IAS reshuffle, 29 May 2026](${SECRETARIAT_URL})`.trim();

  const analysisBody = `## Why Chennai readers should care

This reshuffle is statewide, but several postings touch **Greater Chennai’s governance perimeter** and **capital-region institutions**:

- **P.S. Leela Alex** leaves **Chennai Rivers Restoration Trust** and **Chennai Rivers Transformation Company Limited** for the **Vellore** collectorate — a visible shift in who leads river-restoration executive work tied to the city.
- **Simranjeet Singh Kahlon** (Collector, Ramanathapuram) is placed at the disposal of **Chennai Rivers Restoration Trust** as **Member Secretary**, filling the line left by Leela Alex.
- **S.P. Karthikaa** moves from **Prohibition and Excise** to **CEO, CMDA** — the Chennai Metropolitan Development Authority shapes master-plan and metro-area growth decisions.
- **Chandra Sekhar Sakhamuri** exits **CMDA CEO** for agricultural marketing directorate — a swap of urban-planning leadership.
- **Dr. M. Veerappan** becomes **Collector, Chengalpattu** — the district wrapping much of Chennai’s southern suburban belt (GST Road, OMR spillover, industrial corridors).

Collectors are the **district CEO**: land administration, disaster response, welfare scheme delivery, and coordination with police and line departments. When fourteen collectors move on one G.O., expect **revenue and tahsildar office** handovers, **review-meeting** resets, and **pending file** transfers across districts.

## What changes for citizens (plain language)

1. **Who to address RTI and grievances to** — collector names on district websites and e-sevai counters will update after joining reports.

2. **Project continuity** — infrastructure and welfare schemes mid-stream depend on the outgoing collector’s handover notes; large swaps (Madurai–Nagapattinam) need explicit continuity planning.

3. **Chennai-adjacent districts** — Tiruvallur, Chengalpattu, Ranipet, and Kancheepuram (unchanged in this G.O.) remain the usual belt for commuters tracking **traffic, water, and encroachment** enforcement; Chengalpattu gets a new collector profile.

## Finance and secretariat ripple effects

With **Pratik Tayal** (Finance Joint Secretary) becoming **Tiruchirappalli Collector**, and **Kamal Kishore** / **M.S. Prasanth** moving from Tenkasi and Kallakurichi into **Finance Joint Secretary** posts, the **Finance Department’s desk strength** reshuffles at the same time as district revenue administration.

**R. Lalitha** as **Expenditure Secretary** signals who will steer **budget execution and pension/expenditure** approvals in the coming financial year — relevant for contractors, local bodies, and scheme implementers statewide.

## Temporary posts — why they matter

Creating **time-bound cadre posts** for Prohibition & Excise and three Directorates allows the government to **fill policy-heavy roles** without waiting for permanent cadre restructuring. The one-year window (or until need ceases) is typical when a department needs a **senior IAS lead** quickly — readers should watch whether these posts are extended or regularised.

## How to verify locally

- Download the **[official G.O. PDF](${SOURCE_URL})** and match names against your district’s “Who’s Who” page.
- Track **district collector press meets** and **collectorate transfer orders** in the first fortnight after joining.
- For Chennai river and CMDA matters, follow **Chennai Rivers Restoration Trust** and **CMDA** press notes for new office-bearers.

## Related reading on mychennaicity.in

- **[Politics topic](/chennai-local-news/topic/politics)** — Tamil Nadu executive and bureaucracy updates.
- **[Tamil Nadu cabinet portfolios (May 2026)](/chennai-local-news/tamil-nadu-cabinet-portfolios-may-2026)** — ministerial allocation after the May 2026 government.
- **[Explore Chennai areas](/areas)** — neighbourhood guides across the GCC map.`.trim();

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
      "Tamil Nadu transfers 40 IAS officers: 14 collectors reshuffled in May 2026 G.O.",
    summary:
      "G.O. (Rt.) No. 1883 dated 29 May 2026 notifies collector swaps including Madurai–Nagapattinam, new postings for Kallakurichi, Ranipet, Chengalpattu and Tiruchy, temporary cadre posts, and CMDA–Chennai Rivers leadership changes.",
    dek: "State desk — official transfer order with downloadable PDF; Secretariat and G.O. text aligned.",
    body,
    reportBody,
    analysisBody,
    category: "Politics",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: SOURCE_URL,
    sourceName:
      "Tamil Nadu Public (Special-A) Department — G.O. (Rt.) No. 1883, 29.05.2026 (PDF)",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "checklist",
      title: "Five follow-ups after a collector reshuffle",
      items: [
        {
          id: "go-pdf",
          label: "Download and archive G.O. (Rt.) No. 1883 for your district",
        },
        {
          id: "collector-who",
          label: "Check district website ‘Who’s Who’ once joining reports are published",
        },
        {
          id: "chengalpattu",
          label: "Chengalpattu — note new collector Dr. M. Veerappan for suburban belt issues",
        },
        {
          id: "rivers-cmda",
          label: "Chennai Rivers Trust and CMDA — track new Member Secretary and CEO",
        },
        {
          id: "finance-desks",
          label: "Finance Department — watch Joint Secretary and Expenditure Secretary changes",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tn-ias-reshuffle] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-tn-ias-reshuffle] Inserted article:", SLUG);
  }

  console.log("[seed-tn-ias-reshuffle] Public URL:", `/chennai-local-news/${SLUG}`);
  console.log("[seed-tn-ias-reshuffle] Official PDF:", OFFICIAL_GO_PDF);
  console.log("[seed-tn-ias-reshuffle] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({ slug: SLUG, label: "seed-tn-ias-reshuffle" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
