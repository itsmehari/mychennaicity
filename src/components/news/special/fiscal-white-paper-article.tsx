import Image from "next/image";
import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import { ArticleCommunityBand } from "@/components/community/article-community-band";
import {
  fiscalKeyNumbers,
  fiscalReformCards,
  fiscalWhitePaperSidebar,
  TN_FISCAL_BUDGET_IMAGE,
  TN_FISCAL_HERO_IMAGE,
  TN_FISCAL_POWER_IMAGE,
  TN_FISCAL_WHITE_PAPER_PDF,
} from "@/content/special-articles/tn-fiscal-white-paper-2026";

function DataCard({
  label,
  value,
  context,
  tone,
}: {
  label: string;
  value: string;
  context: string;
  tone?: "debt" | "exposure";
}) {
  return (
    <div
      className={`fiscal-data-card${tone === "debt" ? " fiscal-data-card--debt" : ""}${tone === "exposure" ? " fiscal-data-card--exposure" : ""}`}
    >
      <p className="fiscal-data-card__label">{label}</p>
      <p className="fiscal-data-card__value">{value}</p>
      <p className="fiscal-data-card__context">{context}</p>
    </div>
  );
}

function LiabilityBar({ year, amount, pct }: { year: string; amount: string; pct: number }) {
  return (
    <div className="fiscal-bar-row">
      <span>{year}</span>
      <div className="fiscal-bar-row__track">
        <div className="fiscal-bar-row__fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="tabular-nums">{amount}</span>
    </div>
  );
}

