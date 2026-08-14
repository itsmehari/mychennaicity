/**
 * Lead Tamil twins (4) + weekend/Monday watch desk (EN + TA).
 * Natural Tamil — not a literal dump of the English week desk.
 */
import type { WeekDeskArticle } from "./chennai-week-desk-august-2026";

const TAX_EN = "/chennai-local-news/gcc-suspends-property-tax-reassessment-august-2026";
const TAX_TA = `${TAX_EN}-tamil`;
const RAIN_EN =
  "/chennai-local-news/chennai-mayor-el-nino-50cm-northeast-monsoon-warning-august-2026";
const RAIN_TA = `${RAIN_EN}-tamil`;
const METRO_EN =
  "/chennai-local-news/cmrl-water-metro-ennore-mahabalipuram-feasibility-august-2026";
const METRO_TA = `${METRO_EN}-tamil`;
const IDAY_EN =
  "/chennai-local-news/chennai-independence-day-2026-security-airport-red-zone";
const IDAY_TA = `${IDAY_EN}-tamil`;
const WATCH_EN =
  "/chennai-local-news/chennai-weekend-watch-independence-day-tax-rain-monday-august-2026";
const WATCH_TA = `${WATCH_EN}-tamil`;

const TAX_CHECK = "/guides/chennai-property-tax-checklist";
const TODAY = "/chennai-today";
const TODAY_TA = "/chennai-today-tamil";
const EVENTS = "/chennai-local-events";

const DISCLAIMER_TA = `## பொறுப்புத்துறப்பு (Disclaimer)

இது சென்னை வாசகர்களுக்கான **குடிமை இதழியல்**. **8–14 ஆகஸ்ட் 2026** வாரப் பத்திரிகை அறிக்கைகளையும் அதிகாரப்பூர்வ அறிக்கைகளையும் சுருக்குகிறது. இது ஜிசிசி / சிஎம்ஆர்எல் / காவல் / சுங்கத் துறையின் **அதிகாரப்பூர்வ அறிவிப்பு அல்ல**. எண்கள் மாறலாம். பணம் செலுத்துவதற்கு அல்லது பயணத்திற்கு முன் அந்த அமைப்பின் தளத்தில் உறுதிப்படுத்துங்கள்.`;

const FINE_TA = `## நுண்ணெழுத்து — செயற்கை நுண்ணறிவு உதவியுடன்

இக்கட்டுரை **செயற்கை நுண்ணறிவு உதவியுடன்** வரைவு செய்யப்பட்டு மனித ஆசிரியர் பார்வையில் வெளியிடப்பட்டது.
செயற்கை நுண்ணறிவு தவறலாம் — இணைக்கப்பட்ட முதன்மை ஆதாரங்களைச் சரிபார்த்து செயல்படுங்கள்.`;

const DISCLAIMER_EN = `## Disclaimer

This article is **civic journalism** for Chennai readers. It is a **weekend/Monday watch list**, not an official GCC, police, or airport notice. What actually happened on 15–17 August will be updated on this desk after primary reports land. Verify closures and tax figures on official channels before you travel or pay.`;

const FINE_EN = `## Fine print — AI-assisted authoring

This report was prepared with **AI-assisted news authoring** and human editorial review.
AI tools can err — cross-check official notices before you act.`;

function faq(items: { question: string; answer: string }[], extra?: Record<string, unknown>) {
  return { type: "faq", items, ...extra };
}

