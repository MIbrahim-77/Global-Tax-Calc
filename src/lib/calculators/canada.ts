import { CANADA_TAX_2025 } from '@/data/tax-rules/canada';

export type CanadaTaxResult = {
  grossSalary: number;
  federalTax: number;
  provincialTax: number;
  cpp: number;
  ei: number;
  totalDeductions: number;
  netSalary: number;
  effectiveRate: number;
  marginalRate: number;
  breakdown: { band: string; taxable: number; tax: number; rate: number }[];
  monthly: { gross: number; net: number; federalTax: number; provincialTax: number; cpp: number; ei: number };
  symbol: string;
};

function calcBracketTax(
  income: number,
  bands: { min: number; max: number; rate: number }[]
): { total: number; breakdown: { band: string; taxable: number; tax: number; rate: number }[] } {
  let total = 0;
  const breakdown: { band: string; taxable: number; tax: number; rate: number }[] = [];
  for (const b of bands) {
    if (income <= b.min) break;
    const taxable = Math.min(income, b.max) - b.min;
    const tax = taxable * b.rate;
    total += tax;
    breakdown.push({ band: `${(b.rate * 100).toFixed(2)}% federal bracket`, taxable, tax, rate: b.rate });
  }
  return { total, breakdown };
}

export function calculateCanadaTax(
  grossSalary: number,
  _province: 'ontario' = 'ontario'
): CanadaTaxResult {
  const { federalBands, basicPersonalAmount, provinces, cpp, ei } = CANADA_TAX_2025;

  const { total: rawFederal, breakdown } = calcBracketTax(grossSalary, federalBands);
  const bpaCredit = basicPersonalAmount * 0.15;
  const federalTax = Math.max(0, rawFederal - bpaCredit);

  const ontarioBands = provinces.ontario.bands;
  let provincialTax = 0;
  const provBreakdown: { band: string; taxable: number; tax: number; rate: number }[] = [];
  for (const b of ontarioBands) {
    if (grossSalary <= b.min) break;
    const taxable = Math.min(grossSalary, b.max) - b.min;
    const tax = taxable * b.rate;
    provincialTax += tax;
    provBreakdown.push({ band: `${(b.rate * 100).toFixed(2)}% Ontario bracket`, taxable, tax, rate: b.rate });
  }

  const cppEarnings = Math.min(Math.max(0, grossSalary - cpp.basicExemption), cpp.maxEarnings - cpp.basicExemption);
  const cppAmount = cppEarnings * cpp.rate;

  const eiAmount = Math.min(grossSalary, ei.maxInsurableEarnings) * ei.rate;

  const totalDeductions = federalTax + provincialTax + cppAmount + eiAmount;
  const netSalary = grossSalary - totalDeductions;
  const effectiveRate = grossSalary > 0 ? (totalDeductions / grossSalary) * 100 : 0;
  const topFedBand = [...federalBands].reverse().find(b => grossSalary > b.min);
  const marginalRate = topFedBand ? topFedBand.rate * 100 : 15;

  return {
    grossSalary,
    federalTax,
    provincialTax,
    cpp: cppAmount,
    ei: eiAmount,
    totalDeductions,
    netSalary,
    effectiveRate,
    marginalRate,
    breakdown: [...breakdown, ...provBreakdown],
    monthly: {
      gross: grossSalary / 12,
      net: netSalary / 12,
      federalTax: federalTax / 12,
      provincialTax: provincialTax / 12,
      cpp: cppAmount / 12,
      ei: eiAmount / 12,
    },
    symbol: 'CA$'
  };
}
