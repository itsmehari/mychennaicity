/**
 * Evergreen guide — Chennai local job ads for business owners and HR.
 *
 * Dev:  `npm run db:seed:chennai-local-job-ads-guide-business-owners-hr`
 * Live: `npm run db:seed:chennai-local-job-ads-guide-business-owners-hr:live`
 *
 * Social (X): see comment block at end of file / AGENT_LEARNINGS after live seed.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

export const SLUG = "chennai-local-job-ads-guide-business-owners-hr";

const HERO =
  "/images/articles/chennai-local-job-ads-guide-business-owners-hr-hero.png";

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

  /** 16 Aug 2026 morning IST */
  const publishedAt = new Date("2026-08-16T05:00:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- For neighbourhood roles — retail floors, clinics, site staff, delivery, front office — **local job ads** usually beat pan-India boards on fit: candidates already live near the workplace.
- A clear ad names the **area**, **shift**, **walk-in vs apply**, and what “good” looks like in two lines. Vague titles create noise, not shortlists.
- Bookmark **city and neighbourhood blogs** that regularly carry Chennai / Tamil Nadu hiring tips and vacancies — then use large national apps when you still need volume.
- National platforms such as **Apna** and **Freshersworld** remain useful for scale; treat them as a **later** layer, not the only channel for hyperlocal hires.

## Disclaimer

This article is **civic journalism** for Chennai business owners and HR professionals. It explains how local job ads and neighbourhood-focused blogs can help you reach candidates who live near the workplace. It is **not** an official notice from any job platform, recruiter, or government agency.

Links to third-party sites are for reader convenience. Features, fees, and listing rules change — verify on each site before you post or pay. This desk does not guarantee candidate quality or hire outcomes.

## Summary

**Chennai** — If you run a store in Koyambedu, a clinic in Velachery, a site office in Pallavaram, or a support team on OMR, you already know the problem: national job boards bring **volume**, but not always people who can reach the shift on time.

This practical guide is for **business owners and HR professionals** who need the **right candidates** — not just more CVs. It covers how to write a local job ad, which kinds of Chennai- and Tamil Nadu–focused blogs are worth checking, and when to add large platforms like Apna or Freshersworld at the end of your mix.

![Neighbourhood shopfront with job vacancy notices in Chennai](${HERO})

*Local hiring still starts on the street and in the neighbourhood — then moves online. Photo: editorial illustration.*

## What “hyperlocal hiring” means in Chennai

Hyperlocal hiring means you design the vacancy for people who already live in (or commute comfortably to) a **named belt** — Nanganallur, Guindy, OMR, Ambattur, Chromepet — not “Chennai / anywhere.”

It works best for:

- Retail and F&B floor roles
- Clinic, salon, and front-desk staff
- Site, warehouse, and logistics helpers
- Walk-in drives with a fixed date and venue
- Roles where travel time is a silent dropout reason

It works less well alone for rare specialist IT roles, where national reach still matters. Many HR teams use **both**: local desks for neighbourhood fit, national apps for scarce skills.

## Why pan-India boards struggle with neighbourhood roles

Large boards optimise for searchable titles and city-wide filters. That helps graduates and mid-career movers. It is weaker when you need:

- Someone who can open the shop at 7 AM without a two-hour commute
- A Tamil-speaking front desk for walk-ins
- A walk-in tomorrow at a specific hotel or site office

Those candidates often find roles through **area WhatsApp groups**, neighbourhood notice culture, and **local blogs** that list vacancies and hiring tips with Chennai place names in the copy — not only “India – Remote.”

## How to write a job ad that attracts the right candidates

Before you pick a platform, write the ad once. Reuse it everywhere.

| Element | What to include |
| --- | --- |
| Role title | Exact title candidates search (e.g. Store Manager, Duty Manager) |
| Locality | Neighbourhood + landmark belt (not only “Chennai”) |
| Work vs interview venue | If different, say both |
| Shift / days | Timings, weekly offs, night duty if any |
| Apply path | Walk-in date + time **or** email / form / phone |
| Documents | Only what you will actually check |
| Salary | Range if you can; if silent, say so honestly |

**Walk-in tip:** Put the **venue and date in the title** when you publish on city job hubs so filters and readers can spot it quickly. See live examples on the [Chennai jobs hub](https://mychennaicity.in/chennai-jobs).

## Local blogs and city desks worth bookmarking

These are independent **local blogs and city desks** many Chennai / Tamil Nadu readers already use for neighbourhood news, corridor tips, and hiring-related posts. Scan them the way you would any useful blog — for place-specific language and recent vacancies — then decide what to post or share.

### Vacancy Chennai

[Vacancy Chennai](https://vacancychennai.in/) focuses on **hyperlocal vacancies** and is a practical place for owners and HR to browse or list roles aimed at candidates who live in the city. Use it when the job is neighbourhood-shaped and you want ads that read like local notices, not national firehose listings.

### MyChennaiCity — Chennai jobs desk

[MyChennaiCity Jobs](https://mychennaicity.in/chennai-jobs) is the Chennai-focused jobs hub on this city site: open listings, walk-ins, and hiring context next to local news. Useful when you want candidates who already follow Chennai civic and neighbourhood coverage. Job seekers can also start at [Looking for work](https://mychennaicity.in/chennai-jobs/looking-for-work).

### MyNangnallur

[MyNangnallur](https://mynangnallur.in/) is a **South Chennai neighbourhood blog** covering Nanganallur and nearby belts. Worth following when your hire is south-Chennai based — local readers often trust neighbourhood desks for “near home” roles.

### MyOMR

[MyOMR](https://myomr.in/) covers the **OMR / IT-corridor** locality — useful context when the workplace is along the Old Mahabalipuram Road belt and candidates care about commute and corridor life, not only a city-wide label.

### MyCovai

[MyCovai](https://mycovai.in/) is a **Coimbatore city blog**. Include it when your Tamil Nadu hiring footprint spans beyond Chennai — multi-city owners and HR often need one bookmark per city desk rather than a single national feed.

## National job apps (use last in the mix)

After you have a clear local ad and have tried neighbourhood-aware channels, add large platforms if you still need volume or fresher pipelines:

1. **[Apna](https://apna.co/)** — widely used for blue-collar and early-career hiring across Indian cities; strong when you need scale after the local pass.
2. **[Freshersworld](https://www.freshersworld.com/)** — useful for entry-level and campus-adjacent roles when you are hiring freshers at volume.

Treat them as **layer two**: keep the same clear locality and shift language in the ad so you do not invite applications from people who cannot realistically reach the workplace.

Other national boards (Naukri, Indeed, LinkedIn, and similar) follow the same rule — use them when the role needs wider reach; do not let them replace a Chennai-specific notice for a neighbourhood store or site role.

## For job seekers (short note)

If you are looking for work in Chennai, prefer listings that name a **real area and shift**. Start with the [Chennai jobs hub](https://mychennaicity.in/chennai-jobs), check Vacancy Chennai and neighbourhood blogs for walk-ins near you, then use Apna or Freshersworld for broader fresher pipelines. Always verify walk-in venues and contacts before you travel.

## Checklist before you publish a vacancy

- [ ] Role title matches what candidates search
- [ ] Neighbourhood / landmark named
- [ ] Walk-in date + venue **or** clear apply URL / phone
- [ ] Shift and weekly offs stated
- [ ] Posted first on at least one **local** desk or blog
- [ ] Same ad copied to Apna / Freshersworld only if you still need more applicants
- [ ] Someone on your team ready to answer calls the same day

## Related reading on MyChennaiCity

- [Chennai jobs](https://mychennaicity.in/chennai-jobs) — browse open roles and walk-ins
- [Looking for work](https://mychennaicity.in/chennai-jobs/looking-for-work) — seeker-facing desk
- Economy and consumer news on [Chennai local news](https://mychennaicity.in/chennai-local-news) — hiring context next to city reporting

## Sources

Public product sites linked above (Vacancy Chennai, MyChennaiCity Jobs, MyNangnallur, MyOMR, MyCovai, Apna, Freshersworld). Platform features change; confirm current posting rules on each site.`.trim();

  const analysisBody = `## Analysis — why locality still wins for TN hiring

Chennai’s labour market is not one market. A Duty Manager who can reach Koyambedu by 9 AM is not interchangeable with a CV sitting in another metro. Local blogs and city job desks win when they speak in **place names** and **shift realities**. National apps win when you need **throughput**.

Owners and HR who reverse that order — blasting Apna or Freshersworld first with a vague “Chennai” title — often spend the week filtering impossible commutes. Write the local ad once, publish it where neighbourhood readers already are, then scale out.

## Fine print — AI-assisted authoring

This guide was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can sometimes make mistakes — misstate product features, miss nuance, or invent detail.
Please cross-check posting rules, fees, and contacts on each linked site before you act on this article.`.trim();

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
      "Chennai local job ads: a practical guide for business owners and HR professionals who need the right candidates",
    summary:
      "A practical guide for Chennai business owners and HR: write clearer local job ads, use neighbourhood blogs and city job desks for fit, then add Apna or Freshersworld when you still need volume.",
    dek: "Hyperlocal hiring playbook — locality first, national apps last.",
    body,
    reportBody,
    analysisBody,
    category: "Economy",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO,
    sourceUrl: ARTICLE_URL,
    sourceName: "mychennaicity.in editorial — local hiring guide (Aug 2026)",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "What is a hyperlocal job ad in Chennai?",
          answer:
            "A vacancy written for candidates who already live near a named neighbourhood or corridor — with area, shift, and walk-in or apply path stated clearly — instead of a vague city-wide title.",
        },
        {
          question:
            "Where should business owners and HR post Chennai neighbourhood jobs first?",
          answer:
            "Start with local blogs and city job desks that use place-specific language — for example Vacancy Chennai and the MyChennaiCity jobs hub — then add neighbourhood blogs such as MyNangnallur or MyOMR when the workplace sits in those belts.",
        },
        {
          question: "When should I use Apna or Freshersworld?",
          answer:
            "After you have a clear local ad and have tried neighbourhood-aware channels. Use Apna and Freshersworld last in the mix when you still need more applicants or a fresher pipeline.",
        },
        {
          question: "What details should every Chennai job ad include?",
          answer:
            "Exact role title, neighbourhood or landmark, work vs interview venue if different, shift and weekly offs, walk-in date or apply path, and only the documents you will actually check.",
        },
        {
          question: "Walk-in vs online apply — which works better?",
          answer:
            "Walk-ins work well for retail, site, and floor roles when the venue and date are in the title. Online apply suits roles that need screening documents first. Many Chennai hires use both: a local notice plus a national app listing.",
        },
        {
          question: "Is MyCovai useful if I hire only in Chennai?",
          answer:
            "MyCovai is a Coimbatore city blog. Bookmark it when your Tamil Nadu footprint includes Coimbatore; for Chennai-only hires, prioritise Chennai and neighbourhood desks first.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-chennai-local-job-ads-guide] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-chennai-local-job-ads-guide] Inserted article:", SLUG);
  }

  console.log(
    "[seed-chennai-local-job-ads-guide] Public URL:",
    `/chennai-local-news/${SLUG}`,
  );
  console.log("[seed-chennai-local-job-ads-guide] Live URL:", ARTICLE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-chennai-local-job-ads-guide-business-owners-hr",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/*
 * X / social draft (paste after live):
 *
 * Chennai owners & HR: neighbourhood roles need local job ads — not only pan-India boards.
 * Write the ad once (area + shift + walk-in/apply), post on local blogs & city desks first,
 * then Apna / Freshersworld if you still need volume.
 * Guide: https://mychennaicity.in/chennai-local-news/chennai-local-job-ads-guide-business-owners-hr
 * #ChennaiJobs #HireInChennai #ChennaiHR
 */
