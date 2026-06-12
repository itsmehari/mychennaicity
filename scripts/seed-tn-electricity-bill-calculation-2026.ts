/**
 * Tamil Nadu domestic electricity bill guide — slabs, June bills, OMR scenarios (June 2026).
 *
 * Dev:  `npm run db:seed:tn-electricity-bill-calculation-2026`
 * Live: `npm run db:seed:tn-electricity-bill-calculation-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL =
  "https://imagesvs.oneindia.com/ta/img/2024/03/electr-down-1710300389.jpg";

const TNPDCL_CALCULATOR_URL = "https://www.tnebnet.org/awp/tariffMaster";
const TANGEDCO_URL = "https://www.tangedco.gov.in/";
const TNPDCL_PAYMENT_URL = "https://www.tnebnet.org/";

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

const SLUG = "tamil-nadu-electricity-bill-calculation-2026-june-tnpdcl";

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

  const publishedAt = new Date("2026-06-12T05:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Most Chennai households are billed **every two months** (bi-monthly) on **domestic tariff LT I-A** — the “units” on your bill are **kWh consumed across that entire period**, not per month.
- **Primary source for slab math:** use the official **[TNPDCL bill calculator](${TNPDCL_CALCULATOR_URL})** on tnebnet.org — select **Domestic**, **Bi-monthly**, and enter your consumed units. Do not rely on WhatsApp forwards for exact rupee amounts.
- If bi-monthly use is **500 units or less**, the first **200 units are free**; units 201–400 are charged at **₹4.95/kWh** and 401–500 at **₹6.65/kWh** (rates unchanged for domestic consumers after the July 2025 tariff order because the state absorbed the hike).
- If use **crosses 500 units** in a bi-monthly cycle, billing switches to **telescopic slabs** and free units drop from **200 to 100** — a small increase past 500 can change the entire stack, which is why summer bills feel like they “jump.”
- **June bills** often combine **April–May** consumption — AC season, school holidays at home, and rooftop tank pumps on OMR apartment belts push many flats past the 500-unit cliff.
- **Apartment common-area** supply (lifts, pumps, corridor lights) is a **separate tariff** (domestic common supply) — not mixed into your flat meter unless your association bills you proportionally.
- **Illustrative scenarios below are estimates** — your printed bill also includes items such as **electricity duty** (commonly **5%** on energy charges) and **meter rent**; always reconcile with the official calculator and your PDF bill.

## Fact box

| Item | Detail |
| --- | --- |
| Who supplies Chennai? | **TANGEDCO** (generation and distribution). Online payment and the tariff calculator are branded **TNPDCL** on [tnebnet.org](${TNPDCL_PAYMENT_URL}). |
| Billing cycle | **Bi-monthly** for most domestic connections (roughly two calendar months per bill). |
| Tariff category | **LT I-A — domestic** (individual homes; apartments use separate meters per flat or common supply for shared loads). |
| Free units (≤500 bi-monthly) | First **200 units** at **₹0** |
| Free units (>500 bi-monthly) | First **100 units** at **₹0** (telescopic regime) |
| July 2025 revision | TNERC order raised tariffs **3.16%** on paper; Tamil Nadu **subsidised domestic LT I-A** so household slab rates did not increase — see [The Hindu](https://www.thehindu.com/news/national/tamil-nadu/state-government-to-absorb-the-burden-of-the-hike-in-electricity-tariff-through-subsidy-for-domestic-consumers/article69756873.ece). |
| Official calculator | [tnebnet.org — Bill Calculator / Tariff Check](${TNPDCL_CALCULATOR_URL}) |

## What is one “unit” on your EB bill?

On Tamil Nadu electricity bills, **one unit = one kilowatt-hour (kWh)** — the energy used when a **1 kW** load runs for **one hour**.

Examples (approximate):

| Appliance | Typical load | Rough use | Energy |
| --- | --- | --- | --- |
| LED tube | ~20 W | 10 hours/day × 60 days | ~12 kWh / bi-month |
| 1.5 ton inverter AC | ~1.2 kW while compressor runs | 8 hours/day × 45 summer days | ~430 kWh / bi-month (single AC — load varies by star rating, set temperature, and room size) |
| 750 W instant geyser | ~0.75 kW | 30 min/day × 60 days | ~23 kWh / bi-month |

**Takeaway:** Two identical flats on the same street can differ by **hundreds of units** because of AC hours, geyser type, WFH setups, and old fridges — not because the discom “picked” them.

## Domestic slab rates (bi-monthly, LT I-A)

Rates below reflect the **subsidised domestic schedule** widely published for FY **2025–26** after the state absorbed the July 2025 hike. **Verify on the official calculator** before paying or disputing.

### When bi-monthly consumption is **500 units or less**

| Slab (units in the bill period) | Rate |
| --- | --- |
| 0 – 200 | **Free (₹0)** |
| 201 – 400 | **₹4.95 / unit** |
| 401 – 500 | **₹6.65 / unit** |

### When bi-monthly consumption is **more than 500 units** (telescopic)

Crossing **500 units** moves you into telescopic billing; free allowance becomes **100 units**, not 200.

| Slab (units in the bill period) | Rate |
| --- | --- |
| 0 – 100 | **Free (₹0)** |
| 101 – 400 | **₹4.95 / unit** |
| 401 – 500 | **₹6.65 / unit** |
| 501 – 600 | **₹8.80 / unit** |
| 601 – 800 | **₹9.95 / unit** |
| 801 – 1,000 | **₹11.05 / unit** |
| Above 1,000 | **₹12.15 / unit** |

**Why June hurts:** A bill dated June often covers **high-use April–May**. One extra week of daytime AC after a heatwave can push you from the ≤500 table to telescopic slabs — the rupee impact is non-linear.

### The 500-unit cliff (illustrative)

*Estimates only — run your exact units on the [TNPDCL calculator](${TNPDCL_CALCULATOR_URL}).*

| Bi-monthly units | Regime | Illustrative energy subtotal (before duty / meter rent) |
| --- | --- | --- |
| 480 | ≤500 (200 free) | ~₹1,860 |
| 520 | >500 telescopic | ~₹2,300 |
| 750 | >500 telescopic | ~₹5,000 |
| 946 | >500 telescopic | ~₹6,600 |

The gap between **480 and 520** units is far wider than “40 extra units × one rate” because the **free-unit rule and slab stack change**.

## OMR corridor scenarios (Perungudi, Sholinganallur, Navalur)

These are **worked examples for Chennai’s IT-corridor apartment belt** — not your exact bill. Substitute your meter reading.

### Scenario A — 3BHK flat, Perungudi, **~946 units** bi-monthly

**Profile (illustrative):** Two inverter ACs running most nights, WFH laptops, double-door fridge, RO pump, balcony lights, lift share billed separately.

| Component | Illustrative units | Rate applied | Illustrative charge |
| --- | --- | --- | --- |
| 0 – 100 | 100 | Free | ₹0 |
| 101 – 400 | 300 | ₹4.95 | ₹1,485 |
| 401 – 500 | 100 | ₹6.65 | ₹665 |
| 501 – 600 | 100 | ₹8.80 | ₹880 |
| 601 – 800 | 200 | ₹9.95 | ₹1,990 |
| 801 – 946 | 146 | ₹11.05 | ~₹1,613 |
| **Energy subtotal** | | | **~₹6,633** |

Add **electricity duty (~5%)**, **meter rent**, and any rounding — then compare to your PDF. **Do not treat ~₹6,633 as the amount due** until you run the official tool.

### Scenario B — Same flat, **adding a third AC** for a guest room

If the third AC adds **~120 units** over the same bi-monthly window (illustrative), total use moves from ~946 to ~**1,066** units. The extra units fall largely in the **₹12.15** slab once you are already deep in telescopic billing — a **₹1,000+** swing on energy charges alone is plausible before duty. This is why residents say “one more AC doubled the bill” — it is slab math, not a metering error by default.

### Scenario C — **Navalur** ground-floor shop on commercial tariff

A street-facing **boutique or café** is typically **not** LT I-A domestic. Commercial low-tension tariffs have **different slabs, fixed charges, and no 200-unit free block**. A shopkeeper comparing their bill to a neighbour’s flat bill is comparing **two tariff books**. Check the **tariff category code** printed on the bill header.

### Scenario D — **Sholinganallur** apartment **common supply** (lifts + pumps)

Associations with **more than 12 units and lifts** often have a **domestic common supply** meter. Press reporting on the July 2025 order noted **common-area energy charges** moved to **₹8.80/unit** (from ₹8.55) with **fixed cost ₹110/kW** (from ₹107/kW) — costs are split across flats via maintenance invoices, not always visible on your home meter. Ask the RWA for the **common meter reading** and the **per-flat split formula**.

### Scenario E — **Terrace booster pump** (600 W) running long hours

A **0.6 kW** pump running **6 hours/day** for **60 days** ≈ **216 kWh** bi-monthly — before any AC. OMR blocks with irregular metro water timing often see pumps on timers; a stuck float switch can add **hundreds of hidden units**.

## How to verify your TNPDCL bill (step by step)

1. **Open the official calculator:** [tnebnet.org — Tariff Check](${TNPDCL_CALCULATOR_URL}) → choose **Domestic** tariff and **Bi-monthly** cycle (use Monthly only if your bill says the cycle is under 35 days).
2. **Enter consumed units** exactly as printed on the bill — not your monthly guess.
3. **Note the tariff category** on the PDF (LT I-A for standard homes). If it says commercial or common supply, domestic slabs do not apply.
4. **Compare line items:** energy charges, duty, meter rent, arrears, subsidies, and round-off — the calculator may not list every legacy adjustment on old connections.
5. **Cross-check the meter:** note the **present reading** and **previous reading**; difference should match billed units (subject to MD / average rules on some connections — rare on vanilla domestic).
6. **Photograph the meter** if you dispute; raise a **complaint on TNPDCL helpline / section office** with consumer number, not just Twitter.
7. **Apartment residents:** confirm whether **DG backup** or **STP** loads are on your flat meter vs common meter.

## Bill audit worksheet

Use this table when your June bill looks wrong — fill from your PDF and portal.

| Field | Your bill | Calculator / notes |
| --- | --- | --- |
| Consumer number | | |
| Billing period (from – to) | | |
| Tariff / category | | |
| Previous reading | | |
| Present reading | | |
| Billed units | | |
| Regime (≤500 or >500) | | |
| Energy charges | | Match [calculator](${TNPDCL_CALCULATOR_URL}) |
| Electricity duty | | ~5% of energy charges (verify on bill) |
| Meter rent | | Often ₹25 per cycle on domestic bills |
| Arrears / credits | | |
| **Amount payable** | | |

## Savings checklist (Chennai households)

- [ ] **Set AC to 26 °C** with closed doors — each degree lower can add measurable load over 60 days.
- [ ] **Service AC filters** before May; dirty coils raise kWh per hour.
- [ ] **Replace ageing fridges/geysers** — over 10-year appliances are common in older Adyar stock; OMR flats often inherit previous tenant loads.
- [ ] **Put pumps on timers** and fix float switches — silent 24×7 pumps are a classic 200-unit leak.
- [ ] **Compare LED retrofit** for balcony and parking lights if you own the circuit.
- [ ] **Shift heavy laundry/dishwasher** to off-peak if you are on time-of-day pilots (check bill — most domestic LT I-A is still flat energy slabs).
- [ ] **Rooftop solar** — if you are above 600 units bi-monthly, see our guide on **[PM Surya Ghar in Chennai](/chennai-local-news/chennai-rooftop-solar-subsidy-pm-surya-ghar-2026)** (net metering and subsidy caps apply).
- [ ] **Pre-monsoon wiring check** — see **[discom safety advisory](/chennai-local-news/chennai-pre-monsoon-electrical-safety-advisory)** before water meets bad earthing.

## Official platforms

| Need | Where |
| --- | --- |
| Pay bill / view history | [tnebnet.org](${TNPDCL_PAYMENT_URL}) |
| Tariff calculator | [Tariff Check](${TNPDCL_CALCULATOR_URL}) |
| Discom announcements | [tangedco.gov.in](${TANGEDCO_URL}) |
| TANGEDCO mobile app | Search “TANGEDCO” on Google Play / App Store |
| Section office complaint | Consumer number + registered mobile on portal |

**Branding note:** Colloquially Chennai still says **“EB bill”** or **“TNEB”**; legally the discom is **TANGEDCO** and the consumer portal is **TNPDCL**. Use the names on your bill when filing complaints.

## Related reading on mychennaicity.in

- **[OMR — Perungudi to Sholinganallur](/areas/omr-perungudi-sholinganallur)** — corridor hub for apartment-town context.
- **[Consumer topic](/chennai-local-news/topic/consumer)** — bills, apps, and household costs.
- **[Chennai rooftop solar subsidy (PM Surya Ghar)](/chennai-local-news/chennai-rooftop-solar-subsidy-pm-surya-ghar-2026)** — when slab bills push you toward PV.
- **[Pre-monsoon electrical safety](/chennai-local-news/chennai-pre-monsoon-electrical-safety-advisory)** — wiring before squalls.
- **[Chennai local news](/chennai-local-news)** — latest city desk stories.`.trim();

  const analysisBody = `## Why your June 2026 bill may feel higher than March

**Season + billing window.** June statements often capture **April–May**, when Chennai humidity and heat drive **AC compressor hours**. A flat that averaged 380 units in winter can crest **550+** in the same bi-monthly window without any new appliance — triggering telescopic slabs.

**Work-from-home density.** Perungudi–Sholinganallur towers still carry **dual-WFH** households: always-on routers, monitors, and kitchen appliances between 9 am and 8 pm add steady baseload on top of cooling.

**Water timing.** When metro water is erratic, **terrace pumps** run longer. That load is invisible until the bi-monthly bill lands.

**Not always a “wrong meter.”** Slab cliffs produce **legitimate jumps**. Verify first; dispute second.

## What the state did in July 2025

TNERC’s **FY 2025–26** order applied a **3.16%** CPI-linked revision across categories. For **domestic LT I-A**, the Tamil Nadu government **paid TNPDCL a subsidy** so **household energy slabs did not rise** — the second year in a row for full domestic shielding, per state press releases and [Energyworld coverage](https://energy.economictimes.indiatimes.com/news/power/tamil-nadu-hikes-power-tariff-by-3-16-but-domestic-consumers-shielded-from-impact/122176203).

That does **not** mean bills stay flat if **you use more units** — only that the **per-unit schedule** for homes did not increase. **Apartment common supply** and **commercial** categories did see increases.

## When to escalate

Contact the **section office** if: billed units exceed **meter delta**, tariff code is wrong (domestic vs commercial), or you have **proof of meter stuck / bypass** (tampering is criminal — let officials inspect). Keep **photos of the meter**, **PDF bills**, and **calculator screenshots** in one folder before you visit.

**This article is consumer education, not legal or electrical advice.** For rewiring, use a **licensed contractor**; for billing disputes, use **TNPDCL channels**.

## Soundbite

Your June EB bill is a **summer story told in kilowatt-hours** — understand the **500-unit cliff**, run the **[official calculator](${TNPDCL_CALCULATOR_URL})**, then argue with data if something still does not match.`.trim();

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
      "Tamil Nadu Electricity Bill Calculation 2026: Why Your June TNEB Bill May Be Higher",
    summary:
      "Chennai domestic bills are bi-monthly LT I-A slabs: 200 free units if you stay ≤500 kWh per cycle, telescopic rates above 500. June bills often bundle April–May AC load — use the official TNPDCL calculator before disputing.",
    dek: "Consumer desk — slab math, OMR apartment scenarios, 500-unit cliff, and how to audit your TNPDCL bill.",
    body,
    reportBody,
    analysisBody,
    category: "Consumer",
    status: "published" as const,
    publishedAt,
    featured: true,
    areaHubSlug: "omr-perungudi-sholinganallur",
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: TNPDCL_CALCULATOR_URL,
    sourceName:
      "TNPDCL — Tamil Nadu Power Distribution Corporation Ltd. (tnebnet.org bill calculator)",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "How often does TNPDCL bill domestic consumers in Chennai?",
          answer:
            "Most household (LT I-A) connections are billed bi-monthly — one bill covers roughly two months of consumption. Choose Bi-monthly on the official tnebnet.org tariff calculator unless your bill states a shorter cycle.",
        },
        {
          question: "How many free units do Chennai homes get?",
          answer:
            "If bi-monthly consumption is 500 units or less, the first 200 units are free. If consumption crosses 500 units, telescopic billing applies and only the first 100 units are free. Rates are on the official TNPDCL calculator.",
        },
        {
          question: "Why did my June 2026 electricity bill jump?",
          answer:
            "June bills often include April–May usage — peak AC season on the OMR corridor and elsewhere. Crossing 500 bi-monthly units switches you to higher telescopic slabs, which can increase the bill faster than the extra kWh alone would suggest.",
        },
        {
          question: "Where is the official Tamil Nadu electricity bill calculator?",
          answer: `Use TNPDCL's Tariff Check at ${TNPDCL_CALCULATOR_URL} — select Domestic tariff, Bi-monthly cycle, and enter consumed units from your bill.`,
        },
        {
          question: "Is TNEB the same as TNPDCL?",
          answer:
            "Chennai residents still say TNEB or EB bill colloquially. The state discom is TANGEDCO; online payment and the bill calculator are branded TNPDCL on tnebnet.org. Use the consumer number and names printed on your bill when raising complaints.",
        },
        {
          question: "Do apartment lift and motor bills merge with my flat meter?",
          answer:
            "Usually not — lifts, common lighting, and shared pumps are often on a separate domestic common supply meter billed to the association. You may see that cost in maintenance dues rather than on your home bill. Ask your RWA for the common meter reading.",
        },
        {
          question: "What is the PM Surya Ghar subsidy cap for Chennai homes?",
          answer:
            "Central subsidy under PM Surya Ghar is widely documented as up to ₹78,000 for eligible residential rooftop systems (₹30,000/kW for the first 2 kW plus ₹18,000/kW for the third kW, capped at 3 kW). See our Chennai rooftop solar guide for portal steps and net metering.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tn-electricity-bill] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-tn-electricity-bill] Inserted article:", SLUG);
  }

  console.log(
    "[seed-tn-electricity-bill] Public URL:",
    `/chennai-local-news/${SLUG}`,
  );
  console.log("[seed-tn-electricity-bill] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-tn-electricity-bill",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
