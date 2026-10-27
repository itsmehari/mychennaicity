/**
 * India Retail Investors Expo (IRIE) Season 3 — Chennai opener.
 * 31 Oct–1 Nov 2026, D7 Auditorium, IIT Madras Research Park, Taramani.
 * Checked 19 October 2026:
 * - https://indiaretailinvestorsexpo.com/events/chennai-2026
 * - https://indiaretailinvestorsexpo.com/register?city=chennai-2026
 * - https://meetgrow.in/events/india-retail-investors-expo
 * Promo code CMNITY100 is from a WhatsApp note the same day
 * (+91 99580 63310). It is not printed on the official pages.
 *
 * Dev:  `npm run db:seed:event:india-retail-investors-expo`
 * Live: `npm run db:seed:event:india-retail-investors-expo:live`
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import {
  finishListingSeedLive,
  getChennaiCityId,
  istToUtcDate,
  isLiveSeed,
  loadEventSeedEnv,
  requireDatabaseUrl,
  upsertEvent,
} from "./lib/seed-event-shared";

export const INDIA_RETAIL_INVESTORS_EXPO_SLUG =
  "india-retail-investors-expo-chennai-october-2026";

const REGISTER =
  "https://indiaretailinvestorsexpo.com/register?city=chennai-2026";
const CITY = "https://indiaretailinvestorsexpo.com/events/chennai-2026";
const MEETGROW = "https://meetgrow.in/events/india-retail-investors-expo";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** DFAIRS Communications Ltd

**India Retail Investors Expo (IRIE) Season 3** opens in Chennai. The organiser describes it as a two-day retail investment exhibition and conference: stocks, mutual funds, gold, real estate, insurance, bonds, and other personal-finance stalls, plus masterclasses. Chennai is the first of five Season 3 stops (Amaravati, Coimbatore, Hyderabad, and Ahmedabad follow). Headcounts such as “7,500+” for Seasons 1 and 2, “15,000+” for Season 3, and “Tamil Nadu’s biggest gathering” are the organiser’s claims.

**When:** **Saturday 31 October and Sunday 1 November 2026**. [MeetGrow](${MEETGROW}) prints **10:00 AM–6:30 PM IST**. The [official register page](${REGISTER}) titles the session grid **10:00 AM–6:00 PM** and says timings can shift. The final line-up is shared with ticket holders.

**Where:** **D7 Auditorium, IIT Madras Research Park**, Kanagam, Taramani, Chennai 600113. The hall name and PIN are on the [official Chennai page](${CITY}). MeetGrow adds Kanagam.

### Community code

A WhatsApp note from **+91 99580 63310** on **19 October 2026** says business people and communities can attend without paying, using promo code **CMNITY100**.

That code is **not** printed on the official Chennai page or the register page checked the same day. Apply it at checkout and confirm the amount is zero before you pay. The number above circulated the code. The organiser’s published desk is separate (below).

### Passes

**Booking:** [Register for Chennai](${REGISTER})

MeetGrow, checked 19 October 2026, prints three passes. Every pass on that table includes a digital badge, expo-hall access, and networking zones for both days.

| Pass | Price on MeetGrow | Adds |
| --- | --- | --- |
| Gold | ₹99 | Hall, badge, networking. Conference, lunch, VIP, and priority seating are marked not included. |
| Diamond | ₹699 | Two-day conference. |
| Platinum | ₹1,399 | Conference, executive lunch both days, VIP pass, priority seating. |

The official Chennai page agrees that higher tiers unlock the conference, executive lunch, a VIP lounge, and priority seating. The register page also says “two full days of money masterclasses, included with every pass.” Those two lines do not match. Check which pass you are buying.

On 19 October 2026 the register page showed **Diamond 271 left** and **Platinum 164 left**, and said the counts update as passes sell. It did not print a Gold remaining count or the rupee prices. MeetGrow’s checkout widget showed a Gold remaining count the same day. Do not treat either snapshot as today’s stock.

After payment, the organiser says you get a QR pass on email and WhatsApp. Checkout on the register page is described as UPI, cards, or netbanking, powered by AllEvents.

### Day 1 — Saturday 31 October

The register page calls this day “Foundations — banking, savings and first investments.”

| Time | Session | Name on the grid |
| --- | --- | --- |
| 10:00–10:15 AM | Welcome to IRIE: Understand Your Money Better | |
| 10:15–10:45 AM | Start Small. Build Wealth: Your First Steps in Investing | |
| 10:45–11:15 AM | Investing in US Stocks: Advantages, Risks and How to Get Started | |
| 11:15–11:45 AM | Banking Made Simple: A Better Everyday Banking Experience | Equitas |
| 11:45 AM–12:15 PM | Tea break and expo interaction | Floor open |
| 12:15–12:45 PM | India Post Savings: Fixed Returns, Schemes and How to Invest | India Post |
| 12:45–1:15 PM | Fixed Deposits Made Easy: Compare, Choose and Understand Safety | Stable Money |
| 1:15–2:00 PM | Lunch and expo networking | Floor open |
| 2:00–2:30 PM | Data-Based Investing: Make Decisions Beyond Market Noise | Flameback Capital |
| 2:30–3:00 PM | Options and Investing: Opportunities, Strategies and Risk Management | Share India Securities |
| 3:00–3:30 PM | Algo Trading Explained: How It Works and How to Get Started | uTrade Algos |
| 3:30–4:00 PM | Tea break and expo interaction | Floor open |
| 4:00–4:30 PM | Mutual Funds and SIPs: Choose with Purpose | |
| 4:30–5:00 PM | Insurance: Protect Your Family and Your Savings | |
| 5:00–5:30 PM | Ask the Experts: Which Investment Fits Which Goal? | |
| 5:30–6:00 PM | Your Next Money Move: A Practical Investment Checklist | |

### Day 2 — Sunday 1 November

The register page calls this day “Action day — stocks, gold, bonds, crypto, awards and cultural evening.” No company names are printed on these slots.

| Time | Session |
| --- | --- |
| 10:00–10:15 AM | Welcome Back: Turn Learning into Action |
| 10:15–10:45 AM | How to Read a Company Before Buying Its Shares |
| 10:45–11:15 AM | Trading Discipline: Protect Your Capital First |
| 11:15–11:45 AM | Gold as an Investment: Understand Your Choices |
| 11:45 AM–12:00 PM | Tea break and expo interaction |
| 12:00–12:30 PM | Bonds and Government Securities: Beyond Fixed Deposits |
| 12:30–1:00 PM | Retirement Planning: Build an Income for Your Future |
| 1:00–1:45 PM | Lunch and expo networking |
| 1:45–2:15 PM | Investment Taxes: What Every Investor Should Understand |
| 2:15–2:45 PM | Crypto and Digital Assets: Understand Before Investing |
| 2:45–3:15 PM | Investing for Business Owners and the Self-Employed |
| 3:15–3:30 PM | Tea break and expo interaction |
| 3:30–4:00 PM | Build Your Portfolio: Balance Growth, Safety and Liquidity |
| 4:00–4:30 PM | IRIE Awards and Recognitions — Part I |
| 4:30–5:00 PM | Entertainment and cultural performances |
| 5:00–5:30 PM | IRIE Awards and Recognitions — Part II |
| 5:30–6:00 PM | Closing ceremony, partner acknowledgements, and vote of thanks |

### Names on the booking page

The register page lists these people under “25+ market experts” and does not attach them to a clock time. MeetGrow labels the same list as speakers from past editions (Hyderabad 2024 and Bengaluru, January 2026). Treat them as published names, not a confirmed Chennai timetable.

Abhishek Agrawal (CFO, Embassy Office Parks REIT), Chaitanya Sampat (AVP, Share India Securities), Kishan Murjani Nair, CFA (Flameback Capital), Manish Kadam (Spider Software), Gaurav Garg (BlinkX by JM Financial), Sidhartha Satpathy (Mirae Asset Sharekhan), Vandana Jain (Nubra), Santhosh Kamatam (CoinSwitch PRO). MeetGrow’s longer list also names Niteen D (Anand Rathi International Ventures), Chetan Anand (Integrated Enterprises India), Ujjwal Ladha (Trading Smart Academy), Parth Khare (Alphabots), Avinash Rao (Alt DRX), Satish Kumar (Atum Capital), and Manjari Balu (Enrich Money).

MeetGrow’s Chennai page also names brands including Motilal Oswal, Share India, Alice Blue, Enrich Money, Casagrand, Mudrex, Volt Money, Margadarsi, SBI, Equitas, Anand Rathi, Sharekhan, ICICI Securities, and Choice International. A stall booking for this edition is not confirmed here.

### Contact

**DFAIRS Communications Ltd**, No. 104, Pareek Plaza, Lingampally, Hyderabad, Telangana 500019. Email **info@indiaretailinvestorsexpo.com**. Phone **+91 96184 74761**. Site: [indiaretailinvestorsexpo.com](https://indiaretailinvestorsexpo.com/). Listing used for the pass table: [MeetGrow](${MEETGROW}).

This page is a civic listing compiled from those pages and the WhatsApp note. It is not an official notice from DFAIRS or IIT Madras Research Park. Confirm the pass, the code, and the hall before you pay or travel.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: INDIA_RETAIL_INVESTORS_EXPO_SLUG,
    title:
      "India Retail Investors Expo, IIT Madras Research Park (31 Oct and 1 Nov 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 10, 31, 10, 0),
    endsAt: istToUtcDate(2026, 11, 1, 18, 30),
    allDay: false,
    venueName: "D7 Auditorium, IIT Madras Research Park",
    venueAddress:
      "D7 Auditorium, IIT Madras Research Park, Kanagam, Taramani, Chennai 600113",
    localityLabel: "Taramani",
    featured: false,
  });
  console.log(
    "[seed-event-india-retail-investors-expo]",
    result,
    INDIA_RETAIL_INVESTORS_EXPO_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: INDIA_RETAIL_INVESTORS_EXPO_SLUG,
    label: "seed-event-india-retail-investors-expo",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
