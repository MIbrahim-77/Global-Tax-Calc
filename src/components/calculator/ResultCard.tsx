type Highlight = 'success' | 'warning' | 'neutral' | 'default';

type ResultCardProps = {
  label: string;
  value: string;
  highlight?: Highlight;
  subValue?: string;
};

const colorMap: Record<Highlight, string> = {
  success: 'text-[#059669]',
  warning: 'text-[#d97706]',
  neutral: 'text-[#0f172a]',
  default: 'text-[#1d4ed8]',
};

export function ResultCard({ label, value, highlight = 'default', subValue }: ResultCardProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 shadow-sm" data-testid={`result-card-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="text-xs font-medium text-[#64748b] uppercase tracking-wide mb-1">{label}</div>
      <div className={`text-2xl font-bold tabular-nums ${colorMap[highlight]}`}>{value}</div>
      {subValue && <div className="text-sm text-[#64748b] mt-1 tabular-nums">{subValue}</div>}
    </div>
  );
}
