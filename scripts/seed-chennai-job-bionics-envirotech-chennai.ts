/**
 * Bionics Envirotech — Chennai vacancies from the social post and the flyer.
 * Flyer-only Erode / other-state roles are not seeded.
 *
 * Flyer: `public/images/listings/bionics-envirotech-hiring-2026.png`
 *
 * Dev:  `npm run db:seed:chennai-job:bionics-envirotech`
 * Live: `npm run db:seed:chennai-job:bionics-envirotech:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, ilike, or } from "drizzle-orm";
import { finishListingSeedLive } from "./lib/seed-event-shared";
import * as schema from "../src/db/schema";
import { cities, employers, jobPostings } from "../src/db/schema/tables";

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
      : "DATABASE_URL missing — add to .env.local",
  );
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

const EMPLOYER_SLUG = "bionics-envirotech-pvt-ltd";
const FLYER =
  "/images/listings/bionics-envirotech-hiring-2026.png";
const EMAILS = ["bionicsenvirotech@gmail.com", "bionicshr@gmail.com"];
const MAILTO = `mailto:${EMAILS.join(",")}?subject=${encodeURIComponent(
  "Resume — Bionics Envirotech, Chennai",
)}`;

const APPLY = `
## How to apply
Send your updated resume to **[bionicsenvirotech@gmail.com](mailto:bionicsenvirotech@gmail.com)** or **[bionicshr@gmail.com](mailto:bionicshr@gmail.com)**.

Call **99528 81598**, **90950 00090**, **90951 00030**, or **90951 00040**.

Website: [www.bionicsenviro.com](https://www.bionicsenviro.com).

Name the role. Mention that you saw the opening on MyChennaiCity jobs.

**Chennai office on the flyer:** No. 1, GST Road, Thailavaram, Potheri, Chennai 603203. Head office on the flyer is in Erode (2/185, Ramnagar, Vaaikalmedu, Parundurai Main Road, Erode 638052).

The flyer also prints General Manager – Marketing (1, Erode), Regional Marketing Manager (4, other states), and Sales & Marketing Manager (10, field, other states). Those are not listed here.

Salary is not stated. Immediate joiners are welcome. Tamil, English, and Hindi are preferable. This page is compiled from the company’s social post and the hiring flyer.
`.trim();

const ROLES: {
  slug: string;
  title: string;
  locationLabel: string;
  openings: number;
  body: string;
}[] = [
  {
    slug: "business-development-manager-bionics-envirotech-chennai",
    title: "Business development manager — Bionics Envirotech, Chennai",
    locationLabel: "Chennai (flyer also names Erode)",
    openings: 10,
    body: `**Bionics Envirotech Pvt. Ltd.** is hiring **business development managers**. The social post lists **10** vacancies with job location **Chennai**. The flyer prints the same **10** for **Erode and Chennai**.

![Bionics Envirotech hiring flyer](${FLYER})

Relevant experience is preferred. The flyer marks this as an immediate joiner, field and corporate office.`,
  },
  {
    slug: "telecalling-executive-bionics-envirotech-chennai",
    title: "Telecalling executive — Bionics Envirotech, Chennai",
    locationLabel: "Chennai (flyer also names Erode)",
    openings: 10,
    body: `**Bionics Envirotech Pvt. Ltd.** is hiring **telecalling executives** in **Chennai**. The social post lists **10** vacancies. The flyer prints **Telecalling — 20** for **Erode and Chennai** together, and does not split that 20 by city.

![Bionics Envirotech hiring flyer](${FLYER})

Relevant experience is preferred. Immediate joiners are welcome.`,
  },
  {
    slug: "typist-bionics-envirotech-erode-chennai",
    title: "Typist — Bionics Envirotech, Erode and Chennai",
    locationLabel: "Erode and Chennai",
    openings: 6,
    body: `**Bionics Envirotech Pvt. Ltd.** The flyer prints **Typist — 6** for **Erode and Chennai**. It does not split the six seats by city. This role is not in the social post.

![Bionics Envirotech hiring flyer](${FLYER})

Immediate joiner. Tamil, English, and Hindi are preferable.`,
  },
  {
    slug: "hr-manager-bionics-envirotech-chennai",
    title: "Human resource manager — Bionics Envirotech, Chennai",
    locationLabel: "Chennai",
    openings: 2,
    body: `**Bionics Envirotech Pvt. Ltd.** is hiring **human resource managers** — **2** vacancies. The social post places this role in **Chennai**. It is not printed on the flyer.

![Bionics Envirotech hiring flyer](${FLYER})

Relevant experience is preferred. Immediate joiners are welcome.`,
  },
  {
    slug: "assistant-hr-bionics-envirotech-chennai",
    title: "Assistant HR — Bionics Envirotech, Chennai",
    locationLabel: "Chennai",
    openings: 2,
    body: `**Bionics Envirotech Pvt. Ltd.** is hiring **assistant HR** — **2** vacancies. The social post places this role in **Chennai**. It is not printed on the flyer.

![Bionics Envirotech hiring flyer](${FLYER})

Relevant experience is preferred. Immediate joiners are welcome.`,
  },
  {
    slug: "graphic-designer-bionics-envirotech-chennai",
    title: "Graphic designer — Bionics Envirotech, Chennai",
    locationLabel: "Chennai",
    openings: 2,
    body: `**Bionics Envirotech Pvt. Ltd.** is hiring **graphic designers** — **2** vacancies. The social post places this role in **Chennai**. It is not printed on the flyer.

![Bionics Envirotech hiring flyer](${FLYER})

Relevant experience is preferred. Immediate joiners are welcome.`,
  },
  {
    slug: "accounts-finance-manager-bionics-envirotech-chennai",
    title: "Accounts and finance manager — Bionics Envirotech, Chennai",
    locationLabel: "Chennai",
    openings: 2,
    body: `**Bionics Envirotech Pvt. Ltd.** is hiring **accounts and finance managers** — **2** vacancies. The social post places this role in **Chennai**. It is not printed on the flyer.

![Bionics Envirotech hiring flyer](${FLYER})

Relevant experience is preferred. Immediate joiners are welcome.`,
  },
];

async function main() {
  const matches = await db
    .select({ slug: jobPostings.slug, title: jobPostings.title, status: jobPostings.status })
    .from(jobPostings)
    .where(
      or(
        ilike(jobPostings.body, "%bionicsenvirotech@gmail.com%"),
        ilike(jobPostings.body, "%bionicshr@gmail.com%"),
        ilike(jobPostings.body, "%9952881598%"),
        ilike(jobPostings.title, "%Bionics Envirotech%"),
      ),
    );

  const ours = new Set(ROLES.map((r) => r.slug));
  const other = matches.filter((row) => !ours.has(row.slug));
  if (other.length > 0) {
    console.log("[seed-job] Duplicate already live. Skipping.");
    for (const row of other) {
      console.log(`- ${row.status} /chennai-jobs/${row.slug} — ${row.title}`);
    }
    process.exit(0);
  }

  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);
  if (!city) {
    console.error("City slug 'chennai' not found.");
    process.exit(1);
  }

  let employerId: string;
  const [existingEmp] = await db
    .select({ id: employers.id })
    .from(employers)
    .where(eq(employers.slug, EMPLOYER_SLUG))
    .limit(1);
  if (existingEmp) {
    employerId = existingEmp.id;
    await db
      .update(employers)
      .set({ name: "Bionics Envirotech Pvt. Ltd.", updatedAt: new Date() })
      .where(eq(employers.id, employerId));
  } else {
    const [ins] = await db
      .insert(employers)
      .values({
        name: "Bionics Envirotech Pvt. Ltd.",
        slug: EMPLOYER_SLUG,
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = ins.id;
  }

  const now = new Date();
  const validThrough = new Date(now);
  validThrough.setDate(validThrough.getDate() + 90);

  for (const role of ROLES) {
    const [existingJob] = await db
      .select({ id: jobPostings.id })
      .from(jobPostings)
      .where(and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, role.slug)))
      .limit(1);

    const values = {
      employerId,
      cityId: city.id,
      slug: role.slug,
      title: role.title,
      body: `${role.body}\n\n${APPLY}`,
      locationLabel: role.locationLabel,
      status: "open" as const,
      validThrough,
      applicationUrl: MAILTO,
      salaryDisclosed: false,
      openingsCount: role.openings,
      remotePolicy: "onsite" as const,
      updatedAt: now,
    };

    if (existingJob) {
      await db.update(jobPostings).set(values).where(eq(jobPostings.id, existingJob.id));
      console.log("[seed-job] Refreshed:", role.slug);
    } else {
      await db.insert(jobPostings).values({ ...values, publishedAt: now, createdAt: now });
      console.log("[seed-job] Inserted:", role.slug);
    }
  }

  await finishListingSeedLive({
    jobSlug: ROLES[0].slug,
    label: "seed-job",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
