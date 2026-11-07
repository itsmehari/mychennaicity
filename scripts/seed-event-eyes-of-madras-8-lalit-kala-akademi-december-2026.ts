/**
 * Eyes of Madras 8.0 — annual Chennai PhotoWalk photo exhibition.
 * 7–13 December 2026, Lalit Kala Akademi (Regional Centre), Chennai.
 * Source: CPW congratulatory poster; jury selection stats; community contact lines.
 *
 * Dev:  `npm run db:seed:event:eyes-of-madras-8`
 * Live: `npm run db:seed:event:eyes-of-madras-8:live`
 *
 * Poster: `public/images/events/eyes-of-madras-8-the-chennai-photowalk-lalit-kala-akademi-december-2026.png`
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

export const EYES_OF_MADRAS_8_SLUG =
  "eyes-of-madras-8-the-chennai-photowalk-lalit-kala-akademi-december-2026";

const INSTAGRAM = "https://www.instagram.com/thechennaiphotowalk/";
const FACEBOOK =
  "https://www.facebook.com/groups/thechennaiphotowalkcommunity";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**The Chennai PhotoWalk (CPW)** presents **Eyes of Madras 8.0** — the community's **8th annual** printed photo exhibition. Tagline on the poster: **Spirit and Stories of Chennai Through Your Lens**.

**When:** **Sunday 7 December to Saturday 13 December 2026** (seven-day run as printed). Daily opening and closing times are **not** on the congratulatory poster. Confirm gallery hours on [The Chennai PhotoWalk Instagram](${INSTAGRAM}) or at Lalit Kala Akademi before you travel.

**Where:** **Lalit Kala Akademi, Regional Centre, Chennai** — 4, Greams Road, Thousand Lights, Chennai 600006.

**Entry:** Free and open to the public, per CPW's exhibition announcement. No ticket link is printed on the poster.

### What is on the walls

After submissions closed **31 October 2026**, the curation committee reviewed **more than 1,100** images. The mounted showcase, as announced for 8.0, includes:

- **6** street and cultural themes (street life, local emotion, composition, and lighting/architecture)
- **103** participating photographers whose work made the final curation
- **210** printed frames on the gallery walls

Full participant rosters, jury updates, and behind-the-scenes posts are on CPW's social feeds — especially Instagram.

### Contact and community hubs

- **Email:** thechennaiphotowalk@gmail.com
- **Instagram:** [@thechennaiphotowalk](${INSTAGRAM})
- **Facebook:** [The Chennai PhotoWalk Community](${FACEBOOK})

**Coordination (community numbers, not mychennaicity.in):**

- Saran: **+91 99621 33611**
- Naveen Kumar: **+91 99400 13232**
- Vivek: **+91 98842 79501**

### About the edition

Eyes of Madras is CPW's flagship annual exhibition of Chennai street and documentary photography. Earlier editions have used other Chennai galleries; **8.0** is at Lalit Kala Akademi's regional centre on Greams Road. Sponsor logos on the poster include community partners; confirm any sponsor-led programmes on CPW's channels.

This listing is compiled from CPW's poster, public announcement text, and community contact lines. It is not an official Lalit Kala Akademi or CPW legal notice. Confirm dates, hours, and entry rules with CPW or at the venue before you visit.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: EYES_OF_MADRAS_8_SLUG,
    title:
      "Eyes of Madras 8.0 — Chennai PhotoWalk exhibition at Lalit Kala Akademi (7–13 Dec 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 12, 7, 0, 0),
    endsAt: istToUtcDate(2026, 12, 13, 23, 59),
    allDay: true,
    venueName: "Lalit Kala Akademi, Regional Centre, Chennai",
    venueAddress: "4, Greams Road, Thousand Lights, Chennai 600006",
    localityLabel: "Thousand Lights",
    featured: true,
  });
  console.log(
    "[seed-event-eyes-of-madras-8]",
    result,
    EYES_OF_MADRAS_8_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: EYES_OF_MADRAS_8_SLUG,
    label: "seed-event-eyes-of-madras-8",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
