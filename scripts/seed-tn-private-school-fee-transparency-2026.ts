/**
 * Tamil Nadu private school fee transparency — display approved fees (June 2026).
 *
 * Dev:  `npm run db:seed:tn-private-school-fee-transparency-2026`
 * Live: `npm run db:seed:tn-private-school-fee-transparency-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL =
  "/images/articles/tamil-nadu-private-school-fee-transparency-chennai.jpg";

const TNIE_ORDER_URL =
  "https://www.newindianexpress.com/states/tamil-nadu/2026/Jun/03/tn-private-schools-told-to-publish-fee-structures-online-before-june-5";
const TNIE_COMPLIANCE_URL =
  "https://www.newindianexpress.com/states/tamil-nadu/2026/Jun/06/private-schools-in-tn-fail-transparency-test-withhold-fee-details";
const HINDU_URL =
  "https://www.thehindu.com/news/cities/chennai/display-fee-structure-at-entrance-by-june-5-private-schools-told/article71052903.ece";
const TOI_URL =
  "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-private-schools-director-instructs-schools-to-publicly-display-tuition-fee-details-by-june-5/articleshow/131456110.cms";
const TNM_URL =
  "https://www.thenewsminute.com/tamil-nadu/tn-orders-private-schools-to-publicly-display-approved-fee-structure-by-june-5";

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

const SLUG = "tamil-nadu-private-school-fee-transparency-chennai";

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

  const publishedAt = new Date("2026-06-06T05:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Tamil Nadu has directed **private schools statewide** to **publicly display approved fee structures** on notice boards, school websites, and admission application forms.
- The order covers **nursery, primary, matriculation, CBSE, ICSE**, and other board-affiliated private schools.
- Schools were told to comply by **5 June 2026**; district education officers must submit **compliance reports with photo evidence by 10 June**, and the **State Information Commission** expects a broader report by **15 June**.
- **School Education Minister Rajmohan Arumugam** has warned schools against collecting fees beyond amounts fixed by the **Fee Determination Committee**.
- Early ground checks suggest **weak compliance** in Chennai and other districts — parents should verify displays themselves before paying.

> **Soundbite:** School fees must be visible before they become payable.

## What Tamil Nadu ordered

**Chennai, 4 June 2026** — In a move aimed at protecting parents from unclear and excessive school fee demands, the Tamil Nadu government has directed private schools across the state to **publicly display their approved fee structures**.

The instruction applies to private nursery, primary, matriculation, CBSE, and other board-affiliated private schools. Schools have been told to:

1. Display the **approved class-wise fee structure** on notice boards or at the entrance.
2. **Publish fee details** on their official websites.
3. **Include class-wise fee details** in student admission application forms.

The deadline given to schools for on-campus display was **5 June 2026**. Website publication timelines in circulars also reference **10 June 2026** for some reporting steps — check your school’s latest notice for the exact date on their portal.

This matters especially in **Chennai**, where private school admissions often involve multiple payment layers: tuition fees, admission charges, term fees, activity fees, transport charges, and other school-specific collections. Until now, many parents had to approach schools directly without knowing the approved fee structure in advance.

## Why this order was issued

The latest direction follows an order from the **Tamil Nadu State Information Commission**. The commission observed that the public should not be forced to run from office to office to obtain approved fee details of private schools.

The case arose after a **Coimbatore resident’s RTI request** seeking private school fee details was delayed for more than two years. The Information Commission directed authorities to ensure that approved fee details are **proactively disclosed** to the public.

Fee information should not remain hidden inside files, offices, or management counters. It must be visible to parents **before** they take admission decisions.

## What schools must display

Private schools are expected to show:

| Requirement | Detail |
|-------------|--------|
| **Approved tuition fee** | Class-wise amounts fixed by the Fee Determination Committee |
| **Notice board** | Prominent display at the school entrance or notice area |
| **Website** | Published fee structure on the school’s official site |
| **Admission forms** | Class-wise fee details printed in application forms |
| **Monitoring** | District education officers inspect and collect photographic evidence |

District education officers have been asked to monitor compliance and submit reports with photographic evidence. Compliance reports from district officials are expected by **10 June 2026**, while the Information Commission has sought a broader compliance report by **15 June 2026**.

## Minister warns schools against excess collection

Tamil Nadu **School Education Minister Rajmohan Arumugam** has warned private schools against collecting fees beyond the amount fixed by the Fee Determination Committee.

He said schools must transparently disclose the fees collected from students and follow the approved fee structure. Parents can complain to **district school education officials**, the **department headquarters**, or the **minister’s office** if schools are found violating the rules.

This warning is significant because fee-related complaints are common during the school reopening and admission season.

## Ground reality: many schools yet to comply

Although the rule is now clear, early reports suggest that compliance remains weak.

A ground check by [The New Indian Express](${TNIE_COMPLIANCE_URL}) found that several schools had not displayed fee details even after the **5 June** deadline. In Chennai, only **one among more than 15 schools visited** had displayed the fee details, while another claimed the information was available online. Similar issues were reported in **Tiruchy, Madurai, and Coimbatore**.

In Tiruchy, education officials found schools displaying **outdated fee details** or failing to upload current information on websites. Officials said non-compliant schools had been instructed to act immediately.

The success of the order will depend not only on issuing instructions, but also on **strict inspection and follow-up action**.

## Fact box

| Item | Detail |
|------|--------|
| **Scope** | Private nursery, primary, matriculation, CBSE, and other board schools |
| **Display deadline** | 5 June 2026 (on-campus notice boards) |
| **District reports due** | 10 June 2026 (with photo evidence) |
| **Information Commission report** | 15 June 2026 |
| **Legal trigger** | Tamil Nadu State Information Commission order (May 2026) |
| **Enforcement lead** | Directorate of Private Schools; district CEOs/DEOs |
| **Parent complaints** | District education officials, School Education Department HQ, minister’s office |

## Sources

- [The New Indian Express — TN private schools told to publish fee structures, 3 Jun 2026](${TNIE_ORDER_URL})
- [The New Indian Express — Private schools fail transparency test, 6 Jun 2026](${TNIE_COMPLIANCE_URL})
- [The Hindu — Display fee structure at entrance by June 5, 4 Jun 2026](${HINDU_URL})
- [The Times of India — Director instructs schools to display tuition fees, 4 Jun 2026](${TOI_URL})
- [The News Minute — TN orders schools to display approved fee structure, 4 Jun 2026](${TNM_URL})`.trim();

  const analysisBody = `## What Chennai parents should do now

Parents seeking admission in private schools should **actively check** whether the school has displayed its approved fee structure. Compare the displayed amount with the amount demanded during admission.

**Before you pay:**

1. **Look at the entrance** — Is the approved class-wise fee board visible?
2. **Check the website** — Do fee pages match what staff quote verbally?
3. **Ask for a written breakup** — Tuition, transport, activity, and other heads in writing.
4. **Keep receipts** — Save payment proof and WhatsApp or email confirmations.

If a school refuses to show approved fee details or demands unexplained additional charges, escalate to **district education authorities**. The rule gives parents a stronger position during admission discussions and helps families compare schools more fairly before committing.

## Why this matters for Chennai

Chennai has a large private school ecosystem — matriculation, CBSE, ICSE, international curriculum, and nursery schools across zones from **Adyar and Anna Nagar** to **OMR, Tambaram, and Avadi**. For many middle-class families, school fees are one of the biggest annual expenses.

When fee details are not transparent, parents cannot plan properly. They also find it difficult to question sudden demands made after admission.

This order brings school fee details into public view. It does **not automatically reduce fees**, but it makes hidden fee collection harder.

## The bigger picture

Tamil Nadu already has a **Fee Determination Committee** for private schools. The committee-fixed fee is expected to be binding on schools. The committee’s own guidance states that fee structures fixed by it should be **permanently displayed** on school notice boards.

The present order strengthens that requirement and gives it immediate public importance.

**For parents:** Do not depend only on verbal fee information. Ask for the approved fee structure, check whether it is displayed, and keep copies of receipts and communication.

**For schools:** Fee collection must be transparent, visible, and accountable.

## Related reading on mychennaicity.in

- **[Chennai topic](/chennai-local-news/topic/chennai)** — civic, education, and city desk updates.
- **[Consumer topic](/chennai-local-news/topic/consumer)** — household costs, bills, and consumer rights.
- **[Explore Chennai areas](/areas)** — neighbourhood guides across Greater Chennai.`.trim();

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
      "Tamil Nadu Orders Private Schools to Display Approved Fees: What Chennai Parents Must Know",
    summary:
      "Tamil Nadu has ordered private schools to display approved fee structures on notice boards, websites and admission forms. Here is what Chennai parents should check.",
    dek: "Chennai education desk — Fee Determination Committee rates must be visible before admission; weak early compliance reported.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: TNIE_ORDER_URL,
    sourceName:
      "The New Indian Express, The Hindu, The Times of India — Tamil Nadu private school fee transparency (June 2026)",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "checklist",
      title: "Chennai parent checklist before paying school fees",
      items: [
        {
          id: "notice-board",
          label:
            "Check the school entrance or notice board for the approved class-wise fee display",
        },
        {
          id: "website",
          label:
            "Open the school website and confirm fee pages match what staff quote verbally",
        },
        {
          id: "written-breakup",
          label:
            "Ask for a written fee breakup — tuition, transport, activity, and other heads",
        },
        {
          id: "compare",
          label:
            "Compare displayed fees with the amount demanded at admission — question any gap",
        },
        {
          id: "receipts",
          label:
            "Keep receipts, bank transfers, and admission communication for your records",
        },
        {
          id: "complaint",
          label:
            "If fees exceed approved rates, complain to district education officials or the School Education Department",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tn-school-fees] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-tn-school-fees] Inserted article:", SLUG);
  }

  console.log("[seed-tn-school-fees] Public URL:", `/chennai-local-news/${SLUG}`);
  console.log("[seed-tn-school-fees] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({ slug: SLUG, label: "seed-tn-school-fees" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
