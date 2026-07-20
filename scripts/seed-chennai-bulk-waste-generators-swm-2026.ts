/**
 * Chennai bulk waste generators — SWM Rules 2026 registration & enforcement (July 2026).
 *
 * Dev:  `npm run db:seed:chennai-bulk-waste-generators-swm-2026`
 * Live: `npm run db:seed:chennai-bulk-waste-generators-swm-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL =
  "/images/articles/chennai-bulk-waste-generators-swm-rules-2026-registration-deadline.jpg";

const TOI_URL =
  "https://timesofindia.indiatimes.com/city/chennai/gcc-gives-bulk-waste-generators-15-days-to-register-online/articleshow/132197363.cms";
const HINDU_URL =
  "https://www.thehindu.com/news/cities/chennai/gcc-to-levy-25000-fine-for-violation-of-solid-waste-management-rules/article71185510.ece";
const DTNEXT_URL =
  "https://www.dtnext.in/news/chennai/register-within-15-days-of-notice-greater-chennai-corporation-to-bulk-waste-generators";
const GCC_PORTAL = "https://gccservices.in/bulkwaste/register";
const CPCB_PORTAL = "https://swm.cpcb.gov.in/register";

/** Indicative end of 15-day window from the 4 July 2026 Ripon Buildings review direction (IST end of day). */
const COUNTDOWN_ENDS_AT = "2026-07-19T18:29:59.000Z";

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

