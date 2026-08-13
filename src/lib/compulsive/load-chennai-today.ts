import {
  CHENNAI_TODAY_FALLBACK_WEATHER,
  CHENNAI_TODAY_METRO_NOTE,
} from "@/content/compulsive/chennai-today";
import { listPublicEventsForChennaiHub } from "@/domains/events";
import { listPublishedArticlesForChennai } from "@/domains/news";
import { loadChennaiGoldRateHubData } from "@/lib/gold-rate/load-hub-data";
import { formatInrWhole } from "@/lib/gold-rate/format-inr";
import { getSiteUrl } from "@/lib/env";
import { compulsivePath } from "@/content/compulsive/index";

export type ChennaiTodayCard = {
  stamp: string;
  weather: string;
  weatherShort: string;
  metro: string;
  newsTitle: string;
  newsHref: string;
  eventTitle: string;
  eventHref: string;
  goldLine: string | null;
  goldShort: string | null;
  site: string;
  enPath: string;
  taPath: string;
};

function formatIstStamp(d: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

async function fetchWeather(): Promise<{ line: string; short: string }> {
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=13.0827&longitude=80.2707&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FKolkata";
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) {
      return { line: CHENNAI_TODAY_FALLBACK_WEATHER, short: "Typical coastal Chennai day" };
    }
    const data = (await res.json()) as {
      current?: { temperature_2m?: number; relative_humidity_2m?: number };
    };
    const t = data.current?.temperature_2m;
    const h = data.current?.relative_humidity_2m;
    if (t == null) {
      return { line: CHENNAI_TODAY_FALLBACK_WEATHER, short: "Typical coastal Chennai day" };
    }
    const short = `${Math.round(t)}°C${h != null ? `, humidity ~${Math.round(h)}%` : ""}`;
    return {
      short,
      line: `About ${short} (Open-Meteo). Carry water; check rain radar before beach or OMR runs.`,
    };
  } catch {
    return { line: CHENNAI_TODAY_FALLBACK_WEATHER, short: "Typical coastal Chennai day" };
  }
}

export async function loadChennaiTodayCard(): Promise<ChennaiTodayCard> {
  const [weather, articlesResult, eventsResult, goldResult] = await Promise.allSettled([
    fetchWeather(),
    listPublishedArticlesForChennai(1),
    listPublicEventsForChennaiHub(8),
    loadChennaiGoldRateHubData(),
  ]);

  const weatherPack =
    weather.status === "fulfilled"
      ? weather.value
      : { line: CHENNAI_TODAY_FALLBACK_WEATHER, short: "Typical coastal Chennai day" };

  let newsTitle = "Browse the Chennai local news desk";
  let newsHref = "/chennai-local-news";
  if (articlesResult.status === "fulfilled" && articlesResult.value[0]) {
    newsTitle = articlesResult.value[0].title;
    newsHref = `/chennai-local-news/${articlesResult.value[0].slug}`;
  }

  let eventTitle = "See what’s on in Chennai";
  let eventHref = "/chennai-local-events";
  if (eventsResult.status === "fulfilled" && eventsResult.value[0]) {
    eventTitle = eventsResult.value[0].title;
    eventHref = `/chennai-local-events/${eventsResult.value[0].slug}`;
  }

  let goldLine: string | null = null;
  let goldShort: string | null = null;
  if (goldResult.status === "fulfilled") {
    const snap = goldResult.value.snapshot;
    goldShort = `22K ${formatInrWhole(snap.rate22kPerGram)}/g · 24K ${formatInrWhole(snap.rate24kPerGram)}/g`;
    goldLine = `Chennai gold today: ${goldShort}${goldResult.value.fromDatabase ? "" : " (indicative)"}.`;
  }

  return {
    stamp: formatIstStamp(new Date()),
    weather: weatherPack.line,
    weatherShort: weatherPack.short,
    metro: CHENNAI_TODAY_METRO_NOTE,
    newsTitle,
    newsHref,
    eventTitle,
    eventHref,
    goldLine,
    goldShort,
    site: getSiteUrl(),
    enPath: compulsivePath("chennai-today"),
    taPath: "/chennai-today-tamil",
  };
}

export function buildWhatsAppForward(card: ChennaiTodayCard, lang: "en" | "ta"): string {
  const url = `${card.site}${lang === "ta" ? card.taPath : card.enPath}`;
  if (lang === "ta") {
    return [
      `🌅 *சென்னை இன்று* · ${card.stamp}`,
      `🌤 ${card.weatherShort}`,
      `🚇 மெட்ரோ: பேஸ்-2 பணிகள் — அலுவலக வழிகளில் நேரம் கூடுதலாக வைக்கவும்`,
      card.goldShort ? `🥇 தங்கம் ${card.goldShort}` : null,
      `📰 ${card.newsTitle}`,
      `🎉 ${card.eventTitle}`,
      ``,
      `முழு கார்டு: ${url}`,
      `#சென்னை #mychennaicity`,
    ]
      .filter(Boolean)
      .join("\n");
  }
  return [
    `🌅 *Chennai today* · ${card.stamp}`,
    `🌤 ${card.weatherShort}`,
    `🚇 Metro: Phase 2 works — leave buffer on office routes`,
    card.goldShort ? `🥇 Gold ${card.goldShort}` : null,
    `📰 ${card.newsTitle}`,
    `🎉 ${card.eventTitle}`,
    ``,
    `Open the live card: ${url}`,
    `#Chennai #mychennaicity`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppAdminDraft(card: ChennaiTodayCard, lang: "en" | "ta"): string {
  const forward = buildWhatsAppForward(card, lang);
  if (lang === "ta") {
    return `${forward}\n\n—\nகுழு நிர்வாகி குறிப்பு: இது mychennaicity.in காலை அட்டை. அவசர அறிவிப்பு அல்ல. மெட்ரோ/வானிலை உறுதிப்படுத்த அதிகாரப்பூர்வ சேனல்களைப் பார்க்கவும்.`;
  }
  return `${forward}\n\n—\nGroup-admin note: Morning card from mychennaicity.in — not a GCC emergency alert. Confirm Metro / weather on official channels before acting.`;
}
