"use client";

import Link from "next/link";
import {
  BWG_H1,
  BWG_READING_TIME,
  BWG_STANDFIRST,
  BWG_TOC,
  BWG_VERIFIED_ON,
} from "@/content/guides/bwg-readiness-2026/meta";
import {
  BWG_MAINTENANCE_NOTICE,
  BWG_SOURCES,
  BWG_UPDATES_WE_TRACK,
} from "@/content/guides/bwg-readiness-2026/sources";
import { BwgReadinessAssessment } from "./bwg-assessment";
import { BwgConsultantCta } from "./bwg-consultant-cta";
import {
  BwgEligibilityChecker,
  BwgFourStreamExplainer,
} from "./bwg-eligibility";
import {
  BwgResponsibilityMatrix,
  BwgWasteAuditCalculator,
} from "./bwg-matrix-audit";
import {
  BwgDocumentTracker,
  BwgRegulatedWastePicker,
  BwgSegregationChecklist,
  BwgVendorDueDiligence,
  BwgWetWasteDecisionTree,
} from "./bwg-ops-tools";
import {
  BwgManagementMetrics,
  BwgMythAccordion,
  BwgThirtyDayPlanner,
  BwgTrainingTracker,
  BwgWasteJourneyWorkflow,
} from "./bwg-plan-tools";
import { BwgStateProvider } from "./bwg-state-provider";
import { BwgStickyProgress } from "./bwg-sticky-progress";

