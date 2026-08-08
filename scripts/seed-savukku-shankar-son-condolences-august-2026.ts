/**
 * Condolences: reported death of Savukku Shankar’s son — solidarity editorial (6 Aug 2026).
 *
 * Dev:  `npm run db:seed:savukku-shankar-son-condolences-august-2026`
 * Live: `npm run db:seed:savukku-shankar-son-condolences-august-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

/**
 * Portrait: Savukku Shankar at Aadhan Tamil interview, Oct 2021
 * (Wikimedia Commons). Local copy: public/images/articles/savukku-shankar-portrait-2021.png
 */
const HERO_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/b/b4/Savukku_Shankar_in_2021.png";

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

const SLUG =
  "savukku-shankar-son-passes-away-mychennaicity-condolences-august-2026";

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

  /** Chennai, 6 August 2026 — afternoon publish (IST). */
  const publishedAt = new Date("2026-08-06T12:15:00.000+05:30");
  const now = new Date();

  const reportBody = `## Summary

**Chennai, August 6, 2026:** The reported death of journalist, political commentator and YouTuber Savukku Shankar’s 13-year-old son has caused deep shock and sorrow across Tamil Nadu.

Media reports state that the boy was found unresponsive at a residence near Marakkanam in Villupuram district on August 5, 2026. The Marakkanam police have reportedly registered a case and initiated an investigation into the circumstances surrounding the death.

At a time when incomplete claims and deeply personal information are being circulated online, the public and media must exercise restraint. The deceased was a child, and the privacy and dignity of every member of the grieving family must be protected.

## A tragedy beyond politics and public differences

Savukku Shankar has been a prominent and frequently debated voice in Tamil Nadu’s political and media landscape. His investigative commentary and public interventions have earned him both dedicated supporters and strong critics.

However, political disagreements and ideological differences have no place in a moment involving the death of a child.

No parent should have to endure such a devastating loss. Savukku Shankar, the child’s mother, grandparents, relatives, friends and schoolmates are confronting a tragedy that cannot be adequately expressed through words.

MyChennaiCity stands in solidarity with the entire grieving family.

## Standing with the grieving mother

While public attention naturally falls on Savukku Shankar because of his prominent media presence, this tragedy must not be viewed solely through the identity of a public figure.

A mother has lost her young son.

Her grief, pain and emotional burden deserve equal acknowledgement, compassion and respect. She must not be subjected to intrusive questions, speculation, judgement or unwanted public attention.

MyChennaiCity stands firmly with the grieving mother and hopes that she is surrounded by the care, privacy and emotional support required during this unbearable period.

The same compassion must extend to the grandparents and other family members who cared for and shared their lives with the child.

## On family circumstances already in the public domain

Tamil media reports have for some years described Savukku Shankar and the child’s mother as living separately after long-standing differences, with the boy spending much of his childhood in the care of grandparents near Marakkanam. Those private arrangements have occasionally drawn public comment and online speculation about the couple’s relationship and about the child’s upbringing.

That history is not an invitation to reopen old controversies, assign blame, or treat a family’s personal difficulties as content. Whatever strains existed between the parents, both have lost a child. Public discussion of marital discord has no place beside a child’s funeral rites—and it must never be used to explain, sensationalise or politicise the circumstances under investigation.

## Savukku Media continues its public work

Even amid this profound personal loss, the Savukku Media platform has continued publishing programmes and public-interest content through its digital channels.

The decision of the Savukku Media team to continue its work during such a difficult period deserves recognition.

Behind every news programme is a team of researchers, editors, camera professionals, producers, coordinators and technical staff. Their decision to maintain the platform’s work while respecting the grief of its founder reflects professional commitment and collective strength.

Savukku Shankar’s return to public communication during this period is also a reminder of the enormous emotional burden carried by people whose work remains continuously visible to the public.

Continuing to speak, report and present public-interest issues after such a devastating personal loss requires extraordinary resolve. This commitment may be appreciated, but it must not create an expectation that a grieving parent should suppress grief or immediately return to normal life.

Grief has no fixed schedule. Continuing professional work and privately mourning a child can exist simultaneously.

*Photo: Savukku Shankar at an Aadhan Tamil interview, October 2021 — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Savukku_Shankar_in_2021.png), CC BY 3.0.*`;

  const analysisBody = `## Public service during personal grief

Investigative journalism and independent public commentary often involve confronting powerful institutions, raising uncomfortable questions and bringing neglected issues into public discussion.

The Savukku Media team has built an audience by consistently discussing political, administrative and public-interest matters. Its continuation of this work during a period of personal tragedy demonstrates its commitment to the viewers who depend on the platform.

MyChennaiCity appreciates the strength shown by Savukku Shankar and the professional commitment demonstrated by his team.

At the same time, viewers and supporters must allow him and his family the space required to grieve. Appreciation should not become pressure. Public support must be expressed through dignity, patience and restraint.

## An appeal for responsible media coverage

This incident must not be converted into sensational content or political confrontation.

Media organisations, YouTube channels and social-media users should avoid circulating:

- Unverified explanations about the death
- Private family conversations
- Photographs of the child without appropriate consent
- Graphic or unnecessary descriptions
- Accusations directed at grieving family members
- Recycled commentary on the parents’ past marital differences or living arrangements
- Political statements exploiting the tragedy
- Content created merely to attract views and engagement

The circumstances surrounding the death should be established only through a lawful investigation and reliable official information.

Until then, speculation can cause further harm to people who are already experiencing unimaginable grief.

## A moment for humanity

Public life is often divided by politics, ideology, caste, religion, media loyalties and personal opinions. A tragedy involving a child must remind society that humanity must come before every such division.

One may agree or disagree with Savukku Shankar’s journalism, political views or methods. That disagreement must not prevent anyone from recognising the suffering of a father, a mother and a family that has lost a child.

This is not a moment for political judgement.

It is a moment for silence, compassion and solidarity.

## MyChennaiCity’s condolences

MyChennaiCity expresses its heartfelt condolences to Savukku Shankar, the child’s mother, grandparents, relatives, friends, teachers, schoolmates and everyone affected by this tragic loss.

We appreciate the Savukku Media team for continuing its public-interest work despite the profound sorrow surrounding its members.

We also acknowledge the strength demonstrated by Savukku Shankar in returning to his programmes and continuing to address matters concerning the public. Such resilience deserves respect, but he and his family must also be given complete freedom to mourn away from public scrutiny.

Above all, we stand with the grieving mother, whose pain must be acknowledged with the deepest sensitivity.

May the family receive the strength, privacy and support needed to endure this irreparable loss.

May the young soul rest in peace.

**MyChennaiCity stands with the grieving mother, Savukku Shankar, the entire family and the Savukku Media team—not as supporters or critics of any political position, but as fellow human beings sharing their sorrow.**`;

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
      "Savukku Shankar’s 13-year-old son dies near Marakkanam; police probe underway",
    summary:
      "Tamil Nadu media report the death of Savukku Shankar’s 13-year-old son near Marakkanam in Villupuram district. Marakkanam police have registered a case. An appeal for privacy, restraint, and no speculation while the investigation continues.",
    dek: "A child’s death is not a political moment—or a stage for old family controversies. Privacy and dignity for the grieving parents and family come first.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: null as string | null,
    sourceName:
      "MyChennaiCity editorial; circumstances and family living arrangements as reported in Tamil Nadu media (Marakkanam police investigation ongoing)",
    authorByline: "MyChennaiCity Editorial",
    interactiveJson: {
      type: "takeaways",
      items: [
        "Protect the privacy and dignity of the child and every grieving family member.",
        "Do not circulate unverified claims, private conversations, or photos of the child without consent.",
        "Past reports of parental estrangement are not grounds for public blame or speculation about the death.",
        "Circumstances of the death should rest with lawful investigation and reliable official information.",
        "Political disagreement has no place when a parent has lost a child.",
        "Appreciation for public work must not become pressure to suppress grief.",
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-savukku-condolences] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-savukku-condolences] Inserted article:", SLUG);
  }

  console.log(
    "[seed-savukku-condolences] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );
  console.log("[seed-savukku-condolences] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-savukku-condolences",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
