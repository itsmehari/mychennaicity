/** Minimal markdown-like rendering for seeded article bodies (## headings, **bold**, [label](https://...), lists). */

import { Fragment } from "react";

export type ArticleHeadingAnchor = {
  level: 2 | 3;
  id: string;
};

const MD_LINK = /(\[[^\]]+\]\(https?:\/\/[^)]+\))/g;

function formatBold(text: string) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*(.+)\*\*$/);
    if (m) {
      return <strong key={i}>{m[1]}</strong>;
    }
    return part;
  });
}

function formatInline(text: string) {
  const segments = text.split(MD_LINK);
  return segments.map((segment, i) => {
    const m = segment.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (m) {
      return (
        <a
          key={i}
          href={m[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[var(--accent)] underline underline-offset-2 hover:opacity-90"
        >
          {formatBold(m[1])}
        </a>
      );
    }
    return <Fragment key={i}>{formatBold(segment)}</Fragment>;
  });
}

export function ArticleProse({
  content,
  headingAnchors,
}: {
  content: string;
  /** In document order for ## then ### only; consumes sequentially. */
  headingAnchors?: ArticleHeadingAnchor[];
}) {
  let anchorIdx = 0;
  const nextAnchor = (level: 2 | 3) => {
    const a = headingAnchors?.[anchorIdx];
    if (a && a.level === level) {
      anchorIdx += 1;
      return a.id;
    }
    return undefined;
  };

  const blocks = content.split(/\n\n+/);
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-[var(--foreground)]">
      {blocks.map((block, i) => {
        const line = block.trim();
        if (line.startsWith("## ")) {
          const id = nextAnchor(2);
          return (
            <h2
              key={i}
              id={id}
              className="mt-8 scroll-mt-28 text-xl font-semibold tracking-tight text-[var(--foreground)] first:mt-0"
            >
              {formatInline(line.slice(3).trim())}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          const id = nextAnchor(3);
          return (
            <h3
              key={i}
              id={id}
              className="mt-6 scroll-mt-28 text-lg font-semibold text-[var(--foreground)]"
            >
              {formatInline(line.slice(4).trim())}
            </h3>
          );
        }
        if (line.includes("\n- ")) {
          const [intro, ...rest] = line.split("\n- ");
          return (
            <div key={i} className="space-y-2">
              {intro ? (
                <p className="text-[var(--muted)]">{formatInline(intro)}</p>
              ) : null}
              <ul className="list-disc space-y-1 pl-5">
                {rest.map((item, j) => (
                  <li key={j}>{formatInline(item.trim())}</li>
                ))}
              </ul>
            </div>
          );
        }
        if (line.startsWith("- ")) {
          const items = block.split("\n").map((l) => l.replace(/^-\s*/, "").trim());
          return (
            <ul key={i} className="list-disc space-y-1 pl-5">
              {items.map((item, j) => (
                <li key={j}>{formatInline(item)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-[color-mix(in_srgb,var(--foreground)_92%,var(--muted))]">
            {formatInline(line)}
          </p>
        );
      })}
    </div>
  );
}
