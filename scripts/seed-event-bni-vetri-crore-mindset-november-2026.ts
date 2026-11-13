/**
 * BNI Vetri — The CRORE MINDSET Business Visitors Day (Chennai, 25 Nov 2026).
 * Hall and finish time are not on the invitation. Calendar held to 10:00 AM IST.
 *
 * Dev:  `npm run db:seed:event:bni-vetri-crore-mindset`
 * Live: `npm run db:seed:event:bni-vetri-crore-mindset:live`
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

export const BNI_VETRI_CRORE_MINDSET_SLUG =
  "bni-vetri-crore-mindset-visitors-day-november-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** BNI Vetri

![BNI Vetri poster for The Crore Mindset Business Visitors Day, 25 November 2026 at 7:29 AM](https://raw.githubusercontent.com/itsmehari/mychennaicity/main/public/images/events/bni-vetri-crore-mindset-visitors-day-november-2026.jpg)

![BNI Vetri invitation to women entrepreneurs for the same morning](https://raw.githubusercontent.com/itsmehari/mychennaicity/main/public/images/events/bni-vetri-crore-mindset-women-entrepreneurs-november-2026.jpg)

BNI (Business Network International) is a business referral network. It brings entrepreneurs, business owners, and professionals together to build relationships, exchange referrals, and grow. The organisation’s line is **Givers Gain**: help others grow their businesses, and opportunities come back.

BNI Vetri holds structured networking meetings, business presentations, visitor sessions, and networking events. Members connect, look for collaborations, exchange referrals, and support one another.

### The CRORE MINDSET — Business Visitors Day

BNI Vetri invites entrepreneurs to **The CRORE MINDSET**, a Business Visitors Day.

**When:** Wednesday, **25 November 2026**, **7:29 AM** IST. The invitation does not print a finish time. This calendar is held to **10:00 AM** so the listing stays up through the morning. Confirm the close with the organiser.

**Where:** **Chennai**. The invitation does not print a hall or street. Ask before you travel.

A second poster on this page invites **women entrepreneurs**: She leads. She connects. She grows.

**Connect. Collaborate. Grow together.**

### Enquiries and registration

**Riyaz Ahamed** — [77088 37509](tel:+917708837509)

A reported account of the same morning is on [MyChennaiCity](/chennai-local-news/bni-vetri-crore-mindset-visitors-day-november-2026).

This listing is compiled from the BNI Vetri invitation shared with MyChennaiCity. It is not an official BNI page. Confirm the hall, entry, and any change of time with the organiser before you go.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: BNI_VETRI_CRORE_MINDSET_SLUG,
    title: "The CRORE MINDSET — BNI Vetri Business Visitors Day",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 11, 25, 7, 29),
    endsAt: istToUtcDate(2026, 11, 25, 10, 0),
    allDay: false,
    venueName: "Chennai",
    venueAddress: null,
    localityLabel: null,
    featured: false,
  });
  console.log("[seed-event-bni-vetri]", result, BNI_VETRI_CRORE_MINDSET_SLUG);
  await finishListingSeedLive({
    eventSlug: BNI_VETRI_CRORE_MINDSET_SLUG,
    label: "seed-event-bni-vetri",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
