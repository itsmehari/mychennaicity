/**
 * Tamil Nadu Fiscal White Paper 2026 — long-form political economy analysis.
 *
 * Dev:  `npm run db:seed:tn-fiscal-white-paper-2026`
 * Live: `npm run db:seed:tn-fiscal-white-paper-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import {
  TN_FISCAL_HERO_IMAGE,
  TN_FISCAL_WHITE_PAPER_PDF,
  TN_FISCAL_WHITE_PAPER_SLUG,
} from "../src/content/special-articles/tn-fiscal-white-paper-2026";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

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

const SOURCE_URL = `https://mychennaicity.in${TN_FISCAL_WHITE_PAPER_PDF}`;

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

  const publishedAt = new Date("2026-06-17T06:30:00.000Z");
  const now = new Date();

  const reportBody = `## Summary

Tamil Nadu's **Fiscal White Paper 2026** frames a widening gap between political rhetoric and fiscal reality: **₹10 lakh crore** in direct outstanding liabilities, **₹13.18 lakh crore** in aggregate fiscal exposure, a **₹78,324 crore** revenue deficit, and **₹67,050 crore** in annual interest payments.

**Official source:** [Download the White Paper (English PDF)](${SOURCE_URL}).

## Key numbers

| Indicator | Figure |
| --- | --- |
| Direct outstanding liabilities | ~₹9,99,832 crore (2025-26 Pre-AC) |
| Aggregate fiscal exposure | ₹13.18 lakh crore |
| Revenue deficit | ₹78,324 crore |
| Interest payments | ₹67,050 crore |
| SoTR / GSDP | 5.45% |
| Revenue pre-committed | 87% after inflexible obligations |

## Editorial read

The White Paper is political — but the numbers are serious. Tamil Nadu is not bankrupt; it is a strong State tolerating weak fiscal management. The test ahead is **disciplined welfare**: social justice funded by clean revenue, efficient spending, and honest balance sheets.

Read the full analysis on this page for debt vs exposure, tax effort, power-sector shadow liabilities, opposition counterarguments, and a five-point reform path.`.trim();

  const analysisBody = `## Source note

Figures cited follow the Tamil Nadu government **Fiscal White Paper 2026** (English) unless otherwise noted. This article is **political economy analysis** — not an official government publication. Verify numbers against the [official PDF](${SOURCE_URL}) before citing in academic or legal contexts.`.trim();

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, TN_FISCAL_WHITE_PAPER_SLUG)))
    .limit(1);

  const values = {
    cityId: city.id,
    slug: TN_FISCAL_WHITE_PAPER_SLUG,
    title:
      "Tamil Nadu’s ₹13.18 Lakh Crore Warning: Debt Is Only the Symptom, Political Evasion Is the Disease",
    summary:
      "A critical political-financial analysis of Tamil Nadu’s 2026 Fiscal White Paper, examining debt, revenue deficit, tax effort, interest burden, PSU risk and welfare economics.",
    dek: "The White Paper is political. The numbers are still serious. Tamil Nadu’s real crisis is not bankruptcy, but a shrinking fiscal room for welfare, investment and future promises.",
    body,
    reportBody,
    analysisBody,
    category: "Economy",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: TN_FISCAL_HERO_IMAGE,
    sourceUrl: SOURCE_URL,
    sourceName: "Government of Tamil Nadu — Fiscal White Paper 2026 (English PDF)",
    authorByline: "Political Economy Analysis",
    interactiveJson: { type: "fiscal_white_paper" } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-tn-fiscal] Refreshed article:", TN_FISCAL_WHITE_PAPER_SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-tn-fiscal] Inserted article:", TN_FISCAL_WHITE_PAPER_SLUG);
  }

  console.log(
    "[seed-tn-fiscal] Public URL:",
    `/chennai-local-news/${TN_FISCAL_WHITE_PAPER_SLUG}`,
  );
  console.log("[seed-tn-fiscal] White Paper PDF:", TN_FISCAL_WHITE_PAPER_PDF);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: TN_FISCAL_WHITE_PAPER_SLUG,
      label: "seed-tn-fiscal-white-paper",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
