/** Article body: section shells + GFM markdown (react-markdown / remark-gfm / typography). */

import {
  ProseSectionShell,
  proseSectionSkin,
  type ProseSectionSkin,
} from "./article-prose-blocks";
import { expandMultilineHeadingBlocks } from "@/lib/markdown-blocks";
import {
  ArticleMarkdown,
  buildH3TitleIdMap,
} from "./article-markdown";

export type ArticleHeadingAnchor = {
  level: 2 | 3;
  id: string;
};

function headingLevel(line: string): 2 | 3 | null {
  if (line.startsWith("## ")) return 2;
  if (line.startsWith("### ")) return 3;
  return null;
}

function resolveHeadingIds(
  blocks: string[],
  headingAnchors?: ArticleHeadingAnchor[],
): (string | undefined)[] {
  let anchorIdx = 0;
  return blocks.map((block) => {
    const level = headingLevel(block.trim());
    if (level == null) return undefined;
    const a = headingAnchors?.[anchorIdx];
    if (a && a.level === level) {
      anchorIdx += 1;
      return a.id;
    }
    return undefined;
  });
}

function buildH3IdsByBlockIndex(
  blocks: string[],
  headingAnchors?: ArticleHeadingAnchor[],
): Map<number, string> {
  const h3Anchors = headingAnchors?.filter((a) => a.level === 3) ?? [];
  const out = new Map<number, string>();
  let h3i = 0;
  for (let i = 0; i < blocks.length; i += 1) {
    if (blocks[i].trim().startsWith("### ") && h3i < h3Anchors.length) {
      out.set(i, h3Anchors[h3i].id);
      h3i += 1;
    }
  }
  return out;
}

type SectionBlock = { content: string; index: number };

type SectionGroup = {
  skin: ProseSectionSkin;
  headingText: string;
  headingId?: string;
  blocks: SectionBlock[];
};

function groupSections(
  blocks: string[],
  headingIds: (string | undefined)[],
): SectionGroup[] {
  const sections: SectionGroup[] = [];
  let current: SectionGroup | null = null;

  blocks.forEach((block, i) => {
    const line = block.trim();
    const level = headingLevel(line);
    if (level === 2) {
      if (current) sections.push(current);
      const headingText = line.slice(3).trim();
      current = {
        skin: proseSectionSkin(headingText),
        headingText,
        headingId: headingIds[i],
        blocks: [],
      };
      return;
    }
    if (!current) {
      current = {
        skin: "default",
        headingText: "",
        blocks: [{ content: block, index: i }],
      };
      return;
    }
    current.blocks.push({ content: block, index: i });
  });
  if (current) sections.push(current);
  return sections;
}

function SectionHeading({
  text,
  id,
  skin,
}: {
  text: string;
  id?: string;
  skin: ProseSectionSkin;
}) {
  const label = text.replace(/\*\*(.+?)\*\*/g, "$1");
  if (skin === "takeaways") {
    return (
      <h2
        id={id}
        className="text-lg font-semibold tracking-tight text-[var(--foreground)]"
      >
        {label}
      </h2>
    );
  }
  return (
    <h2
      id={id}
      className="text-xl font-semibold tracking-tight text-[var(--foreground)]"
    >
      {label}
    </h2>
  );
}

export function ArticleProse({
  content,
  headingAnchors,
  className,
}: {
  content: string;
  headingAnchors?: ArticleHeadingAnchor[];
  className?: string;
}) {
  const blocks = expandMultilineHeadingBlocks(
    content.replace(/\r\n/g, "\n").split(/\n\n+/),
  );
  const headingIds = resolveHeadingIds(blocks, headingAnchors);
  const sections = groupSections(blocks, headingIds);
  const h3IdsByBlock = buildH3IdsByBlockIndex(blocks, headingAnchors);

  const rootClass = ["article-prose space-y-10", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      {sections.map((section, si) => {
        const sectionMd = section.blocks.map((b) => b.content).join("\n\n");
        const h3Map = buildH3TitleIdMap(section.blocks, h3IdsByBlock);

        const body = (
          <ArticleMarkdown content={sectionMd} h3IdByTitle={h3Map} />
        );

        if (!section.headingText) {
          return (
            <div key={si} className="space-y-4">
              {body}
            </div>
          );
        }

        const heading = (
          <SectionHeading
            text={section.headingText}
            id={section.headingId}
            skin={section.skin}
          />
        );

        return (
          <ProseSectionShell
            key={si}
            skin={section.skin}
            headingId={section.headingId}
            heading={heading}
          >
            {body}
          </ProseSectionShell>
        );
      })}
    </div>
  );
}
