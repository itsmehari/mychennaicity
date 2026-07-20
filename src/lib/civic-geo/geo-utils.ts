import type { ChennaiMapManifest } from "@/lib/chennai-map/types";
import type { CivicWard15 } from "./types";

/** Parse SVG path `d` and return centroid in viewBox coordinates. */
export function centroidFromSvgPath(d: string): { x: number; y: number } {
  const nums = d.match(/-?\d+\.?\d*/g)?.map(Number) ?? [];
  if (nums.length < 2) return { x: 0, y: 0 };
  let sumX = 0;
  let sumY = 0;
  let count = 0;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    sumX += nums[i]!;
    sumY += nums[i + 1]!;
    count++;
  }
  if (!count) return { x: nums[0] ?? 0, y: nums[1] ?? 0 };
  return { x: sumX / count, y: sumY / count };
}

export function svgToLngLat(
  x: number,
  y: number,
  manifest: ChennaiMapManifest,
): { lng: number; lat: number } {
  const [vbW, vbH] = manifest.viewBox.split(" ").slice(2).map(Number) as [
    number,
    number,
  ];
  const padding = 14;
  const pw = vbW - 2 * padding;
  const ph = vbH - 2 * padding;
  const { bbox } = manifest;
  const dLng = bbox.maxLng - bbox.minLng || 1e-9;
  const dLat = bbox.maxLat - bbox.minLat || 1e-9;
  const scale = Math.min(pw / dLng, ph / dLat);
  const contentW = dLng * scale;
  const contentH = dLat * scale;
  const offX = padding + (pw - contentW) / 2;
  const offY = padding + (ph - contentH) / 2;
  const lng = bbox.minLng + (x - offX) / scale;
  const lat = bbox.maxLat - (y - offY) / scale;
  return { lng, lat };
}

export function lngLatToSvg(
  lng: number,
  lat: number,
  manifest: ChennaiMapManifest,
): { x: number; y: number } {
  const [vbW, vbH] = manifest.viewBox.split(" ").slice(2).map(Number) as [
    number,
    number,
  ];
  const padding = 14;
  const pw = vbW - 2 * padding;
  const ph = vbH - 2 * padding;
  const { bbox } = manifest;
  const dLng = bbox.maxLng - bbox.minLng || 1e-9;
  const dLat = bbox.maxLat - bbox.minLat || 1e-9;
  const scale = Math.min(pw / dLng, ph / dLat);
  const contentW = dLng * scale;
  const contentH = dLat * scale;
  const offX = padding + (pw - contentW) / 2;
  const offY = padding + (ph - contentH) / 2;
  const x = offX + (lng - bbox.minLng) * scale;
  const y = offY + (bbox.maxLat - lat) * scale;
  return { x, y };
}

export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function estimateTravelMinutes(distanceKm: number): {
  min: number;
  max: number;
  label: string;
} {
  const min = Math.max(5, Math.round((distanceKm / 25) * 60));
  const max = Math.max(min + 5, Math.round((distanceKm / 12) * 60));
  return { min, max, label: `${min}–${max} min (estimate)` };
}

export function findNearestWard(
  wards: CivicWard15[],
  x: number,
  y: number,
): CivicWard15 | null {
  if (!wards.length) return null;
  let best = wards[0]!;
  let bestD = Infinity;
  for (const w of wards) {
    const dx = w.centroidX - x;
    const dy = w.centroidY - y;
    const d = dx * dx + dy * dy;
    if (d < bestD) {
      bestD = d;
      best = w;
    }
  }
  return best;
}

export function findWardByNo(
  wards: CivicWard15[],
  wardNo: number,
): CivicWard15 | null {
  return wards.find((w) => w.wardNo === wardNo) ?? null;
}
