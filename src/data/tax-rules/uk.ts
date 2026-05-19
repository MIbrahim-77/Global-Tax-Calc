export const UK_TAX_2025 = {
  year: '2025/26', currency: 'GBP', symbol: '£',
  personalAllowance: 12570,
  incomeTaxBands: [
    { label: 'Personal Allowance', min: 0, max: 12570, rate: 0 },
    { label: 'Basic Rate', min: 12570, max: 50270, rate: 0.20 },
    { label: 'Higher Rate', min: 50270, max: 125140, rate: 0.40 },
    { label: 'Additional Rate', min: 125140, max: Infinity, rate: 0.45 },
  ],
  nationalInsurance: { primaryThreshold: 12570, upperEarningsLimit: 50270, rateBelowUEL: 0.08, rateAboveUEL: 0.02 },
  vatRates: { standard: 0.20, reduced: 0.05, zero: 0 }
};