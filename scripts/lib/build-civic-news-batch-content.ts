/**
 * One-off builder: parses content/inbox/civic-news-june-2026/source.md
 * and writes scripts/content/chennai-civic-news-batch-2026.ts
 *
 * Run: npx tsx scripts/lib/build-civic-news-batch-content.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCE = join(ROOT, "content/inbox/civic-news-june-2026/source.md");
const OUT = join(ROOT, "scripts/content/chennai-civic-news-batch-2026.ts");

/** IST wall-clock → UTC Date (ISO string without quotes issues). */
function istToUtc(
  y: number,
  m: number,
  d: number,
  hh = 12,
  mm = 0,
): string {
  const utcMs = Date.UTC(y, m - 1, d, hh, mm) - 5.5 * 60 * 60 * 1000;
  return new Date(utcMs).toISOString();
}

const PUBLISHED_AT: Record<string, string> = {
  "chennai-gcc-competitive-tenders-civic-works-savings-2026": istToUtc(
    2026,
    6,
    28,
    22,
    4,
  ),
  "chennai-ngt-gcc-wet-dry-waste-separate-collection-days": istToUtc(
    2026,
    6,
    28,
    0,
    0,
  ),
  "chennai-metro-phase-1-stations-refurbishment-upgrade-2026": istToUtc(
    2026,
    6,
    27,
    21,
    42,
  ),
  "chennai-mtc-gets-65-new-buses-300-bus-rollout-2026": istToUtc(
    2026,
    6,
    26,
    0,
    0,
  ),
  "chengalpattu-cmda-bus-terminus-opening-july-2026": istToUtc(
    2026,
    6,
    25,
    21,
    25,
  ),
  "chennai-cmda-high-rise-building-approval-powers-2026": istToUtc(
    2026,
    6,
    16,
    0,
    23,
  ),
  "tamil-nadu-urban-infrastructure-mission-chennai-civic-impact": istToUtc(
    2026,
    6,
    9,
    12,
    0,
  ),
  "chennai-metro-corridor-5-u-girders-completed-2026": istToUtc(
    2026,
    6,
    5,
    15,
    54,
  ),
  "guindy-multimodal-transit-hub-consultancy-cmrl-2026": istToUtc(
    2026,
    6,
    3,
    12,
    0,
  ),
  "chennai-metro-may-2026-ridership-90-lakh-passengers": istToUtc(
    2026,
    6,
    1,
    12,
    0,
  ),
  "chennai-airport-satellite-terminal-public-road-link-2026": istToUtc(
    2026,
    6,
    15,
    12,
    0,
  ),
  "perur-400-mld-desalination-plant-chennai-water-security": istToUtc(
    2026,
    2,
    12,
    3,
    41,
  ),
  "chennai-looped-water-grid-cmwssb-wabag-project-2026": istToUtc(
    2026,
    3,
    24,
    12,
    0,
  ),
  "chennai-wrd-5000-crore-water-security-project-cma": istToUtc(
    2026,
    1,
    15,
    12,
    0,
  ),
  "chennai-gcc-blue-green-restoration-three-lakes-35-crore": istToUtc(
    2026,
    4,
    20,
    12,
    0,
  ),
  "manali-bus-terminal-redevelopment-north-chennai-2026": istToUtc(
    2026,
    2,
    9,
    3,
    25,
  ),
  "broadway-bus-stand-822-crore-multimodal-hub-chennai": istToUtc(
    2026,
    1,
    30,
    12,
    0,
  ),
  "thiru-vi-ka-nagar-pickleball-court-gcc-1-52-crore": istToUtc(
    2026,
    3,
    10,
    12,
    0,
  ),
  "chennai-mudhalvar-padaippagams-modern-libraries-launched": istToUtc(
    2026,
    3,
    4,
    2,
    40,
  ),
  "chennai-gcc-reading-zones-36-parks-plan": istToUtc(2025, 8, 12, 12, 0),
};

const AREA_HUB: Record<string, string | null> = {
  "guindy-multimodal-transit-hub-consultancy-cmrl-2026":
    "saidapet-guindy-alandur",
  "manali-bus-terminal-redevelopment-north-chennai-2026":
    "tiruvottiyur-manali-belt",
  "broadway-bus-stand-822-crore-multimodal-hub-chennai": "royapuram-tondiarpet",
  "thiru-vi-ka-nagar-pickleball-court-gcc-1-52-crore": "teynampet-nungambakkam",
};

