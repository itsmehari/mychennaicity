import Image from "next/image";
import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import { ArticleCommunityBand } from "@/components/community/article-community-band";
import {
  accountabilityNodes,
  ammoniaLeakFactStrip,
  ammoniaLeakTimeline,
  ammoniaLeakToc,
  ammoniaRefrigerationFlow,
  campusZones,
  complianceCards,
  immediateActions,
  investigationTiles,
  officialChecklist,
  regionalRiskLocations,
  TIRUVALLUR_AMMONIA_LEAK_H1,
  TIRUVALLUR_AMMONIA_LEAK_HERO_IMAGE,
  TIRUVALLUR_AMMONIA_LEAK_SOURCE_URL,
  TIRUVALLUR_AMMONIA_LEAK_SOURCE_URL_DAY_ONE,
  ammoniaLeakLatestUpdate,
} from "@/content/special-articles/tiruvallur-ammonia-leak-2026";

function LocationMapSvg() {
  return (
    <svg
      viewBox="0 0 400 280"
      className="ammonia-leak-map-card__svg"
      aria-label="Map showing Kannigaipair near Periyapalayam in Tiruvallur district, north of Chennai"
      role="img"
    >
      <rect width="400" height="280" fill="#e2e8f0" rx="8" />
      <text x="200" y="24" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
        NORTH CHENNAI / TIRUVALLUR
      </text>
      <ellipse cx="280" cy="210" rx="70" ry="45" fill="#cbd5e1" opacity="0.6" />
      <text x="280" y="215" textAnchor="middle" fontSize="12" fill="#334155" fontWeight="700">
        Chennai
      </text>
      <ellipse cx="160" cy="100" rx="55" ry="40" fill="#94a3b8" opacity="0.5" />
      <text x="160" y="95" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="600">
        Tiruvallur
      </text>
      <circle cx="200" cy="75" r="6" fill="#b91c1c" />
      <text x="200" y="62" textAnchor="middle" fontSize="10" fill="#b91c1c" fontWeight="700">
        Periyapalayam
      </text>
      <circle cx="215" cy="68" r="4" fill="#dc2626" />
      <text x="230" y="72" fontSize="9" fill="#b91c1c" fontWeight="600">
        Kannigaipair
      </text>
      <line x1="215" y1="72" x2="260" y2="180" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="240" y="130" fontSize="9" fill="#64748b" transform="rotate(55 240 130)">
        ~45 km N of Chennai
      </text>
      <path d="M 120 180 L 340 180" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="#475569" />
        </marker>
      </defs>
    </svg>
  );
}

