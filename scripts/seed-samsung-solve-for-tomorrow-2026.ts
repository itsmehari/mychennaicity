/**
 * Samsung Solve for Tomorrow 2026 — Chennai students (applications to 3 Jul 2026).
 *
 * Dev:  `npm run db:seed:samsung-solve-for-tomorrow-2026`
 * Live: `npm run db:seed:samsung-solve-for-tomorrow-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const SOURCE_URL = "https://www.samsung.com/in/solvefortomorrow/";

const HERO_IMAGE_URL =
  "https://images.samsung.com/is/image/samsung/assets/in/solvefortomorrow/2026/main-kv-d-v1.jpg";

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

export const SAMSUNG_SOLVE_FOR_TOMORROW_2026_SLUG =
  "samsung-solve-for-tomorrow-2026-chennai-students";

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

  const publishedAt = new Date("2026-06-01T07:00:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- **Samsung India** has opened **Solve for Tomorrow 2026** — its fifth youth innovation edition — with applications from **7 May to 3 July 2026**.
- Students aged **14–22** can apply **solo or in teams of up to three** with original tech ideas in **AI Living for India**, **Health & Education**, **Environmental Sustainability**, and **Sport & Tech**.
- **Four winning teams** receive incubation at **FITT, IIT Delhi**, plus a combined **₹2 crore** grant; shortlisted teams get stage-wise support (₹20,000 for Top 40; ₹1,00,000 for Top 20, per Samsung’s programme FAQ).
- **Apply on the official site:** [Samsung Solve for Tomorrow 2026 — India](${SOURCE_URL})
- **Primary source:** [Samsung India — Solve for Tomorrow programme page](${SOURCE_URL}) (themes, eligibility, timeline, and prizes).

## CHENNAI: What opened and who it is for

For Chennai’s school and college students with bold technology ideas, Samsung India has opened a serious opportunity. The company launched the **fifth edition of Samsung Solve for Tomorrow 2026**, its flagship youth innovation programme.

The programme invites young innovators aged **14 to 22 years** to submit technology-driven solutions for real-world problems. Participants can apply as individuals or as teams of up to three members, provided their ideas are original and focused on meaningful societal challenges.

This year’s themes include **AI Living for India**, **Health & Education**, **Environmental Sustainability**, and **Sport & Tech**. For Chennai students, these map directly to local problems: traffic and road safety, urban flooding, heat stress, waste management, public health, senior care, learning gaps, sports access, and civic services.

## Why Chennai students should take this seriously

Chennai is not just another city in this competition. **Tamil Nadu** has shown strong participation in earlier editions — Samsung’s programme materials cite **more than 5,000 students from the state** engaging over the past four years.

Chennai has the mix of schools, engineering colleges, coding communities, startup exposure, and design talent that fits a national challenge. A student from Anna Nagar, Velachery, Tambaram, Porur, T. Nagar, Adyar, or any neighbourhood does not need a futuristic gadget. A strong solution can start with a simple local problem observed clearly.

**Soundbite:** “The best tech ideas do not start with code. They start with noticing a problem others ignore.”

## What winners get

According to Samsung’s official programme page, the **four winning teams** receive incubation support at **FITT, IIT Delhi**, along with a combined **₹2 crore funding grant** to develop and scale their ideas. Selected teams also receive mentorship on technology, design thinking, business strategy, entrepreneurship, and market readiness.

Shortlisted teams move through online training, mentorship, a bootcamp, Samsung office visits, IIT Delhi prototyping lab access, national pitching, and a grand finale. The **Top 40** teams attend an innovation bootcamp and pitch event; the **Top 20** receive further mentoring before the final round.

Samsung’s FAQ lists stage-wise financial support including **₹20,000 for Top 40 teams**, **₹1,00,000 for Top 20 teams**, and the final **₹2 crore combined grant** for the four winning teams.

## Chennai problem ideas students can work on

Chennai itself is a live innovation lab. Possible directions include:

| Theme area | Example idea |
|------------|----------------|
| AI & mobility | Low-cost alerts for accident-prone junctions, school zones, or crowded bus stops |
| Floods | Neighbourhood waterlogging reports with maps and predictive alerts |
| Heat stress | Mobile or wearable alerts for outdoor workers and seniors on extreme summer days |
| Waste | AI helper for wet, dry, e-waste, and recyclables at home |
| Learning | Tamil–English revision tools or low-bandwidth education apps |
| Senior safety | Quick alerts, medicine reminders, or inactivity checks for elderly residents |
| Sport access | Map public grounds, coaching, and safe play spaces across the city |

## Who can apply

- **Age:** Indian residents **14–22 years** as of **3 July 2026**
- **Team size:** Individual or up to **three members**
- **Idea:** Original; science, technology, or a new product with social impact
- **Not eligible:** Projects that already received funding or awards **above ₹5 lakh** for the same idea

## Application deadline

Applications close **3 July 2026**. Students from Chennai schools, colleges, engineering institutions, innovation clubs, coding groups, and startup cells should define the problem, explain the technology, and show who benefits.

**Apply here:** [Samsung Solve for Tomorrow 2026 — official applications](${SOURCE_URL})`.trim();

  const analysisBody = `## Why this matters for Chennai

For many students, competitions stop at certificates and one-day events. **Solve for Tomorrow** connects an idea to mentorship, prototyping, pitching, incubation, and funding.

For Chennai, it is also a chance to show that young innovators from the city can solve problems that affect real people. A classroom idea can move to **IIT Delhi**, receive national mentoring, and potentially become a startup or civic technology product.

**Soundbite:** “A local problem, solved well, can become a national solution.”

## Before you submit

1. Read themes and rules on the [official Samsung page](${SOURCE_URL}) — do not rely on social posts alone.
2. Write a one-paragraph **problem statement** tied to Chennai (who suffers, where, when).
3. Explain **what your tech does** in plain language before jargon.
4. Check team age limits and originality rules if you already entered another contest.

## Related reading on mychennaicity.in

- [Chennai local news](/chennai-local-news) — latest city desk stories.
- [Economy topic](/chennai-local-news/topic/economy) — jobs, business, and opportunity stories.
- [Reading job ads in Chennai](/guides/chennai-tech-careers) — if your idea grows into a hiring journey later.
- [Chennai jobs](/chennai-jobs) — open roles across the city.`.trim();

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(
      and(eq(articles.cityId, city.id), eq(articles.slug, SAMSUNG_SOLVE_FOR_TOMORROW_2026_SLUG)),
    )
    .limit(1);

  const values = {
    cityId: city.id,
    slug: SAMSUNG_SOLVE_FOR_TOMORROW_2026_SLUG,
    title:
      "Chennai Students, This ₹2 Crore Samsung Tech Challenge Could Turn Your Idea Into a Startup",
    summary:
      "Samsung India has opened applications for Solve for Tomorrow 2026. Chennai students aged 14–22 can apply with tech ideas in AI, health, education, sustainability, and sport-tech before July 3, 2026.",
    dek: "Fifth edition open until 3 Jul 2026 — ₹2 crore combined grant for four winning teams; apply on Samsung’s official India site.",
    body,
    reportBody,
    analysisBody,
    category: "Economy",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: SOURCE_URL,
    sourceName: "Samsung India — Solve for Tomorrow 2026",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "When do applications close for Samsung Solve for Tomorrow 2026?",
          answer:
            "Applications are open from 7 May 2026 through 3 July 2026, per Samsung India’s official programme page.",
        },
        {
          question: "Who can apply from Chennai?",
          answer:
            "Indian residents aged 14–22 as of 3 July 2026, individually or in teams of up to three, with an original tech idea aligned to the programme themes.",
        },
        {
          question: "What do winning teams receive?",
          answer:
            "Samsung states four winning teams get incubation at FITT, IIT Delhi, plus a combined ₹2 crore grant, along with mentorship through bootcamp, pitching, and prototyping stages.",
        },
        {
          question: "Where do I apply officially?",
          answer: `Use Samsung India’s programme site: ${SOURCE_URL}`,
        },
        {
          question: "What themes fit Chennai students?",
          answer:
            "AI Living for India, Health & Education, Environmental Sustainability, and Sport & Tech — covering traffic, floods, heat, waste, learning gaps, senior care, and sports access.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-samsung-sft] Refreshed article:", SAMSUNG_SOLVE_FOR_TOMORROW_2026_SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-samsung-sft] Inserted article:", SAMSUNG_SOLVE_FOR_TOMORROW_2026_SLUG);
  }

  console.log(
    "[seed-samsung-sft] Public URL:",
    `/chennai-local-news/${SAMSUNG_SOLVE_FOR_TOMORROW_2026_SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SAMSUNG_SOLVE_FOR_TOMORROW_2026_SLUG,
      label: "seed-samsung-sft",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