export const CHENNAI_WEEK_LEAD_TAMIL_AND_WATCH: WeekDeskArticle[] = [
  {
    slug: "gcc-suspends-property-tax-reassessment-august-2026-tamil",
    title:
      "3.49 லட்சம் அறிவிப்புகளுக்குப் பிறகு ஜிசிசி சொத்து வரி மறுமதிப்பீட்டை நிறுத்தியது",
    summary:
      "13 ஆகஸ்ட் 2026 அன்று சென்னை மாநகராட்சி மறுமதிப்பீட்டை உடனடியாக நிறுத்தியது. பழைய வரி திரும்பும்; ஏற்கெனவே அதிகம் செலுத்திய தொகை அடுத்த அரையாண்டுகளுக்கு முன்பணம். மேயர்: சபை கலந்தாலோசிக்கப்படவில்லை.",
    dek: "பண மேசை — அறிவிப்பு வந்தால், செலுத்திவிட்டால், இன்னும் பழைய தொகை நிலுவையில் இருந்தால் என்ன செய்வது.",
    category: "Consumer",
    featured: true,
    publishedAt: "2026-08-14T16:00:00.000+05:30",
    heroImageUrl:
      "/images/articles/chennai-gcc-competitive-tenders-civic-works-savings-2026.jpg",
    sourceUrl:
      "https://www.thehindu.com/news/cities/chennai/greater-chennai-corporation-puts-property-tax-revision-on-hold/article71342046.ece",
    sourceName:
      "ஜிசிசி ஆணையர் அறிக்கை — இந்து, டைம்ஸ் ஆஃப் இந்தியா, புதிய இந்தியன் எக்ஸ்பிரஸ், டிடி நெக்ஸ்ட்",
    authorByline: "mychennaicity.in editorial",
    areaHubSlug: null,
    reportBody: `## முக்கியப் புள்ளிகள்

- **13 ஆகஸ்ட் 2026**: ஆணையர் **ஜி.எஸ். சமீரன்** சொத்து வரி **மறுமதிப்பீட்டை** உடனடியாக நிறுத்தினார்.
- வரி **திருத்தத்திற்கு முந்தைய** தொகைக்கு திரும்பும். அதிகமாகச் செலுத்தியால் அது **முன்பணம்** — உடனடி பணத் திரும்பப்பெறல் அல்ல.
- சுமார் **14–14.5 லட்சம்** மதிப்பீடுகளில் **3.49 லட்சம்** அறிவிப்புகள். சில வீடுகளில் **400%** வரை உயர்வு. வியாழக்கிழமை வரை சுமார் **30,520** பேர் ~**₹11.10 கோடி** செலுத்தினர்.
- ஜிசிசி இதை **குறைவாக மதிப்பிடப்பட்ட** சொத்து திருத்தம் என்றது; பொதுவான வரி விகித உயர்வு அல்ல. **2025–26 இரண்டாம் அரையாண்டு** முதல் அமல் என இருந்தது. மேயர் **ஆர். பிரியா**: **தேர்ந்தெடுக்கப்பட்ட சபை கலந்தாலோசிக்கப்படவில்லை**.

[English version](${TAX_EN})

${DISCLAIMER_TA}

## என்ன நடந்தது

மனுக்கள், சமூக ஊடக அறிவிப்புப் படங்கள், மண்டல துணை ஆணையர் அலுவலக வரிசைகளுக்குப் பிறகு ஜிசிசி நிறுத்தியது. செலுத்திய எண்ணிக்கை (**28,382** vs **30,520**) மற்றும் தொகை (**₹11.10** vs **₹11.42 கோடி**) பத்திரிகைகளில் சிறிது வேறுபடுகிறது. டிடி நெக்ஸ்ட் ஆண்டுக்கு **₹170 கோடி** என எதிர்பார்த்ததாகக் கூறியது.

## வரலாறு

தமிழ்நாட்டு உள்ளாட்சி வரி பணவீக்கத்தைப் பின்தொடரவில்லை என்ற வாதம் பழையது. ஜிஐஎஸ் மற்றும் சுய அறிவிப்பு “குறை மதிப்பீடு” எனக் கொடியிட்டன — விலகல் இல்லாத வீடுகளும் அறிவிப்பு பெற்றதாகக் குடியிருப்பாளர்கள் சொன்னார்கள். **செப்டம்பர் 30**க்குள் செலுத்தி மேல்முறையீடு செய்யும் அழுத்தம் (TOI) அதிர்ச்சியைக் கூட்டியது.

## என்ன செய்வது

1. அறிவிப்பு + ரசீதை வைத்திருங்கள்.
2. அதிகம் செலுத்தியிருந்தால், திரும்பப்பெறல் சுற்றறிக்கை வரும் வரை **முன்பணம்** என எண்ணுங்கள்.
3. வாட்ஸ்அப் “புதிய வரி அட்டவணை”யை நம்ப வேண்டாம். [சொத்து வரி சரிபார்ப்புப் பட்டியல்](${TAX_CHECK}) பார்த்து அதிகாரப்பூர்வ தளத்தில் உறுதிப்படுத்துங்கள்.
4. வார இறுதிச் சரிபார்ப்பு: [திங்கள் கண்காணிப்பு மேசை](${WATCH_TA})

${FINE_TA}`,
    analysisBody: `## ஏன் முக்கியம்

சொத்து வரிதான் வடிகால், சாலை, வெள்ளப் பம்புகளுக்குப் பணம். நிறுத்தம் வீட்டுப் பணத்தையும் மாநகராட்சி பற்றாக்குறையையும் இரண்டும் தொடர்புபடுத்துகிறது.

- [ஆங்கிலக் கட்டுரை](${TAX_EN})
- [சென்னை இன்று](${TODAY_TA})
- [சுதந்திர தினப் பாதுகாப்பு](${IDAY_TA})`,
    interactiveJson: faq([
      {
        question: "நகரம் முழுவதும் வரி விகிதம் உயர்த்தப்பட்டதா?",
        answer:
          "ஜிசிசி இதை குறை மதிப்பீடு திருத்தம் என்றது. ஆனால் பலருக்கு பெரும் உயர்வு தெரிந்தது. இப்போது முழுப் பயிற்சியும் நிறுத்தப்பட்டு பழைய தொகை திரும்பும்.",
      },
      {
        question: "அதிகமாகச் செலுத்திவிட்டேன். பணம் திரும்புமா?",
        answer:
          "13 ஆகஸ்ட் அறிக்கையில் உடனடி பணத் திரும்பப்பெறல் இல்லை. அதிகத் தொகை அடுத்த அரையாண்டுகளுக்கு முன்பணம். ரசீதை வைத்திருங்கள்.",
      },
      {
        question: "செப்டம்பர் 30க்குள் செலுத்த வேண்டுமா?",
        answer:
          "அதிகாரப்பூர்வ தளத்தில் தெரியும் **பழைய** தொகையை மட்டும் செலுத்துங்கள். தளம் இன்னும் உயர்ந்த எண்ணைக் காட்டினால் மண்டல வருவாய் அலுவலகத்திற்கு 13 ஆகஸ்ட் அறிக்கையுடன் செல்லுங்கள்.",
      },
    ]),
  },
  {
    slug: "chennai-mayor-el-nino-50cm-northeast-monsoon-warning-august-2026-tamil",
    title:
      "எல் நினோவில் ஒரு மழையிலேயே 50 செ.மீ. வரலாம் — மேயர் எச்சரிக்கை; 294 வெள்ளப் புள்ளிகள்",
    summary:
      "மேயர் ஆர். பிரியா வடகிழக்கு பருவமழையில் ஒரு அலையில் 50 செ.மீ.க்கு மேல் பெய்யக்கூடும் என்றார். ஜிசிசி 294 தேங்கும் இடங்களை வரைந்தது; சோழிங்கனல்லூரில் 76. கால்வாய் தூர்வாருதல் இந்த ஆண்டு தாமதம்.",
    dek: "காலநிலை மேசை — ஆயிரக்கணக்கான கோடி வடிகால் இருந்தும் ஒரு கனமழை ஏன் தென்/வட சென்னையை உடைக்கிறது.",
    category: "Chennai",
    featured: true,
    publishedAt: "2026-08-14T16:10:00.000+05:30",
    heroImageUrl:
      "/images/articles/chennai-wrd-5000-crore-water-security-project-cma.webp",
    sourceUrl:
      "https://www.thehindu.com/news/cities/chennai/el-nino-could-bring-over-50-cm-of-rain-says-chennai-mayor-as-gcc-races-to-complete-canal-improvement-works/article71314475.ece",
    sourceName: "இந்து — மேயர் ஆர். பிரியா நேர்காணல், ஆகஸ்ட் 2026",
    authorByline: "mychennaicity.in editorial",
    areaHubSlug: "omr-perungudi-sholinganallur",
    reportBody: `## முக்கியப் புள்ளிகள்

- மேயர் **ஆர். பிரியா**: **எல் நினோ** காரணமாக **ஒரே அலையில் 50 செ.மீ.க்கு மேல்** பெய்யக்கூடும்.
- கடந்த ஆண்டு தரவின் அடிப்படையில் **294** தேங்கும் / தாழ்வான இடங்கள்: **சோழிங்கனல்லூர் 76**, **ராயபுரம் 31**, **அடையார் 26**. **ஆலந்தூர்** பட்டியலில் **பூஜ்யம்**.
- 33 கால்வாய்களில் **21** முன்னேற்றம்; **ஆகஸ்ட் 1** நிலவரப்படி நடப்பு தொகுப்பில் **10,529 மீ**-ல் **8,985 மீ** முடிவு.
- வழக்கமாக **ஜூன்** தூர்வாருதல்; இந்த ஆண்டு டெண்டர் **ஜூலை**, பணி **ஆகஸ்ட்** — மேயர் இதைத் தாமதம் என்றார்.
- அண்ணா நகர், தேனாம்பேட்டை, அடையார் **மெட்ரோ பணித்தளங்கள்**; மணலி **புழல் உபரி**. **115** மோட்டார்கள்; **10** இடங்களில் சம்பு.

[English version](${RAIN_EN})

${DISCLAIMER_TA}

## வரலாறு

**2015, 2021, 2023** மற்றும் கடந்த பருவ வெள்ளம் — பெருங்குடி–சோழிங்கனல்லூர், வடக்கு கடற்கரை வார்டுகள். வடிகால் செலவு **₹5,000 கோடி**யைத் தாண்டியும், இடைவெளி, மெட்ரோ குழி, தாமதத் தூர்வாருதல்தான் 20 செ.மீ. இரவைத் தீர்மானிக்கிறது.

வீரங்கால் ஓடை, ஓட்டேரி நல்லா, விருகம்பாக்கம் கால்வாய் ஜிசிசி ஆண்டு பராமரிப்பில் — மேயர் சொல்: **ஒரு ஆண்டு சுத்தம் நிரந்தரத் தீர்வல்ல**.

${FINE_TA}`,
    analysisBody: `## இது இன்றைய வானிலை அல்ல

50 செ.மீ. என்பது **தயாரிப்புக் காட்சி**. உங்கள் தெரு இன்றிரவு மூழ்கும் என்ற முன்னறிவிப்பு அல்ல.

- [ஆங்கிலம்](${RAIN_EN})
- [வாட்டர் மெட்ரோ](${METRO_TA})
- [திங்கள் கண்காணிப்பு](${WATCH_TA})
- [சென்னை இன்று](${TODAY_TA})`,
    interactiveJson: faq([
      {
        question: "இந்தப் பருவத்தில் 50 செ.மீ. உறுதியா?",
        answer:
          "இல்லை. மேயர் நிபுணர் கவலையைச் சொன்னார். தயாரிப்புக் காட்சியாக எடுங்கள்; தேதியிட்ட முன்னறிவிப்பல்ல.",
      },
      {
        question: "என் பகுதி 294 புள்ளிகளில் இருக்கிறதா?",
        answer:
          "சோழிங்கனல்லூரில் அதிகம் (76). முழுப் பட்டியல் ஜிசிசி செயல்பாட்டு வரைபடம் — மண்டல அலுவலகத்தில் கேளுங்கள்.",
      },
    ]),
  },
  {
    slug: "cmrl-water-metro-ennore-mahabalipuram-feasibility-august-2026-tamil",
    title:
      "எண்ணூர் முதல் மாமல்லபுரம் வரை வாட்டர் மெட்ரோ — சிஎம்ஆர்எல் சாத்திய ஆய்வு டெண்டர்",
    summary:
      "பக்கிங்ஹாம் கால்வாயில் சுமார் 70 கி.மீ. நீர்வழி மெட்ரோக்கு விரிவான சாத்திய அறிக்கை + திட்ட அறிக்கை டெண்டர். கடைசி நாள் 18 செப்டம்பர் 2026. படகு அல்ல — கால்வாய் மீட்பே பெரிய பணி.",
    dek: "போக்குவரத்து மேசை — கொச்சியின் மாதிரி, சென்னையின் சேறு, இது தொடக்கத் தேதி அல்ல.",
    category: "Mobility",
    featured: true,
    publishedAt: "2026-08-14T16:20:00.000+05:30",
    heroImageUrl:
      "/images/articles/chennai-metro-may-2026-ridership-90-lakh-passengers.webp",
    sourceUrl:
      "https://www.thehindu.com/news/cities/chennai/cmrl-floats-bids-to-study-feasibility-of-water-metro-between-ennore-and-mamallapuram/article71341475.ece",
    sourceName: "இந்து / புதிய இந்தியன் எக்ஸ்பிரஸ் / TOI — 13–14 ஆகஸ்ட் 2026",
    authorByline: "mychennaicity.in editorial",
    areaHubSlug: null,
    reportBody: `## முக்கியப் புள்ளிகள்

- **சிஎம்ஆர்எல்** பக்கிங்ஹாம் கால்வாயில் **எண்ணூர்–மாமல்லபுரம்** வாட்டர் மெட்ரோக்கு **சாத்திய + விரிவான திட்ட அறிக்கை** டெண்டர் (~**70 கி.மீ.**; சில அறிக்கைகள் 53–78 கி.மீ.).
- ஆலோசனை ~**₹7.43 கோடி**; சுமார் **எட்டு மாதங்கள்**. டெண்டர் கடைசி நாள் **18 செப்டம்பர் 2026**.
- TOI குறிப்பிட்ட நிறுத்தங்கள்: எண்ணூர், தண்டையார்பேட்டை, பேசின் பிரிட்ஜ், சேப்பாக்கம், திருவான்மியூர், பெருங்குடி, சோழிங்கனல்லூர், கோவளம், மாமல்லபுரம் — **கட்டப்பட்டால்** மெட்ரோ/எம்ஆர்டிஎஸ் நடைபாதை இணைப்பு.
- அதிகாரிகள்: **கால்வாயை மீட்டெடுப்பதே பெரிய பணி**. இந்தியாவில் இயங்கும் ஒரே வாட்டர் மெட்ரோ **கொச்சி**.
- வரலாறு: கூவம் படகு (1973), தேசிய நீர்வழி-4, 2025 சியும்டா திட்டம், பொதுப்பணித்துறை ~**₹2,388 கோடி** / **167 கி.மீ.** பக்கிங்ஹாம் மீட்பு மதிப்பீடு.

[English version](${METRO_EN})

${DISCLAIMER_TA}

## எண்கள்

| விவரம் | நிலை |
|---|---|
| அமைப்பு | சிஎம்ஆர்எல் |
| நிலை | சாத்திய ஆய்வு டெண்டர் — **கட்டுமானம் அல்ல** |
| அச்சு | பக்கிங்ஹாம் கால்வாய் |

${FINE_TA}`,
    analysisBody: `## டெண்டரைத் திறப்புத் தேதியாக எண்ண வேண்டாம்

சென்னை நீர்வழி போக்குவரத்தை முன்பு அறிவித்துள்ளது. கழிவுநீர், ஆக்கிரமிப்பு, வறண்ட காலம் காதல் கதையை முடித்தன. [கொடுங்கையூர் குப்பை அகற்றல்](/chennai-local-news/buckingham-canal-kodungaiyur-debris-cleared-august-2026)தான் எந்த ஏசி படகிற்கும் நிஜ இணை.

- [ஆங்கிலம்](${METRO_EN})
- [மழை எச்சரிக்கை](${RAIN_TA})
- [சென்னை இன்று](${TODAY_TA})`,
    interactiveJson: faq(
      [
        {
          question: "எப்போது படகு ஏறலாம்?",
          answer:
            "பயணிகள் தேதி இல்லை. சிஎம்ஆர்எல் ஆலோசகரை மட்டுமே தேடுகிறது. ஒப்புதலுக்குப் பிறகு கால்வாய் மீட்பு ஆண்டுகள் எடுக்கும்.",
        },
        {
          question: "இது நேப்பியர் பிரிட்ஜ்–கோவளம் 53 கி.மீ. திட்டமா?",
          answer:
            "அதே குடும்பம். 2025 சியும்டா திட்டம் நேப்பியர்–கோவளத்தை வலியுறுத்தியது. 2026 டெண்டர் வடக்கே எண்ணூர், தெற்கே மாமல்லபுரம் வரை நீளும்.",
        },
      ],
      {
        countdown: {
          title: "வாட்டர் மெட்ரோ டெண்டர்",
          subtitle: "பத்திரிகையில் சொன்ன கடைசி நாள்.",
          endsAt: "2026-09-18T17:00:00.000+05:30",
          expiredLabel: "டெண்டர் காலம் கடந்தது — ஒப்பந்த அறிவிப்பைக் கவனியுங்கள்.",
          ctaLabel: "ஆங்கிலக் கட்டுரை",
          ctaUrl: METRO_EN,
        },
      },
    ),
  },
  {
    slug: "chennai-independence-day-2026-security-airport-red-zone-tamil",
    title:
      "80-வது சுதந்திர தினம்: புனித ஜார்ஜ் கோட்டை கொடி ஏற்றம், சிவப்பு மண்டலம், விமான நிலையம் 11 நாள் எச்சரிக்கை",
    summary:
      "15 ஆகஸ்ட் 2026 அன்று முதல்வர் சி. ஜோசப் விஜய் புனித ஜார்ஜ் கோட்டையில் கொடி ஏற்றுவார். நீலங்கரை–செயலகம் வழி சிவப்பு மண்டலம். ட்ரோன் தடை. விமான நிலையம் 10–20 ஆகஸ்ட் உயர் பாதுகாப்பு.",
    dek: "பாதுகாப்பு மேசை — 14–15 ஆகஸ்ட் அன்று மூடிய சாலையில் சிக்காமல் எப்படி நகருவது.",
    category: "Chennai",
    featured: true,
    publishedAt: "2026-08-14T16:30:00.000+05:30",
    heroImageUrl: "/images/articles/tamil-nadu-cabinet-portfolios-hero.jpg",
    sourceUrl:
      "https://www.thehindu.com/news/cities/chennai/security-beefed-up-in-chennai-for-independence-day-celebrations/article71339944.ece",
    sourceName: "இந்து — சுதந்திர தினப் பாதுகாப்பு, 11–13 ஆகஸ்ட் 2026",
    authorByline: "mychennaicity.in editorial",
    areaHubSlug: null,
    reportBody: `## முக்கியப் புள்ளிகள்

- **15 ஆகஸ்ட் 2026 (சனி)**: 80-வது சுதந்திர தினம். முதல்வர் **சி. ஜோசப் விஜய்** **புனித ஜார்ஜ் கோட்டையில்** கொடி ஏற்றுவார்.
- ஆணையர் **ஏ. அமல்ராஜ்** கீழ் **ஐந்து அடுக்கு** பாதுகாப்பு. விமான நிலையம், ரயில், பேருந்து, மெட்ரோ, கடற்கரை, கோயில்களில் கூடுதல் குழு.
- **சிவப்பு மண்டலம்**: செயலகம் + **நீலங்கரை** முதல்வர் வழி. போக்குவரத்து கட்டுப்பாடு **காலை 6** முதல் நிகழ்ச்சி முடியும் வரை.
- ஜிசிபி எல்லைகளில் ட்ரோன் தடை **19 ஜூன்–17 ஆகஸ்ட்**; 14–15 அன்று சிவப்பு மண்டலத்தில் அரசு அனுமதி இல்லாமல் தடை.
- விமான நிலையம் **10–20 ஆகஸ்ட்** உயர் பாதுகாப்பு. ஏர் இந்தியா முன்கூட்டியே வரச் சொன்னது.

[English version](${IDAY_EN}) · [வார இறுதி / திங்கள் கண்காணிப்பு](${WATCH_TA})

${DISCLAIMER_TA}

${FINE_TA}`,
    analysisBody: `## 15 ஆகஸ்ட் பயணம்

காலையில் கோட்டை–ஐஸ்லாந்து–பீச் சாலையைத் தவிருங்கள். திறந்திருக்கும் மெட்ரோவைப் பயன்படுத்துங்கள். 10–20 ஆகஸ்ட் விமானம் என்றால் **கூடுதல் நேரம்**.

- [ஆங்கிலம்](${IDAY_EN})
- [நிகழ்வுகள்](${EVENTS})
- [சென்னை இன்று](${TODAY_TA})`,
    interactiveJson: faq(
      [
        {
          question: "பேருந்து / மெட்ரோ நிற்குமா?",
          answer:
            "பொதுவாக கோட்டை சுற்றி திசைமாற்றம் உண்டு. சந்திப்பு மூடல்களைக் காவல் வெளியிடும். காலை 7க்கு பீச் சாலை திறந்திருக்கும் என நினைக்காதீர்கள்.",
        },
        {
          question: "ட்ரோன் பறக்கலாமா?",
          answer:
            "ஜிசிபி எல்லைகளில் 17 ஆகஸ்ட் வரை இல்லை. 14–15 அன்று சிவப்பு மண்டலத்தில் அரசு அனுமதி இல்லாமல் வேண்டாம்.",
        },
      ],
      {
        countdown: {
          title: "சுதந்திர தினம் — புனித ஜார்ஜ் கோட்டை",
          subtitle: "கொடி ஏற்றம் மற்றும் போக்குவரத்து கட்டுப்பாடு.",
          endsAt: "2026-08-15T06:00:00.000+05:30",
          expiredLabel: "சுதந்திர தினக் காலை கடந்தது — மீதமுள்ள மூடல்களைப் பாருங்கள்.",
          ctaLabel: "திங்கள் கண்காணிப்பு",
          ctaUrl: WATCH_TA,
        },
      },
    ),
  },
  {
    slug: "chennai-weekend-watch-independence-day-tax-rain-monday-august-2026",
    title:
      "Chennai weekend watch: I-Day roads, tax portal, rain — what to verify by Monday 17 August",
    summary:
      "A civic checklist for 15–17 August 2026: Fort St. George closures, GCC property-tax portal after the pause, airport queues through 20 August, and whether any rain tests the 294 flood-spot map. We will update this desk after Monday’s primary reports.",
    dek: "Follow-up desk — three things to check before you travel, pay, or forward a WhatsApp chart.",
    category: "Chennai",
    featured: true,
    publishedAt: "2026-08-14T17:00:00.000+05:30",
    heroImageUrl: "/images/articles/tamil-nadu-cabinet-portfolios-hero.jpg",
    sourceUrl: "https://mychennaicity.in/chennai-today",
    sourceName: "mychennaicity.in weekend watch — compiled from this week’s civic desks",
    authorByline: "mychennaicity.in editorial",
    areaHubSlug: null,
    reportBody: `## Key takeaways

- **Saturday 15 August**: 80th Independence Day at Fort St. George. Expect a **Red Zone** and morning closures — full desk: [I-Day security](${IDAY_EN}).
- **Tax**: GCC paused the reassessment on 13 August. By Monday, check whether the **official portal** shows the **old** demand. Desk: [property-tax pause](${TAX_EN}).
- **Rain / trenches**: 398 roads are still open for SWD; Mayor warned of a possible **50 cm** spell. Photograph your street if it rains. Desk: [50 cm warning](${RAIN_EN}).
- **Airport**: high security **through 20 August**. Add time.
- This page is a **watch list**. After Monday 17 August we will add what actually happened (closures that stuck, portal glitches, rain) from primary reports.

[தமிழில்](${WATCH_TA})

${DISCLAIMER_EN}

## Saturday–Monday checklist

| When | Check | Why |
|---|---|---|
| Sat 15 Aug, 6 a.m.–noon | Fort, Island, Beach Road, CM route from Neelankarai | Flag hoist + Red Zone |
| Sat–Sun | GCC property-tax portal vs your 13 Aug notice | Pause should restore old demand |
| Any rain | Your SWD trench + nearest flood spot | 230 severe spots still tagged |
| Through 20 Aug | Airport arrival time | 11-day security window |
| Mon 17 Aug | Ward / zone office if portal still shows the hike | Don’t pay a WhatsApp chart |

## What we will update on Monday

1. Did Fort-area diversions linger into the afternoon?
2. Did the tax portal actually revert, or only the press note?
3. Any rain that tested Sholinganallur / Tondiarpet / Adyar mapped spots?
4. Any official GCC circular on advance-tax vs refund?

Until then, use [Chennai today](${TODAY}) for the morning card.

${FINE_EN}`,
    analysisBody: `## Related reading

- [I-Day security](${IDAY_EN})
- [Property-tax pause](${TAX_EN})
- [Mayor rain warning](${RAIN_EN})
- [Water Metro study](${METRO_EN})
- [Tamil version](${WATCH_TA})`,
    interactiveJson: {
      type: "checklist",
      title: "Verify before you act this weekend",
      items: [
        { id: "iday-route", label: "I-Day: avoid Fort–Beach Road Saturday morning unless you must be there" },
        { id: "tax-portal", label: "Open GCC property-tax portal — confirm old demand, keep screenshots" },
        { id: "tax-receipt", label: "If you already paid the hike, keep the receipt (advance, not assumed refund)" },
        { id: "airport", label: "Flying 10–20 Aug: add extra airport time" },
        { id: "rain", label: "If it rains: photo the trench / drain mouth on your street" },
        { id: "monday", label: "Monday: if the portal still shows the hike, go to the zone revenue counter" },
      ],
      countdown: {
        title: "Monday follow-up checkpoint",
        subtitle: "17 August 2026 — we update this desk after primary reports.",
        endsAt: "2026-08-17T09:00:00.000+05:30",
        expiredLabel: "Monday checkpoint reached — refresh this desk for updates.",
        ctaLabel: "Chennai today",
        ctaUrl: TODAY,
      },
    },
  },
  {
    slug: "chennai-weekend-watch-independence-day-tax-rain-monday-august-2026-tamil",
    title:
      "சென்னை வார இறுதி கண்காணிப்பு: சுதந்திர தினச் சாலைகள், வரி தளம், மழை — திங்கள் 17க்குள் என்ன பார்ப்பது",
    summary:
      "15–17 ஆகஸ்ட் 2026 குடிமைப் பட்டியல்: கோட்டை மூடல்கள், சொத்து வரி தளம் பழைய தொகையைக் காட்டுகிறதா, 20 ஆகஸ்ட் வரை விமான நிலைய வரிசை, 294 வெள்ளப் புள்ளிகள். திங்கள் முதன்மை அறிக்கைகளுக்குப் பிறகு இம்மேசையைப் புதுப்பிப்போம்.",
    dek: "பின்தொடர் மேசை — பயணம், பணம், வாட்ஸ்அப் அட்டவணைக்கு முன் மூன்று சரிபார்ப்புகள்.",
    category: "Chennai",
    featured: true,
    publishedAt: "2026-08-14T17:10:00.000+05:30",
    heroImageUrl: "/images/articles/tamil-nadu-cabinet-portfolios-hero.jpg",
    sourceUrl: "https://mychennaicity.in/chennai-today-tamil",
    sourceName: "mychennaicity.in வார இறுதி கண்காணிப்பு",
    authorByline: "mychennaicity.in editorial",
    areaHubSlug: null,
    reportBody: `## முக்கியப் புள்ளிகள்

- **சனி 15 ஆகஸ்ட்**: புனித ஜார்ஜ் கோட்டையில் 80-வது சுதந்திர தினம். **சிவப்பு மண்டலம்**. முழு மேசை: [சுதந்திர தினப் பாதுகாப்பு](${IDAY_TA}).
- **வரி**: 13 ஆகஸ்ட் மறுமதிப்பீடு நிறுத்தம். திங்களுக்குள் அதிகாரப்பூர்வ தளம் **பழைய** தொகையைக் காட்டுகிறதா எனப் பாருங்கள். [வரி நிறுத்தம்](${TAX_TA}).
- **மழை / குழி**: 398 சாலைகள் இன்னும் திறந்திருக்கின்றன; மேயர் **50 செ.மீ.** எச்சரிக்கை. [மழை மேசை](${RAIN_TA}).
- **விமான நிலையம்**: **20 ஆகஸ்ட்** வரை உயர் பாதுகாப்பு.
- இது **கண்காணிப்புப் பட்டியல்**. திங்கள் 17க்குப் பிறகு நிஜத்தில் நடந்ததைச் சேர்ப்போம்.

[English version](${WATCH_EN})

${DISCLAIMER_TA}

## சனி–திங்கள் பட்டியல்

| எப்போது | என்ன பார்ப்பது |
|---|---|
| சனி காலை 6–12 | கோட்டை, ஐஸ்லாந்து, பீச் சாலை, நீலங்கரை வழி |
| சனி–ஞாயிறு | ஜிசிசி சொத்து வரி தளம் vs 13 ஆகஸ்ட் அறிவிப்பு |
| மழை வந்தால் | உங்கள் வடிகால் குழி + அருகிலுள்ள வெள்ளப் புள்ளி |
| 20 ஆகஸ்ட் வரை | விமான நிலைய நேரம் |
| திங்கள் 17 | தளம் இன்னும் உயர்வைக் காட்டினால் மண்டல வருவாய் அலுவலகம் |

திங்கள் வரை காலை அட்டைக்கு [சென்னை இன்று](${TODAY_TA}).

${FINE_TA}`,
    analysisBody: `## தொடர்புடையவை

- [சுதந்திர தினம்](${IDAY_TA})
- [சொத்து வரி](${TAX_TA})
- [மழை எச்சரிக்கை](${RAIN_TA})
- [வாட்டர் மெட்ரோ](${METRO_TA})
- [ஆங்கிலம்](${WATCH_EN})`,
    interactiveJson: {
      type: "checklist",
      title: "இந்த வார இறுதியில் செயல்படுவதற்கு முன்",
      items: [
        { id: "iday-route", label: "சனி காலை கோட்டை–பீச் சாலையைத் தவிருங்கள்" },
        { id: "tax-portal", label: "ஜிசிசி சொத்து வரி தளத்தில் பழைய தொகையை உறுதிப்படுத்துங்கள்" },
        { id: "tax-receipt", label: "உயர்வைச் செலுத்தியிருந்தால் ரசீதை வைத்திருங்கள்" },
        { id: "airport", label: "10–20 ஆகஸ்ட் விமானம்: கூடுதல் நேரம்" },
        { id: "rain", label: "மழை வந்தால் தெரு வடிகாலைப் புகைப்படம் எடுங்கள்" },
        { id: "monday", label: "திங்கள்: தளம் மாறவில்லை என்றால் மண்டல அலுவலகம்" },
      ],
      countdown: {
        title: "திங்கள் பின்தொடர் புள்ளி",
        subtitle: "17 ஆகஸ்ட் 2026 — முதன்மை அறிக்கைகளுக்குப் பிறகு புதுப்பிப்பு.",
        endsAt: "2026-08-17T09:00:00.000+05:30",
        expiredLabel: "திங்கள் புள்ளி வந்தது — இம்மேசையைப் புதுப்பித்துப் பாருங்கள்.",
        ctaLabel: "சென்னை இன்று",
        ctaUrl: TODAY_TA,
      },
    },
  },
];

