import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '@/lib/formatters';

type TaxBreakdownChartProps = {
  data: { name: string; value: number; color: string }[];
  symbol: string;
};

export function TaxBreakdownChart({ data, symbol }: TaxBreakdownChartProps) {
  const filtered = data.filter(d => d.value > 0);
  if (filtered.length === 0) return null;

  const total = filtered.reduce((s, d) => s + d.value, 0);
  const chartData = [
    filtered.reduce<Record<string, number>>((acc, d) => {
      acc[d.name] = d.value;
      return acc;
    }, {})
  ];

  return (
    <div className="mt-6" data-testid="tax-breakdown-chart">
      <h3 className="text-base font-semibold text-[#0f172a] mb-3">Income Breakdown</h3>
      <div className="w-full h-12 flex rounded-lg overflow-hidden">
        {filtered.map(d => (
          <div
            key={d.name}
            style={{ width: `${(d.value / total) * 100}%`, backgroundColor: d.color }}
            className="flex items-center justify-center transition-all"
            title={`${d.name}: ${formatCurrency(d.value, symbol)}`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-3">
        {filtered.map(d => (
          <div key={d.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-sm text-[#64748b]">{d.name}</span>
            <span className="text-sm font-semibold text-[#0f172a] tabular-nums font-mono">{formatCurrency(d.value, symbol)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
