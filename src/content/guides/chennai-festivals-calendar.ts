export const CHENNAI_FESTIVALS_GUIDE_PATH = "/guides/chennai-festivals-calendar";

export type FestivalCalendarItem = {
  name: string;
  typicallyWhen: string;
  whereNote: string;
  whyItMatters: string;
};

/** Editorial calendar — dates shift yearly; verify temple/city notices before travel. */
export const CHENNAI_FESTIVAL_CALENDAR: FestivalCalendarItem[] = [
  {
    name: "Pongal / Thai",
    typicallyWhen: "Mid-January (Thai month)",
    whereNote: "Homes citywide; neighbourhood kolams; some temple and cultural programmes",
    whyItMatters: "Tamil harvest festival — travel peaks, markets busy, many offices closed for long weekend",
  },
  {
    name: "Republic Day weekend culture",
    typicallyWhen: "26 January weekend",
    whereNote: "Marina, Island Grounds, school/college programmes",
    whyItMatters: "Traffic near beach roads; check event permits",
  },
  {
    name: "Mylapore / Kapaleeshwarar festivals",
    typicallyWhen: "Multiple — notably Panguni (Mar–Apr) and other temple calendars",
    whereNote: "Mylapore, Kapaleeshwarar Temple precinct",
    whyItMatters: "Ther (chariot), music, street food — classic Chennai heritage weekend",
  },
  {
    name: "Chithirai / Madurai-linked observances in Chennai temples",
    typicallyWhen: "April–May (lunar calendar)",
    whereNote: "Select Murugan and Amman temples across the city",
    whyItMatters: "Local temple crowds; confirm with each temple",
  },
  {
    name: "Summer cultural / music series",
    typicallyWhen: "May–June",
    whereNote: "Sabhas, galleries, OMR community halls",
    whyItMatters: "Indoor AC venues dominate; check our events hub",
  },
  {
    name: "Independence Day programmes",
    typicallyWhen: "15 August",
    whereNote: "Fort St. George area, schools, wards",
    whyItMatters: "Road restrictions near ceremonial venues",
  },
  {
    name: "Vinayaka Chaturthi",
    typicallyWhen: "August–September (lunar)",
    whereNote: "Neighbourhood pandals; immersion points by GCC guidance",
    whyItMatters: "Traffic near immersion routes; follow GCC notices",
  },
  {
    name: "Navaratri / Kolu season",
    typicallyWhen: "September–October",
    whereNote: "Homes, Mylapore, South Chennai streets",
    whyItMatters: "Evening visits; street parking scarce in old neighbourhoods",
  },
  {
    name: "Deepavali",
    typicallyWhen: "October–November",
    whereNote: "Citywide",
    whyItMatters: "Crackers, late shopping, transport surge — follow TN pollution / timing rules",
  },
  {
    name: "Karthigai Deepam",
    typicallyWhen: "November–December",
    whereNote: "Homes and temples; Thiruvannamalai pilgrimage spillover",
    whyItMatters: "Lamp lighting; temple evening crowds",
  },
  {
    name: "Margazhi music season",
    typicallyWhen: "Mid-December to mid-January",
    whereNote: "Mylapore–T. Nagar sabha belt; Music Academy corridor",
    whyItMatters: "Peak classical music tourism — book kutcheris early",
  },
  {
    name: "Christmas & New Year weekend",
    typicallyWhen: "24 Dec – 1 Jan",
    whereNote: "Egmore, Harrington Road, malls, beach roads",
    whyItMatters: "Nightlife and dining rush; hotel rates spike",
  },
];
