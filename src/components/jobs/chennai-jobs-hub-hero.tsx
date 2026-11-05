import Image from "next/image";
import Link from "next/link";
import { WhatsAppCommunityJoinLink } from "@/components/community/whatsapp-community-join-link";
import { ADVERTISE_JOBS_PATH } from "@/lib/routes/advertise-listings";

type Props = {
  totalJobs: number;
  hasLiveJobs: boolean;
};

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
            Local openings, walk-ins, and internships — we list them; employers
            handle applications.
          </p>
          <div className="mcc-jobs-hub__hero-actions">
            <Link href={ADVERTISE_JOBS_PATH} className="mcc-jobs-hub__btn-primary">
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
        <div className="mcc-jobs-hub__illustration mcc-jobs-hub__illustration--photo">
          <Image
            src="/images/jobs/chennai-jobs-hub-hero.jpg"
            alt="Colleagues looking over a laptop together in a bright office"
            fill
            priority
            sizes="(min-width: 900px) 420px, 100vw"
            className="mcc-jobs-hub__hero-photo"
          />
        </div>
      </div>
    </section>
  );
}
