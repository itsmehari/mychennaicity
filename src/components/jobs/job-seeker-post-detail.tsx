import type { JobSeekerPostRow } from "@/domains/job-seekers";
import { JobPostingProse } from "@/components/jobs/job-posting-prose";
import Link from "next/link";

function GlanceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 border-b border-[color-mix(in_srgb,var(--border)_70%,transparent)] py-3.5 last:border-0 last:pb-0 first:pt-0">
      <dt className="w-[7.5rem] shrink-0 text-xs font-medium leading-snug text-[var(--muted)]">
        {label}
      </dt>
      <dd className="min-w-0 flex-1 text-sm font-semibold leading-snug text-[var(--foreground)]">
        {value}
      </dd>
    </div>
  );
}

function ContactCta({
  href,
  label,
  isWhatsApp,
  linkProps,
  className = "",
}: {
  href: string;
  label: string;
  isWhatsApp: boolean;
  linkProps: { target?: string; rel?: string };
  className?: string;
}) {
  const style = isWhatsApp
    ? "bg-[#25D366] text-white shadow-sm hover:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]"
    : "bg-[var(--accent)] text-[var(--accent-fg)] shadow-sm hover:opacity-92 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
  return (
    <a
      href={href}
      {...linkProps}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition ${style} ${className}`.trim()}
    >
      {label}
    </a>
  );
}

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

function AtAGlance({ post }: { post: JobSeekerPostRow }) {
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

  if (rows.length === 0) return null;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)]"
      aria-label="Seeker summary"
    >
      <div className="border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))] px-5 py-3.5">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
          At a glance
        </h2>
      </div>
      <dl className="px-5 py-1">
        {rows.map((r) => (
          <GlanceRow key={`${r.label}-${r.value}`} label={r.label} value={r.value} />
        ))}
      </dl>
    </div>
  );
}

export function JobSeekerPostDetail({ post }: { post: JobSeekerPostRow }) {
  const contact = resolveContact(post);
  const seekerLabel = post.seekerLabel?.trim();

  return (
    <article className="mx-auto w-full max-w-[1100px]">
      <header className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_96%,var(--accent)_2%)] px-5 py-6 sm:px-7 sm:py-8">
        <p className="type-eyebrow text-[var(--accent)]">Looking for work</p>
        <h1 className="type-display mt-2 text-[1.65rem] leading-tight text-[var(--foreground)] sm:text-[2rem]">
          {post.title}
        </h1>
        <p className="type-lede mt-3 text-sm leading-relaxed text-[var(--muted)]">
          {seekerLabel ? (
            <span className="font-medium text-[var(--foreground)]">{seekerLabel}</span>
          ) : (
            <span className="font-medium text-[var(--foreground)]">Chennai job seeker</span>
          )}
          {post.locationLabel ? (
            <>
              {" · "}
              <span>{post.locationLabel}</span>
            </>
          ) : (
            " · Chennai"
          )}
          {post.needsAccommodation ? (
            <span className="text-[var(--accent)]"> · Stay needed</span>
          ) : null}
        </p>
      </header>

      {contact.href ? (
        <div className="mt-5 lg:hidden">
          <ContactCta
            href={contact.href}
            label={contact.label}
            isWhatsApp={contact.isWhatsApp}
            linkProps={contact.linkProps}
          />
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:items-start lg:gap-10 xl:gap-12">
        <div className="min-w-0 lg:order-1">
          <section
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-6 shadow-sm sm:px-7 sm:py-8"
            aria-labelledby="seeker-full-desc-heading"
          >
            <h2
              id="seeker-full-desc-heading"
              className="text-lg font-semibold tracking-tight text-[var(--foreground)]"
            >
              Profile &amp; requirements
            </h2>
            <div className="mt-6">
              <JobPostingProse content={post.body} />
            </div>
          </section>

          {contact.href ? (
            <div className="mt-8 rounded-2xl border border-[color-mix(in_srgb,var(--accent)_22%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_5%,var(--surface))] p-6 sm:p-7">
              <p className="text-base font-semibold text-[var(--foreground)]">
                Have a vacancy?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Reach out directly if you have a matching role. Confirm duties,
                pay, and accommodation before you hire.
              </p>
              <div className="mt-5 max-w-md">
                <ContactCta
                  href={contact.href}
                  label={contact.label}
                  isWhatsApp={contact.isWhatsApp}
                  linkProps={contact.linkProps}
                />
              </div>
              {contact.href === "/contact#jobs" ? (
                <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                  Opens our Contact form — choose <strong>Jobs</strong> and mention
                  this listing.
                </p>
              ) : null}
            </div>
          ) : null}

          <p className="mt-8 text-xs leading-relaxed text-[var(--muted)]">
            This is a reader-submitted availability post.{" "}
            <Link
              href="/editorial-standards"
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              We do not verify every detail
            </Link>
            — meet safely and agree terms before hiring.
          </p>
        </div>

        <aside className="min-w-0 lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-4">
            <AtAGlance post={post} />
            {contact.href ? (
              <div className="hidden lg:block">
                <ContactCta
                  href={contact.href}
                  label={contact.label}
                  isWhatsApp={contact.isWhatsApp}
                  linkProps={contact.linkProps}
                />
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </article>
  );
}
