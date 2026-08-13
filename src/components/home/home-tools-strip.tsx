import Link from "next/link";
import { Section } from "@/components/home/section";
import { compulsivePath } from "@/content/compulsive/index";

const TOOLS = [
  {
    href: compulsivePath("chennai-today"),
    label: "Chennai today",
    dek: "60-second morning card",
  },
  {
    href: compulsivePath("afford-area"),
    label: "Afford this area",
    dek: "CTC vs rent check",
  },
  {
    href: compulsivePath("petrol-vs-ev"),
    label: "Petrol vs EV",
    dek: "Cost of your km",
  },
  {
    href: "/civic-tools/address-form-fixer",
    label: "Ward vs PIN fixer",
    dek: "Why forms fail",
  },
  {
    href: compulsivePath("which-chennai"),
    label: "Which Chennai?",
    dek: "Quick neighbourhood quiz",
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
      subtitle="Morning brief, rent math, commute cost, and civic form help — built for WhatsApp forwards."
      action={{ href: "/civic-tools", label: "All civic tools" }}
    >
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
