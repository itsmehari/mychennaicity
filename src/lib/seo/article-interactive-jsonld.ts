type HowToJson = {
  type: "howto";
  name?: string;
  steps: { name: string; text: string }[];
};

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

/** HowTo JSON-LD from `interactive_json` — FAQ is emitted only in article-rich-snippets. */
export function buildInteractiveExtraJsonLd(
  _articleSlug: string,
  interactive: Record<string, unknown> | null | undefined,
): unknown[] {
  if (!interactive || typeof interactive !== "object") return [];
  const out: unknown[] = [];

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
