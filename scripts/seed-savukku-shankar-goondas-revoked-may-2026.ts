/**
 * Savukku Shankar — Tamil Nadu revokes Goondas Act preventive detention (May 2026).
 *
 * Dev:  `npm run db:seed:savukku-goondas-revoked-may-2026`
 * Live: `npm run db:seed:savukku-goondas-revoked-may-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const HERO_IMAGE_URL =
  "https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/indian-express-tamil/media/media_files/eEtntTurk5flVVHHZiMq.jpg";

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
  "savukku-shankar-goondas-act-detention-revoked-tamil-nadu-advisory-board";

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

  const publishedAt = new Date("2026-05-20T05:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Tamil Nadu **revoked** Savukku Shankar’s **Goondas Act** detention on **19 May 2026** after the **Advisory Board** found **no sufficient cause** to continue custody.
- The original order was passed by the **Greater Chennai Police Commissioner** on **9 April 2026**.
- A **habeas corpus** petition before the **Madras High Court** is largely **infructuous** after executive revocation — this is **not** the same as the court **quashing** the order.
- **Release** may still depend on other pending criminal cases or sentences, per reported government order language.

## Tamil Nadu revokes preventive detention order

**Chennai, 20 May 2026** — The Tamil Nadu government has **revoked** the preventive detention order issued against YouTuber and political commentator **A. Shankar**, popularly known as **Savukku Shankar**, under the **Tamil Nadu Preventive Detention Act** (commonly referred to as the **Goondas Act**).

The revocation follows the **Advisory Board’s opinion** that there was **no sufficient cause** to continue his detention. The government order was issued by the State’s **Home, Prohibition and Excise Department** on **19 May 2026**, according to reports citing the official order.

The detention order dated **9 April 2026**, passed by the **Commissioner of Police, Greater Chennai**, has now been revoked.

## What exactly happened?

Savukku Shankar had been detained under Tamil Nadu’s preventive detention law after being classified as a **“Goonda”** by the Greater Chennai Police Commissioner.

The **Advisory Board** reviewed:

- the grounds of detention;
- the report of the detaining authority;
- connected records; and
- Shankar’s **oral representation**.

After this review, the Board concluded that **continued detention was not justified**. The government then revoked the order under the relevant provision of the Act.

Reports citing the government order state that Shankar should be **released from preventive detention** unless he is required in connection with any other case or is serving a sentence after conviction by a court.

## Timeline: from April detention to May revocation

| Date | Development |
|------|-------------|
| **9 April 2026** | Greater Chennai Police Commissioner passes preventive detention order |
| **13 May 2026** | *The Times of India* reports Madras High Court granted bail in the attempt-to-murder ground case |
| **19 May 2026** | Home Department issues revocation after Advisory Board review |
| **20 May 2026** | Public reporting on release path; habeas corpus challenge largely infructuous |

This timeline matters for readers tracking **Chennai police action**, **court bail**, and **executive revocation** as separate legal steps — they do not always move on the same calendar day.

## Ground case: attempt-to-murder and bail

The detention order was linked to an alleged **attempt-to-murder** case. Media reports state the incident arose from an alleged **stone-pelting** near **Kavankarai** while Shankar was being brought to Chennai after an arrest in another matter.

**LiveLaw** reported that another vacation court had already granted Shankar **bail in the ground case**. **The Times of India** reported that the **Madras High Court** granted bail in the attempt-to-murder case on **13 May 2026**.

Preventive detention and bail in the underlying criminal case are **different legal tracks**. Bail in the ground case does not automatically end a Goondas order — but it can shape how courts and the Advisory Board assess whether continued preventive custody is justified.

## Habeas corpus before the Madras High Court

A **habeas corpus** petition challenging the detention was pending before the **Madras High Court**. The matter was expected to be heard, but the government’s **revocation** has effectively made that challenge **infructuous** in practical terms — there is no ongoing preventive detention order left to quash through that proceeding.

**LiveLaw** reported that the habeas corpus petition was filed by Shankar’s nephew **Bharath**, who argued that the detention order was passed **mechanically** and that the criminal case used as the basis for preventive detention did not amount to a **public order** issue.

**Important:** Those were **pleadings by the petitioner**, not findings by the court. This article describes reported arguments; it does not state that the High Court ruled on the merits before revocation.

## Revoked by government — not “quashed” by the High Court

Several Tamil reports used words like **“quashed”** or **ரத்து**. For legal accuracy in English:

- The Tamil Nadu government **revoked** the preventive detention order after the Advisory Board found **no sufficient cause** to continue detention.
- That is **different** from saying the **Madras High Court quashed** the order.
- Here, the **executive** revoked the order **before** the High Court habeas challenge was decided on the merits.

When sharing this story, prefer **“revoked”** or **“detention order withdrawn”** unless a court judgment explicitly **quashes** the detention.

## Why the Advisory Board matters under the Goondas Act

Under the **Tamil Nadu Preventive Detention Act**, detention orders are reviewed by an **Advisory Board**. The Board must give its opinion on whether there is **sufficient cause** for the detention. The Act requires the Board’s report to specify whether sufficient cause exists for **continuing** detention.

In Shankar’s case, reports state the Board gave a **unanimous opinion** that there was **no sufficient cause** for detention. The government then revoked the order under the relevant provision of the Act.

### What is preventive detention?

Preventive detention allows the state to detain a person **before trial** when authorities believe detention is necessary to prevent certain kinds of harm — distinct from punishing someone after conviction. Because it affects **personal liberty** without a full criminal trial on the detention itself, the law builds in **Advisory Board review** and **time limits** as safeguards.

## Fact box

| Item | Detail |
|------|--------|
| **Person** | A. Shankar alias Savukku Shankar |
| **Profession** | YouTuber, political commentator |
| **Law invoked** | Tamil Nadu Preventive Detention Act (Goondas Act) |
| **Detention order date** | 9 April 2026 |
| **Detaining authority** | Commissioner of Police, Greater Chennai |
| **Revocation order date** | 19 May 2026 |
| **Department** | Home, Prohibition and Excise Department, Tamil Nadu |
| **Reason for revocation** | Advisory Board found no sufficient cause to continue detention |
| **Current legal effect** | Preventive detention revoked; release subject to other pending cases or sentences |

## Sources and reporting notes

This report synthesises **published reporting** on the government order and court proceedings. Primary court papers and the full government order text may add further detail as they become publicly available.

Attribution in media coverage has included **LiveLaw** (habeas corpus reporting) and **The Times of India** (bail reporting). Hero photograph via syndicated news imagery; subject identification follows published captions naming Savukku Shankar in a police escort context.`.trim();

  const analysisBody = `## Why this is a Chennai story

The detention order was passed by the **Commissioner of Police, Greater Chennai**. The **habeas corpus** challenge was before the **Madras High Court** at Chennai. The ground-case incidents and transfers are tied to **Chennai policing** and **Tamil Nadu state executive** action.

For residents following **civic rights** and **police powers**, this case sits alongside wider debate on how often preventive detention laws are used in Tamil Nadu — not only in celebrity-commentator matters, but in ordinary criminal justice news that reaches the High Court.

## Greater Chennai Police and “Goonda” classification

Classifying a person as a **Goonda** under state preventive detention law is an executive-police pathway with **high stakes**: it can lead to custody **without** the same procedural rhythm as a routine remand in a single criminal case.

Chennai watchers should note:

- **Who** signs the detention order (here, the **Greater Chennai** police commissioner).
- **What** ground criminal case is cited in the detention papers.
- **When** the Advisory Board meets and what it records about **sufficient cause**.

## Madras High Court and personal liberty

The **Madras High Court** has, in other preventive detention matters, stressed that **personal liberty** should not be curtailed **mechanically** and that orders must meet legal standards.

Even when a habeas petition becomes **infructuous** after revocation, the court’s earlier observations in Tamil Nadu detention jurisprudence remain relevant context for how lawyers and journalists frame the next case.

## What readers should watch next

1. **Release and any other FIRs** — revocation of preventive detention does not erase separate criminal cases or convictions.
2. **Published order text** — whether the Home Department order is uploaded in full on Tamil Nadu’s e-governance portals.
3. **High Court records** — whether the habeas bench records revocation and closes the petition formally.
4. **Policy debate** — whether the state reviews Goondas usage after high-profile detentions.

## Plain-language glossary (SEO-friendly)

- **Goondas Act** — colloquial name for Tamil Nadu’s **Preventive Detention Act** regime.
- **Advisory Board** — statutory body that reviews whether detention should continue.
- **Habeas corpus** — court petition asking the state to justify why a person is being held.
- **Infructuous** — the legal challenge no longer needs a substantive decision because the detention ended another way.
- **Revoked** — the government withdrew its own detention order; distinct from a court **quashing** it.

## Related reading on mychennaicity.in

- Browse **[Chennai local news](/chennai-local-news)** for court, civic, and state government updates.
- See **[Politics topic](/chennai-local-news/topic/politics)** for Tamil Nadu executive and legislature developments.
- For neighbourhood context across the city, explore **[Greater Chennai area guides](/areas)**.`.trim();

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
      "Tamil Nadu Revokes Goondas Act Detention Against Savukku Shankar After Advisory Board Review",
    summary:
      "Tamil Nadu government has revoked the Goondas Act preventive detention order against YouTuber and political commentator Savukku Shankar after the Advisory Board found no sufficient cause to continue detention.",
    dek: "Chennai legal desk — Greater Chennai detention order of 9 April revoked on 19 May after Advisory Board review; habeas challenge before Madras High Court largely infructuous.",
    body,
    reportBody,
    analysisBody,
    category: "Politics",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: "https://www.livelaw.in/",
    sourceName: "LiveLaw, The Times of India — reported court and government developments",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
      {
        question:
          "Has Savukku Shankar’s Goondas Act detention been revoked or quashed by the Madras High Court?",
        answer:
          "Published reporting describes an executive revocation by the Tamil Nadu government on 19 May 2026 after the Advisory Board found no sufficient cause for detention. That is not the same as the Madras High Court quashing the order on habeas corpus merits before revocation.",
      },
      {
        question: "Who passed the original preventive detention order?",
        answer:
          "Reports cite an order dated 9 April 2026 by the Commissioner of Police, Greater Chennai, under the Tamil Nadu Preventive Detention Act (Goondas Act).",
      },
      {
        question: "What role did the Advisory Board play?",
        answer:
          "Under the Act, the Advisory Board reviews whether sufficient cause exists to continue detention. Reports state it unanimously found no sufficient cause, leading the Home Department to revoke the order.",
      },
      {
        question: "Does revocation mean all criminal cases are closed?",
        answer:
          "No. Reporting on the government order indicates release from preventive detention unless he is required in other cases or is serving a sentence after conviction. Bail had also been reported in the attempt-to-murder ground case before revocation.",
      },
      {
        question: "Why is this a Chennai-local news story?",
        answer:
          "The detaining authority is Greater Chennai Police, habeas proceedings were at the Madras High Court in Chennai, and the state executive action affects how preventive detention is discussed in Tamil Nadu’s capital region.",
      },
    ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-savukku-goondas] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-savukku-goondas] Inserted article:", SLUG);
  }

  console.log("[seed-savukku-goondas] Public URL:", `/chennai-local-news/${SLUG}`);
  console.log("[seed-savukku-goondas] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({ slug: SLUG, label: "seed-savukku-goondas" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
