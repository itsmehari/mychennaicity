import Link from "next/link";
import { WhatsAppCommunityJoinLink } from "@/components/community/whatsapp-community-join-link";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";

type Props = {
  totalProfiles: number;
  hasLiveProfiles: boolean;
};

function SeekersIllustration() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-full w-full max-w-[320px]"
      aria-hidden
      role="img"
    >
      <defs>
        <linearGradient id="mcs-seeker-sky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eef8f3" />
          <stop offset="100%" stopColor="#fffef8" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#mcs-seeker-sky)" rx="16" />
      <circle cx="100" cy="88" r="28" fill="#b8ddd2" />
      <rect x="78" y="118" width="44" height="52" rx="10" fill="#8fcec0" />
      <circle cx="210" cy="82" r="24" fill="#c5e8dd" />
      <rect x="192" y="108" width="36" height="48" rx="8" fill="#a8d9cc" />
      <rect x="28" y="158" width="264" height="8" rx="4" fill="#d4eee6" opacity="0.8" />
      <rect x="48" y="172" width="80" height="6" rx="3" fill="#e8f7f2" />
      <rect x="192" y="172" width="96" height="6" rx="3" fill="#e8f7f2" />
    </svg>
  );
}

export function ChennaiSeekersHubHero({ totalProfiles, hasLiveProfiles }: Props) {
  return (
    <section className="mcc-jobs-hub__hero" aria-labelledby="chennai-seekers-hero-title">
      <div className="mcc-jobs-hub__hero-grid">
        <div>
          <p className="type-eyebrow text-[var(--accent)]">Work</p>
          <h1 id="chennai-seekers-hero-title" className="mcc-jobs-hub__hero-title">
            Looking for work in Chennai
          </h1>
          <p className="mcc-jobs-hub__hero-lede">
            People in Chennai posting that they are available to hire — watchmen,
            caretakers, household help, and similar roles. Employers can read profiles
            and reach out directly.
          </p>
          <div className="mcc-jobs-hub__hero-actions">
            <Link href="/contact#jobs" className="mcc-jobs-hub__btn-primary">
              Post availability
            </Link>
            <Link href={CHENNAI_JOBS_HUB_PATH} className="mcc-jobs-hub__btn-secondary">
              Browse open jobs
            </Link>
            <WhatsAppCommunityJoinLink
              utmContent="jobs-seeking-hub-hero"
              className="mcc-jobs-hub__btn-secondary mcc-jobs-hub__btn-whatsapp"
            >
              Join Jobs WhatsApp Group
            </WhatsAppCommunityJoinLink>
          </div>
          <div className="mcc-jobs-hub__hero-stats">
            <div className="mcc-jobs-hub__hero-stat">
              <p className="mcc-jobs-hub__hero-stat-value">
                {hasLiveProfiles ? totalProfiles : "—"}
              </p>
              <p className="mcc-jobs-hub__hero-stat-label">Profiles</p>
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
          <SeekersIllustration />
        </div>
      </div>
    </section>
  );
}