const RELATED_BY_SLUG: Record<string, string> = {
  "chennai-gcc-competitive-tenders-civic-works-savings-2026": `## Related reading on mychennaicity.in

- [Chennai topic hub](/chennai-local-news/topic/chennai)
- [NGT direction on wet and dry waste days](/chennai-local-news/chennai-ngt-gcc-wet-dry-waste-separate-collection-days)
- [GCC arterial road widening](/chennai-local-news/chennai-arterial-road-widening-gcc)
- [GCC single-use plastic drive](/chennai-local-news/chennai-gcc-single-use-plastic-drive-mar-10)
- [Tamil Nadu urban infrastructure mission](/chennai-local-news/tamil-nadu-urban-infrastructure-mission-chennai-civic-impact)`,

  "chennai-ngt-gcc-wet-dry-waste-separate-collection-days": `## Related reading on mychennaicity.in

- [Chennai topic hub](/chennai-local-news/topic/chennai)
- [GCC competitive tender savings](/chennai-local-news/chennai-gcc-competitive-tenders-civic-works-savings-2026)
- [GCC blue-green lake restoration](/chennai-local-news/chennai-gcc-blue-green-restoration-three-lakes-35-crore)
- [GCC reading zones in parks](/chennai-local-news/chennai-gcc-reading-zones-36-parks-plan)`,

  "chennai-metro-phase-1-stations-refurbishment-upgrade-2026": `## Related reading on mychennaicity.in

- [Mobility topic hub](/chennai-local-news/topic/mobility)
- [Chennai Metro May 2026 ridership](/chennai-local-news/chennai-metro-may-2026-ridership-90-lakh-passengers)
- [Corridor-5 U-girders completed](/chennai-local-news/chennai-metro-corridor-5-u-girders-completed-2026)
- [Singara Chennai card from May 1](/chennai-local-news/chennai-metro-singara-chennai-card-from-may-1)
- [Metro peak-hour crowding advisory](/chennai-local-news/chennai-metro-peak-hour-crowding-advisory-mar-18)`,

  "chennai-mtc-gets-65-new-buses-300-bus-rollout-2026": `## Related reading on mychennaicity.in

- [Mobility topic hub](/chennai-local-news/topic/mobility)
- [Chengalpattu CMDA bus terminus](/chennai-local-news/chengalpattu-cmda-bus-terminus-opening-july-2026)
- [Manali bus terminal redevelopment](/chennai-local-news/manali-bus-terminal-redevelopment-north-chennai-2026)
- [Broadway multimodal transport hub](/chennai-local-news/broadway-bus-stand-822-crore-multimodal-hub-chennai)`,

  "chengalpattu-cmda-bus-terminus-opening-july-2026": `## Related reading on mychennaicity.in

- [Mobility topic hub](/chennai-local-news/topic/mobility)
- [MTC 65 new buses rollout](/chennai-local-news/chennai-mtc-gets-65-new-buses-300-bus-rollout-2026)
- [CMDA high-rise approval powers](/chennai-local-news/chennai-cmda-high-rise-building-approval-powers-2026)
- [Explore Chennai areas](/areas)`,

  "chennai-cmda-high-rise-building-approval-powers-2026": `## Related reading on mychennaicity.in

- [Economy topic hub](/chennai-local-news/topic/economy)
- [Tamil Nadu urban infrastructure mission](/chennai-local-news/tamil-nadu-urban-infrastructure-mission-chennai-civic-impact)
- [Tamil Nadu IAS reshuffle — CMDA leadership (May 2026)](/chennai-local-news/tamil-nadu-ias-reshuffle-collectors-may-2026)
- [Yet another IAS reshuffle — July 2026](/chennai-local-news/yet-another-tamil-nadu-ias-reshuffle-july-2026)
- [Chengalpattu bus terminus](/chennai-local-news/chengalpattu-cmda-bus-terminus-opening-july-2026)`,

  "tamil-nadu-urban-infrastructure-mission-chennai-civic-impact": `## Related reading on mychennaicity.in

- [Chennai topic hub](/chennai-local-news/topic/chennai)
- [GCC competitive tender savings](/chennai-local-news/chennai-gcc-competitive-tenders-civic-works-savings-2026)
- [WRD ₹5,000 crore CMA water plan](/chennai-local-news/chennai-wrd-5000-crore-water-security-project-cma)
- [Perur 400 MLD desalination](/chennai-local-news/perur-400-mld-desalination-plant-chennai-water-security)
- [Guindy multimodal transit hub](/chennai-local-news/guindy-multimodal-transit-hub-consultancy-cmrl-2026)
- [Tamil Nadu cabinet portfolios (May 2026)](/chennai-local-news/tamil-nadu-cabinet-portfolios-may-2026)`,

  "chennai-metro-corridor-5-u-girders-completed-2026": `## Related reading on mychennaicity.in

- [Mobility topic hub](/chennai-local-news/topic/mobility)
- [Phase-1 station refurbishment](/chennai-local-news/chennai-metro-phase-1-stations-refurbishment-upgrade-2026)
- [Guindy multimodal hub DPR](/chennai-local-news/guindy-multimodal-transit-hub-consultancy-cmrl-2026)
- [Explore OMR corridor](/areas/omr-perungudi-sholinganallur)`,

  "guindy-multimodal-transit-hub-consultancy-cmrl-2026": `## Related reading on mychennaicity.in

- [Mobility topic hub](/chennai-local-news/topic/mobility)
- [Corridor-5 U-girders milestone](/chennai-local-news/chennai-metro-corridor-5-u-girders-completed-2026)
- [Chennai Metro ridership (May 2026)](/chennai-local-news/chennai-metro-may-2026-ridership-90-lakh-passengers)
- [Saidapet–Guindy–Alandur area guide](/areas/saidapet-guindy-alandur)`,

  "chennai-metro-may-2026-ridership-90-lakh-passengers": `## Related reading on mychennaicity.in

- [Mobility topic hub](/chennai-local-news/topic/mobility)
- [Phase-1 station upgrades](/chennai-local-news/chennai-metro-phase-1-stations-refurbishment-upgrade-2026)
- [Metro peak-hour crowding advisory](/chennai-local-news/chennai-metro-peak-hour-crowding-advisory-mar-18)
- [Singara Chennai card](/chennai-local-news/chennai-metro-singara-chennai-card-from-may-1)`,

  "chennai-airport-satellite-terminal-public-road-link-2026": `## Related reading on mychennaicity.in

- [Mobility topic hub](/chennai-local-news/topic/mobility)
- [Guindy multimodal hub](/chennai-local-news/guindy-multimodal-transit-hub-consultancy-cmrl-2026)
- [Porur–Valasaravakkam area guide](/areas/valasaravakkam-porur)`,

  "perur-400-mld-desalination-plant-chennai-water-security": `## Related reading on mychennaicity.in

- [Chennai topic hub](/chennai-local-news/topic/chennai)
- [Looped water grid project](/chennai-local-news/chennai-looped-water-grid-cmwssb-wabag-project-2026)
- [WRD ₹5,000 crore CMA plan](/chennai-local-news/chennai-wrd-5000-crore-water-security-project-cma)
- [Summer water tanker advisory](/chennai-local-news/chennai-summer-water-tanker-advisory-mar-25)`,

  "chennai-looped-water-grid-cmwssb-wabag-project-2026": `## Related reading on mychennaicity.in

- [Chennai topic hub](/chennai-local-news/topic/chennai)
- [Perur desalination plant](/chennai-local-news/perur-400-mld-desalination-plant-chennai-water-security)
- [WRD CMA water security plan](/chennai-local-news/chennai-wrd-5000-crore-water-security-project-cma)
- [Urban infrastructure mission](/chennai-local-news/tamil-nadu-urban-infrastructure-mission-chennai-civic-impact)`,

  "chennai-wrd-5000-crore-water-security-project-cma": `## Related reading on mychennaicity.in

- [Chennai topic hub](/chennai-local-news/topic/chennai)
- [Perur desalination](/chennai-local-news/perur-400-mld-desalination-plant-chennai-water-security)
- [Looped water grid](/chennai-local-news/chennai-looped-water-grid-cmwssb-wabag-project-2026)
- [GCC blue-green lakes](/chennai-local-news/chennai-gcc-blue-green-restoration-three-lakes-35-crore)`,

  "chennai-gcc-blue-green-restoration-three-lakes-35-crore": `## Related reading on mychennaicity.in

- [Chennai topic hub](/chennai-local-news/topic/chennai)
- [NGT wet/dry waste direction](/chennai-local-news/chennai-ngt-gcc-wet-dry-waste-separate-collection-days)
- [Urban infrastructure mission](/chennai-local-news/tamil-nadu-urban-infrastructure-mission-chennai-civic-impact)
- [GCC reading zones in parks](/chennai-local-news/chennai-gcc-reading-zones-36-parks-plan)`,

  "manali-bus-terminal-redevelopment-north-chennai-2026": `## Related reading on mychennaicity.in

- [Mobility topic hub](/chennai-local-news/topic/mobility)
- [Broadway transport hub](/chennai-local-news/broadway-bus-stand-822-crore-multimodal-hub-chennai)
- [MTC new buses](/chennai-local-news/chennai-mtc-gets-65-new-buses-300-bus-rollout-2026)
- [Tiruvottiyur & Manali area guide](/areas/tiruvottiyur-manali-belt)`,

  "broadway-bus-stand-822-crore-multimodal-hub-chennai": `## Related reading on mychennaicity.in

- [Mobility topic hub](/chennai-local-news/topic/mobility)
- [Manali bus terminal](/chennai-local-news/manali-bus-terminal-redevelopment-north-chennai-2026)
- [Royapuram & Tondiarpet area guide](/areas/royapuram-tondiarpet)`,

  "thiru-vi-ka-nagar-pickleball-court-gcc-1-52-crore": `## Related reading on mychennaicity.in

- [Chennai topic hub](/chennai-local-news/topic/chennai)
- [Mudhalvar Padaippagams libraries](/chennai-local-news/chennai-mudhalvar-padaippagams-modern-libraries-launched)
- [GCC park reading zones](/chennai-local-news/chennai-gcc-reading-zones-36-parks-plan)`,

  "chennai-mudhalvar-padaippagams-modern-libraries-launched": `## Related reading on mychennaicity.in

- [Chennai topic hub](/chennai-local-news/topic/chennai)
- [GCC reading zones in parks](/chennai-local-news/chennai-gcc-reading-zones-36-parks-plan)
- [Urban infrastructure mission](/chennai-local-news/tamil-nadu-urban-infrastructure-mission-chennai-civic-impact)`,

  "chennai-gcc-reading-zones-36-parks-plan": `## Related reading on mychennaicity.in

- [Chennai topic hub](/chennai-local-news/topic/chennai)
- [Mudhalvar Padaippagams libraries](/chennai-local-news/chennai-mudhalvar-padaippagams-modern-libraries-launched)
- [GCC blue-green lake restoration](/chennai-local-news/chennai-gcc-blue-green-restoration-three-lakes-35-crore)
- [GCC competitive tenders](/chennai-local-news/chennai-gcc-competitive-tenders-civic-works-savings-2026)`,
};

