import { listMusicSabhas, musicSabhaPath } from "@/content/music";
import { sabhaAnswer, sabhaFaq } from "@/content/music/sabha-copy";
import { MUSIC_SABHAS_PATH, type MusicSabha, type SabhaSession } from "@/content/music/types";
import { getSiteUrl } from "@/lib/env";

const MONTHS: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

function sessionStart(item: SabhaSession): string | undefined {
  const date = item.printedDate.match(/(\d{1,2}) ([A-Za-z]{3}) (\d{4})/);
  if (!date) return undefined;
  const month = MONTHS[date[2]];
  if (!month) return undefined;
  const day = date[1].padStart(2, "0");
  const clock = item.time.match(/(\d{1,2}):(\d{2})/);
  if (!clock) return `${date[3]}-${month}-${day}`;
  return `${date[3]}-${month}-${day}T${clock[1].padStart(2, "0")}:${clock[2]}:00+05:30`;
}

function place(sabha: MusicSabha): Record<string, unknown> {
  return {
    "@type": "Place",
    name: `${sabha.hall}, ${sabha.name}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: sabha.city,
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };
}

export function buildMusicSabhaJsonLd(sabha: MusicSabha): Record<string, unknown> {
  const base = getSiteUrl().replace(/\/$/, "");
  const pageUrl = `${base}${musicSabhaPath(sabha.slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: sabha.name,
    description: sabhaAnswer(sabha),
    url: pageUrl,
    image: new URL(sabha.poster.src, base).toString(),
    location: place(sabha),
    event: sabha.sessions.map((item) => {
      const startDate = sessionStart(item);
      return {
        "@type": "EducationEvent",
        name: item.topic !== "—" ? item.topic : item.speaker,
        description: `${item.printedDate}, ${item.time}. ${item.speaker}.`,
        ...(startDate ? { startDate } : {}),
        url: `${pageUrl}#${item.id}`,
        location: place(sabha),
      };
    }),
  };
}

export function buildMusicSabhaFaqJsonLd(sabha: MusicSabha): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sabhaFaq(sabha).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function buildMusicSabhaBreadcrumbJsonLd(sabha: MusicSabha): Record<string, unknown> {
  const base = getSiteUrl().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Sabhas", item: `${base}${MUSIC_SABHAS_PATH}` },
      { "@type": "ListItem", position: 3, name: sabha.name, item: `${base}${musicSabhaPath(sabha.slug)}` },
    ],
  };
}

export function buildSabhaHubJsonLd(): Record<string, unknown> {
  const base = getSiteUrl().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Sabhas in Chennai",
    url: `${base}${MUSIC_SABHAS_PATH}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: listMusicSabhas().map((sabha, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: sabha.name,
        url: `${base}${musicSabhaPath(sabha.slug)}`,
      })),
    },
  };
}
