import Image from "next/image";
import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import { ArticleCommunityBand } from "@/components/community/article-community-band";
import {
  YOGA_DAY_2026_H1,
  YOGA_DAY_BEACH_IMAGE,
  YOGA_DAY_CMRL_EVENT_IMAGE,
  YOGA_DAY_FAMILY_IMAGE,
  YOGA_DAY_HERO_IMAGE,
  YOGA_DAY_INDIA_SESSION_IMAGE,
  YOGA_DAY_SENIOR_IMAGE,
  YOGA_DAY_WORKPLACE_IMAGE,
  yogaDayFactRibbon,
  yogaDayFaq,
  yogaDayLocalRelevance,
  yogaDayToc,
  yogaDayUsefulLinks,
} from "@/content/special-articles/international-yoga-day-2026-chennai";

function ArticleFigure({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="yoga-day-article__figure">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-auto w-full"
        sizes="(max-width: 768px) 100vw, 780px"
        priority={priority}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function LocalRelevanceGrid() {
  return (
    <>
      <h3 className="yoga-day-grid-heading">How Yoga Fits Chennai Life</h3>
      <div className="yoga-day-local-grid" aria-label="How yoga fits Chennai life">
        {yogaDayLocalRelevance.map((card) => (
          <div key={card.title} className="yoga-day-local-card">
            <p className="yoga-day-local-card__icon" aria-hidden>
              {card.icon}
            </p>
            <p className="yoga-day-local-card__title">{card.title}</p>
            <p className="yoga-day-local-card__line">
              <strong>Problem:</strong> {card.problem}
            </p>
            <p className="yoga-day-local-card__line">
              <strong>Benefit:</strong> {card.benefit}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function SafetyNote() {
  return (
    <aside className="yoga-day-safety" aria-label="Safety note for senior citizens">
      <p className="yoga-day-safety__title">Safety Note for Senior Citizens</p>
      <p className="yoga-day-safety__text">
        Senior citizens with chronic illness, heart conditions, vertigo, recent
        surgery, severe arthritis, or uncontrolled blood pressure should practise
        only after medical advice and under qualified guidance. Avoid forced
        postures.
      </p>
    </aside>
  );
}

function CmrlEventCallout() {
  return (
    <aside className="yoga-day-event-callout" aria-label="Chennai Metro Yoga Day event">
      <p className="yoga-day-event-callout__eyebrow">Chennai local event</p>
      <p className="yoga-day-event-callout__title">
        CMRL × Rotary Club of Madras North — International Yoga Day 2026
      </p>
      <div className="yoga-day-event-callout__details">
        <p>
          <strong>Venue:</strong> Thiru.Vi.Ka.Park-Amphitheatre, Shenoy Nagar Metro
          Station
        </p>
        <p>
          <strong>Date:</strong> Saturday, 21 June 2026
        </p>
        <p>
          <strong>Batch 1:</strong> 6:00 AM – 6:45 AM
        </p>
        <p>
          <strong>Batch 2:</strong> 7:00 AM – 7:45 AM
        </p>
      </div>
      <figure className="yoga-day-event-callout__poster">
        <Image
          src={YOGA_DAY_CMRL_EVENT_IMAGE}
          alt="Chennai Metro Rail and Rotary Club of Madras North announce International Yoga Day 2026 sessions at Shenoy Nagar Metro Station amphitheatre."
          width={900}
          height={900}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 780px"
        />
      </figure>
      <p className="mt-3 text-sm text-[var(--yoga-text-muted)]">
        Public sessions like this show how Chennai can extend Yoga Day beyond a
        single morning — see more{" "}
        <Link href="/chennai-local-events">Chennai events</Link> on MyChennaiCity.
      </p>
    </aside>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="yoga-day-faq" aria-labelledby="yoga-day-faq-heading">
      <h2 id="yoga-day-faq-heading" className="yoga-day-faq__title">
        Frequently asked questions
      </h2>
      <div className="yoga-day-faq__list">
        {yogaDayFaq.map((item) => (
          <div key={item.question} className="yoga-day-faq__item">
            <p className="yoga-day-faq__question">{item.question}</p>
            <p className="yoga-day-faq__answer">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function UsefulLinks() {
  return (
    <nav className="yoga-day-links" aria-label="Useful Chennai links">
      <p className="yoga-day-links__title">Useful Chennai Links</p>
      <ul className="yoga-day-links__list">
        {yogaDayUsefulLinks.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function YogaDay2026Article({ article }: { article: PublicArticleRow }) {
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
    <article className="yoga-day-article local-article">
      <header className="yoga-day-article__header">
        <p className="yoga-day-article__category">Health &amp; Wellness</p>
        <h1 className="yoga-day-article__title" data-speakable="article-title">
          {YOGA_DAY_2026_H1}
        </h1>
        {article.summary ? (
          <p className="yoga-day-article__excerpt" data-speakable="article-lead">
            {article.summary}
          </p>
        ) : null}
        <p className="yoga-day-article__meta">
          {published ? <>Published {published}</> : null}
          {published && updated ? " · " : null}
          {updated ? <>Updated {updated}</> : null}
          {" · "}
          MyChennaiCity Editorial Team
        </p>

        <figure className="yoga-day-article__hero">
          <Image
            src={YOGA_DAY_HERO_IMAGE}
            alt="People practising yoga near a beach during sunrise for International Yoga Day 2026 in Chennai."
            width={1200}
            height={675}
            priority
            decoding="async"
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 780px"
          />
          <figcaption>
            Chennai can turn International Yoga Day into a daily wellness habit
            across beaches, homes, offices, and communities.
          </figcaption>
        </figure>

        <section className="yoga-day-fact-ribbon" aria-label="Yoga Day 2026 facts">
          {yogaDayFactRibbon.map((item) => (
            <div key={item.label} className="yoga-day-fact-ribbon__item">
              <p className="yoga-day-fact-ribbon__label">{item.label}</p>
              <p className="yoga-day-fact-ribbon__value">{item.value}</p>
            </div>
          ))}
        </section>

        <nav className="yoga-day-toc" aria-label="Table of contents">
          <p className="yoga-day-toc__title">On this page</p>
          <ol className="yoga-day-toc__list">
            {yogaDayToc.map((entry) => (
              <li key={entry.id}>
                <a href={`#${entry.id}`}>{entry.label}</a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <div className="yoga-day-body">
        <div className="yoga-day-prose">
          <p>
            Every year, June 21 brings a powerful image across India: people
            gathering in public grounds, parks, beaches, schools, offices,
            community halls, and homes to practise yoga together. International
            Yoga Day has become one of India&apos;s most visible wellness
            contributions to the world. But in 2026, the message has become more
            practical and urgent.
          </p>
          <p>
            The theme for International Yoga Day 2026 is{" "}
            <strong>&ldquo;Yoga for Healthy Ageing.&rdquo;</strong>
          </p>
          <p>
            That theme matters because modern life is making people physically
            inactive earlier, mentally tired faster, and more dependent on
            medicines, screens, and irregular routines. Back pain, neck stiffness,
            poor sleep, stress, anxiety, obesity, diabetes risk, breathing
            weakness, and low mobility are no longer problems seen only in old
            age. They are increasingly visible among students, office workers,
            entrepreneurs, homemakers, and senior citizens.
          </p>
          <p>
            For Chennai, this is not a distant national theme. It is a local public
            health opportunity.
          </p>
          <p>
            Chennai is a city of long commutes, intense education pressure, IT
            corridor work routines, humid weather, dense apartment living, growing
            senior populations, and screen-heavy lifestyles. Yoga Day gives the city
            a chance to pause and ask a direct question: should yoga remain a
            one-day public event, or should it become a practical daily habit?
          </p>
          <p>
            The answer is clear. Chennai should not just celebrate Yoga Day.
            Chennai should continue it.
          </p>

          <h2 id="why-june-21">Why June 21 Became International Yoga Day</h2>
          <p>
            International Yoga Day is observed globally on June 21. The date became
            internationally recognised after the United Nations adopted the proposal
            in 2014, and the first International Yoga Day was celebrated in 2015.
          </p>
          <p>
            The day has since grown into a worldwide wellness movement. It connects
            India&apos;s ancient knowledge system with modern concerns such as
            preventive healthcare, stress management, mobility, mental calmness, and
            community well-being.
          </p>
          <p>
            Yoga is not just a fitness routine. At its core, it combines posture,
            breath, balance, attention, discipline, and stillness. It supports the
            body, but it also trains the mind to slow down, focus, and recover.
          </p>
          <p>For a fast-moving city like Chennai, that combination is valuable.</p>

          <ArticleFigure
            src={YOGA_DAY_INDIA_SESSION_IMAGE}
            alt="Participants performing yoga together during an International Yoga Day public session in India."
            width={900}
            height={600}
            caption="International Yoga Day has grown from an Indian wellness tradition into a global public health movement."
          />

          <h2 id="theme-yoga-for-healthy-ageing">
            2026 Theme: Yoga for Healthy Ageing
          </h2>
          <p>
            The 2026 theme, <strong>Yoga for Healthy Ageing</strong>, is not meant
            only for elderly people. It speaks to everyone.
          </p>
          <p>Healthy ageing does not begin at 60. It begins much earlier.</p>
          <p>
            A student who sleeps late, sits for long hours, and lives under exam
            pressure is already shaping future health. An IT professional spending
            eight to ten hours in front of a laptop is already training the spine,
            eyes, neck, and nervous system in the wrong direction. A middle-aged
            resident ignoring stiffness, poor breathing, weight gain, and stress is
            already allowing small problems to grow into permanent limitations.
          </p>
          <p>Yoga helps because it is simple, adaptable, and preventive.</p>
          <p>It can support:</p>
          <ul>
            <li>flexibility</li>
            <li>balance</li>
            <li>posture</li>
            <li>breathing</li>
            <li>joint mobility</li>
            <li>stress reduction</li>
            <li>sleep quality</li>
            <li>emotional steadiness</li>
            <li>body awareness</li>
            <li>senior independence</li>
          </ul>
          <p>
            The most important word here is not &ldquo;yoga.&rdquo; It is
            &ldquo;daily.&rdquo;
          </p>
          <p>
            One public event can create awareness. Daily practice creates change.
          </p>

          <ArticleFigure
            src={YOGA_DAY_SENIOR_IMAGE}
            alt="Senior citizens practising gentle yoga for healthy ageing and mobility."
            width={900}
            height={600}
            caption="The 2026 theme highlights yoga's role in mobility, balance, breathing, and independent ageing."
          />

          <h2 id="why-chennai-needs-yoga">Why Chennai Needs a Daily Yoga Culture</h2>
          <p>
            Chennai already has the foundation for a strong yoga culture. The city
            wakes up early. Marina Beach, Elliot&apos;s Beach, neighbourhood parks,
            temple streets, walking tracks, school grounds, and apartment corridors
            are already used by walkers, runners, cycling groups, and senior
            citizens.
          </p>
          <p>Yoga can naturally become part of this culture.</p>
          <p>
            For <strong>IT professionals</strong> in OMR, Guindy, Taramani,
            Ambattur, and other business zones, yoga can help counter long sitting
            hours, screen fatigue, shoulder stiffness, back pain, and workplace
            stress.
          </p>
          <p>
            For <strong>students</strong>, yoga can support concentration,
            discipline, breathing control, emotional balance, and exam-time
            stability.
          </p>
          <p>
            For <strong>senior citizens</strong>, it can support mobility,
            confidence, balance, breathing, and social connection.
          </p>
          <p>
            For <strong>homemakers and caregivers</strong>, it can provide a
            personal reset space in the middle of household responsibilities.
          </p>
          <p>
            For <strong>apartment communities</strong>, yoga can become a
            low-cost, high-participation wellness activity.
          </p>
          <p>
            For <strong>schools and colleges</strong>, it can become a preventive
            health discipline, not just an annual display.
          </p>
          <p>
            Chennai does not need to treat Yoga Day as a ceremonial photo
            opportunity. The city should use it as a trigger to build repeatable
            local wellness habits — and connect with the wider{" "}
            <Link href="/chennai-local-events">Chennai events</Link> calendar and{" "}
            <Link href="/chennai-whatsapp-group">Chennai local community</Link> for
            ongoing wellness updates.
          </p>

          <LocalRelevanceGrid />

          <h2 id="daily-practice">From One-Day Event to 365-Day Practice</h2>
          <p>
            A common weakness of awareness days is that they create one day of
            activity and then disappear. Yoga Day should not become that.
          </p>
          <p>For Chennai, the stronger model is simple:</p>
          <ul>
            <li>
              <strong>Schools</strong> can begin with five minutes of breathing and
              stretching before classes.
            </li>
            <li>
              <strong>Colleges</strong> can conduct weekly yoga and mindfulness
              sessions for students dealing with academic pressure.
            </li>
            <li>
              <strong>IT companies</strong> can introduce short desk-yoga breaks
              during long workdays.
            </li>
            <li>
              <strong>Apartment associations</strong> can organise weekend morning
              yoga for residents.
            </li>
            <li>
              <strong>Public parks</strong> can support community-led open yoga
              circles.
            </li>
            <li>
              <strong>Senior citizen groups</strong> can conduct chair-assisted and
              balance-focused sessions.
            </li>
            <li>
              <strong>Local health centres</strong> can connect yoga with
              preventive health awareness.
            </li>
          </ul>
          <p>
            This is how Yoga Day becomes useful. Not by doing one large event, but
            by converting one event into a habit system.
          </p>

          <ArticleFigure
            src={YOGA_DAY_WORKPLACE_IMAGE}
            alt="Office workers doing simple yoga stretches to reduce screen fatigue and workplace stress."
            width={900}
            height={600}
            caption="For Chennai's working population, short daily yoga breaks can counter long sitting hours and stress."
          />

          <h2 id="working-population">Yoga for Chennai&apos;s Working Population</h2>
          <p>
            The average urban worker faces a silent health problem: too much
            sitting, too much screen time, and too little recovery.
          </p>
          <p>
            A normal workday may include two-wheeler or car travel, traffic delays,
            office sitting, mobile calls, late laptop work, irregular meals, and
            poor sleep. Over time, this affects the neck, shoulders, spine, hips,
            knees, breathing, mood, and focus.
          </p>
          <p>Yoga does not need to be complicated to help.</p>
          <p>A practical 15-minute routine can include:</p>
          <ul>
            <li>neck rotations</li>
            <li>shoulder rolls</li>
            <li>wrist and ankle movements</li>
            <li>cat-cow stretch</li>
            <li>gentle forward bend</li>
            <li>seated spinal twist</li>
            <li>slow breathing</li>
            <li>short relaxation</li>
          </ul>
          <p>
            The purpose is not performance. The purpose is consistency.
          </p>
          <p>
            For most people, yoga should not begin with difficult postures. It
            should begin with awareness: breathe better, sit better, move better,
            sleep better, and reduce stiffness before it becomes pain.
          </p>

          <h2 id="senior-citizens">Yoga for Senior Citizens in Chennai</h2>
          <p>
            The theme &ldquo;Yoga for Healthy Ageing&rdquo; becomes most meaningful
            when applied to senior citizens.
          </p>
          <p>
            Chennai has many elderly residents living independently, living with
            families, or spending long hours alone while younger family members are
            at work. For them, healthy ageing is not only about avoiding disease.
            It is about continuing to walk, sit, bend, breathe, sleep, visit
            neighbours, attend family functions, and remain emotionally connected.
          </p>
          <p>
            Gentle yoga can help senior citizens maintain confidence in daily
            movement.
          </p>
          <p>Useful formats include:</p>
          <ul>
            <li>chair yoga</li>
            <li>wall-supported stretches</li>
            <li>slow breathing practice</li>
            <li>simple hand and leg movements</li>
            <li>balance training</li>
            <li>guided relaxation</li>
            <li>group practice for social connection</li>
          </ul>
          <p>
            Safety is important. Senior citizens with heart conditions, vertigo,
            severe arthritis, recent surgery, uncontrolled blood pressure, or
            chronic illness should follow medical advice and practise under
            qualified supervision.
          </p>
          <p>
            Yoga should support independence. It should never become a forced
            performance.
          </p>

          <SafetyNote />

          <h2 id="chennai-yoga-spaces">Chennai&apos;s Natural Yoga Spaces</h2>
          <p>
            Chennai has a strong advantage: it already has spaces where community
            wellness can happen.
          </p>
          <p>
            Marina Beach and Elliot&apos;s Beach are natural sunrise yoga locations.
            Neighbourhood parks in Anna Nagar, Besant Nagar, Mylapore, T. Nagar,
            Adyar, Velachery, Nanganallur, Tambaram, Porur, and other areas can
            support regular yoga groups. Schools and colleges can open grounds for
            guided sessions. Apartment communities can use terraces, halls, and
            common spaces.
          </p>
          <p>The city does not need to build wellness spaces from zero. Many spaces already exist.</p>
          <p>What is needed is:</p>
          <ul>
            <li>regular timing</li>
            <li>safe instruction</li>
            <li>resident participation</li>
            <li>community coordination</li>
            <li>simple routines</li>
            <li>continuity after June 21</li>
          </ul>
          <p>
            Yoga Day should become the starting point, not the finish line.
          </p>

          <CmrlEventCallout />

          <ArticleFigure
            src={YOGA_DAY_BEACH_IMAGE}
            alt="Sunrise view at a Chennai beach representing outdoor yoga spaces for the city."
            width={900}
            height={506}
            caption="Chennai's beaches, parks, terraces, and community halls can become regular wellness spaces beyond Yoga Day."
          />

          <h2 id="family-yoga">How Families Can Start at Home</h2>
          <p>
            Families do not need to wait for a large event or formal class to begin
            yoga.
          </p>
          <p>A simple home routine can start with 15 minutes:</p>
          <ol>
            <li>Two minutes of quiet sitting</li>
            <li>Three minutes of slow breathing</li>
            <li>Five minutes of gentle stretching</li>
            <li>Three minutes of basic postures</li>
            <li>Two minutes of relaxation</li>
          </ol>
          <p>
            This can be done in the morning before school and work, or in the
            evening after returning home.
          </p>
          <p>
            Children learn discipline. Parents reduce stress. Grandparents
            participate through simple seated movements. Families get a shared
            health routine that does not require equipment or spending.
          </p>
          <p>The most useful yoga habit is the one that can be repeated.</p>

          <ArticleFigure
            src={YOGA_DAY_FAMILY_IMAGE}
            alt="Family practising simple yoga at home as part of a daily wellness routine."
            width={900}
            height={600}
            caption="Yoga Day becomes meaningful when families continue the practice at home."
          />

          <h2 id="chennai-this-yoga-day">What Chennai Should Do This Yoga Day</h2>
          <p>
            This International Yoga Day, Chennai residents can take one practical
            pledge: do not stop with June 21.
          </p>
          <p>
            Join a local session. Attend a beach yoga event. Participate in an
            apartment programme. Encourage a school, office, college, or community
            group to conduct a simple session. Practise at home if nothing else is
            possible.
          </p>
          <p>But after the public celebration ends, continue the habit.</p>
          <ul>
            <li>Start with 10 minutes a day.</li>
            <li>Keep it simple.</li>
            <li>Avoid comparison.</li>
            <li>Avoid forcing difficult postures.</li>
            <li>
              Focus on breathing, mobility, posture, balance, calmness, and
              consistency.
            </li>
          </ul>
          <p>
            Yoga&apos;s real value is not in a single photograph from a public
            event. Its value is in what happens quietly every morning when one
            person chooses health over neglect.
          </p>

          <div className="yoga-day-close">
            <p>
              International Yoga Day 2026 is not just another awareness day. With
              the theme <strong>Yoga for Healthy Ageing</strong>, it gives Chennai
              a direct reminder: health is built before illness begins.
            </p>
            <p>
              A city that works hard also needs to recover well. A city that grows
              fast must also age well. A city that celebrates tradition must also
              convert tradition into daily practice.
            </p>
            <p>
              For Chennai, Yoga Day is not only about India&apos;s global pride. It
              is about every resident choosing a healthier body, a steadier mind, and
              a more balanced life.
            </p>
            <p className="yoga-day-close__emphasis">
              This June 21, Chennai should not just celebrate yoga. Chennai should
              continue it.
            </p>
          </div>
        </div>

        <FaqSection />
        <UsefulLinks />

        <p className="yoga-day-published">
          {published ? <>Published {published}</> : null}
          {" · "}
          Category: Health &amp; Wellness
          {" · "}
          Tags: International Yoga Day 2026, Chennai Yoga Day, Yoga for Healthy
          Ageing, Chennai Wellness
        </p>

        <div className="mt-10">
          <ArticleCommunityBand />
        </div>
      </div>
    </article>
  );
}
