"use client";

import { useMemo, useState } from "react";
import type { FestivalScheduleDay } from "@/content/special-events/types";

type Props = { days: FestivalScheduleDay[] };

function todayIsoInKolkata(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .slice(0, 10);
}

export function FestivalSchedule({ days }: Props) {
  const [openId, setOpenId] = useState<string | null>(days[0]?.isoDate ?? null);
  const today = useMemo(() => todayIsoInKolkata(), []);

  return (
    <section
      id="schedule"
      className="mt-12 scroll-mt-24"
      aria-labelledby="schedule-heading"
    >
      <h2
        id="schedule-heading"
        className="type-display text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
      >
        Day-wise programme
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
        Times are from the published programme — confirm with the{" "}
        <a
          href="#official-pdf"
          className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        >
          official PDF
        </a>
        .
      </p>
      <nav
        className="mt-6 flex flex-wrap gap-2"
        aria-label="Jump to festival day"
      >
        {days.map((d) => (
          <a
            key={d.isoDate}
            href={`#day-${d.isoDate}`}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              d.isoDate === today
                ? "border-[var(--accent-warm)] bg-[color-mix(in_srgb,var(--accent-warm)_15%,var(--surface))] text-[var(--foreground)]"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]"
            }`}
          >
            {d.isoDate.slice(5)}
            {d.isoDate === today ? " · Today" : ""}
          </a>
        ))}
      </nav>
      <div className="mt-8 space-y-3">
        {days.map((day) => {
          const isToday = day.isoDate === today;
          const expanded = openId === day.isoDate;
          return (
            <div
              key={day.isoDate}
              id={`day-${day.isoDate}`}
              className="scroll-mt-28 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left sm:px-5 sm:py-4"
                aria-expanded={expanded}
                aria-controls={`panel-${day.isoDate}`}
                id={`trigger-${day.isoDate}`}
                onClick={() =>
                  setOpenId((v) => (v === day.isoDate ? null : day.isoDate))
                }
              >
                <span className="font-semibold text-[var(--foreground)]">
                  {day.label}
                  {isToday ? (
                    <span className="ml-2 rounded-md bg-[var(--accent-warm)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--background)]">
                      Today
                    </span>
                  ) : null}
                </span>
                <span className="text-[var(--muted)]" aria-hidden>
                  {expanded ? "−" : "+"}
                </span>
              </button>
              {expanded ? (
                <div
                  id={`panel-${day.isoDate}`}
                  role="region"
                  aria-labelledby={`trigger-${day.isoDate}`}
                  className="border-t border-[var(--border)] px-4 pb-4 pt-2 sm:px-5"
                >
                  <ul className="space-y-3 text-sm leading-relaxed">
                    {day.items.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        {item.time ? (
                          <span className="w-28 shrink-0 font-mono text-xs text-[var(--accent-warm)]">
                            {item.time}
                          </span>
                        ) : (
                          <span className="w-28 shrink-0" />
                        )}
                        <span className="text-[var(--foreground)]">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
