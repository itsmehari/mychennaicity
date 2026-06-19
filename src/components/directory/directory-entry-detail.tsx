import Image from "next/image";
import type { DirectoryEntryView } from "@/domains/directory";
import { JobPostingProse } from "@/components/jobs/job-posting-prose";
import { directoryTypeLabel } from "@/lib/directory/type-labels";
import {
  articleHeroUsesNextImage,
  normalizeArticleHeroUrl,
} from "@/lib/article-hero-image";

function formatPhoneDisplay(phone: string | null): string | null {
  const raw = phone?.trim();
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return raw;
}

function phoneTelHref(phone: string | null): string | null {
  const raw = phone?.trim();
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `tel:+${digits}`;
  return `tel:${raw}`;
}

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

function ListingHero({ entry }: { entry: DirectoryEntryView }) {
  const src = normalizeArticleHeroUrl(entry.meta.heroImageUrl);
  if (!src) return null;
  const alt = `${entry.name} — ${directoryTypeLabel(entry.type)}${entry.localityLabel?.trim() ? `, ${entry.localityLabel.trim()}` : ", Chennai"}`;
  const useNext = articleHeroUsesNextImage(src);

  return (
    <figure className="overflow-hidden rounded-2xl bg-[var(--surface)] ring-1 ring-[var(--border)]">
      <div className="relative aspect-[16/10] w-full">
        {useNext ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, min(720px, 92vw)"
            priority
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    </figure>
  );
}

export function DirectoryEntryDetail({ entry }: { entry: DirectoryEntryView }) {
  const dek =
    entry.meta.dek?.trim() ||
    "Local business listing · confirm details with the business before you order.";
  const phoneDisplay = formatPhoneDisplay(entry.phone);
  const phoneHref = phoneTelHref(entry.phone);
  const locality = entry.localityLabel?.trim();
  const address = entry.address?.trim();

  return (
    <article className="mt-8">
      <header className="max-w-3xl">
        <p className="type-eyebrow text-[var(--accent)]">
          {directoryTypeLabel(entry.type)}
        </p>
        <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
          {entry.name}
        </h1>
        {entry.meta.summary?.trim() ? (
          <p className="type-lede mt-4 text-sm leading-relaxed text-[var(--muted)]">
            {entry.meta.summary}
          </p>
        ) : null}
        <p className="mt-3 text-xs font-medium text-[var(--muted)]">{dek}</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] lg:items-start">
        <div className="min-w-0 space-y-8">
          <ListingHero entry={entry} />
          {entry.body.trim() ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-6 sm:px-7 sm:py-8">
              <JobPostingProse content={entry.body} />
            </div>
          ) : null}
        </div>

        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
            At a glance
          </h2>
          <dl className="mt-4">
            {locality ? (
              <GlanceRow label="Area" value={locality} />
            ) : null}
            {address ? (
              <GlanceRow label="Address" value={address} />
            ) : null}
            {phoneDisplay ? (
              <GlanceRow label="Phone" value={phoneDisplay} />
            ) : null}
          </dl>
          {phoneHref ? (
            <a
              href={phoneHref}
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-[var(--accent-fg)] shadow-sm transition hover:opacity-92"
            >
              Call {phoneDisplay}
            </a>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
