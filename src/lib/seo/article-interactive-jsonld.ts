type FaqJson = {
  type: "faq";
  items: { question: string; answer: string }[];
};

type HowToJson = {
  type: "howto";
  name?: string;
  steps: { name: string; text: string }[];
};

function isFaqJson(data: Record<string, unknown>): data is FaqJson {
  if (data.type !== "faq" || !Array.isArray(data.items)) return false;
  return data.items.every(
    (x) =>
      x &&
      typeof x === "object" &&
      typeof (x as { question?: unknown }).question === "string" &&
      typeof (x as { answer?: unknown }).answer === "string" &&
      (x as { question: string }).question.trim() &&
      (x as { answer: string }).answer.trim(),
  );
}

function isHowToJson(data: Record<string, unknown>): data is HowToJson {
  if (data.type !== "howto" || !Array.isArray(data.steps)) return false;
  return data.steps.every(
    (x) =>
      x &&
      typeof x === "object" &&
      typeof (x as { name?: unknown }).name === "string" &&
      typeof (x as { text?: unknown }).text === "string" &&
      (x as { name: string }).name.trim() &&
      (x as { text: string }).text.trim(),
  );
}

/** FAQPage / HowTo JSON-LD from `interactive_json` — only when blocks are non-empty and valid. */
export function buildInteractiveExtraJsonLd(
  _articleSlug: string,
  interactive: Record<string, unknown> | null | undefined,
): unknown[] {
  if (!interactive || typeof interactive !== "object") return [];
  const out: unknown[] = [];

  if (isFaqJson(interactive)) {
    out.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: interactive.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  if (isHowToJson(interactive)) {
    out.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: interactive.name?.trim() || "Steps",
      step: interactive.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    });
  }

  return out;
}
