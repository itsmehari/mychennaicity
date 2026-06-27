import Link from "next/link";
import { CHENNAI_JOBS_CAREER_RESOURCES } from "@/lib/jobs/chennai-jobs-hub-helpers";
import {
  businessWhatsAppHref,
  getBusinessWhatsAppCopy,
} from "@/lib/whatsapp-cta-copy";
import { isWhatsAppBusinessConfigured } from "@/lib/whatsapp-server";

export function ChennaiJobsHubSafety() {
  return (
    <section className="mcc-jobs-hub__safety" aria-labelledby="chennai-jobs-safety-title">
      <h2 id="chennai-jobs-safety-title">Before you apply</h2>
      <ul>
        <li>
          <strong className="text-[var(--foreground)]">Verify the employer</strong> before
          sharing documents or payment details.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Do not pay anyone</strong> for job
          confirmation.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Check the location, salary, role</strong>{" "}
          and working hours before joining.
        </li>
        <li>
          For corrections or fake job reports,{" "}
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

export function ChennaiJobsHubEmployerCta() {
  const jobsCopy = getBusinessWhatsAppCopy("jobs");
  const waConfigured = isWhatsAppBusinessConfigured();
  const waHref = waConfigured ? businessWhatsAppHref(jobsCopy) : "/contact";

  return (
    <section className="mcc-jobs-hub__employer-cta" aria-labelledby="chennai-jobs-employer-title">
      <h2 id="chennai-jobs-employer-title">Hiring in Chennai?</h2>
      <p>
        Post your vacancy on MyChennaiCity and reach local candidates across Chennai
        areas. Suitable for office staff, sales roles, field jobs, internships,
        walk-ins and local business hiring.
      </p>
      <div className="mcc-jobs-hub__employer-actions">
        <Link href="/contact#jobs" className="mcc-jobs-hub__employer-btn mcc-jobs-hub__employer-btn--solid">
          Post a job
        </Link>
        <Link href="/contact" className="mcc-jobs-hub__employer-btn mcc-jobs-hub__employer-btn--outline">
          Contact page
        </Link>
        <a href={waHref} className="mcc-jobs-hub__employer-btn mcc-jobs-hub__employer-btn--outline">
          WhatsApp
        </a>
      </div>
    </section>
  );
}

export function ChennaiJobsHubResources() {
  return (
    <section className="mcc-jobs-hub__resources" aria-labelledby="chennai-jobs-resources-title">
      <div className="mcc-jobs-hub__resources-head">
        <h2 id="chennai-jobs-resources-title">More Chennai career resources</h2>
        <Link
          href="/guides/chennai-tech-careers"
          className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          View guide
        </Link>
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
