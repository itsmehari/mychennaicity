import Link from "next/link";
import { CHENNAI_JOBS_CAREER_RESOURCES } from "@/lib/jobs/chennai-jobs-hub-helpers";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";

export function ChennaiJobsGuideHero() {
  return (
    <section className="mcc-jobs-hub__hero mcc-jobs-guide__hero" aria-labelledby="chennai-jobs-guide-title">
      <div className="mcc-jobs-hub__hero-grid">
        <div>
          <p className="type-eyebrow text-[var(--accent)]">Guide</p>
          <h1 id="chennai-jobs-guide-title" className="mcc-jobs-hub__hero-title">
            Chennai tech jobs — how to read a job ad
          </h1>
          <p className="mcc-jobs-hub__hero-lede">
            Plain tips for anyone searching Chennai jobs in tech, product, or
            newsroom IT — and for teams listing roles on our local board.
          </p>
          <div className="mcc-jobs-hub__hero-actions">
            <Link href={CHENNAI_JOBS_HUB_PATH} className="mcc-jobs-hub__btn-primary">
              Browse open jobs
            </Link>
            <Link href="/contact#jobs" className="mcc-jobs-hub__btn-secondary">
              Post a Chennai job
            </Link>
          </div>
        </div>
        <div className="mcc-jobs-hub__illustration flex items-center justify-center p-8" aria-hidden>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#087c5c]">JD</p>
            <p className="mt-2 text-sm font-semibold text-[var(--muted)]">
              Read before you apply
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ChennaiJobsGuideResources() {
  return (
    <section className="mcc-jobs-hub__resources" aria-labelledby="guide-resources-title">
      <div className="mcc-jobs-hub__resources-head">
        <h2 id="guide-resources-title">Related reading</h2>
      </div>
      <div className="mcc-jobs-hub__resources-grid">
        {CHENNAI_JOBS_CAREER_RESOURCES.map((item) => (
          <Link key={item.href} href={item.href} className="mcc-jobs-hub__resource-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="mcc-jobs-hub__resource-more">Read more →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
