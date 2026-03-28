import type { LocalityRecord, MapViewMode, OverlayKey, WardPathRecord } from "./types";

export type MapControllerOptions = {
  /** Receives ward id or null when cleared */
  onSelect: (ward: WardPathRecord | null, locality: LocalityRecord | null) => void;
  /** Ward null means pointer left the ward (hide tooltip). */
  onHover: (
    ward: WardPathRecord | null,
    locality: LocalityRecord | null,
    clientX: number | null,
    clientY: number | null,
  ) => void;
};

const SVG_NS = "http://www.w3.org/2000/svg";

export class ChennaiMapController {
  private svg: SVGSVGElement | null = null;
  private rootG: SVGGElement | null = null;
  private pathByWardId = new Map<string, SVGPathElement>();
  private wards: WardPathRecord[] = [];
  private localities: Record<string, LocalityRecord> = {};
  private selectedId: string | null = null;
  private hoveredId: string | null = null;
  private overlays = new Set<OverlayKey>();
  private viewMode: MapViewMode = "greater";
  private regionFilter: string | null = null;
  private corridorFilter: string | null = null;
  private reduceMotion = false;

  constructor(private opts: MapControllerOptions) {
    if (typeof window !== "undefined") {
      this.reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }
  }

  mount(
    container: HTMLElement,
    wards: WardPathRecord[],
    localities: Record<string, LocalityRecord>,
    viewBox: string,
  ): void {
    this.destroy();
    this.wards = wards;
    this.localities = localities;

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.classList.add("ccmap-svg");
    svg.setAttribute("focusable", "false");

    const rootG = document.createElementNS(SVG_NS, "g");
    rootG.setAttribute("id", "ccmap-wards-root");

    const byRegion = new Map<string, Map<string, WardPathRecord[]>>();
    for (const w of wards) {
      if (!byRegion.has(w.regionId)) byRegion.set(w.regionId, new Map());
      const zm = byRegion.get(w.regionId)!;
      if (!zm.has(w.zoneId)) zm.set(w.zoneId, []);
      zm.get(w.zoneId)!.push(w);
    }

    const regionOrder = ["north", "central", "south", "extended"];
    for (const regionId of regionOrder) {
      const zones = byRegion.get(regionId);
      if (!zones) continue;
      const rg = document.createElementNS(SVG_NS, "g");
      rg.setAttribute("id", `region-${regionId}`);
      rg.setAttribute("data-region", regionId);
      rg.classList.add("ccmap-region");

      for (const [zoneId, list] of zones) {
        const zg = document.createElementNS(SVG_NS, "g");
        zg.setAttribute("id", zoneId);
        zg.setAttribute("data-zone", zoneId);
        zg.classList.add("ccmap-zone");

        for (const w of list) {
          const path = document.createElementNS(SVG_NS, "path");
          path.setAttribute("id", w.id);
          path.setAttribute("d", w.d);
          path.setAttribute("data-ward", w.id);
          path.setAttribute("data-locality", w.localityId);
          path.setAttribute("data-zone", w.zoneId);
          path.setAttribute("data-region", w.regionId);
          path.classList.add("ccmap-area");
          path.setAttribute("vector-effect", "non-scaling-stroke");

          const loc = localities[w.localityId];
          if (loc) this.applyLocalityDataset(path, loc);

          path.addEventListener("pointerenter", (e) => {
            this.hoveredId = w.id;
            this.refreshPathClasses();
            this.opts.onHover(
              w,
              loc ?? null,
              e.clientX,
              e.clientY,
            );
          });
          path.addEventListener("pointerleave", () => {
            this.hoveredId = null;
            this.refreshPathClasses();
            this.opts.onHover(null, null, null, null);
          });
          path.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            this.select(w.id);
          });

          this.pathByWardId.set(w.id, path);
          zg.appendChild(path);
        }
        rg.appendChild(zg);
      }
      rootG.appendChild(rg);
    }

    svg.appendChild(rootG);
    container.appendChild(svg);
    this.svg = svg;
    this.rootG = rootG;
    this.applyChromeState();
  }

  private applyLocalityDataset(path: SVGPathElement, loc: LocalityRecord): void {
    const o = loc.overlays;
    path.dataset.overlayIt = o.itCorridor ? "1" : "0";
    path.dataset.overlayMetro = o.metro ? "1" : "0";
    path.dataset.overlayIndustrial = o.industrial ? "1" : "0";
    path.dataset.overlayFlood = o.floodRisk ? "1" : "0";
    path.dataset.overlayGrowth = o.growthZone ? "1" : "0";
    path.dataset.corridorOmr = loc.corridors.some((c) =>
      /omr/i.test(c),
    )
      ? "1"
      : "0";
    path.dataset.corridorEcr = loc.corridors.some((c) =>
      /ecr/i.test(c),
    )
      ? "1"
      : "0";
    path.dataset.corridorGst = loc.corridors.some((c) =>
      /gst/i.test(c),
    )
      ? "1"
      : "0";
    path.dataset.corridorNh48 = loc.corridors.some((c) =>
      /nh48|sriperumbudur/i.test(c),
    )
      ? "1"
      : "0";
    path.dataset.corridorNorthInd = loc.corridors.some((c) =>
      /north industrial|ennore/i.test(c),
    )
      ? "1"
      : "0";
  }

  destroy(): void {
    this.svg?.remove();
    this.svg = null;
    this.rootG = null;
    this.pathByWardId.clear();
  }

  select(wardId: string | null): void {
    this.selectedId = wardId;
    this.refreshPathClasses();
    if (!wardId) {
      this.opts.onSelect(null, null);
      return;
    }
    const w = this.wards.find((x) => x.id === wardId);
    const loc = w ? this.localities[w.localityId] : undefined;
    this.opts.onSelect(w ?? null, loc ?? null);
  }

  getSelectedWardId(): string | null {
    return this.selectedId;
  }

  setOverlays(keys: Set<OverlayKey>): void {
    this.overlays = keys;
    this.applyChromeState();
  }

  setViewMode(mode: MapViewMode): void {
    this.viewMode = mode;
    this.applyChromeState();
    this.refreshPathClasses();
  }

  setRegionFilter(regionId: string | null): void {
    this.regionFilter = regionId;
    this.refreshPathClasses();
  }

  setCorridorFilter(corridor: string | null): void {
    this.corridorFilter = corridor;
    this.refreshPathClasses();
  }

  reset(): void {
    this.selectedId = null;
    this.regionFilter = null;
    this.corridorFilter = null;
    this.viewMode = "greater";
    this.overlays.clear();
    this.applyChromeState();
    this.refreshPathClasses();
    this.opts.onSelect(null, null);
  }

  findWardsByLocalityName(query: string): WardPathRecord[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const ids = new Set<string>();
    for (const w of this.wards) {
      const loc = this.localities[w.localityId];
      if (!loc) continue;
      const nameHit = loc.name.toLowerCase().includes(q);
      const zoneHit = loc.zone.toLowerCase().includes(q);
      const tagHit = loc.tags.some((t) => t.toLowerCase().includes(q));
      if (nameHit || zoneHit || tagHit) ids.add(w.id);
    }
    return this.wards.filter((w) => ids.has(w.id));
  }

  /** First ward matching locality name — for search jump */
  pickWardForSearch(query: string): string | null {
    const hits = this.findWardsByLocalityName(query);
    return hits[0]?.id ?? null;
  }

  private applyChromeState(): void {
    if (!this.svg) return;
    const svg = this.svg;
    svg.classList.remove(
      "ccmap-view--core",
      "ccmap-view--greater",
      "ccmap-view--region",
      "ccmap-view--corridor",
    );
    svg.classList.add(`ccmap-view--${this.viewMode}`);

    for (const k of [
      "overlay-it",
      "overlay-metro",
      "overlay-industrial",
      "overlay-flood",
      "overlay-growth",
    ] as const) {
      svg.classList.remove(k);
    }
    if (this.overlays.has("itCorridor")) svg.classList.add("overlay-it");
    if (this.overlays.has("metro")) svg.classList.add("overlay-metro");
    if (this.overlays.has("industrial")) svg.classList.add("overlay-industrial");
    if (this.overlays.has("floodRisk")) svg.classList.add("overlay-flood");
    if (this.overlays.has("growthZone")) svg.classList.add("overlay-growth");

    if (this.reduceMotion) svg.classList.add("ccmap-reduced-motion");
  }

  private refreshPathClasses(): void {
    for (const [id, path] of this.pathByWardId) {
      const w = this.wards.find((x) => x.id === id);
      if (!w) continue;
      path.classList.remove(
        "is-active",
        "is-hover",
        "is-dimmed",
        "overlay-hit-it",
        "overlay-hit-metro",
        "overlay-hit-industrial",
        "overlay-hit-flood",
        "overlay-hit-growth",
        "corridor-hit",
      );

      if (id === this.selectedId) path.classList.add("is-active");
      if (id === this.hoveredId) path.classList.add("is-hover");

      const loc = this.localities[w.localityId];
      if (loc) {
        if (this.overlays.has("itCorridor") && loc.overlays.itCorridor)
          path.classList.add("overlay-hit-it");
        if (this.overlays.has("metro") && loc.overlays.metro)
          path.classList.add("overlay-hit-metro");
        if (this.overlays.has("industrial") && loc.overlays.industrial)
          path.classList.add("overlay-hit-industrial");
        if (this.overlays.has("floodRisk") && loc.overlays.floodRisk)
          path.classList.add("overlay-hit-flood");
        if (this.overlays.has("growthZone") && loc.overlays.growthZone)
          path.classList.add("overlay-hit-growth");
      }

      if (this.viewMode === "core" && (w.regionId === "north" || w.regionId === "extended")) {
        path.classList.add("is-dimmed");
      }

      if (this.viewMode === "region" && this.regionFilter && w.regionId !== this.regionFilter) {
        path.classList.add("is-dimmed");
      }

      if (this.viewMode === "corridor" && this.corridorFilter) {
        const hit = this.corridorPathMatches(path, this.corridorFilter);
        if (!hit) path.classList.add("is-dimmed");
        else path.classList.add("corridor-hit");
      }
    }
  }

  private corridorPathMatches(path: SVGPathElement, key: string): boolean {
    switch (key) {
      case "omr":
        return path.dataset.corridorOmr === "1";
      case "ecr":
        return path.dataset.corridorEcr === "1";
      case "gst":
        return path.dataset.corridorGst === "1";
      case "nh48":
        return path.dataset.corridorNh48 === "1";
      case "north-industrial":
        return path.dataset.corridorNorthInd === "1";
      default:
        return false;
    }
  }
}
