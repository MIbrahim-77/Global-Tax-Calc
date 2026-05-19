import { formatCurrency, formatPercent } from '@/lib/formatters';

type CountryResult = {
  country: string;
  flag: string;
  symbol: string;
  netSalary: number;
  totalTax: number;
  effectiveRate: number;
};

export function SideBySideResult({ left, right }: { left: CountryResult; right: CountryResult }) {
  const maxNet = Math.max(left.netSalary, right.netSalary);

  return (
    <div className="mt-6" data-testid="side-by-side-result">
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[left, right].map(r => (
          <div key={r.country} className="bg-white border border-[#e2e8f0] rounded-xl p-5">
            <div className="text-2xl mb-1">{r.flag}</div>
            <h3 className="font-bold text-[#0f172a] mb-4">{r.country}</h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-[#64748b] font-medium uppercase tracking-wide mb-0.5">Take-Home Pay</div>
                <div className="text-2xl font-bold text-[#059669] tabular-nums">{formatCurrency(r.netSalary, r.symbol)}</div>
              </div>
              <div>
                <div className="text-xs text-[#64748b] font-medium uppercase tracking-wide mb-0.5">Total Tax</div>
                <div className="text-xl font-semibold text-[#d97706] tabular-nums">{formatCurrency(r.totalTax, r.symbol)}</div>
              </div>
              <div>
                <div className="text-xs text-[#64748b] font-medium uppercase tracking-wide mb-0.5">Effective Rate</div>
                <div className="text-lg font-semibold text-[#1d4ed8]">{formatPercent(r.effectiveRate)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[#64748b] uppercase tracking-wide mb-4">Take-Home Pay Comparison</h3>
        {[left, right].map(r => (
          <div key={r.country} className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-[#334155]">{r.flag} {r.country}</span>
              <span className="font-semibold text-[#0f172a] tabular-nums">{formatCurrency(r.netSalary, r.symbol)}</span>
            </div>
            <div className="w-full bg-[#e2e8f0] rounded-full h-3">
              <div
                className="bg-[#059669] h-3 rounded-full transition-all"
                style={{ width: `${maxNet > 0 ? (r.netSalary / maxNet) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
        <p className="text-xs text-[#64748b] mt-4">
          Figures shown in each country's local currency. Exchange rates not applied.
        </p>
      </div>
    </div>
  );
}
