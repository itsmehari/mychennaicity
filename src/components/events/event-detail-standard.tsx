import Link from "next/link";
import { ArticleProse } from "@/components/news/article-prose";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import type { PublicEventRow } from "@/domains/events";

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

export function EventDetailStandard({ ev }: { ev: PublicEventRow }) {
  const desc = ev.description ?? "";

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai local events", href: "/chennai-local-events" },
          { label: ev.title },
        ]}
      />
      <p className="type-eyebrow text-[var(--accent-warm)]">Event</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        {ev.title}
      </h1>
      <p className="type-lede mt-4 text-sm text-[var(--muted)]">
        {formatEventWhen(ev.startsAt, ev.endsAt, ev.allDay)}
        {ev.venueName ? ` · ${ev.venueName}` : null}
        {ev.localityLabel ? ` · ${ev.localityLabel}` : null}
      </p>
      {ev.venueAddress ? (
        <p className="type-lede mt-2 text-sm text-[var(--muted)]">
          {ev.venueAddress}
        </p>
      ) : null}
      {desc.trim() ? (
        <div className="mt-8">
          <ArticleProse content={desc} />
        </div>
      ) : (
        <p className="type-lede mt-8 text-sm text-[var(--muted)]">
          No detailed description on file — confirm timings with the organiser.
        </p>
      )}
      <p className="type-lede mt-8 text-sm text-[var(--muted)]">
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
  );
}
