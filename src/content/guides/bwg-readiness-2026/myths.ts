export type MythItem = {
  id: string;
  myth: string;
  reality: string;
};

export const MYTHS: MythItem[] = [
  {
    id: "myth1",
    myth: "We pay GCC or a contractor, so our responsibility ends there",
    reality:
      "The generator must ensure proper segregation and an environmentally sound handover and processing route.",
  },
  {
    id: "myth2",
    myth: "Four coloured bins are enough",
    reality:
      "Bins are only one part of the system. Measurement, training, authorised collection and documentation are also required.",
  },
  {
    id: "myth3",
    myth: "Our housekeeping contractor is responsible",
    reality:
      "Operational work may be outsourced, but institutional oversight cannot be outsourced.",
  },
  {
    id: "myth4",
    myth: "Everything dry is recyclable",
    reality:
      "Dry waste contains recyclable and non-recyclable fractions and may require further separation.",
  },
  {
    id: "myth5",
    myth: "We installed a composting machine, so we are compliant",
    reality:
      "Capacity, operation, maintenance, records, output handling and downtime arrangements must also be demonstrated.",
  },
  {
    id: "myth6",
    myth: "Waste sold to a scrap dealer needs no records",
    reality:
      "The organisation should verify authorisation and retain evidence of handover and destination.",
  },
  {
    id: "myth7",
    myth: "Only industries have environmental duties",
    reality:
      "Apartments, hotels, hospitals, schools, offices and other large establishments can fall within BWG obligations.",
  },
];
