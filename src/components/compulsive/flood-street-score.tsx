"use client";

import Link from "next/link";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  FLOOD_MAYOR_DESK,
  FLOOD_STREET_PATH,
  FLOOD_ZONE_SCORES,
} from "@/content/compulsive/flood-street-score";
import { getSiteUrl } from "@/lib/env";

export function FloodStreetScore() {
  return (
    <div className="not-prose space-y-6">
      <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)]">
        Editorial monsoon score from published GCC stagnation mapping (294 points;
        Sholinganallur 76 named). Not a live flood warning.{" "}
        <Link href={FLOOD_MAYOR_DESK} className="font-semibold text-[var(--accent)] hover:underline">
          Mayor 50 cm desk
        </Link>
        .
      </p>

      <ul className="space-y-3">
        {FLOOD_ZONE_SCORES.map((z) => (
          <li
            key={z.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-bold text-[var(--foreground)]">{z.zoneLabel}</p>
              <p className="text-2xl font-bold text-[var(--accent)]">
                {z.score}
                <span className="text-xs font-semibold text-[var(--muted)]">/10</span>
              </p>
            </div>
            <div
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--border)]"
              aria-hidden
            >
              <div
                className="h-full bg-[var(--accent)]"
                style={{ width: `${z.score * 10}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]">{z.basis}</p>
            <p className="mt-2 text-xs text-[var(--foreground)]">
              <strong>Before rain:</strong> {z.doBeforeRain}
            </p>
          </li>
        ))}
      </ul>

      <CopyShareButton
        buildText={() => {
          const top = FLOOD_ZONE_SCORES[0];
          return `Chennai flood street-score (editorial): ${top.zoneLabel} ${top.score}/10 from GCC’s 294 stagnation map. Not tonight’s forecast. ${getSiteUrl()}${FLOOD_STREET_PATH}`;
        }}
      />
    </div>
  );
}
