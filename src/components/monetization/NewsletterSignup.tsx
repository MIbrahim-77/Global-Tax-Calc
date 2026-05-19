import { useState, type FormEvent } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#1d4ed8] to-[#1e40af] p-6 sm:p-8 text-white">
      <div className="flex items-start gap-4">
        <div className="bg-white/10 rounded-xl p-2.5 flex-shrink-0">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">Get Tax Updates in Your Inbox</h3>
          <p className="text-blue-100 text-sm mb-4 leading-relaxed">
            We send one email per month covering tax rate changes, new calculators, and money-saving tips across the UK, USA, Canada, Australia, and Germany.
          </p>

          {submitted ? (
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
              <span className="text-sm font-medium text-white">You're subscribed! (demo)</span>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-xl px-4 py-2.5 text-sm text-slate-900 bg-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex-shrink-0 bg-white text-[#1d4ed8] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-60"
              >
                {loading ? 'Subscribing…' : 'Subscribe Free'}
              </button>
            </form>
          )}

          {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
          <p className="mt-2 text-[11px] text-blue-200">No spam. Unsubscribe any time. (Demo — no real email is collected.)</p>
        </div>
      </div>
    </div>
  );
}
