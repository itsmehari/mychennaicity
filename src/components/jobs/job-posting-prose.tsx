import { ArticleMarkdown } from "@/components/news/article-markdown";
import { expandMultilineHeadingBlocks } from "@/lib/markdown-blocks";

function headingLevel(line: string): 2 | 3 | null {
  if (line.startsWith("## ") && !line.startsWith("### ")) return 2;
  if (line.startsWith("### ")) return 3;
  return null;
}

type Section = { heading: string | null; body: string };

function groupJobSections(blocks: string[]): Section[] {
  const sections: Section[] = [];
  let current: Section = { heading: null, body: "" };

  for (const block of blocks) {
    const line = block.trim();
    const level = headingLevel(line);
    if (level === 2 || level === 3) {
      if (current.heading || current.body.trim()) sections.push(current);
      current = {
        heading: line.slice(level === 2 ? 3 : 4).trim(),
        body: "",
      };
      continue;
    }
    current = {
      ...current,
      body: current.body ? `${current.body}\n\n${block}` : block,
    };
  }
  if (current.heading || current.body.trim()) sections.push(current);
  return sections;
}

export function JobPostingProse({ content }: { content: string }) {
  const blocks = expandMultilineHeadingBlocks(
    content.replace(/\r\n/g, "\n").split(/\n\n+/).map((b) => b.trim()).filter(Boolean),
  );
  const sections = groupJobSections(blocks);

  return (
    <div className="job-posting-prose space-y-8">
      {sections.map((section, i) => {
        const headingLabel = section.heading?.replace(/\*\*(.+?)\*\*/g, "$1");
        const body = section.body.trim();
        if (!headingLabel && !body) return null;

        return (
          <section key={`${headingLabel ?? "intro"}-${i}`} className="min-w-0">
            {headingLabel ? (
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                {headingLabel}
              </h3>
            ) : null}
            {body ? (
              <div className={headingLabel ? "mt-4" : undefined}>
                <ArticleMarkdown content={body} />
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
