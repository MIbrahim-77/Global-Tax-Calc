import { USA_TAX_2025 } from '@/data/tax-rules/usa';

export type USATaxResult = {
  grossSalary: number;
  standardDeduction: number;
  taxableIncome: number;
  federalIncomeTax: number;
  socialSecurity: number;
  medicare: number;
  totalFICA: number;
  totalDeductions: number;
  netSalary: number;
  effectiveRate: number;
  marginalRate: number;
  breakdown: { band: string; taxable: number; tax: number; rate: number }[];
  monthly: { gross: number; net: number; tax: number; fica: number };
  symbol: string;
};

function calcBracketTax(
  taxableIncome: number,
  brackets: { min: number; max: number; rate: number }[]
): { total: number; breakdown: { band: string; taxable: number; tax: number; rate: number }[] } {
  let total = 0;
  const breakdown: { band: string; taxable: number; tax: number; rate: number }[] = [];
  for (const b of brackets) {
    if (taxableIncome <= b.min) break;
    const taxable = Math.min(taxableIncome, b.max) - b.min;
    const tax = taxable * b.rate;
    total += tax;
    breakdown.push({ band: `${(b.rate * 100).toFixed(0)}% bracket`, taxable, tax, rate: b.rate });
  }
  return { total, breakdown };
}

export function calculateUSATax(
  grossSalary: number,
  filingStatus: 'single' | 'marriedFilingJointly'
): USATaxResult {
  const { standardDeduction, federalBrackets, ficaTax } = USA_TAX_2025;
  const deduction = standardDeduction[filingStatus];
  const taxableIncome = Math.max(0, grossSalary - deduction);
  const brackets = federalBrackets[filingStatus];
  const { total: federalIncomeTax, breakdown } = calcBracketTax(taxableIncome, brackets);

  const ssCap = Math.min(grossSalary, ficaTax.socialSecurityWageCap);
  const socialSecurity = ssCap * ficaTax.socialSecurityRate;
  let medicare = grossSalary * ficaTax.medicareRate;
  if (grossSalary > ficaTax.additionalMedicareThreshold) {
    medicare += (grossSalary - ficaTax.additionalMedicareThreshold) * ficaTax.additionalMedicareRate;
  }
  const totalFICA = socialSecurity + medicare;
  const totalDeductions = federalIncomeTax + totalFICA;
  const netSalary = grossSalary - totalDeductions;
  const effectiveRate = grossSalary > 0 ? (totalDeductions / grossSalary) * 100 : 0;
  const marginalBracket = [...brackets].reverse().find(b => taxableIncome > b.min);
  const marginalRate = marginalBracket ? marginalBracket.rate * 100 : 10;

  return {
    grossSalary,
    standardDeduction: deduction,
    taxableIncome,
    federalIncomeTax,
    socialSecurity,
    medicare,
    totalFICA,
    totalDeductions,
    netSalary,
    effectiveRate,
    marginalRate,
    breakdown,
    monthly: {
      gross: grossSalary / 12,
      net: netSalary / 12,
      tax: federalIncomeTax / 12,
      fica: totalFICA / 12,
    },
    symbol: '$'
  };
}

export type USACapitalGainsResult = {
  gainAmount: number;
  ordinaryIncome: number;
  capitalGainsTax: number;
  rate: number;
  holdingPeriod: string;
  symbol: string;
};

export function calculateUSACapitalGainsTax(
  gainAmount: number,
  ordinaryIncome: number,
  holdingPeriod: string,
  filingStatus: 'single' | 'marriedFilingJointly'
): USACapitalGainsResult {
  const { capitalGainsRates, federalBrackets, standardDeduction } = USA_TAX_2025;
  if (holdingPeriod === 'Short-term (1 year or less)') {
    const deduction = standardDeduction[filingStatus];
    const taxable = Math.max(0, ordinaryIncome + gainAmount - deduction);
    const brackets = federalBrackets[filingStatus];
    const { total: totalTax } = calcBracketTax(taxable, brackets);
    const taxWithout = calcBracketTax(Math.max(0, ordinaryIncome - deduction), brackets).total;
    return { gainAmount, ordinaryIncome, capitalGainsTax: totalTax - taxWithout, rate: 0, holdingPeriod, symbol: '$' };
  }
  const thresholds = capitalGainsRates.longTerm;
  const totalIncome = ordinaryIncome + gainAmount;
  let rate = 0;
  if (filingStatus === 'single') {
    if (totalIncome > thresholds.rate15.single) rate = 0.20;
    else if (totalIncome > thresholds.rate0.single) rate = 0.15;
  } else {
    if (totalIncome > thresholds.rate15.married) rate = 0.20;
    else if (totalIncome > thresholds.rate0.married) rate = 0.15;
  }
  return { gainAmount, ordinaryIncome, capitalGainsTax: gainAmount * rate, rate, holdingPeriod, symbol: '$' };
}
