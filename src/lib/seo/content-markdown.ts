/**
 * Plain-text twins of public job, event, and news pages.
 * The HTML page stays canonical. This is the same public copy without the layout.
 */
import type { Metadata } from "next";

export function markdownTwinPath(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.at(-1) === "markdown") return null;

  if (parts[0] === "chennai-jobs" && parts.length === 2) {
    if (parts[1] === "feed.xml" || parts[1] === "looking-for-work") return null;
    return `/${parts[0]}/${parts[1]}/markdown`;
  }
  if (
    parts[0] === "chennai-jobs" &&
    parts[1] === "looking-for-work" &&
    parts.length === 3
  ) {
    return `/${parts.join("/")}/markdown`;
  }
  if (parts[0] === "chennai-local-events" && parts.length === 2) {
    if (parts[1] === "feed.xml" || parts[1] === "submit") return null;
    return `/${parts[0]}/${parts[1]}/markdown`;
  }
  if (parts[0] === "chennai-local-news" && parts.length === 2) {
    if (parts[1] === "feed.xml") return null;
    return `/${parts[0]}/${parts[1]}/markdown`;
  }
  if (
    parts.length === 2 &&
    parts[0] === "community" &&
    parts[1] === "mybangalore-whatsapp-community-group"
  ) {
    return "/community/mybangalore-whatsapp-community-group/markdown";
  }
  return null;
}

/** True when the client asked for Markdown ahead of HTML. */
export function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  let markdown = 0;
  let html = 0;
  let sawMarkdown = false;
  let sawHtml = false;
  for (const part of accept.split(",")) {
    const [rawType, ...params] = part.trim().split(";");
    const type = rawType.trim().toLowerCase();
    const qParam = params.map((param) => param.trim()).find((param) => param.startsWith("q="));
    const quality = qParam ? Number(qParam.slice(2)) : 1;
    if (Number.isNaN(quality)) continue;
    if (type === "text/markdown") {
      sawMarkdown = true;
      markdown = quality;
    }
    if (type === "text/html") {
      sawHtml = true;
      html = quality;
    }
  }
  if (!sawMarkdown) return false;
  if (!sawHtml) return true;
  return markdown > html;
}

export function withMarkdownAlternate(
  alternates: Metadata["alternates"],
  htmlPath: string,
): NonNullable<Metadata["alternates"]> {
  const path = htmlPath.replace(/\/$/, "");
  const existing = alternates?.types;
  const types =
    existing && !Array.isArray(existing) ? existing : {};
  return {
    ...alternates,
    types: {
      ...types,
      "text/markdown": [{ url: `${path}/markdown`, title: "Markdown" }],
    },
  };
}

export function absolutizeSiteLinks(markdown: string, origin: string): string {
  const base = origin.replace(/\/$/, "");
  return markdown.replace(/\]\(\/([^)\s]+)\)/g, `](${base}/$1)`);
}

function fact(label: string, value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return `- ${label}: ${trimmed}`;
}

function documentFrame(input: {
  title: string;
  canonical: string;
  facts: Array<string | null>;
  body: string;
  citeNote: string;
}): string {
  const facts = input.facts.filter((line): line is string => Boolean(line));
  return `# ${input.title}

${facts.join("\n")}

${input.body.trim()}

---

${input.citeNote}
Canonical: ${input.canonical}
`;
}

export function buildJobMarkdown(input: {
  title: string;
  canonical: string;
  markdownUrl: string;
  employer: string;
  location?: string | null;
  roleType?: string | null;
  workMode?: string | null;
  pay?: string | null;
  openings?: number | null;
  applyBy?: string | null;
  applyUrl?: string | null;
  tamilUrl?: string | null;
  body: string;
  origin: string;
}): string {
  return documentFrame({
    title: input.title,
    canonical: input.canonical,
    facts: [
      fact("Page", input.canonical),
      fact("Plain text", input.markdownUrl),
      fact("Employer", input.employer),
      fact("Location", input.location),
      fact("Role type", input.roleType),
      fact("Work mode", input.workMode),
      fact("Pay", input.pay),
      fact("Openings", input.openings && input.openings > 1 ? String(input.openings) : null),
      fact("Apply by", input.applyBy),
      fact("Apply", input.applyUrl),
      fact("Tamil page", input.tamilUrl),
    ],
    body: absolutizeSiteLinks(input.body, input.origin),
    citeNote:
      "Cite the canonical page. Confirm pay and the application step there before acting. mychennaicity.in is not the employer.",
  });
}

export function buildJobSeekerMarkdown(input: {
  title: string;
  canonical: string;
  markdownUrl: string;
  role?: string | null;
  location?: string | null;
  availability?: string | null;
  needsAccommodation?: boolean;
  phone?: string | null;
  whatsApp?: string | null;
  email?: string | null;
  body: string;
  origin: string;
}): string {
  return documentFrame({
    title: input.title,
    canonical: input.canonical,
    facts: [
      fact("Page", input.canonical),
      fact("Plain text", input.markdownUrl),
      fact("Kind", "Looking for work — a person seeking a job, not an employer vacancy"),
      fact("Role", input.role),
      fact("Location", input.location),
      fact("Availability", input.availability),
      fact("Accommodation", input.needsAccommodation ? "Needs a place to stay" : null),
      fact("Phone", input.phone),
      fact("WhatsApp", input.whatsApp),
      fact("Email", input.email),
    ],
    body: absolutizeSiteLinks(input.body, input.origin),
    citeNote:
      "Cite the canonical page. Contact details are the ones printed on that public notice.",
  });
}

export function buildEventMarkdown(input: {
  title: string;
  canonical: string;
  markdownUrl: string;
  when: string;
  venue?: string | null;
  locality?: string | null;
  address?: string | null;
  description?: string | null;
  origin: string;
}): string {
  return documentFrame({
    title: input.title,
    canonical: input.canonical,
    facts: [
      fact("Page", input.canonical),
      fact("Plain text", input.markdownUrl),
      fact("When", input.when),
      fact("Venue", input.venue),
      fact("Locality", input.locality),
      fact("Address", input.address),
    ],
    body: absolutizeSiteLinks(input.description?.trim() || "_No description stored._", input.origin),
    citeNote:
      "Times are India Standard Time. Cite the canonical page and confirm the venue and tickets with the organiser.",
  });
}

export function buildNewsMarkdown(input: {
  title: string;
  canonical: string;
  markdownUrl: string;
  published?: string | null;
  updated?: string | null;
  sourceName?: string | null;
  sourceUrl?: string | null;
  author?: string | null;
  summary?: string | null;
  report: string;
  analysis?: string | null;
  origin: string;
}): string {
  const source = input.sourceName
    ? input.sourceUrl
      ? `${input.sourceName} (${input.sourceUrl})`
      : input.sourceName
    : input.sourceUrl;
  const parts = [input.summary?.trim(), input.report.trim(), input.analysis?.trim()].filter(
    (part): part is string => Boolean(part),
  );
  return documentFrame({
    title: input.title,
    canonical: input.canonical,
    facts: [
      fact("Page", input.canonical),
      fact("Plain text", input.markdownUrl),
      fact("Published", input.published),
      fact("Updated", input.updated),
      fact("Source", source),
      fact("Author", input.author),
    ],
    body: absolutizeSiteLinks(parts.join("\n\n"), input.origin),
    citeNote:
      "Cite the canonical article. Attribute official claims to the named source. The story includes a civic disclaimer and an AI-assisted fine print.",
  });
}

export function markdownResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "X-Robots-Tag": "all",
      Vary: "Accept",
    },
  });
}
