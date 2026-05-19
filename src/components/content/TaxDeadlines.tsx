import { Calendar, AlertCircle } from 'lucide-react';

type Deadline = {
  label: string;
  date: Date;
  description: string;
  urgent?: boolean;
};

const DEADLINES: Record<string, Deadline[]> = {
  uk: [
    { label: 'Paper Self Assessment return', date: new Date('2025-10-31'), description: 'Deadline to file your 2024/25 Self Assessment tax return on paper.' },
    { label: 'Online Self Assessment return', date: new Date('2026-01-31'), description: 'Deadline to file your 2024/25 Self Assessment return online and pay any tax owed.' },
    { label: 'Payment on account (1st)', date: new Date('2026-01-31'), description: 'First payment on account for 2025/26 tax year is due alongside the January deadline.' },
    { label: 'Payment on account (2nd)', date: new Date('2026-07-31'), description: 'Second payment on account for 2025/26 tax year.' },
    { label: 'New tax year begins', date: new Date('2026-04-06'), description: 'The 2025/26 UK tax year ends and 2026/27 begins.' },
  ],
  usa: [
    { label: 'W-2 forms issued by employers', date: new Date('2026-01-31'), description: 'Employers must send W-2 forms to employees by January 31.' },
    { label: 'Federal tax return deadline', date: new Date('2026-04-15'), description: 'File your 2025 federal income tax return or request an extension. Tax owed is due today even with an extension.' },
    { label: 'Q1 estimated tax payment', date: new Date('2026-04-15'), description: 'First quarter 2026 estimated tax payment due for self-employed and freelancers.' },
    { label: 'Extension filing deadline', date: new Date('2026-10-15'), description: 'Final deadline for returns filed on extension. No further extensions are available.' },
  ],
  canada: [
    { label: 'T4 slips issued by employers', date: new Date('2026-02-28'), description: 'Employers must send T4 slips to employees by end of February.' },
    { label: 'Personal tax return deadline', date: new Date('2026-04-30'), description: 'File your 2025 T1 personal income tax return. Any balance owed is due today.' },
    { label: 'Self-employed filing deadline', date: new Date('2026-06-15'), description: 'Self-employed individuals and spouses have until June 15 to file, but taxes owed must be paid by April 30.' },
    { label: 'RRSP contribution deadline', date: new Date('2026-03-02'), description: 'Deadline to make RRSP contributions that can be deducted from 2025 income.' },
  ],
  australia: [
    { label: 'Lodge your own tax return', date: new Date('2025-10-31'), description: 'Deadline to lodge your 2024-25 tax return if filing yourself through myTax.' },
    { label: 'Tax agent deadline (individuals)', date: new Date('2026-05-15'), description: 'If using a registered tax agent, the deadline is typically 15 May 2026.' },
    { label: 'New financial year begins', date: new Date('2025-07-01'), description: 'The 2024-25 financial year ended June 30. You can now lodge your 2024-25 return.' },
    { label: 'BAS lodgment (quarterly)', date: new Date('2025-10-28'), description: 'Q1 2025-26 Business Activity Statement (BAS) due for quarterly lodgers.' },
  ],
  germany: [
    { label: 'Steuererklärung (self-lodged)', date: new Date('2026-07-31'), description: 'Deadline to file your 2025 German tax return if filing without a tax advisor.' },
    { label: 'Steuererklärung (with advisor)', date: new Date('2027-02-28'), description: 'Extended deadline for 2025 returns filed through a registered Steuerberater.' },
    { label: 'Vorauszahlungen (Q1 2026)', date: new Date('2026-03-10'), description: 'Q1 2026 advance income tax payment due (Einkommensteuer-Vorauszahlung).' },
    { label: 'Vorauszahlungen (Q2 2026)', date: new Date('2026-06-10'), description: 'Q2 2026 advance income tax payment due.' },
  ],
};

function daysUntil(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

type Props = { country: string };

export function TaxDeadlines({ country }: Props) {
  const deadlines = DEADLINES[country] ?? [];
  if (!deadlines.length) return null;

  const now = new Date();
  const upcoming = deadlines
    .map(d => ({ ...d, days: daysUntil(d.date) }))
    .sort((a, b) => a.days - b.days);

  const next = upcoming.find(d => d.days >= 0);

  return (
    <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden">
      <div className="bg-[#0f172a] px-5 py-4 flex items-center gap-3">
        <Calendar className="w-5 h-5 text-blue-300 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-white text-sm">Key Tax Deadlines</h3>
          <p className="text-blue-200 text-xs">Upcoming filing and payment dates</p>
        </div>
        {next && next.days <= 30 && next.days >= 0 && (
          <div className="ml-auto flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <AlertCircle className="w-3 h-3" />
            {next.days === 0 ? 'Due Today' : `${next.days}d`}
          </div>
        )}
      </div>
      <div className="divide-y divide-[#e2e8f0]">
        {upcoming.map((d, i) => {
          const isPast = d.days < 0;
          const isUrgent = d.days >= 0 && d.days <= 30;
          const isSoon = d.days > 30 && d.days <= 90;
          return (
            <div key={i} className={`px-5 py-3.5 flex items-start gap-4 ${isPast ? 'opacity-40' : ''}`}>
              <div className={`flex-shrink-0 w-14 text-center rounded-lg py-1.5 ${isUrgent ? 'bg-red-50 border border-red-200' : isSoon ? 'bg-amber-50 border border-amber-200' : 'bg-[#f8fafc] border border-[#e2e8f0]'}`}>
                <div className={`text-xs font-bold ${isUrgent ? 'text-red-600' : isSoon ? 'text-amber-600' : 'text-[#64748b]'}`}>
                  {isPast ? 'Past' : d.days === 0 ? 'Today' : `${d.days}d`}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-[#0f172a] leading-snug">{d.label}</p>
                  <span className="text-xs text-[#94a3b8] flex-shrink-0 whitespace-nowrap">{formatDate(d.date)}</span>
                </div>
                <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">{d.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
