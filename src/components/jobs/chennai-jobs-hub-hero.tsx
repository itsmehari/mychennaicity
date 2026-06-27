import Link from "next/link";
import { WhatsAppCommunityJoinLink } from "@/components/community/whatsapp-community-join-link";

type Props = {
  totalJobs: number;
  hasLiveJobs: boolean;
};

function ChennaiJobsIllustration() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-full w-full max-w-[320px]"
      aria-hidden
      role="img"
    >
      <defs>
        <linearGradient id="mcj-sky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dff5ec" />
          <stop offset="100%" stopColor="#f8fffc" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#mcj-sky)" rx="16" />
      <ellipse cx="70" cy="48" rx="34" ry="14" fill="#fff" opacity="0.85" />
      <ellipse cx="210" cy="36" rx="42" ry="16" fill="#fff" opacity="0.75" />
      <rect x="28" y="118" width="36" height="62" rx="4" fill="#b8ddd2" />
      <rect x="72" y="96" width="44" height="84" rx="4" fill="#8fcec0" />
      <rect x="126" y="108" width="38" height="72" rx="4" fill="#a8d9cc" />
      <rect x="174" y="88" width="52" height="92" rx="4" fill="#6fbfad" />
      <rect x="236" y="104" width="40" height="76" rx="4" fill="#9ad4c6" />
      <rect x="0" y="168" width="320" height="32" fill="#d4eee6" />
      <circle cx="48" cy="162" r="18" fill="#7ec4b0" />
      <circle cx="268" cy="158" r="22" fill="#8fcec0" />
      <path
        d="M0 178 Q80 168 160 176 T320 174 L320 200 L0 200 Z"
        fill="#c5e8dd"
        opacity="0.6"
      />
    </svg>
  );
}

export function ChennaiJobsHubHero({ totalJobs, hasLiveJobs }: Props) {
  return (
    <section className="mcc-jobs-hub__hero" aria-labelledby="chennai-jobs-hero-title">
      <div className="mcc-jobs-hub__hero-grid">
        <div>
          <p className="type-eyebrow text-[var(--accent)]">Work</p>
          <h1 id="chennai-jobs-hero-title" className="mcc-jobs-hub__hero-title">
            Jobs in Chennai
          </h1>
          <p className="mcc-jobs-hub__hero-lede">
            Find curated job openings, walk-in updates, office roles, field jobs,
            internships and local hiring opportunities across Chennai.
          </p>
          <div className="mcc-jobs-hub__hero-actions">
            <Link href="/contact#jobs" className="mcc-jobs-hub__btn-primary">
              Post a Chennai Job
            </Link>
            <WhatsAppCommunityJoinLink
              utmContent="jobs-hub-hero"
              className="mcc-jobs-hub__btn-secondary mcc-jobs-hub__btn-whatsapp"
            >
              Join Jobs WhatsApp Group
            </WhatsAppCommunityJoinLink>
          </div>
          <div className="mcc-jobs-hub__hero-stats">
            <div className="mcc-jobs-hub__hero-stat">
              <p className="mcc-jobs-hub__hero-stat-value">
                {hasLiveJobs ? totalJobs : "—"}
              </p>
              <p className="mcc-jobs-hub__hero-stat-label">Open jobs</p>
            </div>
            <div className="mcc-jobs-hub__hero-stat">
              <p className="mcc-jobs-hub__hero-stat-value">Updated</p>
              <p className="mcc-jobs-hub__hero-stat-label">Regularly</p>
            </div>
            <div className="mcc-jobs-hub__hero-stat">
              <p className="mcc-jobs-hub__hero-stat-value">Chennai</p>
              <p className="mcc-jobs-hub__hero-stat-label">Focused</p>
            </div>
            <div className="mcc-jobs-hub__hero-stat">
              <p className="mcc-jobs-hub__hero-stat-value">Free</p>
              <p className="mcc-jobs-hub__hero-stat-label">To browse</p>
            </div>
          </div>
        </div>
        <div className="mcc-jobs-hub__illustration" aria-hidden>
          <ChennaiJobsIllustration />
        </div>
      </div>
    </section>
  );
}
