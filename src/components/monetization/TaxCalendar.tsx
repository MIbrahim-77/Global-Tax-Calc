import { useState } from 'react';
import { Bell, CheckCircle2, Calendar } from 'lucide-react';

const DEADLINES = [
  { country: '🇬🇧 UK', date: '31 Jan 2026', label: 'Online Self Assessment deadline' },
  { country: '🇺🇸 USA', date: '15 Apr 2026', label: 'Federal tax return deadline' },
  { country: '🇨🇦 Canada', date: '30 Apr 2026', label: 'T1 personal return deadline' },
  { country: '🇦🇺 Australia', date: '31 Oct 2025', label: 'myTax self-lodge deadline' },
  { country: '🇩🇪 Germany', date: '31 Jul 2026', label: 'Steuererklärung deadline' },
];

export function TaxCalendar() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) { setError('Please enter a valid email.'); return; }
    setSubmitted(true);
  };

  return (
    <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden my-8">
      <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] px-6 py-5">
        <div className="flex items-center gap-3 mb-1">
          <Bell className="w-5 h-5 text-white flex-shrink-0" />
          <h3 className="font-bold text-white text-base">Tax Deadline Reminders</h3>
        </div>
        <p className="text-blue-200 text-sm">Get emailed before every major filing deadline — never miss a date.</p>
      </div>

      <div className="px-6 py-5">
        {/* Deadline preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
          {DEADLINES.slice(0, 4).map((d, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3 py-2.5">
              <Calendar className="w-3.5 h-3.5 text-[#1d4ed8] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#0f172a]">{d.country} · {d.date}</p>
                <p className="text-[11px] text-[#64748b]">{d.label}</p>
              </div>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-emerald-800 text-sm">You're signed up!</p>
              <p className="text-xs text-emerald-600 mt-0.5">We'll remind you before each country's filing deadline. (Demo — no real email sent.)</p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="flex flex-col sm:flex-row gap-2">
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
                <Bell className="w-3.5 h-3.5" />
                Get Reminders
              </button>
            </div>
            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
            <p className="mt-2 text-[11px] text-[#94a3b8]">Free · No spam · Unsubscribe anytime · Demo only</p>
          </form>
        )}
      </div>
    </div>
  );
}
