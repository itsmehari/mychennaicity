import Image from "next/image";
import Link from "next/link";
import { EcrShareButton } from "@/components/tourism/ecr-share-button";
import {
  ECR_STOPS,
  ECR_SUGGESTED_DAY,
  ECR_WEEKEND_FAQ,
  ECR_WEEKEND_PILLARS,
  ECR_WEEKEND_POSTER_ALT,
  ECR_WEEKEND_SOURCES,
  ECR_WEEKEND_WINDOW,
  ecrWhatsAppShare,
} from "@/content/tourism/ecr-weekend-plan";
import {
  ECR_WEEKEND_PLAN_PATH,
  TTDC_ECR_NEWS_PATH,
  TTDC_ECR_POSTER_PATH,
} from "@/content/tourism";
import { getSiteUrl } from "@/lib/env";

const KIND_CLASS: Record<string, string> = {
  start: "bg-[color-mix(in_srgb,var(--foreground)_8%,var(--surface))] text-[var(--foreground)]",
  spiritual: "bg-[color-mix(in_srgb,var(--accent)_16%,var(--surface))] text-[var(--accent)]",
  culture: "bg-[color-mix(in_srgb,#b45309_16%,var(--surface))] text-[var(--ecr-gold)]",
  adventure: "bg-[color-mix(in_srgb,var(--accent-warm)_18%,var(--surface))] text-[var(--accent-warm)]",
  food: "bg-[color-mix(in_srgb,#b91c1c_14%,var(--surface))] text-[#b91c1c]",
  heritage: "bg-[color-mix(in_srgb,var(--accent)_16%,var(--surface))] text-[var(--accent)]",
};

function mapsHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function EcrWeekendItinerary() {
  const site = getSiteUrl();

  return (
    <div className="ecr-plan not-prose space-y-10">
      <figure className="ecr-plan__hero-frame">
        <Image
          src={TTDC_ECR_POSTER_PATH}
          alt={ECR_WEEKEND_POSTER_ALT}
          width={512}
          height={640}
          priority
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 720px"
        />
        <figcaption className="border-t border-[var(--border)] px-4 py-3 text-xs leading-relaxed text-[var(--muted)]">
          Official Tamil Nadu Tourism / TTDC poster: “This Weekend ECR Plan”. Credit: Department
          of Tourism, Tamil Nadu. Reproduced here for public-interest reporting — not an official
          agency page.
        </figcaption>
      </figure>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ecr-gold)]">
          {ECR_WEEKEND_PILLARS.join(" · ")}
        </p>
        <EcrShareButton text={ecrWhatsAppShare(site)} />
      </div>

      <p className="rounded-xl border border-[var(--border)] bg-[var(--ecr-sand)] px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">{ECR_WEEKEND_WINDOW.label}.</strong>{" "}
        {ECR_WEEKEND_WINDOW.loopNote} Kite festival: {ECR_WEEKEND_WINDOW.kiteDates}. Surf
        championship: {ECR_WEEKEND_WINDOW.surfDates}.
      </p>

      <ol className="ecr-plan__dash space-y-5">
        {ECR_STOPS.map((stop) => (
          <li key={stop.id} className="ecr-plan__stop">
            <span className="ecr-plan__num" aria-hidden>
              {String(stop.n).padStart(2, "0")}
            </span>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${KIND_CLASS[stop.kind] ?? KIND_CLASS.start}`}
                >
                  {stop.kindLabel}
                </span>
                {stop.kmFromChennai ? (
                  <span className="text-[11px] font-semibold text-[var(--muted)]">
                    {stop.kmFromChennai}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-[var(--foreground)]">
                {stop.name}
              </h3>
              <p className="mt-0.5 text-sm font-semibold text-[var(--accent)]">{stop.place}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {stop.blurb.split("**").map((chunk, i) =>
                  i % 2 === 1 ? (
                    <strong key={i} className="text-[var(--foreground)]">
                      {chunk}
                    </strong>
                  ) : (
                    <span key={i}>{chunk}</span>
                  ),
                )}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">
                {stop.practical.split("**").map((chunk, i) =>
                  i % 2 === 1 ? (
                    <strong key={i}>{chunk}</strong>
                  ) : (
                    <span key={i}>{chunk}</span>
                  ),
                )}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                <a
                  href={mapsHref(stop.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  Open in Maps
                </a>
                {stop.officialHref ? (
                  <a
                    href={stop.officialHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] underline-offset-4 hover:underline"
                  >
                    {stop.officialLabel ?? "Official page"}
                  </a>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ol>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-lg font-bold text-[var(--foreground)]">
          A realistic Saturday squeeze
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          Editorial pacing — not a TTDC timetable. Drop DakshinaChitra or the Rathas if you want
          a calmer kite afternoon.
        </p>
        <ol className="mt-4 space-y-3">
          {ECR_SUGGESTED_DAY.map((row) => (
            <li key={row.when} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                {row.when}
              </span>
              <span className="text-sm leading-relaxed text-[var(--foreground)]">{row.what}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="text-sm leading-relaxed text-[var(--muted)]">
        Read the news desk write-up:{" "}
        <Link href={TTDC_ECR_NEWS_PATH} className="font-semibold text-[var(--accent)] hover:underline">
          TTDC this-weekend ECR plan
        </Link>
        . Canonical URL for this itinerary:{" "}
        <Link href={ECR_WEEKEND_PLAN_PATH} className="font-semibold text-[var(--accent)] hover:underline">
          {ECR_WEEKEND_PLAN_PATH}
        </Link>
        .
      </p>

      <section id="ecr-plan-faq">
        <h2 className="text-lg font-bold text-[var(--foreground)]">FAQ</h2>
        <dl className="mt-4 space-y-4">
          {ECR_WEEKEND_FAQ.map((item) => (
            <div key={item.question}>
              <dt className="text-sm font-bold text-[var(--foreground)]">{item.question}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="text-lg font-bold text-[var(--foreground)]">Sources</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {ECR_WEEKEND_SOURCES.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                {...(s.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {s.label}
              </a>
              <span className="text-[var(--muted)]"> — {s.note}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
