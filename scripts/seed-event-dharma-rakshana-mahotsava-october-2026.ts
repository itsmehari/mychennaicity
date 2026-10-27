/**
 * Dharma Rakshana Mahotsava — Dashamanotsava (10th year Peetarohana)
 * of Sri Sri Vidyashreesha Tirtha Swamiji, Sri Vyasaraja Matha, Sosale.
 * B V Bhavan's Rajaji Vidyashram, Kilpauk (4 Oct 2026, 4:00–8:00 PM).
 * Source: organiser poster.
 *
 * Dev:  `npm run db:seed:event:dharma-rakshana-mahotsava`
 * Live: `npm run db:seed:event:dharma-rakshana-mahotsava:live`
 *
 * Poster: `public/images/events/dharma-rakshana-mahotsava-kilpauk-october-2026.jpg`
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

export const DHARMA_RAKSHANA_MAHOTSAVA_SLUG =
  "dharma-rakshana-mahotsava-kilpauk-october-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** Sri Vyasaraja Matha, Tamilnadu, as printed on the poster. Supported by **LHVS, Chennai** (initials only; the flyer does not expand them).

**Dharma Rakshana Mahotsava** — the **Dashamanotsava** (10th year Peetarohana Mahotsava) of **Sri Sri Vidyashreesha Tirtha Swamiji** of **Sri Vyasaraja Matha, Sosale**.

**When:** Sunday, **4 October 2026** · **4:00 PM to 8:00 PM IST**.

**Where:** **B V Bhavan's Rajaji Vidyashram**, Bhavani Campus, No. 6, Kilpauk Garden Road, Kilpauk, Chennai 600010. The poster prints the venue as Kilpauk; the street address is the school’s published campus address.

The poster’s lines read **Dharma Lives · Dharma Unites · Dharma Protects**, **Tradition transforms Society**, and **Acharyas inspire generations**.

### Divine presence and Anugraha Sandesha

Names below are transcribed from the flyer. Confirm the live dais with the organiser.

- **His Holiness** Sri Sri Sankara Vijayendra Saraswathi Sankaracharya Swamigal, Sri Kanchi Kamakoti Peetam
- **His Holiness** Sri Sri Vidyashreesha Tirtha Swamigal, Sri Vyasaraja Mutt, Sosale
- **His Holiness** Sri Sri Azhagiyasingar Swamigal, Sri Ranganatha Yateendra Mahadesikan, Sri Ahobilam Mutt

### Programme marks on the poster

- **Bhajan by** Sri Vittaldas Maharaj
- **Special speaker:** Vid. Brahmanya Acharya
- **Special speaker:** Dr U. Ve. Venkatesh

### Guests of honour

Titles are printed without naming a university, except where the flyer itself names the office.

- Shri Kutumba Sastry, Chancellor
- Sri K. E. Devanathan, Vice Chancellor
- Sri Shrinivasa Varakhedi, Vice Chancellor
- Sri V. Kamakoti, Director, IIT Madras
- Sri R. R. Gopalji, Director and Publisher, Dinamalar
- Sri R. Vijay Anand, MD and CEO, City Union Bank

### After the programme

The poster notes that a **Sattvik Upahara** is arranged after the programme. It does **not** print a ticket price, phone number, or registration link.

This listing is compiled from the organiser poster. It is not an official matha or school notice. Confirm time, hall, and entry before you go.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: DHARMA_RAKSHANA_MAHOTSAVA_SLUG,
    title:
      "Dharma Rakshana Mahotsava — Dashamanotsava of Sri Sri Vidyashreesha Tirtha Swamiji (4 Oct 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 10, 4, 16, 0),
    endsAt: istToUtcDate(2026, 10, 4, 20, 0),
    allDay: false,
    venueName: "B V Bhavan's Rajaji Vidyashram",
    venueAddress:
      "Bhavani Campus, No. 6, Kilpauk Garden Road, Kilpauk, Chennai 600010",
    localityLabel: "Kilpauk",
    featured: true,
  });
  console.log(
    "[seed-event-dharma-rakshana-mahotsava]",
    result,
    DHARMA_RAKSHANA_MAHOTSAVA_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: DHARMA_RAKSHANA_MAHOTSAVA_SLUG,
    label: "seed-event-dharma-rakshana-mahotsava",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
