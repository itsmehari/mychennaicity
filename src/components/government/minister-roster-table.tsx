"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FILTER_CHIP_LABELS,
  MINISTERS_MAY_2026,
  ministerDisplayName,
  type MinisterFilterTag,
  type MinisterRow,
} from "@/content/government/ministers-may-2026";
import { ministerPath } from "@/content/government/paths";

type Props = {
  locale?: "en" | "ta";
};

export function MinisterRosterTable({ locale = "en" }: Props) {
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState<MinisterFilterTag | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MINISTERS_MAY_2026.filter((m) => {
      if (chip !== "all" && !m.filterTags?.includes(chip)) return false;
      if (!q) return true;
      const haystack = [
        m.name,
        m.ministryTitle,
        m.designation,
        ...m.portfolios,
        ...(m.chennaiTags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, chip]);

  return (
    <div className="not-prose my-8 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="minister-search">
          Search ministers
        </label>
        <input
          id="minister-search"
          type="search"
          placeholder={
            locale === "ta"
              ? "பெயர் அல்லது portfolio தேட..."
              : "Search name or portfolio…"
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
        />
        <p className="shrink-0 text-sm text-[var(--muted)]">
          {filtered.length} / {MINISTERS_MAY_2026.length}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip
          active={chip === "all"}
          onClick={() => setChip("all")}
          label={locale === "ta" ? "அனைத்தும்" : "All"}
        />
        {(Object.keys(FILTER_CHIP_LABELS) as MinisterFilterTag[]).map((tag) => (
          <FilterChip
            key={tag}
            active={chip === tag}
            onClick={() => setChip(tag)}
            label={FILTER_CHIP_LABELS[tag]}
          />
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-[var(--border)] md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-[var(--surface)] text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Minister</th>
              <th className="px-4 py-3">Ministry</th>
              <th className="px-4 py-3">Portfolios</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.map((m) => (
              <MinisterTableRow key={m.slug} m={m} locale={locale} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {filtered.map((m) => (
          <MinisterCard key={m.slug} m={m} locale={locale} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">
          {locale === "ta"
            ? "பொருந்தும் அமைச்சர் இல்லை — வேறு keyword முயற்சிக்கவும்."
            : "No ministers match — try another keyword or clear filters."}
        </p>
      ) : null}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1 text-xs font-semibold transition",
        active
          ? "bg-[var(--accent)] text-white"
          : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function MinisterTableRow({ m, locale }: { m: MinisterRow; locale: "en" | "ta" }) {
  return (
    <tr className="hover:bg-[var(--surface)]/80">
      <td className="px-4 py-3 tabular-nums text-[var(--muted)]">{m.order}</td>
      <td className="px-4 py-3">
        <Link
          href={ministerPath(m.slug, locale)}
          className="font-semibold text-[var(--accent)] hover:underline"
        >
          {ministerDisplayName(m)}
        </Link>
        <p className="mt-0.5 text-xs text-[var(--muted)]">{m.designation}</p>
      </td>
      <td className="px-4 py-3 font-medium text-[var(--foreground)]">
        {m.ministryTitle}
      </td>
      <td className="px-4 py-3 text-[var(--muted)]">
        <ul className="list-disc space-y-1 pl-4">
          {m.portfolios.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

export function MinisterCard({ m, locale = "en" }: { m: MinisterRow; locale?: "en" | "ta" }) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-xs font-bold text-[var(--muted)]">#{m.order}</p>
      <h3 className="mt-1 text-base font-bold text-[var(--foreground)]">
        <Link href={ministerPath(m.slug, locale)} className="text-[var(--accent)] hover:underline">
          {ministerDisplayName(m)}
        </Link>
      </h3>
      <p className="text-sm text-[var(--muted)]">{m.ministryTitle}</p>
      <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-[var(--muted)]">
        {m.portfolios.slice(0, 2).map((p) => (
          <li key={p}>{p}</li>
        ))}
        {m.portfolios.length > 2 ? (
          <li className="list-none pl-0 text-xs">
            +{m.portfolios.length - 2} more on profile
          </li>
        ) : null}
      </ul>
    </article>
  );
}
