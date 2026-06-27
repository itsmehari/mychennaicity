/**
 * Namma Arasu — Tamil Nadu Government WhatsApp chatbot (awareness intro).
 *
 * Dev:  `npm run db:seed:namma-arasu-whatsapp-chatbot-2026`
 * Live: `npm run db:seed:namma-arasu-whatsapp-chatbot-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

export const NAMMA_ARASU_SLUG = "namma-arasu-whatsapp-chatbot-tamil-nadu-2026";

export const NAMMA_ARASU_HERO_IMAGE =
  "/images/articles/namma-arasu-whatsapp-chatbot-tn-2026.png";

export const NAMMA_ARASU_SEO_TITLE =
  "Namma Arasu WhatsApp Number 7845252525: Tamil Nadu Govt Services Guide for Chennai";

export const NAMMA_ARASU_META_DESCRIPTION =
  "Save +91 78452 52525 for Namma Arasu — Tamil Nadu's official WhatsApp chatbot for GCC tax, TNEB bills, certificates and 51 govt services in Tamil or English.";

const OFFICIAL_WHATSAPP = "+91 78452 52525";
const OFFICIAL_WHATSAPP_DIGITS = "7845252525";
const HELPLINE = "1800 425 6000";

const NIE_SOURCE_URL =
  "https://www.newindianexpress.com/states/tamil-nadu/2026/Jan/10/namma-arasu-whatsapp-bot-to-deliver-51-citizen-services";

const TNEGA_URL = "https://www.tnesevai.tn.gov.in/";

const ARTICLE_URL = `https://mychennaicity.in/chennai-local-news/${NAMMA_ARASU_SLUG}`;

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

const faqItems = [
  {
    question: "What is Namma Arasu WhatsApp chatbot?",
    answer:
      "Namma Arasu is the official Tamil Nadu Government WhatsApp chatbot launched by TNeGA in partnership with Meta at UmagineTN 2026. It lets residents access selected public services — bill payments, certificate downloads, welfare checks, and application tracking — through a single WhatsApp conversation in Tamil or English.",
  },
  {
    question: "What is the official Namma Arasu WhatsApp number?",
    answer: `The verified Government of Tamil Nadu WhatsApp number is ${OFFICIAL_WHATSAPP} (${OFFICIAL_WHATSAPP_DIGITS}). Save this contact only — not numbers shared in unofficial WhatsApp forwards. The chat should show the blue verified Government of Tamil Nadu badge.`,
  },
  {
    question: "How do I start Namma Arasu on WhatsApp?",
    answer: `Save ${OFFICIAL_WHATSAPP}, open WhatsApp, send Hi or வணக்கம், choose Tamil or English, tap Select Department, and follow the prompts for your service.`,
  },
  {
    question: "Is Namma Arasu real or a fake forwarded message?",
    answer: `It is genuine. TNeGA launched Namma Arasu on 8 January 2026. The official number ${OFFICIAL_WHATSAPP} is confirmed in the Tamil Nadu government press release reported by The New Indian Express. Use only that number and the helpline ${HELPLINE} if you need help.`,
  },
  {
    question: "How many government services does Namma Arasu offer?",
    answer:
      "The official Phase 1 launch release confirms 51 essential citizen services across 16 government departments. Some later news reports cite 66 services across 20 departments — check the live department menu inside the chatbot for the current count before quoting a number.",
  },
  {
    question: "Can Chennai residents pay GCC property tax through Namma Arasu?",
    answer:
      "Yes. The chatbot menu includes Greater Chennai Corporation (GCC) services such as property tax payment and birth/death certificate downloads. Open the GCC option after sending Hi to the official WhatsApp number.",
  },
  {
    question: "Can I pay TNEB electricity bills through Namma Arasu?",
    answer:
      "Tamil Nadu electricity (TNEB/TANGEDCO) bill payment is among the utility services listed in the official launch coverage. Select the relevant department in the chatbot menu after starting a chat on the official number.",
  },
  {
    question: "What is the Namma Arasu helpline number?",
    answer: `Call the TNeGA / e-Sevai toll-free helpdesk at ${HELPLINE}, or email tnesevaihelpdesk@tn.gov.in. These are published on the official TNeGA e-Sevai portal.`,
  },
  {
    question: "Does Namma Arasu replace e-Sevai centres in Chennai?",
    answer:
      "Not entirely. Many common applications, payments, downloads, and status checks can now be done on WhatsApp, reducing trips to e-Sevai centres for basic tasks. Complex cases, original document verification, and some certificates may still need a counter visit or department portal.",
  },
];

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

  const publishedAt = new Date("2026-06-27T06:00:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- **Namma Arasu** is Tamil Nadu’s **official WhatsApp chatbot** for selected government services — launched by **TNeGA** with **Meta** at **UmagineTN 2026** on **8 January 2026**.
- **Official WhatsApp number:** **${OFFICIAL_WHATSAPP}** (${OFFICIAL_WHATSAPP_DIGITS}) — look for the verified **Government of Tamil Nadu** badge.
- **Start with:** send **Hi** or **வணக்கம்**, choose **Tamil** or **English**, tap **Select Department**.
- **Phase 1 (official release):** **51 services** across **16 departments** — certificate downloads, tax and utility payments, welfare schemes, grievance tracking, and more.
- **Chennai-relevant services** include **GCC property tax**, **CMWSSB water tax**, **TNEB bill payment**, **CMRL parking**, and **birth/death certificates**.
- **Helpdesk:** **${HELPLINE}** · tnesevaihelpdesk@tn.gov.in · [TNeGA e-Sevai](${TNEGA_URL})
- **Safety:** never share OTPs; ignore unofficial “agent” numbers asking extra fees.

## What is Namma Arasu?

**Namma Arasu** (Tamil: *our government*) is an official **Tamil Nadu Government WhatsApp chatbot** — a single conversational window for selected public services, without opening multiple portals or visiting an **e-Sevai centre** in Chennai or elsewhere for every basic task.

The **Tamil Nadu e-Governance Agency (TNeGA)**, in partnership with **Meta**, launched the service at **UmagineTN 2026** on **8 January 2026**. IT and Digital Services Minister **Dr. Palanivel Thiaga Rajan** inaugurated it.

According to the **government press release** reported by [*The New Indian Express*](${NIE_SOURCE_URL}), Phase 1 brought **51 essential citizen services** across **16 government departments** onto one platform.

## Official Namma Arasu WhatsApp number

| Detail | Information |
| --- | --- |
| **WhatsApp number** | **${OFFICIAL_WHATSAPP}** |
| **Digits only** | **${OFFICIAL_WHATSAPP_DIGITS}** |
| **Verified account** | Government of Tamil Nadu (blue tick) |
| **Languages** | Tamil and English |
| **How to start** | Send **Hi** or **வணக்கம்** |

**Note on service counts:** Some later news reports cite **66 services across 20 departments**. That may reflect expansion after launch. Before you quote a number, check the live menu inside the chatbot — the official Phase 1 figure from the government release is **51 / 16**.

## How to use Namma Arasu on WhatsApp (step by step)

1. **Save** **${OFFICIAL_WHATSAPP}** in your phone contacts.
2. Open **WhatsApp** and send **Hi** or **வணக்கம்**.
3. Choose **Tamil** or **English** when prompted.
4. Tap **Select Department** and pick the service you need.
5. Follow the on-screen prompts to apply, pay, download, or track status.

If the verified **Government of Tamil Nadu** badge does not appear, double-check the number before sharing personal details.

## Chennai and Tamil Nadu services in the chatbot

The menu groups services by department. Examples relevant to **Chennai residents** and **Tamil Nadu** citizens:

| Department | Example services |
| --- | --- |
| **Greater Chennai Corporation (GCC)** | Pay GCC property tax; download birth/death certificates |
| **Chennai Metro Water (CMWSSB)** | Water tax payment and tax calculator |
| **TNEB / TANGEDCO** | Electricity bill payment |
| **Chennai Metro Rail (CMRL)** | Parking availability |
| **Directorate of Public Health** | Birth and death certificate downloads |
| **Inspector General of Registration** | Guideline values; Encumbrance Certificate (EC) |
| **Municipal / town panchayat / rural bodies** | Local tax payments and licence renewal |
| **Social Welfare** | TPS/PPS scholarship eligibility checks |
| **HR&CE** | Temple e-services for devotees |
| **Agriculture** | Seed and fertilizer availability checks |

Exact options can change as TNeGA adds services. Treat the **in-chat menu** as the current authority.

## What this does — and does not — replace

Many common **Tamil Nadu government services** can now be accessed directly through WhatsApp, **reducing the need to visit e-Sevai centres** in Chennai, Tambaram, Tiruvallur, or other districts for basic applications, payments, downloads, and status checks.

It does **not** mean every certificate, grievance, or complex case is fully online. Some workflows still need physical verification, original documents, or a counter visit.

## Safety checklist for Chennai users

- Use **only** **${OFFICIAL_WHATSAPP}** — not numbers forwarded in unofficial groups.
- **Never share OTPs**, Aadhaar copies, or bank passwords with unknown contacts.
- Official services should not ask for **extra facilitation fees** on WhatsApp.
- For help, call **${HELPLINE}** (TNeGA / e-Sevai helpdesk).

## Fact box

| Item | Detail |
| --- | --- |
| Service name | **Namma Arasu** — Tamil Nadu Government WhatsApp services |
| Launched | **8 January 2026** at UmagineTN 2026, Chennai |
| Developer | **TNeGA** (Tamil Nadu e-Governance Agency) |
| Partner | **Meta** (WhatsApp platform) |
| Official WhatsApp | **${OFFICIAL_WHATSAPP}** |
| Languages | **Tamil** and **English** |
| Phase 1 (official release) | **51 services**, **16 departments** |
| Helpdesk | **${HELPLINE}** · tnesevaihelpdesk@tn.gov.in |
| Coverage | **Tamil Nadu** (including **Chennai**, **GCC**, and district services) |

## Sources

- [*The New Indian Express* — Namma Arasu WhatsApp bot to deliver 51 citizen services](${NIE_SOURCE_URL}) (reports Tamil Nadu government / DIPR release)
- [TNeGA — Tamil Nadu e-Sevai portal](${TNEGA_URL}) (agency helpdesk and e-governance home)

## Related reading

- **[Consumer topic](/chennai-local-news/topic/consumer)** — bills, apps, and household services in Chennai
- **[Tamil Nadu electricity bill guide](/chennai-local-news/tamil-nadu-electricity-bill-calculation-2026-june-tnpdcl)** — TNEB slab math and TNPDCL calculator
- **[Chennai local news](/chennai-local-news)** — latest city desk stories`.trim();

  const analysisBody = `## Why Chennai residents should know about Namma Arasu

WhatsApp is already how many **Chennai households** coordinate school fees, apartment maintenance, and family updates. Putting **Tamil Nadu government services on the same app** lowers friction for people who find department websites slow on mobile data or confusing in English-only menus.

For **GCC property tax**, **CMWSSB water charges**, **TNEB bill payments**, and **certificate downloads**, the practical win is **fewer tabs and fewer trips** — especially for working residents on **OMR**, in **T. Nagar**, or **Anna Nagar** who cannot easily reach an e-Sevai centre during office hours.

## Forward-message caution

Social posts sometimes claim **“no more e-Sevai centres needed”** or cite **66 services from 20 departments** without context. The **official launch release** confirms **51 services / 16 departments** in Phase 1. Expanded counts may be accurate later — verify inside the bot before repeating them.

When in doubt, save **${OFFICIAL_WHATSAPP}**, send **Hi**, and use **${HELPLINE}** if the chat flow fails.

**This article is public-service awareness for Chennai and Tamil Nadu readers, not legal advice.** For disputes on tax, registration, or welfare eligibility, use the department’s official grievance channel named on your receipt or certificate.`.trim();

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, NAMMA_ARASU_SLUG)))
    .limit(1);

  const values = {
    cityId: city.id,
    slug: NAMMA_ARASU_SLUG,
    title: NAMMA_ARASU_SEO_TITLE,
    summary: NAMMA_ARASU_META_DESCRIPTION,
    dek: "Chennai consumer desk — verified Government of Tamil Nadu WhatsApp number 7845252525, GCC and TNEB services, step-by-step start, and safety tips for Tamil Nadu residents.",
    body,
    reportBody,
    analysisBody,
    category: "Consumer",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: NAMMA_ARASU_HERO_IMAGE,
    sourceUrl: NIE_SOURCE_URL,
    sourceName:
      "Tamil Nadu Government press release (via The New Indian Express, 10 Jan 2026)",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: faqItems,
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-namma-arasu] Refreshed article:", NAMMA_ARASU_SLUG);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-namma-arasu] Inserted article:", NAMMA_ARASU_SLUG);
  }

  console.log("[seed-namma-arasu] Public URL:", ARTICLE_URL);
  console.log("[seed-namma-arasu] Hero image:", NAMMA_ARASU_HERO_IMAGE);
  console.log("[seed-namma-arasu] Meta description length:", NAMMA_ARASU_META_DESCRIPTION.length);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: NAMMA_ARASU_SLUG,
      label: "seed-namma-arasu",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
