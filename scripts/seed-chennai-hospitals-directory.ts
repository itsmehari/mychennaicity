/**
 * Seed a starter set of major Chennai hospitals for the directory (emergency visibility).
 *
 * Dev:  `npm run db:seed:chennai-hospitals-directory`
 * Live: `npm run db:seed:chennai-hospitals-directory:live`
 *
 * Public-interest listing — verify phones/ER status before you travel. Not a medical advice page.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { cities, directoryEntries } from "../src/db/schema/tables";
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
  console.error(
    live
      ? "Live: DATABASE_URL missing (.env.production.local)."
      : "DATABASE_URL missing — add to .env.local or secrets/database.local.env",
  );
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

const HOSPITALS = [
  {
    slug: "rajiv-gandhi-government-general-hospital-chennai",
    name: "Rajiv Gandhi Government General Hospital (RGGGH)",
    address: "General Hospital Road, Park Town, Chennai",
    localityLabel: "Park Town",
    phone: "044-2530 5000",
    websiteUrl: "https://www.tnhealth.tn.gov.in/",
    summary:
      "Major government tertiary hospital in central Chennai. Confirm casualty / emergency desk on arrival.",
  },
  {
    slug: "stanley-medical-college-hospital-chennai",
    name: "Government Stanley Medical College Hospital",
    address: "Old Jail Road, Royapuram, Chennai",
    localityLabel: "Royapuram",
    phone: "044-2528 1354",
    websiteUrl: "https://www.tnhealth.tn.gov.in/",
    summary: "Large government teaching hospital serving north Chennai.",
  },
  {
    slug: "kilpauk-medical-college-hospital-chennai",
    name: "Government Kilpauk Medical College Hospital",
    address: "EVR Periyar Salai, Kilpauk, Chennai",
    localityLabel: "Kilpauk",
    phone: "044-2836 4901",
    websiteUrl: "https://www.tnhealth.tn.gov.in/",
    summary: "Government medical college hospital — central / north-west catchment.",
  },
  {
    slug: "apollo-hospitals-greams-road-chennai",
    name: "Apollo Hospitals — Greams Road",
    address: "21 Greams Lane, Off Greams Road, Chennai",
    localityLabel: "Greams Road",
    phone: "1860 500 1066",
    websiteUrl: "https://www.apollohospitals.com/",
    summary: "Major private multi-speciality hospital. Call ahead for emergency routing.",
  },
  {
    slug: "fortis-malar-hospital-adyar-chennai",
    name: "Fortis Malar Hospital — Adyar",
    address: "52 First Main Road, Gandhi Nagar, Adyar, Chennai",
    localityLabel: "Adyar",
    phone: "044-4289 2222",
    websiteUrl: "https://www.fortishealthcare.com/",
    summary: "Private multi-speciality hospital in south Chennai.",
  },
  {
    slug: "miot-international-manapakkam-chennai",
    name: "MIOT International — Manapakkam",
    address: "4/112 Mount Poonamallee Road, Manapakkam, Chennai",
    localityLabel: "Manapakkam",
    phone: "044-4200 2288",
    websiteUrl: "https://www.miotinternational.com/",
    summary: "Large private tertiary hospital on the west / airport-side corridor.",
  },
  {
    slug: "srmc-porur-chennai",
    name: "Sri Ramachandra Medical Centre — Porur",
    address: "No.1 Ramachandra Nagar, Porur, Chennai",
    localityLabel: "Porur",
    phone: "044-4592 8500",
    websiteUrl: "https://www.sriramachandra.edu.in/",
    summary: "Teaching hospital and multi-speciality centre in west Chennai.",
  },
  {
    slug: "kauvery-hospital-alandur-chennai",
    name: "Kauvery Hospital — Alandur",
    address: "No. 81, TTK Road / Alandur campus — confirm current address on hospital site",
    localityLabel: "Alandur",
    phone: "044-4000 6000",
    websiteUrl: "https://www.kauveryhospital.com/",
    summary:
      "Private hospital network with Chennai campuses — verify the exact campus phone and map pin before travel.",
  },
] as const;

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found.");
    process.exit(1);
  }

  const now = new Date();
  let upserts = 0;

  for (const h of HOSPITALS) {
    const metadata = serializeDirectoryEntryMetadata({
      summary: h.summary,
      dek: "Directory listing · verify emergency desk and address before you travel.",
      areaHubSlug: undefined,
    });

    const values = {
      cityId: city.id,
      type: "hospital" as const,
      name: h.name,
      slug: h.slug,
      address: h.address,
      localityLabel: h.localityLabel,
      phone: h.phone,
      websiteUrl: h.websiteUrl,
      verified: false,
      metadata,
      updatedAt: now,
    };

    const [existing] = await db
      .select({ id: directoryEntries.id })
      .from(directoryEntries)
      .where(
        and(
          eq(directoryEntries.cityId, city.id),
          eq(directoryEntries.type, "hospital"),
          eq(directoryEntries.slug, h.slug),
        ),
      )
      .limit(1);

    if (existing) {
      await db
        .update(directoryEntries)
        .set(values)
        .where(eq(directoryEntries.id, existing.id));
    } else {
      await db.insert(directoryEntries).values({
        ...values,
        createdAt: now,
      });
    }
    upserts += 1;
    console.log("[seed-hospitals]", existing ? "refresh" : "insert", h.slug);
  }

  console.log(`[seed-hospitals] Done — ${upserts} hospital listings.`);
  console.log("[seed-hospitals] Hub: https://mychennaicity.in/directory");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
