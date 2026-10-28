import Image from "next/image";
import Link from "next/link";
import {
  VISU_IYER_LISTING_PRICE,
  VISU_IYER_PHONE_DISPLAY,
  VISU_IYER_PHONE_TEL,
  VISU_IYER_POOJAS,
  VISU_IYER_SHRINE_FACE,
  VISU_IYER_SHRINE_FLOWERS,
  VISU_IYER_SHRINE_WIDE,
  VISU_IYER_WHATSAPP_HREF,
} from "@/content/business-profiles/visu-iyer-kolathur";
import { InteriorCrossNav, PageBreadcrumbs } from "@/components/site/interior-chrome";
import styles from "./visu-iyer-kolathur-profile.module.css";

type Props = { className?: string };

const STEPS = [
  {
    ta: "அழைக்க",
    en: `Call ${VISU_IYER_PHONE_DISPLAY}`,
  },
  {
    ta: "காரியம் சொல்ல",
    en: "Marriage, griha pravesam, a homam, or another pooja",
  },
  {
    ta: "அவரிடம் உறுதி செய்ய",
    en: "Date, dakshina, and time, with him",
  },
] as const;

export function VisuIyerKolathurProfile({ className }: Props) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} lang="ta">
      <div className={styles.top}>
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "விசு ஐயர்" },
          ]}
        />
        <nav className={styles.anchors} aria-label="பக்க இணைப்புகள்">
          <a href="#poojai">பூஜைகள்</a>
          <a href="#kolathur">கொளத்தூர்</a>
          <a href="#contact">தொடர்பு</a>
          <a className={styles.navCall} href={VISU_IYER_PHONE_TEL}>
            அழைக்க
          </a>
        </nav>
      </div>

      <div>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>விஷ் அர்ச்சகர் · கொளத்தூர்</p>
            <h1 id="hero-title">விசு ஐயர்</h1>
            <p className={styles.lede}>
              சுப முகூர்த்தம், திருமணம், கிரஹப்பிரவேசம், ஹோமங்கள், இதர பூஜைகள் அனைத்தும்.
            </p>
            <p className={styles.ledeEn} lang="en">
              Visu Iyer. Auspicious muhurtham, marriage, griha pravesam, homams, and other poojas.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.call} href={VISU_IYER_PHONE_TEL}>
                அழைக்க · {VISU_IYER_PHONE_DISPLAY}
              </a>
              <a
                className={styles.whatsapp}
                href={VISU_IYER_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                வாட்ஸ்ஆப்
              </a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroFrame}>
              <Image
                src={VISU_IYER_SHRINE_FLOWERS}
                alt="மலர் அலங்காரத்தில் பூஜை விக்கிரகம்"
                fill
                priority
                sizes="(max-width: 800px) 92vw, 420px"
                className={styles.coverHero}
              />
            </div>
            <ul className={styles.chips}>
              <li>திருமணம்</li>
              <li>கிரஹப்பிரவேசம்</li>
              <li>ஹோமங்கள்</li>
            </ul>
          </div>
        </section>

        <section className={styles.split} id="poojai" aria-labelledby="rites-title">
          <div className={styles.stage}>
            <div className={styles.stageFrame}>
              <Image
                src={VISU_IYER_SHRINE_FACE}
                alt="மலர் மாலையுடன் பூஜை விக்கிரகம்"
                fill
                sizes="(max-width: 800px) 80vw, 340px"
                className={styles.coverFace}
              />
            </div>
          </div>
          <div>
            <h2 id="rites-title">
              அனைத்து சுப காரியங்களும் பூஜைகளும் சிறப்பாக செய்யப்படும்
            </h2>
            <p className={styles.subhead} lang="en">
              All auspicious functions and poojas are performed with care.
            </p>
            <ul className={styles.rows}>
              {VISU_IYER_POOJAS.map((row) => (
                <li key={row.ta}>
                  <span className={styles.mark} aria-hidden="true" />
                  <span>
                    <span className={styles.ta}>{row.ta}</span>
                    <span className={styles.en} lang="en">
                      {row.en}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.presence} id="kolathur" aria-labelledby="place-title">
          <div>
            <h2 id="place-title">ஸ்ரீ பவானி அம்மன் துணை, கொளத்தூர்</h2>
            <p className={styles.invoke}>ஸ்ரீ வரசக்தி விநாயகர் துணை!</p>
            <ul className={styles.facts}>
              <li>
                <span className={styles.ta}>விஷ் அர்ச்சகர்</span>
                <span className={styles.en} lang="en">
                  Vish archakar
                </span>
              </li>
              <li>
                <span className={styles.ta}>இதர பூஜைகள் அனைத்தும்</span>
                <span className={styles.en} lang="en">
                  All other poojas
                </span>
              </li>
              <li>
                <span className={styles.ta}>செல் {VISU_IYER_PHONE_DISPLAY}</span>
                <span className={styles.en} lang="en">
                  Call this number
                </span>
              </li>
            </ul>
          </div>
          <div className={styles.shrine}>
            <Image
              src={VISU_IYER_SHRINE_WIDE}
              alt="பூஜை அலங்காரம், கொளத்தூர்"
              fill
              sizes="(max-width: 800px) 92vw, 480px"
              className={styles.coverWide}
            />
          </div>
        </section>

        <section className={styles.band} id="contact" aria-labelledby="reach-title">
          <h2 id="reach-title">விசு ஐயரை இந்த எண்ணில் தொடர்பு கொள்ளவும்</h2>
          <p className={styles.bandLede} lang="en">
            Contact Visu Iyer on {VISU_IYER_PHONE_DISPLAY}.
          </p>
          <ol className={styles.steps}>
            {STEPS.map((step, index) => (
              <li key={step.ta}>
                <span className={styles.num}>{index + 1}</span>
                <span className={styles.ta}>{step.ta}</span>
                <span className={styles.stepEn} lang="en">
                  {step.en}
                </span>
              </li>
            ))}
          </ol>
          <a className={styles.call} href={VISU_IYER_PHONE_TEL}>
            அழைக்க · {VISU_IYER_PHONE_DISPLAY}
          </a>
        </section>
      </div>

      <footer className={styles.foot}>
        <p>
          <Link href="/contact#advertise">
            உங்கள் கடை அல்லது சேவைக்கும் இதுபோன்ற பக்கம் வேண்டுமா? கட்டண வணிகப் பட்டியல் · ஆண்டு{" "}
            {VISU_IYER_LISTING_PRICE}.
          </Link>
        </p>
        <p className={styles.footEn} lang="en">
          <Link href="/contact#advertise">
            A page like this for your shop or service. Paid business listing · {VISU_IYER_LISTING_PRICE} a year.
          </Link>
        </p>
        <p className={styles.fine}>
          இந்தப் பக்கம் அவரது அட்டையிலிருந்து போடப்பட்ட கட்டணப் பட்டியல். நாள், தட்சணை, நேரம் ஆகியவற்றை விசு ஐயரிடம் உறுதி செய்யுங்கள். mychennaicity.in பூஜை செய்யாது.
        </p>
        <p className={styles.fine} lang="en">
          Paid listing taken from his card. Confirm the date, dakshina, and time with Visu Iyer. mychennaicity.in does not perform the pooja.
        </p>
      </footer>

      <div className={styles.explore}>
        <InteriorCrossNav />
      </div>
    </div>
  );
}
