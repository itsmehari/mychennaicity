import { describe, expect, it } from "vitest";
import { charumathiRaghuraman } from "@/content/music/artists/charumathi-raghuraman";
import { jayanthiKumaresh } from "@/content/music/artists/jayanthi-kumaresh";
import { ramanaBalachandran } from "@/content/music/artists/ramana-balachandran";
import { kiranNivi } from "@/content/music/artists/kiran-nivi";
import { spoorthiRao, SPOORTHI_MAHA_UTSAVAM_EVENT_SLUG } from "@/content/music/artists/spoorthi-rao";
import { sreeranjaneKaushik } from "@/content/music/artists/sreeranjane-kaushik";
import { concertEventDescription, concertEventTitle } from "@/content/music/event-copy";
import {
  artistAnswer,
  artistFaq,
  artistPageTitle,
  MUSIC_SEASON_FOOTER_LINK,
  musicArtistMetadata,
} from "@/content/music/search-copy";
import { concertHoldEnd, concertHoldEndLabel } from "@/content/music/format";
import {
  artistForEventSlug,
  getMusicArtist,
  listMusicArtists,
  musicArtistPath,
  musicSitemapEntries,
  MUSIC_ARTISTS_PATH,
} from "@/content/music";
import {
  buildMusicArtistFaqJsonLd,
  buildMusicArtistJsonLd,
  buildMusicHubJsonLd,
} from "@/lib/seo/music-artist-jsonld";

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
    expect(eventSlugs).toHaveLength(65);
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

  it("builds Chennai titles, answers, and FAQ from the sheet", () => {
    const title = artistPageTitle(jayanthiKumaresh);
    const answer = artistAnswer(jayanthiKumaresh);
    const faq = artistFaq(jayanthiKumaresh);
    expect(title).toBe("Dr Jayanthi Kumaresh — concert schedule, Chennai");
    expect(answer).toContain("Chennai");
    expect(answer).toContain("does not sell these tickets");
    expect(answer).not.toMatch(/₹/);
    expect(faq.map((item) => item.question)).toEqual([
      "When is Dr Jayanthi Kumaresh performing in Chennai?",
      "Where are Dr Jayanthi Kumaresh's Chennai concerts?",
      "Where do I buy tickets for Dr Jayanthi Kumaresh?",
    ]);
    expect(JSON.stringify(buildMusicArtistFaqJsonLd(jayanthiKumaresh))).toContain(
      faq[0]?.answer,
    );

    const meta = musicArtistMetadata(jayanthiKumaresh);
    expect(meta.description).toBe(answer);
    expect(meta.title).toBe(title);

    const json = JSON.stringify(buildMusicArtistJsonLd(jayanthiKumaresh));
    expect(json).toContain("PostalAddress");
    expect(json).toContain('"addressCountry":"IN"');
    expect(json).not.toContain("endDate");
    expect(json).not.toContain("Offer");
    expect(json).not.toContain("streetAddress");

    const hub = JSON.stringify(buildMusicHubJsonLd());
    expect(hub).toContain("CollectionPage");
    expect(hub).toContain("/music/artist/jayanthi-kumaresh");
    expect(hub).toContain("/music/artist/charumathi-raghuraman");
    expect(hub).toContain("/music/artist/ramana-balachandran");
    expect(MUSIC_SEASON_FOOTER_LINK).toEqual({
      href: "/music/artist",
      label: "Music season",
    });
  });

  it("keeps Ramana’s sheet facts and leaves out-of-city dates off the calendar", () => {
    expect(ramanaBalachandran.concerts).toHaveLength(19);
    expect(ramanaBalachandran.ticketUrl).toBeNull();
    const chennai = ramanaBalachandran.concerts.filter((concert) => concert.eventSlug);
    expect(chennai).toHaveLength(13);
    expect(chennai.every((concert) => concert.city === "Chennai")).toBe(true);
    const away = ramanaBalachandran.concerts.filter((concert) => !concert.eventSlug);
    expect(away.map((concert) => concert.city)).toEqual([
      "Hyderabad",
      "Thiruvisanallur",
      "Varanasi",
      "",
      "Kolkata",
      "Mumbai",
    ]);
    const mumbai = ramanaBalachandran.concerts.find((concert) => concert.id === "banyan-tree");
    expect(mumbai?.startHour).toBeNull();
    const description = concertEventDescription(ramanaBalachandran, chennai[0]);
    expect(description).toContain("does not print a ticket link");
    expect(description).not.toMatch(/₹/);
    expect(artistAnswer(ramanaBalachandran)).toContain("does not print a ticket link");
    expect(musicSitemapEntries().map((entry) => entry.path)).toContain(
      "/music/artist/ramana-balachandran",
    );
  });

  it("uses the printed 2025–26 finishes on Sreeranjane’s sheet", () => {
    expect(sreeranjaneKaushik.concerts).toHaveLength(10);
    expect(sreeranjaneKaushik.ticketUrl).toBeNull();
    const first = sreeranjaneKaushik.concerts[0];
    expect(first?.date).toBe("2025-12-04");
    expect(first?.printedEndHour).toBe(12);
    expect(first?.printedEndMinute).toBe(40);
    const midnight = sreeranjaneKaushik.concerts.find((concert) => concert.id === "naadabrahmam");
    expect(midnight?.printedEndNextDay).toBe(true);
    const description = concertEventDescription(sreeranjaneKaushik, first!);
    expect(description).toContain("prints that finish");
    expect(description).not.toContain("does not print a closing time");
    const swaranjali = sreeranjaneKaushik.concerts.find(
      (concert) => concert.id === "swaranjali-delhi-parampara",
    );
    expect(concertEventDescription(sreeranjaneKaushik, swaranjali!)).toContain("Millenium");
    const json = JSON.stringify(buildMusicArtistJsonLd(sreeranjaneKaushik));
    expect(json).toContain("endDate");
    expect(json).not.toContain("Offer");
  });

  it("keeps Spoorthi’s sheet facts and leaves out-of-city dates and awards off the calendar", () => {
    expect(spoorthiRao.concerts).toHaveLength(23);
    expect(spoorthiRao.ticketUrl).toBeNull();
    expect(spoorthiRao.role).toBe("Veena");
    const chennai = spoorthiRao.concerts.filter((concert) => concert.eventSlug);
    expect(chennai).toHaveLength(17);
    expect(chennai.every((concert) => concert.city === "Chennai")).toBe(true);
    const utsavam = spoorthiRao.concerts.find((concert) => concert.id === "margazhi-maha-utsavam");
    expect(utsavam?.eventSlug).toBe(SPOORTHI_MAHA_UTSAVAM_EVENT_SLUG);
    expect(utsavam?.localityLabel).toBe("Adyar");
    expect(utsavam?.note).toContain("Vaishnavam");
    const soulfest = spoorthiRao.concerts.find((concert) => concert.id === "soulfest");
    expect(soulfest?.startHour).toBe(22);
    expect(concertHoldEnd(soulfest!).hour).toBe(25);
    expect(concertHoldEndLabel(soulfest!)).toBe("1:30 AM");
    expect(concertEventDescription(spoorthiRao, soulfest!)).toContain("1:30 AM");
    expect(concertEventDescription(spoorthiRao, soulfest!)).not.toContain("null");
    const away = spoorthiRao.concerts.filter((concert) => !concert.eventSlug);
    expect(away.map((concert) => concert.city)).toEqual([
      "Kerala",
      "Bangalore",
      "",
      "",
      "Moodbidri",
      "Manjakkudi",
    ]);
    expect(away.filter((concert) => concert.note?.includes("event label"))).toHaveLength(2);
    expect(spoorthiRao.concerts.find((concert) => concert.id === "kasargod-edneer-mutt")?.title).toBe(
      "Kasargod Edneer Mutt",
    );
    expect(spoorthiRao.concerts.find((concert) => concert.id === "thumbai")?.title).toBe(
      "Thumbai Centre for Arts",
    );
    const description = concertEventDescription(spoorthiRao, chennai[0]);
    expect(description).toContain("does not print a ticket link");
    expect(description).not.toMatch(/₹/);
    expect(musicSitemapEntries().map((entry) => entry.path)).toContain(
      "/music/artist/spoorthi-rao",
    );
    const json = JSON.stringify(buildMusicArtistJsonLd(spoorthiRao));
    expect(json).not.toContain("streetAddress");
    expect(json).not.toContain("Offer");
  });

  it("keeps Kiran & Nivi’s sheet facts and leaves Mumbai and the unplaced date off the calendar", () => {
    expect(kiranNivi.concerts).toHaveLength(10);
    expect(kiranNivi.role).toBe("Sai Sisters");
    expect(kiranNivi.ticketUrl).toBeNull();
    const chennai = kiranNivi.concerts.filter((concert) => concert.eventSlug);
    expect(chennai).toHaveLength(8);
    expect(chennai.every((concert) => concert.city === "Chennai")).toBe(true);
    expect(chennai.every((concert) => concert.withLine === null)).toBe(true);
    const mumbai = kiranNivi.concerts.find((concert) => concert.id === "nmacc-mumbai");
    expect(mumbai?.eventSlug).toBeNull();
    expect(mumbai?.city).toBe("Mumbai");
    expect(mumbai?.startHour).toBe(19);
    expect(mumbai?.startMinute).toBe(30);
    const mdnd = kiranNivi.concerts.find((concert) => concert.id === "mdnd");
    expect(mdnd?.eventSlug).toBeNull();
    expect(mdnd?.city).toBe("");
    expect(mdnd?.venueName).toBe("Location TBD");
    expect(kiranNivi.concerts.find((concert) => concert.id === "vani-mahal")?.title).toBe(
      "Vani mahal (mini hall)",
    );
    expect(kiranNivi.concerts.find((concert) => concert.id === "omr-margazhi")?.localityLabel).toBe(
      "Shollinganallur",
    );
    expect(kiranNivi.concerts.find((concert) => concert.id === "chrompet-margazhi")?.title).toBe(
      "Chrompet Margazhi Festival",
    );
    const description = concertEventDescription(kiranNivi, chennai[0]!);
    expect(description).toContain("does not print a ticket link");
    expect(description).toContain("does not print a street");
    expect(description).not.toMatch(/₹/);
    expect(artistAnswer(kiranNivi)).toContain("12 December 2026 is in Mumbai");
    expect(artistAnswer(kiranNivi)).toContain("26 December 2026 does not name a city");
    const json = JSON.stringify(buildMusicArtistJsonLd(kiranNivi));
    expect(json).not.toContain("streetAddress");
    expect(json).not.toContain("Offer");
    expect(json).not.toContain("endDate");
    expect(musicSitemapEntries().map((entry) => entry.path)).toContain(
      "/music/artist/sai-sisters-kiran-nivi",
    );
  });
});
