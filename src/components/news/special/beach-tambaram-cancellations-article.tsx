import type { PublicArticleRow } from "@/domains/news";
import { ArticleCommunityBand } from "@/components/community/article-community-band";
import { SOUTHERN_RAILWAY_TAMBARAM_FAST_EMU_DATA_URI } from "@/content/news/southern-railway-tambaram-fast-emu.base64";
import {
  BEACH_TAMBARAM_CANCELLATIONS_DEK,
  BEACH_TAMBARAM_CANCELLATIONS_H1,
  BEACH_TAMBARAM_PUBLISHED_LABEL,
  FAQ_ITEMS,
  MAINTENANCE_WINDOW,
  SCHEDULE_NOTE,
  kolkataTodayIso,
} from "@/content/special-articles/beach-tambaram-guindy-cancellations-2026";
import {
  AlternativePanel,
  CancellationCalendar,
  CorridorStrip,
  JourneySelector,
  MaintenanceCountdown,
  StationNoteForm,
  TonightBoard,
  TrainChecker,
} from "@/components/news/special/beach-tambaram-cancellations-interactives";

export function BeachTambaramCancellationsArticle({
  article,
}: {
  article: PublicArticleRow;
}) {
  const today = kolkataTodayIso();
  const published =
    article.publishedAt?.toLocaleString("en-IN", {
      dateStyle: "long",
      timeZone: "Asia/Kolkata",
    }) ?? BEACH_TAMBARAM_PUBLISHED_LABEL;

  return (
    <article className="emu-alert local-article">
      <TonightBoard serverToday={today} />

      <header className="emu-alert__hero">
        <p className="emu-alert__eyebrow">Commute alert · Southern Railway</p>
        <h1 data-speakable="article-title">{BEACH_TAMBARAM_CANCELLATIONS_H1}</h1>
        <p className="emu-alert__dek" data-speakable="article-lead">
          {article.dek ?? BEACH_TAMBARAM_CANCELLATIONS_DEK}
        </p>
        <p className="emu-alert__meta">
          Chennai, {published} · mychennaicity.in editorial
        </p>
      </header>

      <aside className="emu-alert__disclaimer">
        <p>
          <strong>Disclaimer.</strong> This is a MyChennaiCity commute desk
          report drawn from the Southern Railway Chennai Division cancellation
          list for maintenance at Guindy. It is not an official railway
          circular. Trains can be restored, held or retimed after this page is
          published. Confirm at the station before you travel.
        </p>
      </aside>

      <TrainChecker serverToday={today} />

      <section className="emu-alert__glance" aria-label="At a glance">
        <h2>At a glance</h2>
        <dl>
          <div>
            <dt>Maintenance location</dt>
            <dd>Guindy railway station</dd>
          </div>
          <div>
            <dt>Engineering block</dt>
            <dd>{MAINTENANCE_WINDOW}</dd>
          </div>
          <div>
            <dt>Block dates</dt>
            <dd>27 September–4 October 2026</dd>
          </div>
          <div>
            <dt>Corridor</dt>
            <dd>Chennai Beach–Tambaram</dd>
          </div>
          <div>
            <dt>Most affected train</dt>
            <dd>11:59 p.m. Beach–Tambaram, 26 September–3 October</dd>
          </div>
        </dl>
      </section>

      <figure className="emu-alert__photo">
        <img
          src={SOUTHERN_RAILWAY_TAMBARAM_FAST_EMU_DATA_URI}
          alt="Southern Railway cream-and-green suburban EMU 078354 with a Tambaram Fast destination board at a Chennai station platform."
          width={1024}
          height={700}
        />
        <figcaption>
          A Southern Railway suburban EMU on the Tambaram side, unit 078354,
          with Tambaram Fast on the destination board. The cab carries SR and
          TBM marks. The photograph shows the kind of train on this corridor.
          It is not a picture of one cancelled run, and the station name is not
          printed in the frame.
        </figcaption>
      </figure>

      <div className="emu-alert__prose">
        <p>
          Late-night passengers on the Chennai Beach–Tambaram line have a
          shorter list of locals this week. Southern Railway’s Chennai Division
          has scheduled an engineering block at Guindy railway station between{" "}
          {MAINTENANCE_WINDOW}, from 27 September through 4 October 2026. The
          work cancels selected EMU suburban services. It does not cancel every
          late-night train on every night.
        </p>

        <h2>Which trains are cancelled?</h2>
        <p>
          The 11:59 p.m. Chennai Beach–Tambaram service is cancelled from 26
          September through 3 October. That is the last southbound suburban
          departure named in this list, so it is the train that matters most
          if you are trying to get to Pallavaram, Chromepet or Tambaram at the
          end of the day.
        </p>
        <p>
          The 8:45 p.m. Tambaram–Chennai Beach service is cancelled on 26, 28,
          29 and 30 September and on 1, 2 and 3 October. Sunday 27 September is
          not in that list.
        </p>
        <p>
          The 11:40 p.m. Tambaram–Chennai Beach service is cancelled on 27
          September only.
        </p>
        <p>
          On Sunday 27 September, the two trains to treat as cancelled are the
          11:40 p.m. from Tambaram and the 11:59 p.m. from Beach. The 8:45 p.m.
          from Tambaram is not among the cancellations published for that date.
          A line that says “late-night trains are cancelled for eight days”
          hides that difference.
        </p>

        <h2>Why Guindy, and why these hours?</h2>
        <p>
          The Chennai Division has cited maintenance at Guindy. The block sits
          after midnight, when fewer passengers are on the move. Guindy is a
          stop on the Beach–Tambaram–Chengalpattu suburban corridor and a
          change point for Guindy Industrial Estate, Anna Salai and the airport
          side of the city. The railway station is also an access point for
          Guindy Metro.
        </p>
        <p>
          Passengers who normally depend on the affected trains should not
          assume the next suburban service will be there. Check whether the
          cancellation applies to the date you are travelling. If you switch to
          Metro, an MTC bus or a road vehicle, leave extra time. If you are
          going on past Chromepet or Tambaram, plan that last leg before you
          reach the station.
        </p>
      </div>

      <section className="emu-alert__section" aria-labelledby="calendar-heading">
        <h2 id="calendar-heading">Full cancellation calendar</h2>
        <CancellationCalendar />
      </section>

      <section className="emu-alert__section" aria-labelledby="route-heading">
        <h2 id="route-heading">Where Guindy sits on the line</h2>
        <p className="emu-alert__section-lead">
          Beach to Tambaram, in running order. Guindy is marked as the
          maintenance station.
        </p>
        <CorridorStrip />
      </section>

      <JourneySelector serverToday={today} />
      <MaintenanceCountdown />
      <AlternativePanel />

      <section className="emu-alert__official">
        <h2>Before you leave</h2>
        <ul>
          <li>Read the latest Southern Railway or Chennai Division advisory.</li>
          <li>Match the advisory to your date. The three trains do not share one set of nights.</li>
          <li>Allow time if you change to Metro, MTC, an auto or a taxi.</li>
          <li>
            Regular working is expected after the block. The published window
            ends at 2:45 a.m. on 4 October. That clock is not the same thing as
            a notice that every local is back.
          </li>
        </ul>
        <p>{SCHEDULE_NOTE}</p>
        <p>
          <a href="https://sr.indianrailways.gov.in/">Southern Railway</a>
        </p>
      </section>

      <StationNoteForm />

      <section className="emu-alert__faq" id="interactive-heading" aria-labelledby="faq-heading">
        <h2 id="faq-heading">FAQ</h2>
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} open>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>

      <aside className="emu-alert__fineprint">
        <p>
          <strong>Fine print.</strong> This report was prepared with
          AI-assisted drafting and human editorial review. AI tools can err.
          Cross-check the train, the date and the station announcement with
          Southern Railway before you act on them. The photograph is embedded
          in this page from a file held by the desk. It shows suburban unit
          078354 with a Tambaram Fast board. It does not document a particular
          cancelled working.
        </p>
      </aside>

      <p className="emu-alert__updated">
        Last updated {BEACH_TAMBARAM_PUBLISHED_LABEL}, from the Chennai Division
        list available to this desk that morning.
      </p>

      <ArticleCommunityBand />
    </article>
  );
}
