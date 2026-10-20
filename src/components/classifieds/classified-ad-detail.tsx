import type { ClassifiedListingRow } from "@/domains/classifieds";
import { ClassifiedPhoneGate } from "@/components/classifieds/classified-phone-gate";
import { JobPostingProse } from "@/components/jobs/job-posting-prose";
import { formatClassifiedCategoryLabel } from "@/lib/classifieds/categories";
import { classifiedImageUrls } from "@/lib/classifieds/images";
import Image from "next/image";
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

function enquiryCopy(category: string | null | undefined, posterName: string) {
  const cat = category?.trim().toLowerCase() ?? "";
  if (cat === "vehicles") {
    return {
      whatsappLabel: "WhatsApp the seller",
      blurb: `Contact ${posterName} directly. Confirm papers, price, and a test ride before you pay.`,
    };
  }
  if (cat === "property") {
    return {
      whatsappLabel: "WhatsApp",
      blurb: `Contact ${posterName} directly. Confirm papers, price, and a visit before you pay or share documents.`,
    };
  }
  return {
    whatsappLabel: "WhatsApp",
    blurb: `Contact ${posterName} directly. Agree the terms before you pay.`,
  };
}

function ContactCta({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-[var(--accent-fg)] shadow-sm transition hover:opacity-92 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${className}`.trim()}
    >
      {label}
    </a>
  );
}

function AtAGlance({ listing }: { listing: ClassifiedListingRow }) {
  const rows: { label: string; value: string }[] = [];

  const category = listing.category?.trim();
  if (category) {
    rows.push({ label: "Category", value: formatClassifiedCategoryLabel(category) });
  }

  const loc = listing.locationLabel?.trim();
  if (loc) rows.push({ label: "Area", value: loc });

  const poster = listing.posterName?.trim();
  if (poster) rows.push({ label: "Posted by", value: poster });

  if (listing.publishedAt) {
    rows.push({
      label: "Posted",
      value: listing.publishedAt.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeZone: "Asia/Kolkata",
      }),
    });
  }

  if (rows.length === 0) return null;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)]"
      aria-label="Listing summary"
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

function PhotoGallery({
  urls,
  title,
}: {
  urls: string[];
  title: string;
}) {
  if (urls.length === 0) return null;
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2" aria-label="Listing photos">
      {urls.map((src, i) => (
        <figure
          key={src}
          className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]"
        >
          <div
            className={
              urls.length === 1
                ? "relative aspect-square bg-[var(--background)]"
                : "relative aspect-[4/3]"
            }
          >
            <Image
              src={src}
              alt={urls.length === 1 ? title : `${title} — photo ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 520px"
              className={urls.length === 1 ? "object-contain" : "object-cover"}
              priority={i === 0}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}

export function ClassifiedAdDetail({ listing }: { listing: ClassifiedListingRow }) {
  const phoneGated = Boolean(listing.contactPhoneGated && listing.contactPhone?.trim());
  const phone = phoneGated ? "" : listing.contactPhone?.trim();
  const phoneDigits = phone?.replace(/\D/g, "") ?? "";
  const localTen = phoneDigits.replace(/^91/, "").slice(-10);
  const phoneHref = localTen.length === 10 ? `tel:+91${localTen}` : null;
  const waHref = localTen.length === 10 ? `https://wa.me/91${localTen}` : null;
  const posterUrl = listing.posterUrl?.trim() || null;
  const posterName = listing.posterName?.trim() || "Reader";
  const photos = classifiedImageUrls(listing.imageUrls);
  const enquiry = enquiryCopy(listing.category, posterName);

  return (
    <article className="mx-auto w-full max-w-[1100px]">
      <header className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_96%,var(--accent)_2%)] px-5 py-6 sm:px-7 sm:py-8">
        <p className="type-eyebrow text-[var(--accent)]">Classified ad</p>
        <h1 className="type-display mt-2 text-[1.65rem] leading-tight text-[var(--foreground)] sm:text-[2rem]">
          {listing.title}
        </h1>
        <p className="type-lede mt-3 text-sm leading-relaxed text-[var(--muted)]">
          <span className="font-medium text-[var(--foreground)]">{posterName}</span>
          {listing.locationLabel ? (
            <>
              {" · "}
              <span>{listing.locationLabel}</span>
            </>
          ) : (
            " · Chennai"
          )}
          {listing.category ? (
            <span className="text-[var(--accent)]">
              {" · "}
              {formatClassifiedCategoryLabel(listing.category)}
            </span>
          ) : null}
        </p>
        <PhotoGallery urls={photos} title={listing.title} />
      </header>

      {phoneHref ? (
        <div className="mt-5 flex flex-col gap-3 lg:hidden">
          <ContactCta href={phoneHref} label="Call to enquire" />
          {waHref ? (
            <ContactCta href={waHref} label={enquiry.whatsappLabel} />
          ) : null}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:items-start lg:gap-10 xl:gap-12">
        <div className="min-w-0 lg:order-1">
          <section
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-6 shadow-sm sm:px-7 sm:py-8"
            aria-labelledby="classified-full-desc-heading"
          >
            <h2
              id="classified-full-desc-heading"
              className="text-lg font-semibold tracking-tight text-[var(--foreground)]"
            >
              Full ad
            </h2>
            <div className="mt-6">
              <JobPostingProse content={listing.body} />
            </div>
          </section>

          {(phoneGated || phoneHref || waHref || posterUrl) ? (
            <div className="mt-8 rounded-2xl border border-[color-mix(in_srgb,var(--accent)_22%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_5%,var(--surface))] p-6 sm:p-7">
              <p className="text-base font-semibold text-[var(--foreground)]">
                Interested?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {phoneGated
                  ? `Message ${posterName} after you share your number. Agree rent and house rules before you pay or visit.`
                  : enquiry.blurb}
              </p>
              <div className="mt-5 flex max-w-md flex-col gap-3">
                {phoneGated ? (
                  <div className="lg:hidden">
                    <ClassifiedPhoneGate slug={listing.slug} />
                  </div>
                ) : null}
                {phoneHref ? (
                  <ContactCta href={phoneHref} label="Call to enquire" />
                ) : null}
                {waHref ? (
                  <ContactCta href={waHref} label={enquiry.whatsappLabel} />
                ) : null}
                {posterUrl ? (
                  <ContactCta
                    href={posterUrl}
                    label={phoneHref ? "View poster profile" : "Message on Facebook"}
                  />
                ) : null}
              </div>
            </div>
          ) : null}

          <p className="mt-8 text-xs leading-relaxed text-[var(--muted)]">
            This is a reader-submitted classified ad.{" "}
            <Link
              href="/editorial-standards"
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              We do not verify every detail
            </Link>
            — meet safely and agree terms before you pay or hire.
          </p>
        </div>

        <aside className="min-w-0 lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-4">
            <AtAGlance listing={listing} />
            {phoneGated ? (
              <div className="hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 lg:block">
                <ClassifiedPhoneGate slug={listing.slug} />
              </div>
            ) : phoneHref ? (
              <div className="hidden lg:block">
                <ContactCta href={phoneHref} label="Call to enquire" />
              </div>
            ) : null}
            {waHref ? (
              <div className="hidden lg:block">
                <ContactCta href={waHref} label={enquiry.whatsappLabel} />
              </div>
            ) : null}
            {posterUrl ? (
              <div className="hidden lg:block">
                <ContactCta
                  href={posterUrl}
                  label={phoneHref ? "View poster profile" : "Message on Facebook"}
                />
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </article>
  );
}
