"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChennaiSeekersHubCardView } from "@/components/jobs/chennai-seekers-hub-card";
import {
  CHENNAI_SEEKERS_ACCOMMODATION,
  CHENNAI_SEEKERS_AVAILABILITY,
  CHENNAI_SEEKERS_DEFAULT_FILTERS,
  CHENNAI_SEEKERS_LANGUAGES,
  CHENNAI_SEEKERS_LOCATIONS,
  CHENNAI_SEEKERS_QUICK_CHIPS,
  CHENNAI_SEEKERS_ROLE_TYPES,
  type ChennaiSeekerFilters,
  type ChennaiSeekerHubCard,
  type ChennaiSeekerSort,
  filterChennaiSeekerHubCards,
  sortChennaiSeekerHubCards,
} from "@/lib/jobs/chennai-seekers-hub-helpers";

const PAGE_SIZE = 20;

function countActiveFilters(filters: ChennaiSeekerFilters): number {
  let n = 0;
  if (filters.keyword.trim()) n++;
  if (filters.locationQuery.trim()) n++;
  if (filters.location) n++;
  if (filters.roleType) n++;
  if (filters.accommodation) n++;
  if (filters.availability) n++;
  if (filters.language) n++;
  if (filters.quickChip) n++;
  return n;
}

