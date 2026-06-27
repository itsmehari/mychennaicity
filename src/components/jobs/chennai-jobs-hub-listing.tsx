"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChennaiJobsHubCardView } from "@/components/jobs/chennai-jobs-hub-card";
import {
  CHENNAI_JOBS_DEFAULT_FILTERS,
  CHENNAI_JOBS_EXPERIENCE,
  CHENNAI_JOBS_LANGUAGES,
  CHENNAI_JOBS_LOCATIONS,
  CHENNAI_JOBS_QUICK_CHIPS,
  CHENNAI_JOBS_SEARCH_TYPES,
  CHENNAI_JOBS_TYPES,
  CHENNAI_JOBS_WORK_MODES,
  type ChennaiJobsFilters,
  type ChennaiJobsHubCard,
  type ChennaiJobsSort,
  filterChennaiJobsHubCards,
  sortChennaiJobsHubCards,
} from "@/lib/jobs/chennai-jobs-hub-helpers";

const PAGE_SIZE = 20;

function countActiveFilters(filters: ChennaiJobsFilters): number {
  let n = 0;
  if (filters.keyword.trim()) n++;
  if (filters.locationQuery.trim()) n++;
  if (filters.location) n++;
  if (filters.jobType) n++;
  if (filters.experience) n++;
  if (filters.workMode) n++;
  if (filters.language) n++;
  if (filters.quickChip) n++;
  return n;
}

type Props = {
  cards: ChennaiJobsHubCard[];
  totalOpen: number;
  fresherCount: number;
  walkInCount: number;
};

