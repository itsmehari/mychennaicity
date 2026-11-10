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
    shortLabel: "Looking for work",
    description: "People looking for jobs",
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
        className="grid grid-cols-2 gap-2 rounded-[22px] border border-[#eceaf3] bg-white p-1.5 shadow-[0_10px_30px_rgba(22,22,29,0.04)] sm:gap-2.5"
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
              className={`flex min-h-[3.25rem] flex-col justify-center rounded-2xl px-3 py-2.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b4dff] sm:min-h-[3.5rem] sm:px-4 sm:py-3 ${
                selected
                  ? "bg-[#16161d] text-white shadow-sm"
                  : "text-[#5c5872] hover:bg-[#f7f6fb] hover:text-[#16161d]"
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
                        ? "bg-white/15 text-white"
                        : "bg-[#f4f1ff] text-[#3d348f]"
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