const INTERACTIVE: Record<string, Record<string, unknown>> = {
  "chennai-ngt-gcc-wet-dry-waste-separate-collection-days": {
    type: "checklist",
    title: "Before GCC splits wet and dry collection days",
    items: [
      {
        id: "two-bins",
        label: "Set up separate bins for wet waste and dry/recyclables at home",
      },
      {
        id: "apartment",
        label: "Ask your apartment association to display the ward collection schedule once GCC issues it",
      },
      {
        id: "route-check",
        label: "Watch whether your conservancy route follows the announced wet/dry schedule",
      },
      {
        id: "report-mixing",
        label: "Report if segregated waste is combined in the same vehicle",
      },
    ],
  },
  "chennai-metro-may-2026-ridership-90-lakh-passengers": {
    type: "faq",
    items: [
      {
        question: "How many passengers did Chennai Metro carry in May 2026?",
        answer:
          "CMRL reported 90.14 lakh (90,14,959) passenger trips for May 2026, with 18 May cited as the busiest day at 3,54,559 passengers.",
      },
      {
        question: "Does high ridership mean new metro lines are open?",
        answer:
          "No. May 2026 ridership reflects the existing Phase-1 network. Phase-2 corridors such as Corridor-5 are still under construction.",
      },
      {
        question: "Where can I check crowding before I travel?",
        answer:
          "Use the official CMRL app and station announcements. Peak-hour crowding advisories on mychennaicity.in also help plan airport and central Chennai trips.",
      },
    ],
  },
  "perur-400-mld-desalination-plant-chennai-water-security": {
    type: "checklist",
    title: "Track Chennai water supply beyond headlines",
    items: [
      {
        id: "cmwssb",
        label: "Follow CMWSSB updates on Perur plant and Perur–Porur pipeline works",
      },
      {
        id: "supply-date",
        label: "Separate plant completion from the date treated water reaches your area",
      },
      {
        id: "pressure",
        label: "Note supply hours and pressure before and after local network upgrades",
      },
      {
        id: "road-restoration",
        label: "Report unfinished road restoration after pipeline laying in your street",
      },
    ],
  },
  "chennai-looped-water-grid-cmwssb-wabag-project-2026": {
    type: "checklist",
    title: "Track Chennai water supply beyond headlines",
    items: [
      {
        id: "advisories",
        label: "Watch CMWSSB supply interruption notices during pipeline work",
      },
      {
        id: "pressure",
        label: "Document water pressure changes in your neighbourhood after commissioning",
      },
      {
        id: "road-cuts",
        label: "Check whether road cuts are restored after bulk-network laying",
      },
    ],
  },
  "chennai-wrd-5000-crore-water-security-project-cma": {
    type: "checklist",
    title: "Track Chennai water supply beyond headlines",
    items: [
      {
        id: "approval",
        label: "Wait for WRD approval documents before treating ₹5,000 crore as sanctioned spending",
      },
      {
        id: "local-waterbody",
        label: "Check if your lake, tank or river stretch appears in the final project list",
      },
      {
        id: "notices",
        label: "Follow local notices for survey or waterbody works near your area",
      },
    ],
  },
};