export function BwgReadinessGuide() {
  return (
    <BwgStateProvider>
      <div className="bwg-guide">
        <div className="bwg-guide__layout">
          <nav className="bwg-guide__nav" aria-label="Section navigation">
            <h2>On this page</h2>
            {BWG_TOC.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="bwg-guide__main">
            <header className="bwg-hero">
              <p className="bwg-hero__eyebrow">
                Chennai civic awareness · Solid waste management · Compliance
                guide
              </p>
              <h1>{BWG_H1}</h1>
              <p className="bwg-hero__standfirst">{BWG_STANDFIRST}</p>
              <p className="bwg-hero__meta">
                {BWG_READING_TIME} · Updated {BWG_VERIFIED_ON} · Sources: SWM
                Rules 2026 · GCC SWM Bye-Laws 2019
              </p>
              <div className="bwg-hero__actions">
                <a className="bwg-btn bwg-btn--primary" href="#section-assessment">
                  Start self-assessment
                </a>
                <a className="bwg-btn bwg-btn--ghost" href="#section-why">
                  Read the guide
                </a>
              </div>
            </header>

            <div className="bwg-disclaimer">
              This guide provides general public-interest information. It does
              not replace the Solid Waste Management Rules, municipal bye-laws,
              official directions, professional legal advice or approval by GCC,
              TNPCB, CPCB or any other authority.
            </div>

            {/* Section 1 */}
            <section className="bwg-section" id="section-why">
              <p className="bwg-section__num">Section 1</p>
              <h2>Why this matters now</h2>
              <p>
                The Solid Waste Management Rules, 2026 came into force on 1
                April 2026 and introduced a more structured framework for
                segregation, registration, reporting, processing and
                accountability. Bulk Waste Generators are an important part of
                the system because large institutions collectively account for a
                substantial share of urban solid waste. The Union government has
                stated that BWGs account for nearly 30 per cent of total solid
                waste generation.
              </p>
              <p>Responsible management at source can reduce:</p>
              <ul>
                <li>mixed waste entering municipal vehicles;</li>
                <li>contamination of recyclable materials;</li>
                <li>odour and pest problems;</li>
                <li>pressure on dump yards;</li>
                <li>unsafe handling by sanitation workers;</li>
                <li>transport and processing costs;</li>
                <li>neighbourhood complaints;</li>
                <li>regulatory exposure.</li>
              </ul>
              <div className="bwg-callout">
                The most effective waste-management system begins inside the
                premises where the waste is generated.
              </div>
            </section>

            {/* Section 2 */}
            <section className="bwg-section" id="section-eligibility">
              <p className="bwg-section__num">Section 2</p>
              <h2>Who may qualify as a Bulk Waste Generator?</h2>
              <p>
                An organisation may fall within the Bulk Waste Generator category
                when it meets any threshold prescribed under the 2026 Rules.
                Meeting any one applicable threshold may bring an establishment
                within the BWG framework.
              </p>
              <div className="bwg-cards bwg-cards--3">
                <div className="bwg-card">
                  <h3>Threshold A: Building size</h3>
                  <p className="bwg-card__value">20,000 m² or more</p>
                  <p>Floor area of 20,000 square metres or more</p>
                </div>
                <div className="bwg-card">
                  <h3>Threshold B: Water consumption</h3>
                  <p className="bwg-card__value">40,000 L/day or more</p>
                  <p>Water consumption of 40,000 litres per day or more</p>
                </div>
                <div className="bwg-card">
                  <h3>Threshold C: Waste generation</h3>
                  <p className="bwg-card__value">100 kg/day or more</p>
                  <p>Solid-waste generation of 100 kilograms per day or more</p>
                </div>
              </div>
              <div className="bwg-caution">
                Do not assume that your organisation is outside the BWG category
                merely because it has not measured 100 kilograms of waste per
                day. Building area and water consumption may also be relevant
                under the 2026 framework.
              </div>
              <BwgEligibilityChecker />
            </section>

            {/* Section 3 */}
            <section className="bwg-section" id="section-streams">
              <p className="bwg-section__num">Section 3</p>
              <h2>The shift from three streams to four streams</h2>
              <p>
                The 2026 Rules require source segregation into four categories:
                wet waste, dry waste, sanitary waste and special-care waste. The
                national Rules expressly mandate four-stream segregation.
              </p>
              <BwgFourStreamExplainer />
              <p>
                Chennai’s earlier bye-laws were based on the older national
                framework and required three streams, with sanitary waste placed
                in the non-biodegradable stream. The 2019 bye-laws also define
                Bulk Waste Generators through the earlier 100-kg-per-day test.
                For background, the earlier GCC draft also directed waste
                generators to segregate biodegradable, non-biodegradable and
                domestic hazardous waste and hand it over through authorised
                channels.
              </p>
              <p>
                This is a transition issue organisations must monitor — not legal
                advice. Local bye-law updates under Rule 39 remain due by 31
                March 2027.
              </p>
              <p>
                Related reading:{" "}
                <Link href="/chennai-local-news/chennai-solid-waste-bye-laws-2019-swm-rules-2026-update">
                  Chennai bye-laws 2019 vs SWM Rules 2026
                </Link>
                {" · "}
                <Link href="/chennai-local-news/chennai-bulk-waste-generators-swm-rules-2026-registration-deadline">
                  BWG registration under SWM Rules 2026
                </Link>
              </p>
            </section>

            {/* Section 4 */}
            <section className="bwg-section" id="section-governance">
              <p className="bwg-section__num">Section 4</p>
              <h2>Compliance begins with governance, not bins</h2>
              <p>
                Compliance must have formal internal ownership. Every
                organisation should appoint a senior management sponsor; a nodal
                solid-waste officer; a facility or housekeeping lead; a
                waste-recording person; authorised vendor liaison; an escalation
                contact; and substitute personnel for absence or staff turnover.
              </p>
              <BwgResponsibilityMatrix />
            </section>

            {/* Section 5 */}
            <section className="bwg-section" id="section-audit">
              <p className="bwg-section__num">Section 5</p>
              <h2>Conduct a complete waste audit</h2>
              <p>
                Organisations cannot manage what they do not measure. The waste
                audit should cover total waste generated per day; waste by
                department; wet, recyclable dry, non-recyclable dry, sanitary and
                special-care waste; garden waste; e-waste; biomedical waste where
                separately governed; construction and demolition waste; rejected
                or residual waste; and seasonal and event-related variation.
              </p>
              <BwgWasteAuditCalculator />
            </section>

            {/* Section 6 */}
            <section className="bwg-section" id="section-infrastructure">
              <p className="bwg-section__num">Section 6</p>
              <h2>Create proper segregation infrastructure</h2>
              <p>
                A central waste room cannot correct poor segregation at source.
                The canteen, office floor, hostel, ward, classroom, restaurant
                kitchen or residential block must segregate correctly before
                waste reaches central storage.
              </p>
              <BwgSegregationChecklist />
            </section>

            {/* Section 7 */}
            <section className="bwg-section" id="section-wet-waste">
              <p className="bwg-section__num">Section 7</p>
              <h2>Wet-waste readiness</h2>
              <p>
                The Union government’s 2026 framework expects BWGs to process wet
                waste on-site as far as possible or use the applicable Extended
                Bulk Waste Generator Responsibility route where on-site
                processing is not feasible.
              </p>
              <BwgWetWasteDecisionTree />
            </section>

            {/* Section 8 */}
            <section className="bwg-section" id="section-vendors">
              <p className="bwg-section__num">Section 8</p>
              <h2>Dry-waste and recycler verification</h2>
              <p>
                Dry recyclables should be channelled through authorised recyclers
                or authorised waste handlers.
              </p>
              <BwgVendorDueDiligence />
            </section>

            {/* Section 9 */}
            <section className="bwg-section" id="section-sanitary">
              <p className="bwg-section__num">Section 9</p>
              <h2>Sanitary and special-care waste</h2>
              <p>
                These streams need controlled handling because of hygiene, injury
                and contamination risks. Checklist: secure wrapping; labelled
                storage; restricted access; collection frequency; no manual
                sorting; PPE; spill or breakage procedure; worker vaccination and
                health safeguards where applicable; dedicated handover record;
                authorised receiving point; training in Tamil and English;
                emergency contact.
              </p>
              <div className="bwg-callout">
                Waste systems must protect sanitation and housekeeping workers.
                Staff should not be forced to open mixed bags, manually retrieve
                sanitary waste or handle broken glass, bulbs, chemicals or
                contaminated material without proper protection.
              </div>
            </section>

            {/* Section 10 */}
            <section className="bwg-section" id="section-regulated">
              <p className="bwg-section__num">Section 10</p>
              <h2>Keep different regulatory waste streams separate</h2>
              <p>
                Solid-waste compliance does not replace other waste laws.
                Organisations should not place separately regulated waste into
                the municipal solid-waste stream merely because it arises within
                the same premises.
              </p>
              <div className="bwg-cards bwg-cards--4">
                {[
                  "Biomedical waste",
                  "E-waste",
                  "Battery waste",
                  "Plastic packaging obligations",
                  "Hazardous industrial waste",
                  "Construction and demolition waste",
                  "Used oil",
                  "Food-industry waste where separately regulated",
                ].map((t) => (
                  <div className="bwg-card" key={t}>
                    <h3>{t}</h3>
                    <p>Separate legal framework — verify independently.</p>
                  </div>
                ))}
              </div>
              <BwgRegulatedWastePicker />
            </section>

            {/* Section 11 */}
            <section className="bwg-section" id="section-documents">
              <p className="bwg-section__num">Section 11</p>
              <h2>Registration and documentation readiness</h2>
              <p>
                Build a document repository and keep renewal dates visible. Print
                or save a PDF from your browser when you need a paper trail for
                internal review.
              </p>
              <BwgDocumentTracker />
            </section>

            {/* Section 12 */}
            <section className="bwg-section" id="section-training">
              <p className="bwg-section__num">Section 12</p>
              <h2>Train everyone who touches the waste system</h2>
              <p>
                Senior policies fail when front-line staff are not trained.
                Different modules should cover management, housekeeping, kitchen
                teams, building users, and security or loading-bay staff.
              </p>
              <BwgTrainingTracker />
            </section>

            {/* Section 13 */}
            <section className="bwg-section" id="section-journey">
              <p className="bwg-section__num">Section 13</p>
              <h2>Inspect the entire waste journey</h2>
              <p>
                Generation → Segregation → Internal collection → Weighing →
                Temporary storage → Processing or handover → Transportation →
                Final facility → Evidence. Each stage needs a control,
                responsible person, evidence and a corrective path when it fails.
              </p>
              <BwgWasteJourneyWorkflow />
            </section>

            {/* Section 14 */}
            <section className="bwg-section" id="section-metrics">
              <p className="bwg-section__num">Section 14</p>
              <h2>Management dashboard indicators</h2>
              <p>
                Review waste performance monthly. Set your own targets — do not
                rely on an unverified universal “zero waste” claim.
              </p>
              <BwgManagementMetrics />
            </section>

            {/* Section 15 */}
            <section className="bwg-section" id="section-community">
              <p className="bwg-section__num">Section 15</p>
              <h2>How compliance benefits the wider community</h2>
              <p>
                Proper BWG management can contribute to cleaner roads and public
                bins; less mixed waste in collection vehicles; reduced burden on
                Perungudi and Kodungaiyur; improved recovery of recyclable
                material; safer working conditions; lower odour and vector
                problems; better neighbourhood hygiene; reduced illegal dumping
                and burning; greater accountability in the waste value chain; and
                stronger circular-economy participation.
              </p>
              <div className="bwg-callout">
                A large organisation does not manage waste only for its own
                premises. Its practices affect sanitation workers, neighbouring
                residents, municipal systems, recyclers, air quality, water
                bodies and the city’s long-term environmental health.
              </div>
            </section>

            {/* Section 16 */}
            <section className="bwg-section" id="section-myths">
              <p className="bwg-section__num">Section 16</p>
              <h2>Common myths</h2>
              <BwgMythAccordion />
            </section>

            {/* Section 17 */}
            <section className="bwg-section" id="section-action-plan">
              <p className="bwg-section__num">Section 17</p>
              <h2>30-day readiness action plan</h2>
              <p>
                Use this structured calendar to move from awareness to documented
                operational readiness. Status fields stay on your device.
              </p>
              <BwgThirtyDayPlanner />
            </section>

            {/* Section 18 */}
            <section className="bwg-section" id="section-assessment">
              <p className="bwg-section__num">Section 18</p>
              <h2>Final self-assessment</h2>
              <p>
                Score five domains: governance; segregation and infrastructure;
                processing and authorised handover; documentation and reporting;
                training, safety and monitoring. Use the result as a readiness
                indicator — never as a claim of legal compliance.
              </p>
              <BwgReadinessAssessment />
            </section>

            <BwgConsultantCta />

            <section className="bwg-section" id="section-sources">
              <p className="bwg-section__num">Sources</p>
              <h2>Source references and updates</h2>
              <ul>
                {BWG_SOURCES.map((s) => (
                  <li key={s.title}>
                    <strong>{s.title}.</strong> {s.note}
                  </li>
                ))}
              </ul>
              <div className="bwg-caution">{BWG_MAINTENANCE_NOTICE}</div>
              <p style={{ fontWeight: 600 }}>Updates we will track</p>
              <ul>
                {BWG_UPDATES_WE_TRACK.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
              <div className="bwg-callout">
                When large organisations manage waste correctly at source, the
                benefit extends beyond their own gates. It improves worker
                safety, protects neighbourhood hygiene, preserves recyclable
                resources, reduces mixed-waste transport and strengthens
                Chennai’s wider waste-management system.
              </div>
            </section>
          </div>
        </div>
        <BwgStickyProgress />
      </div>
    </BwgStateProvider>
  );
}
