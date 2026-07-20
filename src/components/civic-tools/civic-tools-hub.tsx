import Link from "next/link";
import {
  CIVIC_TOOLS,
  civicToolPath,
} from "@/content/civic-tools/tools-config";
import { ToolStatusChip } from "./shared/tool-status-chip";

export function CivicToolsHub() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CIVIC_TOOLS.map((tool) => (
        <Link
          key={tool.slug}
          href={civicToolPath(tool.slug)}
          className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]/40"
        >
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
              {tool.title}
            </h2>
            <ToolStatusChip status={tool.status} />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {tool.description}
          </p>
          <p className="mt-3 text-xs font-medium text-[var(--accent)]">
            Open tool →
          </p>
        </Link>
      ))}
    </div>
  );
}
