/**
 * M.O.P. Vaishnav + AIMS — “Leaders for a Sustainable Future” workshop (13–14 Aug 2026).
 *
 * Dev:  `npm run db:seed:mop-vaishnav-leaders-sustainable-future-workshop-aug-2026`
 * Live: `npm run db:seed:mop-vaishnav-leaders-sustainable-future-workshop-aug-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

export const SLUG =
  "mop-vaishnav-leaders-for-a-sustainable-future-workshop-august-2026";

const HERO =
  "/images/articles/mop-vaishnav-leaders-sustainable-future-workshop-aug-2026-hero.png";
const BROCHURE =
  "/images/articles/mop-vaishnav-leaders-sustainable-future-workshop-aug-2026-brochure.png";
const FELICITATION =
  "/images/articles/mop-vaishnav-leaders-sustainable-future-workshop-aug-2026-felicitation.png";
const PANEL =
  "/images/articles/mop-vaishnav-leaders-sustainable-future-workshop-aug-2026-panel.png";
const STARTUP =
  "/images/articles/mop-vaishnav-leaders-sustainable-future-workshop-aug-2026-startup.png";

const COLLEGE_SITE = "https://mopvc.edu.in/";
const CONTACT_EMAIL = "mopmbamis@gmail.com";

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

const ARTICLE_URL = `https://mychennaicity.in/chennai-local-news/${SLUG}`;

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

  /** 15 Aug 2026 morning IST — day after the workshop closed */
  const publishedAt = new Date("2026-08-15T04:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- The **Department of Management Studies**, **M.O.P. Vaishnav College for Women (Autonomous)**, Nungambakkam, with the **Association of Indian Management Schools (AIMS)**, ran a national two-day workshop — **“Leaders for a Sustainable Future”** — on **13 and 14 August 2026**.
- Organisers report **nine** sessions covering leadership in the AI era, entrepreneurship, sustainable business, digital marketing, personal branding, business models, and start-up funding.
- About **115** participants took part — working professionals, aspiring entrepreneurs, research scholars, and UG/PG students.
- Inaugural address: **Dr. Panchanatham Natarajan** (Vice-Chancellor, Gandhigram Rural Institute); valedictory: **Dr. V. Srividya** (Director, PSG Institute of Management, Coimbatore).

## Disclaimer

This article is **civic journalism** for public-interest information about a Chennai campus workshop. It is based on an **organiser brief**, the **workshop brochure**, and **event photographs** supplied for this report. It is **not** an official communication of M.O.P. Vaishnav College, AIMS, or any speaker’s employer.

Session titles, speaker designations, and participant counts are as stated by the organisers unless independently verified. Confirm any future programmes or registration details with the college before acting on this article.

## Summary

**Chennai, 15 August 2026** — Over two days at **M.O.P. Vaishnav College for Women** in Nungambakkam, management students and professionals sat through a packed national workshop that tried to answer a blunt question: what does leadership look like when profit, purpose, AI tools, and start-up risk all share the same room?

The Department of Management Studies organised **“Leaders for a Sustainable Future”** with **AIMS**. Organisers said **115** people attended — a mix of UG/PG students, research scholars, working professionals, and aspiring entrepreneurs — across **nine** sessions that moved from mindset and team leadership to funding, branding, and alumnae entrepreneurship.

![Inaugural stage: Dr. Ramya Raman, Dr. Panchanatham Natarajan, and Dr. Archana Prasad at the Leaders for a Sustainable Future workshop, M.O.P. Vaishnav College, August 2026](${HERO})

*Inaugural dais at M.O.P. Vaishnav College — Dr. Ramya Raman, Dr. Panchanatham Natarajan, and Principal Dr. Archana Prasad. Photo: organisers.*

## Fact box

| Detail | Information |
| --- | --- |
| Event | National Level Two-Day Workshop — “Leaders for a Sustainable Future” |
| Dates | 13 & 14 August 2026 |
| Host | Department of Management Studies, M.O.P. Vaishnav College for Women (Autonomous), Chennai |
| Collaboration | Association of Indian Management Schools (AIMS) |
| Venue belt | Nungambakkam, Chennai – 600 034 |
| Participants (organiser figure) | About 115 |
| Sessions | Nine |
| Contact (dept.) | ${CONTACT_EMAIL} |

## Day 1 — mindset, teams, profit vs purpose

**13 August** opened with an inaugural address by **Dr. Panchanatham Natarajan**, Vice-Chancellor of Gandhigram Rural Institute, and a welcome from Principal **Dr. Archana Prasad**.

Sessions that followed, as listed in the brochure and confirmed in the organiser brief:

| Session | Speaker |
| --- | --- |
| Leadership Mindset in the AI Era | Mr. C. G. Srikrishnan, Senior Business Leader & Coach |
| Leadership Master Class: Leading Teams & Managing Challenges | Ms. Preeti Mishra, Managing Director, Hope4best Consultant Pvt Ltd |
| Executive Dialogue — “Can Profit and Purpose co-exist? — The Leader's Dilemma” | Mr. Ganapathy Subramanian (CHRO, Sundaram Home Finance); Mr. K. Madhusoodhanan (Director, Dhanyam Superstores); Ms. Padmavathy Raman (CFO, Heidelberg India) |
| Visionary Talk — “Journey from Idea to Start-up” | Ms. Arasi Arul, Founder & CEO, 60 Plus Global |

The executive dialogue and start-up talk framed sustainability not only as environment policy, but as the everyday tension between growth targets and longer-term purpose — a theme organisers kept returning to across both days.

![Guest speakers felicitated during the Leaders for a Sustainable Future workshop](${FELICITATION})

*Felicitation during the workshop sessions. Photo: organisers.*

## Day 2 — marketing, branding, funding, alumnae panel

**14 August** shifted toward practical entrepreneurship and digital skills:

| Session | Speaker |
| --- | --- |
| AI Tools for Digital Marketing | Mr. Santosh Srinivasan, Founder, ChakraView Consulting |
| Personal Branding for Future Leaders | Ms. G. Shubashree, Life Skills Trainer & Growth Strategist |
| Funding Opportunities for Start-ups | Mr. Prakash Subramanian, Founder & CEO, Zero 2 Billion |
| Business Model Canvas | Mr. Bhanu Kumar, ARRA Associates |
| Panel — “Entrepreneurial Excellence: Insights from M.O.P. Alumnae” | Ms. Ankitha Prakash (COO, Varadaraja Cinemas); Ms. Simran Bohra (Founder, Tara Jewellery); Ms. Rushda Rahman (Founder, Noshi); Ms. Rachana Mittal (Chennai Zone & Head HR, Sett & Lucas) |
| Valedictory address | Dr. V. Srividya, Director, PSG Institute of Management, Coimbatore |

![Ms. Padmavathy Raman felicitated at the workshop](${PANEL})

*Ms. Padmavathy Raman (CFO, Heidelberg India) was among the industry leaders felicitated during the executive dialogue. Photo: organisers.*

![Start-up session felicitation at M.O.P. Vaishnav College](${STARTUP})

*Recognition after a start-up / idea-to-venture session. Photo: organisers.*

## Why this workshop sat in Nungambakkam

M.O.P. Vaishnav College for Women, established in **1992**, runs UG, PG, and doctoral programmes and is affiliated to the University of Madras (NAAC **A++**). The Department of Management Studies (from **1995**) offers an AICTE-approved MBA with Marketing, Finance, HR, and Business Analytics specialisations.

For Chennai’s management students, a national workshop with AIMS and a speaker mix from finance, retail, consulting, and alumnae ventures is less “guest lecture filler” and more a compressed map of how campus learning meets hiring and founding decisions.

![Workshop brochure — Leaders for a Sustainable Future, August 2026](${BROCHURE})

*Programme brochure shared by the organisers (registration window and fees were for the August 2026 edition). Photo: organisers.*

## Who attended

Organisers said the room mixed:

- UG and PG students
- Research scholars
- Aspiring entrepreneurs
- Working professionals

That mix matters in Chennai: many campus events stay student-only; this one deliberately pulled in people already in jobs or building ventures, which changes the quality of Q&A in funding and branding sessions.

## Sources

- Organiser workshop brief and participant count (Department of Management Studies / M.O.P. Vaishnav)
- Workshop brochure (dates, session titles, speaker designations, registration fee window)
- Event photographs supplied by the organisers
- College context: [mopvc.edu.in](${COLLEGE_SITE})`.trim();

  const analysisBody = `## Why Chennai readers should care

Chennai’s management colleges run many seminars. What stood out here was the **two-day arc** — AI-era leadership and team craft on day one, then digital marketing, personal branding, funding, and a live alumnae entrepreneurship panel on day two — plus an AIMS national frame that signals peers beyond one city campus.

For students and early-career professionals in Central Chennai, the practical takeaway is simple: **purpose-led leadership** is being taught alongside **funding and branding**, not as a separate CSR elective.

## What to watch next

1. Check the Department of Management Studies / college notices for follow-on workshops or AIMS collaborations.
2. Treat brochure registration fees (early-bird / standard) as **edition-specific** — they applied to the August 2026 window, not as a standing tariff.
3. Alumnae panels like this are often the best local signal of which sectors M.O.P. graduates are actually building in (cinema ops, jewellery, D2C, HR).

## Related reading on mychennaicity.in

- [Chennai local news](/chennai-local-news)
- [Central Chennai area hub — Teynampet & Nungambakkam](/areas/teynampet-nungambakkam)
- [Chennai local events](/chennai-local-events)
- [Economy topic](/chennai-local-news/topic/economy)

## Editorial note

Speaker titles and company names follow the organiser brochure and brief. Minor spelling variants on nameplates (e.g. Archana / Archna) are normalised to the brochure form where they differ. Participant total (**115**) and session count (**nine**) are organiser figures.

## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can sometimes make mistakes — misread names, miss nuance, or invent detail.
Please cross-check important facts with M.O.P. Vaishnav College, AIMS, or other primary sources before acting on them.`.trim();

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
      "M.O.P. Vaishnav Hosts National Workshop ‘Leaders for a Sustainable Future’ With AIMS",
    summary:
      "The Department of Management Studies at M.O.P. Vaishnav College for Women, with AIMS, ran a two-day national workshop on 13–14 August 2026. About 115 participants attended nine sessions on AI-era leadership, entrepreneurship, branding, and start-up funding.",
    dek: "Nungambakkam campus desk — two days, nine sessions, ~115 participants; inaugural by Dr. Panchanatham Natarajan.",
    body,
    reportBody,
    analysisBody,
    category: "Economy",
    areaHubSlug: "teynampet-nungambakkam",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO,
    sourceUrl: ARTICLE_URL,
    sourceName:
      "M.O.P. Vaishnav College — Department of Management Studies (workshop brief & brochure, Aug 2026)",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question:
            "When was the Leaders for a Sustainable Future workshop held?",
          answer:
            "On 13 and 14 August 2026 at M.O.P. Vaishnav College for Women (Autonomous), Nungambakkam, Chennai.",
        },
        {
          question: "Who organised the workshop?",
          answer:
            "The Department of Management Studies, M.O.P. Vaishnav College for Women, in collaboration with the Association of Indian Management Schools (AIMS).",
        },
        {
          question: "How many people participated?",
          answer:
            "Organisers said about 115 participants — working professionals, aspiring entrepreneurs, research scholars, and UG/PG students.",
        },
        {
          question: "What topics were covered?",
          answer:
            "Nine sessions spanning leadership in the AI era, leading teams, profit vs purpose, idea-to-start-up journeys, AI tools for digital marketing, personal branding, start-up funding, business model canvas, and an M.O.P. alumnae entrepreneurship panel.",
        },
        {
          question: "How can readers contact the department?",
          answer: `Department contact listed on the brochure: ${CONTACT_EMAIL}. Confirm any future programmes via the college.`,
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-mop-workshop] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-mop-workshop] Inserted article:", SLUG);
  }

  console.log("[seed-mop-workshop] Public URL:", `/chennai-local-news/${SLUG}`);
  console.log("[seed-mop-workshop] Live URL:", ARTICLE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-mop-vaishnav-leaders-sustainable-future-workshop-aug-2026",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
