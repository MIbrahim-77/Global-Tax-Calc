import { useState } from 'react';
import { Share2, Printer, CheckCircle } from 'lucide-react';
import { ToolMeta } from '@/data/tools/tools-manifest';
import { ResultCard } from './ResultCard';
import { TaxBreakdownTable } from './TaxBreakdownTable';
import { TaxBreakdownChart } from './TaxBreakdownChart';
import { calculateUKTax, calculateUKVAT } from '@/lib/calculators/uk';
import { calculateUSATax, calculateUSACapitalGainsTax } from '@/lib/calculators/usa';
import { calculateCanadaTax } from '@/lib/calculators/canada';
import { calculateAustraliaTax } from '@/lib/calculators/australia';
import { calculateGermanyTax, calculateGermanyVAT } from '@/lib/calculators/germany';
import { formatCurrency, formatPercent } from '@/lib/formatters';

type CalcResult = {
  netSalary?: number;
  totalDeductions?: number;
  totalTax?: number;
  incomeTax?: number;
  effectiveRate?: number;
  breakdown?: { band: string; taxable: number; tax: number; rate: number }[];
  chartData?: { name: string; value: number; color: string }[];
  symbol: string;
  extra?: { label: string; value: string; highlight?: 'success' | 'warning' | 'neutral' | 'default' }[];
  monthly?: { gross: number; net: number };
};

