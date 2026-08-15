import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/env";

/**
 * Crawl policy for search + answer engines.
 * Explicit Allow for major AI crawlers (same paths as *) so retrieval/citation
 * is clearly permitted. Admin/API remain closed.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  const disallow = ["/admin", "/api/"] as const;

  const shared = {
    allow: "/" as const,
    disallow: [...disallow],
  };

  return {
    rules: [
      {
        userAgent: "*",
        ...shared,
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "GoogleOther",
          "Applebot-Extended",
          "Bytespider",
          "CCBot",
          "meta-externalagent",
          "FacebookBot",
        ],
        ...shared,
      },
    ],
    sitemap: [
      `${base}/sitemap.xml`,
      `${base}/news-sitemap.xml`,
      `${base}/sitemap-recent.xml`,
    ],
    host: base.replace(/^https?:\/\//, ""),
  };
}
