import Link from "next/link";
import { GOLD_TA_SNIPPET } from "@/content/gold-rate/chennai-gold-rate-ta";
import { CHENNAI_BUYING_GOLD_GUIDE_PATH } from "@/lib/routes/chennai-gold-rate";

export function GoldRateTamilSnippet() {
  return (
    <aside
      lang="ta"
      className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5"
    >
      <h2 className="text-sm font-bold text-[var(--foreground)]">
        {GOLD_TA_SNIPPET.heading}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        {GOLD_TA_SNIPPET.body}
      </p>
      <Link
        href={CHENNAI_BUYING_GOLD_GUIDE_PATH}
        className="mt-3 inline-block text-sm font-semibold text-[var(--accent)] hover:underline"
      >
        {GOLD_TA_SNIPPET.cta} →
      </Link>
    </aside>
  );
}
