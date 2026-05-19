import { GERMANY_TAX_2025 } from '@/data/tax-rules/germany';

export type GermanyTaxResult = {
  grossSalary: number;
  incomeTax: number;
  solidaritySurcharge: number;
  pension: number;
  health: number;
  unemployment: number;
  nursingCare: number;
  totalDeductions: number;
  netSalary: number;
  effectiveRate: number;
  marginalRate: number;
  breakdown: { band: string; taxable: number; tax: number; rate: number }[];
  monthly: { gross: number; net: number; tax: number; social: number };
  symbol: string;
};

export function calculateGermanyTax(grossSalary: number, hasChildren: boolean): GermanyTaxResult {
  const { basicAllowance, taxFormula, solidaritySurcharge, socialContributions } = GERMANY_TAX_2025;

  let incomeTax = 0;
  let marginalRate = 0;
  const breakdown: { band: string; taxable: number; tax: number; rate: number }[] = [];

  if (grossSalary <= basicAllowance) {
    incomeTax = 0;
    marginalRate = 0;
  } else if (grossSalary <= taxFormula.zone2.max) {
    const y = (grossSalary - 11784) / 10000;
    incomeTax = (979.18 * y + 1400) * y;
    marginalRate = 14;
    breakdown.push({ band: 'Zone 2 (14%–24% progressive)', taxable: grossSalary - 11784, tax: incomeTax, rate: 0.19 });
  } else if (grossSalary <= taxFormula.zone3.max) {
    const zone2Max = taxFormula.zone2.max;
    const y2 = (zone2Max - 11784) / 10000;
    const tax2 = (979.18 * y2 + 1400) * y2;
    const z = (grossSalary - 17005) / 10000;
    const zone3Tax = (192.59 * z + 2397) * z;
    incomeTax = tax2 + zone3Tax;
    marginalRate = 42;
    breakdown.push({ band: 'Zone 2 (14%–24%)', taxable: zone2Max - 11784, tax: tax2, rate: 0.19 });
    breakdown.push({ band: 'Zone 3 (24%–42% progressive)', taxable: grossSalary - 17005, tax: zone3Tax, rate: 0.33 });
  } else if (grossSalary <= taxFormula.zone4.max) {
    const y2 = (17005 - 11784) / 10000;
    const tax2 = (979.18 * y2 + 1400) * y2;
    const z3 = (66760 - 17005) / 10000;
    const tax3 = (192.59 * z3 + 2397) * z3;
    const zone4Tax = (grossSalary - 66760) * 0.42;
    incomeTax = tax2 + tax3 + zone4Tax;
    marginalRate = 42;
    breakdown.push({ band: 'Zone 2 (14%–24%)', taxable: 17005 - 11784, tax: tax2, rate: 0.19 });
    breakdown.push({ band: 'Zone 3 (24%–42%)', taxable: 66760 - 17005, tax: tax3, rate: 0.33 });
    breakdown.push({ band: 'Zone 4 (42%)', taxable: grossSalary - 66760, tax: zone4Tax, rate: 0.42 });
  } else {
    const y2 = (17005 - 11784) / 10000;
    const tax2 = (979.18 * y2 + 1400) * y2;
    const z3 = (66760 - 17005) / 10000;
    const tax3 = (192.59 * z3 + 2397) * z3;
    const tax4 = (277825 - 66760) * 0.42;
    const zone5Tax = (grossSalary - 277825) * 0.45;
    incomeTax = tax2 + tax3 + tax4 + zone5Tax;
    marginalRate = 45;
    breakdown.push({ band: 'Zone 2 (14%–24%)', taxable: 17005 - 11784, tax: tax2, rate: 0.19 });
    breakdown.push({ band: 'Zone 3 (24%–42%)', taxable: 66760 - 17005, tax: tax3, rate: 0.33 });
    breakdown.push({ band: 'Zone 4 (42%)', taxable: 277825 - 66760, tax: tax4, rate: 0.42 });
    breakdown.push({ band: 'Zone 5 (45%)', taxable: grossSalary - 277825, tax: zone5Tax, rate: 0.45 });
  }

  incomeTax = Math.round(incomeTax * 100) / 100;

  let solidarityAmount = 0;
  if (incomeTax > solidaritySurcharge.exemptionThreshold) {
    solidarityAmount = incomeTax * solidaritySurcharge.rate;
  }

  const s = socialContributions;
  const pension = grossSalary * s.pensionInsurance;
  const health = grossSalary * (s.healthInsurance + s.additionalHealthRate);
  const unemployment = grossSalary * s.unemploymentInsurance;
  const nursingRate = s.nursingCareInsurance + (hasChildren ? 0 : s.nursingCareAdditional);
  const nursingCare = grossSalary * nursingRate;

  const totalDeductions = incomeTax + solidarityAmount + pension + health + unemployment + nursingCare;
  const netSalary = grossSalary - totalDeductions;
  const effectiveRate = grossSalary > 0 ? (totalDeductions / grossSalary) * 100 : 0;

  return {
    grossSalary,
    incomeTax,
    solidaritySurcharge: solidarityAmount,
    pension,
    health,
    unemployment,
    nursingCare,
    totalDeductions,
    netSalary,
    effectiveRate,
    marginalRate,
    breakdown,
    monthly: {
      gross: grossSalary / 12,
      net: netSalary / 12,
      tax: (incomeTax + solidarityAmount) / 12,
      social: (pension + health + unemployment + nursingCare) / 12,
    },
    symbol: '€'
  };
}

export function calculateGermanyVAT(amount: number, rateLabel: string, direction: string): { net: number; vat: number; gross: number; rate: number; symbol: string } {
  const rateMap: Record<string, number> = { '19% Standard': 0.19, '7% Reduced': 0.07 };
  const rate = rateMap[rateLabel] ?? 0.19;
  let net: number, vat: number, gross: number;
  if (direction === 'Add VAT') {
    net = amount; vat = amount * rate; gross = amount + vat;
  } else {
    gross = amount; net = amount / (1 + rate); vat = gross - net;
  }
  return { net, vat, gross, rate, symbol: '€' };
}
