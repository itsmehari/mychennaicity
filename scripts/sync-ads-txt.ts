/**
 * Writes public/ads.txt from adsense-config (build / prebuild).
 * Static file is preferred for AdSense crawlers over a serverless route.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  adsTxtBody,
  resolveAdsensePublisherId,
} from "../src/lib/adsense-config";

const body = adsTxtBody(
  resolveAdsensePublisherId(process.env.ADSENSE_PUBLISHER_ID),
);
const out = join(process.cwd(), "public", "ads.txt");
writeFileSync(out, body, "utf8");
console.log(`Wrote ${out}`);
