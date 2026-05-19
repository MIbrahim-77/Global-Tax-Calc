import { useState, useEffect } from 'react';

type TOCSection = { h2: string };

export function TableOfContents({ sections }: { sections: TOCSection[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handler = () => {
      const headings = sections.map((s, i) => ({
        i,
        el: document.getElementById(`section-${i}`),
      }));
      const scrolled = headings.filter(h => h.el && h.el.getBoundingClientRect().top <= 120);
      if (scrolled.length > 0) setActive(scrolled[scrolled.length - 1].i);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 mb-6" data-testid="table-of-contents">
      <div className="text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-3">Contents</div>
      <ol className="space-y-2">
        {sections.map((s, i) => (
          <li key={i}>
            <a
              href={`#section-${i}`}
              onClick={e => {
                e.preventDefault();
                const el = document.getElementById(`section-${i}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`text-sm transition-colors block py-0.5 ${
                active === i ? 'text-[#1d4ed8] font-medium' : 'text-[#334155] hover:text-[#1d4ed8]'
              }`}
            >
              {s.h2}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
