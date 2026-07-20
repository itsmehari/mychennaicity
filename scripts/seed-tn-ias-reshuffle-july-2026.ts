/**
 * Tamil Nadu senior IAS reshuffle — July 2026 (department secretaries & institutional heads).
 *
 * Dev:  `npm run db:seed:tn-ias-reshuffle-july-2026`
 * Live: `npm run db:seed:tn-ias-reshuffle-july-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL = "/images/articles/tamil-nadu-cabinet-portfolios-hero.jpg";

const HINDU_URL =
  "https://www.thehindu.com/news/national/tamil-nadu/ias-officers-reshuffled-in-tamil-nadu-j-radhakrishnan-supriya-sahu-transferred/article71226990.ece";

const TOI_URL =
  "https://timesofindia.indiatimes.com/city/chennai/tn-govt-transfers-senior-ias-officers-including-supriya-sahu-j-radhakrishnan-umanath/articleshow/132420773.cms";

const MAY_RESHUFFLE_PATH =
  "/chennai-local-news/tamil-nadu-ias-reshuffle-collectors-may-2026";
const CABINET_PATH =
  "/chennai-local-news/tamil-nadu-cabinet-portfolios-may-2026";
const EDII_PATH =
  "/chennai-local-news/edii-tn-ecommerce-training-guindy-june-2026";
const NAMMA_ARASU_PATH =
  "/chennai-local-news/namma-arasu-whatsapp-chatbot-tamil-nadu-2026";
const POWER_BILL_PATH =
  "/chennai-local-news/tamil-nadu-electricity-bill-calculation-2026-june-tnpdcl";
const OZONE_POWER_PATH =
  "/chennai-local-news/ozone-greens-perumbakkam-power-crisis-generator-electricity-issue";
const SOLAR_PATH =
  "/chennai-local-news/chennai-rooftop-solar-subsidy-pm-surya-ghar-2026";
const MTC_PATH =
  "/chennai-local-news/chennai-mtc-gets-65-new-buses-300-bus-rollout-2026";
const BROADWAY_PATH =
  "/chennai-local-news/broadway-bus-stand-822-crore-multimodal-hub-chennai";
const SCHOOL_FEES_PATH =
  "/chennai-local-news/tamil-nadu-private-school-fee-transparency-chennai";
const FISCAL_PATH =
  "/chennai-local-news/tamil-nadu-fiscal-white-paper-2026-debt-revenue-deficit-analysis";
const LAKES_PATH =
  "/chennai-local-news/chennai-gcc-blue-green-restoration-three-lakes-35-crore";
const BULK_WASTE_PATH =
  "/chennai-local-news/chennai-bulk-waste-generators-swm-rules-2026-registration-deadline";

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

export const JULY_IAS_RESHUFFLE_SLUG =
  "yet-another-tamil-nadu-ias-reshuffle-july-2026";

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

  const publishedAt = new Date("2026-07-16T05:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Less than two months after the **[May 2026 collector-heavy IAS reshuffle](${MAY_RESHUFFLE_PATH})**, Tamil Nadu has ordered another major bureaucratic reorganisation — this time focused on **senior departmental leadership**.
- The **July Reshuffle 2026**, ordered on **15 July 2026**, moves officers across **environment, power, industries, higher education, IT, MSME, transport and labour**.
- Headline transfers include **Supriya Sahu** (Environment → EDII-TN Commissioner), **Dr J Radhakrishnan** (power utilities → Anna Administrative Staff College), and **V Arun Roy** (Higher Education → Tamil Nadu power institutions).
- **P Umanath** becomes Industries Commissioner; **Nirmal Raj** moves to Transport Secretary; **Pradeep Yadav** and **Atul Anand** swap **IT** and **MSME**.
- For Chennai readers, the practical watch-list is **electricity administration**, **digital government services**, **public transport**, **environment programmes**, and **higher-education policy**.

## Fact box

| Item | Detail |
|------|--------|
| **Order issued** | 15 July 2026 |
| **Nature of reshuffle** | Senior departmental and institutional leadership |
| **Major sectors affected** | Environment, power, industries, education, IT, MSME, transport, labour |
| **Previous major reshuffle** | 29 May 2026 — [40 IAS / 14 collectors](${MAY_RESHUFFLE_PATH}) |
| **Article date** | 16 July 2026 |

## What was announced

**Chennai, 16 July 2026** — Less than two months after transferring around **40 IAS officers**, the Tamil Nadu government has announced yet another major bureaucratic reshuffle.

Unlike the **[May 2026 order](${MAY_RESHUFFLE_PATH})**, which largely rewired **district collectors** and field administration, the July order reassigns **secretaries, commissioners and corporation heads** who steer investment, infrastructure, sustainability and public-service delivery.

Reporting by [*The Hindu*](${HINDU_URL}) and [*The Times of India*](${TOI_URL}) on **15 July 2026** confirmed the core postings summarised below. Ministerial responsibility remains as mapped in our **[Tamil Nadu cabinet portfolios (May 2026)](${CABINET_PATH})** desk — this reshuffle changes the **IAS leadership layer** under those portfolios.

## Environment and entrepreneurship

| Officer | Previous role | New role |
|---------|---------------|----------|
| **Supriya Sahu** | Additional Chief Secretary, Environment, Climate Change and Forests | Additional Chief Secretary / Commissioner, **Entrepreneurship Development and Innovation Institute (EDII-TN)** |
| **Kakarla Usha** | Additional Chief Secretary, Public and Rehabilitation | Additional Chief Secretary, Environment, Climate Change and Forests |
| **Dheeraj Kumar** | Additional Chief Secretary / Commissioner, EDII-TN | Additional Chief Secretary, Higher Education |

Supriya Sahu has been a prominent face of Tamil Nadu’s environmental governance — wetlands, climate programmes, plastic-reduction drives and forest administration. Her move to **EDII-TN** lands her at the institute that already runs Chennai programmes such as our covered **[Guindy e-commerce training for MSMEs](${EDII_PATH})**.

Kakarla Usha succeeds her in Environment. For Chennai’s civic environment desk, that matters for lake restoration, waste rules and coastal ecology — themes we track in **[GCC blue-green lake restoration](${LAKES_PATH})** and the **[bulk waste generator registration drive](${BULK_WASTE_PATH})**.

## Power sector leadership

| Officer | Previous role | New role |
|---------|---------------|----------|
| **Dr J Radhakrishnan** | ACS / CMD, Tamil Nadu Electricity Board and Tamil Nadu Power Distribution Corporation | Director, Anna Administrative Staff College; Director General of Training |
| **V Arun Roy** | Secretary, Higher Education | CMD, TNEB and Tamil Nadu Power Distribution Corporation; Chairman, Power Generation, Transmission and Green Energy corporations |

**V Arun Roy** now sits at the centre of Tamil Nadu’s generation, transmission, distribution and renewable-energy stack. That is the same power system Chennai households meet every billing cycle — see our **[TNPDCL electricity bill calculation guide](${POWER_BILL_PATH})**, the **[Ozone Greens Perumbakkam power dispute](${OZONE_POWER_PATH})**, and **[PM Surya Ghar rooftop solar in Chennai](${SOLAR_PATH})**.

Radhakrishnan shifts to administrative training after a high-visibility run across health, disaster management and power.

## Industries, transport and labour

| Officer | Previous role | New role |
|---------|---------------|----------|
| **P Umanath** | CMD, Tamil Nadu Civil Supplies Corporation | Industries Commissioner and Director of Industries and Commerce |
| **Nirmal Raj** | Industries Commissioner and Director of Industries and Commerce | Secretary, Transport Department |
| **M Vallalar** | Secretary, Transport Department | Commissioner, Labour |
| **Sigy Thomas Vaidhyan** | Commissioner, Disaster Management (TNDRRA) | Commissioner, Transport and Road Safety |
| **D Baskara Pandian** | Commissioner / Director, Transport and Road Safety | Director, Museums |

Umanath takes the industries facilitation chair as Tamil Nadu pushes manufacturing, electronics and investment. Nirmal Raj’s move into Transport pairs industrial-administration experience with everyday mobility — relevant to Chennai stories such as **[MTC’s new bus rollout](${MTC_PATH})** and the **[Broadway multimodal hub](${BROADWAY_PATH})**.

Sigy Thomas Vaidhyan’s appointment as Transport and Road Safety Commissioner is the post most directly tied to road accidents, enforcement and vehicle safety.

## IT and MSME swap

| Officer | Previous responsibility | New responsibility |
|---------|-------------------------|--------------------|
| **Pradeep Yadav** | Information Technology and Digital Services | Micro, Small and Medium Enterprises |
| **Atul Anand** | Micro, Small and Medium Enterprises | Information Technology and Digital Services |

The two departments sit next to each other in Tamil Nadu’s growth story: digital public services on one side, small-industry employment on the other. Chennai residents who use WhatsApp-based government services should note the IT leadership change against our **[Namma Arasu chatbot explainers](${NAMMA_ARASU_PATH})**.

## Higher education

**Dheeraj Kumar** replaces **V Arun Roy** as Higher Education Secretary. The department steers universities, colleges, technical education and student policy — the policy layer above household concerns such as **[private school fee transparency](${SCHOOL_FEES_PATH})** and broader human-capital spending flagged in the **[Tamil Nadu fiscal white paper](${FISCAL_PATH})**.

## Other significant transfers

| Officer | From | To |
|---------|------|-----|
| **E Sundaravalli** | Special Secretary, Public and Rehabilitation | Secretary, Public and Rehabilitation *(promoted)* |
| **R Gajalakshmi** | Commissioner, Land Administration | Commissioner, Prohibition and Excise |
| **Mageswari Ravikumar** | Director, Social Welfare | Director, Art and Culture |
| **R Brindha Devi** | Director, Art and Culture | Director, Social Welfare |
| **D Rathna** | Additional Secretary, Housing and Urban Development | Additional Commissioner, HR&CE |
| **Pooja Kulkarni** | Commissioner, Prohibition and Excise | CEO, Tamil Nadu Infrastructure Development Board |
| **Waghe Sanket Balwant** | Additional Collector (Development) / PD, DRDA Coimbatore | Executive Director, TIDCO |

**Continuity note:** In the **[May 2026 G.O.](${MAY_RESHUFFLE_PATH})**, **Pooja Kulkarni** moved from **CEO, Tamil Nadu Infrastructure Development Board** to **Commissioner, Prohibition and Excise**. The July order returns her to **TNIDB as CEO** — a full-circle posting within seven weeks.

## How the July reshuffle differs from May 2026

| May 2026 Reshuffle | July Reshuffle 2026 |
|--------------------|----------------------|
| Around 40 IAS officers transferred | Senior departmental officers reassigned |
| Strong focus on district collectors | Strong focus on secretaries and institutional heads |
| Changes across district administration | Changes across power, environment, industries, IT and education |
| Field-level administrative restructuring | State-level policy and institutional restructuring |

The previous reshuffle, announced on **29 May 2026**, moved **14 district collectors** including Madurai, Nagapattinam, Kallakurichi, Ranipet, Chengalpattu and Tiruchirappalli — full tables in our **[May IAS desk](${MAY_RESHUFFLE_PATH})**.

## Sources

- **Context:** [*The Hindu* — IAS officers reshuffled; Radhakrishnan, Supriya Sahu transferred](${HINDU_URL}) (15 July 2026)
- **Context:** [*The Times of India* — TN transfers senior IAS officers](${TOI_URL}) (15 July 2026)
- **Earlier MCC desk:** [Tamil Nadu transfers 40 IAS officers — May 2026 collectors G.O.](${MAY_RESHUFFLE_PATH})`.trim();

  const analysisBody = `## Analysis

Senior-level transfers are how governments realign experience against current priorities. The July list concentrates seasoned officers in **industrial expansion, renewable energy, digital governance, higher education, MSME growth, environmental administration, and transport / road safety**.

That is interpretation, not an official statement — the long-term impact will depend on policy continuity, departmental coordination, and how quickly officers join charge.

## Why Chennai readers should care

1. **Power bills and high-rise supply** — New leadership at TNEB / TNPDCL and the green-energy corporation sits above every Chennai household meter. Bookmark the **[bill calculation guide](${POWER_BILL_PATH})** and watch project-level disputes such as **[Ozone Greens, Perumbakkam](${OZONE_POWER_PATH})**.

2. **Digital services** — With **Atul Anand** taking IT and Digital Services, programmes like **[Namma Arasu on WhatsApp](${NAMMA_ARASU_PATH})** stay in the citizen-facing spotlight.

3. **Buses, hubs and road safety** — Transport Secretary **Nirmal Raj** and Road Safety Commissioner **Sigy Thomas Vaidhyan** matter for MTC, multimodal hubs and enforcement — see **[MTC bus rollout](${MTC_PATH})** and **[Broadway hub](${BROADWAY_PATH})**.

4. **Environment next door** — **Kakarla Usha** inherits Environment while GCC continues lake and waste programmes (**[blue-green lakes](${LAKES_PATH})**, **[bulk waste rules](${BULK_WASTE_PATH})**).

5. **EDII-TN in Guindy** — **Supriya Sahu** now leads the entrepreneurship institute that hosts Chennai MSME training (**[EDII e-commerce programme](${EDII_PATH})**).

6. **Who holds the file under which minister** — Cross-check department names against **[cabinet portfolios](${CABINET_PATH})** when following investment or education announcements.

## What happens next

- Newly appointed officers are expected to take charge following the government order.
- Watch for policy notes, project reviews and press meets from **power utilities**, **Transport**, **IT**, **Industries** and **Environment**.
- Compare this institutional reshuffle with the **[May collector transfers](${MAY_RESHUFFLE_PATH})** — field administration and secretariat leadership have now both been reset in under two months.

## Related reading on mychennaicity.in

- **[Previous IAS reshuffle — May 2026 collectors G.O.](${MAY_RESHUFFLE_PATH})** — 14 collectors, CMDA and Chennai Rivers leadership changes.
- **[Tamil Nadu cabinet portfolios (May 2026)](${CABINET_PATH})** — ministerial map above these IAS postings.
- **[Namma Arasu WhatsApp chatbot](${NAMMA_ARASU_PATH})** — digital services under the IT department.
- **[EDII-TN Guindy e-commerce training](${EDII_PATH})** — entrepreneurship institute now headed by Supriya Sahu.
- **[Politics topic](/chennai-local-news/topic/politics)** — Tamil Nadu executive and bureaucracy updates.`.trim();

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, JULY_IAS_RESHUFFLE_SLUG)))
    .limit(1);

  const values = {
    cityId: city.id,
    slug: JULY_IAS_RESHUFFLE_SLUG,
    title:
      "Yet Another IAS Reshuffle in Tamil Nadu: July Reshuffle 2026 Changes Key Departments",
    summary:
      "Tamil Nadu announces yet another IAS reshuffle in July 2026, transferring Supriya Sahu, J Radhakrishnan, P Umanath and other senior officers across environment, power, industries, IT and education.",
    dek: "State desk — senior departmental leadership after the May collector reshuffle; Chennai impact on power, transport, IT and environment.",
    body,
    reportBody,
    analysisBody,
    category: "Politics",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: HINDU_URL,
    sourceName:
      "The Hindu / Times of India — Tamil Nadu IAS transfer reports, 15 July 2026",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "checklist",
      title: "What to watch after the July IAS reshuffle",
      items: [
        {
          id: "power-join",
          label: "Power utilities — note V Arun Roy joining TNEB / TNPDCL and green-energy chairs",
        },
        {
          id: "transport-road",
          label: "Transport & road safety — track Nirmal Raj and Sigy Thomas Vaidhyan press notes",
        },
        {
          id: "it-msme",
          label: "IT ↔ MSME swap — Atul Anand (IT) and Pradeep Yadav (MSME)",
        },
        {
          id: "environment-edii",
          label: "Environment → Kakarla Usha; EDII-TN → Supriya Sahu",
        },
        {
          id: "may-compare",
          label: "Compare with May 2026 collector G.O. for the full two-month bureaucracy reset",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tn-ias-july] Refreshed article:", JULY_IAS_RESHUFFLE_SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-tn-ias-july] Inserted article:", JULY_IAS_RESHUFFLE_SLUG);
  }

  console.log(
    "[seed-tn-ias-july] Public URL:",
    `/chennai-local-news/${JULY_IAS_RESHUFFLE_SLUG}`,
  );
  console.log("[seed-tn-ias-july] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: JULY_IAS_RESHUFFLE_SLUG,
      label: "seed-tn-ias-july",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
