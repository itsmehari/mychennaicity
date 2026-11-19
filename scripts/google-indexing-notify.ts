import { config as loadEnv } from "dotenv";
import { notifyJobIndexing } from "../src/lib/jobs/google-indexing";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env.production.local" });

const type = process.argv[2];
const slugOrUrl = process.argv[3];

function slugFromArg(value: string): string {
  const marker = "/chennai-jobs/";
  const index = value.indexOf(marker);
  return index === -1 ? value : value.slice(index + marker.length);
}

async function main() {
  if ((type !== "URL_UPDATED" && type !== "URL_DELETED") || !slugOrUrl) {
    console.error(
      "Usage: tsx scripts/google-indexing-notify.ts URL_UPDATED|URL_DELETED <slug-or-url>",
    );
    process.exit(1);
  }
  const result = await notifyJobIndexing(slugFromArg(slugOrUrl), type);
  console.log(result);
  if (result.skipped) {
    console.error(
      "Skipped. Set GOOGLE_INDEXING_CLIENT_EMAIL and GOOGLE_INDEXING_PRIVATE_KEY.",
    );
    process.exit(2);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
