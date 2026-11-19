import { createSign } from "node:crypto";
import { getSiteUrl } from "@/lib/env";
import { chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";

type IndexingType = "URL_UPDATED" | "URL_DELETED";

function indexingConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_INDEXING_CLIENT_EMAIL &&
      process.env.GOOGLE_INDEXING_PRIVATE_KEY,
  );
}

async function googleAccessToken(): Promise<string | null> {
  const email = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const key = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) return null;
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString(
    "base64url",
  );
  const claim = Buffer.from(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/indexing",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  ).toString("base64url");
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const assertion = `${header}.${claim}.${signer.sign(key).toString("base64url")}`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!response.ok) {
    console.error("indexing token", response.status);
    return null;
  }
  const json = (await response.json()) as { access_token?: string };
  return json.access_token ?? null;
}

/** No-ops until the service account env is set. A 200 is not proof of indexing. */
export async function notifyJobIndexing(
  slug: string,
  type: IndexingType,
): Promise<{ skipped: boolean; status?: number }> {
  if (!indexingConfigured()) return { skipped: true };
  const token = await googleAccessToken();
  if (!token) return { skipped: true };
  const url = `${getSiteUrl()}${chennaiJobsDetailPath(slug)}`;
  const response = await fetch(
    "https://indexing.googleapis.com/v3/urlNotifications:publish",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ url, type }),
    },
  );
  if (!response.ok) {
    console.error("indexing publish", type, url, response.status);
  }
  return { skipped: false, status: response.status };
}

export async function notifyJobIndexingBatch(
  slugs: string[],
  type: IndexingType,
): Promise<void> {
  const batch = slugs.slice(0, 10);
  await Promise.race([
    Promise.all(batch.map((slug) => notifyJobIndexing(slug, type))),
    new Promise((resolve) => setTimeout(resolve, 8000)),
  ]);
}
