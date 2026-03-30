import type { ConstituencyPathRecord, ElectionMapViewFilter } from "./types";

export type ElectionMapControllerOptions = {
  onSelect: (c: ConstituencyPathRecord | null) => void;
  onHover: (
    c: ConstituencyPathRecord | null,
    clientX: number | null,
    clientY: number | null,
  ) => void;
};

const SVG_NS = "http://www.w3.org/2000/svg";

export class ElectionMapController {
  private svg: SVGSVGElement | null = null;
  private constituencies: ConstituencyPathRecord[] = [];
  private pathById = new Map<string, SVGPathElement>();
  private selectedId: string | null = null;
  private hoveredId: string | null = null;
  private viewFilter: ElectionMapViewFilter = "all";
  private reduceMotion = false;

  constructor(private opts: ElectionMapControllerOptions) {
    if (typeof window !== "undefined") {
      this.reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }
  }

  mount(
    container: HTMLElement,
    constituencies: ConstituencyPathRecord[],
    viewBox: string,
  ): void {
    this.destroy();
    this.constituencies = constituencies;

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.classList.add("elmap-svg");
    svg.setAttribute("focusable", "false");

    const rootG = document.createElementNS(SVG_NS, "g");
    rootG.setAttribute("id", "elmap-constituencies-root");

    for (const c of constituencies) {
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("id", c.id);
      path.setAttribute("d", c.d);
      path.setAttribute("data-ac", String(c.acNo));
      path.setAttribute("data-group", c.group);
      path.classList.add("elmap-area");
      path.setAttribute("vector-effect", "non-scaling-stroke");

      path.addEventListener("pointerenter", (e) => {
        this.hoveredId = c.id;
        this.refreshPathClasses();
        this.opts.onHover(c, e.clientX, e.clientY);
      });
      path.addEventListener("pointerleave", () => {
        this.hoveredId = null;
        this.refreshPathClasses();
        this.opts.onHover(null, null, null);
      });
      path.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        this.select(c.id);
      });

      this.pathById.set(c.id, path);
      rootG.appendChild(path);
    }

    svg.appendChild(rootG);
    container.appendChild(svg);
    this.svg = svg;
    this.applyChromeState();
    this.refreshPathClasses();
  }

  destroy(): void {
    this.svg?.remove();
    this.svg = null;
    this.pathById.clear();
  }

  select(id: string | null): void {
    this.selectedId = id;
    this.refreshPathClasses();
    if (!id) {
      this.opts.onSelect(null);
      return;
    }
    const c = this.constituencies.find((x) => x.id === id);
    this.opts.onSelect(c ?? null);
  }

  getSelectedId(): string | null {
    return this.selectedId;
  }

  setViewFilter(mode: ElectionMapViewFilter): void {
    this.viewFilter = mode;
    this.refreshPathClasses();
  }

  reset(): void {
    this.selectedId = null;
    this.viewFilter = "all";
    this.applyChromeState();
    this.refreshPathClasses();
    this.opts.onSelect(null);
  }

  findByNameQuery(query: string): ConstituencyPathRecord[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return this.constituencies.filter((c) => {
      const name = c.name.toLowerCase();
      const dist = c.district.toLowerCase();
      return name.includes(q) || dist.includes(q) || String(c.acNo).includes(q);
    });
  }

  pickForSearch(query: string): string | null {
    const hits = this.findByNameQuery(query);
    return hits[0]?.id ?? null;
  }

  private applyChromeState(): void {
    if (!this.svg) return;
    const svg = this.svg;
    svg.classList.remove("elmap-reduced-motion");
    if (this.reduceMotion) svg.classList.add("elmap-reduced-motion");
  }

  private refreshPathClasses(): void {
    for (const [id, path] of this.pathById) {
      const c = this.constituencies.find((x) => x.id === id);
      if (!c) continue;

      path.classList.remove("is-active", "is-hover", "is-dimmed");

      if (id === this.selectedId) path.classList.add("is-active");
      if (id === this.hoveredId) path.classList.add("is-hover");

      if (this.viewFilter === "core" && c.group !== "core") {
        path.classList.add("is-dimmed");
      }
      if (this.viewFilter === "suburban" && c.group !== "suburban") {
        path.classList.add("is-dimmed");
      }
    }
  }
}
