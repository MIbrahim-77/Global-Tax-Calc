import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = { name: string; url: string };

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-[#64748b] mb-4 flex-wrap" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.url} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3 text-[#94a3b8]" />}
          {i === items.length - 1 ? (
            <span className="text-[#0f172a] font-medium">{item.name}</span>
          ) : (
            <Link href={item.url} className="hover:text-[#1d4ed8] transition-colors">{item.name}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
