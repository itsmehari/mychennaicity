import { getSiteUrl } from "@/lib/env";

export const dynamic = "force-dynamic";

/** Alias — some tools look for /llm.txt instead of /llms.txt */
export async function GET() {
  return Response.redirect(`${getSiteUrl()}/llms.txt`, 308);
}
