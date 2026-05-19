export const GERMANY_TAX_2025 = {
  year: '2025', currency: 'EUR', symbol: '€',
  basicAllowance: 11784,
  taxFormula: {
    zone1: { max: 11784, rate: 0 },
    zone2: { min: 11785, max: 17005, description: 'linear 14% to 24%' },
    zone3: { min: 17006, max: 66760, description: 'linear 24% to 42%' },
    zone4: { min: 66761, max: 277825, rate: 0.42 },
    zone5: { min: 277826, max: Infinity, rate: 0.45 },
  },
  solidaritySurcharge: { rate: 0.055, exemptionThreshold: 18130 },
  socialContributions: {
    pensionInsurance: 0.093, healthInsurance: 0.073, additionalHealthRate: 0.018,
    unemploymentInsurance: 0.013, nursingCareInsurance: 0.017, nursingCareAdditional: 0.006
  },
  vat: { standard: 0.19, reduced: 0.07 }
};