function FilterPanel({
  filters,
  onChange,
  onReset,
  idPrefix,
}: {
  filters: ChennaiJobsFilters;
  onChange: (next: ChennaiJobsFilters) => void;
  onReset: () => void;
  idPrefix: string;
}) {
  const set = (patch: Partial<ChennaiJobsFilters>) =>
    onChange({ ...filters, ...patch });

  return (
    <div className="mcc-jobs-hub__filter-panel">
      <div className="mcc-jobs-hub__filter-head">
        <h2>Filter jobs</h2>
        <button type="button" className="mcc-jobs-hub__filter-reset" onClick={onReset}>
          Reset
        </button>
      </div>

      <fieldset className="mcc-jobs-hub__filter-group">
        <legend>Location</legend>
        {CHENNAI_JOBS_LOCATIONS.map((loc) => (
          <label key={loc.id} className="mcc-jobs-hub__filter-option">
            <input
              type="radio"
              name={`${idPrefix}-location`}
              checked={filters.location === loc.id || (!filters.location && loc.id === "all")}
              onChange={() => set({ location: loc.id === "all" ? "" : loc.id })}
            />
            {loc.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="mcc-jobs-hub__filter-group">
        <legend>Job type</legend>
        {CHENNAI_JOBS_TYPES.map((t) => (
          <label key={t.id || "any"} className="mcc-jobs-hub__filter-option">
            <input
              type="radio"
              name={`${idPrefix}-job-type`}
              checked={filters.jobType === t.id}
              onChange={() => set({ jobType: t.id })}
            />
            {t.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="mcc-jobs-hub__filter-group">
        <legend>Experience</legend>
        {CHENNAI_JOBS_EXPERIENCE.map((e) => (
          <label key={e.id || "any"} className="mcc-jobs-hub__filter-option">
            <input
              type="radio"
              name={`${idPrefix}-experience`}
              checked={filters.experience === e.id}
              onChange={() => set({ experience: e.id })}
            />
            {e.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="mcc-jobs-hub__filter-group">
        <legend>Work mode</legend>
        {CHENNAI_JOBS_WORK_MODES.map((m) => (
          <label key={m.id || "any"} className="mcc-jobs-hub__filter-option">
            <input
              type="radio"
              name={`${idPrefix}-work-mode`}
              checked={filters.workMode === m.id}
              onChange={() => set({ workMode: m.id })}
            />
            {m.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="mcc-jobs-hub__filter-group">
        <legend>Language</legend>
        {CHENNAI_JOBS_LANGUAGES.map((l) => (
          <label key={l.id || "any"} className="mcc-jobs-hub__filter-option">
            <input
              type="radio"
              name={`${idPrefix}-language`}
              checked={filters.language === l.id}
              onChange={() => set({ language: l.id })}
            />
            {l.label}
          </label>
        ))}
      </fieldset>

      <div className="mcc-jobs-hub__filter-actions">
        <button type="button" className="mcc-jobs-hub__search-btn" onClick={onReset}>
          Clear all
        </button>
      </div>
    </div>
  );
}

export function ChennaiJobsHubListing({
  cards,
  totalOpen,
  fresherCount,
  walkInCount,
}: Props) {
  const [filters, setFilters] = useState<ChennaiJobsFilters>(CHENNAI_JOBS_DEFAULT_FILTERS);
  const [draft, setDraft] = useState<ChennaiJobsFilters>(CHENNAI_JOBS_DEFAULT_FILTERS);
  const [sort, setSort] = useState<ChennaiJobsSort>("latest");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(
    () => sortChennaiJobsHubCards(filterChennaiJobsHubCards(cards, filters), sort),
    [cards, filters, sort],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageCards = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const applySearch = () => {
    setFilters({
      ...draft,
      quickChip: filters.quickChip,
    });
    setPage(1);
  };

  const toggleChip = (chipId: string) => {
    const next = filters.quickChip === chipId ? "" : chipId;
    setFilters({ ...filters, quickChip: next });
    setDraft({ ...draft, quickChip: next });
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(CHENNAI_JOBS_DEFAULT_FILTERS);
    setDraft(CHENNAI_JOBS_DEFAULT_FILTERS);
    setPage(1);
  };

  const activeFilterCount = countActiveFilters(filters);

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileFiltersOpen]);

  if (cards.length === 0) {
    return (
      <div className="mcc-jobs-hub__empty mt-10">
        No job listings yet. Employers can submit via{" "}
        <Link href="/contact#jobs" className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
          Contact → Jobs
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="mcc-jobs-hub">
      <div className="mcc-jobs-hub__search-card">
        <div className="mcc-jobs-hub__search-grid">
          <div className="mcc-jobs-hub__field">
            <label htmlFor="jobs-keyword">Keyword</label>
            <input
              id="jobs-keyword"
              type="search"
              placeholder="Job title, company, skill"
              value={draft.keyword}
              onChange={(e) => setDraft({ ...draft, keyword: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") applySearch();
              }}
            />
          </div>
          <div className="mcc-jobs-hub__field">
            <label htmlFor="jobs-location">Location</label>
            <input
              id="jobs-location"
              type="text"
              placeholder="Chennai, OMR, T. Nagar, Velachery"
              value={draft.locationQuery}
              onChange={(e) => setDraft({ ...draft, locationQuery: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") applySearch();
              }}
              list="chennai-job-areas"
            />
            <datalist id="chennai-job-areas">
              {CHENNAI_JOBS_LOCATIONS.filter((l) => l.id !== "all").map((l) => (
                <option key={l.id} value={l.label} />
              ))}
            </datalist>
          </div>
          <div className="mcc-jobs-hub__field">
            <label htmlFor="jobs-type">Job type</label>
            <select
              id="jobs-type"
              value={draft.jobType}
              onChange={(e) => setDraft({ ...draft, jobType: e.target.value })}
            >
              {CHENNAI_JOBS_SEARCH_TYPES.map((t) => (
                <option key={t.id || "any"} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mcc-jobs-hub__field">
            <span className="sr-only">Search</span>
            <button type="button" className="mcc-jobs-hub__search-btn" onClick={applySearch}>
              Search jobs
            </button>
          </div>
        </div>

        <div className="mcc-jobs-hub__chips">
          <span className="mcc-jobs-hub__chips-label">Popular searches</span>
          {CHENNAI_JOBS_QUICK_CHIPS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className={`mcc-jobs-hub__chip${filters.quickChip === chip.id ? " is-active" : ""}`}
              aria-pressed={filters.quickChip === chip.id}
              onClick={() => toggleChip(chip.id)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
          <Link
            href="/guides/chennai-tech-careers"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            How to read Chennai job ads
          </Link>{" "}
          — plain tips on hybrid wording, pay talk, and safe applying.
        </p>
      </div>

      <div className="mcc-jobs-hub__summary-row">
        <div className="mcc-jobs-hub__summary-card">
          <p className="mcc-jobs-hub__summary-label">Open now</p>
          <p className="mcc-jobs-hub__summary-value">{totalOpen}</p>
          <p className="mcc-jobs-hub__summary-hint">Jobs listed on this page</p>
        </div>
        <div className="mcc-jobs-hub__summary-card">
          <p className="mcc-jobs-hub__summary-label">Freshers</p>
          <p className="mcc-jobs-hub__summary-value">{fresherCount}</p>
          <p className="mcc-jobs-hub__summary-hint">Entry-level and training roles</p>
        </div>
        <div className="mcc-jobs-hub__summary-card">
          <p className="mcc-jobs-hub__summary-label">Walk-ins</p>
          <p className="mcc-jobs-hub__summary-value">{walkInCount}</p>
          <p className="mcc-jobs-hub__summary-hint">Immediate interview opportunities</p>
        </div>
        <Link href="/contact#jobs" className="mcc-jobs-hub__summary-card mcc-jobs-hub__summary-card--link">
          <p className="mcc-jobs-hub__summary-label">Post a job</p>
          <p className="mcc-jobs-hub__summary-value">List here</p>
          <p className="mcc-jobs-hub__summary-hint">Reach Chennai job seekers</p>
        </Link>
      </div>

      <div className="mcc-jobs-hub__layout">
        <aside className="mcc-jobs-hub__filter-sidebar" aria-label="Filter jobs">
          <FilterPanel
            filters={filters}
            onChange={(next) => {
              setFilters(next);
              setPage(1);
            }}
            onReset={resetFilters}
            idPrefix="desktop"
          />
        </aside>

        <div>
          <button
            type="button"
            className="mcc-jobs-hub__mobile-filter-btn"
            onClick={() => setMobileFiltersOpen(true)}
          >
            Filter jobs
            {activeFilterCount > 0 ? (
              <span className="mcc-jobs-hub__filter-badge">{activeFilterCount}</span>
            ) : null}
          </button>

          <div className="mcc-jobs-hub__list-header">
            <p className="mcc-jobs-hub__list-count">
              Showing {filtered.length} Chennai job listing
              {filtered.length === 1 ? "" : "s"}
            </p>
            <label className="mcc-jobs-hub__sort">
              Sort by:
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as ChennaiJobsSort);
                  setPage(1);
                }}
              >
                <option value="latest">Latest</option>
                <option value="location">Location</option>
                <option value="freshers">Freshers first</option>
                <option value="walk-in">Walk-in first</option>
              </select>
            </label>
          </div>

          {pageCards.length === 0 ? (
            <div className="mcc-jobs-hub__empty">
              No jobs match these filters. Try clearing a filter or{" "}
              <button
                type="button"
                className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                onClick={resetFilters}
              >
                reset all
              </button>
              .
            </div>
          ) : (
            <div className="mcc-jobs-hub__feed" role="list">
              {pageCards.map((card) => (
                <div key={card.id} role="listitem">
                  <ChennaiJobsHubCardView card={card} />
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="mcc-jobs-hub__pagination" aria-label="Chennai jobs pages">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={safePage <= 1 ? "text-[var(--muted)]" : "font-semibold text-[var(--accent)]"}
              >
                Previous
              </button>
              <span>
                Page {safePage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={
                  safePage >= totalPages ? "text-[var(--muted)]" : "font-semibold text-[var(--accent)]"
                }
              >
                Next
              </button>
            </nav>
          ) : null}
        </div>
      </div>

      {mobileFiltersOpen ? (
        <div
          className="mcc-jobs-hub__filter-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Filter jobs"
        >
          <button
            type="button"
            className="mcc-jobs-hub__filter-drawer-backdrop"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="mcc-jobs-hub__filter-drawer-panel">
            <div className="mcc-jobs-hub__filter-drawer-head">
              <h2>Filter jobs</h2>
              <button
                type="button"
                className="mcc-jobs-hub__filter-drawer-close"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mcc-jobs-hub__filter-drawer-body">
              <FilterPanel
                filters={filters}
                onChange={(next) => {
                  setFilters(next);
                  setPage(1);
                }}
                onReset={resetFilters}
                idPrefix="mobile"
              />
            </div>
            <div className="mcc-jobs-hub__filter-drawer-footer">
              <button
                type="button"
                className="mcc-jobs-hub__search-btn mcc-jobs-hub__filter-drawer-apply"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Show {filtered.length} job{filtered.length === 1 ? "" : "s"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
