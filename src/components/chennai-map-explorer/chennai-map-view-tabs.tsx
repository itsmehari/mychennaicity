import Link from "next/link";

export type ChennaiMapView = "wards" | "zones";

const TABS: {
  id: ChennaiMapView;
  href: string;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    id: "wards",
    href: "/chennai-map",
    label: "Ward map",
    shortLabel: "Wards",
    description: "Neighbourhoods, overlays, area guides",
  },
  {
    id: "zones",
    href: "/chennai-map?view=zones",
    label: "Corporation zones",
    shortLabel: "Zones",
    description: "GCC 15-zone map and layer compare",
  },
];

export function parseChennaiMapView(raw: string | undefined): ChennaiMapView {
  return raw === "zones" ? "zones" : "wards";
}

export function ChennaiMapViewTabs({ active }: { active: ChennaiMapView }) {
  return (
    <nav className="mt-8" aria-label="Chennai map views">
      <div
        className="grid grid-cols-2 gap-2 rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_92%,var(--foreground)_2%)] p-1.5 shadow-sm"
        role="tablist"
      >
        {TABS.map((tab) => {
          const selected = tab.id === active;
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
              <span className="text-sm font-bold leading-tight sm:text-[0.95rem]">
                <span className="sm:hidden">{tab.shortLabel}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
              <span className="mt-0.5 text-[11px] font-normal leading-snug text-[var(--muted)] sm:text-xs">
                {tab.description}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