const SLUG =
  "chennai-bulk-waste-generators-swm-rules-2026-registration-deadline";

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

  const publishedAt = new Date("2026-07-10T05:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- **Greater Chennai Corporation** has told bulk waste generators across all **15 zones** to finish mandatory online registration within **15 days** under the **Solid Waste Management Rules, 2026**.
- You must register on **both** the [GCC bulk-waste portal](${GCC_PORTAL}) and the [CPCB solid-waste portal](${CPCB_PORTAL}).
- Of **3,203** identified bulk generators, only about **1,944** had registered when figures were reported — roughly **1,259** still pending (~**39%**).
- In **June 2026**, GCC imposed **₹5.95 lakh** in penalties on **120** bulk generators. Reported fines: **₹5,000–₹25,000**.
- The real shift: it is no longer enough to “hand over bags.” Premises must show **how much** waste they generate, how it is **segregated**, who **collects** it, and where it is **processed**.

## Summary

**Chennai, July 2026** — If you run a large apartment, IT park, hospital, hotel, mall, college, marriage hall or factory in Chennai, solid waste is no longer only a housekeeping chore. It is a compliance file.

At a review meeting at Ripon Buildings on **4 July 2026**, Commissioner **Dr G.S. Sameeran** directed officials to tighten implementation of the Solid Waste Management Rules, 2026 across every Corporation zone. Bulk waste generators were told to register with GCC and CPCB, keep records, and submit information on generation, processing, transport and disposal.

The rules took effect on **1 April 2026**. The first months were mostly awareness. July marks the move into inspections, digital reporting and fines.

## Key facts

| Item | Detail |
|---|---|
| Civic body | Greater Chennai Corporation (15 zones) |
| Legal frame | Solid Waste Management Rules, 2026 |
| Who must act | Bulk waste generators — apartments, campuses, hotels, hospitals, institutions, commercial premises |
| Registration window | Within 15 days of direction / zonal notice |
| Portals | [GCC](${GCC_PORTAL}) · [CPCB](${CPCB_PORTAL}) |
| Identified BWGs | 3,203 |
| Registered | 1,944 (~60.7%) |
| Pending | ~1,259 (~39.3%) |
| June penalties | ₹5.95 lakh from 120 generators |
| Fine range reported | ₹5,000–₹25,000 |
| City waste collected (approx.) | 6,150 tonnes/day |
| Reported BWG waste | ~600 tonnes/day |
| Four streams | Wet · Dry · Sanitary · Special-care |

## Are you a bulk waste generator?

You may qualify if **any one** of these is true:

| Threshold | Limit |
|---|---|
| Built-up / floor area | **20,000 sq m** or more |
| Daily water use | **40,000 litres** or more |
| Daily solid waste | **100 kg** or more |

You do **not** need all three. A dense high-rise can cross 100 kg/day on a modest plot.

**Rough apartment math**

- ~**200** households at ~500 g each ≈ **100 kg/day**
- ~**300** households at ~400 g each ≈ **120 kg/day**
- A hotel kitchen, hospital or IT cafeteria can cross the line on food waste alone

### Premises most likely to be affected in Chennai

- Large apartment associations and gated communities
- IT parks and corporate campuses (including OMR)
- Hospitals and large clinics
- Hotels, restaurants and central kitchens
- Colleges, universities, hostels and schools
- Shopping malls, markets and multiplexes
- Marriage halls and convention centres
- Factories, offices and multi-tenant commercial buildings
- Transport terminals and large public institutions

## What has happened now?

GCC has instructed qualifying premises to complete online registration quickly or face action under the 2026 rules.

Between **1 and 30 June 2026**, the Corporation reportedly fined **120** bulk generators for a total of **₹5.95 lakh** — about **₹4,958** per action on average, near the lower end of the ₹5,000–₹25,000 range.

Reporting also flags a practical problem: some large generators still dump mixed waste into roadside Corporation bins. That overflows public bins, contaminates recyclables, and adds pressure on **Perungudi** and **Kodungaiyur**.

### What registered premises must still do

1. Buy suitable colour-coded bins at their own cost.
2. Segregate at source into **four streams** — starting inside homes, kitchens, offices and wards, not only at the gate.
3. Process wet (biodegradable) waste on-site where required and feasible (composting, biomethanation or another approved method).
4. Hand dry, sanitary and special-care waste to GCC or authorised agencies — and keep proof.
5. Maintain generation, processing, transport and disposal records.
6. Upload periodic information on the GCC and CPCB portals (including quarterly reporting described in recent coverage).

## Four-stream segregation: the new basic standard

“Wet vs dry” alone is no longer enough.

| Stream | What goes in | Typical destination |
|---|---|---|
| **Wet** | Food waste, peels, flowers, compostable organics | On-site composting / biomethanation |
| **Dry** | Paper, cardboard, plastic, metal, glass, packaging | Material recovery / recycling |
| **Sanitary** | Pads, diapers, tampons, similar hygiene waste (securely wrapped) | Authorised separate handling |
| **Special-care** | Bulbs, expired medicines, paint containers, certain batteries, chemical containers | Authorised collection points |

Mixing streams dirty recyclables, spoil compost, and expose conservancy workers to health risks. If collection carts or vehicles remix segregated waste, earlier effort is wasted — residents and associations should report that.

## Action guide by stakeholder

### Apartment associations / RWAs

1. Check built-up area, water use and run a **7-day waste audit** (weekdays + weekend).
2. Complete **both** GCC and CPCB registrations; save acknowledgements.
3. Fix the chain: homes → floor collection → waste room → vehicle — without remixing.
4. Audit the wet-waste plant: capacity, downtime, odour, leachate, compost use.
5. Verify vendor authorisation, weight slips and destination facilities.
6. Keep a compliance file: registrations, audits, contracts, returns, inspection notes.
7. Brief residents in Tamil and English on which bin to use and how to wrap sanitary waste.

### Residents inside bulk-generator buildings

- Keep separate containers for wet and dry waste.
- Wrap sanitary waste securely; never mix it with recyclables.
- Store bulbs, medicines and batteries in a labelled special-care box until authorised collection.
- Do not dump bags at gates, drains or roadside bins meant for ordinary household routes.
- Ask the association whether dual-portal registration is done — and whether the composting unit actually runs.

### IT parks and corporate campuses

- Map waste from cafeterias, floors, pantries, events and landscaping.
- Spell out landlord vs tenant responsibility in facility rules and leases.
- Track ESG-ready metrics: waste per employee, segregation rate, landfill diversion.
- Treat cafeteria food waste as prevention first, processing second.

### Hotels, marriage halls and restaurants

- Measure kitchen and event waste; do not send function waste to roadside bins.
- Put segregation and disposal clauses in caterer and decorator contracts.
- Keep used-cooking-oil and surplus-food handling records.

### Hospitals and clinics

- Keep **municipal solid waste** and **biomedical waste** systems separate.
- Train staff by department; label carts; use authorised vendors for each stream.
- Do not conflate biomedical and municipal reporting.

### Schools and colleges

- Cover canteens, hostels, labs and events in the waste plan.
- Student clubs can support audits and awareness — they cannot replace institutional compliance.

## Why this matters for OMR and south Chennai

OMR and nearby corridors concentrate high-rise apartments, IT campuses, food courts, hotels and hostels — many of which are likely bulk generators. Improper disposal here can block drains, worsen local flooding, pollute channels linked to **Pallikaranai Marsh**, and add load to the **Perungudi** waste landscape. For campuses and associations, waste compliance is now a governance and reputation issue as well as a civic duty.

## Chennai’s waste scale (context)

GCC states that about **6,150 metric tonnes** of garbage are collected citywide every day — roughly **256 tonnes per hour**, or about **71 kg every second**. Bulk generators are reported to produce around **600 tonnes/day** (~10% of that municipal figure), while national framing often puts bulk generators near **30%** of total solid waste. The gap underlines why Chennai needs clearer public waste data — and why large premises cannot treat municipal bins as their private disposal system.

## Data snapshot

| Metric | Figure |
|---|---|
| Identified bulk generators | 3,203 |
| Registered | 1,944 (~60.7%) |
| Not yet registered | ~1,259 (~39.3%) |
| June enforcement actions | 120 |
| June penalties collected | ₹5.95 lakh |
| Approx. average fine | ~₹4,958 |
| Reported BWG daily waste | ~600 tonnes |
| Registration window | 15 days |

**Note:** Registration is not full compliance. A premises can register and still mix waste, run a non-functional composting unit, or fail to file accurate returns.

## Fact box

| Item | Detail |
|---|---|
| Story type | Civic / solid waste enforcement |
| Neighbourhood or area | Greater Chennai (all 15 GCC zones); OMR relevance |
| Event / review | 4 July 2026 GCC review and registration directions |
| Category | Chennai |
| Verification status | Based on cited media and Corporation-reported figures; portal requirements may be updated by zonal notices |

## Sources

- Primary: [Times of India — GCC gives bulk waste generators 15 days to register online](${TOI_URL})
- [The Hindu — GCC fine framework and July registration instructions](${HINDU_URL})
- [DT Next — 15-day registration after zonal notice](${DTNEXT_URL})
- Registration portals: [GCC bulk waste](${GCC_PORTAL}) · [CPCB SWM](${CPCB_PORTAL})`.trim();

  const analysisBody = `## Why Chennai readers should care

Chennai cannot manage thousands of tonnes of daily waste through street collection and dumpyards alone. When large apartments and campuses push mixed waste into public bins, every resident pays — through overflow, odour, blocked drains and landfill pressure.

The 2026 rules shift responsibility to where waste is generated. For households inside bulk-generator premises, segregation starts in the kitchen. For associations and facility managers, waste is now a compliance function like fire safety or STP operation.

## What changes for citizens

1. Ask your association whether the premises meets any bulk-generator threshold.
2. Confirm both portal registrations and keep copies.
3. Follow four-stream segregation at home; wrap sanitary waste separately.
4. Check that wet-waste equipment actually runs — not only that a machine was purchased.
5. Demand authorised collection receipts and ask where dry and sanitary waste go.
6. Watch whether Corporation and contractor vehicles preserve segregation after pickup.

## Quick compliance checklist

**Bulk generators:** threshold check → GCC + CPCB registration → waste audit → four-stream bins → wet-waste processing → authorised vendors → daily records → portal returns → inspection readiness.

**Residents:** four streams · wrap sanitary waste · no roadside dumping of bulk loads · report remixing.

**Corporation (public expectation):** zone-wise registration data · authorised vendor lists · verified portal returns · worker protection · segregated collection · follow-up inspections.

## What to watch next

- Whether the pending registration count (~1,259) falls after the 15-day push
- Whether inspections go beyond paperwork into segregation and wet-waste plants
- Whether authorised vendor lists are easy to find zone-wise
- Whether roadside overflow near large premises reduces
- Whether landfill intake at Perungudi and Kodungaiyur trends down over time

## Related reading on mychennaicity.in

- [NGT direction on wet and dry waste collection days](/chennai-local-news/chennai-ngt-gcc-wet-dry-waste-separate-collection-days)
- [Chennai topic hub](/chennai-local-news/topic/chennai)
- [OMR / Perungudi / Sholinganallur area guide](/areas/omr-perungudi-sholinganallur)
- [Kodungaiyur dumpyard smoke report](/chennai-local-news/kodungaiyur-dumpyard-smoke-march-2026)

## Editorial note

This follow-up is based on Greater Chennai Corporation directions reported in July 2026, contemporaneous coverage of registration and June penalties, and the Union framework for the Solid Waste Management Rules, 2026. Figures should be updated when GCC publishes newer registration, penalty or processing data. Establishments should follow the latest portal requirements and any zonal officer notice issued to them. The countdown on this page is an **indicative** window from the 4 July review direction — your formal deadline is the one on your notice.`.trim();

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
      "Chennai bulk waste generators: 15 days to register under SWM Rules 2026",
    summary:
      "Apartments, IT parks, hospitals, hotels and institutions must register on GCC and CPCB portals within 15 days. Fines of ₹5,000–₹25,000 already applied; ~39% of identified bulk generators still pending.",
    dek: "If your building generates 100 kg of waste a day — or uses 40,000 litres of water — GCC now expects dual-portal registration, four-stream segregation and proof of where the waste goes.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: TOI_URL,
    sourceName:
      "The Times of India report; The Hindu and DT Next coverage of GCC SWM Rules 2026 directions",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      countdown: {
        title: "Bulk waste registration window",
        subtitle:
          "Indicative 15-day countdown from the 4 July 2026 GCC review direction. Confirm the exact deadline on your zonal notice.",
        endsAt: COUNTDOWN_ENDS_AT,
        ctaLabel: "Register on GCC portal",
        ctaUrl: GCC_PORTAL,
        secondaryCtaLabel: "CPCB portal",
        secondaryCtaUrl: CPCB_PORTAL,
        expiredLabel:
          "The indicative 15-day window from the July review has ended. If you have not registered on both GCC and CPCB portals, do it now and keep acknowledgements ready for inspection.",
        note: "Registration alone is not full compliance — four-stream segregation, wet-waste processing and authorised collection still apply.",
      },
      items: [
        {
          question: "Who is a bulk waste generator in Chennai?",
          answer:
            "Under the Solid Waste Management Rules, 2026, a premises may qualify if it has 20,000 sq m or more built-up area, uses 40,000 litres or more of water a day, or generates 100 kg or more of solid waste a day. Meeting any one threshold can be enough.",
        },
        {
          question: "Where must bulk waste generators register?",
          answer:
            "They must register on both the Greater Chennai Corporation bulk-waste portal (gccservices.in/bulkwaste/register) and the Central Pollution Control Board solid-waste portal (swm.cpcb.gov.in/register), generally within 15 days of the Corporation direction or zonal notice.",
        },
        {
          question: "What are the four waste streams under SWM Rules 2026?",
          answer:
            "Wet (biodegradable) waste, dry (recyclable) waste, sanitary waste, and special-care waste such as bulbs, expired medicines and certain chemical containers. Secure wrapping is required for sanitary waste.",
        },
        {
          question: "What penalties can GCC impose?",
          answer:
            "Recent reporting cites fines from ₹5,000 to ₹25,000 under the Solid Waste Management Rules, 2026. In June 2026, GCC reportedly collected ₹5.95 lakh from 120 bulk waste generators.",
        },
        {
          question: "What should apartment associations do this week?",
          answer:
            "Confirm whether any threshold applies, complete both portal registrations, start a seven-day waste audit, check that the wet-waste plant actually runs, and verify that collectors are authorised with weight slips and destination records.",
        },
        {
          question: "What should residents do right now?",
          answer:
            "Segregate into four streams at home, wrap sanitary waste separately, ask the association to confirm dual-portal registration, and check that wet-waste processing and authorised collection are actually working — not only that bins exist at the gate.",
        },
        {
          question: "Does this apply to OMR IT parks and gated communities?",
          answer:
            "Yes, if they meet any bulk-generator threshold. OMR has many large residential and campus premises that are likely to qualify and should treat registration, segregation and vendor documentation as ongoing compliance.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-swm-bwg] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-swm-bwg] Inserted article:", SLUG);
  }

  console.log("[seed-swm-bwg] Public URL:", `/chennai-local-news/${SLUG}`);
  console.log("[seed-swm-bwg] Hero image:", HERO_IMAGE_URL);
  console.log("[seed-swm-bwg] Countdown ends:", COUNTDOWN_ENDS_AT);

  if (live) {
    await revalidateNewsAfterSeed({ slug: SLUG, label: "seed-swm-bwg" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