function runCalculation(tool: ToolMeta, inputs: Record<string, string>): CalcResult | null {
  const { country, calculatorType } = tool;
  const salary = parseFloat(inputs.grossSalary ?? '0');

  if (country === 'uk') {
    if (calculatorType === 'vat') {
      const r = calculateUKVAT(
        parseFloat(inputs.amount ?? '0'),
        inputs.vatRate ?? '20% Standard',
        inputs.direction ?? 'Add VAT'
      );
      return {
        symbol: r.symbol,
        extra: [
          { label: 'Net Amount', value: formatCurrency(r.net, r.symbol), highlight: 'default' },
          { label: 'VAT Amount', value: formatCurrency(r.vat, r.symbol), highlight: 'warning' },
          { label: 'Gross Amount', value: formatCurrency(r.gross, r.symbol), highlight: 'success' },
          { label: 'VAT Rate', value: formatPercent(r.rate * 100), highlight: 'neutral' },
        ],
      };
    }
    if (!salary) return null;
    const r = calculateUKTax(salary);
    return {
      netSalary: r.netSalary,
      totalDeductions: r.totalDeductions,
      effectiveRate: r.effectiveRate,
      breakdown: r.breakdown,
      symbol: r.symbol,
      monthly: r.monthly,
      chartData: [
        { name: 'Take-Home Pay', value: r.netSalary, color: '#059669' },
        { name: 'Income Tax', value: r.incomeTax, color: '#d97706' },
        { name: 'National Insurance', value: r.nationalInsurance, color: '#1d4ed8' },
      ],
      extra: [
        { label: 'Marginal Rate', value: formatPercent(r.marginalRate), highlight: 'neutral' },
        { label: 'Monthly Take-Home', value: formatCurrency(r.monthly.net, r.symbol), highlight: 'success' },
      ],
    };
  }

  if (country === 'usa') {
    if (calculatorType === 'capital-gains') {
      const r = calculateUSACapitalGainsTax(
        parseFloat(inputs.gainAmount ?? '0'),
        parseFloat(inputs.ordinaryIncome ?? '0'),
        inputs.holdingPeriod ?? 'Long-term (over 1 year)',
        (inputs.filingStatus ?? 'single') as 'single' | 'marriedFilingJointly'
      );
      return {
        symbol: r.symbol,
        extra: [
          { label: 'Capital Gain', value: formatCurrency(r.gainAmount, r.symbol), highlight: 'neutral' },
          { label: 'Capital Gains Tax', value: formatCurrency(r.capitalGainsTax, r.symbol), highlight: 'warning' },
          { label: 'Effective Rate', value: formatPercent(r.rate * 100), highlight: 'default' },
          { label: 'Holding Period', value: r.holdingPeriod.includes('Long') ? 'Long-term' : 'Short-term', highlight: 'neutral' },
        ],
      };
    }
    if (!salary) return null;
    const r = calculateUSATax(salary, (inputs.filingStatus ?? 'single') as 'single' | 'marriedFilingJointly');
    return {
      netSalary: r.netSalary,
      totalDeductions: r.totalDeductions,
      effectiveRate: r.effectiveRate,
      breakdown: r.breakdown,
      symbol: r.symbol,
      monthly: r.monthly,
      chartData: [
        { name: 'Take-Home Pay', value: r.netSalary, color: '#059669' },
        { name: 'Federal Income Tax', value: r.federalIncomeTax, color: '#d97706' },
        { name: 'FICA (SS + Medicare)', value: r.totalFICA, color: '#1d4ed8' },
      ],
      extra: [
        { label: 'Marginal Rate', value: formatPercent(r.marginalRate), highlight: 'neutral' },
        { label: 'Monthly Take-Home', value: formatCurrency(r.monthly.net, r.symbol), highlight: 'success' },
      ],
    };
  }

  if (country === 'canada') {
    if (!salary) return null;
    const r = calculateCanadaTax(salary, 'ontario');
    return {
      netSalary: r.netSalary,
      totalDeductions: r.totalDeductions,
      effectiveRate: r.effectiveRate,
      breakdown: r.breakdown,
      symbol: r.symbol,
      monthly: r.monthly,
      chartData: [
        { name: 'Take-Home Pay', value: r.netSalary, color: '#059669' },
        { name: 'Federal Tax', value: r.federalTax, color: '#d97706' },
        { name: 'Provincial Tax', value: r.provincialTax, color: '#7c3aed' },
        { name: 'CPP + EI', value: r.cpp + r.ei, color: '#1d4ed8' },
      ],
      extra: [
        { label: 'Monthly Take-Home', value: formatCurrency(r.monthly.net, r.symbol), highlight: 'success' },
      ],
    };
  }

  if (country === 'australia') {
    if (calculatorType === 'super') {
      const superRate = 0.115;
      const annual = salary * superRate;
      const monthly = annual / 12;
      return {
        symbol: 'A$',
        extra: [
          { label: 'Your Salary', value: formatCurrency(salary, 'A$'), highlight: 'neutral' },
          { label: 'Annual Super (11.5%)', value: formatCurrency(annual, 'A$'), highlight: 'success' },
          { label: 'Monthly Super', value: formatCurrency(monthly, 'A$'), highlight: 'default' },
          { label: 'Total Package', value: formatCurrency(salary + annual, 'A$'), highlight: 'neutral' },
        ],
      };
    }
    if (!salary) return null;
    const r = calculateAustraliaTax(salary);
    return {
      netSalary: r.netSalary,
      totalDeductions: r.totalTax,
      effectiveRate: r.effectiveRate,
      breakdown: r.breakdown,
      symbol: r.symbol,
      monthly: r.monthly,
      chartData: [
        { name: 'Take-Home Pay', value: r.netSalary, color: '#059669' },
        { name: 'Income Tax', value: r.netIncomeTax, color: '#d97706' },
        { name: 'Medicare Levy', value: r.medicareLevy, color: '#1d4ed8' },
      ],
      extra: [
        { label: 'Employer Super (11.5%)', value: formatCurrency(r.superannuation, r.symbol), highlight: 'neutral' },
        { label: 'Monthly Take-Home', value: formatCurrency(r.monthly.net, r.symbol), highlight: 'success' },
      ],
    };
  }

  if (country === 'germany') {
    if (calculatorType === 'vat') {
      const r = calculateGermanyVAT(
        parseFloat(inputs.amount ?? '0'),
        inputs.vatRate ?? '19% Standard',
        inputs.direction ?? 'Add VAT'
      );
      return {
        symbol: r.symbol,
        extra: [
          { label: 'Net Amount', value: formatCurrency(r.net, r.symbol), highlight: 'default' },
          { label: 'VAT Amount', value: formatCurrency(r.vat, r.symbol), highlight: 'warning' },
          { label: 'Gross Amount', value: formatCurrency(r.gross, r.symbol), highlight: 'success' },
          { label: 'VAT Rate', value: formatPercent(r.rate * 100), highlight: 'neutral' },
        ],
      };
    }
    if (!salary) return null;
    const hasChildren = inputs.hasChildren === 'Yes';
    const r = calculateGermanyTax(salary, hasChildren);
    return {
      netSalary: r.netSalary,
      totalDeductions: r.totalDeductions,
      effectiveRate: r.effectiveRate,
      breakdown: r.breakdown,
      symbol: r.symbol,
      monthly: r.monthly,
      chartData: [
        { name: 'Take-Home Pay', value: r.netSalary, color: '#059669' },
        { name: 'Income Tax', value: r.incomeTax + r.solidaritySurcharge, color: '#d97706' },
        { name: 'Social Insurance', value: r.pension + r.health + r.unemployment + r.nursingCare, color: '#1d4ed8' },
      ],
      extra: [
        { label: 'Monthly Net Salary', value: formatCurrency(r.monthly.net, r.symbol), highlight: 'success' },
        { label: 'Solidarity Surcharge', value: formatCurrency(r.solidaritySurcharge, r.symbol), highlight: 'neutral' },
      ],
    };
  }

  return null;
}

