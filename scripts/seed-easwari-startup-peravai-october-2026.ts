/**
 * Easwari Startup Peravai — reported preview of the 30–31 October 2026 summit.
 *
 * Dev:  `npm run db:seed:easwari-startup-peravai-october-2026`
 * Live: `npm run db:seed:easwari-startup-peravai-october-2026:live`
 *
 * Catalogue and fees read from startupperavai.in on 18 October 2026.
 * Launch day from Chennaionline, 18 September 2026.
 * Do not treat homepage headcounts or the ₹1 crore line as outcomes.
 * Do not copy placeholder Latin from three session-rule blocks.
 * Pitch Perfect: fee field ₹500, rules text ₹700. Print both.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const SLUG = "easwari-startup-peravai-ramapuram-october-2026";
const EVENT = "/chennai-local-events/easwari-startup-peravai-october-2026";
const HERO = "/images/articles/easwari-startup-peravai-october-2026.jpg";
const SITE = "https://www.startupperavai.in/";
const CATALOG = "https://www.startupperavai.in/events";
const BROCHURE =
  "https://www.startupperavai.in/assets/EVENT_BROCHURE-B6vO_Cz_.pdf";
const LOCAL_BROCHURE =
  "/documents/events/easwari-startup-peravai-2026-brochure.pdf";
const CHENNAIONLINE =
  "https://www.chennaionline.com/news/srm-easwari-innovation-centre-inaugurated-at-easwari-engineering-college/";
const TNM =
  "https://www.thenewsminute.com/tamil-nadu/sivarajah-ramanathan-steps-down-as-startuptn-chief";
const THEPRINT =
  "https://theprint.in/india/governance/social-justice-venture-lab-shark-tank-style-tv-show-what-tamil-nadus-new-start-up-policy-offers/1771120/";

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

  /** 18 Oct 2026, 1:30 p.m. IST */
  const publishedAt = new Date("2026-10-18T08:00:00.000Z");
  const now = new Date();

  const reportBody = `## Disclaimer

This is a MyChennaiCity report on a student summit at Easwari Engineering College, Ramapuram. Dates, halls, and fees are taken from the organiser’s site and session catalogue as they stood on 18 October 2026, from the organiser’s brochure, and from the published account of the 18 September launch. It is not an official notice from the college, StartupTN, or the Higher Education department. Passes, speakers, and halls can change. Check [startupperavai.in](${SITE}) before you travel or pay.

## Summary

**Chennai, 18 October 2026** — Easwari Startup Peravai, the student startup summit launched last month at Easwari Engineering College, opens on the Ramapuram campus on **Friday 30 October** and runs through **Saturday 31 October**.

The public catalogue lists seven sessions, from a CUMTA transport hackathon to a women-focused cohort and a two-day pitch. A visitor pass is priced at **free** on the registration screen. An event pass is **₹499**. Contest fees sit on top of that, from **₹200** to **₹1,500**.

The earliest clock on the catalogue is **9:00 AM**. A closing time is not published.

The college’s own site calls this Tamil Nadu’s biggest student startup summit and prints **8,000+** participants, **100+** founders and leaders, and an investment commitment of **up to ₹1 crore**. Those are organiser projections. Nothing in the September launch report, or on the catalogue, turns them into a count of people already registered or money already sanctioned.

![Easwari Startup Peravai poster for the summit at Easwari Engineering College, Ramapuram](${HERO})

*The poster is the organiser’s cover. Partners printed on it include StartupTN, TN RISE, and iTNT.*

A practical listing, with halls and phones, is on the [events page](${EVENT}).

## Who is holding it, and where

The host is **Easwari Engineering College (Autonomous)**, an SRM Group institution on **Bharathi Salai, Ramapuram, Chennai 600089**. The college’s brochure says it was established in the academic year **1996–97**, is affiliated to Anna University, and describes **15** undergraduate and **7** postgraduate programmes. It also describes a flagship ABB robotics centre. Those lines are the institution’s account of itself.

Peravai — பேரவை, a gathering — is the name the students and the college have given the summit. The site’s own line is “for the students, by the students,” in the college’s September launch posts, and the about-page calls it a bridge between classrooms and investors, with an explicit reach into tier-2 and tier-3 towns.

The partner named on the launch posts is **StartupTN**, the state startup mission under the Micro, Small and Medium Enterprises department. The October brochure also puts **TN RISE**, **iTNT** (the Tamil Nadu Technology Hub), and a women-and-children emblem on the cover.

Event queries go to **Hemachandra** on **97890 34548**, or **office@startupperavai.in**. Technical support is **70109 97679**.

## What “up to ₹1 crore” refers to

The homepage does not say a single cheque of ₹1 crore will be handed out on 31 October. The sentence under the figure is longer. It says promising startups will get access to funding, incubation, mentorship, and investment through three routes: the in-house **Dr R. Shivakumar Research and Innovation Foundation**, government grants, and “our network of investors and ecosystem partners.”

That foundation is the same Section 8 incubator the college named in May, when it hosted the Naturals Beauty Tech Hackathon. Winning teams there were offered six months of incubation through it. The ₹1 crore line at Peravai is a commitment the organiser is advertising. It is not a published sanction order, and it is a different number from the **₹1.5 crore** the SRM Easwari Alumni Association contributed toward the Innovation Centre building.

## How this summit got a launch date

Peravai is new. The college does not have a 2024 or 2025 edition to point to. The documented start is **Friday 18 September 2026**, on the same campus.

That morning the college inaugurated the **SRM Easwari Innovation Centre**. [Chennaionline’s report the same day](${CHENNAIONLINE}) names the chief guest as **P. Viswanathan**, Minister for Higher Education. With him: **Dr R. Shivakumar**, chairman; **Geetha Shivakumar**, vice-chairperson; **S. Niranjan**, co-chairman of the SRM Group institutions at Chennai Ramapuram and Trichy; and principal **Dr P. Deiva Sundari**.

The programme opened the centre, unveiled a board, and lit the kuthuvilakku. The alumni association’s ₹1.5 crore is recorded in that report as support for the building. Labs opened the same day: a PCB lab, a 3D-printing lab, a machinery lab, and a wood-cutter and fabrication room. The report then records two startup launches in the same function: an **Easwari StartupTN pre-incubation centre**, and **Startup Peravai**, described there as a startup conclave.

The college’s LinkedIn posts the next day repeat the minister’s launch and add the line the site still uses: ideas should be something students do, not only something they hear about, with a stated emphasis on women entrepreneurs and students from smaller cities.

The Peravai homepage also carries a caption of the team with the MSME minister and the StartupTN chairman. It does not name either person or date that meeting. This report does not supply the names.

## The longer arc, which is the state’s, not the college’s

StartupTN itself is older than this summit.

Tamil Nadu’s first startup policy ran from **2018**. A nodal mission came later. [ThePrint’s account of the 2023 policy](${THEPRINT}), published on 21 September 2023, describes StartupTN as the agency launched in **2021** inside the MSME department. Chief Minister M.K. Stalin released the Tamil Nadu Startup and Innovation Policy 2023 that week. The 2023 document is the one that carried a ₹100-crore co-creation fund and a set of inclusion instruments. It is state policy. It is not a budget line inside Peravai.

**Sivarajah Ramanathan** took charge as mission director and CEO on **5 January 2022**. He left in **June 2026**. [The News Minute reported on 25 June](${TNM}) that the government had accepted his resignation and given additional charge of the CEO’s post to **L. Nirmal Raj**, Industries Commissioner, until further orders. Ramanathan’s own account, which that report carries, says DPIIT-recognised startups in Tamil Nadu grew from **2,032** in 2021 to **more than 14,700** during his tenure. That is StartupTN’s figure for the state, not a Ramapuram registration count.

The first StartupTN pre-incubation centre Ramanathan himself inaugurated was at Thiagarajar School of Management in Madurai, in February 2025, as part of a stated plan for many such centres. Easwari’s pre-incubation centre, opened on 18 September 2026, sits in that programme. It is the Ramapuram node, not the first node in Tamil Nadu.

The Peravai guest row lists **Singai G. Ramachandran** as chairperson of StartupTN. That title is what the summit site prints. This desk has not matched it to a government order in the sources used here, and it is a different post from the CEO’s chair Nirmal Raj was asked to hold in June.

## What the campus ran before it had the Peravai name

Three earlier campus events are the brochure’s “previous events” page. Two of them have dates in the college’s own posts. One does not.

**Naturals Beauty Tech Hackathon, 15 and 16 May 2026.** The Department of Information Technology and the Shivakumar foundation hosted it at the TRP Auditorium with Naturals Salon & Spa and StartupTN. The college called it a 36-hour AI hackathon for beauty and wellness, from 9:30 AM. The college’s valedictory post names **Team Beauty IQ** as winner at **₹1,00,000**, a first runner-up from IIIT Naya Raipur at **₹50,000**, and second runners-up at **₹25,000**, including teams from Easwari, Anna University, Ramco Institute of Technology, and Mindrix AI, Coimbatore. Actress **Aishwarya Rajesh** and chairman Dr R. Shivakumar were at the valedictory. StartupTN’s later post says **50** teams took part, **12** reached the final, and **six** winners shared a pool of over **₹2 lakh**, with six months of incubation at the Shivakumar foundation. Its winner list names BeautyIQ (₹1 lakh), SkinSense AI (₹50,000), and Style Sage, ZenithZ, Mindtrix AI, and AR Frontiers at ₹25,000 each. The two posts agree on the top of the prize table and describe the same hackathon. They do not use the same set of names underneath.

**AI Day for Startups 2026.** The Department of Artificial Intelligence and Data Science posted a conclusion on **6 June 2026**. It describes the day as the first such Google for Developers and StartupTN programme hosted in Chennai at the college. The welcome on that account was by **Enisha Kalita** of Google. The opening keynote was by Sivarajah Ramanathan, who was still mission director that week. A panel on AI stacks included Vishesh Rajaram (Speciale Invest), Viswanath Ganesan (Yoloworks), Alex Duraisamy (TCS), and Murali Sethuraman (HCLTech), moderated by Shakthi Kumar of Renambl. **Suraj Pujari** of Google Cloud took a session on Google’s AI stack and, with Belal Khan and Jitendra Gupta, launched a “Build with Google AI” hackathon. The post does not print a separate calendar date from the day of the write-up.

**Startup Mudhal Padi.** The brochure calls this an idea-stage competition at the college, with mentoring and a pitch. It does not print a date. A photograph on the same spread shows a board that reads Startup Mudhal Padi and a **₹25,000** cash-prize line. That is all the brochure establishes. It is a different event from StartupTN’s **Mudhal Padi 2.0** hackathon for Karur, Erode, and Tiruppur, which was scheduled for 25 September 2026. The names rhyme. The geographies do not.

## What the two October days actually list

The catalogue at [startupperavai.in/events](${CATALOG}) is the page a student pays against. On 18 October it had seven sessions. Brochure lines that do not appear there are kept separate, below.

| Session | Who | When | Hall | Fee on the catalogue |
| --- | --- | --- | --- | --- |
| Hackathon, with CUMTA | Teams of 3–5 | Both days, 1:00 PM onwards | MLCP labs | ₹1,500 |
| Rupees to Reality | Up to 3 | Day 1, 12:00 PM onwards | Academic Block | ₹600 |
| Pitch Perfect, with Nebula | 1–5 people | Both days, 12:00 PM onwards | Listed only as “EEC” | ₹500 in the fee field |
| ScaleUp Studio | Up to 3 | Day 2, 9:00 AM onwards | Academic Block | ₹600 |
| Rise Her, with TN RISE | Individual | Both days, 9:00 AM onwards | MBA Seminar Hall 1 | ₹200 |
| Design Thinking Bootcamp | Individual | Both days, 11:30 AM onwards | MBA Seminar Hall 2 | ₹500 |
| The Art of Selling Nothing | Solo | Day 1, 9:00 AM onwards | Hi-Tech Hall 2 | ₹200 |

**Hackathon.** The Chennai Unified Metropolitan Transport Authority is the named partner. The brief is 24 hours to prototype something about how Chennai moves: streets, public transport, commuters, technology. Problem statements come out on the day. The team leader registers and pays for the members. ID cards are mandatory, and the rules say teams report 15 minutes early. Unfair or copied work is grounds for disqualification, and the judges’ decision is final.

**Rupees to Reality.** Teams get a virtual budget and a price list of Idea Lab equipment. They do not receive the equipment in the room. They design a project against one or more UN Sustainable Development Goals and are judged on the idea, the resource plan, creativity, and whether it could be built. The page says the winning team can try to build it at the Innovation Centre during Peravai. The rules block under that description is still placeholder Latin. This report does not treat that Latin as the rules.

**Pitch Perfect.** In partnership with Nebula. Day 1 is a preliminary pitch: problem, solution, model, market. Day 2 is a finale in front of investors for whoever is shortlisted. Five minutes to present, three minutes of questions, slides as PPT or PDF, prototypes encouraged. Here the site disagrees with itself. The fee field is **₹500**. The rules paragraph says the team leader pays **₹700**. Pay only after the checkout shows one figure.

**ScaleUp Studio.** Teams pick an existing brand and rebuild its identity, design, technology, and business model for a younger market, then present to a jury. The rules block on this page is also unfinished, including a heading that still reads “nee solu” above Latin filler. The description above that block is the part that is written.

**Design Thinking Bootcamp.** A workshop for students who have an idea, or only a problem, led on the page by **Lavanya G**, described there as an entrepreneurship coach. The method it names is the usual one: user, problem, assumptions, test. The fee field is ₹500. The rules underneath are Latin placeholder text, including lines about certification and laptops that sit inside that placeholder. Do not plan around those lines until the college replaces them.

**The Art of Selling Nothing.** Solo. You are handed an illogical product on the spot and asked to sell it. Scoring, as written, covers audience, pitch, persuasion, branding, and composure. Fee ₹200. The product is not disclosed in advance, which is the point of the session.

**Rise Her.** The description says a women-only cohort, mentorship, and a path to stay inside **TN RISE** after the summit. The rules line on the same card says the session is “open to all interested participants.” Both sentences are on the organiser’s page. A student who is deciding whether the hall is women-only should ask Hemachandra before paying ₹200. The fee field and the hall (MBA Seminar Hall 1, both days from 9:00 AM) are unambiguous. The eligibility line is not.

## Passes

The registration screen has two products.

| Pass | Price on the site | What the site says it is for |
| --- | --- | --- |
| Visitor pass | Free | Entry for a visitor |
| Event pass | ₹499 | Required before contest registration |

Contest fees are listed separately, so a hackathon team should expect the event-pass gate and the **₹1,500** catalogue fee, with the team leader paying for members. The site does not print a worked example of the final Razorpay total. The checkout is the number that counts.

Terms on the homepage: a pass is shown at the gate; it cannot be refunded or transferred; if you enter two sessions, overlapping clocks are your problem; the college can change the schedule; and it is not liable for a cancellation caused by weather, a government order, or an emergency.

## Who is on the October guest row

The site’s “Our guests” strip, with the titles it prints:

- **Mohan K**, co-founder, IppoPay
- **C.K. Kumaravel**, co-founder, Naturals Salon & Spa
- **Singai G. Ramachandran**, listed as chairperson, StartupTN
- **Dilip Kumar Devanathan**, senior vice president, HCL Technologies
- **Balaji Arumugam**, founder and CEO, Big Bucks Innovation
- **Rajalingam Rathinam**, founder, director and chairman, NestOne Group
- **Reji Joseph**, CEO, Infinity Advisors
- **Rohini Manohar**, founder, Chennai Yoga Studio and Mitra Yoga Fest
- **Bharathan Prahalad**, HR leader, Aziro (formerly MSys Technologies)

There is no session grid that places these nine in a hall at a time. Treat the strip as the college’s invited-guest list, and expect it to move. The terms already reserve that right.

A different page in the brochure is headed **“Our previous guests.”** Those names belong to earlier campus programmes, not automatically to 30 October. The page includes Dr A. Amalraj, IPS, then Commissioner of Police, Greater Chennai; Adityaram of the Adityaram Group; Subrata Karmakar of ABB Robotics India; Enisha Kalita of Google; Rajendran Dandapani of Zoho; Dawn Ohlson of the Institution of Engineering and Technology in the UK; Vinod Krishnan of TVS Next; Dhandapani Rajabathar of Embien; and Dr Subramani Ramakrishnan of the UPS India Technology Centre. Enisha Kalita’s name also sits on the June AI Day write-up, which is why she is in both places.

## What the brochure promises beyond the catalogue

The brochure’s collaborator page is wider than the seven sessions.

| Partner on the brochure | Role the brochure assigns | What the catalogue shows |
| --- | --- | --- |
| CUMTA | 24-hour innovation hackathon | The hackathon session |
| TN RISE | A cohort for women founders | Rise Her |
| Startup Singam | A “shark tank” for startups | No session by that name |
| iTNT | Deep-tech partner | No separate deep-tech session |
| Airtel | Outreach partner | No session |

The registration form inside the site still has an attendee role labelled “Shark Tank Participant.” The public catalogue does not list a shark-tank session. Until it does, Startup Singam’s tank is a brochure line, not a hall you can book.

Other marks on the ecosystem page, without a session attached, include TN Skill, JETRO, Aspire for Her, Impactree, ICC, Overqualified Housewives, Logitech, and TN WESAFE. The college’s centres-of-excellence page in the same PDF is a map of existing industry labs (ABB, Ansys, Cadence, Cisco, Hitachi, Nokia, Oracle, Siemens, and others). Those labs are part of the campus. They are not, on this document, a menu of Peravai workshops.

The brochure also says the college and StartupTN have already run a Naturals beauty hackathon, Startup Mudhal Padi, and a Google AI summit. The first and the third match the May and June record above.

## At a glance

- **What:** Easwari Startup Peravai, a student startup summit
- **When:** 30 and 31 October 2026, first session 9:00 AM, close time unpublished
- **Where:** Easwari Engineering College, Bharathi Salai, Ramapuram, Chennai 600089
- **Launched:** 18 September 2026, by Higher Education Minister P. Viswanathan, with the Innovation Centre
- **Visitor pass:** free on the registration screen
- **Event pass:** ₹499
- **Sessions:** seven, fees ₹200 to ₹1,500
- **Phone:** Hemachandra, 97890 34548
- **Listing:** [Chennai local events](${EVENT})

## Sources

- [Easwari Startup Peravai](${SITE}) — homepage, passes, guests, and terms, read 18 October 2026
- [Session catalogue](${CATALOG}) — seven sessions, halls, clocks, and fees
- [Official brochure PDF](${BROCHURE}) — college note, previous events, collaborators, previous guests, address
- [Copy of the brochure on this site](${LOCAL_BROCHURE})
- [Chennaionline, 18 September 2026](${CHENNAIONLINE}) — Innovation Centre inauguration, alumni contribution, pre-incubation centre, and the Peravai launch
- College posts on the May beauty-tech hackathon and the 6 June 2026 AI Day for Startups conclusion
- [The News Minute, 25 June 2026](${TNM}) — Sivarajah Ramanathan steps down; Nirmal Raj given additional charge
- [ThePrint, 21 September 2023](${THEPRINT}) — StartupTN’s origin and the 2023 policy`;

  const analysisBody = `## The number that matters is the one on the checkout

A campus that says “8,000+” and “up to ₹1 crore” is advertising a room it hopes to fill. The room that exists today is specific. Seven sessions. Named halls inside one college on Bharathi Salai. A free visitor pass if you want to walk the expo and the talks, and a ₹499 event pass if you want to compete. The hackathon is the expensive ticket, at ₹1,500 on the catalogue, and it is the one tied to a public agency with a real Chennai problem: how the city moves.

That is a better offer than the slogan, and a narrower one. CUMTA will not reveal the problem statement until the day. Pitch Perfect has two prices on one page. Rise Her has two eligibility lines. Three sessions still have Latin where the rules should be. A student who pays on the strength of the poster, and then discovers the hall or the fee moved, will be inside the organiser’s own terms, which already allow the change and refuse a refund.

## What to do before you pay

Decide which single session you are entering. The terms put the overlap risk on you.

If it is Pitch Perfect, stop on the payment screen and read the rupee figure. If it is Rise Her, ask whether the hall is women-only. If it is the bootcamp, Rupees to Reality, or ScaleUp Studio, ask for the real rules, because the page has not finished them. If it is the hackathon, budget for a team of three to five, a team-leader payment, and a brief you will see only after you arrive.

Carry an ID. The sessions that have finished rules all say the card is mandatory.

The guest list is worth attending for, if the nine people on it are actually in the building. Kumaravel’s Naturals partnership is already real: the May hackathon happened. Ramachandran’s chairperson title needs a government source this page does not have. Neither fact is a reason to skip the summit. Both are reasons to treat a printed name as a name, and a stage time as something you confirm that morning.

## What this desk will check after 31 October

Whether the seven sessions ran in the halls named here. Whether Pitch Perfect charged ₹500 or ₹700. Whether a Startup Singam session appeared. Whether the ₹1 crore line became a published award, a grant, or stayed a sentence. And whether the visitor pass was in fact free at the gate.

Until then, the useful page is the [catalogue](${CATALOG}), and the phone is **97890 34548**.

## Fine print

This report was prepared with AI-assisted drafting and human editorial review. AI tools can err. Cross-check halls, fees, and eligibility on [startupperavai.in](${SITE}) before you pay. The ₹1 crore line and the 8,000-person line are the organiser’s claims. Placeholder rule text on the organiser’s site is not reproduced here as if it were a finished rule.`;

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
      "Easwari Startup Peravai opens in Ramapuram on 30 October. Here is what the two days actually list",
    summary:
      "The student summit at Easwari Engineering College runs 30–31 October 2026. A visitor pass is free, an event pass is ₹499, and seven contests list their own fees. The 8,000-person and ₹1 crore lines are the organiser’s claims.",
    dek: "Launched by the Higher Education Minister on 18 September, the Ramapuram summit now has a catalogue, a guest row, and several fees that do not yet agree with each other.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: HERO,
    areaHubSlug: "valasaravakkam-porur",
    sourceUrl: SITE,
    sourceName: "Easwari Startup Peravai",
    authorByline: "mychennaicity.in editorial",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question: "When and where is Easwari Startup Peravai?",
          answer:
            "Friday 30 and Saturday 31 October 2026 at Easwari Engineering College, Bharathi Salai, Ramapuram, Chennai 600089. The earliest session on the catalogue starts at 9:00 AM. A closing time is not published.",
        },
        {
          question: "Is entry free?",
          answer:
            "The registration screen prices a visitor pass at free and an event pass at ₹499. Contests list separate fees from ₹200 to ₹1,500. The site says an event pass is required before contest registration.",
        },
        {
          question: "Who launched Startup Peravai?",
          answer:
            "Higher Education Minister P. Viswanathan launched it on 18 September 2026 at the inauguration of the SRM Easwari Innovation Centre, with chairman Dr R. Shivakumar, vice-chairperson Geetha Shivakumar, co-chairman S. Niranjan, and principal Dr P. Deiva Sundari.",
        },
        {
          question: "What should I check before I pay?",
          answer:
            "Pitch Perfect shows ₹500 in the fee field and ₹700 in the rules text. Rise Her is described as women-only and, in the rules line, as open to all interested participants. Three sessions still have placeholder rules. Confirm the figure on the checkout screen.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-easwari-startup-peravai] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-easwari-startup-peravai] Inserted article:", SLUG);
  }

  console.log(
    "[seed-easwari-startup-peravai] Public URL:",
    `https://mychennaicity.in/chennai-local-news/${SLUG}`,
  );

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-easwari-startup-peravai",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
