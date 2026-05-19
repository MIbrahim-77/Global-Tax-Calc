import { Link } from 'wouter';
import { Clock, Calendar } from 'lucide-react';
import type { BlogPost } from '@/data/blog/blog-manifest';

const countryFlags: Record<string, string> = {
  UK: '🇬🇧', USA: '🇺🇸', Canada: '🇨🇦', Australia: '🇦🇺', Germany: '🇩🇪', Global: '🌍',
};

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group" data-testid={`blog-card-${post.slug}`}>
      <article className="bg-white border border-[#e2e8f0] rounded-xl p-5 h-full hover:shadow-md transition-shadow hover:border-[#1d4ed8]">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium bg-[#dbeafe] text-[#1d4ed8] px-2 py-0.5 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-[#64748b]">{countryFlags[post.country] ?? '🌍'}</span>
        </div>
        <h3 className="font-semibold text-[#0f172a] leading-snug mb-2 group-hover:text-[#1d4ed8] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-[#334155] leading-relaxed line-clamp-3 mb-4">{post.intro}</p>
        <div className="flex items-center gap-4 text-xs text-[#64748b]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.publishDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </article>
    </Link>
  );
}
