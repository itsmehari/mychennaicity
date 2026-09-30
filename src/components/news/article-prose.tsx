/** Article body: section shells + GFM markdown (react-markdown / remark-gfm / typography). */

import type { ReactNode } from "react";
import {
  ProseSectionShell,
  proseSectionSkin,
  type ProseSectionSkin,
} from "./article-prose-blocks";
import { TweetEmbed } from "./tweet-embed";
import { expandMultilineHeadingBlocks } from "@/lib/markdown-blocks";
import {
  ArticleMarkdown,
  buildH3TitleIdMap,
} from "./article-markdown";

/** Skins where an inline “Also Read” would interrupt legal/meta chrome. */
const ALSO_READ_SKIP_SKINS = new Set<ProseSectionSkin>([
  "disclaimer",
  "sources",
  "takeaways",
  "factbox",
]);

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

const TWEET_STATUS =
  /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/([A-Za-z0-9_]+)\/status\/(\d+)\/?(?:\?[^\s]*)?$/;

function tweetStatusFromBlock(
  block: string,
): { url: string; handle: string; id: string } | null {
  const match = block.trim().match(TWEET_STATUS);
  if (!match) return null;
  const handle = match[1];
  const id = match[2];
  return { url: `https://x.com/${handle}/status/${id}`, handle, id };
}

function ArticleBlocks({
  blocks,
  h3Map,
}: {
  blocks: SectionBlock[];
  h3Map: Map<string, string>;
}) {
  const parts: ReactNode[] = [];
  let markdown: string[] = [];
  let key = 0;

  const flush = () => {
    if (markdown.length === 0) return;
    parts.push(
      <ArticleMarkdown
        key={`md-${key}`}
        content={markdown.join("\n\n")}
        h3IdByTitle={h3Map}
      />,
    );
    key += 1;
    markdown = [];
  };

  for (const block of blocks) {
    const tweet = tweetStatusFromBlock(block.content);
    if (!tweet) {
      markdown.push(block.content);
      continue;
    }
    flush();
    parts.push(
      <TweetEmbed key={tweet.id} statusUrl={tweet.url} handle={tweet.handle} />,
    );
  }
  flush();
  return <>{parts}</>;
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
  inlineAlsoRead,
}: {
  content: string;
  headingAnchors?: ArticleHeadingAnchor[];
  className?: string;
  /** Hindu-style mid-article related story; inserted after lead / first body section. */
  inlineAlsoRead?: ReactNode;
}) {
  const blocks = expandMultilineHeadingBlocks(
    content.replace(/\r\n/g, "\n").split(/\n\n+/),
  );
  const headingIds = resolveHeadingIds(blocks, headingAnchors);
  const sections = groupSections(blocks, headingIds);
  const h3IdsByBlock = buildH3IdsByBlockIndex(blocks, headingAnchors);

  const alsoReadAnchor = inlineAlsoRead
    ? sections.findIndex(
        (s) => s.blocks.length > 0 && !ALSO_READ_SKIP_SKINS.has(s.skin),
      )
    : -1;

  const rootClass = ["article-prose space-y-10", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      {sections.map((section, si) => {
        const h3Map = buildH3TitleIdMap(section.blocks, h3IdsByBlock);
        const showAlsoRead = Boolean(inlineAlsoRead) && si === alsoReadAnchor;
        const midLeadSplit =
          showAlsoRead && !section.headingText && section.blocks.length >= 3;

        if (midLeadSplit) {
          return (
            <div key={si} className="space-y-4">
              <ArticleBlocks
                blocks={section.blocks.slice(0, 2)}
                h3Map={h3Map}
              />
              {inlineAlsoRead}
              <ArticleBlocks blocks={section.blocks.slice(2)} h3Map={h3Map} />
            </div>
          );
        }

        const body = (
          <ArticleBlocks blocks={section.blocks} h3Map={h3Map} />
        );
        const alsoReadSlot = showAlsoRead ? inlineAlsoRead : null;

        if (!section.headingText) {
          return (
            <div key={si} className="space-y-4">
              {body}
              {alsoReadSlot}
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
          <div key={si} className="space-y-4">
            <ProseSectionShell
              skin={section.skin}
              headingId={section.headingId}
              heading={heading}
            >
              {body}
            </ProseSectionShell>
            {alsoReadSlot}
          </div>
        );
      })}
    </div>
  );
}
