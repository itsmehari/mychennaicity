import Image from "next/image";
import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import { ArticleCommunityBand } from "@/components/community/article-community-band";
import {
  GccZonesChecklist,
  GccZonesFaq,
  GccZonesFinder,
  GccZonesIssueRouter,
  GccZonesJurisdictions,
  GccZonesMapTabs,
  GccZonesProposedCharts,
  GccZonesStatusRibbon,
  GccZonesStatusWidget,
  GccZonesTimeline,
  GccZonesWorkloadRadar,
} from "@/components/news/special/chennai-corporation-zones-interactives";
import {
  CHENNAI_ZONES_H1,
  CHENNAI_ZONES_HERO_IMAGE,
  CHENNAI_ZONES_VERIFIED_ON,
  current15Zones,
  zonesFactStrip,
  zonesToc,
} from "@/content/special-articles/chennai-corporation-zones-15-vs-20";

export function ChennaiCorporationZonesArticle({
  article,
}: {
  article: PublicArticleRow;
}) {
  const published =
    article.publishedAt?.toLocaleString("en-IN", {
      dateStyle: "long",
      timeZone: "Asia/Kolkata",
    }) ?? null;

  return (
    <article className="gcc-zones-article local-article -mx-4 sm:mx-0">
      <GccZonesStatusRibbon />

      <header className="gcc-zones-hero">
        <Image
          src={CHENNAI_ZONES_HERO_IMAGE}
          alt="Greater Chennai Corporation civic administration and public works context"
          fill
          priority
          className="gcc-zones-hero__bg"
          sizes="(max-width: 768px) 100vw, 1120px"
        />
        <div className="gcc-zones-hero__overlay" aria-hidden />
        <div className="gcc-zones-hero__content">
          <p className="gcc-zones-hero__eyebrow">Greater Chennai Corporation · Civic explainer</p>
          <h1 className="gcc-zones-hero__title" data-speakable="article-title">
            {CHENNAI_ZONES_H1}
          </h1>
          {article.dek ? (
            <p className="gcc-zones-hero__deck" data-speakable="article-lead">
              {article.dek}
            </p>
          ) : null}
          <p className="gcc-zones-hero__meta">
            {published ? <>Published {published}</> : null}
            {" · "}
            Verified {CHENNAI_ZONES_VERIFIED_ON} · MyChennaiCity Editorial
          </p>
        </div>
      </header>

      <div className="gcc-zones-fact-strip" aria-label="Key zone counts">
        <div className="gcc-zones-fact-strip__inner">
          {zonesFactStrip.map((item) => (
            <span key={item} className="gcc-zones-fact-strip__item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="gcc-zones-body">
        <nav className="gcc-zones-toc" aria-label="Table of contents">
          <p className="gcc-zones-toc__title">On this page</p>
          <ol className="gcc-zones-toc__list">
            {zonesToc.map((entry) => (
              <li key={entry.id}>
                <a href={`#${entry.id}`}>{entry.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="status" className="gcc-zones-prose" aria-labelledby="status-heading">
          <h2 id="status-heading">Chennai has not yet started operating under 20 or 23 Corporation zones</h2>
          <p>
            A map showing Chennai divided into <strong>23</strong> Greater Chennai Corporation
            zones has circulated online since 2022. More recent reports say that the Tamil Nadu
            government has approved a different restructuring plan under which the city would be
            reorganised into <strong>20</strong> zones.
          </p>
          <p>
            These two maps are <strong>not</strong> the same proposal. More importantly, neither
            should presently be used as the final authority for identifying a resident’s operational
            Corporation zone.
          </p>
          <p>
            As of <strong>{CHENNAI_ZONES_VERIFIED_ON}</strong>, the Greater Chennai Corporation’s
            official ward-map portal, councillor directory, council information and zonal services
            continue to identify Chennai through <strong>15 Corporation zones and 200 wards</strong>.
            The proposed 20-zone arrangement has been approved and mapped, but public statements have
            indicated that implementation is linked to the end of the present Corporation council’s
            tenure and the next civic election cycle.
          </p>
          <GccZonesStatusWidget />
          <blockquote className="gcc-zones-callout">
            <p>
              <strong>Current advice:</strong> Continue using the official 15-zone and 200-ward
              system until a new government notification and updated GCC services formally bring the
              revised arrangement into effect.
            </p>
          </blockquote>
        </section>

        <section id="why-zones" className="gcc-zones-prose" aria-labelledby="why-zones-heading">
          <h2 id="why-zones-heading">Why Chennai residents should understand Corporation zones</h2>
          <p>
            A Corporation zone is not merely a coloured section on a map. It is one of the
            principal administrative units through which the Greater Chennai Corporation organises
            local civic services.
          </p>
          <p>
            A resident’s zone can affect which zonal office, assistant commissioner, engineering
            division, sanitation unit, public-health team, revenue office and ward committee handles
            the locality. Zone-level administration is connected with interior roads, stormwater
            drains, streetlights, solid-waste collection, public-health inspections,
            mosquito-control operations, birth and death registration, property-tax administration,
            trade licences, building-related civic processes, parks, encroachments, street-vending
            administration, disaster preparedness and ward-committee decisions.
          </p>
          <p>
            Under the Tamil Nadu Urban Local Bodies Act, wards committees may comprise multiple
            contiguous wards. Each wards committee should have a separate office within its
            territorial limits. Councillors from the included wards are members; one is elected
            chairman. GCC describes each existing zone as having a ward committee whose resolutions
            go to the Corporation Council, with meetings held at the zonal office.
          </p>
          <p>
            This is why changing a zone boundary may affect more than the name appearing beside an
            address. It can alter the civic office through which complaints, works, inspections,
            budgets and elected representation are coordinated.
          </p>
          <GccZonesIssueRouter />
        </section>

        <section id="three-maps" className="gcc-zones-prose" aria-labelledby="three-maps-heading">
          <h2 id="three-maps-heading">The three different Chennai zone maps causing confusion</h2>
          <p>
            Residents keep encountering three different maps: the operational 15-zone system, a
            2022 media proposal for 23 zones, and the 2025 approved plan for 20 zones. Mixing them
            produces wrong office referrals and viral misinformation.
          </p>
          <GccZonesMapTabs />
          <h3>1. The current 15-zone map</h3>
          <p>
            This is the operational arrangement still displayed by the Greater Chennai Corporation:
            15 zones, 200 wards or divisions, three broad administrative regions (North, Central and
            South), and one ward committee for each zone.
          </p>
          <h3>2. The 23-zone proposal reported in 2022</h3>
          <p>
            That concept would have reorganised the 15 zones into 23, with boundaries designed to
            correspond more closely with Assembly constituencies — eight zones in North Chennai,
            eight in Central and seven in South. It indicated that areas such as Old Washermenpet,
            Egmore and Mogappair could move between zonal administrations. That configuration did
            not become Chennai’s operational system.
          </p>
          <h3>3. The 20-zone restructuring announced in 2025</h3>
          <p>
            In February 2025, the Tamil Nadu government announced that GCC zones would increase from
            15 to 20, citing equitable resource allocation, better staff distribution, improved
            civic-service delivery and reduced imbalance between densely populated and less
            populated zones. The structure reportedly used projected population, electorate, tax
            assessments, roads and streets, street density and population density.
          </p>
        </section>

        <section id="find-zone" className="gcc-zones-prose" aria-labelledby="find-zone-heading">
          <h2 id="find-zone-heading">Chennai’s current official 15-zone structure</h2>
          <p>
            The numbering around Adyar and Perungudi is unusual. Zone 14 contains Wards 168 and 169
            as well as Wards 183 to 191, while Zone 13 contains Wards 170 to 182. Residents should
            therefore avoid assuming their zone only from the numerical sequence.
          </p>
          <GccZonesFinder />
          <div className="gcc-zones-table-wrap">
            <table>
              <caption>Current GCC zones and ward numbers</caption>
              <thead>
                <tr>
                  <th scope="col">Zone</th>
                  <th scope="col">Name</th>
                  <th scope="col">Wards</th>
                  <th scope="col">Region</th>
                </tr>
              </thead>
              <tbody>
                {current15Zones.map((z) => (
                  <tr key={z.number}>
                    <td>{z.number}</td>
                    <td>{z.name}</td>
                    <td>{z.wards}</td>
                    <td>{z.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The safest method is to search using the official GCC ward-map or “Know Your Zone and
            Division” service. The GCC portal itself advises users to refer to the relevant gazette
            notification if a discrepancy is found.
          </p>
        </section>

        <section id="timeline" className="gcc-zones-prose" aria-labelledby="timeline-heading">
          <h2 id="timeline-heading">How Chennai arrived at the present 15-zone structure</h2>
          <p>
            Before the major expansion associated with 2011, Chennai Corporation covered
            approximately 174 square kilometres. The government enlarged the Corporation by
            amalgamating nine municipalities, eight town panchayats and twenty-five village
            panchayats — expanding the area to approximately <strong>426 square kilometres</strong>.
          </p>
          <p>
            Newly incorporated municipalities included areas such as Thiruvottiyur, Manali,
            Madhavaram, Ambattur, Maduravoyal, Valasaravakkam, Alandur and
            Ullagaram–Puzhuthivakkam. Southern and peripheral settlements included Kottivakkam,
            Palavakkam, Neelankarai, Injambakkam, Karapakkam, Okkiyam Thuraipakkam, Madipakkam,
            Semmancheri and Uthandi. Government orders subsequently provided for 200 territorial
            divisions and 15 wards committees, which became the present zones.
          </p>
          <GccZonesTimeline />
        </section>

        <section id="uneven" className="gcc-zones-prose" aria-labelledby="uneven-heading">
          <h2 id="uneven-heading">Why the present zones are considered uneven</h2>
          <p>
            The 2011 arrangement grouped older, densely developed parts of Chennai with large
            peripheral areas that were still urbanising. Over time, zones developed very different
            administrative burdens: area versus density, taxable properties, road length,
            commercial establishments, informal settlements, flood exposure, waste-generation points
            and travel distance to the zonal office.
          </p>
          <p>
            Administrative equality is not the same as numerical equality. A workable zoning model
            must weigh population, density, geographic area, wards, properties, road length,
            commercial activity, waste burden, drainage and flood exposure, office accessibility,
            staff availability, complaints, infrastructure deficit and future growth — together.
          </p>
          <GccZonesWorkloadRadar />
        </section>

        <section id="proposed-20" className="gcc-zones-prose" aria-labelledby="proposed-20-heading">
          <h2 id="proposed-20-heading">What the 2025 proposed 20-zone data shows</h2>
          <p>
            The reported 20-zone map was based on a projected 2023 population derived from the 2011
            Census, together with administrative and property-related data. Averages are only
            mathematical reference points; individual proposed zones were not designed to be
            identical.
          </p>
          <GccZonesProposedCharts />
          <p>
            The population of the largest proposed zone was more than four times that of the least
            populated proposed zone. This illustrates that the restructuring was not based on making
            every zone numerically identical. Geography, density, properties, roads and
            administrative practicality were considered together.
          </p>
        </section>

        <section id="what-23" className="gcc-zones-prose" aria-labelledby="what-23-heading">
          <h2 id="what-23-heading">What happened to the earlier 23-zone plan?</h2>
          <p>
            The 2022 proposal sought to reorganise Chennai into 23 zones, broadly aligning civic
            zones with Assembly constituencies. Residents and councillors raised concerns about
            staffing, zonal-office locations, accessibility, disruption of familiar local
            relationships, divided roads or neighbourhoods, property-tax implications, consultation
            and utility-boundary coordination.
          </p>
          <p>
            The 23-zone concept did not become the final plan announced in 2025. The later
            government decision settled on 20 zones rather than 23. The old map remains useful as a
            record of how restructuring was being considered, but it should not be used to identify
            a current or guaranteed future zone.
          </p>
          <blockquote className="gcc-zones-callout">
            <p>
              <strong>Correct caption for the circulated 23-zone image:</strong> A 2022 proposal
              that examined reorganising Chennai into 23 Corporation zones. This is not Chennai’s
              current operational zone map and is different from the 20-zone structure announced in
              2025.
            </p>
          </blockquote>
        </section>

        <section id="operational" className="gcc-zones-prose" aria-labelledby="operational-heading">
          <h2 id="operational-heading">Is the 20-zone plan operational now?</h2>
          <p>
            The evidence available as of July 2026 supports this conclusion: the 20-zone
            restructuring is an approved policy plan, but Chennai’s public-facing Corporation
            administration continues to function through the existing 15-zone structure.
          </p>
          <p>
            In April 2025, Mayor R. Priya said implementation would take place after the present
            Corporation council’s tenure, with the change linked to 2027. In May 2026, when asked
            when the 15-to-20-zone change would occur, the GCC Commissioner stated that increasing
            the number of zones was a policy decision of the government.
          </p>
          <ul>
            <li>GCC’s official ward-map selector still lists 15 zones.</li>
            <li>GCC’s council page describes 15 zones and one ward committee per zone.</li>
            <li>
              Current zonal contacts and councillor directories remain organised under Zones 1 to
              15.
            </li>
            <li>
              A May 2026 waste-management implementation report said zonal officials in all 15
              zones would assist bulk-waste generators.
            </li>
          </ul>
          <p>
            A Corporation zone is also a wards committee. The law links committee terms to the
            council term and generally expects territorial limits not to be altered before a
            committee’s term expires. Implementation therefore needs notification, office
            identification, staff redeployment, software reconfiguration, complaint-routing updates,
            budget and contract changes — more than renaming areas on a map.
          </p>
        </section>

        <section id="what-changes" className="gcc-zones-prose" aria-labelledby="what-changes-heading">
          <h2 id="what-changes-heading">What may change — and what will not</h2>
          <p>
            Under a new zone system, a ward may be assigned to a different zonal office; assistant
            commissioners, engineers, sanitation and public-health teams may be redistributed;
            complaint routing, sanitation contracts, road and streetlight files, licence desks and
            ward-committee composition may shift. Accessibility of the new office matters —
            especially for senior citizens, traders without private transport and flood-prone
            neighbourhoods such as those raised in Manali debates around Kosasthalaiyar and Puzhal
            surplus water.
          </p>
          <p>
            A change in zone does <strong>not</strong> by itself prove that property tax will rise.
            Tax depends on land area, built-up area, use, location, street classification and
            notified rules — not merely a new zone number.
          </p>
          <p>
            A Corporation-zone change also does not automatically rewrite PIN code, police-station
            jurisdiction, Assembly or parliamentary seats, revenue taluk, CMDA classification, Metro
            Water operational area, electricity section, school district or PDS shop.
          </p>
          <GccZonesJurisdictions />
        </section>

        <section id="checklist" className="gcc-zones-prose" aria-labelledby="checklist-heading">
          <h2 id="checklist-heading">A practical resident checklist</h2>
          <p>
            Before implementation: stay on the 15-zone system, ignore undated viral maps, save tax
            and licence records, note complaint numbers, and follow gazette or GCC notices. When
            implementation is notified: check whether only the zone changed or the ward also
            changed, confirm the new zonal office, councillor and wards-committee structure, and
            recheck portals before submitting physical documents.
          </p>
          <GccZonesChecklist />
          <h3>Why you may also see reports referring to 22 zones</h3>
          <p>
            Separate reports during boundary-delimitation discussions referred to a broader Greater
            Chennai expansion involving adjoining areas and as many as 22 zones. Those should not be
            mixed with the existing 15-zone structure or the separately announced 20-zone
            reorganisation. The city faces three distinct questions: how to divide existing GCC
            area; whether to merge surrounding local bodies; and how to redraw wards after any
            expansion. MyChennaiCity tools should therefore use version-controlled datasets rather
            than one permanent hard-coded map.
          </p>
        </section>

        <section id="faq" className="gcc-zones-prose" aria-labelledby="faq-heading">
          <h2 id="faq-heading">Frequently asked questions</h2>
          <GccZonesFaq />
        </section>

        <section id="conclusion" className="gcc-zones-prose" aria-labelledby="conclusion-heading">
          <h2 id="conclusion-heading">Conclusion: use the current 15-zone map, but prepare for change</h2>
          <p>
            The map that prompted much of the online confusion is an important piece of Chennai’s
            civic-administration debate — but it is not Chennai’s current zone map. The proposal
            later evolved from 23 zones to an approved 20-zone plan. As of July 2026, official
            public systems still run through 15 zones and 200 wards.
          </p>
          <blockquote className="gcc-zones-callout gcc-zones-callout--strong">
            <p>
              Use the current GCC zone and ward for all official work. Treat the 20-zone map as a
              future administrative plan. Treat the 23-zone image as a historical proposal. Verify
              every change through a government notification and the updated GCC portal.
            </p>
          </blockquote>
          <p>
            A better map is useful. A better functioning local government — with accessible offices,
            adequate staff, transparent data and a clear transition process — is the real objective.
          </p>
          <p className="gcc-zones-verified">
            Information verified against available official and reported sources as of{" "}
            {CHENNAI_ZONES_VERIFIED_ON}.
          </p>
          <p className="gcc-zones-related">
            Related:{" "}
            <Link href="/chennai-local-news/chennai-bulk-waste-generators-swm-rules-2026-registration-deadline">
              Bulk waste generator registration (all 15 zones)
            </Link>
            {" · "}
            <Link href="/chennai-local-news/topic/chennai">Chennai topic hub</Link>
            {" · "}
            <Link href="/areas/omr-perungudi-sholinganallur">OMR / Perungudi / Sholinganallur</Link>
          </p>
        </section>
      </div>

      <ArticleCommunityBand />
    </article>
  );
}
