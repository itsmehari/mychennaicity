"use client";

import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  CMWSSB_HELPLINE,
  CMWSSB_SITE,
  METRO_WATER_PATH,
  METRO_WATER_STEPS,
  METRO_WATER_ZONES,
} from "@/content/compulsive/metro-water";
import { getSiteUrl } from "@/lib/env";

export function MetroWaterDesk() {
  return (
    <div className="not-prose space-y-6">
      <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)]">
        Editorial supply-day patterns — not today’s valve timings. Confirm shutdowns
        on the CMWSSB site. Helpline{" "}
        <strong className="text-[var(--foreground)]">{CMWSSB_HELPLINE}</strong>{" "}
        (verify on your bill).
      </p>

      <ul className="space-y-3">
        {METRO_WATER_ZONES.map((z) => (
          <li
            key={z.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--accent)]">
              {z.zoneLabel}
            </p>
            <p className="mt-2 text-sm text-[var(--foreground)]">{z.typical}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              <strong className="text-[var(--foreground)]">Watch:</strong> {z.watch}
            </p>
            <p className="mt-2 text-xs text-[var(--foreground)]">
              <strong>Tip:</strong> {z.tip}
            </p>
          </li>
        ))}
      </ul>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <h2 className="text-sm font-bold text-[var(--foreground)]">If water didn’t come</h2>
        <ol className="mt-3 space-y-3">
          {METRO_WATER_STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[11px] font-bold">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{step.title}</p>
                <p className="mt-0.5 text-sm text-[var(--muted)]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <a
          href={CMWSSB_SITE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          CMWSSB official site →
        </a>
      </section>

      <CopyShareButton
        buildText={() =>
          `Chennai Metro Water desk (supply-day patterns by corridor, not live timings): ${getSiteUrl()}${METRO_WATER_PATH}`
        }
      />
    </div>
  );
}