function FilterPanel({
  filters,
  onChange,
  onReset,
  idPrefix,
}: {
  filters: ChennaiSeekerFilters;
  onChange: (next: ChennaiSeekerFilters) => void;
  onReset: () => void;
  idPrefix: string;
}) {
  const set = (patch: Partial<ChennaiSeekerFilters>) =>
    onChange({ ...filters, ...patch });

  return (
    <div className="mcc-jobs-hub__filter-panel">
      <div className="mcc-jobs-hub__filter-head">
        <h2>Filter profiles</h2>
        <button type="button" className="mcc-jobs-hub__filter-reset" onClick={onReset}>
          Reset
        </button>
      </div>

      <fieldset className="mcc-jobs-hub__filter-group">
        <legend>Location</legend>
        {CHENNAI_SEEKERS_LOCATIONS.map((loc) => (
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
        <legend>Role type</legend>
        {CHENNAI_SEEKERS_ROLE_TYPES.map((t) => (
          <label key={t.id || "any"} className="mcc-jobs-hub__filter-option">
            <input
              type="radio"
              name={`${idPrefix}-role`}
              checked={filters.roleType === t.id}
              onChange={() => set({ roleType: t.id })}
            />
            {t.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="mcc-jobs-hub__filter-group">
        <legend>Accommodation</legend>
        {CHENNAI_SEEKERS_ACCOMMODATION.map((a) => (
          <label key={a.id || "any"} className="mcc-jobs-hub__filter-option">
            <input
              type="radio"
              name={`${idPrefix}-accommodation`}
              checked={filters.accommodation === a.id}
              onChange={() => set({ accommodation: a.id })}
            />
            {a.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="mcc-jobs-hub__filter-group">
        <legend>Availability</legend>
        {CHENNAI_SEEKERS_AVAILABILITY.map((a) => (
          <label key={a.id || "any"} className="mcc-jobs-hub__filter-option">
            <input
              type="radio"
              name={`${idPrefix}-availability`}
              checked={filters.availability === a.id}
              onChange={() => set({ availability: a.id })}
            />
            {a.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="mcc-jobs-hub__filter-group">
        <legend>Language</legend>
        {CHENNAI_SEEKERS_LANGUAGES.map((l) => (
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

type Props = {
  cards: ChennaiSeekerHubCard[];
  totalProfiles: number;
  accommodationCount: number;
  immediateCount: number;
};

export function ChennaiSeekersHubListing({
  cards,
  totalProfiles,
  accommodationCount,
  immediateCount,
}: Props) {
  const [filters, setFilters] = useState<ChennaiSeekerFilters>(CHENNAI_SEEKERS_DEFAULT_FILTERS);
  const [draft, setDraft] = useState<ChennaiSeekerFilters>(CHENNAI_SEEKERS_DEFAULT_FILTERS);
  const [sort, setSort] = useState<ChennaiSeekerSort>("latest");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(
    () => sortChennaiSeekerHubCards(filterChennaiSeekerHubCards(cards, filters), sort),
    [cards, filters, sort],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageCards = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const activeFilterCount = countActiveFilters(filters);

  const applySearch = () => {
    setFilters({ ...draft, quickChip: filters.quickChip });
    setPage(1);
  };

  const toggleChip = (chipId: string) => {
    const next = filters.quickChip === chipId ? "" : chipId;
    setFilters({ ...filters, quickChip: next });
    setDraft({ ...draft, quickChip: next });
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(CHENNAI_SEEKERS_DEFAULT_FILTERS);
    setDraft(CHENNAI_SEEKERS_DEFAULT_FILTERS);
    setPage(1);
  };

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
        No profiles yet. Share availability via{" "}
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
            <label htmlFor="seekers-keyword">Keyword</label>
            <input
              id="seekers-keyword"
              type="search"
              placeholder="Role, skill, area"
              value={draft.keyword}
              onChange={(e) => setDraft({ ...draft, keyword: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") applySearch();
              }}
            />
          </div>
          <div className="mcc-jobs-hub__field">
            <label htmlFor="seekers-location">Location</label>
            <input
              id="seekers-location"
              type="text"
              placeholder="Chennai, OMR, Tambaram"
              value={draft.locationQuery}
              onChange={(e) => setDraft({ ...draft, locationQuery: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") applySearch();
              }}
              list="chennai-seeker-areas"
            />
            <datalist id="chennai-seeker-areas">
              {CHENNAI_SEEKERS_LOCATIONS.filter((l) => l.id !== "all").map((l) => (
                <option key={l.id} value={l.label} />
              ))}
            </datalist>
          </div>
          <div className="mcc-jobs-hub__field">
            <label htmlFor="seekers-role">Role type</label>
            <select
              id="seekers-role"
              value={draft.roleType}
              onChange={(e) => setDraft({ ...draft, roleType: e.target.value })}
            >
              {CHENNAI_SEEKERS_ROLE_TYPES.map((t) => (
                <option key={t.id || "any"} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mcc-jobs-hub__field">
            <span className="sr-only">Search</span>
            <button type="button" className="mcc-jobs-hub__search-btn" onClick={applySearch}>
              Search profiles
            </button>
          </div>
        </div>

        <div className="mcc-jobs-hub__chips">
          <span className="mcc-jobs-hub__chips-label">Popular searches</span>
          {CHENNAI_SEEKERS_QUICK_CHIPS.map((chip) => (
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
      </div>

      <div className="mcc-jobs-hub__summary-row">
        <div className="mcc-jobs-hub__summary-card">
          <p className="mcc-jobs-hub__summary-label">Open profiles</p>
          <p className="mcc-jobs-hub__summary-value">{totalProfiles}</p>
          <p className="mcc-jobs-hub__summary-hint">Listed on this page</p>
        </div>
        <div className="mcc-jobs-hub__summary-card">
          <p className="mcc-jobs-hub__summary-label">Need stay</p>
          <p className="mcc-jobs-hub__summary-value">{accommodationCount}</p>
          <p className="mcc-jobs-hub__summary-hint">Family accommodation needed</p>
        </div>
        <div className="mcc-jobs-hub__summary-card">
          <p className="mcc-jobs-hub__summary-label">Immediate</p>
          <p className="mcc-jobs-hub__summary-value">{immediateCount}</p>
          <p className="mcc-jobs-hub__summary-hint">Available to start soon</p>
        </div>
        <Link href="/contact#jobs" className="mcc-jobs-hub__summary-card mcc-jobs-hub__summary-card--link">
          <p className="mcc-jobs-hub__summary-label">Post availability</p>
          <p className="mcc-jobs-hub__summary-value">List here</p>
          <p className="mcc-jobs-hub__summary-hint">Reach Chennai employers</p>
        </Link>
      </div>

      <div className="mcc-jobs-hub__layout">
        <aside className="mcc-jobs-hub__filter-sidebar" aria-label="Filter profiles">
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
            Filter profiles
            {activeFilterCount > 0 ? (
              <span className="mcc-jobs-hub__filter-badge">{activeFilterCount}</span>
            ) : null}
          </button>

          <div className="mcc-jobs-hub__list-header">
            <p className="mcc-jobs-hub__list-count">
              Showing {filtered.length} Chennai profile
              {filtered.length === 1 ? "" : "s"}
            </p>
            <label className="mcc-jobs-hub__sort">
              Sort by:
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as ChennaiSeekerSort);
                  setPage(1);
                }}
              >
                <option value="latest">Latest</option>
                <option value="location">Location</option>
                <option value="accommodation">Stay needed first</option>
                <option value="immediate">Immediate first</option>
              </select>
            </label>
          </div>

          {pageCards.length === 0 ? (
            <div className="mcc-jobs-hub__empty">
              No profiles match these filters. Try clearing a filter or{" "}
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
                  <ChennaiSeekersHubCardView card={card} />
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="mcc-jobs-hub__pagination" aria-label="Seeker profile pages">
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
          aria-label="Filter profiles"
        >
          <button
            type="button"
            className="mcc-jobs-hub__filter-drawer-backdrop"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="mcc-jobs-hub__filter-drawer-panel">
            <div className="mcc-jobs-hub__filter-drawer-head">
              <h2>Filter profiles</h2>
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
                Show {filtered.length} profile{filtered.length === 1 ? "" : "s"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
