import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Search, X, Calculator, BookOpen, ArrowRight } from 'lucide-react';
import { TOOLS } from '@/data/tools/tools-manifest';
import { BLOG_POSTS } from '@/data/blog/blog-manifest';

type Hit = {
  type: 'tool' | 'blog';
  title: string;
  slug: string;
  desc: string;
  flag?: string;
};

const ALL_HITS: Hit[] = [
  ...TOOLS.map(t => ({ type: 'tool' as const, title: t.title, slug: t.slug, desc: t.intro, flag: t.flag })),
  ...BLOG_POSTS.map(p => ({ type: 'blog' as const, title: p.title, slug: p.slug, desc: p.metaDescription })),
];

function pathFor(hit: Hit) {
  return hit.type === 'tool' ? `/tools/${hit.slug}` : `/blog/${hit.slug}`;
}

function search(query: string): Hit[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return ALL_HITS.filter(h =>
    h.title.toLowerCase().includes(q) || h.desc.toLowerCase().includes(q)
  ).slice(0, 8);
}

type Props = { open: boolean; onClose: () => void };

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Hit[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setResults(search(query));
  }, [query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!open) return;
        onClose();
      }
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#e2e8f0]">
          <Search className="w-4 h-4 text-[#94a3b8] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search calculators and guides..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 text-sm text-[#0f172a] placeholder-[#94a3b8] outline-none bg-transparent"
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex text-[10px] font-mono text-[#94a3b8] border border-[#e2e8f0] rounded px-1.5 py-0.5">ESC</kbd>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-[#f1f5f9] transition-colors">
              <X className="w-4 h-4 text-[#94a3b8]" />
            </button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="max-h-80 overflow-y-auto py-2">
            {results.map(hit => (
              <li key={`${hit.type}-${hit.slug}`}>
                <Link
                  href={pathFor(hit)}
                  onClick={onClose}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-[#f8fafc] transition-colors group"
                >
                  <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-md bg-[#dbeafe] flex items-center justify-center">
                    {hit.type === 'tool'
                      ? <Calculator className="w-3 h-3 text-[#1d4ed8]" />
                      : <BookOpen className="w-3 h-3 text-[#1d4ed8]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {hit.flag && <span className="text-sm">{hit.flag}</span>}
                      <span className="text-sm font-semibold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors truncate">
                        {hit.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748b] mt-0.5 line-clamp-1">{hit.desc}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#1d4ed8] flex-shrink-0 mt-1 transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        ) : query.trim() ? (
          <div className="px-4 py-8 text-center text-sm text-[#64748b]">
            No results for <strong className="text-[#0f172a]">"{query}"</strong>
          </div>
        ) : (
          <div className="px-4 py-6">
            <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-3">Popular</p>
            <div className="space-y-1">
              {ALL_HITS.slice(0, 5).map(hit => (
                <Link
                  key={hit.slug}
                  href={pathFor(hit)}
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-[#f8fafc] transition-colors group"
                >
                  <div className="w-5 h-5 rounded bg-[#f1f5f9] flex items-center justify-center flex-shrink-0">
                    {hit.type === 'tool' ? <Calculator className="w-3 h-3 text-[#64748b]" /> : <BookOpen className="w-3 h-3 text-[#64748b]" />}
                  </div>
                  {hit.flag && <span className="text-sm">{hit.flag}</span>}
                  <span className="text-sm text-[#334155] group-hover:text-[#1d4ed8] transition-colors">{hit.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="px-4 py-2.5 border-t border-[#f1f5f9] flex items-center gap-3 text-[10px] text-[#94a3b8]">
          <span>15 calculators</span>
          <span>·</span>
          <span>18 guides</span>
          <span>·</span>
          <span className="ml-auto">Press <kbd className="font-mono border border-[#e2e8f0] rounded px-1">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
