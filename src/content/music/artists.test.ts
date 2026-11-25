import { describe, expect, it } from "vitest";
import { charumathiRaghuraman } from "@/content/music/artists/charumathi-raghuraman";
import { jayanthiKumaresh } from "@/content/music/artists/jayanthi-kumaresh";
import { concertEventDescription, concertEventTitle } from "@/content/music/event-copy";
import { concertHoldEnd } from "@/content/music/format";
import {
  artistForEventSlug,
  getMusicArtist,
  listMusicArtists,
  musicArtistPath,
  musicSitemapEntries,
  MUSIC_ARTISTS_PATH,
} from "@/content/music";
import { buildMusicArtistJsonLd } from "@/lib/seo/music-artist-jsonld";

describe("music artists", () => {
  it("keeps unique artist slugs and Chennai event slugs", () => {
    const artists = listMusicArtists();
    const slugs = artists.map((artist) => artist.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(getMusicArtist("charumathi-raghuraman")?.name).toBe(
      "Charumathi Raghuraman",
    );
    expect(musicArtistPath("charumathi-raghuraman")).toBe(
      "/music/artist/charumathi-raghuraman",
    );
    expect(MUSIC_ARTISTS_PATH).toBe("/music/artist");

    const eventSlugs = artists.flatMap((artist) =>
      artist.concerts
        .map((concert) => concert.eventSlug)
        .filter((slug): slug is string => Boolean(slug)),
    );
    expect(new Set(eventSlugs).size).toBe(eventSlugs.length);
    expect(eventSlugs).toHaveLength(17);
    expect(artistForEventSlug(eventSlugs[0])?.slug).toBe("charumathi-raghuraman");
    expect(getMusicArtist("jayanthi-kumaresh")?.name).toBe("Dr Jayanthi Kumaresh");
  });

  it("leaves the Hyderabad date off the Chennai calendar and holds same-day finishes", () => {
    const hyderabad = charumathiRaghuraman.concerts.find(
      (concert) => concert.city === "Hyderabad",
    );
    expect(hyderabad?.eventSlug).toBeNull();
    expect(hyderabad?.startHour).toBeNull();

    for (const concert of charumathiRaghuraman.concerts) {
      if (!concert.eventSlug) continue;
      const end = concertHoldEnd(concert);
      expect(end).not.toBeNull();
      expect(end!.hour).toBeLessThan(24);
    }
  });

  it("points ticket copy at the artist's site and does not invent a fare", () => {
    const concert = charumathiRaghuraman.concerts[0];
    const description = concertEventDescription(charumathiRaghuraman, concert);
    expect(concertEventTitle(charumathiRaghuraman, concert)).toContain(
      "Charumathi Raghuraman",
    );
    expect(description).toContain("/music/artist/charumathi-raghuraman");
    expect(description).toContain("https://www.charuraghu.com");
    expect(description).toContain("does not print a fare");
    expect(description).not.toMatch(/₹|rs\.?\s*\d/i);

    const json = JSON.stringify(buildMusicArtistJsonLd(charumathiRaghuraman));
    expect(json).not.toContain("Offer");
    expect(json).toContain("https://www.charuraghu.com");
    expect(json).toContain(
      "/chennai-local-events/charumathi-raghuraman-bhavans-margazhi-mylapore-november-2026",
    );
  });

  it("lists the directory and each artist for the sitemap", () => {
    const paths = musicSitemapEntries().map((entry) => entry.path);
    expect(paths).toContain("/music/artist");
    expect(paths).toContain("/music/artist/charumathi-raghuraman");
    expect(paths).toContain("/music/artist/jayanthi-kumaresh");
  });

  it("keeps Jayanthi’s nine Chennai dates on the sheet facts", () => {
    expect(jayanthiKumaresh.concerts).toHaveLength(9);
    expect(jayanthiKumaresh.concerts.every((concert) => concert.eventSlug)).toBe(
      true,
    );
    expect(jayanthiKumaresh.concerts.every((concert) => concert.city === "Chennai")).toBe(
      true,
    );
    const namedWith = jayanthiKumaresh.concerts.filter((concert) => concert.withLine);
    expect(namedWith).toHaveLength(1);
    expect(namedWith[0]?.withLine).toBe("Anil Srinivasan");

    const concert = jayanthiKumaresh.concerts[0];
    const description = concertEventDescription(jayanthiKumaresh, concert);
    expect(description).toContain("https://www.jayanthikumaresh.com/schedule");
    expect(description).toContain("does not print a fare");
    expect(description).toContain("does not print a street");
    expect(description).not.toMatch(/\*\*With:\*\*/);
    expect(description).not.toMatch(/₹|TTK Road|Royapettah/i);

    const withAnil = jayanthiKumaresh.concerts.find(
      (item) => item.id === "kalakshetra-anil-srinivasan",
    );
    expect(withAnil?.startHour).toBe(9);
    expect(withAnil?.startMinute).toBe(30);
    expect(concertEventDescription(jayanthiKumaresh, withAnil!)).toContain(
      "Anil Srinivasan",
    );
  });
});
