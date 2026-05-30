import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { normalizeArticleMarkdown } from "@/lib/normalize-article-markdown";

function nodeToPlainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToPlainText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return nodeToPlainText(props?.children);
  }
  return "";
}

function stripBoldForKey(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "$1").trim();
}

const PROSE_BASE =
  "prose prose-neutral max-w-none text-[15px] leading-relaxed text-[var(--foreground)] " +
  "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-[var(--foreground)] " +
  "prose-p:text-[color-mix(in_srgb,var(--foreground)_92%,var(--muted))] " +
  "prose-a:font-medium prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline " +
  "prose-strong:text-[var(--foreground)] prose-em:text-[var(--muted)] " +
  "prose-li:marker:text-[var(--accent)] prose-ol:marker:font-semibold";

export function ArticleMarkdown({
  content,
  h3IdByTitle,
  className,
}: {
  content: string;
  /** Map ### heading text (bold stripped) → DOM id for TOC parity. */
  h3IdByTitle?: Map<string, string>;
  className?: string;
}) {
  const normalized = normalizeArticleMarkdown(content);

  const proseClass = [PROSE_BASE, className].filter(Boolean).join(" ");

  return (
    <div className={proseClass}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: () => null,
        h3: ({ children }) => {
          const key = stripBoldForKey(nodeToPlainText(children));
          const id = h3IdByTitle?.get(key);
          return (
            <h3
              id={id}
              className="mt-8 scroll-mt-28 text-lg font-semibold text-[var(--foreground)]"
            >
              {children}
            </h3>
          );
        },
        table: ({ children }) => (
          <div className="not-prose my-6 overflow-x-auto rounded-xl border border-[var(--border)] shadow-sm ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)]">
            <table className="article-table w-full min-w-[480px] border-collapse text-left text-sm">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-[color-mix(in_srgb,var(--accent)_10%,var(--surface))]">
            {children}
          </thead>
        ),
        th: ({ children }) => (
          <th
            scope="col"
            className="border-b border-[var(--border)] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--foreground)]"
          >
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-t border-[var(--border)] px-4 py-3 align-top text-[var(--foreground)]">
            {children}
          </td>
        ),
        tr: ({ children }) => (
          <tr className="even:bg-[color-mix(in_srgb,var(--foreground)_2%,var(--surface))] hover:bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))]">
            {children}
          </tr>
        ),
        ul: ({ children }) => (
          <ul className="my-4 list-disc space-y-2 pl-5 marker:text-[var(--accent)]">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-4 list-decimal space-y-3 pl-5 marker:font-semibold marker:text-[var(--accent)]">
            {children}
          </ol>
        ),
        p: ({ children }) => (
          <p className="my-4 leading-relaxed">{children}</p>
        ),
        a: ({ href, children }) => {
          const external = href?.startsWith("http");
          return (
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {normalized}
    </ReactMarkdown>
    </div>
  );
}

/** Build lookup for ### lines in a section's blocks. */
export function buildH3TitleIdMap(
  blocks: { content: string; index: number }[],
  h3IdsByBlockIndex: Map<number, string>,
): Map<string, string> {
  const map = new Map<string, string>();
  for (const { content, index } of blocks) {
    const line = content.trim();
    if (!line.startsWith("### ")) continue;
    const title = stripBoldForKey(line.slice(4).trim());
    const id = h3IdsByBlockIndex.get(index);
    if (title && id) map.set(title, id);
  }
  return map;
}
