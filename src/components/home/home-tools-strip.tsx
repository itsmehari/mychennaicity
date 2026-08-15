import Link from "next/link";
import { Section } from "@/components/home/section";
import { WeekendWatchPin } from "@/components/site/weekend-watch-pin";
import { compulsivePath } from "@/content/compulsive/index";

const TOOLS = [
  {
    href: compulsivePath("chennai-today"),
    label: "Chennai today",
    dek: "60-second morning card",
  },
  {
    href: "/civic-tools/power-feeder-desk",
    label: "Power / feeder",
    dek: "Minnagam 94987 94987",
  },
  {
    href: compulsivePath("auto-fare"),
    label: "Auto fare cards",
    dek: "2013 vs proposed",
  },
  {
    href: compulsivePath("afford-area"),
    label: "Afford this area",
    dek: "CTC vs rent check",
  },
  {
    href: "/civic-tools/address-form-fixer",
    label: "Ward vs PIN fixer",
    dek: "Why forms fail",
  },
] as const;

/**
 * Homepage strip — tools Chennai residents actually reopen.
 * Keep as a link rail (not a card dashboard).
 */
export function HomeToolsStrip() {
  return (
    <Section
      eyebrow="Everyday tools"
      title="Tools Chennai uses"
      subtitle="Morning brief, outage desk, auto fare math, rent check, and civic form help."
      action={{ href: "/civic-tools", label: "All civic tools" }}
    >
      <div className="mb-4">
        <WeekendWatchPin lang="en" />
      </div>
      <ul className="flex flex-nowrap gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0">
        {TOOLS.map((tool) => (
          <li key={tool.href} className="min-w-[10.5rem] shrink-0 sm:min-w-0">
            <Link
              href={tool.href}
              className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <span className="text-sm font-bold text-[var(--foreground)]">
                {tool.label}
              </span>
              <span className="mt-1 text-xs leading-snug text-[var(--muted)]">
                {tool.dek}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