function AccountabilityMapSvg() {
  const center = { x: 200, y: 140 };
  const radius = 110;
  const nodes = accountabilityNodes.map((node, i) => {
    const angle = (i / accountabilityNodes.length) * 2 * Math.PI - Math.PI / 2;
    return {
      ...node,
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    };
  });

  return (
    <svg
      viewBox="0 0 400 320"
      className="ammonia-leak-accountability__svg"
      aria-label="Accountability map showing shared responsibility among industrial safety, fire, pollution, labour, and disaster management authorities"
      role="img"
    >
      {nodes.map((node) => (
        <line
          key={`line-${node.id}`}
          x1={center.x}
          y1={center.y}
          x2={node.x}
          y2={node.y}
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />
      ))}
      <circle cx={center.x} cy={center.y} r="42" fill="#0f1729" />
      <text x={center.x} y={center.y - 8} textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600">
        Ammonia-based
      </text>
      <text x={center.x} y={center.y + 6} textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600">
        seafood / cold-storage
      </text>
      <text x={center.x} y={center.y + 20} textAnchor="middle" fontSize="8" fill="#fff">
        unit
      </text>
      {nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.x - 38}
            y={node.y - 14}
            width="76"
            height="28"
            rx="4"
            fill="#fff"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="9" fill="#1a2332" fontWeight="600">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function RegionalRiskMapSvg() {
  return (
    <svg
      viewBox="0 0 400 260"
      className="ammonia-leak-map-card__svg"
      aria-label="Regional map of North Chennai and Tiruvallur industrial belt showing Ennore, Manali, Gummidipoondi, Periyapalayam, Tiruvallur, and Chennai"
      role="img"
    >
      <rect width="400" height="260" fill="#e2e8f0" rx="8" />
      <text x="200" y="22" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">
        NORTH CHENNAI &amp; TIRUVALLUR INDUSTRIAL BELT
      </text>
      {regionalRiskLocations.map((loc) => (
        <g key={loc.id}>
          <circle
            cx={loc.x * 4}
            cy={loc.y * 2.8}
            r={loc.id === "periyapalayam" ? 7 : 5}
            fill={loc.id === "periyapalayam" ? "#b91c1c" : "#64748b"}
            opacity={loc.id === "periyapalayam" ? 1 : 0.7}
          />
          <text
            x={loc.x * 4}
            y={loc.y * 2.8 - 12}
            textAnchor="middle"
            fontSize="9"
            fill="#334155"
            fontWeight={loc.id === "periyapalayam" ? "700" : "500"}
          >
            {loc.label}
          </text>
        </g>
      ))}
      <rect x="20" y="220" width="360" height="30" rx="4" fill="#f1f5f9" stroke="#cbd5e1" />
      <text x="200" y="240" textAnchor="middle" fontSize="9" fill="#64748b">
        Context graphic — not an accusation map
      </text>
    </svg>
  );
}

export function TiruvallurAmmoniaLeak2026Article({
  article,
}: {
  article: PublicArticleRow;
}) {
  const published =
    article.publishedAt?.toLocaleString("en-IN", {
      dateStyle: "long",
      timeZone: "Asia/Kolkata",
    }) ?? null;
  const updated =
    article.updatedAt.toLocaleString("en-IN", {
      dateStyle: "long",
      timeZone: "Asia/Kolkata",
    }) ?? null;

  return (
    <article className="ammonia-leak-article local-article -mx-4 sm:mx-0">
      <header className="ammonia-leak-hero">
        <Image
          src={TIRUVALLUR_AMMONIA_LEAK_HERO_IMAGE}
          alt="Scene at the seafood processing unit in Kannigaipair, Tiruvallur, following the ammonia gas leak on 21 June 2026."
          fill
          priority
          className="ammonia-leak-hero__bg"
          sizes="(max-width: 768px) 100vw, 1120px"
        />
        <div className="ammonia-leak-hero__overlay" aria-hidden />
        <div className="ammonia-leak-hero__content">
          <p className="ammonia-leak-hero__alert">Industrial Safety Alert</p>
          <h1 className="ammonia-leak-hero__title" data-speakable="article-title">
            {TIRUVALLUR_AMMONIA_LEAK_H1}
          </h1>
          {article.dek ? (
            <p className="ammonia-leak-hero__deck" data-speakable="article-lead">
              {article.dek}
            </p>
          ) : null}
          <p className="ammonia-leak-hero__meta">
            {published ? <>Published {published}</> : null}
            {published && updated ? " · " : null}
            {updated ? <>Updated {updated}</> : null}
            {" · "}
            Chennai / Tiruvallur · MyChennaiCity Editorial
          </p>
        </div>
      </header>

      <div className="ammonia-leak-fact-strip" aria-label="Incident facts">
        <div className="ammonia-leak-fact-strip__inner">
          {ammoniaLeakFactStrip.map((item) => (
            <span key={item} className="ammonia-leak-fact-strip__item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="ammonia-leak-body">
        <nav className="ammonia-leak-toc" aria-label="Table of contents">
          <p className="ammonia-leak-toc__title">On this page</p>
          <ol className="ammonia-leak-toc__list">
            {ammoniaLeakToc.map((entry) => (
              <li key={entry.id}>
                <a href={`#${entry.id}`}>{entry.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <section
          id="latest-update"
          className="ammonia-leak-update"
          aria-labelledby="latest-update-heading"
        >
          <p className="ammonia-leak-update__label">Latest update</p>
          <h2 id="latest-update-heading" className="ammonia-leak-update__title">
            {ammoniaLeakLatestUpdate.dateLabel}
          </h2>
          <ul className="ammonia-leak-update__list">
            {ammoniaLeakLatestUpdate.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="ammonia-leak-update__correction">
            {ammoniaLeakLatestUpdate.correctionNote}
          </p>
        </section>

        <div className="ammonia-leak-prose">
          <p>
            <strong>Chennai / Tiruvallur, June 21–22, 2026:</strong> A major industrial
            safety tragedy near Chennai has raised urgent questions about hazardous
            chemical handling, worker accommodation inside factory premises and the
            depth of regulatory inspection in food-processing and cold-storage
            industries. An ammonia gas leak at a private seafood export unit in
            Kannigaipair near Periyapalayam in Tiruvallur district on Sunday left{" "}
            <strong>five women workers dead</strong> and{" "}
            <strong>67 others under treatment</strong> as of Monday morning, according
            to a state health bulletin.
          </p>
          <p>
            The unit has been identified as{" "}
            <strong>St Peter &amp; Paul Sea Foods Exports Private Limited</strong>, a
            seafood processing and export facility in the Kannigaipair/Manjangaranai
            area near Periyapalayam. The leak occurred around 11 am on Sunday while
            many migrant workers were off duty and resting in hostel rooms about 50
            metres from the unit&apos;s ammonia plant.
          </p>
          <p>
            Most affected workers are young women from Odisha, Jharkhand, Assam and
            West Bengal. The National Disaster Response Force said the gas spread to
            worker accommodation. About 130 workers who were not affected were shifted
            to the Govinda Bhavanam marriage hall in Kannigaipair, where food and
            drinking water were arranged.
          </p>

          <h2 id="what-happened">What Happened at the Facility</h2>
        </div>

        <div className="ammonia-leak-incident-grid">
          <div className="ammonia-leak-timeline" aria-label="Incident timeline">
            {ammoniaLeakTimeline.map((step) => (
              <div key={step.id} className="ammonia-leak-timeline__card">
                <p className="ammonia-leak-timeline__label">{step.label}</p>
                <p className="ammonia-leak-timeline__detail">{step.detail}</p>
              </div>
            ))}
          </div>
          <div className="ammonia-leak-map-card">
            <p className="ammonia-leak-map-card__title">Location</p>
            <LocationMapSvg />
            <p className="ammonia-leak-map-card__caption">
              Kannigaipair is near Periyapalayam in Tiruvallur district, north of
              Chennai city. The seafood export unit operates in this industrial
              corridor.
            </p>
          </div>
        </div>

        <div className="ammonia-leak-prose">
          <p>
            The ammonia gas leak was reported from the seafood processing section of
            the plant. Workers exposed to the gas complained of breathlessness, eye and
            respiratory tract irritation, coughing, chest discomfort, and varying
            degrees of respiratory distress. The affected workers were rushed to nearby
            government and private hospitals for emergency care.
          </p>
          <p>
            Health Minister K. G. Arunraj said experts recorded ammonia levels of around{" "}
            <strong>300 ppm</strong> in the air at the plant. Police personnel from
            Periyapalayam, Fire and Rescue Services, revenue officials and health
            department teams reached the spot and carried out rescue operations.
          </p>
          <p>
            Following a request from the district administration, the National Disaster
            Response Force deployed a specialised{" "}
            <strong>
              Chemical, Biological, Radiological and Nuclear response team
            </strong>
            . NDRF officials said the gas had spread to workers&apos; accommodation,
            causing breathing difficulties. Periyapalayam police registered a case
            under Sections 105 and 125(a) of the Bharatiya Nyaya Sanhita. Unit owners
            Mohan and Joseph were detained for inquiry.
          </p>
          <p>
            Chief Minister <strong>C. Joseph Vijay</strong> formed a{" "}
            <strong>three-member committee</strong> to probe the incident and directed
            that a detailed inquiry be completed within three days. The government
            announced ₹2 lakh compensation for each bereaved family, pledged to bear
            the cost of transporting bodies to native states, and said PF and ESI
            benefits would be released immediately. The exact mechanical cause of the
            leak has not yet been officially confirmed.
          </p>

          <h2 id="why-ammonia">Why Ammonia Is Used in Seafood Processing Units</h2>
          <p>
            Large seafood processing units require heavy cooling capacity. Fish, shrimp
            and other marine products must be chilled, frozen and stored at controlled
            temperatures before export. For this reason, many large seafood, meat, dairy,
            cold-storage and frozen-food facilities use ammonia-based refrigeration
            systems.
          </p>
          <p>
            Ammonia is efficient for industrial-scale refrigeration. It can absorb heat
            quickly and is widely used in blast freezers, plate freezers, cold rooms and
            large chilling systems. However, this efficiency comes with serious safety
            responsibility. Ammonia is toxic and corrosive when released into occupied
            spaces. It can affect the lungs, throat, eyes and skin. In a closed factory
            or worker accommodation zone, a leak can quickly become life-threatening if
            warning systems, ventilation, isolation valves and evacuation procedures
            fail or are delayed.
          </p>
          <p>
            In this case, the gas did not come from seafood decay. It was most likely
            connected to the industrial refrigeration infrastructure used in the processing
            unit. The exact point of failure — whether a pipe, valve, compressor room,
            cylinder, pressure system, electrical system or maintenance lapse — is still
            a matter for official investigation.
          </p>
        </div>

        <div className="ammonia-leak-explainer" aria-label="How ammonia refrigeration works in a seafood plant">
          <p className="ammonia-leak-explainer__title">
            How ammonia refrigeration works in a seafood plant
          </p>
          <div className="ammonia-leak-explainer__flow">
            {ammoniaRefrigerationFlow.map((node, i) => (
              <span key={node.id} style={{ display: "contents" }}>
                {i > 0 ? (
                  <span className="ammonia-leak-explainer__arrow" aria-hidden>
                    →
                  </span>
                ) : null}
                <span
                  className={`ammonia-leak-explainer__node${node.danger ? " ammonia-leak-explainer__node--danger" : ""}`}
                >
                  {node.label}
                </span>
              </span>
            ))}
          </div>
          <p className="ammonia-leak-explainer__legend">
            Red-outlined nodes mark common danger points: valves, pipelines, compressor
            room, storage receiver, and closed rooms.
          </p>
        </div>

        <div className="ammonia-leak-prose">
          <h2 id="worker-accommodation">
            Worker Accommodation Inside Industrial Premises: A Serious Safety Question
          </h2>
          <p>
            One of the most worrying aspects of this tragedy is the reported presence of
            worker accommodation inside the factory premises. Many export units and
            food-processing facilities employ migrant workers from other states. Providing
            accommodation is common in labour-intensive industries. But housing workers
            inside or close to hazardous machinery, refrigeration rooms, chemical storage
            areas or high-pressure pipelines creates a serious risk if safety zoning is
            weak.
          </p>
          <p>
            Worker accommodation must not become a silent extension of the factory floor.
            Sleeping areas, kitchens, dining spaces, toilets and rest areas must be
            clearly separated from hazardous process zones. Accommodation blocks must
            have independent exits, ventilation, alarms and evacuation paths. If workers
            are housed inside a campus where ammonia, boilers, chemicals, pressure
            vessels or heavy refrigeration systems are present, emergency planning must
            consider night-time and holiday exposure, not only working-hour exposure.
          </p>
          <p>
            The incident happened while workers were off duty on Sunday, not during
            active processing shifts. This makes the safety concern sharper. A worker
            may not be operating machinery, but if accommodation sits within roughly 50
            metres of an ammonia plant, the worker remains exposed to industrial hazards
            even while resting.
          </p>
        </div>

        <aside className="ammonia-leak-safety-box" aria-label="Safety question">
          <p className="ammonia-leak-safety-box__title">Safety Question</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--al-slate)]">
            Should worker dormitories be located within the same risk envelope as ammonia
            refrigeration systems, cold-storage zones, and processing machinery?
          </p>
          <div className="ammonia-leak-zoning" aria-label="Campus zoning diagram">
            {campusZones.map((zone) => (
              <div
                key={zone.id}
                className={`ammonia-leak-zoning__zone ammonia-leak-zoning__zone--${zone.risk}`}
              >
                {zone.label}
              </div>
            ))}
          </div>
        </aside>

        <div className="ammonia-leak-prose">
          <h2 id="compliance-norms">Compliance Norms Companies Must Follow</h2>
          <p>
            This incident should trigger a detailed safety audit of seafood processing
            units, shrimp processing units, cold-storage facilities, ice plants, dairy
            units, meat-processing units and logistics warehouses using ammonia-based
            refrigeration systems across Chennai, Tiruvallur, Ennore, Gummidipoondi, Red
            Hills, Minjur and nearby industrial belts.
          </p>
          <p>
            Companies handling ammonia and other hazardous substances must maintain valid
            factory licences, pressure-vessel certifications, refrigeration-system
            inspection records, compressor maintenance logs, leak-detection alarms,
            emergency ventilation systems, automatic shut-off systems, safety valves,
            electrical safety approvals, fire safety clearance, worker training records,
            safety data sheets, emergency response plans, mock-drill records and
            evacuation protocols. They must also ensure that trained operators are
            available, personal protective equipment is accessible, ammonia detectors are
            functional, and alarms are audible in work areas as well as accommodation
            areas.
          </p>
          <p>
            Where workers are housed within factory premises, officials must verify
            whether accommodation areas are safely separated from machinery rooms,
            ammonia pipelines, cylinders, compressors, receivers and cold-storage systems.
            Compliance cannot be reduced to documents filed in an office. It must be
            verified through physical inspection, live testing of alarms, checking of
            ventilation systems, review of maintenance records and surprise emergency
            drills.
          </p>
        </div>

        <div className="ammonia-leak-compliance-grid" aria-label="Compliance checklist cards">
          {complianceCards.map((card) => (
            <div key={card.id} className="ammonia-leak-compliance-card">
              <p className="ammonia-leak-compliance-card__title">{card.title}</p>
              <ul className="ammonia-leak-compliance-card__list">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="ammonia-leak-warning-note">
          Paper compliance is not safety compliance.
        </p>

        <div className="ammonia-leak-prose">
          <h2 id="officials-scrutiny">Officials Who Must Scrutinise High-Risk Facilities</h2>
          <p>
            A tragedy of this nature cannot be treated as the responsibility of only one
            department. Ammonia refrigeration sits at the intersection of industrial
            safety, labour welfare, fire safety, pollution control, disaster management
            and local governance.
          </p>
          <p>
            The <strong>Directorate of Industrial Safety and Health</strong> must
            examine factory licensing, hazardous process handling, safety systems,
            pressure equipment and worker safety practices.{" "}
            <strong>Fire and Rescue Services</strong> must verify emergency access, gas
            leak response readiness, evacuation routes, alarm systems and fire-safety
            infrastructure. <strong>Tamil Nadu Pollution Control Board</strong> must
            examine hazardous chemical handling, environmental risk, emergency response
            preparedness and whether the facility&apos;s operations create off-site risk.{" "}
            <strong>District administration and disaster management authorities</strong>{" "}
            must ensure that chemical emergency planning covers nearby communities,
            worker housing and transport routes. <strong>Labour officials</strong> must
            examine worker accommodation, migrant worker registration, welfare facilities
            and whether workers were properly trained on emergency response.{" "}
            <strong>Local bodies</strong> must check building safety, drainage, access
            roads and occupancy conditions.
          </p>
          <p>
            Export-linked regulators and food safety authorities must also ensure that
            export-oriented production does not ignore basic occupational safety. A
            facility may meet product quality standards for international markets, but
            that does not automatically mean it is safe for the workers who process those
            products.
          </p>
          <p>
            On Monday, Labour Minister <strong>J. Mohamed Farvas</strong> told the Tamil
            Nadu Legislative Assembly that the government would immediately constitute a
            committee to inspect hazardous industries across the State. He said reports
            from DISH, the Public Health Department and TNPCB had been sought within 24
            hours.
          </p>
        </div>

        <div className="ammonia-leak-accountability">
          <p className="ammonia-leak-accountability__title">Accountability Map</p>
          <AccountabilityMapSvg />
        </div>

        <div className="ammonia-leak-prose">
          <h2 id="investigation">What Investigators Must Establish</h2>
          <p>
            The official inquiry must go beyond identifying the immediate leak point. It
            must establish whether the ammonia refrigeration system was properly
            designed, maintained and inspected. Investigators must examine whether the
            machinery room had functional gas detectors, whether alarms triggered in
            time, whether emergency ventilation worked, whether pressure relief systems
            were maintained, whether workers knew evacuation procedures, whether emergency
            exits were clear, and whether trained personnel were available when the leak
            happened.
          </p>
          <p>
            The probe must also check whether earlier warning signs were ignored. Ammonia
            leaks are often preceded by odour complaints, valve issues, vibration,
            corrosion, pressure changes, compressor faults, poor insulation, faulty
            sensors or maintenance delays. Every maintenance log, inspection report,
            breakdown record, repair invoice and safety audit report must be examined.
          </p>
          <p>
            The key question is not only &ldquo;where did the gas leak from?&rdquo; The
            larger question is: &ldquo;why did the safety layers fail to prevent
            deaths?&rdquo;
          </p>
        </div>

        <section className="ammonia-leak-investigation" aria-labelledby="investigation-tracker-heading">
          <h3 id="investigation-tracker-heading" className="ammonia-leak-investigation__title">
            Investigation Tracker
          </h3>
          <div className="ammonia-leak-investigation__grid">
            {investigationTiles.map((tile) => (
              <div key={tile.id} className="ammonia-leak-investigation__tile">
                <p className="ammonia-leak-investigation__tile-label">{tile.label}</p>
                <p className="ammonia-leak-investigation__tile-status">
                  Awaiting official confirmation
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="ammonia-leak-prose">
          <h2 id="regional-pattern">Pattern of Industrial Safety Risks Around Chennai</h2>
          <p>
            Chennai and its surrounding industrial districts have multiple high-risk
            zones: Ennore, Manali, Gummidipoondi, Tiruvallur, Sriperumbudur, Oragadam,
            Red Hills, Minjur and the port-linked logistics corridor. These regions
            contain chemical units, warehouses, food-processing facilities, cold chains,
            oil and gas infrastructure, fertiliser-linked operations and manufacturing
            units.
          </p>
          <p>
            In recent years, ammonia leaks and industrial accidents have repeatedly shown
            that Chennai&apos;s growth as an industrial and logistics hub must be matched
            by stronger safety governance. The Ennore ammonia leak in 2023 caused public
            concern after residents reported breathing difficulty and eye irritation. The
            present Tiruvallur incident is different in location and industry, but it
            raises the same public question: are hazardous substances being handled with
            sufficient transparency, inspection and emergency preparedness?
          </p>
          <p>
            For a fast-growing metro region, industrial safety cannot remain hidden
            behind compound walls. Nearby residents, workers, transporters, local bodies
            and emergency responders must know what risks exist and how response systems
            are activated.
          </p>
        </div>

        <div className="ammonia-leak-regional-map">
          <RegionalRiskMapSvg />
          <p className="ammonia-leak-regional-map__caption">
            Industrial safety risks require coordinated regional monitoring.
          </p>
        </div>

        <div className="ammonia-leak-prose">
          <h2 id="human-cost">The Human Cost Behind Export Supply Chains</h2>
          <p>
            Seafood exports depend heavily on manual processing, cleaning, sorting, packing
            and freezing work. Many workers in these units are migrants who live far from
            their home states and depend on factory-linked accommodation. Their safety
            depends on systems they may not fully understand and emergency instructions
            that may not be given in their own language.
          </p>
          <p>
            Worker safety training must be multilingual. Emergency alarms must be visual
            as well as audible. Evacuation routes must be repeatedly demonstrated. Workers
            must know where to run, whom to call, what not to touch and how to respond to
            gas exposure. A safety briefing given only once at joining is not enough.
          </p>
          <p>
            Companies that export to global markets must adopt global-grade worker
            protection. International buyers, auditors and regulators must also examine
            whether supply chains are safe not only for product quality, but also for the
            people working behind the product.
          </p>
        </div>

        <blockquote className="ammonia-leak-pull-quote">
          &ldquo;Export quality cannot be built on unsafe worker housing.&rdquo;
        </blockquote>

        <div className="ammonia-leak-human-illustration" aria-label="Illustration representing migrant worker safety">
          <div className="ammonia-leak-human-illustration__icons" aria-hidden>
            <span title="Migrant workers">👷</span>
            <span title="Factory dormitory">🏭</span>
            <span title="Emergency exit">🚪</span>
          </div>
          <p className="ammonia-leak-human-illustration__caption">
            Worker safety training, multilingual evacuation signage, and separated
            accommodation are essential in export-linked food processing units.
          </p>
        </div>

        <div className="ammonia-leak-prose">
          <h2 id="immediate-actions">What Must Change Immediately</h2>
          <p>
            The Tiruvallur tragedy should result in immediate inspection of all
            ammonia-based refrigeration facilities in the region. Authorities must
            prioritise units where workers are housed inside the campus, where
            refrigeration systems are old, where maintenance is outsourced without
            accountability, or where emergency drills are not regularly conducted.
          </p>
          <p>
            Every such facility must be asked to demonstrate working ammonia detectors,
            emergency ventilation, shut-off systems, pressure relief valves, alarm
            audibility, PPE availability, emergency exits, safe assembly areas and
            multilingual evacuation training. Worker accommodation should be reviewed as a
            separate safety category. No worker should be housed in a zone where a gas
            leak from a machinery room can reach sleeping quarters without warning.
          </p>
          <p>
            Industrial safety inspections should not be announced ceremonial visits. They
            must include document checks, physical checks, functional testing, worker
            interviews and night-time emergency readiness evaluation.
          </p>
        </div>

        <div className="ammonia-leak-actions" aria-label="10 immediate actions">
          {immediateActions.map((action, i) => (
            <div key={action} className="ammonia-leak-actions__card">
              <span className="ammonia-leak-actions__num">{i + 1}</span>
              <p className="ammonia-leak-actions__text">{action}</p>
            </div>
          ))}
        </div>

        <section
          id="editorial-view"
          className="ammonia-leak-editorial"
          aria-labelledby="editorial-view-heading"
        >
          <p id="editorial-view-heading" className="ammonia-leak-editorial__title">
            Editorial View: Inspection Before Disaster, Not After Death
          </p>
          <div className="ammonia-leak-editorial__prose">
            <p>
              This tragedy is not only about one factory or one refrigeration system. It
              is about the way industrial safety is inspected, documented and enforced.
              Ammonia refrigeration is not new technology. Its risks are known. Its safety
              systems are known. The need for trained operators, leak detection,
              ventilation, emergency shutdown and evacuation planning is also known. When
              deaths occur, the failure is rarely a mystery; it is usually a chain of
              missed safeguards.
            </p>
            <p>
              Chennai&apos;s industrial expansion must not treat worker safety as a
              secondary cost. Export units, cold chains, warehouses and processing plants
              are important to the economy. But economic activity cannot be allowed to
              proceed with weak safety separation, poor emergency planning or paper-only
              compliance.
            </p>
            <p className="ammonia-leak-editorial__emphasis">
              The lesson from Kannigaipair must be direct: hazardous industrial systems
              require real inspection, real maintenance, real drills and real
              accountability. Safety must be verified before an accident, not written
              about after lives are lost.
            </p>
          </div>
        </section>

        <div className="ammonia-leak-print-checklist" id="compliance-checklist">
          <span className="ammonia-leak-print-checklist__tag">For Public Safety Review</span>
          <p className="ammonia-leak-print-checklist__title">
            Suggested Compliance Checklist for Officials
          </p>
          <p className="mt-2 text-sm text-[var(--al-muted)]">
            Officials inspecting ammonia-based refrigeration facilities should verify:
          </p>
          <div className="ammonia-leak-print-checklist__grid">
            {officialChecklist.map((item, i) => (
              <div key={item} className="ammonia-leak-print-checklist__item">
                {i + 1}. {item}
              </div>
            ))}
          </div>
        </div>

        <div className="ammonia-leak-prose" id="conclusion">
          <h2>Conclusion</h2>
          <p>
            The Kannigaipair ammonia leak has exposed a dangerous gap between industrial
            operations and worker safety. Five workers have lost their lives, and dozens
            of others remain under treatment after exposure to a toxic gas. The official
            investigation must determine the exact cause, but the broader safety lesson
            is already clear.
          </p>
          <p>
            Every ammonia-based facility in Chennai and surrounding districts must now be
            reviewed. Companies must prove that safety systems work. Officials must
            inspect beyond paperwork. Worker accommodation must be treated as a high-risk
            safety issue when located inside industrial campuses.
          </p>
          <p>
            The purpose of regulation is not to react after death. It is to prevent death.
          </p>
        </div>

        <aside className="ammonia-leak-takeaway" aria-label="Key takeaway">
          <p className="ammonia-leak-takeaway__label">Key Takeaway</p>
          <p className="ammonia-leak-takeaway__text">
            Cold-chain growth needs chemical safety, worker protection and accountable
            inspection.
          </p>
        </aside>

        <p className="ammonia-leak-source">
          Primary reporting:{" "}
          <a href={TIRUVALLUR_AMMONIA_LEAK_SOURCE_URL} target="_blank" rel="noopener noreferrer">
            The New Indian Express (22 June update)
          </a>
          {" · "}
          <a
            href={TIRUVALLUR_AMMONIA_LEAK_SOURCE_URL_DAY_ONE}
            target="_blank"
            rel="noopener noreferrer"
          >
            Day-one report (21 June)
          </a>
          {" · "}
          <a
            href="https://www.thehindu.com/news/national/tamil-nadu/death-toll-rises-in-ammonia-gas-leak-inicident-at-seafood-processing-unit-in-tiruvallur/article71131720.ece"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Hindu
          </a>
          . This article is MyChennaiCity editorial analysis on industrial safety
          compliance. See more{" "}
          <Link href="/chennai-local-news">Chennai local news</Link>.
        </p>

        <p className="ammonia-leak-published">
          {published ? <>Published {published}</> : null}
          {published && updated ? " · " : null}
          {updated ? <>Updated {updated}</> : null}
          {" · "}
          Category: Chennai
          {" · "}
          Tags: Tiruvallur, Ammonia Leak, Industrial Safety, Worker Safety
        </p>

        <div className="mt-10">
          <ArticleCommunityBand />
        </div>
      </div>
    </article>
  );
}
