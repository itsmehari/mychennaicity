import type { ReactNode } from "react";

/** Section skin keyed off ## heading text in seeded articles. */
export type ProseSectionSkin =
  | "default"
  | "takeaways"
  | "factbox"
  | "sources"
  | "collectors"
  | "transfers"
  | "advisory"
  | "analysis"
  | "steps"
  | "disclaimer";

export function proseSectionSkin(headingText: string): ProseSectionSkin {
  const h = headingText.toLowerCase().replace(/\*\*/g, "");
  if (h.includes("key takeaway")) return "takeaways";
  /* Before other keyword matches — legal notices must not look like body copy. */
  if (
    h.includes("disclaimer") ||
    h.includes("legal note") ||
    h.startsWith("editorial note")
  )
    return "disclaimer";
  if (h.includes("fact box") || h.includes("fact check") || h.includes("at a glance"))
    return "factbox";
  if (h === "sources" || h.startsWith("sources")) return "sources";
  if (h === "analysis" || h.startsWith("analysis ")) return "analysis";
  if (
    h.includes("safety") ||
    h.includes("caution") ||
    h.includes("advisory") ||
    h.includes("before you")
  )
    return "advisory";
  if (h.includes("step by step") || h.includes("how to use")) return "steps";
  if (h.includes("district collector") || h.includes("collector transfer"))
    return "collectors";
  /* IAS reshuffle desks only — do not match every "Corporation" civic headline. */
  if (
    h.includes("secretariat") ||
    h.includes("deputation") ||
    h.includes("significant transfer") ||
    h.includes("other significant") ||
    h.includes("department and secretariat") ||
    (h.includes("department") && h.includes("transfer"))
  )
    return "transfers";
  return "default";
}

function shellClass(skin: ProseSectionSkin): string {
  switch (skin) {
    case "factbox":
      return "civic-prose-factbox scroll-mt-28";
    case "disclaimer":
      return "civic-prose-disclaimer scroll-mt-28";
    case "advisory":
    case "analysis":
      return "civic-prose-advisory scroll-mt-28";
    case "sources":
      return "civic-prose-sources scroll-mt-28";
    case "takeaways":
      return "scroll-mt-28";
    case "steps":
      return "civic-steps scroll-mt-28";
    default:
      return "scroll-mt-28";
  }
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
    return null;
  }

  if (skin === "factbox") {
    return (
      <section className={shellClass(skin)} aria-labelledby={headingId}>
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-[#15803d]">
          Fact check
        </p>
        {heading}
        <div className="mt-3">{children}</div>
      </section>
    );
  }

  if (skin === "disclaimer") {
    return (
      <aside
        className={shellClass(skin)}
        aria-labelledby={headingId}
        role="note"
      >
        <p className="civic-prose-disclaimer__eyebrow">Legal notice</p>
        {heading}
        <div className="civic-prose-disclaimer__body">{children}</div>
      </aside>
    );
  }

  if (skin === "advisory" || skin === "analysis") {
    return (
      <section className={shellClass(skin)} aria-labelledby={headingId}>
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-warm)]">
          {skin === "analysis" ? "Analysis" : "Public advisory"}
        </p>
        {heading}
        <div className="mt-3">{children}</div>
      </section>
    );
  }

  if (skin === "sources") {
    return (
      <section className={shellClass(skin)} aria-labelledby={headingId}>
        {heading}
        <div className="mt-3 text-sm">{children}</div>
      </section>
    );
  }

  if (skin === "steps") {
    return (
      <section className={shellClass(skin)} aria-labelledby={headingId}>
        {heading}
        <div className="mt-2">{children}</div>
      </section>
    );
  }

  if (skin === "collectors" || skin === "transfers") {
    return (
      <section className={shellClass(skin)} aria-labelledby={headingId}>
        {heading}
        <div className="mt-4">{children}</div>
      </section>
    );
  }

  return (
    <section className={shellClass(skin)} aria-labelledby={headingId}>
      {heading}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export {
  isMarkdownTableBlock as isMarkdownTable,
  parseMarkdownTableBlock as parseMarkdownTable,
} from "@/lib/markdown-table";
