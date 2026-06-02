/**
 * EDII-TN three-day e-commerce training (16–18 Jun 2026, Guindy) + Economy news notice.
 *
 * Dev:  `npm run db:seed:edii-tn-ecommerce-training-2026`
 * Live: `npm run db:seed:edii-tn-ecommerce-training-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities, events } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const ORGANISER_URL = "https://www.editn.in/";
const EVENT_PATH =
  "/chennai-local-events/edii-tn-ecommerce-training-programme-chennai-june-2026";

export const EDII_ECOMMERCE_EVENT_SLUG =
  "edii-tn-ecommerce-training-programme-chennai-june-2026";

export const EDII_ECOMMERCE_NEWS_SLUG =
  "edii-tn-ecommerce-training-guindy-june-2026";

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

const EVENT_DESCRIPTION = `The **Entrepreneurship Development and Innovation Institute, Tamil Nadu (EDII-TN)**, Chennai is organizing a **three-day E-Commerce Training Programme** from **16 June 2026 to 18 June 2026** at the EDII-TN campus in **Ekkattuthangal, Guindy**.

The programme is designed for aspiring entrepreneurs, MSME owners, home-based businesses, and startup founders who want to understand how to start, structure, and scale an e-commerce or direct-to-consumer (D2C) business.

With online commerce becoming an important growth channel for small businesses, this government training programme focuses on practical learning: business planning, platform selection, customer acquisition, pricing, operations, and scaling strategies.

## Event details

| Detail | Information |
|--------|-------------|
| **Event** | Three-Day E-Commerce Training Programme |
| **Organizer** | Entrepreneurship Development and Innovation Institute, Tamil Nadu |
| **Dates** | 16 June 2026 to 18 June 2026 |
| **Time** | 10:00 AM to 5:00 PM daily |
| **Venue** | EDII-TN Campus, Ekkattuthangal, Guindy, Chennai – 600032 |
| **Eligibility** | 18+ years; minimum 10th standard qualification |
| **Certificate** | Government certificate upon completion |
| **Website** | [www.editn.in](${ORGANISER_URL}) |
| **Contact** | 9360221280 / 8668100181 |

## What participants will learn

Participants will learn how to understand different D2C business models and identify the right fit for their products or services. The programme covers product–market alignment, selection of appropriate e-commerce platforms, product listings, pricing strategies, operational workflows, customer support systems, marketing, customer acquisition, retention, and business scaling.

The training includes guided exercises, structured templates, case discussions, and practical mapping activities so participants leave with implementable strategies.

## Key learning outcomes

By the end of the programme, participants are expected to gain:

- Clear understanding of e-commerce and D2C business structures
- Platform selection clarity based on product category
- Structured product listing and pricing approach
- Defined operational and customer support flow
- Customer retention strategy framework
- Documented scaling roadmap for business growth

## Who can apply?

The programme is suitable for:

- Aspiring entrepreneurs
- MSME owners
- Home-based business owners
- Startup founders exploring online channels

Eligible candidates should be **above 18 years** and should have completed at least **10th standard**. **Basic computer knowledge** is required; **no prior technical background** is necessary. Male, female, and transgender candidates are eligible.

## Venue address

Entrepreneurship Development and Innovation Institute  
No. 1, EDI Institute Road,  
SIDCO Industrial Estate,  
Ekkattuthangal, Guindy,  
Chennai – 600032.

## Hostel facility

Hostel facility is available at affordable rates on a **first-come, first-served** basis. **Pre-registration is mandatory.**

## Registration and contact

For more information and registration, visit **[www.editn.in](${ORGANISER_URL})**.

For assistance on working days (**Monday to Friday**, **10:00 AM to 5:45 PM**):

- **9360221280**
- **8668100181**

---

Programme details issued via **DIPR, Secretariat, Chennai – 9**. Confirm dates, fees, and registration steps on the official EDII-TN website or by phone before you travel.`;

async function seedEvent(cityId: string) {
  const [existing] = await db
    .select({ id: events.id })
    .from(events)
    .where(
      and(eq(events.cityId, cityId), eq(events.slug, EDII_ECOMMERCE_EVENT_SLUG)),
    )
    .limit(1);

  /** 16 Jun 2026 10:00 AM IST – 18 Jun 2026 5:00 PM IST */
  const startsAt = new Date("2026-06-16T04:30:00.000Z");
  const endsAt = new Date("2026-06-18T11:30:00.000Z");
  const now = new Date();

  const values = {
    cityId,
    slug: EDII_ECOMMERCE_EVENT_SLUG,
    title:
      "Three-Day E-Commerce Training Programme in Chennai by EDII-TN (16–18 June 2026)",
    description: EVENT_DESCRIPTION,
    startsAt,
    endsAt,
    allDay: false,
    venueName: "EDII-TN Campus",
    venueAddress:
      "No. 1, EDI Institute Road, SIDCO Industrial Estate, Ekkattuthangal, Guindy, Chennai – 600032",
    localityLabel: "Guindy",
    status: "scheduled" as const,
    featured: true,
    updatedAt: now,
  };

  if (existing) {
    await db.update(events).set(values).where(eq(events.id, existing.id));
    console.log("[seed-edii-tn] Refreshed event:", EDII_ECOMMERCE_EVENT_SLUG);
  } else {
    await db.insert(events).values({ ...values, createdAt: now });
    console.log("[seed-edii-tn] Inserted event:", EDII_ECOMMERCE_EVENT_SLUG);
  }

  console.log("[seed-edii-tn] Event URL:", EVENT_PATH);
}

