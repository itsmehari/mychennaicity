import Link from "next/link";
import type { FeaturedJobCard } from "@/lib/jobs/featured-jobs";

export type FeaturedJobsRailCopy = {
  eyebrow: string;
  title: string;
  lede: string;
};

export function featuredJobsRailCopy(
  placement: string,
  language: "en" | "ta",
  untilLabel: string,
): FeaturedJobsRailCopy {
  if (language === "ta") {
    const through = `${untilLabel} வரை முன்னிலை.`;
    switch (placement) {
      case "job_detail":
        return {
          eyebrow: "வேலை வாய்ப்பு",
          title: "வேறு புதிய வேலை காலியிடங்கள்",
          lede: through,
        };
      case "area_hub":
        return {
          eyebrow: "இந்த பகுதி",
          title: "அருகில் புதிய வேலை காலியிடங்கள்",
          lede: through,
        };
      case "chennai_today":
        return {
          eyebrow: "வேலை",
          title: "இன்றைய புதிய வேலை காலியிடங்கள்",
          lede: through,
        };
      default:
        return {
          eyebrow: "வேலை வாய்ப்பு",
          title: "புதிய வேலை காலியிடங்கள்",
          lede: through,
        };
    }
  }

  const through = `Pinned through ${untilLabel}. Read the listing, then apply on the employer’s WhatsApp.`;
  switch (placement) {
    case "jobs_hub":
      return {
        eyebrow: "Featured hiring",
        title: "Latest job vacancies",
        lede: through,
      };
    case "looking_for_work":
      return {
        eyebrow: "Open roles",
        title: "Latest job vacancies",
        lede:
          "Featured vacancies this week — read the listing, then apply with the employer.",
      };
    case "job_detail":
      return {
        eyebrow: "Featured hiring",
        title: "Other openings to check",
        lede: through,
      };
    case "area_hub":
      return {
        eyebrow: "Hiring",
        title: "Latest vacancies near this area",
        lede: "Open roles linked to this neighbourhood page.",
      };
    case "chennai_today":
      return {
        eyebrow: "Hiring",
        title: "Latest job vacancies today",
        lede: through,
      };
    case "events_hub":
    case "events_detail":
      return {
        eyebrow: "While you are here",
        title: "Latest job vacancies",
        lede: through,
      };
    case "classifieds_hub":
      return {
        eyebrow: "Also on the board",
        title: "Latest job vacancies",
        lede: "Classifieds are local ads. These job listings are pinned beside them through the same window.",
      };
    case "directory":
      return {
        eyebrow: "Work",
        title: "Latest job vacancies",
        lede: through,
      };
    case "gold_rate":
      return {
        eyebrow: "After the rate",
        title: "Latest job vacancies",
        lede: through,
      };
    case "article_sidebar":
      return {
        eyebrow: "Hiring",
        title: "Latest job vacancies",
        lede: `Pinned through ${untilLabel}.`,
      };
    default:
      return {
        eyebrow: "Hiring",
        title: "Latest job vacancies",
        lede: through,
      };
  }
}

function openingsLabel(count: number, language: "en" | "ta"): string {
  if (language === "ta") return `${count} காலியிடம்`;
  return count === 1 ? "1 opening" : `${count} openings`;
}

export function FeaturedJobsRailView({
  cards,
  copy,
  language = "en",
  placement,
  variant = "section",
  className = "",
}: {
  cards: FeaturedJobCard[];
  copy: FeaturedJobsRailCopy;
  language?: "en" | "ta";
  placement: string;
  variant?: "section" | "aside" | "links";
  className?: string;
}) {
  if (cards.length === 0) return null;

  if (variant === "links") {
    return (
      <ul className={`mt-3 space-y-2 ${className}`.trim()} data-featured-jobs={placement}>
        {cards.map((card) => (
          <li key={card.slug}>
            <Link
              href={card.href}
              className="block rounded-xl border border-[color-mix(in_srgb,var(--accent)_28%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))] px-3 py-2.5 no-underline"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                Featured · {openingsLabel(card.openings, language)}
              </span>
              <span className="mt-0.5 block text-sm font-semibold text-[var(--foreground)]">
                {card.title}
              </span>
              <span className="mt-0.5 block text-xs text-[var(--muted)]">
                {card.location}
                {card.pay ? ` · ${card.pay}` : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  const compact = variant === "aside";

  return (
    <section
      data-featured-jobs={placement}
      aria-labelledby={`featured-jobs-${placement}`}
      className={className}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
        {copy.eyebrow}
      </p>
      <h2
        id={`featured-jobs-${placement}`}
        className={
          compact
            ? "mt-1 text-base font-bold text-[var(--foreground)]"
            : "mt-1 text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl"
        }
      >
        {copy.title}
      </h2>
      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        {copy.lede}
      </p>
      <ul
        className={
          compact
            ? "mt-3 space-y-2"
            : "mt-4 grid gap-3 sm:grid-cols-2"
        }
      >
        {cards.map((card) => (
          <li key={card.slug}>
            <Link
              href={card.href}
              className="flex h-full flex-col rounded-2xl border border-[color-mix(in_srgb,var(--accent)_32%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_5%,var(--surface))] p-4 no-underline shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                Featured · {openingsLabel(card.openings, language)}
              </span>
              <span className="mt-1 text-base font-semibold text-[var(--foreground)]">
                {card.title}
              </span>
              <span className="mt-1 text-xs text-[var(--muted)]">
                {card.company} · {card.location}
                {card.pay ? ` · ${card.pay}` : ""}
              </span>
              {compact ? null : (
                <span className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
                  {card.context}
                </span>
              )}
              <span className="mt-3 text-xs font-semibold text-[var(--accent)]">
                {language === "ta" ? "வேலையைப் படிக்க →" : "View listing →"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
