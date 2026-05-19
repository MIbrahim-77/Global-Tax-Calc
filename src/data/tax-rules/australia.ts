export const AUSTRALIA_TAX_2025 = {
  year: '2024-25', currency: 'AUD', symbol: 'A$',
  incomeTaxBands: [
    { min: 0, max: 18200, rate: 0, label: 'Tax-free threshold' },
    { min: 18201, max: 45000, rate: 0.19, label: '19% bracket' },
    { min: 45001, max: 120000, rate: 0.325, label: '32.5% bracket' },
    { min: 120001, max: 180000, rate: 0.37, label: '37% bracket' },
    { min: 180001, max: Infinity, rate: 0.45, label: '45% bracket' },
  ],
  medicareLevy: { rate: 0.02, lowIncomeThreshold: 26000, reductionRate: 0.10 },
  superannuation: { rate: 0.115, concessionalCap: 30000, nonConcessionalCap: 110000 },
  gst: { rate: 0.10 },
  lowIncomeTaxOffset: { maxOffset: 700, fullOffsetThreshold: 37500, phaseoutStart: 37500, phaseoutEnd: 45000 }
};