"use client";

import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import { TEMPLE_QUIET_ENTRIES } from "@/content/compulsive/temple-quiet-hours";
import { compulsivePath } from "@/content/compulsive/index";
import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { getSiteUrl } from "@/lib/env";
import Link from "next/link";

export function TempleQuietHoursTool() {
  const path = compulsivePath("temple-quiet");

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <p className="text-sm text-[var(--muted)]">
        Editorial quiet-window notes for planning — not official aarti schedules. Festival
        days rewrite everything.
      </p>

      <p className="text-xs text-[var(--muted)]">
        Cross-check{" "}
        <Link
          href={CHENNAI_FESTIVALS_GUIDE_PATH}
          className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
        >
          Chennai festivals calendar
        </Link>{" "}
        before major dates.
      </p>

      <ul className="space-y-3">
        {TEMPLE_QUIET_ENTRIES.map((temple) => (
          <li
            key={temple.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-3"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-bold text-[var(--foreground)]">{temple.name}</p>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                {temple.area}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                  Quieter windows
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{temple.quietWindows}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                  Crowd notes
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{temple.crowdNotes}</p>
              </div>
              <div className="rounded-lg bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] p-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                  Respect / dress
                </p>
                <p className="mt-1 text-sm text-[var(--foreground)]">{temple.respectNotes}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <CopyShareButton
        buildText={() =>
          `Chennai temple quiet-hour guide — ${TEMPLE_QUIET_ENTRIES.length} major temples with crowd + respect notes: ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