async function seedNewsArticle(cityId: string) {
  const publishedAt = new Date("2026-06-02T05:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key points

- **EDII-TN** (Entrepreneurship Development and Innovation Institute, Tamil Nadu) is running a **three-day e-commerce training programme** in Chennai from **16 to 18 June 2026**, **10:00 AM to 5:00 PM** daily.
- The campus is at **Ekkattuthangal, Guindy** — open to aspiring entrepreneurs, **MSME** owners, home-based businesses, and startup founders exploring **D2C** and online sales.
- Eligible applicants are **18+** with at least **10th standard** qualification and basic computer knowledge; a **government certificate** is issued on completion.
- **Registration and details:** [www.editn.in](${ORGANISER_URL}) · **9360221280** / **8668100181** (Mon–Fri, 10:00 AM–5:45 PM).

## What this is

The Tamil Nadu government’s EDII-TN institute is offering structured training on how to plan, launch, and scale e-commerce — including platform choice, listings, pricing, operations, marketing, and customer retention. Hostel places are available on a first-come basis with mandatory pre-registration.

For Chennai’s small business owners, home entrepreneurs, and MSMEs moving offline sales online, this is a practical public programme rather than a generic webinar series.

## Full programme page

Dates, venue, eligibility, learning outcomes, and contact numbers are on our **events calendar**:

**[Three-Day E-Commerce Training Programme — full details](${EVENT_PATH})**

---

Notice basis: **DIPR, Secretariat, Chennai – 9**. Confirm schedule and registration on [editn.in](${ORGANISER_URL}) before you apply.`;

  const body = reportBody;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(
      and(eq(articles.cityId, cityId), eq(articles.slug, EDII_ECOMMERCE_NEWS_SLUG)),
    )
    .limit(1);

  const values = {
    cityId,
    slug: EDII_ECOMMERCE_NEWS_SLUG,
    title:
      "EDII-TN offers three-day e-commerce training in Guindy for MSMEs and startups (16–18 June)",
    summary:
      "Entrepreneurship Development and Innovation Institute, Tamil Nadu is conducting a government e-commerce and D2C training programme at its Ekkattuthangal campus from 16 to 18 June 2026. Open to entrepreneurs 18+ with 10th pass and basic computer skills.",
    dek: "Chennai economy desk — government training notice with dates, eligibility, and link to full event details.",
    body,
    reportBody,
    category: "Economy",
    areaHubSlug: "saidapet-guindy-alandur",
    status: "published" as const,
    publishedAt,
    featured: false,
    sourceUrl: ORGANISER_URL,
    sourceName:
      "EDII-TN — Entrepreneurship Development and Innovation Institute, Tamil Nadu",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question:
            "When is the EDII-TN e-commerce training programme in Chennai?",
          answer:
            "16 June 2026 to 18 June 2026, 10:00 AM to 5:00 PM each day, at the EDII-TN campus in Ekkattuthangal, Guindy.",
        },
        {
          question: "Who can apply for the EDII-TN e-commerce programme?",
          answer:
            "Candidates aged 18 and above with at least 10th standard qualification and basic computer knowledge. Suitable for aspiring entrepreneurs, MSME owners, home-based businesses, and startup founders.",
        },
        {
          question: "How do I register for EDII-TN e-commerce training?",
          answer: `Visit the official site www.editn.in or call 9360221280 / 8668100181 on working days (Monday–Friday, 10:00 AM–5:45 PM). See full details at ${EVENT_PATH}.`,
        },
        {
          question: "Is hostel accommodation available?",
          answer:
            "Yes, at affordable rates on a first-come, first-served basis. Pre-registration is mandatory.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-edii-tn] Refreshed article:", EDII_ECOMMERCE_NEWS_SLUG);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-edii-tn] Inserted article:", EDII_ECOMMERCE_NEWS_SLUG);
  }

  console.log(
    "[seed-edii-tn] News URL:",
    `/chennai-local-news/${EDII_ECOMMERCE_NEWS_SLUG}`,
  );
}

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

  await seedEvent(city.id);
  await seedNewsArticle(city.id);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: EDII_ECOMMERCE_NEWS_SLUG,
      label: "seed-edii-tn",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
