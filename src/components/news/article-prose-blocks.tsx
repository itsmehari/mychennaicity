import type { ReactNode } from "react";

/** Section skin keyed off ## heading text in seeded articles. */
export type ProseSectionSkin =
  | "default"
  | "takeaways"
  | "factbox"
  | "sources"
  | "collectors"
  | "transfers";

export function proseSectionSkin(headingText: string): ProseSectionSkin {
  const h = headingText.toLowerCase().replace(/\*\*/g, "");
  if (h.includes("key takeaway")) return "takeaways";
  if (h.includes("fact box")) return "factbox";
  if (h === "sources" || h.startsWith("sources")) return "sources";
  if (h.includes("district collector") || h.includes("collector transfer"))
    return "collectors";
  if (
    h.includes("department") ||
    h.includes("secretariat") ||
    h.includes("deputation") ||
    h.includes("corporation")
  )
    return "transfers";
  return "default";
}

export function ProseSectionShell({
  skin,
  heading,
  headingId,
  children,
}: {
  skin: ProseSectionSkin;
  heading: ReactNode;
  headingId?: string;
  children: ReactNode;
}) {
  if (skin === "takeaways") {
    return (
      <section
        className="scroll-mt-28 rounded-2xl border border-[color-mix(in_srgb,var(--accent-warm)_32%,var(--border))] bg-[color-mix(in_srgb,var(--accent-warm)_7%,var(--surface))] p-5 sm:p-6"
        aria-labelledby={headingId}
      >
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent-warm)_18%,var(--surface))] text-sm font-bold text-[var(--accent-warm)]"
            aria-hidden
          >
            ★
          </span>
          <div className="min-w-0 flex-1">
            {heading}
            <div className="mt-4 space-y-3">{children}</div>
          </div>
        </div>
      </section>
    );
  }

  if (skin === "factbox") {
    return (
      <section
        className="scroll-mt-28 rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--foreground)_3%,var(--surface))] p-5 sm:p-6"
        aria-labelledby={headingId}
      >
        {heading}
        <div className="mt-4">{children}</div>
      </section>
    );
  }

  if (skin === "sources") {
    return (
      <section
        className="scroll-mt-28 rounded-xl border border-dashed border-[var(--border)] bg-[color-mix(in_srgb,var(--muted)_6%,var(--surface))] px-5 py-4"
        aria-labelledby={headingId}
      >
        {heading}
        <div className="mt-3 text-sm">{children}</div>
      </section>
    );
  }

  if (skin === "collectors") {
    return (
      <section className="scroll-mt-28" aria-labelledby={headingId}>
        {heading}
        <div className="mt-4">{children}</div>
      </section>
    );
  }

  if (skin === "transfers") {
    return (
      <section className="scroll-mt-28" aria-labelledby={headingId}>
        {heading}
        <div className="mt-4">{children}</div>
      </section>
    );
  }

  return (
    <section className="scroll-mt-28" aria-labelledby={headingId}>
      {heading}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export {
  isMarkdownTableBlock as isMarkdownTable,
  parseMarkdownTableBlock as parseMarkdownTable,
} from "@/lib/markdown-table";