export function FiscalWhitePaperArticle({ article }: { article: PublicArticleRow }) {
  const published =
    article.publishedAt?.toLocaleString("en-IN", {
      dateStyle: "long",
      timeZone: "Asia/Kolkata",
    }) ?? null;

  return (
    <article className="fiscal-article -mx-4 sm:mx-0">
      <header className="fiscal-hero">
        <Image
          src={TN_FISCAL_HERO_IMAGE}
          alt="Tamil Nadu fiscal white paper coverage — photo via The South First"
          fill
          priority
          className="fiscal-hero__bg"
          sizes="(max-width: 768px) 100vw, 1120px"
        />
        <div className="fiscal-hero__overlay" aria-hidden />
        <div className="fiscal-hero__content">
          <p className="fiscal-hero__eyebrow">Fiscal White Paper 2026</p>
          <h1 className="fiscal-hero__title" data-speakable="article-title">
            {article.title}
          </h1>
          {article.dek ? (
            <p className="fiscal-hero__deck" data-speakable="article-lead">
              {article.dek}
            </p>
          ) : null}
          <p className="fiscal-hero__byline">
            Political Economy Analysis · Tamil Nadu Fiscal White Paper 2026
          </p>
        </div>
      </header>

      <div className="fiscal-key-strip" aria-label="Key fiscal numbers">
        <div className="fiscal-key-strip__inner">
          {fiscalKeyNumbers.map((item) => (
            <div key={item.label} className="fiscal-key-strip__item">
              <p className="fiscal-key-strip__value">{item.value}</p>
              <p className="fiscal-key-strip__label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="fiscal-pdf-banner">
        <div className="fiscal-pdf-banner__card">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--fiscal-maroon)]">
              Official document
            </p>
            <p className="mt-2 text-sm font-semibold leading-snug">
              Tamil Nadu Fiscal White Paper 2026 (English PDF)
            </p>
            <p className="mt-1 text-xs text-[var(--fiscal-muted)]">
              Government of Tamil Nadu — read the primary source alongside this
              analysis.
            </p>
          </div>
          <Link
            href={TN_FISCAL_WHITE_PAPER_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="fiscal-pdf-banner__cta"
          >
            <span className="font-mono text-xs" aria-hidden>
              PDF
            </span>
            Download White Paper
          </Link>
        </div>
      </div>

      <div className="fiscal-body-wrap">
        <div className="fiscal-mobile-sticky lg:hidden" aria-label="Key numbers summary">
          <strong>Key numbers:</strong> ₹13.18L cr exposure · ₹78,324 cr revenue
          deficit · ₹67,050 cr interest · 5.45% SoTR/GSDP
        </div>

        <section className="fiscal-intro-grid">
          <div className="fiscal-prose">
            <p>
              Tamil Nadu&apos;s latest fiscal White Paper is not merely a government
              document. It is a political weapon, a financial warning, and a test
              of public seriousness.
            </p>
            <p>
              The Vijay government has presented it as an evidence-based account of
              Tamil Nadu&apos;s finances. That claim deserves attention. But it also
              deserves scrutiny. No government releases a White Paper on the
              previous fiscal period in a political vacuum. A document of this kind
              does two things at once: it reveals numbers, and it frames blame.
            </p>
            <p>
              The central question, therefore, is not whether the White Paper is
              political. It is. The question is whether its numbers are serious
              enough to survive the politics around them.
            </p>
            <p>
              <strong>They are.</strong>
            </p>
          </div>
          <aside className="fiscal-sidebar-card" aria-label="What the White Paper says">
            <h2>What the White Paper claims</h2>
            <ul>
              {fiscalWhitePaperSidebar.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="fiscal-section">
          <p className="fiscal-section__eyebrow">Section 1</p>
          <h2 className="fiscal-section__title">
            The number that will dominate politics
          </h2>
          <span className="fiscal-warning-label">Do not confuse the two</span>
          <div className="fiscal-prose mt-6">
            <p>
              The figure dominating public debate is ₹13.18 lakh crore. But that
              figure must be handled carefully. It should not be casually described
              as Tamil Nadu&apos;s direct debt.
            </p>
            <p>
              The direct outstanding liabilities are closer to ₹10 lakh crore. The
              ₹13.18 lakh crore figure is broader: it includes wider fiscal exposure,
              including the liabilities and risks sitting inside public sector
              undertakings, guarantees and loss-making state entities.
            </p>
            <p>
              That distinction matters. If critics call the entire ₹13.18 lakh crore
              &ldquo;debt&rdquo;, the opposition can dismiss the argument as
              exaggeration. The more accurate and more dangerous phrase is this:{" "}
              <strong>
                Tamil Nadu&apos;s aggregate fiscal exposure is approaching ₹13.18
                lakh crore.
              </strong>
            </p>
            <p>
              This is not just accounting language. It tells us that part of Tamil
              Nadu&apos;s financial burden is visible in the Budget, and part of it is
              hidden in institutions that depend on the State when they fail.
            </p>
          </div>
          <div className="fiscal-data-grid fiscal-data-grid--4">
            <DataCard
              label="Direct outstanding liabilities"
              value="₹9,99,832 cr"
              context="Approximate 2025-26 Pre-AC figure"
              tone="debt"
            />
            <DataCard
              label="Aggregate fiscal exposure"
              value="₹13.18 lakh cr"
              context="Direct debt plus PSU-linked exposure"
              tone="exposure"
            />
            <DataCard
              label="Government guarantees"
              value="₹1,79,782 cr"
              context="Nearly three-fold rise since April 2021"
            />
            <DataCard
              label="Power sector debt"
              value="₹2.47 lakh cr"
              context="Largest PSU-linked risk"
            />
          </div>
          <div className="fiscal-chart-card">
            <h3>Tamil Nadu&apos;s visible and hidden fiscal burden</h3>
            <div className="fiscal-stacked-bar" role="img" aria-label="Direct debt 9.99 lakh crore plus PSU exposure 3.18 lakh crore equals 13.18 lakh crore aggregate">
              <div className="fiscal-stacked-bar__direct" style={{ width: "75.9%" }} />
              <div className="fiscal-stacked-bar__psu" style={{ width: "24.1%" }} />
            </div>
            <div className="fiscal-stacked-bar-legend">
              <span className="direct">Direct liabilities — ₹9.99 lakh cr</span>
              <span className="psu">Major PSU exposure — ₹3.18 lakh cr</span>
            </div>
          </div>
        </section>

        <section className="fiscal-section fiscal-section--calm">
          <p className="fiscal-section__eyebrow">Section 2</p>
          <h2 className="fiscal-section__title">Strong State, weak fiscal discipline</h2>
          <div className="fiscal-prose mt-6">
            <p>
              Tamil Nadu is not a poor State. It has industry, services, exports,
              ports, cities, skilled labour, social infrastructure and one of
              India&apos;s strongest welfare legacies.
            </p>
            <p>
              A strong State can carry debt. Debt itself is not immoral. Debt used
              for roads, schools, hospitals, water systems, public transport,
              industrial corridors and future productivity can be justified.
            </p>
            <p>The danger begins when debt is used to keep today&apos;s political machine running.</p>
          </div>
          <blockquote className="fiscal-pull-quote">
            Debt is not the disease. Borrowing for current expenditure is.
          </blockquote>
        </section>

        <section className="fiscal-section">
          <p className="fiscal-section__eyebrow">Section 3</p>
          <h2 className="fiscal-section__title">The real warning is revenue deficit</h2>
          <div className="fiscal-prose mt-6">
            <p>
              That is why the revenue deficit number is more important than the
              headline debt number.
            </p>
            <p>
              The White Paper says Tamil Nadu&apos;s revenue deficit touched ₹78,324
              crore in 2025-26. In simple terms, the government is borrowing not only
              to build assets, but to meet current expenditure. It is the equivalent
              of a household taking loans not to buy land or build a house, but to
              pay monthly bills.
            </p>
            <p>
              That may be unavoidable during a pandemic. It is not acceptable as a
              permanent governing style.
            </p>
            <p>
              Tamil Nadu&apos;s debt-to-GSDP ratio has not exploded in the way casual
              political debate may suggest — outstanding liabilities as a share of GSDP
              moved from 28.7% to 28.3% across the White Paper window. The sharper
              criticism is that Tamil Nadu failed to consolidate when it had the
              chance.
            </p>
            <p>
              After COVID, States such as Karnataka, Maharashtra and Gujarat used
              recovery years to improve or stabilise their fiscal position. Tamil Nadu,
              according to the White Paper, remained stuck with elevated debt,
              persistent revenue deficit and falling own-tax effort.
            </p>
            <p>
              <strong>In finance, standing still while peers repair themselves is also decline.</strong>
            </p>
          </div>
          <div className="fiscal-chart-card">
            <h3>Outstanding liabilities rose; debt ratio stayed elevated</h3>
            <div className="fiscal-bar-compare">
              <LiabilityBar year="2020-21" amount="₹5.13L cr" pct={51} />
              <LiabilityBar year="2022-23" amount="₹6.77L cr" pct={68} />
              <LiabilityBar year="2024-25" amount="₹8.54L cr" pct={85} />
              <LiabilityBar year="2025-26" amount="₹10.00L cr" pct={100} />
            </div>
            <p className="mt-3 text-xs text-[var(--fiscal-muted)]">
              Debt-to-GSDP hovered near 28% — the issue is persistence and missed
              consolidation, not a sudden ratio spike.
            </p>
          </div>
          <div className="fiscal-comparison-cards">
            <div className="fiscal-comparison-card">
              <p className="fiscal-comparison-card__year">2021-22 revenue deficit</p>
              <p className="fiscal-comparison-card__value">₹46,538 cr</p>
            </div>
            <div className="fiscal-comparison-card">
              <p className="fiscal-comparison-card__year">2025-26 revenue deficit</p>
              <p className="fiscal-comparison-card__value">₹78,324 cr</p>
            </div>
          </div>
        </section>

        <section className="fiscal-section fiscal-section--dark">
          <p className="fiscal-section__eyebrow">Section 4</p>
          <h2 className="fiscal-section__title">The tax effort problem</h2>
          <div className="fiscal-prose mt-6">
            <p>
              The White Paper is especially severe on tax effort. Tamil Nadu&apos;s
              State Own Tax Revenue as a share of GSDP declined from 5.93% in 2021-22
              to 5.45% in 2025-26. Total Revenue Receipts reportedly fell from around
              10% of GSDP to 8.32%.
            </p>
            <p>
              For a State with Tamil Nadu&apos;s industrial base, consumption economy
              and urbanisation, this points to leakages, tax underperformance, weak
              enforcement, political reluctance, or a combination of all four.
            </p>
            <p>
              Tamil Nadu&apos;s welfare model has historical legitimacy — but welfare
              cannot become a shield for fiscal indiscipline. A welfare State that
              cannot collect taxes efficiently, control procurement costs, reform
              loss-making utilities and protect capital expenditure eventually damages
              the very people it claims to protect.
            </p>
          </div>
          <div className="fiscal-slope">
            <p className="font-semibold">Tamil Nadu&apos;s own-tax effort has weakened</p>
            <div className="fiscal-slope__line">
              <span>5.93% (2021-22)</span>
              <span className="fiscal-slope__arrow" aria-hidden />
              <span>5.45% (2025-26)</span>
            </div>
            <p className="mt-2 text-[var(--fiscal-muted)]">
              Peak reference 6.33% (2022-23). White Paper estimates ₹51,000 crore
              revenue foregone against that peak.
            </p>
          </div>
          <div className="fiscal-data-grid fiscal-data-grid--4 mt-6">
            <DataCard label="SoTR / GSDP" value="5.45%" context="2025-26 Pre-AC" />
            <DataCard label="Total revenue / GSDP" value="8.32%" context="Down from ~10%" />
            <DataCard label="Revenue foregone" value="₹51,000 cr" context="Vs 2022-23 peak" />
            <DataCard label="Pre-committed receipts" value="87%" context="After inflexible obligations" />
          </div>
        </section>

        <section className="fiscal-section">
          <p className="fiscal-section__eyebrow">Section 5</p>
          <h2 className="fiscal-section__title">Interest is the silent budget killer</h2>
          <div className="fiscal-prose mt-6">
            <p>
              Annual interest payments rose from ₹41,564 crore in 2021-22 to ₹67,050
              crore in 2025-26. This is money already committed before a minister
              announces a new scheme or a collector gets a new project.
            </p>
            <p>
              The most politically damaging line in the White Paper is that interest
              payments now exceed capital expenditure — Tamil Nadu spends more to
              service yesterday&apos;s borrowing than to build tomorrow&apos;s assets.
            </p>
          </div>
          <blockquote className="fiscal-pull-quote">
            Interest does not cut ribbons. It quietly eats the Budget.
          </blockquote>
          <div className="fiscal-chart-card">
            <h3>Interest payments (₹ crore)</h3>
            <div className="fiscal-bar-compare">
              <LiabilityBar year="2021-22" amount="41,564" pct={62} />
              <LiabilityBar year="2025-26" amount="67,050" pct={100} />
            </div>
            <p className="mt-3 text-sm font-semibold text-[var(--fiscal-warning)]">
              2025-26 interest-to-capital expenditure ratio: 1.32:1
            </p>
          </div>
        </section>

        <section className="fiscal-section fiscal-section--dark">
          <p className="fiscal-section__eyebrow">Shadow budget</p>
          <h2 className="fiscal-section__title">Power sector — the shadow budget</h2>
          <figure className="fiscal-image-break">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TN_FISCAL_POWER_IMAGE}
              alt="Power transmission lines representing Tamil Nadu electricity sector fiscal burden"
              loading="lazy"
            />
            <figcaption>
              Power-sector losses do not vanish. They return through guarantees,
              tariff pressure or future borrowing.
            </figcaption>
          </figure>
          <div className="fiscal-prose mt-6">
            <p>
              When distribution losses, tariff gaps, regulatory assets, delayed
              subsidy payments and utility borrowings accumulate, the cost does not
              disappear. It returns through State guarantees, budget support, tariff
              pressure or future borrowing.
            </p>
            <p>
              Tamil Nadu&apos;s power entities, transport corporations and civil
              supplies system are fiscal engines. When they run losses year after year,
              they weaken the State&apos;s borrowing capacity.
            </p>
          </div>
          <div className="fiscal-data-grid fiscal-data-grid--4 mt-6">
            <DataCard label="Major PSU-linked debt" value="₹3.18L cr" context="Power, transport, civil supplies" />
            <DataCard label="Power sector debt" value="₹2.47L cr" context="Largest entity exposure" />
            <DataCard label="Accumulated power loss" value="₹1.82L cr" context="Long-term structural stress" />
            <DataCard label="Govt guarantees" value="₹1.79L cr" context="Nearly 3× since Apr 2021" />
          </div>
        </section>

        <section className="fiscal-section fiscal-section--grey">
          <p className="fiscal-section__eyebrow">The counter-case</p>
          <h2 className="fiscal-section__title">The opposition&apos;s counterargument</h2>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(220px,280px)] lg:items-start">
            <div className="fiscal-prose">
              <p>
                The previous government and its defenders can argue that Tamil
                Nadu&apos;s welfare commitments are heavier than peer States, that
                social-sector spending produces long-term returns, and that GST
                compensation, central transfers and disaster response all matter.
              </p>
              <p>Some of those arguments have merit. But they do not erase three hard facts.</p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-base">
                <li>A persistent revenue deficit means borrowing for current expenditure.</li>
                <li>Declining own-tax effort cannot be blamed entirely on the Centre.</li>
                <li>Loss-making PSUs cannot be permanently hidden behind social-policy language.</li>
              </ol>
              <p className="mt-4">
                The White Paper may be political. But weak rebuttals will not defeat
                it. Only better numbers can.
              </p>
            </div>
            <figure className="fiscal-image-break lg:mt-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={TN_FISCAL_BUDGET_IMAGE}
                alt="Tamil Nadu budget presentation showing finance officials with budget papers"
                loading="lazy"
              />
              <figcaption>
                The dispute is not only about numbers, but about who defines fiscal
                responsibility.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="fiscal-section">
          <p className="fiscal-section__eyebrow">Political reaction</p>
          <h2 className="fiscal-section__title">Empty paper or hard numbers?</h2>
          <div className="fiscal-prose mt-4">
            <p>
              Former finance minister Thangam Thennarasu&apos;s reported dismissal of
              the document as an &ldquo;empty paper&rdquo; is politically predictable.
              But the public question is practical: which numbers are wrong, which
              assumptions are misleading, and what is the alternative fiscal path?
            </p>
            <p>
              Calling it an empty paper is not enough. A serious opposition must
              produce a counter-audit, not just a counter-slogan. The Vijay government
              also cannot stop at disclosure — a White Paper is only the opening
              statement.
            </p>
          </div>
          <div className="fiscal-quote-cards">
            <div className="fiscal-quote-card">
              <p className="fiscal-quote-card__label">Government framing</p>
              <p className="fiscal-quote-card__text">
                Evidence-based account of fiscal deterioration
              </p>
            </div>
            <div className="fiscal-quote-card">
              <p className="fiscal-quote-card__label">Opposition attack</p>
              <p className="fiscal-quote-card__text">
                Not a White Paper, but an empty paper
              </p>
            </div>
          </div>
        </section>

        <section className="fiscal-section">
          <p className="fiscal-section__eyebrow">Reform path</p>
          <h2 className="fiscal-section__title">What real correction requires</h2>
          <div className="fiscal-reform-grid">
            {fiscalReformCards.map((text, i) => (
              <div key={text} className="fiscal-reform-card">
                <p className="fiscal-reform-card__num">{i + 1}</p>
                <p className="fiscal-reform-card__text">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="fiscal-section fiscal-section--calm">
          <p className="fiscal-section__eyebrow">Demography</p>
          <h2 className="fiscal-section__title">Demography makes the window smaller</h2>
          <div className="fiscal-prose mt-6">
            <p>
              Tamil Nadu&apos;s crisis is not bankruptcy — that is exaggerated language.
              The State has economic depth, administrative capacity and social capital.
              It can correct course.
            </p>
            <p>
              But it faces a narrowing window: an ageing population, rising welfare
              commitments, growing interest burden, hidden PSU stress, and a political
              culture that rewards announcements faster than discipline.
            </p>
          </div>
          <div className="fiscal-comparison-cards">
            <div className="fiscal-comparison-card">
              <p className="fiscal-comparison-card__year">Elderly share 2011 → 2031</p>
              <p className="fiscal-comparison-card__value">10.6% → 18.2%</p>
            </div>
            <div className="fiscal-comparison-card">
              <p className="fiscal-comparison-card__year">Old-age dependency 2021 → 2036</p>
              <p className="fiscal-comparison-card__value">20.6 → 32.7</p>
            </div>
          </div>
        </section>

        <footer className="fiscal-close">
          <div className="fiscal-prose mx-auto max-w-2xl text-center !text-white/90">
            <p>
              The real message of the White Paper is not that Tamil Nadu has become
              weak. It is that Tamil Nadu is too strong a State to tolerate weak
              fiscal management.
            </p>
            <p className="mt-4">
              The real test is whether Tamil Nadu can build disciplined welfare: social
              justice funded by clean revenue, efficient spending and honest balance
              sheets.
            </p>
          </div>
          <p className="fiscal-close__quote">
            Every new promise must answer one question: Where is the money?
          </p>
        </footer>

        {published ? (
          <p className="fiscal-published">Published {published} · Economy desk</p>
        ) : null}

        <div className="mt-12 max-w-[var(--fiscal-body-max)]">
          <ArticleCommunityBand />
        </div>
      </div>
    </article>
  );
}
