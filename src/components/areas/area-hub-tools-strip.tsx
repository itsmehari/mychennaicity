import Link from "next/link";

const AREA_TOOLS = [
  {
    href: "/chennai-today",
    label: "Chennai today",
    hint: "60-second morning card",
  },
  {
    href: "/guides/chennai-afford-area-calculator",
    label: "Afford this area",
    hint: "Take-home vs rent",
  },
  {
    href: "/civic-tools/address-form-fixer",
    label: "Ward vs PIN",
    hint: "Why forms fail",
  },
  {
    href: "/guides/which-chennai-are-you",
    label: "Which Chennai?",
    hint: "Neighbourhood quiz",
  },
] as const;

export function AreaHubToolsStrip() {
  return (
    <section className="mt-14 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
        City tools
      </p>
      <h2 className="mt-2 text-lg font-bold text-[var(--foreground)]">
        Useful from this neighbourhood
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {AREA_TOOLS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="block rounded-xl border border-[var(--border)] px-3 py-3 transition hover:border-[var(--accent)]"
            >
              <span className="text-sm font-semibold text-[var(--foreground)]">{t.label}</span>
              <span className="mt-0.5 block text-xs text-[var(--muted)]">{t.hint}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
