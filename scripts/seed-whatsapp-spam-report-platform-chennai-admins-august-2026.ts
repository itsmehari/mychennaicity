/**
 * WhatsApp spam-report platform for Chennai group admins (August 2026).
 * SEO / AEO / GEO: answer-first + FAQ + Chennai neighbourhood group framing.
 *
 * Dev:  `npm run db:seed:whatsapp-spam-report-platform-chennai-admins-august-2026`
 * Live: `npm run db:seed:whatsapp-spam-report-platform-chennai-admins-august-2026:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

/** Hands messaging on WhatsApp outdoors — Wikimedia Commons (CC BY-SA 4.0). */
const HERO_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/f/f7/Whatsapp_chatting_outdoor_20180808.jpg";

const SPAMMERS_PATH = "/chennai-whatsapp-spammers";
const COMMUNITY_PATH = "/chennai-whatsapp-group";
const GUIDE_PATH = "/chennai-whatsapp-community-guide";
const CONTACT_PATH = "/contact";

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
  "whatsapp-spam-report-platform-chennai-group-admins-august-2026";

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

  /** Chennai, 8 August 2026 — late morning IST. */
  const publishedAt = new Date("2026-08-08T11:30:00.000+05:30");
  const now = new Date();

  const reportBody = `## Direct answer

**WhatsApp group admins in Chennai need a shared, public place to report and check spam numbers** — especially numbers that arrive in **invite-link floods** and fill the admin-approval queue.

Private “reject and forget” moderation is no longer enough. The same foreign dial codes and recycled profiles hit **RWA groups, jobs groups, alumni batches, temple committees, school PTAs, and neighbourhood chats** across **Greater Chennai** within hours of each other.

**MyChennaiCity’s starting point:** a dedicated public list at **[mychennaicity.in/chennai-whatsapp-spammers](${SPAMMERS_PATH})**, seeded from real admin-approval floods on the official **[my chennai city](${COMMUNITY_PATH})** WhatsApp community — plus a clear path for other admins to send verified screenshots via **[contact](${CONTACT_PATH})**.

This article explains the **problem first**, then the **platform design**, then a **practical playbook** for group owners and co-admins.

## The problem WhatsApp group owners face first

If you admin a Chennai WhatsApp group, you already know the pattern:

1. You share an **invite link** so genuine residents can join — apartment neighbours in **Adyar**, job seekers on **OMR**, parents near **Velachery**, shopkeepers in **T Nagar**, or residents in **Tambaram** and **Anna Nagar**.
2. Within hours or days, the **admin approval** screen fills with numbers you do not recognise.
3. Many show as **“Added by” themselves** — classic invite-link behaviour, not a trusted member adding a cousin.
4. Some use **+63**, **+234**, or other non-India dial codes on a **Chennai-only** community invite.
5. Profile names look random, spoofed, or copy-pasted. Default silhouette photos are common.
6. If you approve carelessly, the group gets **crypto spam, fake jobs, gambling links, adult ads, or cold DMs**. If you reject one by one without sharing intelligence, the **next admin in the next group** starts from zero.

That is the plot: **spam has become multi-group infrastructure**, while most Chennai WhatsApp moderation is still **single-group, private, and undocumented**.

### Why this hurts local groups more than “random internet spam”

Greater Chennai runs on WhatsApp:

- **RWA / apartment** maintenance and visitor alerts  
- **Jobs and classifieds** tips for OMR, Guindy, Ambattur, and the suburbs  
- **School and college** parent batches  
- **Temple, church, and community** festival coordination  
- **Civic** ward-level complaints and flood updates  

Trust is the product. One flooded invite link burns that trust faster than any Meta “report” button can repair it — because Meta’s tools are **account-level**, not **Chennai admin-network-level**.

### What admins usually try (and why it fails alone)

| Common response | Limit |
| --- | --- |
| Reject one number at a time | Slow; no memory across groups |
| Turn off invite link forever | Blocks genuine residents who need an easy join path |
| Chat with co-admins only | Numbers already hit ten other groups before your chat ends |
| Forward screenshots in random admin groups | Unsearchable, incomplete, no disclaimer culture |
| Ignore until spam posts appear | Damage is already inside the membership list |

**Missing piece:** a **specific, public, searchable platform** where group owners can **check** flagged numbers and **report** new floods — with editorial restraint, not pile-ons.

## Key takeaways for WhatsApp group admins

- A **dedicated spam-number page** helps Chennai admins reject invite-link floods faster than private chats alone.
- Start with **[WhatsApp spammers list — Chennai](${SPAMMERS_PATH})** — numbers already flagged from our community approval queue (updated **8 August 2026**).
- Treat listings as a **moderation aid**, not a police FIR or court finding. Do **not** harass listed numbers.
- Turn on **admin approval**, reject **self-added clusters**, rotate the **invite link** after a flood, then **report** new batches with screenshots.
- Official mychennaicity community join: **[chennai-whatsapp-group](${COMMUNITY_PATH})**. Safety guide: **[chennai-whatsapp-community-guide](${GUIDE_PATH})**.

## What a WhatsApp spam-report platform should include

For group owners searching “how to report WhatsApp spammers” or “WhatsApp invite link spam admin”, a useful platform is not a gossip wall. It needs structure:

### Must-have fields when reporting

| Field | Why admins need it |
| --- | --- |
| Phone number (with country code) | Match against approval queues |
| Date / time of request | Spot coordinated floods |
| How they tried to join | Invite link vs member-add vs DM |
| Group type | RWA, jobs, alumni, city news, buy-sell |
| Screenshot of approval queue | Verify the claim before publish |
| Pattern tags | Foreign dial code, self-added cluster, fake job recruiter |

### Must-have public behaviours

- Clear **disclaimer** (public interest moderation aid; not criminal guilt)
- **Searchable / scannable** number list for busy admins on mobile
- Path to **submit more numbers** without requiring a Meta partnership
- Guidance that **rejects harassment** and “expose” videos
- Link to **official community rules** so readers know what “spam” means here

## How MyChennaiCity is building this for Chennai admins

On **8 August 2026**, the **my chennai city** WhatsApp community — run from **mychennaicity.in** — recorded a clear **invite-link flood** in the admin-approval queue: Indian numbers mixed with **Philippines (+63)** and **Nigeria (+234)** dial codes, each largely self-added via the invite.

We published those numbers on a dedicated page:

### → [WhatsApp spammers list for Chennai group admins](${SPAMMERS_PATH})

That page is the **first public surface** of a reporting platform:

1. **List** — flagged E.164 numbers, country hint, reason, flagged date  
2. **Tips** — admin approval, mixed country codes, rotate invite  
3. **Report more** — send screenshots via **[contact](${CONTACT_PATH})** for editorial review before anything is added  

It is intentionally **editorial** (human review), not an anonymous free-for-all dump. That is how you keep trust with group owners who will only use a list if it stays careful.

*Photo: messaging on WhatsApp outdoors — [Santeri Viinamäki / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Whatsapp_chatting_outdoor_20180808.jpg), CC BY-SA 4.0. Representational image; not a screenshot of any private chat.*`;

  const analysisBody = `## Why Chennai is a high-value target for WhatsApp invite spam

Answer engines and search users often ask: *Why do Chennai WhatsApp groups get so much spam?*

Because Chennai’s civic and commercial life is **group-dense**:

- New apartment handovers in **Sholinganallur**, **Porur**, and **Perumbakkam** create fresh RWA groups every month  
- Job markets on **OMR**, **Guindy**, and **Ambattur** drive high-trust “job lead” groups that scammers love to infiltrate  
- Festival and temple committees share invites widely during **Panguni**, **Navaratri**, and **Pongal** seasons  
- City news readers forward the **my chennai city** invite because it is useful — which also makes the link a magnet  

Spam operators do not need to understand Chennai politics. They need **open invite links** and **admins who approve quickly**.

## Responsible listing rules (non-negotiable)

If you are a group owner reading this to build your own list — or to contribute to ours — keep these boundaries:

1. **Public interest, not punishment.** Numbers are flagged for moderation awareness.  
2. **No harassment.** Do not call, threaten, or mass-message listed numbers.  
3. **No doxxing of private family data.** Phone numbers that attacked a public invite queue are the signal; home addresses are not.  
4. **Verify with a screenshot** before you ask us to publish.  
5. **Correction path.** If a number was listed in error, contact us — we will review and correct.  
6. **Not Meta’s official tool.** Use WhatsApp’s in-app report as well. This platform is a **Chennai admin network** aid.

## Admin playbook: from flood to defence (step by step)

### 1. Harden the group

- Enable **admin approval for new members**  
- Limit who can edit group settings  
- Pin clear rules (no MLM, no crypto schemes, no cold DMs)

### 2. Recognise a flood

- Many requests in a short window  
- Mostly **self-added** via invite  
- Mixed **foreign dial codes** on a local group  
- Empty or generic profiles

### 3. Reject the batch

- Reject the cluster without “just one approval to be polite”  
- Screenshot the queue for your records

### 4. Rotate the invite

- Revoke the flooded invite link  
- Create a new one  
- Publish the new link only from a **trusted page** (for us: **[chennai-whatsapp-group](${COMMUNITY_PATH})**), not open comment sections

### 5. Check the shared list

- Open **[chennai-whatsapp-spammers](${SPAMMERS_PATH})** before your next approval session  
- Match country codes and exact numbers

### 6. Report what you saw

- Send the screenshot + numbers via **[contact](${CONTACT_PATH})**  
- Note group type (RWA / jobs / alumni / city) and date  
- We review before publishing

### 7. Teach co-admins

- Share this article and the spammers page with every co-admin  
- Agree that **speed of reject** beats **debate over one suspicious number**

## What this platform is not

- Not a substitute for filing a **cybercrime** complaint when money is stolen  
- Not a **WhatsApp / Meta** product  
- Not a legal blacklist with court force  
- Not a place to settle personal grudges using someone else’s number  

It **is** a Chennai-first, admin-facing layer so group owners stop fighting the same flood alone.

## Roadmap: how we plan to grow the reporting platform

Searchers looking for a “WhatsApp spam report website India” will expect more than a static table. Our planned path:

| Phase | What group admins get |
| --- | --- |
| **Now** | Public list + contact-based submissions + admin tips |
| **Next** | Structured submit form (number, screenshot, pattern tags) |
| **Later** | Search/filter, “seen in multiple Chennai group types”, Tamil summary for co-admins |
| **Partner** | RWA federations, alumni admins, and city-news groups sharing verified batches |

Every phase keeps the same rule: **editorial review before public listing**.

## Call to action for WhatsApp group owners in Chennai

1. Bookmark **[WhatsApp spammers list](${SPAMMERS_PATH})**  
2. Share it with your co-admins tonight  
3. Turn on **admin approval** if it is still off  
4. After the next flood, **rotate the invite** and **send us the screenshot**  
5. Join or point members to the official community only via **[mychennaicity.in/chennai-whatsapp-group](${COMMUNITY_PATH})**  
6. Read the longer safety guide: **[How to find trusted local WhatsApp groups in Chennai](${GUIDE_PATH})**

Spam moves in batches. Admins who share intelligence move faster than spam.

## Related reading

- **[WhatsApp spammers list](${SPAMMERS_PATH})** — flagged invite-flood numbers for Chennai admins  
- **[Official my chennai city WhatsApp community](${COMMUNITY_PATH})** — rules, FAQ, join path  
- **[Trusted Chennai WhatsApp groups guide](${GUIDE_PATH})** — how to evaluate a group before you join  
- **[Community guidelines](/community-guidelines)** — civility, privacy, no spam  
- **[Consumer topic](/chennai-local-news/topic/consumer)** — household and safety stories  
- **[Namma Arasu WhatsApp chatbot guide](/chennai-local-news/namma-arasu-whatsapp-chatbot-tamil-nadu-2026)** — official TN government WhatsApp number (do not confuse with spam)`;

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
      "WhatsApp spam report platform for Chennai group admins: why invite-link floods need a shared list",
    summary:
      "Chennai WhatsApp group owners face invite-link spam floods across RWA, jobs, and neighbourhood groups. MyChennaiCity explains the problem, launches a public spammers list for admins, and shares a step-by-step defence playbook.",
    dek: "Problem first: self-added clusters and foreign dial codes fill admin queues. Then: a public reporting page Chennai group owners can check and contribute to — without turning moderation into harassment.",
    body,
    reportBody,
    analysisBody,
    category: "Consumer",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO_IMAGE_URL,
    sourceUrl: `https://mychennaicity.in${SPAMMERS_PATH}`,
    sourceName:
      "MyChennaiCity WhatsApp community admin-approval logs; editorial public-interest list at /chennai-whatsapp-spammers",
    authorByline: "MyChennaiCity Editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question:
            "How can WhatsApp group admins in Chennai report spammers?",
          answer:
            "Send a screenshot of the admin-approval queue plus the phone numbers (with country codes) via mychennaicity.in/contact. We review submissions before adding anything to the public WhatsApp spammers list at mychennaicity.in/chennai-whatsapp-spammers.",
        },
        {
          question: "Where is MyChennaiCity’s WhatsApp spammers list?",
          answer:
            "The public list for Chennai group admins is at https://mychennaicity.in/chennai-whatsapp-spammers. It includes numbers flagged from invite-link floods on the official my chennai city community, with country hints, reasons, and flagged dates.",
        },
        {
          question: "What is a WhatsApp invite-link flood?",
          answer:
            "An invite-link flood is when many unknown numbers request to join a group in a short window after an invite link is shared. Requests often show as self-added, may include foreign dial codes on a local Chennai group, and overwhelm the admin-approval queue.",
        },
        {
          question:
            "Should WhatsApp group owners turn on admin approval?",
          answer:
            "Yes. Admin approval is the strongest first defence for Chennai RWA, jobs, alumni, and neighbourhood groups. It lets admins reject self-added spam clusters before they can post crypto schemes, fake jobs, or cold DMs.",
        },
        {
          question:
            "Is a public WhatsApp spam number list legal and ethical?",
          answer:
            "Used carefully, it can be a public-interest moderation aid for group owners who already saw the numbers in invite queues. It is not a police FIR or court finding. Do not harass listed numbers. MyChennaiCity reviews screenshots before publishing and will correct errors if contacted.",
        },
        {
          question:
            "Does MyChennaiCity’s list replace WhatsApp’s in-app report?",
          answer:
            "No. Keep using WhatsApp’s report and block tools. The Chennai spammers page is an extra admin-network layer so different group owners can recognise the same flood faster. It is not affiliated with WhatsApp LLC or Meta.",
        },
        {
          question:
            "How do I protect my Chennai WhatsApp group after a spam flood?",
          answer:
            "Reject the cluster, revoke and recreate the invite link, publish the new link only from a trusted page, check mychennaicity.in/chennai-whatsapp-spammers before the next approval session, and share the list with co-admins.",
        },
        {
          question:
            "Who should use this WhatsApp spam report platform?",
          answer:
            "Admins and co-admins of Greater Chennai WhatsApp groups — apartment RWAs, jobs and classifieds groups, school/college batches, temple and community committees, alumni groups, and city news communities — especially anyone facing invite-link spam.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-wa-spam-platform] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-wa-spam-platform] Inserted article:", SLUG);
  }

  console.log(
    "[seed-wa-spam-platform] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );
  console.log("[seed-wa-spam-platform] Hero image:", HERO_IMAGE_URL);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-wa-spam-platform",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
