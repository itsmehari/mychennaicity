/**
 * Anudip Chromepet AI / data-analytics training notice — civic explainer.
 *
 * Dev:  `npm run db:seed:anudip-chromepet-ai-data-analytics-training-2026`
 * Live: `npm run db:seed:anudip-chromepet-ai-data-analytics-training-2026:live`
 *
 * Hero: Wikimedia Commons “Chrompet flyover.jpg” (GST Road, Chromepet).
 * https://commons.wikimedia.org/wiki/File:Chrompet_flyover.jpg
 *
 * Social draft (X): see comment at end of file.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

export const SLUG = "anudip-chromepet-ai-data-analytics-training-chennai-graduates-2026";

const HERO =
  "/images/articles/anudip-chromepet-ai-data-analytics-training-2026-hero.jpg";

const ANUDIP = "https://anudip.org/";
const CENTRES = "https://anudip.org/center-location/";
const FAQ = "https://anudip.org/student-faq/";
const ANNUAL_REPORT =
  "https://anudip.org/wp-content/uploads/2024/11/Annual-Report-23-24.pdf";
const JOBS_HUB = "/chennai-jobs";
const JOB_ADS_GUIDE =
  "/chennai-local-news/chennai-local-job-ads-guide-business-owners-hr";
const EDII_NEWS =
  "/chennai-local-news/edii-tn-ecommerce-training-guindy-june-2026";

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

  /** 15 Sep 2026 morning IST */
  const publishedAt = new Date("2026-09-15T04:30:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Graduates in Chennai are being invited to a **three-month**, hybrid **data analytics / business analysis / AI-tools** programme at **Anudip Foundation’s Chromepet** centre, with a **₹1,000** registration or commitment fee mentioned in the circulating notice.
- **Verified:** Anudip is a real skill-development organisation (operating since **2007**); the Chromepet centre is listed on its official directory; the organisation publishes placement activity and is an **NSDC-associated** training partner.
- **Not independently verified for this batch:** exact ₹1,000 terms (refunds, extra charges), seat count, current employer tie-ups, and what “**shortlisted**” meant in the message.
- “**100% placement support**” is **support after training**, not a guaranteed job. Anudip’s own **2023–24** report lists **23,911** placements against **42,000+** trained nationally, and **961** placed of **2,335** trained in **Tamil Nadu**.

## Summary

**Chennai, 15 September 2026** — Graduates are being invited to enrol in a three-month training programme covering data analytics, business analysis and artificial intelligence tools at Anudip Foundation’s Chromepet centre.

According to a recruitment communication circulating among students, the programme covers Advanced Excel, SQL, Power BI, Tableau, JIRA, Confluence, business-analysis tools, generative AI, soft skills and interview preparation.

The programme is described as **three hours a day, Monday to Friday**, in a **hybrid** online-and-offline model. Candidates are being asked to pay a **₹1,000** registration or commitment fee.

The practical questions for a Chennai graduate are: who is Anudip, what does the Chromepet centre look like on the public record, and what should you treat as a **route to skills** versus a **promise of employment**?

## Anudip is an established skill-development organisation

Anudip Foundation has operated since **2007** and focuses largely on employability and technology training for young people. It is a Section 8 not-for-profit company and describes itself as a partner of the **National Skill Development Corporation**.

Government records have listed Anudip among NGOs **financed through NSDC** to impart training. Its model includes classroom, e-learning and blended programmes funded through a mix of **CSR**, donations, grants and trainee fees.

Anudip currently says it has impacted **more than 730,000** people and operates **100+** learning centres while working with companies on skilling and employment. Treat those impact figures as **the organisation’s own published claims**, not as a forecast for any one Chromepet batch.

## The Chromepet centre is officially listed

The centre named in the student communication can be checked independently.

Anudip’s [centre directory](${CENTRES}) lists its **Chromepet Skill and Career Development Centre** at **No. 52/206, Ground Floor, GST Road, Chromepet, Chennai – 600044**.

The same directory lists other Tamil Nadu centres, including **Arumbakkam**, **Avadi**, **Pallavaram**, **Kilpauk**, **West Tambaram**, **Salem** and **Coimbatore**.

Recent public posts also show industry-facing sessions at Chromepet. One LinkedIn account described professionals from **Bank of America** speaking to students there about **software testing, automation and interview readiness**. That is evidence of **corporate volunteering / orientation activity**, not proof that Bank of America (or any named employer) is hiring this analytics batch.

## What students will study

The curriculum in the current invitation mixes conventional analytics tools with business-analysis and AI skills.

**Advanced Excel** and **SQL** remain basic tools for structured business data. **Power BI** and **Tableau** are widely used for dashboards. **JIRA** and **Confluence** sit closer to project tracking and business-analysis workflows. **Generative AI** is being added to many newer programmes as employers expect staff to use AI-assisted research, documentation and productivity tools.

The mix looks aimed less at producing specialised data scientists and more at preparing graduates for **entry-level reporting, analytics, operations and business-process** roles.

## What “100% placement support” means

One phrase in the advertisement deserves extra weight: **“100% Placement Support.”**

Placement support is **not** guaranteed employment.

Anudip itself separates the two. Its [student FAQ](${FAQ}) speaks of **placement and job support** after training. The organisation has also published an overall placement rate of around **70%** in impact materials — and its 2023–24 annual report describes a difficult entry-level hiring market in which it still aimed to place about **70%** of learners.

A job still depends on vacancies, employer eligibility rules, aptitude and technical tests, interview performance, and whether a candidate will accept a given role or location.

The circulating notice also says placement support **begins after a learner completes 50% of the training**. Confirm that rule in writing before you treat it as a contract term.

## What Anudip’s own placement numbers show

Anudip publishes annual reports and audited information on [anudip.org](${ANUDIP}). Those documents give more context than headline advertising.

The **[2023–24 annual report](${ANNUAL_REPORT})** states that **more than 42,000** students were trained nationally and **23,911** were placed during the year.

For **Tamil Nadu**, the same report lists **2,335** candidates trained and **961** placed.

Those figures show measurable placement activity. They also show why “placement support” should not be read as a promise that **every** enrollee will get a job — especially not from a single Chromepet analytics batch whose employer list we have not independently confirmed.

## Why is the programme available for only ₹1,000?

A three-month course covering Excel, SQL, Power BI, Tableau and related tools would usually cost much more at a commercial institute.

Anudip, however, runs largely on a **subsidised skilling** model. NSDC-linked records and Anudip’s own materials describe funding from **CSR, grants and trainee fees**. The amount collected from a student need not equal the full cost of delivery.

Different Anudip programmes also carry **different** fees. Its Academy vertical, for example, has advertised graduate programmes with separate registration and training charges. Do not assume the Chromepet ₹1,000 notice matches every other Anudip product.

Students should still obtain a **receipt** for the ₹1,000 payment and confirm whether it is refundable, whether extra course or exam charges apply, and what attendance or completion conditions are attached.

## Similar analytics recruitment has already appeared in Chennai

There are signs this invitation sits in a wider Chennai outreach, not a one-off whisper.

In **July 2026**, a Chennai graduate posted publicly that they had attended a **Loyola College** job fair and were later invited to Anudip’s Data Analyst Training and Placement Program at Chromepet.

Other online discussions mention recent Anudip programmes with relatively small enrolment amounts. Individual posts are **not** official confirmation of today’s terms.

## Who is eligible?

According to the current invitation, applications are being accepted from candidates graduating between **2021 and 2026**.

Listed qualifications include **BE / B.Tech** (eligible branches), **B.Sc / M.Sc** in computer science and IT streams, and **BCA / MCA**. Candidates must reportedly have at least **50%** marks and **no active backlogs**.

The programme therefore looks aimed at graduates and recent graduates trying to enter technology-enabled **analytical and business-operations** roles.

## What “shortlisted” may (and may not) mean

The communication says the recipient was “**shortlisted based on your academic profile**.”

Unless applicants went through a documented screening — test, interview, or a named shortlist against a closed application window — “shortlisted” can simply be **recruitment language** for a broad outreach. This desk found evidence of **wide student messaging** and earlier Chennai recruitment, but **not** evidence of the selection process used for this particular batch.

Ask Anudip, in writing: how many people received the same message, whether any assessment was done, and how many seats exist.

## What students should verify before registering

Treat the programme as **training plus employment assistance**, not as a confirmed job offer.

Before paying, get clarity on:

- exact syllabus and instructional hours
- trainer credentials and project work
- certification, attendance rules, refunds and extra charges
- companies or **job categories** this Chromepet batch is being prepared for
- typical starting salaries, work locations, and how many **previous Chennai batches** actually received offers

Those details are more useful than the phrase “100% placement support.”

Pay only through **authorised channels** and against a **valid receipt**. Do not share Aadhaar, bank or original certificates until you know why they are needed and how they will be stored.

## Verification box

| Claim | Status at publication |
| --- | --- |
| Anudip Foundation exists; founded 2007 | **Verified** (organisation’s public record) |
| Chromepet centre at 52/206, GST Road, Chennai 600044 | **Verified** ([centre directory](${CENTRES})) |
| NSDC-associated / financed training partner | **Verified** at organisation + government-list level; not a licence for this batch |
| National / Tamil Nadu 2023–24 trained and placed counts | **Verified** against the [annual report](${ANNUAL_REPORT}) |
| ₹1,000 fee, exact curriculum, seats, current employers, “shortlisted” process | **Not independently verified** for this batch — confirm with Anudip |`;

  const analysisBody = `## Is it worth considering?

For a graduate with limited exposure to Excel, SQL, Power BI or business-analysis tools, a subsidised three-month structured programme can be a useful **entry point**.

₹1,000 is comparatively small, and the organisation behind the programme is an established skill-development body with listed centres, corporate collaborations and published placement activity.

Enter with **realistic expectations**. Three months of training cannot, by itself, turn a beginner into an advanced data analyst or AI professional. Value will depend on instruction quality, the depth of projects, and whether students keep practising SQL, analytics and visualisation on their own.

Most importantly: **“100% placement support” is support — not a 100% employment guarantee.**

For graduates who understand that distinction, verify the programme conditions, and are prepared to put in the work, the initiative may still be a relatively low-cost route to practical analytics skills and **entry-level recruitment pipelines**.

## Related reading on mychennaicity.in

- [Chennai jobs hub](${JOBS_HUB})
- [How local job ads work for Chennai hiring](${JOB_ADS_GUIDE})
- [EDII-TN e-commerce training notice (Guindy)](${EDII_NEWS})
- [Anudip centre directory (official)](${CENTRES})
- [Anudip 2023–24 annual report (PDF)](${ANNUAL_REPORT})

## Fine print

This article is civic journalism for public-interest information, based on a programme communication shared with this desk, Anudip’s public website and 2023–24 annual report, NSDC-linked public records, and other checkable sources at publication. It is not an official Anudip notice, job offer, prospectus or government circular. MyChennaiCity.in is not affiliated with, sponsored by, or representing Anudip Foundation or any organisation named here.

Fees, eligibility, curriculum, schedules, vacancies and placement assistance may change. Verify current terms directly with Anudip before registering, paying, or sharing personal documents. “100% placement support” is not a guarantee of employment. Recruitment depends on employer requirements, candidate eligibility, assessments, interviews and vacancies.

The existence of Anudip Foundation and its listed Chromepet centre has been independently verified. Programme-specific claims for this batch — including seats, employer tie-ups, selection methodology, the ₹1,000 terms and exact placement outcomes — should be confirmed with the training provider. Pay only through authorised channels and against a valid receipt.

If any factual information requires correction, the organisation may contact the MyChennaiCity editorial team with supporting documentation. Hero photograph: Chromepet / GST Road flyover, Wikimedia Commons file *Chrompet flyover.jpg* — location context only; not a photograph of Anudip’s classroom.

This report was prepared with AI-assisted news authoring and human editorial review. AI tools can err. Cross-check important facts with Anudip or other primary sources before acting on them.`;

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
      "Anudip Foundation offers AI and data analytics training for Chennai graduates: what students should know",
    summary:
      "A three-month hybrid analytics and AI-tools programme is being offered at Anudip’s listed Chromepet centre for about ₹1,000. The organisation is real and NSDC-linked, but “100% placement support” is not a job guarantee.",
    dek: "Chromepet centre verified; placement support is not a 100% employment promise — check fees, seats and what “shortlisted” actually means.",
    body,
    reportBody,
    analysisBody,
    category: "Economy",
    areaHubSlug: "saidapet-guindy-alandur",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO,
    sourceUrl: CENTRES,
    sourceName:
      "Anudip centre directory; Anudip 2023–24 annual report; student programme communication; NSDC-linked public records",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question:
            "Is Anudip Foundation’s Chromepet training centre genuine?",
          answer:
            "Yes. Anudip’s official centre directory lists the Chromepet Skill and Career Development Centre at No. 52/206, Ground Floor, GST Road, Chromepet, Chennai 600044. The organisation has operated since 2007.",
        },
        {
          question:
            "Does “100% placement support” mean every student will get a job?",
          answer:
            "No. Anudip describes placement and job support after training. Its 2023–24 annual report lists 23,911 placements against more than 42,000 trained nationally, and 961 placed of 2,335 trained in Tamil Nadu. Employment still depends on vacancies, assessments and interviews.",
        },
        {
          question: "How much does the Chromepet AI and analytics programme cost?",
          answer:
            "The circulating student notice asks for a ₹1,000 registration or commitment fee. That amount, refunds, extra charges and whether it covers the full course have not been independently verified for this batch. Ask for a receipt and written terms before paying.",
        },
        {
          question: "Who is eligible according to the current invitation?",
          answer:
            "The notice says graduates from 2021 to 2026, including eligible BE/B.Tech branches, B.Sc/M.Sc in computer science and IT, and BCA/MCA, with at least 50% marks and no active backlogs. Confirm eligibility with Anudip; notices can change.",
        },
        {
          question:
            "Does “shortlisted based on your academic profile” mean a real selection process?",
          answer:
            "Not necessarily. This desk verified broad student outreach and earlier Chennai recruitment, but not a documented screening process for this batch. Ask how many people received the same message and how many seats exist.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-anudip-chromepet] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-anudip-chromepet] Inserted article:", SLUG);
  }

  console.log(
    "[seed-anudip-chromepet] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-anudip-chromepet",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/*
X / Twitter draft (after live URL is confirmed):

Anudip’s Chromepet centre is real. “100% placement support” is not a job guarantee.

We checked the GST Road listing, NSDC-linked partner status, and Anudip’s own 2023–24 placement numbers before the ₹1,000 AI/analytics invite.

https://mychennaicity.in/chennai-local-news/anudip-chromepet-ai-data-analytics-training-chennai-graduates-2026

#Chennai #Jobs #SkillDevelopment #Anudip #Chromepet
*/
