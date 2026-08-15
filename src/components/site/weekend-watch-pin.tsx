import Link from "next/link";

const WATCH_EN =
  "/chennai-local-news/chennai-weekend-watch-independence-day-tax-rain-monday-august-2026";
const WATCH_TA = `${WATCH_EN}-tamil`;

/**
 * Time-boxed pin for 15–17 Aug 2026 — home tools strip + Chennai today.
 * Plain Chennai copy; no internal “desk” jargon.
 */
export function WeekendWatchPin({ lang }: { lang: "en" | "ta" }) {
  const href = lang === "ta" ? WATCH_TA : WATCH_EN;

  if (lang === "ta") {
    return (
      <aside
        className="rounded-2xl border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] px-4 py-4 sm:px-5"
        aria-label="வார இறுதி கண்காணிப்பு"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
          சனி 15 ஆகஸ்ட் · காலை புதுப்பிப்பு
        </p>
        <p className="mt-1.5 text-sm font-bold leading-snug text-[var(--foreground)]">
          <Link href={href} className="hover:underline">
            வார இறுதிப் பட்டியல் — கொடி ஏற்றம் முடிந்தது; வரி தளம், மழை, திங்கள் இன்னும் திறந்தவை
          </Link>
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
          புனித ஜார்ஜ் கோட்டையில் கொடி ஏற்றம் நடந்ததாக அறிக்கை. மீதமுள்ள சாலை மூடல்கள், சொத்து வரி
          தளம், ஞாயிறு–திங்கள் மழை —{" "}
          <Link href={href} className="font-semibold text-[var(--accent)] hover:underline">
            பட்டியலைத் திறக்க
          </Link>
          .
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="rounded-2xl border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] px-4 py-4 sm:px-5"
      aria-label="Weekend watch"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
        Saturday 15 August · morning update
      </p>
      <p className="mt-1.5 text-sm font-bold leading-snug text-[var(--foreground)]">
        <Link href={href} className="hover:underline">
          Weekend watch — I-Day hoist reported; tax portal, rain, Monday still open
        </Link>
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
        Flag hoist at Fort St. George is in this morning’s reports. Confirm leftover road
        closures, the GCC tax portal, and Sunday–Monday rain before you act.{" "}
        <Link href={href} className="font-semibold text-[var(--accent)] hover:underline">
          Open the checklist
        </Link>
        .
      </p>
    </aside>
  );
}
