import { useState } from 'react';
import { Link } from 'wouter';
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, Calculator } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { useSEO } from '@/hooks/use-seo';

const COUNTRIES = [
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', currency: '£', symbol: 'GBP' },
  { id: 'usa', name: 'United States', flag: '🇺🇸', currency: '$', symbol: 'USD' },
  { id: 'canada', name: 'Canada', flag: '🇨🇦', currency: 'CA$', symbol: 'CAD' },
  { id: 'australia', name: 'Australia', flag: '🇦🇺', currency: 'A$', symbol: 'AUD' },
  { id: 'germany', name: 'Germany', flag: '🇩🇪', currency: '€', symbol: 'EUR' },
];

type Inputs = {
  country: string;
  grossIncome: string;
  withheld: string;
  deductions: string;
  otherIncome: string;
};

function fmt(n: number, symbol: string) {
  return `${symbol}${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function estimateTax(inputs: Inputs): { tax: number; refund: number; symbol: string } | null {
  const gross = parseFloat(inputs.grossIncome || '0');
  const withheld = parseFloat(inputs.withheld || '0');
  const deductions = parseFloat(inputs.deductions || '0');
  const other = parseFloat(inputs.otherIncome || '0');
  const country = COUNTRIES.find(c => c.id === inputs.country);
  if (!gross || !country) return null;

  const totalIncome = gross + other;
  let taxableIncome = totalIncome;
  let estimatedTax = 0;
  const sym = country.currency;

  if (inputs.country === 'uk') {
    const personalAllowance = totalIncome > 125140 ? 0 : totalIncome > 100000 ? Math.max(0, 12570 - (totalIncome - 100000) / 2) : 12570;
    taxableIncome = Math.max(0, totalIncome - personalAllowance - deductions);
    if (taxableIncome <= 37700) estimatedTax = taxableIncome * 0.20;
    else if (taxableIncome <= 112570) estimatedTax = 37700 * 0.20 + (taxableIncome - 37700) * 0.40;
    else estimatedTax = 37700 * 0.20 + 74870 * 0.40 + (taxableIncome - 112570) * 0.45;
  } else if (inputs.country === 'usa') {
    taxableIncome = Math.max(0, totalIncome - 14600 - deductions);
    const brackets = [[11925, 0.10], [48475, 0.12], [103350, 0.22], [197300, 0.24], [250525, 0.32], [626350, 0.35], [Infinity, 0.37]];
    let prev = 0;
    for (const [limit, rate] of brackets) {
      if (taxableIncome <= prev) break;
      estimatedTax += (Math.min(taxableIncome, limit as number) - prev) * (rate as number);
      prev = limit as number;
    }
  } else if (inputs.country === 'canada') {
    taxableIncome = Math.max(0, totalIncome - deductions);
    const brackets = [[57375, 0.15], [114750, 0.205], [158519, 0.26], [220000, 0.29], [Infinity, 0.33]];
    let prev = 0;
    for (const [limit, rate] of brackets) {
      if (taxableIncome <= prev) break;
      estimatedTax += (Math.min(taxableIncome, limit as number) - prev) * (rate as number);
      prev = limit as number;
    }
    estimatedTax = Math.max(0, estimatedTax - 15705 * 0.15);
  } else if (inputs.country === 'australia') {
    taxableIncome = Math.max(0, totalIncome - deductions);
    if (taxableIncome <= 18200) estimatedTax = 0;
    else if (taxableIncome <= 45000) estimatedTax = (taxableIncome - 18200) * 0.19;
    else if (taxableIncome <= 120000) estimatedTax = 5092 + (taxableIncome - 45000) * 0.325;
    else if (taxableIncome <= 180000) estimatedTax = 29467 + (taxableIncome - 120000) * 0.37;
    else estimatedTax = 51667 + (taxableIncome - 180000) * 0.45;
    estimatedTax += taxableIncome * 0.02; // Medicare levy
  } else if (inputs.country === 'germany') {
    taxableIncome = Math.max(0, totalIncome - deductions);
    if (taxableIncome <= 11784) estimatedTax = 0;
    else if (taxableIncome <= 17005) estimatedTax = (taxableIncome - 11784) * 0.14;
    else if (taxableIncome <= 66760) {
      const y = (taxableIncome - 15999) / 10000;
      estimatedTax = (181.19 * y + 2397) * y + 1025.38;
    } else if (taxableIncome <= 277825) estimatedTax = taxableIncome * 0.42 - 10347;
    else estimatedTax = taxableIncome * 0.45 - 18674;
  }

  const refund = withheld - estimatedTax;
  return { tax: Math.round(estimatedTax), refund: Math.round(refund), symbol: sym };
}

const STEPS = ['Country', 'Income', 'Deductions', 'Result'];

export default function RefundEstimator() {
  useSEO({
    title: 'Tax Refund Estimator 2025 — UK, USA, Canada, Australia, Germany | GlobalTax',
    description: 'Estimate your tax refund or bill in minutes. Enter your income, what was withheld, and your deductions. Covers UK, USA, Canada, Australia, and Germany.',
    canonical: 'https://taxnova.com/refund-estimator',
  });

  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<Inputs>({ country: '', grossIncome: '', withheld: '', deductions: '', otherIncome: '' });

  const country = COUNTRIES.find(c => c.id === inputs.country);
  const set = (key: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs(prev => ({ ...prev, [key]: e.target.value }));

  const result = step === 3 ? estimateTax(inputs) : null;

  const canNext = step === 0 ? !!inputs.country : step === 1 ? !!inputs.grossIncome : true;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[640px] mx-auto px-4 py-8">
        <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Tax Refund Estimator', url: '/refund-estimator' }]} />

        <h1 className="text-3xl font-bold text-[#0f172a] mb-2 mt-4">Tax Refund Estimator</h1>
        <p className="text-[#334155] mb-8 leading-relaxed">Answer 3 quick questions to estimate how much tax refund you could receive — or whether you owe more.</p>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i < step ? 'bg-[#059669] text-white' : i === step ? 'bg-[#1d4ed8] text-white' : 'bg-[#e2e8f0] text-[#94a3b8]'}`}>
                {i < step ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium ${i === step ? 'text-[#1d4ed8]' : 'text-[#94a3b8]'}`}>{label}</span>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-[#e2e8f0] mx-1 min-w-[16px]" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-6 mb-6">
          {step === 0 && (
            <div>
              <h2 className="text-lg font-bold text-[#0f172a] mb-4">Which country do you pay tax in?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COUNTRIES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setInputs(prev => ({ ...prev, country: c.id }))}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${inputs.country === c.id ? 'border-[#1d4ed8] bg-[#dbeafe]' : 'border-[#e2e8f0] bg-white hover:border-[#1d4ed8]'}`}
                    data-testid={`country-btn-${c.id}`}
                  >
                    <span className="text-xl">{c.flag}</span>
                    <span className="font-medium text-sm text-[#0f172a]">{c.name}</span>
                    {inputs.country === c.id && <CheckCircle className="w-4 h-4 text-[#1d4ed8] ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && country && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-[#0f172a] mb-4">Tell us about your income</h2>
              <div>
                <label className="block text-sm font-medium text-[#334155] mb-1.5">
                  Gross annual income <span className="text-[#94a3b8]">({country.currency})</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] font-mono text-sm">{country.currency}</span>
                  <input type="number" value={inputs.grossIncome} onChange={set('grossIncome')} placeholder="50000"
                    className="w-full border border-[#e2e8f0] rounded-xl py-3 pl-12 pr-4 text-sm bg-white focus:outline-none focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#334155] mb-1.5">
                  Tax already withheld / paid <span className="text-[#94a3b8]">({country.currency})</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] font-mono text-sm">{country.currency}</span>
                  <input type="number" value={inputs.withheld} onChange={set('withheld')} placeholder="8000"
                    className="w-full border border-[#e2e8f0] rounded-xl py-3 pl-12 pr-4 text-sm bg-white focus:outline-none focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] transition-colors" />
                </div>
                <p className="text-xs text-[#94a3b8] mt-1">From your P60, W-2, T4, payment summary, or Lohnsteuerbescheinigung</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#334155] mb-1.5">
                  Other taxable income <span className="text-[#94a3b8]">optional ({country.currency})</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] font-mono text-sm">{country.currency}</span>
                  <input type="number" value={inputs.otherIncome} onChange={set('otherIncome')} placeholder="0"
                    className="w-full border border-[#e2e8f0] rounded-xl py-3 pl-12 pr-4 text-sm bg-white focus:outline-none focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] transition-colors" />
                </div>
                <p className="text-xs text-[#94a3b8] mt-1">Rental income, freelance, dividends, etc.</p>
              </div>
            </div>
          )}

          {step === 2 && country && (
            <div>
              <h2 className="text-lg font-bold text-[#0f172a] mb-1">Any deductions to apply?</h2>
              <p className="text-sm text-[#64748b] mb-5">Enter the total value of deductions you plan to claim. Skip this step if you're using the standard deduction.</p>
              <div>
                <label className="block text-sm font-medium text-[#334155] mb-1.5">
                  Total deductions <span className="text-[#94a3b8]">optional ({country.currency})</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] font-mono text-sm">{country.currency}</span>
                  <input type="number" value={inputs.deductions} onChange={set('deductions')} placeholder="0"
                    className="w-full border border-[#e2e8f0] rounded-xl py-3 pl-12 pr-4 text-sm bg-white focus:outline-none focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] transition-colors" />
                </div>
                <p className="text-xs text-[#94a3b8] mt-1">
                  {inputs.country === 'uk' && 'Pension contributions, Gift Aid donations, allowable expenses'}
                  {inputs.country === 'usa' && 'Mortgage interest, charitable donations, medical expenses if itemizing'}
                  {inputs.country === 'canada' && 'RRSP contributions, childcare, moving expenses'}
                  {inputs.country === 'australia' && 'Work-related expenses, charitable donations, self-education costs'}
                  {inputs.country === 'germany' && 'Werbungskosten, Sonderausgaben, Außergewöhnliche Belastungen'}
                </p>
              </div>
            </div>
          )}

          {step === 3 && result && country && (
            <div>
              <h2 className="text-lg font-bold text-[#0f172a] mb-6">Your estimated result</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 text-center">
                  <p className="text-xs text-[#64748b] mb-1">Estimated tax owed</p>
                  <p className="text-2xl font-bold text-[#d97706]">{fmt(result.tax, country.currency)}</p>
                </div>
                <div className={`border rounded-xl p-4 text-center ${result.refund >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                  <p className="text-xs text-[#64748b] mb-1">{result.refund >= 0 ? 'Estimated refund' : 'Additional tax owed'}</p>
                  <p className={`text-2xl font-bold ${result.refund >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {result.refund < 0 ? '-' : ''}{fmt(result.refund, country.currency)}
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 rounded-xl p-4 text-sm mb-6 ${result.refund >= 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                {result.refund >= 0
                  ? <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
                  : <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />}
                <p>
                  {result.refund >= 0
                    ? `It looks like you may be due a refund of approximately ${fmt(result.refund, country.currency)}. File your return to claim it.`
                    : `You may owe an additional ${fmt(Math.abs(result.refund), country.currency)} on top of what was withheld. Set money aside before your filing deadline.`}
                </p>
              </div>

              <div className="bg-[#fff9e6] border border-amber-200 rounded-xl p-4 text-xs text-amber-800 mb-4">
                <strong>This is an estimate only.</strong> It uses simplified federal/national tax calculations and does not account for all credits, allowances, state/provincial taxes, or personal circumstances. Always verify with a qualified tax professional or the official calculator.
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href={`/tools/${inputs.country === 'uk' ? 'uk-income-tax-calculator' : inputs.country === 'usa' ? 'us-federal-income-tax-calculator' : inputs.country === 'canada' ? 'canada-income-tax-calculator' : inputs.country === 'australia' ? 'australia-income-tax-calculator' : 'germany-income-tax-calculator'}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1d4ed8] border border-[#dbeafe] bg-white hover:bg-[#dbeafe] px-4 py-2 rounded-xl transition-colors">
                  <Calculator className="w-3.5 h-3.5" /> Full tax calculator
                </Link>
                <Link href="/best-tax-software"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#64748b] border border-[#e2e8f0] bg-white hover:bg-[#f8fafc] px-4 py-2 rounded-xl transition-colors">
                  Best tax software →
                </Link>
                <button onClick={() => { setStep(0); setInputs({ country: '', grossIncome: '', withheld: '', deductions: '', otherIncome: '' }); }}
                  className="text-sm text-[#94a3b8] hover:text-[#1d4ed8] transition-colors">
                  Start over
                </button>
              </div>
            </div>
          )}

          {step === 3 && !result && (
            <div className="text-center py-6">
              <p className="text-[#64748b] mb-4">Unable to calculate — please check your inputs.</p>
              <button onClick={() => setStep(0)} className="text-sm text-[#1d4ed8] hover:underline">Start over</button>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        {step < 3 && (
          <div className="flex items-center justify-between">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#64748b] hover:text-[#1d4ed8] transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext}
              className="inline-flex items-center gap-2 bg-[#1d4ed8] hover:bg-[#1e40af] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
              data-testid="btn-next"
            >
              {step === 2 ? 'Calculate' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
