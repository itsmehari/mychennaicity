import { type GoldPurity, rateForPurity } from "./purity-math";

export type MakingChargeMode = "percent" | "per_gram";

export type JewelleryCalculatorInput = {
  purity: GoldPurity;
  weightGrams: number;
  makingMode: MakingChargeMode;
  makingValue: number;
  wastagePercent: number;
  gstPercent: number;
  rates: {
    rate24kPerGram: number;
    rate22kPerGram: number;
    rate18kPerGram: number;
  };
};

export type JewelleryCalculatorResult = {
  ratePerGram: number;
  baseGoldValue: number;
  makingCharges: number;
  wastageCharges: number;
  subtotalBeforeGst: number;
  gstAmount: number;
  totalPayable: number;
};

export function calculateJewelleryBill(
  input: JewelleryCalculatorInput,
): JewelleryCalculatorResult {
  const weight = Math.max(0, input.weightGrams);
  const ratePerGram = rateForPurity(input.purity, input.rates);
  const baseGoldValue = Math.round(ratePerGram * weight);

  const makingCharges =
    input.makingMode === "percent"
      ? Math.round(baseGoldValue * (Math.max(0, input.makingValue) / 100))
      : Math.round(Math.max(0, input.makingValue) * weight);

  const wastageCharges = Math.round(
    baseGoldValue * (Math.max(0, input.wastagePercent) / 100),
  );

  const subtotalBeforeGst = baseGoldValue + makingCharges + wastageCharges;
  const gstAmount = Math.round(
    subtotalBeforeGst * (Math.max(0, input.gstPercent) / 100),
  );
  const totalPayable = subtotalBeforeGst + gstAmount;

  return {
    ratePerGram,
    baseGoldValue,
    makingCharges,
    wastageCharges,
    subtotalBeforeGst,
    gstAmount,
    totalPayable,
  };
}

/** How many grams of gold fit a jewellery budget (gold value only, no making/GST). */
export function gramsFromBudget(
  budgetInr: number,
  purity: GoldPurity,
  rates: JewelleryCalculatorInput["rates"],
): number {
  const rate = rateForPurity(purity, rates);
  if (rate <= 0 || budgetInr <= 0) return 0;
  return Math.round((budgetInr / rate) * 1000) / 1000;
}
