/**
 * Production readiness checks for AdSense pre-flight.
 * Usage: npm run adsense:verify
 */
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mychennaicity.in").replace(
  /\/$/,
  "",
);

type Check = {
  name: string;
  url: string;
  expectStatus: number;
  bodyIncludes?: string[];
  bodyExcludes?: string[];
};

const CHECKS: Check[] = [
  {
    name: "Privacy policy",
    url: `${SITE}/privacy`,
    expectStatus: 200,
    bodyIncludes: ["AdSense", "Privacy policy"],
    bodyExcludes: ["coming soon", "Coming soon"],
  },
  {
    name: "Terms + disclaimer",
    url: `${SITE}/terms`,
    expectStatus: 200,
    bodyIncludes: ["Disclaimer of warranties", "Advertising"],
  },
  {
    name: "About",
    url: `${SITE}/about`,
    expectStatus: 200,
    bodyExcludes: ["coming soon", "Coming soon"],
  },
  {
    name: "Contact",
    url: `${SITE}/contact`,
    expectStatus: 200,
  },
  {
    name: "News hub",
    url: `${SITE}/chennai-local-news`,
    expectStatus: 200,
  },
  {
    name: "robots.txt",
    url: `${SITE}/robots.txt`,
    expectStatus: 200,
    bodyIncludes: ["Sitemap:"],
  },
  {
    name: "sitemap.xml",
    url: `${SITE}/sitemap.xml`,
    expectStatus: 200,
    bodyIncludes: ["<urlset"],
  },
  {
    name: "ads.txt",
    url: `${SITE}/ads.txt`,
    expectStatus: 200,
    bodyIncludes: ["google.com, pub-5760699639501978, DIRECT, f08c47fec0942fa0"],
  },
];

async function runCheck(check: Check): Promise<{ ok: boolean; detail: string }> {
  try {
    const res = await fetch(check.url, {
      redirect: "follow",
      headers: { "User-Agent": "mychennaicity-adsense-verify/1.0" },
    });
    const body = await res.text();
    if (res.status !== check.expectStatus) {
      return {
        ok: false,
        detail: `HTTP ${res.status} (expected ${check.expectStatus})`,
      };
    }
    for (const needle of check.bodyIncludes ?? []) {
      if (!body.includes(needle)) {
        return { ok: false, detail: `Missing text: ${needle}` };
      }
    }
    for (const bad of check.bodyExcludes ?? []) {
      if (body.toLowerCase().includes(bad.toLowerCase())) {
        return { ok: false, detail: `Found discouraged copy: ${bad}` };
      }
    }
    return { ok: true, detail: "OK" };
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : String(e) };
  }
}

async function main() {
  console.log(`AdSense readiness verify — ${SITE}\n`);
  let failed = 0;
  for (const check of CHECKS) {
    const { ok, detail } = await runCheck(check);
    const mark = ok ? "PASS" : "FAIL";
    console.log(`${mark}  ${check.name.padEnd(22)} ${detail}`);
    if (!ok) failed += 1;
  }
  console.log("");
  if (failed > 0) {
    console.error(
      `${failed} check(s) failed. Set ADSENSE_PUBLISHER_ID on Vercel and redeploy if ads.txt failed.`,
    );
    process.exit(1);
  }
  console.log("All checks passed.");
}

main();

export {};
