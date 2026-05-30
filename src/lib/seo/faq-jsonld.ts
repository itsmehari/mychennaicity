/** FAQPage JSON-LD — shared by events, news, and hubs. */

export type FaqItem = { question: string; answer: string };

export function buildFaqPageJsonLdFromItems(items: FaqItem[]) {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
