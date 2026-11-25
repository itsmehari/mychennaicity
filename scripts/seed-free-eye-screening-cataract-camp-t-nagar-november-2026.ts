/**
 * Free eye screening and cataract surgery camp, T. Nagar, 29 Nov 2026.
 * Lions Clubs International, District 324 1C, with Aravind Eye Hospital, Chennai.
 * In memory of Baby Charumathi.
 *
 * Source: English translation of a Tamil invitation. Name spellings are
 * transliterations from Tamil.
 *
 * Dev:  `npm run db:seed:eye-screening-cataract-camp-t-nagar-november-2026`
 * Live: `npm run db:seed:eye-screening-cataract-camp-t-nagar-november-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

export const SLUG =
  "free-eye-screening-cataract-camp-t-nagar-november-29-2026";

const EVENT =
  "/chennai-local-events/free-eye-screening-cataract-surgery-camp-t-nagar-november-2026";
const AREA = "/areas/kodambakkam-t-nagar";
const PHONE_1 = "98217 33100";
const PHONE_2 = "86089 65647";
const TEL_1 = "tel:+919821733100";
const TEL_2 = "tel:+918608965647";

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

function buildEnglish() {
  const reportBody = `## Key takeaways

- **Sunday, 29 November 2026**, **9:00 AM to 1:30 PM**, at **Sringeri Bharathi Vidyashram**, **11, Venkat Narayana Road, T. Nagar, Chennai 600017**.
- **Lions Clubs International, District 324 1C**, with **Aravind Eye Hospital, Chennai**, is holding a free eye screening and cataract surgery camp in memory of **Baby Charumathi**.
- The invitation says cataract surgery, the intraocular lens, related medicines, stay, food, transport, and a one-month follow-up are **free** for patients taken to Aravind the same day.
- Diabetic retinal screening, glaucoma and eye-pressure checks, and children's eye examination are listed as **available**. Spectacles are **at reduced prices**; no rate is printed.
- Bring an **Aadhaar photocopy** and your **mobile number**. Cataract patients with other illnesses need a **fitness certificate** and their regular medicines, plus a spare saree or veshti.
- Enquiries: **[${PHONE_1}](${TEL_1})** and **[${PHONE_2}](${TEL_2})**.

Listing: [Free eye screening and cataract surgery camp — T. Nagar](${EVENT})

## Disclaimer

This article is **civic journalism**. It reports an English translation of a Tamil invitation supplied to this desk. It is **not** an official notice from Lions Clubs International, District 324 1C, Aravind Eye Hospital, or the school venue.

English spellings of names are **transliterated from Tamil** and should be confirmed with the organisers. Timing, eligibility, and what is free can change. Call the numbers above before you travel or prepare for surgery.

## Summary

**Chennai, 22 November 2026** — A free eye screening and cataract surgery camp will run in **T. Nagar** on **Sunday, 29 November 2026**, from **9:00 AM to 1:30 PM**.

Lions Clubs International, **District 324 1C**, is organising it with **Aravind Eye Hospital, Chennai**. The camp is dedicated to the memory of **Baby Charumathi**, born **4 June 1994** and died **30 September 1994**. The invitation says her eyes were donated.

The public is invited. The Tamil lines on the invitation ask people to donate blood today and eyes tomorrow, and they welcome everyone to receive treatment.

## When and where

| | |
| --- | --- |
| Date | Sunday, **29 November 2026** |
| Time | **9:00 AM – 1:30 PM** |
| Venue | **Sringeri Bharathi Vidyashram** |
| Address | **11, Venkat Narayana Road, T. Nagar, Chennai 600017** |
| Medical partner | Aravind Eye Hospital, Chennai |
| Enquiries | [${PHONE_1}](${TEL_1}) · [${PHONE_2}](${TEL_2}) |

The invitation does not print a map pin, a gate, or a separate address for the hospital. Ask the coordinators which entrance to use.

## What is free, and what is only “available”

| Service | As printed |
| --- | --- |
| General eye examination | Free |
| Cataract screening | Free |
| Cataract surgery | Free |
| Intraocular lens implantation (IOL) | Free |
| Medicines associated with cataract surgery | Free |
| Accommodation, food, and transport for cataract surgery patients | Free |
| Follow-up examination one month after surgery | Free |
| Diabetic retinal screening | Available |
| Glaucoma screening and eye-pressure testing | Available |
| Children's eye examination | Available |
| Spectacles | Available at reduced prices (rate not printed) |

Patients identified with cataract are to be taken to **Aravind Eye Hospital, Chennai**, on the camp day itself. The invitation does not state how many people can be operated on that day, or an age cut-off.

## If surgery is likely

People with **high blood pressure, asthma, diabetes, heart disease, or any other health complication** should consult a general physician near home. They should bring a **medical fitness certificate** saying they are suitable for cataract surgery, and their **regular medicines**.

Patients preparing for cataract surgery are also asked to bring a **spare saree or veshti (dhoti)**.

Every participant is asked to bring an **Aadhaar card photocopy** and a **contact number**.

## Diabetes, glaucoma, and children

The invitation says people with diabetes can lose vision from retinal complications **without noticeable symptoms**, and it asks them to attend for a retinal examination.

It also says glaucoma can affect eyesight without symptoms, particularly among people **above 40**, and that intraocular pressure can be checked at the camp.

Parents are encouraged to bring children who have:

- Congenital cataract
- Squint (strabismus)
- Congenital glaucoma
- Night blindness

## Who is named on the invitation

| Role | Name and designation (transliterated) |
| --- | --- |
| Event coordinator | PMJF Lion V. Ravichandran — District Chairperson, Global Vision Service Projects |
| Chief guest | PMJF Lion Rajesh M. Joshi — District Governor, District 324 1C, Chennai |
| Special guest | Mr. S. Machendranathan, IAS (Retd.) — Former Secretary (Coordination), Cabinet Secretariat, Government of India |
| Special invitee | PMJF Lion PNS Udhayasuriyan — Vice District Governor |
| Special invitee | MJF Lion Ramesh Raghavan — Vice District Governor |
| Special invitee | MJF Lion A.S. Muthu — District Secretary |
| Special invitee | PMJF Lion K.R. Balamurali — District Treasurer |

Treat these spellings as a working transliteration until the organisers confirm them.

## Fact box

| Item | Detail |
| --- | --- |
| Story type | Community health camp (organiser invitation) |
| Memorial | Baby Charumathi · 4 June 1994 – 30 September 1994 · eyes donated |
| District | Lions Clubs International, District 324 1C (as written on the translation) |
| Area | T. Nagar |
| Category | Chennai |
| Primary source | Tamil invitation, translated for this desk. No public URL was supplied with the note. |

## Sources

- Tamil invitation for the 29 November 2026 camp at Sringeri Bharathi Vidyashram, T. Nagar, translated into English for MyChennaiCity
- Event listing: [Free eye screening and cataract surgery camp — T. Nagar](${EVENT})`;

  const analysisBody = `## Why T. Nagar readers should care

A same-day path from a school hall in **T. Nagar** to **cataract surgery at Aravind**, with the lens, medicines, stay, food, and transport marked free, is a practical offer for families who have been postponing an eye check because of cost. The camp is one morning only: **29 November, until 1:30 PM**.

The invitation is careful about people who already have other illnesses. A fitness certificate from a local physician is part of the plan, not an extra hurdle invented by this desk. Spectacles are cheaper, not described as free. Diabetic and glaucoma checks are “available”, which is not the same sentence as the free cataract list.

## What to do next

1. If you have blood pressure, asthma, diabetes, heart disease, or another condition and you may need cataract surgery, see a physician near home and carry the fitness note plus your usual medicines.
2. Pack an Aadhaar photocopy, your mobile number, and a spare saree or veshti if surgery is possible that day.
3. Call **[${PHONE_1}](${TEL_1})** or **[${PHONE_2}](${TEL_2})** if you need the gate, a Tamil explanation, or to confirm a name spelling.
4. Reach **Sringeri Bharathi Vidyashram** before **1:30 PM**. The invitation does not say screening continues after that.
5. Do not pay a third party who claims to “book” this camp. The invitation does not print a registration fee or an online form.

## Related reading on mychennaicity.in

- [Event listing — time, address, and what to carry](${EVENT})
- [Kodambakkam and T. Nagar area hub](${AREA})
- [Chennai topic hub](/chennai-local-news/topic/chennai)
- [How to use mychennaicity.in](/guides/how-to-use-mychennaicity)

## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can misread a transliterated name, drop a condition, or smooth a Tamil line into the wrong English.
Cross-check the date, the free list, and the phone numbers with the organisers on ${PHONE_1} or ${PHONE_2} before you act on them.`;

  return {
    slug: SLUG,
    title:
      "Free eye screening and cataract surgery camp in T. Nagar on 29 November 2026",
    summary:
      "Lions Clubs International, District 324 1C, and Aravind Eye Hospital, Chennai, will hold a free eye screening and cataract surgery camp at Sringeri Bharathi Vidyashram, T. Nagar, on Sunday 29 November 2026, 9:00 AM to 1:30 PM, in memory of Baby Charumathi.",
    dek: "Cataract surgery, lens, medicines, stay, food, and transport are marked free. Bring an Aadhaar copy. Call 98217 33100 or 86089 65647.",
    reportBody,
    analysisBody,
    category: "Chennai",
  };
}

async function upsertArticle(
  cityId: string,
  article: ReturnType<typeof buildEnglish>,
  publishedAt: Date,
) {
  const now = new Date();
  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, cityId), eq(articles.slug, article.slug)))
    .limit(1);

  const body = `${article.reportBody}\n\n---\n\n${article.analysisBody}`;

  const values = {
    cityId,
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    dek: article.dek,
    body,
    reportBody: article.reportBody,
    analysisBody: article.analysisBody,
    category: article.category,
    areaHubSlug: "kodambakkam-t-nagar",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: null,
    sourceUrl: null,
    sourceName:
      "Tamil invitation for the Lions District 324 1C eye camp at Sringeri Bharathi Vidyashram, T. Nagar, 29 November 2026 (English translation supplied to this desk)",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "When and where is the free eye camp?",
          answer:
            "Sunday, 29 November 2026, 9:00 AM to 1:30 PM, at Sringeri Bharathi Vidyashram, 11, Venkat Narayana Road, T. Nagar, Chennai 600017.",
        },
        {
          question: "Is cataract surgery free?",
          answer:
            "The invitation says cataract screening, surgery, the intraocular lens, related medicines, accommodation, food, transport, and a one-month follow-up are free. Patients identified with cataract are taken to Aravind Eye Hospital, Chennai, the same day. It does not print a seat limit.",
        },
        {
          question: "What should I bring?",
          answer:
            "An Aadhaar photocopy and your mobile number. If you have high blood pressure, asthma, diabetes, heart disease, or another complication and may need surgery, also bring a medical fitness certificate and your regular medicines, plus a spare saree or veshti.",
        },
        {
          question: "Are spectacles free?",
          answer:
            "No figure is printed. The invitation says spectacles will be available at reduced prices at the venue. Diabetic retinal screening, glaucoma testing, and children's eye examination are listed as available, not in the free cataract list.",
        },
        {
          question: "Whom do I call?",
          answer:
            "98217 33100 or 86089 65647. These are the numbers on the invitation, not mychennaicity.in.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-eye-camp-t-nagar] Refreshed:", article.slug);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-eye-camp-t-nagar] Inserted:", article.slug);
  }

  console.log(
    "[seed-eye-camp-t-nagar] URL:",
    `https://mychennaicity.in/chennai-local-news/${article.slug}`,
  );
}

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found. Seed cities first.");
    process.exit(1);
  }

  /** 22 Nov 2026, 10:30 AM IST */
  const publishedAt = new Date("2026-11-22T05:00:00.000Z");
  await upsertArticle(city.id, buildEnglish(), publishedAt);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-eye-camp-t-nagar",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
