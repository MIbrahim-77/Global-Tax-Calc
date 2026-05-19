export const CANADA_TAX_2025 = {
  year: '2025', currency: 'CAD', symbol: 'CA$',
  federalBands: [
    { min: 0, max: 55867, rate: 0.15 }, { min: 55867, max: 111733, rate: 0.205 },
    { min: 111733, max: 154906, rate: 0.26 }, { min: 154906, max: 220000, rate: 0.29 },
    { min: 220000, max: Infinity, rate: 0.33 },
  ],
  basicPersonalAmount: 15705,
  provinces: {
    ontario: {
      bands: [
        { min: 0, max: 51446, rate: 0.0505 }, { min: 51446, max: 102894, rate: 0.0915 },
        { min: 102894, max: 150000, rate: 0.1116 }, { min: 150000, max: 220000, rate: 0.1216 },
        { min: 220000, max: Infinity, rate: 0.1316 },
      ],
      surtax: { threshold1: 5554, rate1: 0.20, threshold2: 7108, rate2: 0.36 }
    }
  },
  cpp: { rate: 0.0595, maxEarnings: 68500, basicExemption: 3500 },
  ei: { rate: 0.0166, maxInsurableEarnings: 63200 }
};