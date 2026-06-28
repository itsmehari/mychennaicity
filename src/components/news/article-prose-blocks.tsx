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
  | "steps";

export function proseSectionSkin(headingText: string): ProseSectionSkin {
  const h = headingText.toLowerCase().replace(/\*\*/g, "");
  if (h.includes("key takeaway")) return "takeaways";
  if (h.includes("fact box") || h.includes("fact check")) return "factbox";
  if (h === "sources" || h.startsWith("sources")) return "sources";
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
  if (
    h.includes("department") ||
    h.includes("secretariat") ||
    h.includes("deputation") ||
    h.includes("corporation")
  )
    return "transfers";
  return "default";
}

function shellClass(skin: ProseSectionSkin): string {
  switch (skin) {
    case "factbox":
      return "civic-prose-factbox scroll-mt-28";
    case "advisory":
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

  if (skin === "advisory") {
    return (
      <section className={shellClass(skin)} aria-labelledby={headingId}>
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-warm)]">
          Public advisory
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
