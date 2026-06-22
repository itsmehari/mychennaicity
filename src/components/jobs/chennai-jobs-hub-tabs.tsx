"use client";

import Link from "next/link";
import {
  CHENNAI_JOBS_HUB_PATH,
  CHENNAI_JOBS_LOOKING_PATH,
} from "@/lib/routes/chennai-jobs";

export type ChennaiJobsHubTab = "openings" | "seeking";

type Props = {
  active: ChennaiJobsHubTab;
  openingsCount?: number;
  seekingCount?: number;
};

const TABS: {
  id: ChennaiJobsHubTab;
  href: string;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    id: "openings",
    href: CHENNAI_JOBS_HUB_PATH,
    label: "Open jobs",
    shortLabel: "Jobs",
    description: "Employers hiring now",
  },
  {
    id: "seeking",
    href: CHENNAI_JOBS_LOOKING_PATH,
    label: "Looking for work",
    shortLabel: "Seeking",
    description: "People available to hire",
  },
];

function countForTab(
  id: ChennaiJobsHubTab,
  openingsCount?: number,
  seekingCount?: number,
): number | undefined {
  if (id === "openings") return openingsCount;
  return seekingCount;
}

export function ChennaiJobsHubTabs({
  active,
  openingsCount,
  seekingCount,
}: Props) {
  return (
    <nav
      className="mt-8"
      aria-label="Jobs hub sections"
    >
      <div
        className="grid grid-cols-2 gap-2 rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_92%,var(--foreground)_2%)] p-1.5 shadow-sm sm:gap-2.5"
        role="tablist"
      >
        {TABS.map((tab) => {
          const selected = tab.id === active;
          const n = countForTab(tab.id, openingsCount, seekingCount);
          return (
            <Link
              key={tab.id}
              href={tab.href}
              role="tab"
              aria-selected={selected}
              aria-current={selected ? "page" : undefined}
              className={`flex min-h-[3.25rem] flex-col justify-center rounded-xl px-3 py-2.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:min-h-[3.5rem] sm:px-4 sm:py-3 ${
                selected
                  ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm ring-1 ring-[color-mix(in_srgb,var(--accent)_35%,var(--border))]"
                  : "text-[var(--muted)] hover:bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] hover:text-[var(--foreground)]"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm font-bold leading-tight sm:text-[0.95rem]">
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>
                {n != null && n > 0 ? (
                  <span
                    className={`inline-flex min-w-[1.35rem] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                      selected
                        ? "bg-[color-mix(in_srgb,var(--accent)_14%,var(--surface))] text-[var(--accent)]"
                        : "bg-[color-mix(in_srgb,var(--foreground)_6%,var(--surface))] text-[var(--muted)]"
                    }`}
                  >
                    {n}
                  </span>
                ) : null}
              </span>
              <span className="mt-0.5 line-clamp-1 text-[11px] leading-snug sm:text-xs">
                {tab.description}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
