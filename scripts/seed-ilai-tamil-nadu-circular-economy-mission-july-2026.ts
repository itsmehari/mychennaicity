/**
 * Ilai Tamil Nadu Circular Economy Mission — banana-leaf street-food proposal (July 2026).
 * Ilai Foundation is treated as a separate proposing entity (not a mychennaicity programme).
 *
 * Dev:  `npm run db:seed:ilai-tamil-nadu-circular-economy-mission-july-2026`
 * Live: `npm run db:seed:ilai-tamil-nadu-circular-economy-mission-july-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

/** Representational: traditional Tamil Nadu meal on banana leaf (not a project photo). */
const HERO_IMAGE_URL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Veg_Full_Meals_in_Tamil_Nadu.JPG?width=1600";

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
  "ilai-tamil-nadu-circular-economy-mission-banana-leaf-street-vendors-july-2026";

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

  const publishedAt = new Date("2026-07-28T14:00:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- **Ilai Foundation** — a separate proposing organisation — has outlined a Tamil Nadu circular-economy mission to replace avoidable plastic-coated and laminated food-serving sheets used by street vendors with organised banana-leaf supply.
- A Chennai demonstration scenario of **1,000 vendors × 75 meals/day** projects up to **75,000 plastic-free meals daily** and **2.7375 crore meals annually** under full displacement.
- The concept is framed as a full chain: farmers → aggregators → rural processing (including women’s SHGs) → urban hubs → last-mile delivery → vendors → wet-waste recovery → composting/biomethanation.
- Impact would be measured by **baseline minus post-intervention disposable-sheet use**, not by assuming every leaf supplied equals one plastic sheet avoided.
- The note asks government for recognition, vendor coordination, farmer linkages, processing support, green logistics, municipal space, waste recovery and a public dashboard — not a one-off leaf giveaway.

## Disclaimer

This article summarises a **concept and impact-mapping proposal** attributed to **Ilai Foundation**, an independent entity. It is **not** a government programme announcement, a GCC scheme, or a mychennaicity.in project.

Figures for meals, leaf requirements and sheet displacement are **planning scenarios** from the proposal. They become credible impact claims only after baseline surveys, verified displacement measurement and independent evaluation. Cost assumptions (including ₹1 per serving-format leaf) are illustrative and exclude logistics, processing, wastage and administration unless separately calculated.

mychennaicity.in has not independently audited Ilai Foundation’s capacity, funding or government status. Readers should treat this as civic reporting on a proposed model.

## Summary

**Chennai, 28 July 2026** — Street food is one of Chennai’s most visible daily economies — and one of its most stubborn waste problems. Meals lasting a few minutes are often served on plastic-coated, laminated or other low-recovery disposable sheets that quickly become food-contaminated waste: hard to recycle, easy to mix into dry waste streams, and costly for municipal systems to collect and dispose of.

**Ilai Foundation** has circulated a concept note titled *Ilai Tamil Nadu Circular Economy Mission*, proposing a government–community–farmer partnership to replace avoidable non-recoverable food-serving materials with appropriately processed banana leaves, beginning in Chennai and scaling across the State.

The foundation presents itself as an independent organisation seeking government support for a measurable circular system — not merely a banana-leaf distribution campaign.

## What the proposal seeks to change

### The linear model it criticises

Raw materials → disposable sheets manufactured → wholesale retail → street vendors buy → food served briefly → contaminated waste → mixed collection → dumps, burns, landfill rejects or processing rejects. Public agencies and residents absorb environmental and financial consequences.

### The circular model it proposes

Banana farmers harvest leaves (not only fruit) → farmer producer organisations and aggregators consolidate supply → rural processing units clean, grade and cut formats vendors can use → urban micro-hubs and last-mile green logistics deliver on schedule → vendors serve meals → used leaves are segregated as wet waste → composting or biomethanation returns nutrients or energy to productive use.

## Chennai demonstration numbers

Using a conservative planning assumption of **1,000 participating street food vendors** and **75 banana-leaf servings per vendor per day**:

| Horizon | Plastic-free meals / sheets (full-displacement scenario) |
|---|---|
| Daily | **75,000** |
| Monthly (30 days) | **22.5 lakh** |
| Annual (365 days) | **2.7375 crore** |
| Five years at same scale | **~13.69 crore** |

Expansion scenarios in the note:

| Scenario | Vendors | Meals / year (at 75/day) |
|---|---:|---:|
| A — Pilot | 250 | 68.44 lakh |
| B | 500 | 1.37 crore |
| C — Chennai mission | 1,000 | 2.74 crore |
| D — Major TN cities | 5,000 | 13.69 crore |
| E — Statewide | 10,000 | 27.38 crore |

### Measurement principle — the proposal’s own caution

The note stresses that the programme **must not automatically claim** that every banana leaf supplied prevented one plastic sheet. Verified avoidance should be:

**Baseline disposable-sheet usage − post-intervention disposable-sheet usage.**

Vendor baselines would track meals served, reusable vessels, banana leaves, plastic-coated sheets, laminated/foil materials, parcel materials, seasonal variation and disposal practices.

Conservative annual displacement scenarios at the 1,000-vendor scale:

| Verified displacement | Sheets prevented / year |
|---|---:|
| 40% | 1.095 crore |
| 60% | 1.6425 crore |
| 80% | 2.19 crore |
| 100% | 2.7375 crore |

## Stakeholder map (compressed)

The proposal maps eleven “nodes”:

1. **Farmers** — organised demand for leaves, transparent pricing, FPO pathways, multi-month procurement.
2. **FPOs / aggregators** — continuous supply, grading, traceability, seasonal backup regions.
3. **Rural processing & women’s SHGs** — clean, cut, count, bundle; green employment.
4. **Urban micro-hubs** — demand consolidation, route prep, short storage, digital inventory.
5. **Last-mile green logistics** — early-morning electric delivery suited to vendor hours.
6. **Street vendors** — partners, not passive beneficiaries: reliable supply, branding, duties on hygiene, segregation and usage records.
7. **IT community** — micro-donations, volunteering, mapping, dashboards, apps.
8. **Corporates** — CSR packs: adopt a vendor / street / ward / processing centre / green route / tech platform; payroll giving; matching.
9. **Residents & RWAs** — local fundraising with visible meal-level outcomes.
10. **Urban local bodies (GCC)** — vendor lists, Town Vending Committees, wet-waste linkage, training, recognition — support plus verification, not only penalties.
11. **Used-leaf recovery** — dedicated wet-waste stream kept free of cups, sachets, spoons, foil and sanitary waste, or the circular pathway fails.

## Government structure requested

**State steering committee** spanning Municipal Administration, Environment, Agriculture/Horticulture, Rural Development, MSME, Labour/Skill, Social Welfare, IT, Finance, Food Safety, TNPCB, GCC and TNULM — for policy, convergence, funding architecture and scale-up.

**Chennai programme management unit** with programme director, municipal coordinator, farmer supply, vendor engagement, logistics, organic recovery, CSR, technology, M&E, finance and communications leads.

**Ward units** with nodal officer, field coordinator, vendor representative, sanitary-inspector linkage and data support.

### Support asked of government

Institutional recognition; verified street-vendor coordination; banana-cluster and FPO linkages; processing infrastructure; SHG livelihood integration; electric last-mile support; licensed micro-hub space; composting/biomethanation linkage; shared digital dashboard; CSR facilitation; public communication; university/technical evaluation partnerships.

## Funding and cost architecture

The note rejects single-donor dependence. Streams include government (coordination, infrastructure, training, monitoring), CSR (procurement, equipment, vehicles, audits), IT/community micro-donations, gradual **vendor co-pay** after a trial (shared-cost / subscription / performance incentives — not permanent 100% subsidy where avoidable), and philanthropic grants for research and replication.

At 1,000 vendors × 75 leaves/day, annual leaf requirement is **2.7375 crore** units. At an assumed **₹1 per serving-format leaf**, base leaf cost alone is **₹2.7375 crore/year** — **excluding** cutting, packing, transport, hubs, delivery, wastage, technology, monitoring and administration.

The primary financial metric proposed is:

**Total programme expenditure ÷ independently verified disposable sheets avoided.**

Example given in the note: ₹4 crore spend and 2 crore verified sheets avoided ⇒ **₹2 per verified sheet avoided** — to be calculated from operations, not assumed in advance.`;

  const analysisBody = `## Why this matters for Chennai now

Chennai’s street-food economy sits at the intersection of livelihood, public health, litter and municipal solid-waste cost. National Solid Waste Management Rules, 2026 push four-stream segregation and restrict landfilling to residual waste. Preventing food-contaminated disposable sheets at source is upstream of collection, biomining pressure and landfill load — including systems that affect south Chennai and OMR corridors.

Tamil Nadu is also investing political attention in street-vendor formalisation and model food streets. A banana-leaf circular chain, if verified, could complement hygiene and cart standards by attacking a specific high-volume disposable category — without claiming to solve every packaging problem (liquids, sachets and cups remain separate challenges vendors have long flagged).

## Strengths of the Ilai framing

**It is systems thinking, not product substitution.** The note insists on farm supply, processing jobs, logistics, vendor records, wet-waste purity and public dashboards. That is closer to circular-economy practice than a one-week awareness drive.

**It protects credibility with conservative displacement bands.** Publishing 40–100% scenarios and requiring baseline–follow-up measurement is the right posture for any government pitch.

**It aligns incentives.** Farmers get a leaf market; SHGs get processing work; vendors get reliable formats; CSR gets adopt-a-ward packages; municipalities get less residual waste if segregation holds; donors see meal-level transparency.

**It names the failure mode.** Contaminating used leaves with plastic spoons, sachets and foil breaks composting. Making that explicit is operationally honest.

## Risks and open questions

**Logistics and hygiene.** Banana leaves need cold-chain-ish speed, early delivery, grading and food-safety discipline. Irregular supply will push vendors back to coated sheets.

**Vendor economics.** Leaves that leak for liquids, or cost more than disposables after subsidy ends, will not stick. Parcel formats and liquid items need parallel solutions.

**Verification capacity.** Counting leaves delivered is easy; proving sheets avoided is hard. Without independent audits and weight sampling by material type, “crore sheets prevented” claims will be challenged.

**Municipal bandwidth.** GCC already juggles vendor fees, vending zones, wet-waste routes and SWM 2026 compliance. Adding hubs and recovery streams needs real staff time, not only MoUs.

**Institutional clarity.** Ilai Foundation is proposed as a separate entity. Government recognition should clarify roles: who holds vendor data, who owns the public dashboard, who receives CSR funds, and who is accountable if delivery fails.

**Scale realism.** Moving from a 100-vendor controlled pilot to 1,000 Chennai vendors to 10,000 statewide is a multi-year institutional project. Staging (100 → 250 → 1,000) as written in the roadmap is more credible than jumping to statewide numbers in communications.

## Pilot roadmap (as proposed)

1. Government consultation and lead department  
2. Baseline vendor and farmer study, sheet weighing  
3. Supply-chain development and format tests  
4. **100-vendor controlled pilot**  
5. **250-vendor expansion** with used-leaf recovery and CSR packs  
6. **1,000-vendor Chennai mission** with monthly dashboard and independent evaluation  
7. District playbooks for Tamil Nadu replication  

## mychennaicity.in reading

If Tamil Nadu wants measurable waste prevention — not only waste processing — proposals like this deserve a fair hearing **and** a hard evaluation design. The right public test is not whether banana leaves feel culturally familiar. It is whether a verified number of coated sheets leave Chennai’s waste stream, whether farmers and women processors earn transparently, whether vendors stay enrolled after subsidy taper, and whether used leaves actually reach clean organic recovery.

Ilai Foundation’s note offers a complete circular map and a Chennai-scale arithmetic starting point. Government response should demand baselines, publication of verified displacement, cost per verified sheet avoided, and open dashboards — the same transparency standard any large civic programme should meet.

**— mychennaicity.in editorial**

*Photo credit: traditional Tamil Nadu vegetarian meal on banana leaf — [KARTY JazZ / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Veg_Full_Meals_in_Tamil_Nadu.JPG), CC BY-SA 4.0. Representational image; not an Ilai Foundation project photograph.*`;

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
      "Ilai Foundation proposes Tamil Nadu banana-leaf circular mission for street food vendors",
    summary:
      "Ilai Foundation — a separate entity — pitches a Chennai-first circular economy: 1,000 vendors, up to 2.74 crore plastic-free meals a year, farmer–SHG–vendor chains, and verified sheet displacement — not assumed impact.",
    dek: "From farm leaf to wet-waste recovery: a government–community–farmer proposal to stop disposable food sheets before they become Chennai’s waste problem.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: null as string | null,
    sourceName:
      "Ilai Foundation concept and impact-mapping proposal (Ilai Tamil Nadu Circular Economy Mission); context from Tamil Nadu street-vendor / model food-street public reporting",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "Is Ilai Foundation part of mychennaicity.in or the government?",
          answer:
            "No. This article treats Ilai Foundation as a separate proposing entity. The piece summarises its concept note; it is not a government scheme announcement or a mychennaicity programme.",
        },
        {
          question: "Are the 2.74 crore annual meals a guaranteed impact figure?",
          answer:
            "No. That figure is a full-displacement planning scenario for 1,000 vendors × 75 meals/day × 365 days. The proposal itself says verified avoidance must use baseline minus post-intervention disposable-sheet use.",
        },
        {
          question: "Does every banana leaf replace one plastic sheet?",
          answer:
            "Not automatically. Some meals already use reusable vessels or other materials. Credible claims require vendor-level baselines and follow-up measurement.",
        },
        {
          question: "What would government be asked to do?",
          answer:
            "Recognition as a supported pilot, vendor-list coordination, farmer and FPO linkages, processing and SHG support, green logistics, hub space, wet-waste recovery links, shared dashboards, CSR facilitation and independent evaluation.",
        },
        {
          question: "What is the ₹1-per-leaf cost?",
          answer:
            "An illustrative farm/prepared-leaf planning assumption in the note. It excludes cutting, transport, hubs, delivery, wastage, technology and administration. Total cost should be expressed per verified sheet avoided.",
        },
        {
          question: "Will this solve all street-food packaging waste?",
          answer:
            "No. Liquids, sachets, cups, spoons and foils remain separate problems. The proposal targets avoidable non-recoverable food-serving sheets and requires clean segregation of used leaves.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-ilai-mission] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-ilai-mission] Inserted article:", SLUG);
  }

  console.log(
    "[seed-ilai-mission] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-ilai-mission",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
