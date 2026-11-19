/** Values below this max are treated as monthly INR (not annual LPA). */
const MONTHLY_SALARY_MAX_THRESHOLD = 120_000;

export function isMonthlyJobSalary(min: number, max: number): boolean {
  return max < MONTHLY_SALARY_MAX_THRESHOLD;
}

/** Stored unit wins. Null keeps the historical threshold. */
export function salaryUnitText(
  min: number,
  max: number,
  unit: string | null | undefined,
): "MONTH" | "YEAR" {
  if (unit === "MONTH" || unit === "YEAR") return unit;
  return isMonthlyJobSalary(min, max) ? "MONTH" : "YEAR";
}

export function formatInrAmount(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatAnnualLpa(min: number, max: number): string {
  const lakhs = (n: number) => {
    const L = n / 100_000;
    const r = Math.round(L * 10) / 10;
    return Number.isInteger(r) ? String(r) : r.toFixed(1);
  };
  if (min === max) return `₹${lakhs(min)} LPA`;
  return `₹${lakhs(min)} – ₹${lakhs(max)} LPA`;
}

/** Human-readable compensation for job sidebar, cards, and metadata. */
export function formatJobCompensation(
  min: number,
  max: number,
  unit?: string | null,
): string {
  if (salaryUnitText(min, max, unit) === "MONTH") {
    if (min === max) return `${formatInrAmount(min)} / month`;
    return `${formatInrAmount(min)} – ${formatInrAmount(max)} / month`;
  }
  return formatAnnualLpa(min, max);
}
