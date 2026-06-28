import Link from "next/link";
import { CHENNAI_JOBS_CAREER_RESOURCES } from "@/lib/jobs/chennai-jobs-hub-helpers";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";

export function ChennaiSeekersHubSafety() {
  return (
    <section className="mcc-jobs-hub__safety" aria-labelledby="chennai-seekers-safety-title">
      <h2 id="chennai-seekers-safety-title">Before you hire</h2>
      <ul>
        <li>
          <strong className="text-[var(--foreground)]">Verify identity</strong> in person
          or through a trusted reference before sharing keys or documents.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Agree pay, duties, and hours</strong>{" "}
          in writing before someone joins.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Do not pay placement agents</strong>{" "}
          claiming to represent these profiles unless you know them.
        </li>
        <li>
          For corrections or fake profiles,{" "}
          <Link
            href="/contact#jobs"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            contact MyChennaiCity
          </Link>
          .
        </li>
      </ul>
    </section>
  );
}

export function ChennaiSeekersHubEmployerCta() {
  return (
    <section className="mcc-jobs-hub__employer-cta" aria-labelledby="chennai-seekers-employer-title">
      <h2 id="chennai-seekers-employer-title">Hiring in Chennai?</h2>
      <p>
        Have an open role instead of browsing profiles? Post your vacancy on
        MyChennaiCity and reach candidates across Chennai areas — office staff,
        sales, field jobs, walk-ins and local business hiring.
      </p>
      <div className="mcc-jobs-hub__employer-actions">
        <Link href="/contact#jobs" className="mcc-jobs-hub__employer-btn mcc-jobs-hub__employer-btn--solid">
          Post a job
        </Link>
        <Link href={CHENNAI_JOBS_HUB_PATH} className="mcc-jobs-hub__employer-btn mcc-jobs-hub__employer-btn--outline">
          Browse open jobs
        </Link>
        <Link href="/contact" className="mcc-jobs-hub__employer-btn mcc-jobs-hub__employer-btn--outline">
          Contact page
        </Link>
      </div>
    </section>
  );
}

export function ChennaiSeekersHubResources() {
  const resources = CHENNAI_JOBS_CAREER_RESOURCES.slice(0, 3);
  return (
    <section className="mcc-jobs-hub__resources" aria-labelledby="chennai-seekers-resources-title">
      <div className="mcc-jobs-hub__resources-head">
        <h2 id="chennai-seekers-resources-title">Helpful for employers</h2>
        <Link
          href="/guides/chennai-tech-careers"
          className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          View guide
        </Link>
      </div>
      <div className="mcc-jobs-hub__resources-grid">
        {resources.map((item) => (
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
