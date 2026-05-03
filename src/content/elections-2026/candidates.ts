/**
 * Curated candidate rows for TN Assembly 2026 — Chennai metro+ map.
 * Verify against official ECI nominations and party releases before treating as final.
 */

export type ElectionCandidateRow = {
  party: string;
  alliance?: string;
  name: string;
  sourceUrl?: string;
  asOf?: string;
};

/** Keyed by Tamil Nadu AC_NO */
export const CANDIDATES_BY_AC: Partial<Record<number, ElectionCandidateRow[]>> = {
  11: [
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "R. S. Rajesh",
      sourceUrl:
        "https://navbharattimes.indiatimes.com/state/tamil-nadu/chennai/aiadmk-released-final-list-on-candidates-for-tamil-nadu-election-2026-see-full-list/articleshow/129876020.cms",
      asOf: "2026-03-29",
    },
  ],
  12: [
    {
      party: "TVK",
      name: "Vijay",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/vijay-to-contest-from-perambur-trichy-east-tvk-unveils-key-candidates-for-tamil-nadu-polls/articleshow/129876995.cms",
      asOf: "2026-03-29",
    },
    {
      party: "DMK",
      alliance: "DMK-led SPA",
      name: "R. D. Sekar",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
  ],
  13: [
    {
      party: "DMK",
      alliance: "DMK-led SPA",
      name: "M. K. Stalin",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "P. Santhana Krishnan",
      sourceUrl:
        "https://navbharattimes.indiatimes.com/state/tamil-nadu/chennai/aiadmk-released-final-list-on-candidates-for-tamil-nadu-election-2026-see-full-list/articleshow/129876020.cms",
      asOf: "2026-03-29",
    },
  ],
  14: [
    {
      party: "DMK",
      alliance: "DMK-led SPA",
      name: "Karthik Mohan",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
    {
      party: "TVK",
      name: "Aadhav Arjuna",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/vijay-to-contest-from-perambur-trichy-east-tvk-unveils-key-candidates-for-tamil-nadu-polls/articleshow/129876995.cms",
      asOf: "2026-03-29",
    },
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "S. R. Vijaykumar",
      sourceUrl:
        "https://navbharattimes.indiatimes.com/state/tamil-nadu/chennai/aiadmk-released-final-list-on-candidates-for-tamil-nadu-election-2026-see-full-list/articleshow/129876020.cms",
      asOf: "2026-03-29",
    },
  ],
  15: [
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "A. PorKodi (PorKodi Armstrong)",
      sourceUrl:
        "https://navbharattimes.indiatimes.com/state/tamil-nadu/chennai/aiadmk-released-final-list-on-candidates-for-tamil-nadu-election-2026-see-full-list/articleshow/129876020.cms",
      asOf: "2026-03-29",
    },
  ],
  16: [
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "Abhishek Rangasamy",
      sourceUrl:
        "https://navbharattimes.indiatimes.com/state/tamil-nadu/chennai/aiadmk-released-final-list-on-candidates-for-tamil-nadu-election-2026-see-full-list/articleshow/129876020.cms",
      asOf: "2026-03-29",
    },
    {
      party: "TVK",
      name: "Raj Mohan",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/vijay-to-contest-from-perambur-trichy-east-tvk-unveils-key-candidates-for-tamil-nadu-polls/articleshow/129876995.cms",
      asOf: "2026-03-29",
    },
  ],
  17: [
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "D. Jayakumar",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
  ],
  18: [
    {
      party: "DMK",
      alliance: "DMK-led SPA",
      name: "P. K. Sekarbabu",
      sourceUrl:
        "https://www.newindianexpress.com/states/tamil-nadu/2026/Mar/30/will-dmk-retain-its-safe-harbour",
      asOf: "2026-03-30",
    },
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "Royapuram Mano",
      sourceUrl:
        "https://www.newindianexpress.com/states/tamil-nadu/2026/Mar/30/will-dmk-retain-its-safe-harbour",
      asOf: "2026-03-30",
    },
  ],
  19: [
    {
      party: "DMK",
      alliance: "DMK-led SPA",
      name: "Udhayanidhi Stalin",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "Aadhi Rajaram",
      sourceUrl:
        "https://navbharattimes.indiatimes.com/state/tamil-nadu/chennai/aiadmk-released-final-list-on-candidates-for-tamil-nadu-election-2026-see-full-list/articleshow/129876020.cms",
      asOf: "2026-03-29",
    },
  ],
  20: [
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "P. Valarmathi",
      sourceUrl:
        "https://navbharattimes.indiatimes.com/state/tamil-nadu/chennai/aiadmk-released-final-list-on-candidates-for-tamil-nadu-election-2026-see-full-list/articleshow/129876020.cms",
      asOf: "2026-03-29",
    },
  ],
  21: [
    {
      party: "DMK",
      alliance: "DMK-led SPA",
      name: "N. Chitrarasu",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "S. Gokula Indira",
      sourceUrl:
        "https://navbharattimes.indiatimes.com/state/tamil-nadu/chennai/aiadmk-released-final-list-on-candidates-for-tamil-nadu-election-2026-see-full-list/articleshow/129876020.cms",
      asOf: "2026-03-29",
    },
  ],
  22: [
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "Virugai V. N. Ravi",
      sourceUrl:
        "https://navbharattimes.indiatimes.com/state/tamil-nadu/chennai/aiadmk-released-final-list-on-candidates-for-tamil-nadu-election-2026-see-full-list/articleshow/129876020.cms",
      asOf: "2026-03-29",
    },
  ],
  23: [
    {
      party: "DMK",
      alliance: "DMK-led SPA",
      name: "Ma. Subramanian",
      sourceUrl:
        "https://www.livechennai.com/detailnews.asp?catid=78&nav=p&newsid=79284",
      asOf: "2026-03-28",
    },
    {
      party: "AMMK",
      alliance: "NDA",
      name: "Senthamizhan",
      sourceUrl:
        "https://www.theweek.in/news/india/2026/03/28/ammk-candidate-list-2026-all-11-nominees-named-by-ttv-dhinakaran.html",
      asOf: "2026-03-28",
    },
  ],
  24: [
    {
      party: "DMK",
      alliance: "DMK-led SPA",
      name: "Raja Anbazhagan",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "B. Sathyanarayanan",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
    {
      party: "TVK",
      name: "N. Anand",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
    {
      party: "NTK",
      name: "Anusha Vijayakumar",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
  ],
  25: [
    {
      party: "DMK",
      alliance: "DMK-led SPA",
      name: "D. Velu",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
    {
      party: "BJP",
      alliance: "NDA",
      name: "Tamilisai Soundararajan",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
    {
      party: "TVK",
      name: "Venkataraman",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/vijay-to-contest-from-perambur-trichy-east-tvk-unveils-key-candidates-for-tamil-nadu-polls/articleshow/129876995.cms",
      asOf: "2026-03-29",
    },
    {
      party: "NTK",
      name: "Arun Iyengar",
      sourceUrl:
        "https://timesofindia.indiatimes.com/city/chennai/tamil-nadu-elections-2026-dmk-leaders-including-cm-mk-stalin-and-deputy-cm-udhayanidhi-stalin-set-for-chennai-poll-fight/articleshow/129890793.cms",
      asOf: "2026-03-30",
    },
  ],
  26: [
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "M. K. Ashok",
      sourceUrl:
        "https://navbharattimes.indiatimes.com/state/tamil-nadu/chennai/aiadmk-released-final-list-on-candidates-for-tamil-nadu-election-2026-see-full-list/articleshow/129876020.cms",
      asOf: "2026-03-29",
    },
  ],
  27: [
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "K. P. Kanthan",
      sourceUrl:
        "https://navbharattimes.indiatimes.com/state/tamil-nadu/chennai/aiadmk-released-final-list-on-candidates-for-tamil-nadu-election-2026-see-full-list/articleshow/129876020.cms",
      asOf: "2026-03-29",
    },
  ],
  28: [
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "S. Saravanan",
      sourceUrl:
        "https://navbharattimes.indiatimes.com/state/tamil-nadu/chennai/aiadmk-released-final-list-on-candidates-for-tamil-nadu-election-2026-see-full-list/articleshow/129876020.cms",
      asOf: "2026-03-29",
    },
  ],
  29: [
    {
      party: "INC",
      alliance: "DMK-led SPA",
      name: "K. Selvaperunthagai",
      sourceUrl:
        "https://www.tv9tamilnews.com/photo-gallery/k-selvaperunthagai-tamil-nadu-election-2026-contesting-sriperumbudur-constituency-congress-party-photo-gallery-63696.html",
      asOf: "2026-03-28",
    },
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "K. Palani",
      sourceUrl:
        "https://www.dtnext.in/news/politics/2026-tn-elections-aiadmk-releases-second-candidate-list-check-out-full-names-here",
      asOf: "2026-03-27",
    },
  ],
  30: [
    {
      party: "DMDK",
      alliance: "DMK-led SPA",
      name: "D. Murugesan",
      sourceUrl:
        "https://newstodaynet.com/2026/03/28/dmdk-announces-10-candidates-fields-premalatha-from-vijayakanths-bastion/",
      asOf: "2026-03-28",
    },
  ],
  31: [
    {
      party: "DMK",
      alliance: "DMK-led SPA",
      name: "Dr. R. S. Krithika Devi",
      sourceUrl:
        "https://www.livechennai.com/detailnews.asp?catid=78&nav=p&newsid=79284",
      asOf: "2026-03-28",
    },
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "Chitlapakkam S. Rajendran",
      sourceUrl:
        "https://www.dtnext.in/news/politics/2026-tn-elections-aiadmk-releases-second-candidate-list-check-out-full-names-here",
      asOf: "2026-03-27",
    },
  ],
  32: [
    {
      party: "DMK",
      alliance: "DMK-led SPA",
      name: "M. K. D. Karthik",
      sourceUrl:
        "https://www.livechennai.com/detailnews.asp?catid=78&nav=p&newsid=79284",
      asOf: "2026-03-28",
    },
    {
      party: "AIADMK",
      alliance: "NDA",
      name: "M. Gaja (alias Gajendran)",
      sourceUrl:
        "https://www.dtnext.in/news/politics/2026-tn-elections-aiadmk-releases-second-candidate-list-check-out-full-names-here",
      asOf: "2026-03-27",
    },
  ],
};
