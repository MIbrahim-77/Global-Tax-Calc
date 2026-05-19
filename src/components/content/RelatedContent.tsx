import { Link } from 'wouter';
import { ArrowRight, BookOpen, Calculator } from 'lucide-react';

type RelatedItem = {
  type: 'tool' | 'blog' | 'compare';
  title: string;
  slug: string;
  desc?: string;
};

type Props = {
  items: RelatedItem[];
  heading?: string;
};

const pathFor = (item: RelatedItem) => {
  if (item.type === 'tool') return `/tools/${item.slug}`;
  if (item.type === 'blog') return `/blog/${item.slug}`;
  return `/compare/${item.slug}`;
};

export function RelatedContent({ items, heading = 'Related Resources' }: Props) {
  if (!items.length) return null;
  return (
    <section className="my-8">
      <h3 className="text-lg font-bold text-[#0f172a] mb-4">{heading}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map(item => (
          <Link
            key={`${item.type}-${item.slug}`}
            href={pathFor(item)}
            className="group flex items-start gap-3 bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#1d4ed8] hover:bg-[#dbeafe] rounded-xl p-4 transition-all"
          >
            <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg bg-[#dbeafe] flex items-center justify-center">
              {item.type === 'blog' ? (
                <BookOpen className="w-3.5 h-3.5 text-[#1d4ed8]" />
              ) : (
                <Calculator className="w-3.5 h-3.5 text-[#1d4ed8]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-[#0f172a] group-hover:text-[#1d4ed8] leading-snug transition-colors">
                  {item.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#1d4ed8] flex-shrink-0 mt-0.5 transition-colors" />
              </div>
              {item.desc && (
                <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed line-clamp-2">{item.desc}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
