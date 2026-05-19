import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Calculator, Menu, X, Search } from 'lucide-react';
import { SearchModal } from '@/components/search/SearchModal';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/compare', label: 'Compare' },
  { href: '/blog', label: 'Blog' },
  { href: '/best-tax-software', label: 'Software' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [location] = useLocation();

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <header className="sticky top-0 z-50 bg-white border-b border-[#e2e8f0] shadow-sm">
        <div className="max-w-[1120px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-[#1d4ed8] text-xl" data-testid="link-logo">
            <Calculator className="w-5 h-5" />
            GlobalTax
          </Link>

          <nav className="hidden md:flex items-center gap-6" data-testid="nav-desktop">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  location === link.href
                    ? 'text-[#1d4ed8]'
                    : 'text-[#334155] hover:text-[#1d4ed8]'
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#1d4ed8] border border-[#e2e8f0] hover:border-[#1d4ed8] rounded-lg px-3 py-1.5 transition-all bg-[#f8fafc] hover:bg-[#dbeafe]"
              data-testid="button-search"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs">Search</span>
              <kbd className="hidden lg:inline-flex text-[10px] font-mono border border-[#e2e8f0] bg-white rounded px-1">⌘K</kbd>
            </button>

            <button
              className="md:hidden p-2 rounded-md text-[#334155] hover:bg-[#f1f5f9]"
              onClick={() => setOpen(!open)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-[#e2e8f0] bg-white px-4 py-3 flex flex-col gap-1" data-testid="nav-mobile">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-[#334155] hover:text-[#1d4ed8]"
                onClick={() => setOpen(false)}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { setOpen(false); setSearchOpen(true); }}
              className="py-2 text-sm font-medium text-[#334155] hover:text-[#1d4ed8] text-left flex items-center gap-2"
            >
              <Search className="w-3.5 h-3.5" /> Search
            </button>
          </div>
        )}
      </header>
    </>
  );
}
