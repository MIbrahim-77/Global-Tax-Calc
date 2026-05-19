import { useState } from 'react';
import { SideBySideResult } from './SideBySideResult';
import { calculateUKTax } from '@/lib/calculators/uk';
import { calculateUSATax } from '@/lib/calculators/usa';
import { calculateCanadaTax } from '@/lib/calculators/canada';
import { calculateAustraliaTax } from '@/lib/calculators/australia';
import { calculateGermanyTax } from '@/lib/calculators/germany';

const COUNTRY_META: Record<string, { name: string; flag: string; symbol: string; prefix: string }> = {
  uk: { name: 'United Kingdom', flag: '🇬🇧', symbol: '£', prefix: '£' },
  usa: { name: 'United States', flag: '🇺🇸', symbol: '$', prefix: '$' },
  canada: { name: 'Canada', flag: '🇨🇦', symbol: 'CA$', prefix: 'CA$' },
  australia: { name: 'Australia', flag: '🇦🇺', symbol: 'A$', prefix: 'A$' },
  germany: { name: 'Germany', flag: '🇩🇪', symbol: '€', prefix: '€' },
};

function calcForCountry(country: string, salary: number): { netSalary: number; totalTax: number; effectiveRate: number } {
  if (country === 'uk') {
    const r = calculateUKTax(salary);
    return { netSalary: r.netSalary, totalTax: r.totalDeductions, effectiveRate: r.effectiveRate };
  }
  if (country === 'usa') {
    const r = calculateUSATax(salary, 'single');
    return { netSalary: r.netSalary, totalTax: r.totalDeductions, effectiveRate: r.effectiveRate };
  }
  if (country === 'canada') {
    const r = calculateCanadaTax(salary, 'ontario');
    return { netSalary: r.netSalary, totalTax: r.totalDeductions, effectiveRate: r.effectiveRate };
  }
  if (country === 'australia') {
    const r = calculateAustraliaTax(salary);
    return { netSalary: r.netSalary, totalTax: r.totalTax, effectiveRate: r.effectiveRate };
  }
  if (country === 'germany') {
    const r = calculateGermanyTax(salary, false);
    return { netSalary: r.netSalary, totalTax: r.totalDeductions, effectiveRate: r.effectiveRate };
  }
  return { netSalary: 0, totalTax: 0, effectiveRate: 0 };
}

export function CompareShell({ countryA, countryB }: { countryA: string; countryB: string }) {
  const [salary, setSalary] = useState('');
  const [compared, setCompared] = useState<null | { left: ReturnType<typeof calcForCountry>; right: ReturnType<typeof calcForCountry> }>(null);
  const [error, setError] = useState('');

  const metaA = COUNTRY_META[countryA] ?? COUNTRY_META.uk;
  const metaB = COUNTRY_META[countryB] ?? COUNTRY_META.usa;

  function handleCompare() {
    const s = parseFloat(salary);
    if (!s || s <= 0) {
      setError('Please enter a valid salary amount.');
      return;
    }
    setError('');
    setCompared({
      left: calcForCountry(countryA, s),
      right: calcForCountry(countryB, s),
    });
  }

  return (
    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6" data-testid="compare-shell">
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#334155] mb-1.5">
          Annual Salary (enter amount in your preferred currency)
        </label>
        <input
          type="number"
          placeholder="e.g. 60000"
          value={salary}
          onChange={e => setSalary(e.target.value)}
          className="w-full max-w-xs border border-[#e2e8f0] rounded-lg py-3 px-4 text-[#0f172a] bg-white focus:outline-none focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] text-sm"
          data-testid="input-compare-salary"
        />
        <p className="text-xs text-[#64748b] mt-1">Each country calculates tax on this amount in its own currency.</p>
      </div>

      {error && <p className="text-sm text-[#dc2626] mb-3">{error}</p>}

      <button
        onClick={handleCompare}
        className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
        data-testid="button-compare"
      >
        Compare {metaA.flag} vs {metaB.flag}
      </button>

      {compared && (
        <SideBySideResult
          left={{ country: metaA.name, flag: metaA.flag, symbol: metaA.symbol, ...compared.left }}
          right={{ country: metaB.name, flag: metaB.flag, symbol: metaB.symbol, ...compared.right }}
        />
      )}
    </div>
  );
}
