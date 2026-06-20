/** FAQPage JSON-LD — shared by events, news, and hubs. */

export type FaqItem = { question: string; answer: string };

export type FaqPageJsonLdOptions = {
  /** Canonical article/page URL for `mainEntityOfPage`. */
  pageUrl?: string;
  /** In-page FAQ anchor (without `#`). */
  fragment?: string;
};

export function buildFaqPageJsonLdFromItems(
  items: FaqItem[],
  options?: FaqPageJsonLdOptions,
) {
  if (!items.length) return null;
  const pageUrl = options?.pageUrl?.trim();
  const fragment = options?.fragment?.trim();
  const pageId =
    pageUrl && fragment ? `${pageUrl}#${fragment}` : pageUrl || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageId ? { mainEntityOfPage: { "@type": "WebPage", "@id": pageId } } : {}),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.trim(),
      },
    })),
  };
}
