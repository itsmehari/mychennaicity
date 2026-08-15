/**
 * Civic / park / government directory batch — public institutions with official URLs.
 *
 * Dev:  `npm run db:seed:chennai-civic-directory-batch`
 * Live: `npm run db:seed:chennai-civic-directory-batch:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { cities, directoryEntries } from "../src/db/schema/tables";
import type { DirectoryEntryType } from "../src/lib/directory/type-labels";
import { serializeDirectoryEntryMetadata } from "../src/lib/directory/metadata";

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
  console.error("DATABASE_URL missing");
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

type Seed = {
  type: DirectoryEntryType;
  slug: string;
  name: string;
  address: string;
  localityLabel: string;
  phone: string | null;
  websiteUrl: string;
  summary: string;
  reportBody: string;
};

const ENTRIES: Seed[] = [
  {
    type: "government_office",
    slug: "greater-chennai-corporation-ripon-building",
    name: "Greater Chennai Corporation — Ripon Building",
    address: "Ripon Building, Sydenhams Road, Periyamet, Chennai 600003",
    localityLabel: "Park Town",
    phone: "1913",
    websiteUrl: "https://chennaicorporation.gov.in/",
    summary: "GCC headquarters. Civic complaints: 1913 / online civic services.",
    reportBody:
      "Ripon Building is the Greater Chennai Corporation headquarters. Use GCC online civic services or 1913 for streetlight, SWD, and conservancy tickets. Confirm current counters on the official site before visiting.",
  },
  {
    type: "government_office",
    slug: "cmwssb-chennai-metro-water",
    name: "Chennai Metro Water (CMWSSB)",
    address: "No. 1, Pumping Station Road, Chintadripet, Chennai 600002",
    localityLabel: "Chintadripet",
    phone: "04445674567",
    websiteUrl: "https://chennaimetrowater.tn.gov.in/",
    summary: "Water and sewerage utility. Confirm helpline on the current bill.",
    reportBody:
      "Chennai Metropolitan Water Supply and Sewerage Board publishes supply/shutdown notices. Helpline printed on bills; verify on the official site. Unmarked tankers are not automatically CMWSSB water.",
  },
  {
    type: "government_office",
    slug: "chennai-metro-rail-limited",
    name: "Chennai Metro Rail Limited",
    address: "Admin Building, Poonamallee High Road, Koyambedu, Chennai 600107",
    localityLabel: "Koyambedu",
    phone: null,
    websiteUrl: "https://chennaimetrorail.org/",
    summary: "Metro operator — fare, last-train, and disruption notices on the official site.",
    reportBody:
      "CMRL is the Metro operator. For passenger notices use chennaimetrorail.org. Construction / Phase II complaints are not the same desk as GCC conservancy.",
  },
  {
    type: "government_office",
    slug: "anna-centenary-library-kotturpuram",
    name: "Anna Centenary Library",
    address: "Gandhi Mandapam Road, Kotturpuram, Chennai 600085",
    localityLabel: "Kotturpuram",
    phone: null,
    websiteUrl: "https://www.anna-centenary-library.com/",
    summary: "State public library at Kotturpuram. Confirm hours on the library site before visiting.",
    reportBody:
      "Anna Centenary Library is a major public reading hall in Kotturpuram. Membership and hours change — check the official library pages. Not a GCC zonal office.",
  },
  {
    type: "park",
    slug: "marina-beach-chennai",
    name: "Marina Beach",
    address: "Kamarajar Salai, Chennai",
    localityLabel: "Triplicane / Santhome",
    phone: "1913",
    websiteUrl: "https://chennaicorporation.gov.in/",
    summary: "Urban beach along Kamarajar Salai. Police and GCC manage stretches during events.",
    reportBody:
      "Marina is a public beach, not a ticketed park. Event days (I-Day, rallies) close stretches of Kamarajar Salai. For civic issues on the promenade, GCC 1913; for crime in progress, police.",
  },
  {
    type: "park",
    slug: "elliots-beach-besant-nagar",
    name: "Elliot’s Beach (Besant Nagar)",
    address: "Elliot’s Beach Road, Besant Nagar, Chennai 600090",
    localityLabel: "Besant Nagar",
    phone: "1913",
    websiteUrl: "https://chennaicorporation.gov.in/",
    summary: "Neighbourhood beach in Besant Nagar. Confirm event closures locally.",
    reportBody:
      "Elliot’s Beach is the Adyar-side public beach. Parking and vendor rules are enforced periodically. Civic issues: GCC; surf / drowning: coastal police / lifeguards when posted.",
  },
  {
    type: "park",
    slug: "semmozhi-poonga-cathedral-road",
    name: "Semmozhi Poonga",
    address: "Cathedral Road, Gopalapuram, Chennai 600086",
    localityLabel: "Gopalapuram",
    phone: null,
    websiteUrl: "https://chennaicorporation.gov.in/",
    summary: "Botanical garden on Cathedral Road. Confirm ticket hours before you go.",
    reportBody:
      "Semmozhi Poonga is a GCC botanical garden. Hours and tickets are posted at the gate / GCC notices. Not a picnic ground for open fires.",
  },
  {
    type: "park",
    slug: "guindy-national-park",
    name: "Guindy National Park",
    address: "Guindy, Chennai 600032",
    localityLabel: "Guindy",
    phone: null,
    websiteUrl: "https://www.forests.tn.gov.in/",
    summary: "Protected urban forest. Hours and vehicle rules on TN Forest notices.",
    reportBody:
      "Guindy National Park is a Tamil Nadu Forest Department protected area inside the city. Entry hours and deer/snake-park counters change — check forest department notices. Not a GCC neighbourhood park.",
  },
  {
    type: "park",
    slug: "tholkappia-poonga-adyar-eco-park",
    name: "Tholkappia Poonga (Adyar eco park)",
    address: "Adyar Creek, Chennai",
    localityLabel: "Adyar",
    phone: null,
    websiteUrl: "https://chennaicorporation.gov.in/",
    summary: "Adyar creek ecological restoration park. Confirm visitor access on GCC / park notices.",
    reportBody:
      "Tholkappia Poonga is the Adyar creek eco-park. Access can be timed or ticketed. It is a restoration site, not a sports ground.",
  },
  {
    type: "government_office",
    slug: "fort-st-george-secretariat",
    name: "Fort St. George (Tamil Nadu Secretariat)",
    address: "Fort St. George, Rajaji Salai, Chennai 600009",
    localityLabel: "George Town",
    phone: null,
    websiteUrl: "https://www.tn.gov.in/",
    summary: "State Secretariat and historic fort. Public access is restricted; I-Day ceremonies close nearby roads.",
    reportBody:
      "Fort St. George houses the Tamil Nadu Secretariat. It is not a tourist walk-in on working days. Independence Day and similar ceremonies close Kamarajar Salai / Rajaji Salai from early morning — follow Greater Chennai Traffic Police notices.",
  },
];

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);
  if (!city) {
    console.error("chennai city missing");
    process.exit(1);
  }

  let inserted = 0;
  let skipped = 0;
  const now = new Date();

  for (const entry of ENTRIES) {
    const [existing] = await db
      .select({ id: directoryEntries.id })
      .from(directoryEntries)
      .where(
        and(
          eq(directoryEntries.cityId, city.id),
          eq(directoryEntries.type, entry.type),
          eq(directoryEntries.slug, entry.slug),
        ),
      )
      .limit(1);
    if (existing) {
      skipped += 1;
      continue;
    }
    await db.insert(directoryEntries).values({
      cityId: city.id,
      type: entry.type,
      slug: entry.slug,
      name: entry.name,
      address: entry.address,
      localityLabel: entry.localityLabel,
      phone: entry.phone,
      websiteUrl: entry.websiteUrl,
      verified: true,
      metadata: serializeDirectoryEntryMetadata({
        summary: entry.summary,
        reportBody: `## Disclaimer\n\nPublic-interest directory listing. Hours, phones, and counters change. Verify on the official site before visiting.\n\n${entry.reportBody}`,
      }),
      createdAt: now,
      updatedAt: now,
    });
    inserted += 1;
  }

  console.log(`civic directory batch: inserted ${inserted}, skipped ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
