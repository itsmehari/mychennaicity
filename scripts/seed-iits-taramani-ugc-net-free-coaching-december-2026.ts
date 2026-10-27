/**
 * IITS Taramani — free UGC NET (Dec 2026) coaching · DIPR PR 765 (30 Sep 2026).
 * Seeds English + Tamil twins (cross-linked).
 *
 * Dev:  `npm run db:seed:iits-taramani-ugc-net-free-coaching-december-2026`
 * Live: `npm run db:seed:iits-taramani-ugc-net-free-coaching-december-2026:live`
 *
 * Hero: DIPR press-release scan (self-hosted).
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

export const SLUG_EN =
  "iits-taramani-ugc-net-free-coaching-december-2026";
export const SLUG_TA =
  "iits-taramani-ugc-net-free-coaching-december-2026-tamil";

const HERO =
  "/images/articles/iits-taramani-ugc-net-free-coaching-december-2026-dipr-pr-765.png";

const DIPR = "https://www.dipr.tn.gov.in/";
const PATH_EN = `/chennai-local-news/${SLUG_EN}`;
const PATH_TA = `/chennai-local-news/${SLUG_TA}`;
const PHONE_LAND = "044-2254 2992";
const PHONE_MOBILE = "90808 65906";
const EMAIL = "iitstaramani@gmail.com";
const MAILTO = `mailto:${EMAIL}`;
const TEL_MOBILE = "tel:+919080865906";

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

- The **International Institute of Tamil Studies (IITS), Taramani, Chennai** will run **free, in-person coaching** for the **UGC NET** exam scheduled for **December 2026**.
- Classes start **3 October 2026**: **Paper II (Tamil)** every **Saturday** 10:00 AM–1:00 PM; **Paper I (Teaching & Research Aptitude)** every **Sunday** 10:00 AM–1:00 PM.
- Open to IITS students **and** students from **other colleges and universities**, at **no fee**.
- Register via **${PHONE_LAND}**, mobile **${PHONE_MOBILE}**, or **[${EMAIL}](${MAILTO})**.

[தமிழ் பதிப்பு](${PATH_TA})

## Disclaimer

This article is **civic journalism** for public-interest information. It summarises **Tamil Nadu DIPR press release No. 765** dated **30 September 2026**. It is **not** an official DIPR, UGC, NTA, or IITS circular, and it is not exam advice.

Schedules, eligibility, seat limits, and contacts can change after publication. Confirm with IITS before you travel or rely on this notice for exam planning.

## Summary

**Chennai, 30 September 2026** — The International Institute of Tamil Studies at Taramani will conduct **free direct coaching classes** for candidates writing the **University Grants Commission National Eligibility Test (UGC NET)** in **December 2026**, according to a Department of Information and Public Relations press release.

The desk is aimed at aspirants who need structured weekend classes for **Tamil (Paper II)** and the **general teaching and research aptitude paper (Paper I)** without a coaching fee.

![DIPR press release No. 765 — free UGC NET coaching at IITS Taramani](${HERO})

## Schedule (as printed)

| Paper | Day | Time | Starts |
| --- | --- | --- | --- |
| **Paper II** — main subject **Tamil** | Every **Saturday** | **10:00 AM – 1:00 PM** | **3 October 2026** |
| **Paper I** — Teaching & Research Aptitude | Every **Sunday** | **10:00 AM – 1:00 PM** | **3 October 2026** |

The press release does **not** print an end date for the weekend series, a seat cap, or a walk-in vs pre-registration rule beyond the contact numbers and email. Ask IITS how long the December-cycle classes run and whether places are limited.

## Who can join

Classes are **free**. The notice says they are open to students of the institute **and** students from **other colleges and universities**.

It does **not** spell out degree year, prior NET attempts, or ID documents required at the gate — confirm those points when you call or email.

## Where

**International Institute of Tamil Studies (உலகத் தமிழாராய்ச்சி நிறுவனம்)**  
**Taramani, Chennai**

The press release does not print a door number or landmark. Confirm the classroom block and entry point with the contacts below before the first Saturday.

## How to register

| Channel | Detail |
| --- | --- |
| Phone | **[${PHONE_LAND}](tel:+914422542992)** |
| Mobile | **[${PHONE_MOBILE}](${TEL_MOBILE})** |
| Email | **[${EMAIL}](${MAILTO})** |

Mention that you are enquiring about the **December 2026 UGC NET** free coaching (Paper I / Paper II Tamil) after seeing DIPR PR **765**.

## Fact box

| Item | Detail |
| --- | --- |
| Story type | Public education notice (DIPR) |
| Press release | **No. 765** · **30.09.2026** |
| Issuer | Director, Information & Public Relations, Chennai-9 |
| Institute | International Institute of Tamil Studies, Taramani |
| Exam cycle named | UGC NET · **December 2026** |
| Fee | **Free** (as printed) |
| Category | Consumer |
| Primary source | DIPR Tamil press release scan supplied to this desk; [dipr.tn.gov.in](${DIPR}) |

## Sources

- Primary: Tamil Nadu DIPR press release **No. 765** (30 September 2026) on free UGC NET December 2026 coaching at IITS, Taramani
- Department site: [${DIPR}](${DIPR})`;

  const analysisBody = `## Why Chennai readers should care

UGC NET is the eligibility route many postgraduates use for **Assistant Professor** and related academic tracks. Free weekend coaching at a state Tamil research institute in **Taramani** lowers the cost barrier for Chennai and suburban students who need **Tamil Paper II** plus the common **Paper I** aptitude paper — without paying a private coaching shop.

Because the notice is a **DIPR** release, treat it as a **government information notice**, then still confirm classroom logistics with IITS. NTA / UGC control the actual exam calendar, forms, and admit cards — this coaching series does not replace official exam notifications.

## What to do next

1. Call or email IITS with your preferred paper (I, II, or both) and ask about seats and the last class date before the December cycle.
2. Confirm the Taramani classroom location and any ID you must carry.
3. Separately track the **official UGC NET December 2026** application window on NTA / UGC channels — this desk has not restated exam fees or form deadlines here because the press release does not cover them.
4. Do **not** pay any third party claiming to “register” you for this free IITS class.

## Related reading on mychennaicity.in

- [தமிழ் பதிப்பு](${PATH_TA})
- [Consumer topic hub](/chennai-local-news/topic/consumer)
- [OMR / Perungudi / Sholinganallur area hub](/areas/omr-perungudi-sholinganallur)
- [How to use mychennaicity.in](/guides/how-to-use-mychennaicity)
- [DIPR Tamil Nadu](${DIPR})

## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can sometimes make mistakes — misread numbers, miss nuance, or invent detail.
Please cross-check important facts with IITS, DIPR, or NTA / UGC primary sources before acting on them.`;

  return {
    slug: SLUG_EN,
    title:
      "Free UGC NET coaching at IITS Taramani for December 2026 — Saturdays & Sundays from 3 Oct",
    summary:
      "International Institute of Tamil Studies, Taramani, will run free weekend coaching for UGC NET December 2026: Tamil Paper II on Saturdays and Paper I on Sundays from 3 October. Open to other college students too.",
    dek: "DIPR PR 765: free in-person classes at Taramani — register on 044-2254 2992, 90808 65906, or iitstaramani@gmail.com.",
    reportBody,
    analysisBody,
    category: "Consumer",
  };
}

function buildTamil() {
  const reportBody = `## முக்கியப் புள்ளிகள்

- **தரமணி**, சென்னையில் உள்ள **உலகத் தமிழாராய்ச்சி நிறுவனம் (IITS)** **2026 திசம்பர்** **UGC NET** தேர்வுக்கு **கட்டணமில்லா நேரடி பயிற்சி** நடத்தும்.
- வகுப்புகள் **3 அக்டோபர் 2026** முதல்: **தாள் II (தமிழ்)** ஒவ்வொரு **சனி** காலை 10–மதியம் 1; **தாள் I (Teaching & Research Aptitude)** ஒவ்வொரு **ஞாயிறு** காலை 10–மதியம் 1.
- நிறுவன மாணவர்கள் மட்டுமல்ல — **பிற கல்லூரி / பல்கலைக்கழக** மாணவர்களுக்கும் **இலவசம்**.
- பதிவு: **${PHONE_LAND}**, கைபேசி **${PHONE_MOBILE}**, மின்னஞ்சல் **[${EMAIL}](${MAILTO})**.

[English version](${PATH_EN})

## பொறுப்புத்துறப்பு (Disclaimer)

இக்கட்டுரை பொதுநலன் சார்ந்த **குடிமை இதழியல்**. இது **30 செப்டம்பர் 2026** தேதியிட்ட தமிழ்நாடு **செய்தி மக்கள் தொடர்புத்துறை (DIPR) செய்தி வெளியீடு எண் 765**-ஐ அடிப்படையாகக் கொண்டது. இது DIPR, UGC, NTA அல்லது IITS-ன் **அதிகாரப்பூர்வ சுற்றறிக்கை அல்ல**; தேர்வு ஆலோசனையும் அல்ல.

நேர அட்டவணை, தகுதி, இட எண்ணிக்கை, தொடர்பு எண்கள் வெளியீட்டிற்குப் பிறகு மாறலாம். பயணம் அல்லது தேர்வுத் திட்டத்திற்கு முன் IITS-ஐ அழைத்து உறுதிப்படுத்துங்கள்.

## சுருக்கம்

**சென்னை, 30 செப்டம்பர் 2026** — உலகத் தமிழாராய்ச்சி நிறுவனம், தரமணி, **பல்கலைக்கழக மானியக்குழுத் தகுதித் தேர்வு (UGC NET) 2026 திசம்பர்** கட்டத்திற்கு **கட்டணமில்லா நேரடி பயிற்சி வகுப்புகள்** நடத்துவதாக DIPR அறிவித்துள்ளது.

**தமிழ் (தாள் II)** மற்றும் பொதுவான **Teaching & Research Aptitude (தாள் I)** ஆகியவற்றிற்கு வார இறுதி வகுப்புகள் — கட்டணம் இல்லாமல்.

![DIPR செய்தி வெளியீடு எண் 765 — IITS தரமணி UGC NET இலவசப் பயிற்சி](${HERO})

## நேர அட்டவணை (அச்சிடப்பட்டபடி)

| தாள் | நாள் | நேரம் | தொடக்கம் |
| --- | --- | --- | --- |
| **தாள் II** — முதன்மைப் பாடம் **தமிழ்** | ஒவ்வொரு **சனிக்கிழமை** | **காலை 10:00 – மதியம் 1:00** | **3 அக்டோபர் 2026** |
| **தாள் I** — Teaching & Research Aptitude | ஒவ்வொரு **ஞாயிற்றுக்கிழமை** | **காலை 10:00 – மதியம் 1:00** | **3 அக்டோபர் 2026** |

திசம்பர் சுழற்சிக்கு வகுப்புகள் எப்போது முடியும், இட வரம்பு, நேரடி வருகை / முன்பதிவு விதி — செய்தி வெளியீட்டில் **இல்லை**. IITS-ஐக் கேட்டுத் தெரிந்துகொள்ளுங்கள்.

## யார் சேரலாம்?

வகுப்புகள் **இலவசம்**. நிறுவன மாணவர்கள் **மற்றும்** பிற கல்லூரி / பல்கலைக்கழக மாணவர்களுக்கும் திறந்தது என அறிவிக்கப்பட்டுள்ளது.

பட்டப்படிப்பு ஆண்டு, முந்தைய NET முயற்சிகள், நுழைவுக்குத் தேவையான அடையாள ஆவணம் — வெளியீட்டில் விவரிக்கப்படவில்லை; தொலைபேசி / மின்னஞ்சலில் உறுதிப்படுத்துங்கள்.

## இடம்

**உலகத் தமிழாராய்ச்சி நிறுவனம்**  
**தரமணி, சென்னை**

கதவு எண் / அடையாளம் அச்சிடப்படவில்லை. முதல் சனிக்கு முன் வகுப்பறை இருப்பை உறுதிப்படுத்துங்கள்.

## பதிவு

| வழி | விவரம் |
| --- | --- |
| தொலைபேசி | **[${PHONE_LAND}](tel:+914422542992)** |
| கைபேசி | **[${PHONE_MOBILE}](${TEL_MOBILE})** |
| மின்னஞ்சல் | **[${EMAIL}](${MAILTO})** |

**DIPR PR 765** / **திசம்பர் 2026 UGC NET** இலவசப் பயிற்சி (தாள் I / தாள் II தமிழ்) எனக் குறிப்பிடுங்கள்.

## தகவல் பெட்டி

| விவரம் | நிலை |
| --- | --- |
| வகை | பொதுக் கல்வி அறிவிப்பு (DIPR) |
| செய்தி வெளியீடு | **எண் 765** · **30.09.2026** |
| வெளியீடு | இயக்குநர், செய்தி மக்கள் தொடர்புத்துறை, சென்னை-9 |
| நிறுவனம் | உலகத் தமிழாராய்ச்சி நிறுவனம், தரமணி |
| தேர்வுக் கட்டம் | UGC NET · **திசம்பர் 2026** |
| கட்டணம் | **இலவசம்** (அச்சிடப்பட்டபடி) |
| பகுப்பு | Consumer |
| முதன்மை ஆதாரம் | DIPR தமிழ் செய்தி வெளியீடு நகல்; [dipr.tn.gov.in](${DIPR}) |

## ஆதாரங்கள்

- முதன்மை: தமிழ்நாடு DIPR செய்தி வெளியீடு **எண் 765** (30 செப்டம்பர் 2026) — IITS தரமணி UGC NET திசம்பர் 2026 இலவசப் பயிற்சி
- துறை இணையதளம்: [${DIPR}](${DIPR})`;

  const analysisBody = `## சென்னை வாசகர்களுக்கு ஏன் முக்கியம்?

UGC NET பல முதுகலை மாணவர்களுக்கு **உதவிப் பேராசிரியர்** மற்றும் தொடர்புடைய கல்விப் பாதைகளுக்கான தகுதி வழி. தரமணியில் உள்ள மாநிலத் தமிழ் ஆராய்ச்சி நிறுவனத்தின் **இலவச வார இறுதி வகுப்புகள்** — **தமிழ் தாள் II** மற்றும் பொதுவான **தாள் I**-க்கு — தனியார் பயிற்சிக் கட்டணம் இல்லாமல் உதவுகின்றன.

இது **DIPR** அறிவிப்பு என்பதால் அரசுத் தகவலாகப் படியுங்கள்; வகுப்பறை விவரங்களை IITS-இடம் உறுதிப்படுத்துங்கள். தேர்வு நாட்காட்டி, விண்ணப்பம், அனுமதி அட்டை — **NTA / UGC** கட்டுப்பாட்டில்; இந்தப் பயிற்சி அந்த அறிவிப்புகளுக்குப் பதிலல்ல.

## அடுத்து என்ன செய்வது?

1. IITS-ஐ அழைத்து / மின்னஞ்சல் அனுப்பி தாள் (I, II அல்லது இரண்டும்), இடம், கடைசி வகுப்புத் தேதியைக் கேளுங்கள்.
2. தரமணி வகுப்பறை இருப்பையும் தேவையான அடையாளத்தையும் உறுதிப்படுத்துங்கள்.
3. **UGC NET திசம்பர் 2026** அதிகாரப்பூர்வ விண்ணப்ப சாளரத்தை NTA / UGC தளங்களில் தனியாகப் பின்தொடருங்கள் — இக்கட்டுரை தேர்வுக் கட்டணம் / கடைசித் தேதியை மீண்டும் எழுதவில்லை (வெளியீட்டில் இல்லை).
4. இந்த **இலவச** IITS வகுப்புக்குப் “பதிவு கட்டணம்” கேட்கும் மூன்றாம் தரப்பினருக்குப் பணம் செலுத்த வேண்டாம்.

## தொடர்புடைய வாசிப்பு — mychennaicity.in

- [English version](${PATH_EN})
- [Consumer தலைப்பு மையம்](/chennai-local-news/topic/consumer)
- [ஓஎம்ஆர் / பெருங்குடி / சோழிங்கநல்லூர் பகுதி மையம்](/areas/omr-perungudi-sholinganallur)
- [mychennaicity.in எப்படிப் பயன்படுத்துவது](/guides/how-to-use-mychennaicity)
- [DIPR தமிழ்நாடு](${DIPR})

## நுண்ணெழுத்து — AI உதவியுடன் எழுதப்பட்டது

இந்த அறிக்கை **AI உதவியுடன்** வரைவு செய்யப்பட்டு மனித ஆசிரிய மதிப்பாய்வுக்குப் பிறகு வெளியிடப்பட்டது.
AI கருவிகள் எண்களைத் தவறாகப் படிக்கலாம் அல்லது விவரத்தைத் தவறாகச் சேர்க்கலாம்.
முக்கியத் தகவல்களை IITS, DIPR அல்லது NTA / UGC முதன்மை ஆதாரங்களுடன் சரிபார்த்துச் செயல்படுங்கள்.`;

  return {
    slug: SLUG_TA,
    title:
      "தரமணி IITS-ல் UGC NET திசம்பர் 2026 இலவசப் பயிற்சி — அக்டோபர் 3 முதல் சனி/ஞாயிறு",
    summary:
      "உலகத் தமிழாராய்ச்சி நிறுவனம், தரமணி — UGC NET 2026 திசம்பர் கட்டணமில்லா நேரடி வகுப்புகள்: தமிழ் தாள் II சனி, தாள் I ஞாயிறு; 3 அக்டோபர் முதல். பிற கல்லூரி மாணவர்களுக்கும் திறந்தது.",
    dek: "DIPR செய்தி வெளியீடு 765: 044-2254 2992 / 90808 65906 / iitstaramani@gmail.com.",
    reportBody,
    analysisBody,
    category: "Consumer",
  };
}

async function upsertArticle(
  cityId: string,
  article: ReturnType<typeof buildEnglish>,
  publishedAt: Date,
) {
  const now = new Date();
  const body = `${article.reportBody}\n\n---\n\n${article.analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, cityId), eq(articles.slug, article.slug)))
    .limit(1);

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
    areaHubSlug: "omr-perungudi-sholinganallur",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO,
    sourceUrl: DIPR,
    sourceName:
      "Tamil Nadu DIPR press release No. 765 (30 Sep 2026) — free UGC NET Dec 2026 coaching at IITS Taramani",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items:
        article.slug === SLUG_EN
          ? [
              {
                question: "Is the IITS Taramani UGC NET coaching free?",
                answer:
                  "Yes. DIPR press release No. 765 says the December 2026 NET coaching classes are free of charge, including for students from other colleges and universities.",
              },
              {
                question: "When do the classes run?",
                answer:
                  "From 3 October 2026: Paper II (Tamil) every Saturday 10:00 AM–1:00 PM; Paper I (Teaching & Research Aptitude) every Sunday 10:00 AM–1:00 PM. Ask IITS when the series ends before the December exam.",
              },
              {
                question: "How do I register?",
                answer:
                  "Call 044-2254 2992, mobile 90808 65906, or email iitstaramani@gmail.com. The press release does not print an online form URL.",
              },
              {
                question: "Does this replace the official UGC NET application?",
                answer:
                  "No. This is free coaching at IITS. Exam forms, fees, and admit cards remain with NTA / UGC. Track those on official channels separately.",
              },
            ]
          : [
              {
                question: "IITS தரமணி UGC NET பயிற்சி இலவசமா?",
                answer:
                  "ஆம். DIPR செய்தி வெளியீடு எண் 765, 2026 திசம்பர் NET பயிற்சி வகுப்புகள் கட்டணமில்லா என்றும், பிற கல்லூரி / பல்கலைக்கழக மாணவர்களுக்கும் திறந்தது என்றும் கூறுகிறது.",
              },
              {
                question: "வகுப்புகள் எப்போது?",
                answer:
                  "3 அக்டோபர் 2026 முதல்: தாள் II (தமிழ்) ஒவ்வொரு சனி காலை 10–மதியம் 1; தாள் I ஒவ்வொரு ஞாயிறு காலை 10–மதியம் 1. திசம்பர் தேர்வுக்கு முன் வகுப்புகள் எப்போது முடியும் என்பதை IITS-இடம் கேளுங்கள்.",
              },
              {
                question: "பதிவு எப்படி?",
                answer:
                  "044-2254 2992, கைபேசி 90808 65906, அல்லது iitstaramani@gmail.com. வெளியீட்டில் ஆன்லைன் படிவம் URL இல்லை.",
              },
              {
                question: "இது அதிகாரப்பூர்வ NET விண்ணப்பத்திற்குப் பதிலா?",
                answer:
                  "இல்லை. இது IITS இலவசப் பயிற்சி மட்டுமே. தேர்வு விண்ணப்பம், கட்டணம், அனுமதி அட்டை NTA / UGC கட்டுப்பாட்டில் — அவற்றைத் தனியாகப் பின்தொடருங்கள்.",
              },
            ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-iits-net] Refreshed:", article.slug);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-iits-net] Inserted:", article.slug);
  }

  console.log(
    "[seed-iits-net] URL:",
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

  /** 30 Sep 2026 afternoon IST (PR date) */
  const publishedEn = new Date("2026-09-30T09:30:00.000Z");
  const publishedTa = new Date("2026-09-30T09:35:00.000Z");

  await upsertArticle(city.id, buildEnglish(), publishedEn);
  await upsertArticle(city.id, buildTamil(), publishedTa);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG_EN,
      label: "seed-iits-taramani-ugc-net",
    });
    await revalidateNewsAfterSeed({
      slug: SLUG_TA,
      label: "seed-iits-taramani-ugc-net-ta",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/*
X / Twitter draft (after live URL + hero deploy):

Free UGC NET coaching at IITS Taramani for the Dec 2026 cycle.

Sat: Paper II Tamil · Sun: Paper I · from 3 Oct · open to other college students too.

DIPR PR 765 · register: 044-2254 2992 / 90808 65906 / iitstaramani@gmail.com

https://mychennaicity.in/chennai-local-news/iits-taramani-ugc-net-free-coaching-december-2026

#Chennai #UGCNET #Taramani #TamilNadu #Education
*/
