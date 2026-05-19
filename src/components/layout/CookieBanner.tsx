import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Link } from 'wouter';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gt_cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('gt_cookie_consent', 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('gt_cookie_consent', 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f172a] text-white shadow-2xl border-t border-[#1e293b]"
      data-testid="cookie-banner"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-[1120px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="w-5 h-5 text-[#60a5fa] shrink-0 mt-0.5" />
          <p className="text-sm text-[#cbd5e1] leading-relaxed">
            We use cookies to display ads and analyse site traffic. By clicking "Accept", you consent to our use of cookies as described in our{' '}
            <Link href="/privacy" className="text-[#60a5fa] hover:underline">Privacy Policy</Link>.
            Ads help keep GlobalTax free for everyone.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-[#94a3b8] hover:text-white border border-[#334155] hover:border-[#475569] rounded-lg transition-colors"
            data-testid="button-cookie-decline"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-medium bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-lg transition-colors"
            data-testid="button-cookie-accept"
          >
            Accept all
          </button>
          <button
            onClick={decline}
            className="p-1.5 text-[#64748b] hover:text-white transition-colors"
            aria-label="Close"
            data-testid="button-cookie-close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
