import { describe, expect, it } from "vitest";
import { concertsAtSabha, getMusicSabha, musicSitemapEntries } from "@/content/music";
import { musicAcademy } from "@/content/music/sabhas/music-academy";
import { buildMusicSabhaJsonLd } from "@/lib/seo/music-sabha-jsonld";

describe("music sabhas", () => {
  it("uses the printed spelling sabha and keeps the academic sheet off a single concert", () => {
    expect(musicAcademy.slug).toBe("music-academy");
    expect(musicSitemapEntries().map((entry) => entry.path)).toContain("/music/sabha/music-academy");
    expect(musicAcademy.sessions).toHaveLength(32);
    expect(musicAcademy.sessions.some((item) => item.printedDate.includes("20 Dec 2025"))).toBe(true);
    expect(musicAcademy.street).toBeNull();
    expect(JSON.stringify(musicAcademy)).not.toContain("Rs.");
    const json = JSON.stringify(buildMusicSabhaJsonLd(musicAcademy));
    expect(json).not.toContain("Offer");
    expect(json).toContain("Tiruvottriyur Tyagier");
    expect(getMusicSabha("music-academy")?.name).toBe("The Music Academy");
  });

  it("links artist dates whose venue is the Music Academy", () => {
    const hosted = concertsAtSabha(musicAcademy);
    expect(hosted.some((item) => item.artist.slug === "jayanthi-kumaresh")).toBe(true);
    expect(hosted.some((item) => item.artist.slug === "ramana-balachandran")).toBe(true);
    expect(hosted.some((item) => item.artist.slug === "sreeranjane-kaushik")).toBe(false);
  });
});
