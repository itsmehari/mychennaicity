import Link from "next/link";
import type { ReactNode } from "react";

export function JobsDetailHero({
  eyebrow,
  title,
  meta,
  badge,
  children,
}: {
  eyebrow: string;
  title: string;
  meta: ReactNode;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mcc-jobs-detail__hero">
      <div className="mcc-jobs-detail__hero-inner">
        {badge ? (
          <div className="mcc-jobs-hub__job-badge mcc-jobs-detail__hero-badge" aria-hidden>
            {badge}
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="mcc-jobs-detail__eyebrow">{eyebrow}</p>
          <h1 className="mcc-jobs-detail__title">{title}</h1>
          <div className="mcc-jobs-detail__meta">{meta}</div>
          {children}
        </div>
      </div>
    </header>
  );
}

export function JobsDetailGlance({
  title = "At a glance",
  rows,
}: {
  title?: string;
  rows: { label: string; value: string }[];
}) {
  if (rows.length === 0) return null;
  return (
    <div className="mcc-jobs-detail__glance" aria-label={title}>
      <h2 className="mcc-jobs-detail__glance-title">{title}</h2>
      <dl>
        {rows.map((r) => (
          <div key={`${r.label}-${r.value}`} className="mcc-jobs-detail__glance-row">
            <dt>{r.label}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function JobsDetailActionCta({
  href,
  label,
  isWhatsApp,
  linkProps,
  hint,
  className = "",
}: {
  href: string;
  label: string;
  isWhatsApp: boolean;
  linkProps: { target?: string; rel?: string };
  hint?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <a
        href={href}
        {...linkProps}
        className={`mcc-jobs-hub__job-btn mcc-jobs-hub__job-btn--primary mcc-jobs-detail__cta${isWhatsApp ? " mcc-jobs-detail__cta--whatsapp" : ""}`}
      >
        {label}
      </a>
      {hint ? <p className="mcc-jobs-detail__cta-hint">{hint}</p> : null}
    </div>
  );
}

export function JobsDetailApplyBand({
  title,
  description,
  href,
  label,
  isWhatsApp,
  linkProps,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
  isWhatsApp: boolean;
  linkProps: { target?: string; rel?: string };
}) {
  return (
    <section className="mcc-jobs-detail__apply-band">
      <h2>{title}</h2>
      <p>{description}</p>
      <JobsDetailActionCta
        href={href}
        label={label}
        isWhatsApp={isWhatsApp}
        linkProps={linkProps}
        className="mt-4 max-w-md"
      />
    </section>
  );
}

export function JobsDetailSafety({
  title,
  items,
}: {
  title: string;
  items: ReactNode[];
}) {
  return (
    <section className="mcc-jobs-hub__safety mcc-jobs-detail__safety" aria-labelledby="jobs-detail-safety">
      <h2 id="jobs-detail-safety">{title}</h2>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function JobsDetailBackLink({ href, label }: { href: string; label: string }) {
  return (
    <p className="mcc-jobs-detail__back">
      <Link href={href} className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
        ← {label}
      </Link>
    </p>
  );
}

export function JobsDetailBody({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <section className="mcc-jobs-detail__body" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <div className="mcc-jobs-detail__prose">{children}</div>
    </section>
  );
}

export function JobsDetailLayout({
  main,
  aside,
}: {
  main: ReactNode;
  aside: ReactNode;
}) {
  return (
    <div className="mcc-jobs-detail__layout">
      <div className="mcc-jobs-detail__main">{main}</div>
      <aside className="mcc-jobs-detail__aside">{aside}</aside>
    </div>
  );
}
