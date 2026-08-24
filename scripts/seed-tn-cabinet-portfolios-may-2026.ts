/**
 * Tamil Nadu cabinet portfolio allocation — May 2026.
 *
 * Dev:  `npm run db:seed:tn-cabinet-portfolios-may-2026`
 * Live: `npm run db:seed:tn-cabinet-portfolios-may-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";
/** External hero (News9Live). Self-hosted alternative: /images/articles/tamil-nadu-cabinet-portfolios-hero.jpg */
const HERO_IMAGE_URL =
  "https://images.news9live.com/wp-content/uploads/2025/06/Tamil-Nadu-govt.jpg";

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

const SLUG = "tamil-nadu-cabinet-portfolios-may-2026";
const PRESS_RELEASE_PDF =
  "/documents/tamil-nadu-cabinet-portfolios-may-2026/lok-bhavan-press-release-no-38-16-05-2026.pdf";
const SOURCE_URL = `https://mychennaicity.in${PRESS_RELEASE_PDF}`;

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

  const publishedAt = new Date("2026-05-16T04:30:00.000Z");
  const now = new Date();

  const reportBody = `## What was announced

Chennai, **16 May 2026** — The Tamil Nadu government has allocated portfolios to the newly sworn-in Council of Ministers. Chief Minister **C. Joseph Vijay** retains several core departments, including **Home**, **Police**, **Public and General Administration**, **Special Programme Implementation**, **Municipal Administration, Urban and Water Supply**, and welfare-related portfolios.

The allocation was recommended by the Chief Minister to the Governor and approved by the Governor, according to **Lok Bhavan Press Release No. 38 dated 16.05.2026**. The ministers were sworn in on **10 May 2026**.

**Official source:** [Download Lok Bhavan Press Release No. 38 (PDF)](${SOURCE_URL}) — portfolio list as issued by the government.

## Chief Minister — core departments

C. Joseph Vijay will directly handle:

- Public, General Administration, IAS, IPS, Indian Forest Service, District Revenue Officers
- Police, Home, Special Programme Implementation
- Women Welfare, Youth Welfare, Welfare of Children, Aged, Differently Abled Persons
- Municipal Administration, Urban and Water Supply

This keeps law and order, bureaucracy, urban governance, welfare administration, and special programme monitoring under the Chief Minister’s office.

## Ministers and portfolios

- **N. Anand** — Rural Development and Water Resources (rural development, panchayats, poverty alleviation, irrigation)
- **Aadhav Arjuna** — Public Works and Sports Development (PWD, buildings, highways, minor ports, sports)
- **Dr. K.G. Arunraj** — Health, Medical Education and Family Welfare
- **K.A. Sengottaiyan** — Finance (finance, pensions, pension allowances)
- **P. Venkataramanan** — Food and Civil Supplies (consumer protection, price control)
- **R. Nirmalkumar** — Energy Resources and Law (electricity, renewable energy, law, courts, prisons, anti-corruption, elections)
- **Rajmohan** — School Education, Tamil Development, Information and Publicity
- **Dr. TK. Prabhu** — Natural Resources (minerals and mines)
- **Selvi S. Keerthana** — Industries (industries, investment promotion)

## Brief notes by ministry

**N. Anand** — Rural administration, panchayats, poverty alleviation, and irrigation infrastructure.

**Aadhav Arjuna** — Roads, public buildings, highways, minor ports, and sports development; a high-execution infrastructure-facing role.

**Dr. K.G. Arunraj** — Government hospitals, medical education seats, family welfare, and public health systems.

**K.A. Sengottaiyan** — State budget, pensions, and the fiscal room for welfare and capital programmes.

**P. Venkataramanan** — Ration supply, essential commodities, consumer protection, and price-related interventions.

**R. Nirmalkumar** — Power policy, renewable energy, legal administration, prisons, anti-corruption, and election-related responsibilities.

**Rajmohan** — Classrooms, Tamil language and culture, state publicity, and media-related regulation.

**Dr. TK. Prabhu** — Mining regulation and mineral resources oversight.

**Selvi S. Keerthana** — Industrial expansion, investment facilitation, and job-creation signalling.`.trim();

  const analysisBody = `## What this means in Chennai

Portfolio allocation is not only an administrative formality — it tells citizens **which minister is answerable** for roads, schools, hospitals, power, ration shops, industries, and urban services.

**Centralised core:** With **Home**, **Police**, **General Administration**, and **Municipal Administration / Urban Water Supply** with the Chief Minister, law and order, bureaucracy, and urban water governance will be judged directly against the CM’s office — including Chennai’s GCC-linked urban issues.

**Sector ministers to watch:**

- **Finance (Sengottaiyan)** — how much of the new government’s promises become budget lines.
- **Public Works (Aadhav Arjuna)** — arterial roads, buildings, and visible infrastructure delivery.
- **Health (Dr. Arunraj)** and **School Education (Rajmohan)** — two of the most socially visible services for families.
- **Industries (Selvi S. Keerthana)** — investment and employment signals for Chennai’s industrial and IT corridors.
- **Energy and Law (Nirmalkumar)** — power supply stability and legal/administrative machinery.

**For businesses:** Finance, Industries, Energy, and Public Works are the first desks to map for permits, power, and industrial policy.

**For civic groups:** Municipal Administration (with the CM), Rural Development and Water Resources, and Public Works cover much of what neighbourhood groups track on roads, water, and local bodies.

**Editorial read:** The distribution places **command-centre governance** with the Chief Minister while spreading **sector delivery** across named ministers. The next test is execution — department priorities, public communication, and visible administrative action in the first weeks.

**Updated roster:** The cabinet expanded to **35 ministers** on 21 May 2026 — see the living guide at [/guides/tn-council-of-ministers](https://mychennaicity.in/guides/tn-council-of-ministers) and [expansion news desk](/chennai-local-news/tamil-nadu-cabinet-expansion-35-ministers-may-2026).`.trim();

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, SLUG)))
    .limit(1);

  const heroImageUrl = HERO_IMAGE_URL;
  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Tamil Nadu cabinet portfolios announced: CM C. Joseph Vijay keeps Home, Police and key departments",
    summary:
      "Governor approves Lok Bhavan Press Release No. 38 — Vijay retains Home, Police, General Administration and urban water; Finance, Health, PWD, Industries and other portfolios assigned to ministers sworn in on 10 May.",
    dek: "State desk — who holds which department after the 10 May swearing-in.",
    body,
    reportBody,
    analysisBody,
    category: "Politics",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl,
    sourceUrl: SOURCE_URL,
    sourceName: "Lok Bhavan, Tamil Nadu — Press Release No. 38 (16.05.2026, PDF)",
    interactiveJson: {
      type: "checklist",
      title: "Five areas to watch in the first phase",
      items: [
        {
          id: "law-order",
          label: "Law and order — Home and Police with the Chief Minister",
        },
        {
          id: "urban",
          label: "Urban governance and water — Municipal Administration with the CM",
        },
        {
          id: "finance",
          label: "Budget priorities — Finance minister’s first allocations",
        },
        {
          id: "industry",
          label: "Investment and jobs — Industries portfolio",
        },
        {
          id: "schools-health",
          label: "Schools and hospitals — Education and Health ministers",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tn-cabinet] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-tn-cabinet] Inserted article:", SLUG);
  }

  console.log("[seed-tn-cabinet] Public URL:", `/chennai-local-news/${SLUG}`);
  console.log("[seed-tn-cabinet] Press release PDF:", PRESS_RELEASE_PDF);
  console.log("[seed-tn-cabinet] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({ slug: SLUG, label: "seed-tn-cabinet" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
