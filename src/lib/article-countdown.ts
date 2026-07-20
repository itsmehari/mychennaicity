export type ArticleCountdownData = {
  title: string;
  subtitle?: string;
  endsAt: string;
  ctaLabel?: string;
  ctaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  expiredLabel?: string;
  note?: string;
};

/** Parse countdown payload from article.interactiveJson — safe for Server Components. */
export function readArticleCountdown(
  interactive: Record<string, unknown> | null | undefined,
): ArticleCountdownData | null {
  if (!interactive || typeof interactive !== "object") return null;
  const raw = interactive.countdown;
  if (!raw || typeof raw !== "object") return null;
  const c = raw as Record<string, unknown>;
  if (typeof c.title !== "string" || !c.title.trim()) return null;
  if (typeof c.endsAt !== "string" || !c.endsAt.trim()) return null;
  return {
    title: c.title.trim(),
    subtitle: typeof c.subtitle === "string" ? c.subtitle.trim() : undefined,
    endsAt: c.endsAt.trim(),
    ctaLabel: typeof c.ctaLabel === "string" ? c.ctaLabel.trim() : undefined,
    ctaUrl: typeof c.ctaUrl === "string" ? c.ctaUrl.trim() : undefined,
    secondaryCtaLabel:
      typeof c.secondaryCtaLabel === "string"
        ? c.secondaryCtaLabel.trim()
        : undefined,
    secondaryCtaUrl:
      typeof c.secondaryCtaUrl === "string"
        ? c.secondaryCtaUrl.trim()
        : undefined,
    expiredLabel:
      typeof c.expiredLabel === "string" ? c.expiredLabel.trim() : undefined,
    note: typeof c.note === "string" ? c.note.trim() : undefined,
  };
}
