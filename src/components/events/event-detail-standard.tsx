import Link from "next/link";
import Image from "next/image";
import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import { BusinessWhatsAppCta } from "@/components/community/business-whatsapp-cta";
import {
  EventAudienceBlock,
  EventDesktopSidebar,
  EventDetailsTable,
  EventHostingCta,
  EventLocationCard,
  EventPostCta,
  EventSummaryCard,
} from "@/components/events/event-detail-parts";
import { EventMobileActions } from "@/components/events/event-mobile-actions";
import { EventReaderViews } from "@/components/events/event-reader-views";
import { ArticleProse } from "@/components/news/article-prose";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import type { PublicEventRow } from "@/domains/events";
import {
  formatEventDate,
  formatEventTime,
  getEventCategoryLabel,
  splitDescriptionIntro,
} from "@/lib/events/event-detail-helpers";
import {
  getEventPosterImage,
  type EventPosterSpec,
} from "@/lib/events/event-poster-image";

export function formatEventWhen(
  startsAt: Date,
  endsAt: Date | null,
  allDay: boolean,
) {
  const opts: Intl.DateTimeFormatOptions = allDay
    ? { dateStyle: "medium", timeZone: "Asia/Kolkata" }
    : { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" };
  const a = startsAt.toLocaleString("en-IN", opts);
  if (!endsAt || +endsAt === +startsAt) return a;
  const b = endsAt.toLocaleString("en-IN", opts);
  return `${a} – ${b}`;
}

function EventHeroMeta({ ev }: { ev: PublicEventRow }) {
  const date = formatEventDate(ev.startsAt, ev.endsAt, ev.allDay);
  const time = formatEventTime(ev.startsAt, ev.endsAt, ev.allDay);
  const category = getEventCategoryLabel(ev.presentationKey);

  return (
    <div className="mcc-event-meta mt-4">
      {date ? (
        <span>
          <span className="mcc-event-meta-highlight">{date}</span>
        </span>
      ) : null}
      {time ? (
        <>
          <span className="mcc-event-meta-sep hidden sm:inline" aria-hidden>
            ·
          </span>
          <span>{time}</span>
        </>
      ) : null}
      {ev.venueName?.trim() ? (
        <>
          <span className="mcc-event-meta-sep" aria-hidden>
            ·
          </span>
          <span className="mcc-event-meta-highlight">{ev.venueName.trim()}</span>
        </>
      ) : null}
      {ev.localityLabel?.trim() ? (
        <>
          <span className="mcc-event-meta-sep" aria-hidden>
            ·
          </span>
          <span>{ev.localityLabel.trim()}</span>
        </>
      ) : null}
      {category ? (
        <>
          <span className="mcc-event-meta-sep hidden md:inline" aria-hidden>
            ·
          </span>
          <span className="hidden md:inline">{category}</span>
        </>
      ) : null}
    </div>
  );
}

function EventPosterFigure({ poster }: { poster: EventPosterSpec }) {
  return (
    <figure className="mcc-event-poster">
      <Image
        src={poster.src}
        alt={poster.alt}
        width={960}
        height={1200}
        className="mcc-event-poster__img w-full"
        sizes="(max-width: 1024px) 100vw, 320px"
        priority
      />
      <figcaption className="sr-only">{poster.alt}</figcaption>
    </figure>
  );
}

function EventHero({
  ev,
  uniqueReaderViews,
  poster,
}: {
  ev: PublicEventRow;
  uniqueReaderViews: number;
  poster: EventPosterSpec | null;
}) {
  return (
    <header className={`mcc-event-hero${poster ? " mcc-event-hero--with-poster" : ""}`}>
      <div className="mcc-event-hero__main">
        <p className="mcc-event-kicker type-eyebrow">Event · Chennai</p>
        <h1 className="mcc-event-title type-display mt-2 text-[var(--foreground)]">
          {ev.title}
        </h1>
        <EventHeroMeta ev={ev} />
        <EventReaderViews
          slug={ev.slug}
          initialCount={uniqueReaderViews}
          className="mt-3"
        />
        {ev.venueAddress ? (
          <p className="mcc-event-meta mt-2 text-[var(--muted)] lg:hidden">
            {ev.venueAddress}
          </p>
        ) : null}
      </div>
      {poster ? (
        <div className="mcc-event-hero__poster">
          <EventPosterFigure poster={poster} />
        </div>
      ) : null}
    </header>
  );
}

export function EventDetailStandard({
  ev,
  uniqueReaderViews = 0,
}: {
  ev: PublicEventRow;
  uniqueReaderViews?: number;
}) {
  const desc = ev.description ?? "";
  const { intro, rest } = splitDescriptionIntro(desc);
  const poster = getEventPosterImage(ev.slug);

  return (
    <div className={`mcc-event-page ${interiorMainClassName}`}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai local events", href: "/chennai-local-events" },
          { label: ev.title },
        ]}
      />

      <EventHero ev={ev} uniqueReaderViews={uniqueReaderViews} poster={poster} />

      <div className="lg:hidden">
        <EventSummaryCard ev={ev} />
        <EventLocationCard ev={ev} />
      </div>

      <div className="mcc-event-layout">
        <div className="mcc-event-main min-w-0">
          <div className="hidden lg:block">
            <EventLocationCard ev={ev} />
          </div>
          {desc.trim() ? (
            <>
              {intro ? (
                <div className="mcc-event-content-intro mcc-event-content mt-8">
                  <ArticleProse content={intro} />
                </div>
              ) : null}
              <EventHostingCta className="mt-8" />
              {rest ? (
                <div className="mcc-event-content mt-8">
                  <ArticleProse content={rest} />
                </div>
              ) : null}
            </>
          ) : (
            <>
              <p className="mcc-event-content mt-8 text-base leading-relaxed text-[var(--muted)]">
                No detailed description on file — confirm timings with the
                organiser.
              </p>
              <EventHostingCta className="mt-8" />
            </>
          )}

          <EventDetailsTable ev={ev} />
          <EventAudienceBlock ev={ev} />

          <div className="mt-10 space-y-6">
            <PageAdSlot shape="rectangle" placement="events_detail" />
            <AdvertisePanel variant="events" layout="strip" />
            <BusinessWhatsAppCta variant="events" />
          </div>

          <EventPostCta className="mt-10" />

          <p className="mcc-event-meta mt-8 text-[var(--muted)]">
            More listings:{" "}
            <Link
              href="/chennai-local-events"
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Chennai local events calendar
            </Link>
            .
          </p>
          <InteriorCrossNav />
        </div>

        <EventDesktopSidebar ev={ev} />
      </div>

      <EventMobileActions ev={ev} />
    </div>
  );
}
