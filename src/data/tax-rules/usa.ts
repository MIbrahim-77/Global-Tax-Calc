export const USA_TAX_2025 = {
  year: '2025', currency: 'USD', symbol: '$',
  standardDeduction: { single: 14600, marriedFilingJointly: 29200, headOfHousehold: 21900 },
  federalBrackets: {
    single: [
      { min: 0, max: 11600, rate: 0.10 }, { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 }, { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 }, { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ],
    marriedFilingJointly: [
      { min: 0, max: 23200, rate: 0.10 }, { min: 23200, max: 94300, rate: 0.12 },
      { min: 94300, max: 201050, rate: 0.22 }, { min: 201050, max: 383900, rate: 0.24 },
      { min: 383900, max: 487450, rate: 0.32 }, { min: 487450, max: 731200, rate: 0.35 },
      { min: 731200, max: Infinity, rate: 0.37 },
    ]
  },
  ficaTax: {
    socialSecurityRate: 0.062, socialSecurityWageCap: 168600,
    medicareRate: 0.0145, additionalMedicareRate: 0.009, additionalMedicareThreshold: 200000
  },
  capitalGainsRates: {
    shortTerm: 'ordinary',
    longTerm: { rate0: { single: 47025, married: 94050 }, rate15: { single: 518900, married: 583750 }, rate20: Infinity }
  }
};