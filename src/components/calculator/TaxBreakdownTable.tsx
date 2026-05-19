import { formatCurrency, formatPercent } from '@/lib/formatters';

type Row = { band: string; taxable: number; tax: number; rate: number };

type TaxBreakdownTableProps = {
  rows: Row[];
  symbol: string;
  title?: string;
};

export function TaxBreakdownTable({ rows, symbol, title = 'Tax Breakdown' }: TaxBreakdownTableProps) {
  if (rows.length === 0) return null;
  return (
    <div className="mt-6" data-testid="tax-breakdown-table">
      <h3 className="text-base font-semibold text-[#0f172a] mb-3">{title}</h3>
      <div className="overflow-x-auto rounded-lg border border-[#e2e8f0]">
        <table className="w-full text-sm">
          <thead className="bg-[#f1f5f9]">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-[#0f172a]">Band / Component</th>
              <th className="text-right px-4 py-3 font-semibold text-[#0f172a] tabular-nums">Taxable Amount</th>
              <th className="text-right px-4 py-3 font-semibold text-[#0f172a]">Rate</th>
              <th className="text-right px-4 py-3 font-semibold text-[#0f172a] tabular-nums">Tax</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0]">
            {rows.map((row, i) => (
              <tr key={i} className="bg-white hover:bg-[#f8fafc] transition-colors">
                <td className="px-4 py-3 text-[#334155]">{row.band}</td>
                <td className="px-4 py-3 text-right text-[#334155] tabular-nums font-mono">{formatCurrency(row.taxable, symbol)}</td>
                <td className="px-4 py-3 text-right text-[#64748b]">{formatPercent(row.rate * 100)}</td>
                <td className="px-4 py-3 text-right text-[#d97706] font-semibold tabular-nums font-mono">{formatCurrency(row.tax, symbol)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
