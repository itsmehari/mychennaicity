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
    bodyIncludes: [
      "AdSense",
      "Privacy policy",
      "policies.google.com/technologies/partner-sites",
      "adssettings.google.com",
      "aboutads.info",
    ],
    bodyExcludes: ["coming soon", "Coming soon"],
  },
  {
    name: "Cookies + ads disclosure",
    url: `${SITE}/cookies`,
    expectStatus: 200,
    bodyIncludes: [
      "partner-sites",
      "adssettings.google.com",
      "aboutads.info",
    ],
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
    bodyIncludes: ['id="advertise"'],
  },
  {
    name: "Community guidelines",
    url: `${SITE}/community-guidelines`,
    expectStatus: 200,
  },
  {
    name: "Area Sabha preview noindex",
    url: `${SITE}/civic-tools/area-sabha`,
    expectStatus: 200,
    bodyIncludes: ["noindex"],
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
    bodyExcludes: ["/civic-tools/area-sabha", "/ministers/"],
  },
  {
    name: "ads.txt",
    url: `${SITE}/ads.txt`,
    expectStatus: 200,
    bodyIncludes: ["google.com, pub-5760699639501978, DIRECT, f08c47fec0942fa0"],
  },
  {
    name: "AdSense meta tag",
    url: `${SITE}/`,
    expectStatus: 200,
    bodyIncludes: [
      'name="google-adsense-account"',
      "ca-pub-5760699639501978",
    ],
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
