/**
 * Chennai SSR 2027 special voter camps — 21, 22 and 29 November 2026.
 *
 * Dev:  `npm run db:seed:chennai-ssr-voter-camps-november-2026`
 * Live: `npm run db:seed:chennai-ssr-voter-camps-november-2026:live`
 *
 * Sources: GCC PR No. 695 (19 Nov 2026); CEO Tamil Nadu AC-wise draft
 * (12 Nov 2026); The Hindu (12 and 13 Nov 2026); ECI Forms 6 and 8.
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

const GCC_PR =
  "https://www.chennaicorporation.gov.in/news/news_20261119_2.pdf";
const CEO_AC =
  "https://elections.tn.gov.in/ACwise_Gendercount_12112026.aspx";
const HINDU_DRAFT =
  "https://www.thehindu.com/news/cities/chennai/chennai-draft-electoral-roll-records-2914-lakh-voters/article71692763.ece";
const HINDU_CAMPS =
  "https://www.thehindu.com/news/national/special-camps-for-electoral-roll-revision-on-november-21-22-and-29/article71695162.ece";
const FORM_6 = "https://voters.eci.gov.in/formspdf/Form_6_English.pdf";
const FORM_8 = "https://voters.eci.gov.in/formspdf/Form_8_English.pdf";
const FORM_6_GUIDE = "https://voters.eci.gov.in/guidelines/Form-6_en.pdf";
const FORM_8_GUIDE = "https://voters.eci.gov.in/guidelines/Form-8_en.pdf";
const VOTERS = "https://voters.eci.gov.in/";
const SEARCH = "https://electoralsearch.eci.gov.in/";
const CEO_HOME = "https://elections.tn.gov.in/";

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

const SLUG = "chennai-ssr-voter-camps-november-2026";

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found. Run db:seed first.");
    process.exit(1);
  }

  const publishedAt = new Date("2026-11-22T03:45:00.000Z");
  const now = new Date();

  const reportBody = `## Key takeaways

- Greater Chennai Corporation Press Release No. 695 (19 November 2026) asks residents to use special electoral-roll camps on **Saturday 21 November, Sunday 22 November and Sunday 29 November 2026**, from **10:00 AM to 5:00 PM**, at polling-station locations in all **16 Assembly constituencies** of the Chennai election district.
- The integrated draft roll was published on **12 November 2026**. It lists **29,14,908** electors and **4,071** polling stations. Claims and objections run until **11 December 2026**. The qualifying date reported for this revision is **1 January 2027**. The final roll is scheduled for **4 January 2027**.
- At the camp you can check the printed draft and submit **Form 6** (new enrolment), **Form 6A** (overseas elector), **Form 7** (objection or deletion) or **Form 8** (shifting, correction, replacement EPIC, or marking as a person with disability). These are the four forms named by the Chief Electoral Officer for this claims window.
- There is no fee for these forms or for the elector photo identity card. Do not pay anyone outside the booth.
- If your flat is in Perungudi, Sholinganallur, Ambattur, Madhavaram, Thiruvottiyur, Pallavaram, Tambaram or Alandur, you may be outside the Chennai election district even though you pay property tax to the Corporation. Use the booth for your own Assembly constituency. The same three dates were announced statewide.

## At a glance

| Item | What is published |
| --- | --- |
| Camp dates | 21, 22 and 29 November 2026 |
| Hours in Chennai election district | 10:00 AM to 5:00 PM |
| Where | Polling-station locations in the 16 Chennai Assembly constituencies |
| Draft published | 12 November 2026, Ripon Buildings |
| Electors on the Chennai draft | 29,14,908 (14,04,968 men, 15,09,040 women, 900 third gender) |
| Polling stations | 4,071, eight fewer than the 4,079 stations on 6 April 2026 |
| Claims and objections | 12 November to 11 December 2026 |
| Qualifying date | 1 January 2027 |
| Final roll | 4 January 2027 |
| Forms named by the CEO | 6, 6A, 7 and 8 |
| Fee | None |

## Disclaimer

This is civic journalism for Chennai residents. It is not an Election Commission order, not a Greater Chennai Corporation circular, and not legal advice. It summarises Press Release No. 695, the Chief Electoral Officer’s draft-roll table dated 12 November 2026, reporting in The Hindu and The New Indian Express, and the English text of Election Commission Forms 6 and 8 and their filling guidelines.

Your polling station, part number and serial number come from the roll entry for your house, not from a neighbourhood nickname in this article. If a Booth Level Officer, Electoral Registration Officer or a later notification gives a different date, form or document, follow that instruction. Check your own name on the draft before you assume you are enrolled. Nothing here alleges misconduct by any official, party or resident.

## Why this weekend is the practical window

An electoral roll is the list that decides whether you are handed a ballot. The plastic voter card, the EPIC, is a photo identity document. It does not, by itself, keep a name on the current roll. During the year, booths are merged or split, street spellings are standardised, and field visits mark people as shifted when a flat is locked. The Special Summary Revision is the annual clean-up that sits on top of that continuous updating.

For Chennai, the District Election Officer is the Greater Chennai Corporation Commissioner. On 12 November 2026, G.S. Sameeran released the draft roll for the Special Summary Revision of electoral rolls, 2027, at Ripon Buildings, with representatives of recognised political parties present. The Corporation’s 19 November press note then fixed three camp days at every polling-station location in the 16 constituencies the Chennai election district actually controls.

Sunday 22 November is the middle of those three days. Sunday 29 November is the last camp day in this series. The claims window itself stays open on working days until 11 December, at the Booth Level Officer and at the Electoral Registration Officer or Assistant Electoral Registration Officer. The camps matter because that is when the officer who holds the printed part for your street is sitting in the school or hall where you vote, with forms, instead of you having to take a weekday off for a zonal office.

## What the 12 November draft contains

The Hindu, quoting the Corporation, reported these district figures. They match the Chief Electoral Officer’s Assembly-wise gender table for “2-Chennai” on 12 November 2026.

- **29,14,908** electors in all: **14,04,968** men, **15,09,040** women and **900** third-gender electors.
- **4,071** polling stations, against **4,079** on 6 April 2026. That is a net cut of eight stations.
- The roll of 6 April 2026 had **28,93,505** electors. The draft is **21,403** higher.
- Between 6 April and 31 October 2026, continuous revision **added 34,999** names (15,762 men, 19,197 women and 40 others) and **deleted 13,596** (6,510 men, 7,078 women and eight others). The arithmetic is the same net rise of 21,403.
- Inside the draft: **46,200** electors aged 18 or 19, **28,159** aged above 85, **12,805** electors with disabilities, and **531** service electors.
- Perambur is the largest constituency on this draft, with **2,28,139** electors. Velachery has **2,19,352**. Kolathur has **2,13,539**. Harbour is the smallest, with **1,20,852**.
- Velachery has the most polling stations, **314**. Harbour has the fewest, **192**.
- The Hindu reported that station counts were unchanged in several constituencies, while Chepauk-Thiruvallikeni lost five stations, and Thousand Lights and Mylapore lost two each. If you voted at a particular school last time, look up the part again. A merged or shifted station will not announce itself on your old EPIC.

The New Indian Express, reporting the same release, placed these numbers in a longer city story. It said the roll before the Special Intensive Revision had **40,04,694** names; the December 2025 draft had come down to **25,79,676**; the final roll of 23 February 2026 had climbed back to **28,30,936**; and the 6 April 2026 base used for this summary revision was **28,93,505**. Those earlier figures are that paper’s account of the intensive revision, not a line in the Corporation’s 19 November camp note. They are still the reason many households should look themselves up. A card issued before that intensive revision is not proof that the 12 November draft still carries the name.

The draft is available for inspection at Electoral Registration Officer and Assistant Electoral Registration Officer offices and at polling-station locations, and through the Chief Electoral Officer’s website. The camp is the easiest place to see the paper part for your street and to file a form in the same visit.

## What you can do at the camp

The Corporation note asks three groups to come with documents: eligible residents whose names are missing, young and first-time voters who want to register, and anyone who needs a correction. The Chief Electoral Officer’s note for the whole state, reported by The Hindu on 13 November, is wider. During the claims and objections period, an elector or an eligible citizen may submit Form 6, 6A, 7 or 8 for enrolment, deletion, correction or transposition. Filled forms can be given at the camps. They can also be given to the Booth Level Officer, the Electoral Registration Officer or the Assistant Electoral Registration Officer on a working day.

In plain language, a camp visit can be any one of these:

- You read the printed part and confirm your name, your relative’s name, your age, your house number and your booth.
- You enrol for the first time on Form 6, if you are an Indian citizen, ordinarily resident in that constituency, and not already on a roll.
- You enrol from abroad on Form 6A, if you hold an Indian passport and have not taken another country’s citizenship.
- You object to an entry, or ask for a deletion, on Form 7. That includes a death, a person who has permanently left, or a duplicate.
- You shift your own entry to a new address, correct a wrong entry, ask for a replacement card, or ask to be marked as a person with disability, on Form 8.

Do not treat a neighbour’s WhatsApp forward as the list of services. The form the officer gives you is the operative one. Older pages on the voter portal still mention Form 8A for a shift inside the same constituency and Form 6 for a shift to another constituency. The form now hosted as Form 8 is titled as the application for shifting of residence, correction of entries, replacement of the EPIC, and marking of a person with disability. The Chief Electoral Officer’s November instruction names Form 8 for transposition. If a desk still hands you an older form, fill the one the officer accepts and keep the acknowledgement.

## Dates that sit around the camps

The sequence published for this revision is short enough to keep on a phone.

1. **6 April to 31 October 2026.** Continuous updating. Additions and deletions in that window are already baked into the draft.
2. **12 November 2026.** Integrated draft published. Claims and objections open. Qualifying date reported as 1 January 2027.
3. **21, 22 and 29 November 2026.** Special camps at polling stations, 10:00 AM to 5:00 PM in the Chennai election district.
4. **11 December 2026.** Last day reported for claims and objections.
5. **4 January 2027.** Final roll scheduled for publication.

A form handed in on 29 November is a claim. It is not yet a line in the final roll. The Electoral Registration Officer still has to process it. That is why the acknowledgement or reference number matters more than a verbal “it will be done” at the table.

All India Radio’s report on the statewide draft said people who complete 18 on **1 January, 1 April, 1 July or 1 October 2027** may also apply in the forms. The Hindu’s Chennai report said people who turn 18 on or before **1 January 2027**, and people whose names are missing, can apply at the camps. Those two sentences are not identical. If you or your child turn 18 later in 2027, ask the Booth Level Officer which qualifying date the form in front of you is using, and do not rely on a summary to stretch the date.

## The 16 constituencies in the Chennai election district

The Corporation’s camp note covers the Chennai election district only. On the Chief Electoral Officer’s table that district is “2-Chennai”, Assembly constituencies **11 to 26**. Totals below are the draft of 12 November 2026. They will change when claims are decided and the final roll is published on 4 January 2027.

| AC | Name on the CEO table | Men | Women | Third gender | Total |
| --- | --- | --- | --- | --- | --- |
| 11 | Dr. Radhakrishnan Nagar | 95,541 | 1,04,371 | 100 | 2,00,012 |
| 12 | Perambur | 1,10,483 | 1,17,577 | 79 | 2,28,139 |
| 13 | Kolathur | 1,02,580 | 1,10,923 | 36 | 2,13,539 |
| 14 | Villivakkam | 79,161 | 85,333 | 33 | 1,64,527 |
| 15 | Thiru-Vi-Ka-Nagar (SC) | 87,689 | 95,351 | 69 | 1,83,109 |
| 16 | Egmore (SC) | 67,938 | 71,733 | 61 | 1,39,732 |
| 17 | Royapuram | 77,438 | 82,748 | 60 | 1,60,246 |
| 18 | Harbour | 60,043 | 60,747 | 62 | 1,20,852 |
| 19 | Chepauk-Thiruvallikeni | 80,875 | 86,189 | 60 | 1,67,124 |
| 20 | Thousand Lights | 75,840 | 82,978 | 72 | 1,58,890 |
| 21 | Anna Nagar | 91,476 | 98,747 | 46 | 1,90,269 |
| 22 | Virugampakkam | 97,908 | 1,04,658 | 50 | 2,02,616 |
| 23 | Saidapet | 98,957 | 1,06,156 | 63 | 2,05,176 |
| 24 | Thiyagarayanagar | 77,171 | 83,041 | 35 | 1,60,247 |
| 25 | Mylapore | 95,989 | 1,05,062 | 27 | 2,01,078 |
| 26 | Velachery | 1,05,879 | 1,13,426 | 47 | 2,19,352 |
|  | Chennai district total | 14,04,968 | 15,09,040 | 900 | 29,14,908 |

Two numbering points catch people out. Thiru-Vi-Ka-Nagar (reserved) is constituency **15**. Egmore (reserved) is constituency **16**. Swapping those numbers sends you to the wrong office. The CEO spells constituency 22 as Virugampakkam; many residents say Virugambakkam. Constituency 24 is Thiyagarayanagar, the seat people call T. Nagar. Use the number and the part, not the nickname, when you fill the form.

These seats are a map of the older Chennai district, not of every GCC zone. A street can sit in a different constituency from the one its shopping landmark suggests. Anna Nagar is not “everywhere west of Kilpauk”. Velachery is not “everywhere south of the Adyar”. Before you leave home, search your EPIC or your name and read the constituency number on the result. The camp for that part is the one that can see your page of the roll.

Harbour’s 1,20,852 electors, the smallest total in the district, still include 60,043 men, 60,747 women and 62 third-gender electors, the split The Hindu repeated from the city release. Small does not mean quiet. George Town, Parrys and the harbour streets have dense house numbers, lodges and old door numbers that do not match a courier’s address. Take the document that shows the ordinary residence you are claiming, and ask the officer to match it to the spelling on the part cover.

Velachery’s 314 stations are the other extreme. A school compound there can hold several parts. The poster at the gate, not the name of the school alone, tells you which room has your street.

## If you live in GCC limits but not in constituencies 11 to 26

Greater Chennai’s municipal map and the Chennai election district are different shapes. The same Chief Electoral Officer table that lists the 16 city seats also lists large urban seats under other districts. These are draft totals for 12 November 2026, published on the same page:

| AC | CEO district label | Name on the table | Total electors |
| --- | --- | --- | --- |
| 5 | Thiruvallur | Poonamallee (SC) | 3,72,249 |
| 6 | Thiruvallur | Avadi | 4,39,953 |
| 7 | Thiruvallur | Maduravoyal | 3,77,267 |
| 8 | Thiruvallur | Ambattur | 3,39,397 |
| 9 | Thiruvallur | Madavaram | 4,37,465 |
| 10 | Thiruvallur | Thiruvottiyur | 2,46,927 |
| 27 | Chengalpattu | Shozhinganallur | 5,58,729 |
| 28 | Kancheepuram | Alandur | 3,04,415 |
| 30 | Chengalpattu | Pallavaram | 3,38,686 |
| 31 | Chengalpattu | Tambaram | 3,32,636 |

Shozhinganallur is the CEO’s spelling of the seat residents call Sholinganallur. It is the largest of these urban seats on this draft, at 5,58,729 electors, and it is listed under Chengalpattu, not under Chennai. Perungudi, Thoraipakkam, Karapakkam, Sholinganallur and neighbouring OMR stretches need that seat’s own part numbers, not a Velachery booth, unless the search result actually says constituency 26.

The Hindu’s statewide story said the Chief Electoral Officer had announced special camps on 21, 22 and 29 November at designated locations across Tamil Nadu, for the same claims period of 12 November to 11 December. The 10:00 AM to 5:00 PM line in Press Release No. 695 is written for the 16 Chennai constituencies. If you vote in Ambattur, Madavaram, Sholinganallur, Tambaram or Alandur, go to your own polling station on those dates and confirm the hours there. Do not travel to a school inside constituencies 11 to 26 because a city WhatsApp note said “all of Chennai”.

## Form 6: first enrolment

Form 6 is the application for inclusion as a new elector. Use it if you are a citizen, you are ordinarily resident at the address you write down, you meet the qualifying age for the date the form is tied to, and you are not already enrolled anywhere in India.

The English form asks for the constituency, your name, a relative’s name and the relationship, gender, date of birth, and the full ordinary residence with house or flat number, street, town, post office, PIN, taluk and district. It asks you to attach a self-attested age proof and a self-attested address proof. It also carries a declaration, including that you are ordinarily resident at that address and that you are not enrolled elsewhere.

That last point is the one that creates duplicate cards. If you already have an EPIC in Coimbatore, Bengaluru, or another Chennai constituency, you are not a new elector. Shifting is Form 8, made to the Electoral Registration Officer of the constituency where you now live. A fresh Form 6 on top of a live enrolment is how the same person ends up on two rolls. The form you sign says you are not already enrolled. A false declaration in an electoral application is an offence. When in doubt, ask the officer to search the old EPIC before anyone ticks “new voter”.

The filling guidelines for Form 6 say a self-attested copy of one of the documents printed on the form speeds up registration. If you have none of those age documents, you may enclose another document, and you can be asked to appear before the Electoral Registration Officer or an officer designated by that office. The same guidelines say students who are eligible may enrol either at a parent’s place or at the hostel or mess where they ordinarily reside. They also say homeless citizens and others with no documentary proof of residence can be verified in the field. Lack of a sale deed is not, by itself, the end of an application. It does change the path: the officer has to verify.

Age documents printed on Form 6, any one of them, are:

1. Birth certificate issued by a competent local body, municipal authority, or Registrar of Births and Deaths.
2. Aadhaar.
3. PAN card.
4. Driving licence.
5. Class X or Class XII certificate issued by CBSE, ICSE or a State board, if it contains the date of birth.
6. Indian passport.

If none of those is available, the form has a line for any other age document. A school identity card is not on that list. Carry the mark sheet or birth certificate if you have it.

Address documents printed on Form 6, any one of them, in the name of the applicant or of a parent, spouse or adult child already enrolled at the same address, are:

1. Water, electricity or gas connection bill for that address. The form’s own words are “at least 1 year”. Take the bill you have and let the officer say whether it satisfies that line. A mobile-phone bill is not on the list.
2. Aadhaar.
3. Current passbook of a nationalised or scheduled bank, or of a post office.
4. Indian passport.
5. Revenue department land-owning records, including Kisan Bahi.
6. Registered rent or lease deed, for a tenant.
7. Registered sale deed, for an owner.

There is again a line for any other residence document if none of those is available. The form says field verification is then required. A registered lease is on the list. An unregistered stamp-paper agreement is not one of the seven named documents. If that is all you have, say so on the “any other” line and expect a verification visit rather than an instant acceptance.

The guidelines also say the full postal address, including the PIN, should be written out. In Chennai that means the door or flat number as you want it on the roll, the street spelling the booth already uses, and the PIN of the post office that actually delivers there. Popular names and Corporation names diverge on many roads. Ask the officer to show you the cover of the part. Copy that spelling.

## Form 6A: overseas electors

Form 6A is the inclusion form for an overseas elector. The Chief Electoral Officer listed it alongside Form 6, 7 and 8 for this claims period. It is for an Indian citizen living abroad for employment, education or another purpose, who has not acquired another citizenship, and who holds a valid Indian passport. The address in that passport is what places the elector in a constituency.

Carry the passport and the pages the form asks to be copied. If a family member in Chennai is filing papers for someone abroad, do not invent details that are not on the passport. The camp can explain the form. It cannot enrol a person who does not meet the overseas-elector conditions.

## Form 7: objection and deletion

Form 7 is the application used to object to a proposed inclusion or to seek deletion of a name already on the roll. The Chief Electoral Officer named it for deletions in this window. Typical reasons residents actually meet are a death in the family, a former tenant or owner who has permanently shifted, and a duplicate entry of the same person.

You will need enough detail for the officer to find the row: the name, and where possible the EPIC number, part and serial. For a death, carry the death certificate if you have it. For a duplicate, carry both cards or both reference numbers if you can. Do not file Form 7 against a neighbour because of a dispute that has nothing to do with eligibility. An objection is a statement on the roll. It is not a way to settle a flat or a family quarrel.

Apartment blocks feel this form most clearly. When a tenant leaves and does not shift the vote, the old name can remain against that flat. The cleaner path is for the person who moved to file Form 8 at the new address, so the old entry is deleted as part of the shift. Form 7 is the fallback when that person cannot or will not apply, and when a family needs a deceased person’s name removed. The Booth Level Officer can tell you which of the two fits the page in front of you.

## Form 8: shift, correction, replacement card, disability marking

Form 8 is the form most households already on the roll will use. Its English title covers four applications, and the form tells you to tick one:

1. Shifting of residence.
2. Correction of entries in the existing roll.
3. Issue of a replacement EPIC without correction.
4. Request for marking as a person with disability.

The filling guidelines say the applicant is a person already enrolled. They say that if the Electoral Registration Officer approves a shift, a correction, or a replacement card, a new EPIC is issued and the old card has to be returned. They also say an Aadhaar number may be given for authentication of entries. If you do not have Aadhaar, the form has a box to say so. Not having Aadhaar is not a reason, on that form, to leave the box blank and hope. Tick the line that matches your case.

**Shifting.** The guidelines say the application goes to the Electoral Registration Officer of the constituency in which the new address lies. You write the new ordinary residence and attach one self-attested address document from the same list used on Form 6, in your name or in the name of a parent or spouse. You ask that the name be deleted from the previous address and entered at the current one. Use this when you move inside Mylapore, when you move from Anna Nagar to Adyar, and when you move to Chennai from another district or state, as long as you are already an elector. “Outside the constituency” and “inside the constituency” are details on the form, not a reason to switch to Form 6.

A marriage that also changes address is still a shift plus whatever correction the form allows on the same visit. Carry the proof of the new residence. If you have also changed your name, carry the document that supports the new spelling, such as a marriage certificate or a gazette notification, and tick the correction the form provides. Do not assume a wedding card is enough. Show it to the officer and use the document they mark.

**Correction.** The guidelines say you tick the entry you want corrected and attach a document in support. The name of that document has to be written in the space given. Residents commonly need a spelling fixed, a relative’s name set right after a marriage, a date of birth aligned with a certificate, a gender marker corrected, a house number fixed, or a photograph replaced. For a photograph, the guidelines say to paste a recent good-quality passport-size unsigned colour photograph, **4.5 cm by 3.5 cm**, with a white background, in the box on the form. Write an active mobile number. The voter portal uses the mobile number on the application when it sends a reference and when you later download an e-EPIC.

**Replacement card.** If the card is lost, damaged or unreadable, tick the replacement option. Follow whatever the form in the officer’s hand asks you to attach. This article will not add a police-complaint requirement that the form itself does not show you. If the officer asks for a loss report, that is the instruction to follow. There is still no fee for the replacement card. Anyone who offers a “fast PVC card” for cash outside the school gate is not the Election Commission.

**Person with disability.** The fourth tick asks that the entry be marked so the election machinery knows the elector may need access arrangements. The draft already records 12,805 electors with disabilities in the Chennai district. Marking is optional and is done on Form 8. Bring whatever the form asks for. Families helping an older relative can carry a signed form and the documents. Ask for the ground-floor table if the camp is inside a school. The Corporation note does not promise a ground-floor table at every building. If stairs are the barrier, say so at the gate and ask where the officer for your part is sitting.

## What to carry, in one folder

Originals for the officer to see, and self-attested copies to attach. Sign the copy so the attestation is actually on the page.

- One age or identity document from the Form 6 list, if you are enrolling or correcting age.
- One address document from the list, if you are enrolling or shifting. Quote the form if there is a dispute about a bill: water, electricity or gas connection bill for that address, with the form’s “at least 1 year” line.
- The existing EPIC, if you have it, for Form 7 or Form 8.
- A recent colour photograph at 4.5 cm by 3.5 cm on a white background if the form asks for a photo, especially a photo correction.
- A pen. Block letters reduce the chance that a Tamil or English initial is mistyped when the form is digitised.
- If you are a first-time voter in a house that is already on the roll, a parent’s or spouse’s EPIC number helps the officer land on the right household. It is a convenience, not a substitute for your own proof.

Aadhaar can be used as the age document or the address document when the card shows what you are claiming. It can also be entered for authentication on Form 8. You may instead tick that you cannot furnish it. Do not hand the original to anyone who is not the officer at the official table, and do not share the number in a housing-group chat as part of a “we will enrol everyone” spreadsheet.

## How to find the right room before you go

One school often holds several parts. One street is sometimes split by door number. The reliable lookup is the roll, not the nearest Corporation school you remember from an election day years ago.

1. Search on [electoralsearch.eci.gov.in](${SEARCH}) by EPIC, or by name, relative’s name, age or date of birth, and state Tamil Nadu. Read the constituency, the part number and name, the serial number, and the polling-station address.
2. On the Voter Helpline app, use the search on the home screen. The EPIC number or the card barcode should bring up the same part.
3. On [voters.eci.gov.in](${VOTERS}) you can file forms online as well as search. The Chief Electoral Officer’s site, [elections.tn.gov.in](${CEO_HOME}), is where the draft gender tables and roll PDFs are published. Open the part for your constituency and street if you want the paper image before you travel.
4. At the camp, the street list at the gate is the local index. If you are in the wrong room, the officer can usually see that from the street directory and point you across the corridor. That works only if you have arrived at the right school. It does not work if you have crossed into another constituency.

Check the Tamil spelling as well as the English. Voter slips in Tamil Nadu are printed in Tamil. A phonetic slip in the Tamil line is worth correcting on Form 8 in this window, with a document that shows the name you actually use.

If the search returns no record, do not conclude that the camp cannot help. Take your address proof and age proof and ask the officer to search the printed part by house number. Missing from the search portal and missing from the paper part are both reasons to file Form 6, provided you are not already enrolled elsewhere.

## What a camp visit looks like

Go between 10:00 AM and 5:00 PM. The press note does not describe a lunch closure. It also does not promise that every table is staffed every minute. If you can choose, earlier in the day is kinder on a school that is also a neighbourhood short-cut.

When you reach the gate, find the part for your street before you join a queue at random. Ask to see your line in the printed draft even if you came only to change a photograph. Read the name, the relative’s name, the age, the gender and the house number. Then fill one form, in capital letters, with the mobile number you will answer.

Attach the self-attested copy. Show the original. Before you leave, take the acknowledgement that the form itself provides, or the reference number if the officer enters the application on the Booth Level Officer app. Those are different objects. Either one is better than a memory of having stood in the room. If your name is missing from the final roll in January, that receipt is what shows you filed inside the claims period.

If the gate is shut or the building in your old slip has no camp, call the voters’ helpline before you go home. The statewide instruction still allows forms to be given to the Booth Level Officer and to the Electoral Registration Officer on working days until 11 December.

## After the camp: tracking until 4 January

Processing is not same-day enrolment. The claims period runs to 11 December 2026, and the final roll is scheduled for 4 January 2027. Use the reference number on [voters.eci.gov.in](${VOTERS}). Log in with the mobile number you wrote on the form, open the track-status option, choose Tamil Nadu, and enter the reference. The status labels you see there are the official ones. This article will not invent a sequence of steps or a promise of 7 or 14 days.

If the status is rejected, read the reason on the screen. A blurred upload, a document in the wrong name, or an address the field visit could not confirm are the usual problems residents can actually fix. File again with the document asked for, online or at the Electoral Registration Officer, before the claims window closes if the rejection comes in time. If it comes after 11 December, ask that office what the next revision path is. Do not wait until a polling day to discover the rejection.

When the status shows that the claim is accepted, the same portal and the Voter Helpline app provide the e-EPIC download against the EPIC number or the reference, with a one-time password on the mobile number. The physical card follows under the Commission’s own dispatch. Keep the old card until you are told to return it. The Form 8 guidelines say the old EPIC is to be returned when a replacement is issued after an approved shift, correction or replacement request.

## The card you already have

“I voted last time, so I am safe” is the sentence that fails families on polling morning. The Chennai draft moved eight polling stations out of existence since 6 April. Chepauk-Thiruvallikeni, Thousand Lights and Mylapore lost stations even where the net district cut is only eight. A name can also have been deleted in the intensive revision and only partly restored since. The New Indian Express figures cited above are large enough that a visual check is rational, including for people who have not shifted house.

You do not need to file a form if the English line, the Tamil line, the age, the gender, the relative and the house number are all right, and you know the part and the station. You do need to look. Two minutes on the search portal does it. The camp does it with the paper page.

## Young voters, hostels and first jobs

The Chennai draft already has 46,200 electors aged 18 or 19. That is not a ceiling. Anyone who qualifies and is missing should file. The Hindu’s city report ties the camp invitation to people who turn 18 on or before 1 January 2027. The statewide broadcast report also speaks of the later quarterly dates in 2027. Take the date of birth certificate or the Class X sheet, not only a college identity card, and ask which qualifying date is open on the form.

Students can, under the Form 6 guidelines, enrol at a parent’s home or at the hostel or mess where they ordinarily live. A hostel certificate on institution letterhead is useful when the named address documents are not in the student’s name. It may fall under “any other document”, which means verification. A paying-guest house is the same problem: the registered lease, a parent’s enrolment at that address, or a field check. Pick one path with the officer rather than filing three forms.

## Tenants, towers and locked doors

Chennai’s draft is full of flats the Booth Level Officer cannot enter on a weekday morning. A locked door during house-to-house work is a common reason a name is marked shifted even though the family is only at work. The camp is the moment to reverse that, with the address document in your hand.

Resident associations in large towers can do this as a list rather than as a hundred separate surprises. The secretary does not enrol anyone. Each resident still signs their own form. What the association can do is book a hour, carry a floor-wise printout of who is actually living there, and sit with the officer while missing names are compared with the part. That is organisation, not a shortcut around eligibility.

For a tenant, the document on the form is a registered rent or lease deed, unless another listed document already shows the address in the right name. Landlords who want old tenant names off the roll should point those tenants to Form 8 at the new address, and use Form 7 only where the conditions for an objection are actually met.

## Online, camp, or both

Both paths land with the same Electoral Registration Officer. The camp’s advantage is that someone looks at the original document while you are standing there, and you can see the paper roll. The portal’s advantage is a typed application and a reference number at any hour until the claims window closes.

A sensible combination is to file on [voters.eci.gov.in](${VOTERS}) if your scans are clean, and still walk into the camp with the reference number and the originals. Ask the officer to look the reference up. If the scan was rejected for being unreadable, the camp is where you replace it with a copy taken from the original. If you would rather not scan anything, the camp alone is enough, provided you leave with an acknowledgement.

The portal is not a reason to skip the roll check. Search the name first. Then choose Form 6 or Form 8. Filing the wrong one is the delay.

## Helplines and offices

- Voters’ helpline: **1950**. From some mobile networks the local prefix is needed. The Chief Electoral Officer, Tamil Nadu, prints a toll-free number and **ceo@tn.gov.in** on [elections.tn.gov.in](${CEO_HOME}). Use the number on that page if it differs from a forward.
- Voters’ Service Portal: [voters.eci.gov.in](${VOTERS})
- Elector search: [electoralsearch.eci.gov.in](${SEARCH})
- Chief Electoral Officer draft tables: [Assembly-wise gender count, 12 November 2026](${CEO_AC})
- Corporation camp note: [Press Release No. 695](${GCC_PR})
- Corporation website: [chennaicorporation.gov.in](https://chennaicorporation.gov.in/)

The Corporation’s general civic line, 1913, is for municipal complaints. It is not the electoral-roll control room. For a missing name, use 1950, the Booth Level Officer number shown on your search result, or the Electoral Registration Officer at the constituency.

If you miss 29 November, you still have working days until 11 December 2026 to file with the Booth Level Officer or the Electoral Registration Officer. Do not treat the last camp Sunday as the last lawful day, and do not treat 11 December as a date you can stretch.

## Questions residents actually ask

**I voted in Chennai last time and I have not moved. Do I have to attend?**

You have to check, not necessarily to file. Search the draft or look at the paper part. File only if a detail is wrong, the station has changed and you want it confirmed, or someone in the house is missing. The eight-station cut since April is a reason to look up the building address even when the name is intact.

**Can a relative file for a parent who cannot climb to the classroom?**

A family member may carry a signed form and the documents. Ask at the gate for the table that is serving that part. If the only table is upstairs and the elector needs to be seen in person, ask the officer what verification they will accept. Do not sign someone else’s declaration as if you were the applicant.

**I got married and moved from my parents’ house to my spouse’s house.**

If you are already enrolled, file Form 8 for a shift, to the Electoral Registration Officer of the constituency where you live now. Use the correction ticks on that form for a name or a relative’s name, with the document that supports the change. Form 6 is for a person who is not enrolled at all.

**My photograph is decades old.**

Form 8, correction, photograph. Paste a recent unsigned colour photograph, 4.5 cm by 3.5 cm, white background, and show the current EPIC.

**I have lost the card and I do not remember the EPIC number.**

Search by name and house number on the portal, or ask the officer to find the row in the printed part. Note the EPIC, part and serial. Then use Form 8 for a replacement if the entry itself is correct.

**Is the camp closed for lunch?**

The published hours are 10:00 AM to 5:00 PM. The press note does not announce a lunch break. If a table is briefly unattended, wait or try the other camp Sunday rather than paying a tout.

**Is there a fee for the form or the card?**

No. Forms, verification and the EPIC are free. A payment asked for at the school gate is not part of this revision.

**We live on Old Mahabalipuram Road. Is this our camp?**

Only if your search result shows a Chennai election-district constituency, numbers 11 to 26. Much of the OMR corridor is Shozhinganallur, constituency 27, under Chengalpattu on the Chief Electoral Officer’s table. The statewide dates are the same. The room is not.

**My name was deleted in the earlier intensive revision. Can I apply now?**

Yes, if you are eligible and ordinarily resident. That is what the claims window is for. Carry the address and age documents. Mention the old EPIC if you still have the number, so the officer can see the earlier entry instead of creating a duplicate by accident.

**When will the new roll be final?**

The date published for the final roll is 4 January 2027. Acceptance of your form can show on the portal before that. The final publication is the list that closes this revision.

## Sources

- Greater Chennai Corporation, Press Release No. 695, 19 November 2026, special camps on 21, 22 and 29 November, 10:00 AM to 5:00 PM, all polling stations in the 16 Assembly constituencies. [PDF](${GCC_PR})
- Chief Electoral Officer, Tamil Nadu, Assembly-wise electors as on the draft roll of 12 November 2026. [Table](${CEO_AC})
- The Hindu, “Chennai draft electoral roll records 29.14 lakh voters”, 12 November 2026, including station cuts, the 6 April base, continuous revision, and the 4 January 2027 final roll. [Report](${HINDU_DRAFT})
- The Hindu, “Special camps for electoral roll revision on November 21, 22 and 29”, 13 November 2026, Chief Electoral Officer on Forms 6, 6A, 7 and 8 and the claims period. [Report](${HINDU_CAMPS})
- The New Indian Express, “Chennai voter count up 21,403 as per draft SSR”, 13 November 2026, for the intensive-revision comparison figures cited above.
- Election Commission of India, Form 6 and Form 8 English PDFs and filling guidelines. [Form 6](${FORM_6}), [Form 6 guidelines](${FORM_6_GUIDE}), [Form 8](${FORM_8}), [Form 8 guidelines](${FORM_8_GUIDE})
- All India Radio, report on publication of the integrated draft rolls and the four 2027 quarterly dates for young voters.

## Fine print — AI-assisted authoring

This guide was drafted with AI assistance and checked against the public documents linked above. AI can mis-state a form field or a boundary. The press release, the Chief Electoral Officer’s table, and the form the Booth Level Officer gives you prevail over this page. Confirm your own entry before you act on it.`.trim();

  const analysisBody = `## What to do before 5:00 PM on 29 November

The Chennai election district has 29,14,908 names on a draft that is only 21,403 above the 6 April roll, after a year in which an intensive revision had already taken a much larger cut. The useful response is a household check, not a rumour about whether the city “lost” voters.

Do these three things.

1. Search every adult at [electoralsearch.eci.gov.in](${SEARCH}). Save the constituency number, part, serial and polling-station address. If the search is empty, treat that as a task for Form 6 or Form 8, not as a story to forward.
2. On 22 or 29 November, between 10:00 AM and 5:00 PM, take the missing and the wrong entries to that station with one document from the form’s list. Leave with an acknowledgement or a reference number.
3. If you are outside constituencies 11 to 26, do the same thing at your own station. Shozhinganallur alone has 5,58,729 electors on this draft. A city press note about 16 constituencies does not cover that booth.

## What this desk will not pretend to know

We are not publishing a street-by-street booth directory. Part boundaries move, and eight stations have already been dropped since April, with Chepauk-Thiruvallikeni, Thousand Lights and Mylapore specifically down. A list of “the school for this area” would send people to last year’s door.

We are not publishing a processing-time promise. The public dates are the claims deadline of 11 December 2026 and the final roll of 4 January 2027. Track the reference. Come back to the Electoral Registration Officer if the status says rejected and the reason is a document you can still supply.

We are not asking anyone to link Aadhaar in a housing spreadsheet. The form has a place for the number and a place to say you cannot furnish it. Authentication is the Commission’s process. It is not a society WhatsApp broadcast.

## If you miss the camp

Working days remain until 11 December. The Chief Electoral Officer said forms may be given to the Booth Level Officer, the Electoral Registration Officer or the Assistant Electoral Registration Officer. The camp is the convenient door, not the only door. The final roll date, 4 January 2027, is the door that shuts on this particular draft.

Check the Tamil line, the English line, and the station address. Then stop. A correct, boring entry is the outcome these three Sundays are for.`.trim();

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
      "SSR voter camps in Chennai on 21, 22 and 29 November 2026: a resident’s guide",
    summary:
      "Polling stations in Chennai’s 16 Assembly constituencies host free Special Summary Revision camps from 10:00 AM to 5:00 PM on 21, 22 and 29 November 2026. The 12 November draft lists 29,14,908 electors. Claims run until 11 December. The final roll is due on 4 January 2027.",
    dek: "Check the draft, then file Form 6, 6A, 7 or 8 at your own booth. Constituencies 11 to 26 are the Chennai election district. OMR, Ambattur and Tambaram use their own stations on the same dates.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    areaHubSlug: null as string | null,
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: "/images/explore-chennai-madras-high-court.jpg",
    sourceUrl: GCC_PR,
    sourceName:
      "Greater Chennai Corporation PR No. 695 (19 November 2026); Chief Electoral Officer, Tamil Nadu; The Hindu",
    authorByline: "Chennai Civic & Election Desk, mychennaicity.in",
    interactiveJson: {
      type: "faq",
      items: [
        {
          question:
            "When and where are the Chennai SSR voter camps in November 2026?",
          answer:
            "Greater Chennai Corporation Press Release No. 695 says special camps are on Saturday 21 November, Sunday 22 November and Sunday 29 November 2026, from 10:00 AM to 5:00 PM, at polling-station locations in all 16 Assembly constituencies of the Chennai election district. The draft roll was published on 12 November 2026.",
        },
        {
          question:
            "How many voters are on Chennai’s draft electoral roll published on 12 November 2026?",
          answer:
            "The draft lists 29,14,908 electors across 16 constituencies and 4,071 polling stations: 14,04,968 men, 15,09,040 women and 900 third-gender electors. That is 21,403 more than the 28,93,505 electors on 6 April 2026. The final roll is scheduled for 4 January 2027.",
        },
        {
          question: "Which form should I use at the voter camp?",
          answer:
            "The Chief Electoral Officer named Form 6 for new enrolment, Form 6A for an overseas elector, Form 7 for objection or deletion, and Form 8 for shifting, correction, a replacement EPIC, or marking as a person with disability. If you are already enrolled, do not file a fresh Form 6. Use Form 8 to shift.",
        },
        {
          question: "Is there a fee for voter registration or a new EPIC in Chennai?",
          answer:
            "No. Election Commission forms and the elector photo identity card are free. Do not pay an agent outside the polling station.",
        },
        {
          question:
            "I live in Sholinganallur, Ambattur or Tambaram. Do I use a Chennai district camp?",
          answer:
            "Only if your name is in Assembly constituencies 11 to 26. On the Chief Electoral Officer’s 12 November 2026 table, Shozhinganallur (Sholinganallur) is constituency 27 under Chengalpattu, Ambattur is constituency 8 under Thiruvallur, and Tambaram is constituency 31 under Chengalpattu. The same three dates were announced across Tamil Nadu. Go to your own polling station.",
        },
        {
          question: "What is the last date to file a claim or objection?",
          answer:
            "Claims and objections run from 12 November to 11 December 2026. The three camp Sundays are inside that window. Forms can also be given to the Booth Level Officer or the Electoral Registration Officer on working days until 11 December. The qualifying date reported for this revision is 1 January 2027.",
        },
        {
          question: "What documents should I take to the camp?",
          answer:
            "For a new enrolment or a shift, take a self-attested copy of one age document and one address document from the list printed on Form 6 or Form 8, plus the original for inspection. Address proofs named on the form include a water, electricity or gas bill for that address, Aadhaar, a current bank or post-office passbook, passport, land records, a registered lease for tenants, or a registered sale deed for owners. Carry your existing EPIC if you have one.",
        },
        {
          question: "I have a voter ID card. Do I still need to check the draft roll?",
          answer:
            "Yes. The EPIC does not guarantee that your name is on the 12 November 2026 draft. Chennai has 4,071 polling stations now, eight fewer than on 6 April 2026. Search your name or look at the paper part at the camp, and file a form only if something is missing or wrong.",
        },
      ],
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-ssr-camps] Refreshed article:", SLUG);
  } else {
    await db.insert(articles).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-ssr-camps] Inserted article:", SLUG);
  }

  console.log("[seed-ssr-camps] Public URL:", `/chennai-local-news/${SLUG}`);

  if (live) {
    await revalidateNewsAfterSeed({
      slug: SLUG,
      label: "seed-ssr-camps",
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
