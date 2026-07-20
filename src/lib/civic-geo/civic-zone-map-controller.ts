import type { WardPathRecord } from "@/lib/chennai-map/types";

const SVG_NS = "http://www.w3.org/2000/svg";

const ZONE_COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#f97316",
  "#6366f1",
  "#14b8a6",
  "#a855f7",
  "#22c55e",
  "#eab308",
  "#0ea5e9",
  "#64748b",
];

export type ZoneMapControllerOptions = {
  onSelectZone: (zoneId: string | null, zoneLabel: string | null) => void;
  onSelectWard: (ward: WardPathRecord | null) => void;
};

export class CivicZoneMapController {
  private svg: SVGSVGElement | null = null;
  private layerG = new Map<string, SVGGElement>();
  private wards: WardPathRecord[] = [];
  private zoneColor = new Map<string, string>();
  private selectedZoneId: string | null = null;
  private reduceMotion = false;

  constructor(private opts: ZoneMapControllerOptions) {
    if (typeof window !== "undefined") {
      this.reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }
  }

  mount(container: HTMLElement, wards: WardPathRecord[], viewBox: string): void {
    this.destroy();
    this.wards = wards;
    const zoneIds = [...new Set(wards.map((w) => w.zoneId))];
    zoneIds.forEach((zid, i) => {
      this.zoneColor.set(zid, ZONE_COLORS[i % ZONE_COLORS.length]!);
    });

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", viewBox);
    svg.classList.add("czm-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute(
      "aria-label",
      "Interactive map of current Greater Chennai Corporation zones and wards",
    );

    const operationalLayer = document.createElementNS(SVG_NS, "g");
    operationalLayer.setAttribute("data-layer", "gcc-15");
    operationalLayer.classList.add("czm-operational-layer");

    const byZone = new Map<string, WardPathRecord[]>();
    for (const w of wards) {
      if (!byZone.has(w.zoneId)) byZone.set(w.zoneId, []);
      byZone.get(w.zoneId)!.push(w);
    }

    for (const [zoneId, list] of byZone) {
      const zg = document.createElementNS(SVG_NS, "g");
      zg.setAttribute("data-zone", zoneId);
      zg.setAttribute("data-layer", "gcc-15");
      zg.classList.add("czm-zone-layer");

      for (const w of list) {
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", w.d);
        path.setAttribute("data-zone", w.zoneId);
        path.setAttribute("data-ward", String(w.wardNo));
        path.setAttribute("role", "button");
        path.setAttribute("tabindex", "0");
        path.setAttribute(
          "aria-label",
          `Ward ${w.wardNo}, ${w.zoneLabel} zone`,
        );
        path.classList.add("czm-ward");
        const color = this.zoneColor.get(w.zoneId) ?? "#94a3b8";
        path.style.fill = color;
        path.addEventListener("click", () => {
          this.selectZone(w.zoneId);
          this.opts.onSelectWard(w);
        });
        path.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            this.selectZone(w.zoneId);
            this.opts.onSelectWard(w);
          }
        });
        zg.appendChild(path);
      }

      zg.addEventListener("click", (e) => {
        if (e.target === zg) this.selectZone(zoneId);
      });

      operationalLayer.appendChild(zg);
    }

    this.layerG.set("gcc-15", operationalLayer);
    svg.appendChild(operationalLayer);
    container.appendChild(svg);
    this.svg = svg;
  }

  selectZone(zoneId: string | null): void {
    this.selectedZoneId = zoneId;
    if (!this.svg) return;
    const paths = this.svg.querySelectorAll<SVGPathElement>(".czm-ward");
    paths.forEach((p) => {
      const z = p.getAttribute("data-zone");
      const selected = zoneId && z === zoneId;
      p.style.opacity = zoneId && !selected ? "0.35" : "1";
      p.style.strokeWidth = selected ? "0.8" : "0.3";
    });
    const ward = zoneId
      ? (this.wards.find((w) => w.zoneId === zoneId) ?? null)
      : null;
    this.opts.onSelectZone(zoneId, ward?.zoneLabel ?? null);
  }

  setLayerOpacity(layerId: string, opacity: number): void {
    const g = this.layerG.get(layerId);
    if (g) g.style.opacity = String(opacity);
  }

  setLayerVisible(layerId: string, visible: boolean): void {
    const g = this.layerG.get(layerId);
    if (g) g.style.display = visible ? "" : "none";
  }

  highlightWard(wardNo: number): void {
    if (!this.svg) return;
    const path = this.svg.querySelector<SVGPathElement>(
      `[data-ward="${wardNo}"]`,
    );
    if (!path) return;
    const zoneId = path.getAttribute("data-zone");
    this.selectZone(zoneId);
    if (!this.reduceMotion) {
      path.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }],
        { duration: 400 },
      );
    }
  }

  destroy(): void {
    this.svg?.remove();
    this.svg = null;
    this.layerG.clear();
  }
}
