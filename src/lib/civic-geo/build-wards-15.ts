import type { WardPathRecord } from "@/lib/chennai-map/types";
import type { ChennaiMapManifest } from "@/lib/chennai-map/types";
import { centroidFromSvgPath, svgToLngLat } from "./geo-utils";
import type { CivicWard15 } from "./types";

export function buildWards15FromMap(
  wards: WardPathRecord[],
  manifest: ChennaiMapManifest,
): CivicWard15[] {
  return wards.filter((w) => w.wardNo > 0).map((w) => {
    const { x, y } = centroidFromSvgPath(w.d);
    const { lng, lat } = svgToLngLat(x, y, manifest);
    return {
      wardId: w.id,
      wardNo: w.wardNo,
      zoneId: w.zoneId,
      zoneLabel: w.zoneLabel,
      localityId: w.localityId,
      centroidX: x,
      centroidY: y,
      centroidLng: lng,
      centroidLat: lat,
    };
  });
}
