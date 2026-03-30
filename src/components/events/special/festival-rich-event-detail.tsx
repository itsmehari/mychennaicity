import Link from "next/link";
import type { FestivalRichPageProps } from "@/domains/events/presentations/types";
import { formatEventWhen } from "@/components/events/event-detail-standard";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { FestivalGallery } from "./festival-gallery";
import { FestivalSchedule } from "./festival-schedule";
import { OfficialPdfHighlight } from "./official-pdf-highlight";
import { PracticalAndFaq } from "./practical-and-faq";

export function FestivalRichEventDetail({ event, content }: FestivalRichPageProps) {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai local events", href: "/chennai-local-events" },
          { label: event.title },
        ]}
      />
      <p className="type-eyebrow text-[var(--accent-warm)]">Festival · Chennai</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        {event.title}
      </h1>
      <p className="type-lede mt-4 text-sm text-[var(--muted)]">
        {formatEventWhen(event.startsAt, event.endsAt, event.allDay)}
        {event.venueName ? ` · ${event.venueName}` : null}
        {event.localityLabel ? ` · ${event.localityLabel}` : null}
      </p>
      {event.venueAddress ? (
        <p className="type-lede mt-2 text-sm text-[var(--muted)]">
          {event.venueAddress}
        </p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="#schedule"
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-sm transition hover:border-[var(--accent)]"
        >
          Jump to schedule
        </a>
        {content.mapsUrl ? (
          <a
            href={content.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-sm transition hover:border-[var(--accent)]"
          >
            Open in Maps ↗
          </a>
        ) : null}
      </div>

      <section
        id="overview"
        className="mt-10 scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
        aria-label="Overview"
      >
        {content.answerFirstParagraphs.map((p, i) => (
          <p
            key={i}
            className={`text-sm leading-relaxed text-[var(--muted)] ${i > 0 ? "mt-3" : ""}`}
          >
            {p}
          </p>
        ))}
        <p className="mt-4 text-sm text-[var(--muted)]">
          <Link
            href="/chennai-local-events"
            className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Chennai local events calendar
          </Link>
        </p>
      </section>

      <OfficialPdfHighlight pdf={content.officialPdf} />
      <FestivalGallery items={content.gallery} />
      <FestivalSchedule days={content.scheduleDays} />
      {content.scheduleExtra ? (
        <section
          className="mt-10 scroll-mt-24 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
          aria-labelledby="extra-schedule-heading"
        >
          <h2
            id="extra-schedule-heading"
            className="text-lg font-semibold text-[var(--foreground)]"
          >
            {content.scheduleExtra.title}
          </h2>
          {content.scheduleExtra.paragraphs.map((para, i) => (
            <p key={i} className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              {para}
            </p>
          ))}
        </section>
      ) : null}
      <PracticalAndFaq tips={content.practicalTips} faq={content.faq} />
      <InteriorCrossNav />
    </div>
  );
}
