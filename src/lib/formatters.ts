export function formatCurrency(amount: number, symbol: string): string {
  return `${symbol}${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function getCurrencySymbol(country: string): string {
  const map: Record<string, string> = {
    uk: '£', usa: '$', canada: 'CA$', australia: 'A$', germany: '€'
  };
  return map[country] ?? '$';
}
