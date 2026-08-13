"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  STREETLIGHT_CORRIDORS,
  STREETLIGHT_GCC_PORTAL,
  STREETLIGHT_REPORT_STEPS,
} from "@/content/compulsive/streetlight-dead-spots";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl, OFFICIAL_PUBLIC_CONTACT_EMAIL } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

const tipEmail =
  typeof OFFICIAL_PUBLIC_CONTACT_EMAIL === "string" &&
  OFFICIAL_PUBLIC_CONTACT_EMAIL.includes("@")
    ? OFFICIAL_PUBLIC_CONTACT_EMAIL
    : "mychennaicityportal@gmail.com";

export function StreetlightDesk() {
  const zones = useMemo(() => {
    const set = new Set(STREETLIGHT_CORRIDORS.map((c) => c.zoneLabel));
    return ["All", ...Array.from(set)];
  }, []);

  const [zoneFilter, setZoneFilter] = useState("All");

  const rows = useMemo(
    () =>
      zoneFilter === "All"
        ? STREETLIGHT_CORRIDORS
        : STREETLIGHT_CORRIDORS.filter((c) => c.zoneLabel === zoneFilter),
    [zoneFilter],
  );

  const path = compulsivePath("streetlight");
  const mailto = `mailto:${tipEmail}?subject=${encodeURIComponent(
    "Streetlight corridor tip — mychennaicity.in",
  )}&body=${encodeURIComponent(
    "Zone:\nCorridor / street:\nPattern (what goes dark, when):\nLandmark:\n\n(Editorial tip only — not a GCC complaint.)\n",
  )}`;

  return (
    <div className="not-prose space-y-6">
      <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)]">
        Editorial corridors — not live complaint status. File outages with GCC; tip this desk
        only to improve the list.
      </p>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-[var(--foreground)]">
              Curated corridors by zone
            </h2>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Recurring night-visibility patterns residents describe — verify on the ground.
            </p>
          </div>
          <label className="text-xs font-semibold text-[var(--foreground)]">
            Zone
            <select
              className="ml-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-xs"
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
            >
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ul className="mt-4 space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--accent)]">
                  {row.zoneLabel}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Editorial
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                {row.corridor}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">{row.pattern}</p>
              <p className="mt-2 text-xs text-[var(--foreground)]">
                <strong>Report tip:</strong> {row.tip}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <h2 className="text-sm font-bold text-[var(--foreground)]">How to report via GCC</h2>
        <ol className="mt-3 space-y-3">
          {STREETLIGHT_REPORT_STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[11px] font-bold text-[var(--foreground)]">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{step.title}</p>
                <p className="mt-0.5 text-sm text-[var(--muted)]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a
            href={STREETLIGHT_GCC_PORTAL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            GCC online civic services →
          </a>
          <Link
            href={CIVIC_TOOL_PATHS.zoneWardFinder}
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            Find your ward first →
          </Link>
          <Link
            href={CIVIC_TOOL_PATHS.responsibilityRouter}
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            Responsibility router →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <h2 className="text-sm font-bold text-[var(--foreground)]">Tip this editorial desk</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Spotted a recurring dark corridor we should document? Email a short tip — this does{" "}
          <strong className="text-[var(--foreground)]">not</strong> create a GCC ticket.
        </p>
        <a
          href={mailto}
          className="mt-3 inline-flex rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs font-bold text-[var(--foreground)] hover:border-[var(--accent)]"
        >
          Mailto {tipEmail}
        </a>
      </section>

      <CopyShareButton
        buildText={() =>
          `Chennai streetlight desk (editorial corridors + how to report via GCC 1913 / online): ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
