import styles from "./abk-liaison-llp-profile.module.css";

const LOGO_SRC = "/images/business-profile/abk-liaison-llp/abk-logo.png";

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ABK Liaison LLP",
  url: "https://www.abkliaison.com",
  areaServed: ["Tamil Nadu", "Pondicherry"],
  telephone: "+91 98404 04590",
  email: "abkliaison@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "16, SPS 2nd Street, Royapettah",
    addressLocality: "Chennai",
    postalCode: "600014",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  founder: "AB Kathirravan",
  description:
    "Statutory licensing, liaison coordination, government contracts and civil development services across Tamil Nadu and Pondicherry.",
};

export function AbkLiaisonLlpProfile() {
  return (
    <div className={styles.root}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

      <header className={styles.topbar}>
        <div className={`${styles.wrap} ${styles.topbarInner}`}>
          <a
            className={styles.brand}
            href="https://www.abkliaison.com"
            aria-label="ABK Liaison LLP website"
          >
            <img
              className={styles.brandLogo}
              src={LOGO_SRC}
              alt="ABK Liaison LLP logo"
            />
            <span className={styles.brandText}>
              Legal Solutions · Trusted Partners
            </span>
          </a>
          <nav className={styles.topLinks} aria-label="Page navigation">
            <a href="#profile">Profile</a>
            <a href="#capabilities">Services</a>
            <a href="#credentials">Credentials</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`${styles.wrap} ${styles.heroInner}`}>
            <div>
              <span className={styles.heroLabel}>Company Profile</span>
              <h1 id="hero-title">
                Locations, Licenses, Liaison & Construction
              </h1>
              <p>
                ABK Liaison LLP operates at the intersection of statutory
                licensing, government liaison, public works registration and
                focused civil development across Tamil Nadu and Pondicherry.
              </p>
              <div className={styles.heroActions}>
                <a className={`${styles.btn} ${styles.btnPrimary}`} href="tel:+919840404590">
                  Call +91 98404 04590
                </a>
                <a className={styles.btn} href="mailto:abkliaison@gmail.com">
                  Email ABK Liaison
                </a>
              </div>
            </div>
            <aside className={styles.heroPanel} aria-label="Key business summary">
              <h2>
                Focused advisory and execution support for licence-led business
                and civil development requirements.
              </h2>
              <dl>
                <div>
                  <dt>Area of Operation</dt>
                  <dd>Tamil Nadu & Pondicherry</dd>
                </div>
                <div>
                  <dt>Shell Vendor Since</dt>
                  <dd>27-02-2020</dd>
                </div>
                <div>
                  <dt>PWD Category</dt>
                  <dd>Class 1 Contractor · ₹10 crore to ₹25 crore</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className={styles.intro} id="profile">
          <div className={`${styles.wrap} ${styles.introGrid}`}>
            <div>
              <span className={styles.eyebrow}>About the firm</span>
              <h2 className={styles.sectionTitle}>
                A Chennai-based liaison and civil works partner with practical
                regulatory depth.
              </h2>
              <div className={styles.introCopy}>
                <p>
                  ABK Liaison LLP supports businesses and institutions through
                  statutory registration processes, retail outlet coordination,
                  government contracting pathways and commercial built-space
                  development requirements.
                </p>
                <p>
                  The firm brings together business experience,
                  academic-institution exposure and government-facing process
                  knowledge to support clients where documentation, coordination,
                  approval follow-up and execution discipline matter.
                </p>
              </div>
            </div>
            <aside className={styles.quotePanel}>
              <strong>
                Clarity in licensing. Discipline in execution. Continuity in
                liaison.
              </strong>
              <span>
                Positioned for clients who require a reliable operating
                presence across approvals, registration, construction coordination
                and public works processes.
              </span>
            </aside>
          </div>
        </section>

        <section className={styles.capabilities} id="capabilities">
          <div className={styles.wrap}>
            <span className={styles.eyebrow}>Core service areas</span>
            <h2 className={styles.sectionTitle}>
              Services structured around permissions, public works and property
              transformation.
            </h2>
            <p className={styles.sectionLead}>
              The engagement model is built for assignment-level accountability:
              define the requirement, document the pathway, coordinate with
              stakeholders and drive the process through completion.
            </p>

            <div className={styles.capabilityList}>
              <article className={styles.capabilityRow}>
                <div>
                  <span className={styles.num}>01</span>
                  <h3>Retail Outlet Liaison</h3>
                </div>
                <p>
                  Shell liaison support for retail outlets, including licence and
                  coordination requirements across Tamil Nadu and Pondicherry.
                </p>
                <span className={styles.scope}>Fuel retail</span>
              </article>
              <article className={styles.capabilityRow}>
                <div>
                  <span className={styles.num}>02</span>
                  <h3>Government Contracts</h3>
                </div>
                <p>
                  Class 1 contractor registration with PWD for public works
                  opportunities in the ₹10 crore to ₹25 crore contract category.
                </p>
                <span className={styles.scope}>PWD works</span>
              </article>
              <article className={styles.capabilityRow}>
                <div>
                  <span className={styles.num}>03</span>
                  <h3>Civil Works</h3>
                </div>
                <p>
                  Execution and coordination support for event spaces, family
                  asset redevelopment and commercial property transformation
                  projects.
                </p>
                <span className={styles.scope}>Development</span>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.credentials} id="credentials">
          <div className={styles.wrap}>
            <span className={styles.eyebrow}>Credentials</span>
            <h2 className={styles.sectionTitle}>
              Registration strength and operating coverage for licence-led
              assignments.
            </h2>
            <p className={styles.sectionLead}>
              The profile combines vendor continuity, PWD registration and active
              area coverage across two key South Indian jurisdictions.
            </p>

            <div className={styles.credentialsGrid}>
              <div className={styles.credentialStatement}>
                <h3>
                  Formal registrations supported by field coordination and
                  client-side follow-through.
                </h3>
                <p>
                  ABK Liaison LLP is positioned for clients who need more than
                  paperwork. The firm works through the practical sequence of
                  compliance, representation, liaison, document submission and
                  execution coordination.
                </p>
              </div>
              <div className={styles.facts}>
                <div className={styles.fact}>
                  <span>Registration Date</span>
                  <strong>14-10-2024</strong>
                </div>
                <div className={styles.fact}>
                  <span>Application No.</span>
                  <strong>TN-432024110140265</strong>
                </div>
                <div className={styles.fact}>
                  <span>Registration No.</span>
                  <strong>TN-PWDCHN011063</strong>
                </div>
                <div className={styles.fact}>
                  <span>Contract Category</span>
                  <strong>₹10 crore to ₹25 crore</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.projects} id="projects">
          <div className={styles.wrap}>
            <span className={styles.eyebrow}>Project highlights</span>
            <h2 className={styles.sectionTitle}>
              Selected work across institutional event space and commercial
              redevelopment.
            </h2>
            <p className={styles.sectionLead}>
              The following projects reflect the firm&apos;s involvement in
              built-space transformation, coordination and development-led
              execution.
            </p>

            <article className={styles.projectFeature}>
              <div
                className={`${styles.projectVisual} ${styles.projectVisualOne}`}
                role="img"
                aria-label="Professors Hall project"
              />
              <div className={styles.projectCopy}>
                <span className={styles.type}>Completed project</span>
                <h3>Professors Hall</h3>
                <p>
                  Completed 6000+2000 sq. ft. event space developed in memory of
                  the family&apos;s grandmother and great grandfather.
                </p>
                <ul>
                  <li>Institutional event space</li>
                  <li>Large-format civil development</li>
                  <li>Memory-led legacy project</li>
                </ul>
              </div>
            </article>

            <article
              className={`${styles.projectFeature} ${styles.projectFeatureReverse}`}
            >
              <div className={styles.projectCopy}>
                <span className={styles.type}>Redevelopment project</span>
                <h3>Arcot, T Nagar</h3>
                <p>
                  Commercial redevelopment project in memory of Mr A B
                  Kathirravan&apos;s grandmother and great grandfather.
                </p>
                <ul>
                  <li>Commercial asset transformation</li>
                  <li>Urban redevelopment coordination</li>
                  <li>Construction after liaison</li>
                </ul>
              </div>
              <div
                className={`${styles.projectVisual} ${styles.projectVisualTwo}`}
                role="img"
                aria-label="Arcot T Nagar redevelopment"
              />
            </article>
          </div>
        </section>

        <section className={styles.contactSection} id="contact">
          <div className={styles.wrap}>
            <div className={styles.contactBoard}>
              <div className={styles.contactDark}>
                <h2>Contact ABK Liaison LLP</h2>
                <p>
                  For liaison, licensing, public works registration, government
                  contract coordination and civil redevelopment enquiries.
                </p>
              </div>
              <div className={styles.contactDetails}>
                <div className={styles.person}>
                  <strong>AB Kathirravan</strong>
                  <span>Director</span>
                </div>
                <div className={styles.contactLine}>
                  <span>Phone</span>
                  <a href="tel:+919840404590">+91 98404 04590</a>
                </div>
                <div className={styles.contactLine}>
                  <span>Email</span>
                  <a href="mailto:abkliaison@gmail.com">abkliaison@gmail.com</a>
                </div>
                <div className={styles.contactLine}>
                  <span>Website</span>
                  <a
                    href="https://www.abkliaison.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.abkliaison.com
                  </a>
                </div>
                <div className={styles.contactLine}>
                  <span>Address</span>
                  <address>
                    16, SPS 2nd Street, Royapettah, Chennai 600 014
                  </address>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerInner}`}>
          <div>
            <strong>ABK Liaison LLP</strong> · Business Profile
          </div>
          <div>Reference: Ar. Karthiyean Arcot — www.desgndna.in</div>
        </div>
      </footer>
    </div>
  );
}
