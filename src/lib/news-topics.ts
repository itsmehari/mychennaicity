/** URL segment → exact `articles.category` value (Chennai news). */
export const TOPIC_SLUG_TO_CATEGORY: Record<string, string> = {
  politics: "Politics",
  chennai: "Chennai",
  elections: "Elections",
  economy: "Economy",
  consumer: "Consumer",
  mobility: "Mobility",
};

/** Stable nav order for topic hub links (interior pages + empty states). */
export const CHENNAI_NEWS_TOPIC_NAV: { slug: string; label: string }[] = [
  { slug: "chennai", label: "Chennai" },
  { slug: "politics", label: "Politics" },
  { slug: "elections", label: "Elections" },
  { slug: "economy", label: "Economy" },
  { slug: "consumer", label: "Consumer" },
  { slug: "mobility", label: "Mobility" },
];

export function categoryToTopicSlug(category: string): string {
  return category
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function topicSlugToCategory(topicSlug: string): string | undefined {
  return TOPIC_SLUG_TO_CATEGORY[topicSlug];
}