const DEK_PATCH: Record<string, string> = {
  "perur-400-mld-desalination-plant-chennai-water-security":
    "In February 2026, officials ordered fast-tracking of the ₹6,078.40 crore Perur plant — expected to serve Chennai, Tambaram and nearby local bodies when completed.",
  "chennai-looped-water-grid-cmwssb-wabag-project-2026":
    "In March 2026, CMWSSB-linked work on a looped bulk water grid was reported as part of Chennai’s climate-resilient water security programme.",
  "chennai-wrd-5000-crore-water-security-project-cma":
    "In January 2026, WRD prepared a ₹5,000 crore drought-and-flood resilience plan for the Chennai Metropolitan Area — still at proposal stage.",
  "manali-bus-terminal-redevelopment-north-chennai-2026":
    "In February 2026, GCC began redeveloping the Manali bus terminal with new bays, amenities and stormwater works.",
  "broadway-bus-stand-822-crore-multimodal-hub-chennai":
    "In January 2026, the historic Broadway bus stand was reported as becoming a ₹822.7 crore multimodal hub with 73 bus bays.",
  "chennai-mudhalvar-padaippagams-modern-libraries-launched":
    "In March 2026, eleven Mudhalvar Padaippagams and modern libraries opened across Chennai at a reported cost of ₹33.85 crore.",
  "chennai-gcc-reading-zones-36-parks-plan":
    "GCC planned reading zones in 36 more parks after a North Chennai pilot — verify which parks received them before relying on the schedule.",
};

