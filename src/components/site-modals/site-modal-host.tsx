import { listPublishedArticlesForChennai } from "@/domains/news";
import { articlesToModalPool } from "./content-pool";
import { SiteModalOrchestrator } from "./site-modal-orchestrator";

/**
 * Server mount: load curated-ish top stories into the content pool, then hydrate orchestrator.
 */
export async function SiteModalHost() {
  let pool = articlesToModalPool([]);
  try {
    const rows = await listPublishedArticlesForChennai(10);
    pool = articlesToModalPool(rows);
  } catch {
    pool = [];
  }

  return <SiteModalOrchestrator pool={pool} />;
}
