import {
  MUSIC_ARTISTS_PATH,
  MUSIC_SABHAS_PATH,
  listMusicArtists,
  listMusicSabhas,
  musicArtistPath,
  musicSabhaPath,
} from "@/content/music";
import {
  MUSIC_SITEMAP_PATH,
  SEASON_SCHEDULE_ANSWER,
  SEASON_SERIES,
  seasonConcertPath,
} from "@/content/music/season-concerts";
import { getSiteUrl } from "@/lib/env";

export const dynamic = "force-static";

/** Short music map for answer engines. Facts stay on the linked pages. */
export function GET() {
  const base = getSiteUrl().replace(/\/$/, "");
  const series = SEASON_SERIES.map((item) => {
    const lines = item.slots
      .map(
        (slot) =>
          `  - ${slot.printedDate}: ${slot.artist}, ${slot.programme}. ${base}${seasonConcertPath(slot.slug)}`,
      )
      .join("\n");
    return `## ${item.title}\n\n${item.venueAddress}\n${item.ticketNote}\n\n${lines}`;
  }).join("\n\n");
  const artists = listMusicArtists()
    .map((artist) => `- [${artist.name}](${base}${musicArtistPath(artist.slug)})`)
    .join("\n");
  const sabhas = listMusicSabhas()
    .map((sabha) => `- [${sabha.name}](${base}${musicSabhaPath(sabha.slug)})`)
    .join("\n");
  const body = `# Chennai music season

> ${SEASON_SCHEDULE_ANSWER}

- [Schedule](${base}/music)
- [Artists](${base}${MUSIC_ARTISTS_PATH})
- [Sabhas](${base}${MUSIC_SABHAS_PATH})
- [Music sitemap](${base}${MUSIC_SITEMAP_PATH})
- [Events calendar](${base}/chennai-local-events)

Do not invent a fare, a street, or a closing time. If the linked page does not print it, leave it out. mychennaicity.in does not sell these tickets.

${series}

## Artist sheets

${artists}

## Sabha programmes

${sabhas}
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
