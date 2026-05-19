import { AUSTRALIA_TAX_2025 } from '@/data/tax-rules/australia';

export type AustraliaTaxResult = {
  grossSalary: number;
  incomeTax: number;
  lowIncomeTaxOffset: number;
  netIncomeTax: number;
  medicareLevy: number;
  totalTax: number;
  netSalary: number;
  superannuation: number;
  effectiveRate: number;
  marginalRate: number;
  breakdown: { band: string; taxable: number; tax: number; rate: number }[];
  monthly: { gross: number; net: number; tax: number; medicare: number; super: number };
  symbol: string;
};

export function calculateAustraliaTax(grossSalary: number): AustraliaTaxResult {
  const { incomeTaxBands, medicareLevy, superannuation, lowIncomeTaxOffset: lito } = AUSTRALIA_TAX_2025;

  let incomeTax = 0;
  const breakdown: { band: string; taxable: number; tax: number; rate: number }[] = [];
  for (const b of incomeTaxBands) {
    if (grossSalary <= b.min) break;
    const taxable = Math.min(grossSalary, b.max) - b.min;
    const tax = taxable * b.rate;
    incomeTax += tax;
    if (tax > 0) {
      breakdown.push({ band: b.label, taxable, tax, rate: b.rate });
    }
  }

  let litoAmount = 0;
  if (grossSalary <= lito.fullOffsetThreshold) {
    litoAmount = lito.maxOffset;
  } else if (grossSalary < lito.phaseoutEnd) {
    litoAmount = lito.maxOffset * (1 - (grossSalary - lito.phaseoutStart) / (lito.phaseoutEnd - lito.phaseoutStart));
  }
  const netIncomeTax = Math.max(0, incomeTax - litoAmount);

  let medicareLevyAmount = 0;
  if (grossSalary > medicareLevy.lowIncomeThreshold) {
    medicareLevyAmount = grossSalary * medicareLevy.rate;
  } else if (grossSalary > 0) {
    medicareLevyAmount = Math.max(0, (grossSalary - medicareLevy.lowIncomeThreshold) * medicareLevy.reductionRate);
  }

  const totalTax = netIncomeTax + medicareLevyAmount;
  const netSalary = grossSalary - totalTax;
  const superAmount = grossSalary * superannuation.rate;
  const effectiveRate = grossSalary > 0 ? (totalTax / grossSalary) * 100 : 0;
  const topBand = [...incomeTaxBands].reverse().find(b => grossSalary > b.min);
  const marginalRate = topBand ? topBand.rate * 100 : 0;

  return {
    grossSalary,
    incomeTax,
    lowIncomeTaxOffset: litoAmount,
    netIncomeTax,
    medicareLevy: medicareLevyAmount,
    totalTax,
    netSalary,
    superannuation: superAmount,
    effectiveRate,
    marginalRate,
    breakdown,
    monthly: {
      gross: grossSalary / 12,
      net: netSalary / 12,
      tax: netIncomeTax / 12,
      medicare: medicareLevyAmount / 12,
      super: superAmount / 12,
    },
    symbol: 'A$'
  };
}
