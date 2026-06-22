import type { JobSeekerPostRow } from "@/domains/job-seekers";
import { getSiteUrl } from "@/lib/env";
import {
  CHENNAI_JOBS_HUB_PATH,
  CHENNAI_JOBS_LOOKING_PATH,
  chennaiJobSeekerDetailPath,
} from "@/lib/routes/chennai-jobs";

function clipText(s: string, max = 300): string {
  const t = s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export function buildJobSeekerPostJsonLd(post: JobSeekerPostRow) {
  const base = getSiteUrl();
  const url = `${base}${chennaiJobSeekerDetailPath(post.slug)}`;
  const locality = post.locationLabel?.trim() || "Chennai";
  const personName = post.seekerLabel?.trim() || post.roleSought?.trim() || "Job seeker";
  const description = clipText(post.body) || post.title;

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": url,
    url,
    name: post.title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${base}/#website` },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntity: {
      "@type": "Person",
      name: personName,
      description,
      jobTitle: post.roleSought?.trim() || undefined,
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
  };
}

export function buildJobSeekerBreadcrumbJsonLd(slug: string, title: string) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${base}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Jobs in Chennai",
        item: `${base}${CHENNAI_JOBS_HUB_PATH}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Looking for work",
        item: `${base}${CHENNAI_JOBS_LOOKING_PATH}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: title,
        item: `${base}${chennaiJobSeekerDetailPath(slug)}`,
      },
    ],
  };
}

export function buildJobSeekersHubJsonLd(
  posts: JobSeekerPostRow[],
) {
  const base = getSiteUrl();
  const pageUrl = `${base}${CHENNAI_JOBS_LOOKING_PATH}`;
  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": pageUrl,
    url: pageUrl,
    name: "Looking for work in Chennai",
    description:
      "Chennai residents and workers posting that they are available for hire — watchmen, caretakers, household help, and more.",
    isPartOf: { "@id": `${base}/#website` },
    inLanguage: "en-IN",
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: posts.length,
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${base}${chennaiJobSeekerDetailPath(p.slug)}`,
    })),
  };
  return { collectionPage, itemList };
}
