export function formatInrPerGram(amount: number): string {
  return `${formatInrWhole(amount)}/g`;
}

export function formatInrWhole(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