const TITLE_PATCH: Record<string, string> = {
  "tamil-nadu-urban-infrastructure-mission-chennai-civic-impact":
    "Tamil Nadu ₹1.5 lakh crore urban mission: what it means for Chennai",
};

type ParsedArticle = {
  slug: string;
  title: string;
  summary: string;
  dek: string;
  category: string;
  featured: boolean;
  heroImageUrl: string;
  sourceUrl: string;
  sourceName: string;
  authorByline: string;
  reportBody: string;
  analysisBody: string;
};

function parseSource(md: string): ParsedArticle[] {
  const chunks = md.split(/^# Article \d+:/m).slice(1);
  const out: ParsedArticle[] = [];

  for (const chunk of chunks) {
    const manifestMatch = chunk.match(
      /```yaml manifest\n([\s\S]*?)```/,
    );
    const reportMatch = chunk.match(
      /```markdown REPORT \(report\.md content\)\n([\s\S]*?)```/,
    );
    const analysisMatch = chunk.match(
      /```markdown ANALYSIS \(analysis\.md content\)\n([\s\S]*?)```/,
    );
    if (!manifestMatch || !reportMatch || !analysisMatch) continue;

    const manifest = manifestMatch[1];
    const get = (key: string) => {
      const m = manifest.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
      if (!m) return "";
      let v = m[1].trim();
      if (v.startsWith("'") && v.endsWith("'")) v = v.slice(1, -1);
      if (v === "null") return "";
      if (v === "true") return "true";
      if (v === "false") return "false";
      return v.replace(/^["']|["']$/g, "");
    };

    out.push({
      slug: get("slug"),
      title: get("title"),
      summary: get("summary"),
      dek: get("dek"),
      category: get("category"),
      featured: get("featured") === "true",
      heroImageUrl: get("hero_image_url"),
      sourceUrl: get("source_url"),
      sourceName: get("source_name"),
      authorByline: get("author_byline") || "mychennaicity.in editorial",
      reportBody: reportMatch[1].trim(),
      analysisBody: analysisMatch[1].trim(),
    });
  }

  return out;
}

function fixAnalysisBody(slug: string, analysis: string): string {
  const related = RELATED_BY_SLUG[slug];
  if (!related) return analysis;

  return analysis.replace(
    /## Related reading on mychennaicity\.in\n\n[\s\S]*?(?=\n## Editorial note|\n## What changes|\Z)/,
    `${related}\n\n`,
  );
}

function escapeTemplate(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function main() {
  const md = readFileSync(SOURCE, "utf8");
  const articles = parseSource(md);

  if (articles.length !== 20) {
    console.error(`Expected 20 articles, parsed ${articles.length}`);
    process.exit(1);
  }

  const lines: string[] = [
    "/**",
    " * Chennai civic news batch — June 2026 editorial seed content.",
    " * Generated from content/inbox/civic-news-june-2026/source.md",
    " * Run: npx tsx scripts/lib/build-civic-news-batch-content.ts to regenerate.",
    " */",
    "",
    "export type CivicNewsBatchArticle = {",
    "  slug: string;",
    "  title: string;",
    "  summary: string;",
    "  dek: string;",
    "  category: string;",
    "  featured: boolean;",
    "  publishedAt: string;",
    "  heroImageUrl: string;",
    "  sourceUrl: string;",
    "  sourceName: string;",
    "  authorByline: string;",
    "  areaHubSlug: string | null;",
    "  reportBody: string;",
    "  analysisBody: string;",
    "  interactiveJson: Record<string, unknown> | null;",
    "};",
    "",
    "export const CHENNAI_CIVIC_NEWS_BATCH_2026: CivicNewsBatchArticle[] = [",
  ];

  for (const a of articles) {
    const slug = a.slug;
    const publishedAt = PUBLISHED_AT[slug];
    if (!publishedAt) {
      console.error(`Missing publishedAt for ${slug}`);
      process.exit(1);
    }

    const title = TITLE_PATCH[slug] ?? a.title;
    const dek = DEK_PATCH[slug] ?? a.dek;
    const analysisBody = fixAnalysisBody(slug, a.analysisBody);
    const areaHubSlug = AREA_HUB[slug] ?? null;
    const interactiveJson = INTERACTIVE[slug] ?? null;

    lines.push("  {");
    lines.push(`    slug: ${JSON.stringify(slug)},`);
    lines.push(`    title: ${JSON.stringify(title)},`);
    lines.push(`    summary: ${JSON.stringify(a.summary)},`);
    lines.push(`    dek: ${JSON.stringify(dek)},`);
    lines.push(`    category: ${JSON.stringify(a.category)},`);
    lines.push(`    featured: ${a.featured},`);
    lines.push(`    publishedAt: ${JSON.stringify(publishedAt)},`);
    lines.push(`    heroImageUrl: ${JSON.stringify(a.heroImageUrl)},`);
    lines.push(`    sourceUrl: ${JSON.stringify(a.sourceUrl)},`);
    lines.push(`    sourceName: ${JSON.stringify(a.sourceName)},`);
    lines.push(`    authorByline: ${JSON.stringify(a.authorByline)},`);
    lines.push(`    areaHubSlug: ${areaHubSlug ? JSON.stringify(areaHubSlug) : "null"},`);
    lines.push(`    reportBody: \`${escapeTemplate(a.reportBody)}\`,`);
    lines.push(`    analysisBody: \`${escapeTemplate(analysisBody)}\`,`);
    lines.push(
      `    interactiveJson: ${interactiveJson ? JSON.stringify(interactiveJson) : "null"},`,
    );
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");

  mkdirSync(join(ROOT, "scripts/content"), { recursive: true });
  writeFileSync(OUT, lines.join("\n"), "utf8");
  console.log(`Wrote ${articles.length} articles to ${OUT}`);
}

main();
