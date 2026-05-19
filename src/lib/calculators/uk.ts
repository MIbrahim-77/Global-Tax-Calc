import { UK_TAX_2025 } from '@/data/tax-rules/uk';

export type UKTaxResult = {
  grossSalary: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  nationalInsurance: number;
  totalDeductions: number;
  netSalary: number;
  effectiveRate: number;
  marginalRate: number;
  breakdown: { band: string; taxable: number; tax: number; rate: number }[];
  monthly: { gross: number; net: number; tax: number; ni: number };
  symbol: string;
};

export function calculateUKTax(grossSalary: number): UKTaxResult {
  const { personalAllowance, incomeTaxBands, nationalInsurance: ni } = UK_TAX_2025;

  const taxableIncome = Math.max(0, grossSalary - personalAllowance);

  const breakdown = incomeTaxBands.slice(1).map(band => {
    const taxable = Math.max(0, Math.min(grossSalary, band.max) - Math.max(personalAllowance, band.min));
    return {
      band: band.label,
      taxable: Math.max(0, taxable),
      tax: Math.max(0, taxable) * band.rate,
      rate: band.rate
    };
  });

  const incomeTax = breakdown.reduce((sum, b) => sum + b.tax, 0);

  const niEarnings = grossSalary - ni.primaryThreshold;
  let niAmount = 0;
  if (niEarnings > 0) {
    const belowUEL = Math.min(niEarnings, ni.upperEarningsLimit - ni.primaryThreshold);
    const aboveUEL = Math.max(0, niEarnings - (ni.upperEarningsLimit - ni.primaryThreshold));
    niAmount = belowUEL * ni.rateBelowUEL + aboveUEL * ni.rateAboveUEL;
  }

  const totalDeductions = incomeTax + niAmount;
  const netSalary = grossSalary - totalDeductions;
  const effectiveRate = grossSalary > 0 ? (totalDeductions / grossSalary) * 100 : 0;
  const marginalBand = [...incomeTaxBands].reverse().find(b => grossSalary > b.min);
  const marginalRate = marginalBand ? marginalBand.rate * 100 : 0;

  return {
    grossSalary,
    personalAllowance,
    taxableIncome,
    incomeTax,
    nationalInsurance: niAmount,
    totalDeductions,
    netSalary,
    effectiveRate,
    marginalRate,
    breakdown,
    monthly: {
      gross: grossSalary / 12,
      net: netSalary / 12,
      tax: incomeTax / 12,
      ni: niAmount / 12,
    },
    symbol: '£'
  };
}

export type UKVATResult = {
  net: number;
  vat: number;
  gross: number;
  rate: number;
  symbol: string;
};

export function calculateUKVAT(amount: number, rateLabel: string, direction: string): UKVATResult {
  const rateMap: Record<string, number> = {
    '20% Standard': 0.20,
    '5% Reduced': 0.05,
    '0% Zero': 0,
  };
  const rate = rateMap[rateLabel] ?? 0.20;
  let net: number, vat: number, gross: number;
  if (direction === 'Add VAT') {
    net = amount;
    vat = amount * rate;
    gross = amount + vat;
  } else {
    gross = amount;
    net = amount / (1 + rate);
    vat = gross - net;
  }
  return { net, vat, gross, rate, symbol: '£' };
}
