import { useState } from 'react';
import { Download, CheckCircle2, FileText } from 'lucide-react';

const CHECKLIST_ITEMS: Record<string, { title: string; items: string[] }> = {
  uk: {
    title: 'UK Tax Return Checklist 2025/26',
    items: [
      'P60 end-of-year certificate from your employer',
      'P45 if you changed jobs during the year',
      'Bank statements for interest income',
      'Rental income records (if applicable)',
      'Self-employment income and expenses',
      'Gift Aid donations total for the year',
      'Pension contributions (personal, not workplace)',
      'Student loan repayment records',
      'Unique Taxpayer Reference (UTR) number',
      'NI number and personal details',
    ],
  },
  usa: {
    title: 'US Tax Return Checklist 2025',
    items: [
      'W-2 forms from all employers',
      '1099 forms (freelance, interest, dividends)',
      'Last year\'s tax return for reference',
      'Social Security numbers for all dependents',
      'Mortgage interest statements (Form 1098)',
      'Student loan interest paid',
      'Charitable donation receipts',
      'Health insurance coverage documents',
      'Business income/expense records',
      'Bank account details for direct deposit refund',
    ],
  },
  canada: {
    title: 'Canadian Tax Return Checklist 2025',
    items: [
      'T4 slips from all employers',
      'T5 slips for investment income',
      'RRSP contribution receipts',
      'T4A for other income (self-employment, pension)',
      'Receipts for childcare expenses',
      'Medical expense receipts over 3% of net income',
      'Union/professional dues receipts',
      'Moving expense receipts (if applicable)',
      'Tuition receipts (T2202)',
      'SIN number and province of residence',
    ],
  },
  australia: {
    title: 'Australian Tax Return Checklist 2024-25',
    items: [
      'Payment summaries or income statements',
      'Bank interest statements',
      'Dividend statements',
      'Work-related expense receipts (>$300)',
      'Log book or km records for car expenses',
      'Home office expense records',
      'Income protection insurance premiums',
      'Private health insurance statement',
      'Superannuation statements',
      'Tax File Number (TFN)',
    ],
  },
  germany: {
    title: 'German Tax Return Checklist 2025',
    items: [
      'Lohnsteuerbescheinigung (income tax certificate)',
      'Bank statements for Kapitalerträge (investment income)',
      'Werbungskosten receipts (work-related expenses)',
      'Receipts for Handwerkerleistungen (craftsman services)',
      'Kirchensteuer (church tax) confirmation',
      'Sonderausgaben (special expenses) receipts',
      'Rental income and expenses (if applicable)',
      'Health insurance premium statements',
      'Pension contribution records (Altersvorsorge)',
      'Steueridentifikationsnummer (tax ID)',
    ],
  },
};

type Props = {
  country?: string;
};

export function LeadMagnet({ country = 'uk' }: Props) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const checklist = CHECKLIST_ITEMS[country] ?? CHECKLIST_ITEMS.uk;

  const onDownload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden my-8">
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] px-6 py-5 flex items-center gap-3">
        <div className="bg-white/10 rounded-xl p-2 flex-shrink-0">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white text-base">{checklist.title}</h3>
          <p className="text-blue-200 text-sm">Free download — everything you need in one place</p>
        </div>
      </div>

      <div className="px-6 py-5">
        {submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span className="font-semibold text-[#0f172a]">Here's your checklist — save or print it.</span>
            </div>
            <ul className="space-y-2">
              {checklist.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#334155]">
                  <span className="mt-0.5 w-4 h-4 rounded border border-[#cbd5e1] flex-shrink-0 bg-[#f8fafc] inline-block" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => window.print()}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1d4ed8] border border-[#dbeafe] bg-[#f8fafc] hover:bg-[#dbeafe] px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-[#334155] mb-4">
              Get our free tax return checklist — {checklist.items.length} things you need to gather before filing. Enter your email and we'll also send you our monthly tax tips.
            </p>
            <form onSubmit={onDownload} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm outline-none focus:border-[#1d4ed8] focus:ring-4 focus:ring-[#dbeafe] transition-all"
              />
              <button
                type="submit"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Get Free Checklist
              </button>
            </form>
            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
            <p className="mt-2 text-[11px] text-[#94a3b8]">No spam. Demo only — no real email collected.</p>
          </div>
        )}
      </div>
    </div>
  );
}
