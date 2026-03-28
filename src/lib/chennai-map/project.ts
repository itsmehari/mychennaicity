/**
 * Linear bbox projection: WGS84 lon/lat → SVG viewBox coordinates.
 * Suitable for single-city choropleths (not global Web Mercator).
 */

export type BBox = { minLng: number; minLat: number; maxLng: number; maxLat: number };

export type ProjectFn = (lng: number, lat: number) => [number, number];

export function computeBBoxFromCoords(allCoords: [number, number][]): BBox {
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  for (const [lng, lat] of allCoords) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return { minLng, minLat, maxLng, maxLat };
}

export function createProjector(
  bbox: BBox,
  viewWidth: number,
  viewHeight: number,
  padding = 12,
): ProjectFn {
  const pw = viewWidth - 2 * padding;
  const ph = viewHeight - 2 * padding;
  const dLng = bbox.maxLng - bbox.minLng || 1e-9;
  const dLat = bbox.maxLat - bbox.minLat || 1e-9;
  const scale = Math.min(pw / dLng, ph / dLat);
  const contentW = dLng * scale;
  const contentH = dLat * scale;
  const offX = padding + (pw - contentW) / 2;
  const offY = padding + (ph - contentH) / 2;

  return (lng: number, lat: number) => {
    const x = offX + (lng - bbox.minLng) * scale;
    const y = offY + (bbox.maxLat - lat) * scale;
    return [round4(x), round4(y)];
  };
}

function round4(n: number): number {
  return Math.round(n * 1e4) / 1e4;
}

/** Single closed ring [lng,lat][] → SVG path d (exterior only). */
export function ringToSvgPath(
  ring: [number, number][],
  project: ProjectFn,
): string {
  if (ring.length < 3) return "";
  const pts = ring.map(([lng, lat]) => project(lng, lat));
  const [fx, fy] = pts[0]!;
  const rest = pts.slice(1).map(([x, y]) => `L${x},${y}`);
  return `M${fx},${fy}${rest.join("")}Z`;
}

export function multipolygonToPaths(
  coordinates: number[][][][],
  project: ProjectFn,
): string {
  const parts: string[] = [];
  for (const polygon of coordinates) {
    const exterior = polygon[0] as [number, number][] | undefined;
    if (exterior?.length) {
      const d = ringToSvgPath(exterior, project);
      if (d) parts.push(d);
    }
  }
  return parts.join("");
}
