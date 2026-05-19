import { useState } from 'react';
import { BLOG_POSTS } from '@/data/blog/blog-manifest';
import { BlogCard } from '@/components/blog/BlogCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { useSEO } from '@/hooks/use-seo';

const COUNTRIES = ['All', 'UK', 'USA', 'Canada', 'Australia', 'Germany', 'Global'];

export default function BlogIndex() {
  useSEO({
    title: 'Tax Guides & Articles — GlobalTax',
    description: 'Plain-English tax guides for the UK, USA, Canada, Australia, and Germany. Learn how income tax works, understand your tax band, and find money-saving tips.',
    canonical: 'https://taxnova.com/blog',
  });

  const [activeCountry, setActiveCountry] = useState('All');

  const filtered = activeCountry === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.country === activeCountry);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1120px] mx-auto px-4 py-8">
        <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Tax Guides', url: '/blog' }]} />
        <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Tax Guides & Articles</h1>
        <p className="text-[#334155] mb-8">{BLOG_POSTS.length} articles covering tax in the UK, USA, Canada, Australia, and Germany.</p>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8" data-testid="blog-country-filter">
          {COUNTRIES.map(c => (
            <button
              key={c}
              onClick={() => setActiveCountry(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCountry === c
                  ? 'bg-[#1d4ed8] text-white'
                  : 'bg-[#f1f5f9] text-[#334155] hover:bg-[#dbeafe] hover:text-[#1d4ed8]'
              }`}
              data-testid={`blog-filter-${c.toLowerCase()}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="text-sm text-[#64748b] mb-4">{filtered.length} articles</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
