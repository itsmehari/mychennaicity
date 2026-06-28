import Link from "next/link";
import type { ChennaiSeekerHubCard } from "@/lib/jobs/chennai-seekers-hub-helpers";

export function ChennaiSeekersHubCardView({ card }: { card: ChennaiSeekerHubCard }) {
  const metaParts = [
    card.roleSought ?? "Available for hire",
    card.location,
    card.needsAccommodation ? "Stay needed" : null,
    card.availability,
    card.hasTamil && card.hasEnglish
      ? "Tamil & English"
      : card.hasTamil
        ? "Tamil"
        : card.hasEnglish
          ? "English"
          : null,
  ].filter(Boolean);

  return (
    <article className="mcc-jobs-hub__job-card">
      <div className="mcc-jobs-hub__job-card-inner">
        <div className="mcc-jobs-hub__job-badge" aria-hidden title={card.seekerLabel ?? card.title}>
          {card.initials}
        </div>
        <div className="min-w-0">
          <h2 className="mcc-jobs-hub__job-title">
            <Link href={card.href}>{card.title}</Link>
          </h2>
          {card.seekerLabel ? (
            <p className="mcc-jobs-hub__job-employer">{card.seekerLabel}</p>
          ) : null}
          {metaParts.length > 0 ? (
            <p className="mcc-jobs-hub__job-meta">{metaParts.join(" · ")}</p>
          ) : null}
          <p className="mcc-jobs-hub__job-excerpt">{card.excerpt}</p>
          {card.tags.length > 0 ? (
            <div className="mcc-jobs-hub__job-tags">
              {card.tags.map((tag) => (
                <span key={tag} className="mcc-jobs-hub__job-tag">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mcc-jobs-hub__job-footer">
            <span />
            <div className="mcc-jobs-hub__job-actions">
              <Link href={card.href} className="mcc-jobs-hub__job-btn mcc-jobs-hub__job-btn--ghost">
                Read profile
              </Link>
              <Link href={card.href} className="mcc-jobs-hub__job-btn mcc-jobs-hub__job-btn--primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