export const WEEK_DESK_SOCIAL_POSTS: {
  id: string;
  channel: "x" | "whatsapp";
  lang: "en" | "ta";
  text: string;
}[] = [
  {
    id: "tax-x-en",
    channel: "x",
    lang: "en",
    text: `GCC has paused Chennai’s property-tax reassessment after ~3.49 lakh notices. Old demand is back; extra already paid is treated as advance — not an automatic refund. Mayor says the council was not consulted.\n\nhttps://mychennaicity.in/chennai-local-news/gcc-suspends-property-tax-reassessment-august-2026\n\n#Chennai #GCC #PropertyTax #mychennaicity`,
  },
  {
    id: "tax-wa-en",
    channel: "whatsapp",
    lang: "en",
    text: `Chennai property tax — 13 Aug update\n\nGCC has *paused* the reassessment.\n• Your tax should go back to the *old* amount\n• If you already paid the higher bill, extra is *advance* for later half-years (not a promised cash refund)\n• ~3.49 lakh notices had gone out\n\nCheck the official GCC portal, not WhatsApp charts.\nFull desk: https://mychennaicity.in/chennai-local-news/gcc-suspends-property-tax-reassessment-august-2026\nTamil: https://mychennaicity.in/chennai-local-news/gcc-suspends-property-tax-reassessment-august-2026-tamil`,
  },
  {
    id: "tax-x-ta",
    channel: "x",
    lang: "ta",
    text: `சென்னை சொத்து வரி மறுமதிப்பீடு *நிறுத்தம்*. பழைய தொகை திரும்பும்; அதிகம் செலுத்தியது முன்பணம் — உடனடி ரீஃபண்ட் அல்ல. மேயர்: சபை கலந்தாலோசிக்கப்படவில்லை.\n\nhttps://mychennaicity.in/chennai-local-news/gcc-suspends-property-tax-reassessment-august-2026-tamil\n\n#சென்னை #சொத்துவரி #GCC #mychennaicity`,
  },
  {
    id: "tax-wa-ta",
    channel: "whatsapp",
    lang: "ta",
    text: `சென்னை சொத்து வரி — ஆகஸ்ட் 13\n\nஜிசிசி மறுமதிப்பீட்டை *நிறுத்தியது*.\n• வரி *பழைய* தொகைக்குத் திரும்ப வேண்டும்\n• அதிகம் செலுத்தியிருந்தால் அது அடுத்த அரையாண்டு *முன்பணம்*\n• சுமார் 3.49 லட்சம் அறிவிப்புகள்\n\nவாட்ஸ்அப் அட்டவணையை நம்ப வேண்டாம். அதிகாரப்பூர்வ தளத்தைப் பாருங்கள்.\nhttps://mychennaicity.in/chennai-local-news/gcc-suspends-property-tax-reassessment-august-2026-tamil`,
  },
  {
    id: "rain-x-en",
    channel: "x",
    lang: "en",
    text: `Chennai Mayor: El Niño could mean 50 cm of rain in *one spell*. GCC has mapped 294 flood spots — Sholinganallur 76. Canal work started late this year.\n\nhttps://mychennaicity.in/chennai-local-news/chennai-mayor-el-nino-50cm-northeast-monsoon-warning-august-2026\n\n#Chennai #Monsoon #GCC #mychennaicity`,
  },
  {
    id: "rain-wa-en",
    channel: "whatsapp",
    lang: "en",
    text: `Chennai monsoon watch\n\nMayor R. Priya: a single spell could exceed *50 cm* (El Niño scenario — not tonight’s forecast).\nGCC mapped *294* stagnation points (Sholinganallur 76, Royapuram 31, Adyar 26).\nDesilting started late (tenders in July).\n\nhttps://mychennaicity.in/chennai-local-news/chennai-mayor-el-nino-50cm-northeast-monsoon-warning-august-2026`,
  },
  {
    id: "rain-x-ta",
    channel: "x",
    lang: "ta",
    text: `மேயர்: எல் நினோவில் ஒரு மழையிலேயே 50 செ.மீ. வரலாம். ஜிசிசி 294 வெள்ளப் புள்ளிகள் — சோழிங்கனல்லூர் 76. கால்வாய் பணி தாமதம்.\n\nhttps://mychennaicity.in/chennai-local-news/chennai-mayor-el-nino-50cm-northeast-monsoon-warning-august-2026-tamil\n\n#சென்னை #பருவமழை #mychennaicity`,
  },
  {
    id: "rain-wa-ta",
    channel: "whatsapp",
    lang: "ta",
    text: `சென்னை மழை எச்சரிக்கை\n\nமேயர் ஆர். பிரியா: ஒரு அலையில் *50 செ.மீ.*க்கு மேல் பெய்யக்கூடும் (இன்றிரவு முன்னறிவிப்பு அல்ல).\n294 தேங்கும் இடங்கள் — சோழிங்கனல்லூர் 76.\nதூர்வாருதல் இந்த ஆண்டு தாமதம்.\n\nhttps://mychennaicity.in/chennai-local-news/chennai-mayor-el-nino-50cm-northeast-monsoon-warning-august-2026-tamil`,
  },
  {
    id: "metro-x-en",
    channel: "x",
    lang: "en",
    text: `CMRL is only *studying* a Water Metro from Ennore to Mahabalipuram along Buckingham Canal (~70 km). Tender deadline 18 Sep. Canal restoration is the real project — not a launch date.\n\nhttps://mychennaicity.in/chennai-local-news/cmrl-water-metro-ennore-mahabalipuram-feasibility-august-2026\n\n#Chennai #CMRL #WaterMetro #mychennaicity`,
  },
  {
    id: "metro-wa-en",
    channel: "whatsapp",
    lang: "en",
    text: `Chennai Water Metro — what it actually is\n\nCMRL floated a *feasibility + DPR* tender: Ennore → Mahabalipuram on Buckingham Canal (~70 km).\nDeadline cited: 18 September 2026.\nIndia’s only operating water metro is Kochi.\nThis is *not* a passenger start date. Restoring the canal is the hard part.\n\nhttps://mychennaicity.in/chennai-local-news/cmrl-water-metro-ennore-mahabalipuram-feasibility-august-2026`,
  },
  {
    id: "metro-x-ta",
    channel: "x",
    lang: "ta",
    text: `சிஎம்ஆர்எல் எண்ணூர்–மாமல்லபுரம் வாட்டர் மெட்ரோவை *ஆய்வு* செய்கிறது (~70 கி.மீ.). டெண்டர் 18 செப்டம்பர். இது தொடக்கத் தேதி அல்ல — கால்வாய் மீட்பே பெரிய பணி.\n\nhttps://mychennaicity.in/chennai-local-news/cmrl-water-metro-ennore-mahabalipuram-feasibility-august-2026-tamil\n\n#சென்னை #மெட்ரோ #mychennaicity`,
  },
  {
    id: "metro-wa-ta",
    channel: "whatsapp",
    lang: "ta",
    text: `சென்னை வாட்டர் மெட்ரோ — உண்மை\n\nசிஎம்ஆர்எல் *சாத்திய ஆய்வு + திட்ட அறிக்கை* டெண்டர்: எண்ணூர் → மாமல்லபுரம், பக்கிங்ஹாம் கால்வாய்.\nகடைசி நாள்: 18 செப்டம்பர் 2026.\nபயணிகள் தொடக்கம் அல்ல. கால்வாயை மீட்டெடுப்பதே கடினம்.\n\nhttps://mychennaicity.in/chennai-local-news/cmrl-water-metro-ennore-mahabalipuram-feasibility-august-2026-tamil`,
  },
  {
    id: "iday-x-en",
    channel: "x",
    lang: "en",
    text: `80th Independence Day in Chennai: CM hoists the flag at Fort St. George on 15 Aug. Red Zone on the Neelankarai–Secretariat route from 6 a.m. Airport on high alert through 20 Aug — arrive early.\n\nhttps://mychennaicity.in/chennai-local-news/chennai-independence-day-2026-security-airport-red-zone\n\n#IndependenceDay #Chennai #mychennaicity`,
  },
  {
    id: "iday-wa-en",
    channel: "whatsapp",
    lang: "en",
    text: `Chennai — Saturday 15 August\n\n80th Independence Day at *Fort St. George*.\n• Red Zone: Secretariat + CM route from Neelankarai\n• Traffic curbs from 6 a.m. until the function ends\n• Drone ban in city limits\n• Airport high security *until 20 August* — reach early\n\nhttps://mychennaicity.in/chennai-local-news/chennai-independence-day-2026-security-airport-red-zone\nWeekend checklist: https://mychennaicity.in/chennai-local-news/chennai-weekend-watch-independence-day-tax-rain-monday-august-2026`,
  },
  {
    id: "iday-x-ta",
    channel: "x",
    lang: "ta",
    text: `சென்னை 80-வது சுதந்திர தினம்: 15 ஆகஸ்ட் புனித ஜார்ஜ் கோட்டை. நீலங்கரை–செயலகம் சிவப்பு மண்டலம், காலை 6 முதல். விமான நிலையம் 20 ஆகஸ்ட் வரை உயர் பாதுகாப்பு — முன்கூட்டியே செல்லுங்கள்.\n\nhttps://mychennaicity.in/chennai-local-news/chennai-independence-day-2026-security-airport-red-zone-tamil\n\n#சுதந்திரதினம் #சென்னை #mychennaicity`,
  },
  {
    id: "iday-wa-ta",
    channel: "whatsapp",
    lang: "ta",
    text: `சென்னை — சனி 15 ஆகஸ்ட்\n\nபுனித ஜார்ஜ் கோட்டையில் 80-வது சுதந்திர தினம்.\n• சிவப்பு மண்டலம்: செயலகம் + நீலங்கரை வழி\n• காலை 6 முதல் போக்குவரத்து கட்டுப்பாடு\n• ட்ரோன் தடை\n• விமான நிலையம் *20 ஆகஸ்ட்* வரை — முன்கூட்டியே வாருங்கள்\n\nhttps://mychennaicity.in/chennai-local-news/chennai-independence-day-2026-security-airport-red-zone-tamil\nவார இறுதிப் பட்டியல்: https://mychennaicity.in/chennai-local-news/chennai-weekend-watch-independence-day-tax-rain-monday-august-2026-tamil`,
  },
  {
    id: "watch-x-en",
    channel: "x",
    lang: "en",
    text: `Chennai weekend watch (15–17 Aug): I-Day road closures, GCC tax portal after the pause, airport queues, rain vs 294 flood spots. Checklist — we’ll update Monday.\n\nhttps://mychennaicity.in/chennai-local-news/chennai-weekend-watch-independence-day-tax-rain-monday-august-2026\n\n#Chennai #IndependenceDay #mychennaicity`,
  },
  {
    id: "watch-wa-en",
    channel: "whatsapp",
    lang: "en",
    text: `Chennai — what to check this weekend\n\n1. Sat 15 Aug morning: Fort / Beach Road / Neelankarai route (I-Day)\n2. Tax portal: old demand after GCC pause?\n3. Flying till 20 Aug: extra airport time\n4. If it rains: photo your street trench\n\nWe’ll update this desk on Monday 17 Aug.\nhttps://mychennaicity.in/chennai-local-news/chennai-weekend-watch-independence-day-tax-rain-monday-august-2026`,
  },
  {
    id: "watch-x-ta",
    channel: "x",
    lang: "ta",
    text: `சென்னை வார இறுதி: சுதந்திர தினச் சாலைகள், வரி தளம், விமான நிலையம், மழை. திங்கள் 17 அன்று புதுப்பிப்போம்.\n\nhttps://mychennaicity.in/chennai-local-news/chennai-weekend-watch-independence-day-tax-rain-monday-august-2026-tamil\n\n#சென்னை #சுதந்திரதினம் #mychennaicity`,
  },
  {
    id: "watch-wa-ta",
    channel: "whatsapp",
    lang: "ta",
    text: `சென்னை — இந்த வார இறுதியில் பாருங்கள்\n\n1. சனி காலை: கோட்டை / பீச் சாலை / நீலங்கரை வழி\n2. சொத்து வரி தளம் பழைய தொகையைக் காட்டுகிறதா\n3. 20 ஆகஸ்ட் வரை விமானம்: கூடுதல் நேரம்\n4. மழை வந்தால் தெருவைப் படம் எடுங்கள்\n\nதிங்கள் 17 அன்று இம்மேசையைப் புதுப்பிப்போம்.\nhttps://mychennaicity.in/chennai-local-news/chennai-weekend-watch-independence-day-tax-rain-monday-august-2026-tamil`,
  },
];
