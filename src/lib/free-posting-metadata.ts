import type { Metadata } from "next";
import {
  FREE_POST_GUIDES,
  FREE_POST_HUB_DESCRIPTION,
  FREE_POST_HUB_PATH,
  type FreePostKind,
} from "@/content/free-posting";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export function freePostGuideMetadata(kind: FreePostKind): Metadata {
  const guide = FREE_POST_GUIDES[kind];
  const url = `${getSiteUrl()}${guide.path}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: fullSiteTitle(guide.title),
      description: guide.description,
      url,
      locale: "en_IN",
    },
    other: { ...CHENNAI_GEO_META },
  };
}

export function freePostHubMetadata(): Metadata {
  const url = `${getSiteUrl()}${FREE_POST_HUB_PATH}`;
  const title = "How to post for free on MyChennaiCity";
  return {
    title,
    description: FREE_POST_HUB_DESCRIPTION,
    alternates: { canonical: url },
    openGraph: {
      title: fullSiteTitle(title),
      description: FREE_POST_HUB_DESCRIPTION,
      url,
      locale: "en_IN",
    },
    other: { ...CHENNAI_GEO_META },
  };
}

/** Old public post URLs. Canonical is the guide, never this URL. */
export function freePostHandoffMetadata(kind: FreePostKind): Metadata {
  const guide = FREE_POST_GUIDES[kind];
  const url = `${getSiteUrl()}${guide.path}`;
  return {
    title: guide.title,
    description: guide.description,
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: fullSiteTitle(guide.title),
      description: guide.description,
      url,
      locale: "en_IN",
    },
  };
}
