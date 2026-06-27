import Link from "next/link";
import type { ChennaiJobsHubCard } from "@/lib/jobs/chennai-jobs-hub-helpers";

export function ChennaiJobsHubCardView({ card }: { card: ChennaiJobsHubCard }) {
  const metaParts = [
    card.location,
    card.employmentType,
    card.workMode,
    card.isFresherFriendly ? "Freshers can apply" : null,
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
        <div
          className="mcc-jobs-hub__job-badge"
          aria-hidden
          title={card.employerName}
        >
          {card.initials}
        </div>
        <div className="min-w-0">
          <h2 className="mcc-jobs-hub__job-title">
            <Link href={card.href}>{card.title}</Link>
          </h2>
          <p className="mcc-jobs-hub__job-employer">
            {card.employerName}
            {card.employerVerified ? (
              <span className="font-medium text-[var(--accent)]">
                {" "}
                · Checked by us
              </span>
            ) : null}
          </p>
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
            {card.compensation ? (
              <p className="mcc-jobs-hub__job-salary">{card.compensation}</p>
            ) : (
              <span />
            )}
            <div className="mcc-jobs-hub__job-actions">
              <Link href={card.href} className="mcc-jobs-hub__job-btn mcc-jobs-hub__job-btn--ghost">
                Read more
              </Link>
              <Link
                href={card.href}
                className="mcc-jobs-hub__job-btn mcc-jobs-hub__job-btn--primary"
              >
                Apply / Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
