import { Link } from 'wouter';
import { Calculator } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#f8fafc] border-t border-[#e2e8f0] mt-16">
      <div className="max-w-[1120px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-[#1d4ed8] text-lg mb-3">
              <Calculator className="w-4 h-4" />
              GlobalTax
            </div>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Free tax calculators for the USA, UK, Canada, Australia, and Germany. Accurate 2025 estimates for informational purposes only.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0f172a] mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/tools', label: 'All Calculators' },
                { href: '/compare', label: 'Compare Countries' },
                { href: '/blog', label: 'Tax Guides' },
                { href: '/best-tax-software', label: 'Best Tax Software' },
                { href: '/refund-estimator', label: 'Refund Estimator' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/about', label: 'About' },
                { href: '/disclaimer', label: 'Disclaimer' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#64748b] hover:text-[#1d4ed8] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0f172a] mb-3">Country Tax Hubs</h3>
            <ul className="space-y-2">
              {[
                { href: '/uk', label: '🇬🇧 United Kingdom' },
                { href: '/usa', label: '🇺🇸 United States' },
                { href: '/canada', label: '🇨🇦 Canada' },
                { href: '/australia', label: '🇦🇺 Australia' },
                { href: '/germany', label: '🇩🇪 Germany' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#64748b] hover:text-[#1d4ed8] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0f172a] mb-3">Top Calculators</h3>
            <ul className="space-y-2">
              {[
                { href: '/tools/uk-income-tax-calculator', label: 'UK Income Tax' },
                { href: '/tools/us-federal-income-tax-calculator', label: 'US Federal Tax' },
                { href: '/tools/canada-income-tax-calculator', label: 'Canada Income Tax' },
                { href: '/tools/australia-income-tax-calculator', label: 'Australia Tax' },
                { href: '/tools/germany-income-tax-calculator', label: 'Germany Tax' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#64748b] hover:text-[#1d4ed8] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#e2e8f0] text-xs text-[#64748b] text-center">
          &copy; 2025 GlobalTax &middot; For informational purposes only &middot; Not financial or legal advice &middot;{' '}
          <Link href="/privacy" className="hover:text-[#1d4ed8] transition-colors">Privacy</Link>
          {' '}&middot;{' '}
          <Link href="/terms" className="hover:text-[#1d4ed8] transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