export function CalculatorShell({ tool }: { tool: ToolMeta }) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function handleCalculate() {
    setError('');
    const r = runCalculation(tool, inputs);
    if (!r) {
      setError('Please enter a valid amount to calculate.');
      return;
    }
    setResult(r);
  }

  function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: tool.title, url });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 mb-8" data-testid="calculator-shell">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {tool.inputs.map(input => (
          <div key={input.id}>
            <label className="block text-sm font-medium text-[#334155] mb-1.5" htmlFor={input.id}>
              {input.label}
            </label>
            {input.type === 'number' ? (
              <div className="relative">
                {input.prefix && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] font-mono text-sm select-none">
                    {input.prefix}
                  </span>
                )}
                <input
                  id={input.id}
                  type="number"
                  placeholder={input.placeholder}
                  className={`w-full border border-[#e2e8f0] rounded-lg py-3 ${input.prefix ? 'pl-10' : 'pl-4'} pr-4 text-[#0f172a] bg-white focus:outline-none focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] transition-colors text-sm`}
                  value={inputs[input.id] ?? ''}
                  onChange={e => setInputs(prev => ({ ...prev, [input.id]: e.target.value }))}
                  data-testid={`input-${input.id}`}
                />
              </div>
            ) : (
              <select
                id={input.id}
                className="w-full border border-[#e2e8f0] rounded-lg py-3 px-4 text-[#0f172a] bg-white focus:outline-none focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] transition-colors text-sm"
                value={inputs[input.id] ?? (input.options?.[0] ?? '')}
                onChange={e => setInputs(prev => ({ ...prev, [input.id]: e.target.value }))}
                data-testid={`select-${input.id}`}
              >
                {input.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm text-[#dc2626] mb-4" data-testid="calculator-error">{error}</p>
      )}

      <button
        onClick={handleCalculate}
        className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
        data-testid="button-calculate"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-8" data-testid="calculator-results">
          <div className="flex items-center justify-end gap-2 mb-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748b] hover:text-[#1d4ed8] border border-[#e2e8f0] hover:border-[#1d4ed8] bg-[#f8fafc] hover:bg-[#dbeafe] px-3 py-1.5 rounded-lg transition-all"
              data-testid="button-share"
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Share'}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748b] hover:text-[#1d4ed8] border border-[#e2e8f0] hover:border-[#1d4ed8] bg-[#f8fafc] hover:bg-[#dbeafe] px-3 py-1.5 rounded-lg transition-all"
              data-testid="button-print"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
          </div>
          {result.extra && result.extra.length > 0 && !result.netSalary ? (
            <div className="grid grid-cols-2 gap-4">
              {result.extra.map(item => (
                <ResultCard key={item.label} label={item.label} value={item.value} highlight={item.highlight} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {result.netSalary !== undefined && (
                  <ResultCard
                    label="Take-Home Pay"
                    value={formatCurrency(result.netSalary, result.symbol)}
                    highlight="success"
                    subValue={result.monthly ? `${formatCurrency(result.monthly.net, result.symbol)}/mo` : undefined}
                  />
                )}
                {(result.totalDeductions !== undefined || result.totalTax !== undefined) && (
                  <ResultCard
                    label="Total Tax & Deductions"
                    value={formatCurrency(result.totalDeductions ?? result.totalTax ?? 0, result.symbol)}
                    highlight="warning"
                  />
                )}
                {result.effectiveRate !== undefined && (
                  <ResultCard
                    label="Effective Rate"
                    value={formatPercent(result.effectiveRate)}
                    highlight="default"
                  />
                )}
              </div>

              {result.extra && result.extra.map(item => null)}

              {result.chartData && (
                <TaxBreakdownChart data={result.chartData} symbol={result.symbol} />
              )}

              {result.breakdown && result.breakdown.length > 0 && (
                <TaxBreakdownTable rows={result.breakdown} symbol={result.symbol} />
              )}

              {result.extra && result.extra.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {result.extra.map(item => (
                    <ResultCard key={item.label} label={item.label} value={item.value} highlight={item.highlight} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
