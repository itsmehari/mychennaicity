/** Minimal markdown-like rendering for seeded article bodies (## headings, **bold**, lists). */
function formatInline(text: string) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*(.+)\*\*$/);
    if (m) {
      return <strong key={i}>{m[1]}</strong>;
    }
    return part;
  });
}

export function ArticleProse({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-[var(--foreground)]">
      {blocks.map((block, i) => {
        const line = block.trim();
        if (line.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="mt-8 scroll-mt-28 text-xl font-semibold tracking-tight text-[var(--foreground)] first:mt-0"
            >
              {formatInline(line.slice(3).trim())}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="mt-6 text-lg font-semibold text-[var(--foreground)]"
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
