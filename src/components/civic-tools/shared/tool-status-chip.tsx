import type { CivicToolStatus } from "@/content/civic-tools/tools-config";
import { civicToolStatusLabel } from "@/content/civic-tools/tools-config";

export function ToolStatusChip({ status }: { status: CivicToolStatus }) {
  const tone =
    status === "live"
      ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
      : status === "preview"
        ? "bg-sky-500/15 text-sky-900 dark:text-sky-100"
        : "bg-amber-500/15 text-amber-900 dark:text-amber-100";

  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tone}`}
    >
      {civicToolStatusLabel(status)}
    </span>
  );
}
