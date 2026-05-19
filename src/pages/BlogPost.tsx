import { useParams, Link } from 'wouter';
import { Clock, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog/blog-manifest';
import { TOOLS } from '@/data/tools/tools-manifest';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { AdUnit } from '@/components/layout/AdUnit';
import { NewsletterSignup } from '@/components/monetization/NewsletterSignup';
import { LeadMagnet } from '@/components/monetization/LeadMagnet';
import { RelatedContent } from '@/components/content/RelatedContent';
import { useSEO } from '@/hooks/use-seo';

function BlogPostContent({ slug }: { slug: string }) {
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useSEO({
    title: post ? post.metaTitle : 'Article Not Found — GlobalTax',
    description: post?.metaDescription,
    canonical: post ? `https://taxnova.com/blog/${post.slug}` : undefined,
  });

  if (!post) {
    return (
      <div className="max-w-[1120px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#0f172a] mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-[#1d4ed8] hover:underline">Back to all articles</Link>
      </div>
    );
  }

  const relatedTools = post.relatedToolSlugs
    .map(s => TOOLS.find(t => t.slug === s))
    .filter(Boolean) as typeof TOOLS;

  return (
    <>
      {post.faqs && <FAQSchema faqs={post.faqs} />}
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Tax Guides', url: '/blog' },
        { name: post.title, url: `/blog/${post.slug}` },
      ]} />

      <div className="max-w-[1120px] mx-auto px-4 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Tax Guides', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]} />

        <div className="flex gap-8">
          {/* Main article */}
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <span className="text-xs font-medium bg-[#dbeafe] text-[#1d4ed8] px-2 py-0.5 rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#0f172a] mb-3 leading-tight" data-testid="blog-h1">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm text-[#64748b] mb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishDate).toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded-full">
                Updated May 2025
              </span>
            </div>

            <AdUnit slot="top-banner" className="mb-6" />

            {/* Mobile TOC */}
            <div className="lg:hidden">
              <TableOfContents sections={post.sections} />
            </div>

            <p className="text-[#334155] leading-relaxed text-base mb-8 font-medium">{post.intro}</p>

            {/* Article body */}
            <div className="space-y-8">
              {post.sections.map((section, i) => (
                <section key={i} id={`section-${i}`}>
                  <h2 className="text-2xl font-bold text-[#0f172a] mb-3">{section.h2}</h2>
                  {'h3' in section && section.h3 && <h3 className="text-lg font-semibold text-[#0f172a] mb-2">{(section as { h3?: string }).h3}</h3>}
                  <p className="text-[#334155] leading-relaxed">{section.content}</p>
                  {i === 2 && <AdUnit slot="mid-content" className="mt-8" />}
                </section>
              ))}
            </div>

            {/* Related tools CTA */}
            {relatedTools.length > 0 && (
              <div className="my-10 bg-[#dbeafe] border border-[#93c5fd] rounded-xl p-6">
                <h3 className="font-bold text-[#1d4ed8] mb-3">Try the Calculator</h3>
                <div className="flex flex-wrap gap-3">
                  {relatedTools.map(tool => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center gap-2 bg-[#1d4ed8] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1e40af] transition-colors"
                      data-testid={`related-tool-link-${tool.slug}`}
                    >
                      {tool.title} →
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Frequently Asked Questions</h2>
                <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
                  {post.faqs.map((faq, i) => (
                    <details key={i} className="group border-b last:border-b-0 border-[#e2e8f0]" data-testid={`blog-faq-${i}`}>
                      <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-[#0f172a] hover:bg-[#f8fafc] transition-colors">
                        {faq.q}
                        <span className="ml-4 text-[#94a3b8] group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                      </summary>
                      <div className="px-5 pb-4 pt-1 text-[#334155] text-sm leading-relaxed">{faq.a}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <AdUnit slot="below-article" className="mt-8 mb-8" />

            {/* Lead Magnet */}
            {post.relatedToolSlugs.length > 0 && (() => {
              const firstTool = TOOLS.find(t => t.slug === post.relatedToolSlugs[0]);
              return firstTool ? <LeadMagnet country={firstTool.country} /> : null;
            })()}

            {/* Related content */}
            <RelatedContent
              heading="Related Resources"
              items={[
                ...relatedTools.map(tool => ({
                  type: 'tool' as const,
                  title: tool.title,
                  slug: tool.slug,
                  desc: tool.intro,
                })),
                ...BLOG_POSTS
                  .filter(p => p.slug !== post.slug && p.category === post.category)
                  .slice(0, 2)
                  .map(p => ({
                    type: 'blog' as const,
                    title: p.title,
                    slug: p.slug,
                    desc: p.metaDescription,
                  })),
                { type: 'compare' as const, title: 'Compare Tax Across Countries', slug: 'compare', desc: 'See how your income compares in two countries, side by side.' },
              ].slice(0, 6)}
            />

            {/* Newsletter */}
            <div className="mb-8">
              <NewsletterSignup />
            </div>

            <div className="mt-6 pt-6 border-t border-[#e2e8f0]">
              <p className="text-xs text-[#64748b]">
                <strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute financial or tax advice. Tax laws change regularly — always verify information with the relevant authority or a qualified professional.
              </p>
            </div>
          </div>

          {/* Sidebar — TOC + ad */}
          <aside className="w-[260px] shrink-0 hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <TableOfContents sections={post.sections} />
              <AdUnit slot="sidebar" />
              <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
                <h3 className="font-semibold text-[#0f172a] mb-2 text-sm">Related Calculators</h3>
                <div className="space-y-2">
                  {relatedTools.map(tool => (
                    <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block text-sm text-[#1d4ed8] hover:underline py-0.5">
                      {tool.flag} {tool.title}
                    </Link>
                  ))}
                  <Link href="/tools" className="block text-sm text-[#1d4ed8] hover:underline py-0.5 mt-1">All calculators →</Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  return <BlogPostContent slug={slug ?? ''} />;
}
