import type { FaqItem } from "@/lib/seo/faq-jsonld";

const FAQ_HEADING =
  /^## (Common questions|பொதுவான கேள்விகள்)\s*$/m;

function plain(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** Visible `## Common questions` / `## பொதுவான கேள்விகள்` block → FAQ items. */
export function extractJobFaqs(body: string): FaqItem[] {
  const match = body.match(FAQ_HEADING);
  if (!match || match.index == null) return [];
  const after = body.slice(match.index + match[0].length);
  const section = after.split(/^## /m)[0] ?? "";
  const chunks = section.split(/^### /m).slice(1);
  const items: FaqItem[] = [];
  for (const chunk of chunks) {
    const lines = chunk.trim().split("\n");
    const question = plain(lines[0] ?? "");
    const answer = plain(lines.slice(1).join(" "));
    if (question && answer) items.push({ question, answer });
  }
  return items;
}

/** First `- **Benefits:**` or Tamil `- **சலுகை:**` bullet, for JobPosting.jobBenefits. */
export function extractJobBenefits(body: string): string | null {
  const match = body.match(
    /^-\s+\*\*(?:Benefits|Stay|சலுகை|தங்குமிடம்):\*\*\s+(.+)$/m,
  );
  if (!match?.[1]) return null;
  const value = plain(match[1]);
  return value || null;
}
