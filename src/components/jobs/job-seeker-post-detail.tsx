import Link from "next/link";
import type { JobSeekerPostRow } from "@/domains/job-seekers";
import { buildChennaiSeekerHubCard } from "@/lib/jobs/chennai-seekers-hub-helpers";
import { JobPostingProse } from "@/components/jobs/job-posting-prose";
import {
  JobsDetailActionCta,
  JobsDetailApplyBand,
  JobsDetailBody,
  JobsDetailGlance,
  JobsDetailHero,
  JobsDetailLayout,
} from "@/components/jobs/chennai-jobs-detail-parts";

function resolveContact(post: JobSeekerPostRow): {
  href: string | null;
  label: string;
  isWhatsApp: boolean;
  linkProps: { target?: string; rel?: string };
} {
  const wa = post.contactWhatsApp?.trim();
  if (wa) {
    const digits = wa.replace(/\D/g, "");
    const href = digits.startsWith("91")
      ? `https://wa.me/${digits}`
      : `https://wa.me/91${digits}`;
    return {
      href,
      label: "Contact on WhatsApp",
      isWhatsApp: true,
      linkProps: { target: "_blank", rel: "noopener noreferrer" },
    };
  }
  const tel = post.contactPhone?.trim();
  if (tel) {
    const digits = tel.replace(/\D/g, "");
    return {
      href: `tel:+91${digits.replace(/^91/, "")}`,
      label: "Call to enquire",
      isWhatsApp: false,
      linkProps: {},
    };
  }
  const email = post.contactEmail?.trim();
  if (email) {
    return {
      href: `mailto:${email}`,
      label: "Email to enquire",
      isWhatsApp: false,
      linkProps: {},
    };
  }
  return {
    href: "/contact#jobs",
    label: "Contact via site",
    isWhatsApp: false,
    linkProps: {},
  };
}

function buildGlanceRows(post: JobSeekerPostRow): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  const role = post.roleSought?.trim();
  if (role) rows.push({ label: "Role sought", value: role });
  const loc = post.locationLabel?.trim();
  if (loc) rows.push({ label: "Area", value: loc });
  if (post.needsAccommodation) {
    rows.push({ label: "Stay", value: "Family accommodation needed" });
  }
  const avail = post.availability?.trim();
  if (avail) rows.push({ label: "Availability", value: avail });
  if (post.publishedAt) {
    rows.push({
      label: "Posted",
      value: post.publishedAt.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeZone: "Asia/Kolkata",
      }),
    });
  }
  return rows;
}

export function JobSeekerPostDetail({ post }: { post: JobSeekerPostRow }) {
  const contact = resolveContact(post);
  const hubCard = buildChennaiSeekerHubCard(post);
  const glanceRows = buildGlanceRows(post);
  const seekerLabel = post.seekerLabel?.trim();

  const ctaHint =
    contact.href === "/contact#jobs"
      ? "Opens our Contact form — choose Jobs and mention this listing."
      : contact.isWhatsApp
        ? "Opens WhatsApp in a new tab."
        : contact.href?.startsWith("tel:")
          ? "Tap to call directly."
          : undefined;

  return (
    <article className="mcc-jobs-hub mx-auto w-full max-w-[1180px]">
      <JobsDetailHero
        eyebrow="Looking for work"
        title={post.title}
        badge={hubCard.initials}
        meta={
          <>
            <span className="font-semibold text-[var(--foreground)]">
              {seekerLabel ?? "Chennai job seeker"}
            </span>
            {" · "}
            {post.locationLabel ?? "Chennai"}
            {post.needsAccommodation ? (
              <span className="font-medium text-[var(--accent)]"> · Stay needed</span>
            ) : null}
          </>
        }
      />

      {contact.href ? (
        <div className="mcc-jobs-detail__mobile-cta">
          <JobsDetailActionCta
            href={contact.href}
            label={contact.label}
            isWhatsApp={contact.isWhatsApp}
            linkProps={contact.linkProps}
            hint={ctaHint}
          />
        </div>
      ) : null}

      <JobsDetailLayout
        main={
          <>
            <JobsDetailBody title="Profile & requirements" id="seeker-full-desc-heading">
              <JobPostingProse content={post.body} />
            </JobsDetailBody>

            {contact.href ? (
              <JobsDetailApplyBand
                title="Have a vacancy?"
                description="Reach out directly if you have a matching role. Confirm duties, pay, and accommodation before you hire."
                href={contact.href}
                label={contact.label}
                isWhatsApp={contact.isWhatsApp}
                linkProps={contact.linkProps}
              />
            ) : null}

            <p className="text-xs leading-relaxed text-[var(--muted)]">
              This is a reader-submitted availability post.{" "}
              <Link
                href="/editorial-standards"
                className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              >
                We do not verify every detail
              </Link>
              — meet safely and agree terms before hiring.
            </p>
          </>
        }
        aside={
          <>
            <JobsDetailGlance rows={glanceRows} />
            {hubCard.tags.length > 0 ? (
              <div className="mcc-jobs-hub__job-tags">
                {hubCard.tags.map((tag) => (
                  <span key={tag} className="mcc-jobs-hub__job-tag">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {contact.href ? (
              <div className="mcc-jobs-detail__desktop-cta">
                <JobsDetailActionCta
                  href={contact.href}
                  label={contact.label}
                  isWhatsApp={contact.isWhatsApp}
                  linkProps={contact.linkProps}
                  hint={ctaHint}
                />
              </div>
            ) : null}
          </>
        }
      />
    </article>
  );
}
