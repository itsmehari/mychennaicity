import type { Metadata } from "next";
import type { MusicSabha } from "@/content/music/types";
import { MUSIC_SABHAS_PATH, musicSabhaPath } from "@/content/music/types";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const SABHAS_HUB_TITLE = "Sabhas in Chennai";

export const SABHAS_PASSAGE =
  "A sabha is the Chennai word for the organisation that hosts the concerts. The spelling in print is sabha. Open https://mychennaicity.in/music/sabha for the hall’s own programme. A musician’s dates stay on https://mychennaicity.in/music/artist. A named concert stays on the events calendar.";

export const SABHAS_FOOTER_LINK = {
  href: MUSIC_SABHAS_PATH,
  label: "Sabhas",
};

export function sabhaAnswer(sabha: MusicSabha): string {
  const days = new Set(sabha.sessions.map((item) => item.printedDate)).size;
  return `${sabha.name} is a sabha in ${sabha.city}. This page is the ${sabha.hall} programme from the printed sheet: ${sabha.sessions.length} sessions across ${days} mornings, from 16 December 2026 to 1 January 2027. It is the Academy’s conference schedule, not one concert. ${sabha.presidedBy ? `Presided by ${sabha.presidedBy}. ` : ""}${sabha.convenor ? `Convenor ${sabha.convenor}. ` : ""}The sheet does not print a fare or a street.`;
}

export function sabhaFaq(sabha: MusicSabha): { question: string; answer: string }[] {
  return [
    {
      question: `What is a sabha?`,
      answer:
        "A sabha is the Chennai word for the organisation that hosts concerts and lecture sessions. English writing sometimes says concert hall. The spelling used in print is sabha.",
    },
    {
      question: `Where are ${sabha.name}’s academic sessions?`,
      answer: `${sabha.hall}, ${sabha.name} Madras, ${sabha.city}. The sheet does not print a street or a PIN. ${sabha.admission ?? ""}`.trim(),
    },
    {
      question: `Is the academic sheet one concert?`,
      answer:
        "No. The sheet is the morning conference programme. Named evening concerts that we already list are linked separately on this page.",
    },
  ];
}

export function sabhaPageTitle(sabha: MusicSabha): string {
  return `${sabha.name} — sabha programme, ${sabha.city}`;
}

export function musicSabhaMetadata(sabha: MusicSabha): Metadata {
  const title = sabhaPageTitle(sabha);
  const description = sabhaAnswer(sabha);
  const path = musicSabhaPath(sabha.slug);
  return {
    title: { absolute: fullSiteTitle(title) },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: [{ url: sabha.poster.src, alt: sabha.poster.alt }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function musicSabhaHubMetadata(): Metadata {
  const title = SABHAS_HUB_TITLE;
  const description = SABHAS_PASSAGE;
  return {
    title: { absolute: fullSiteTitle(title) },
    description,
    alternates: { canonical: MUSIC_SABHAS_PATH },
    openGraph: { title, description, url: MUSIC_SABHAS_PATH },
  };
}
