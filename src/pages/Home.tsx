import { Link } from 'wouter';
import { ArrowRight, CheckCircle, Globe } from 'lucide-react';
import { TOOLS, COUNTRIES } from '@/data/tools/tools-manifest';
import { BLOG_POSTS } from '@/data/blog/blog-manifest';
import { BlogCard } from '@/components/blog/BlogCard';
import { WebsiteSchema } from '@/components/seo/WebsiteSchema';
import { HomeFAQSchema, HOME_FAQS } from '@/components/seo/HomeFAQSchema';
import { NewsletterSignup } from '@/components/monetization/NewsletterSignup';
import { TaxCalendar } from '@/components/monetization/TaxCalendar';
import { useSEO } from '@/hooks/use-seo';

const COMPARISONS = [
  { slug: 'uk-vs-usa-income-tax', label: '🇬🇧 UK vs 🇺🇸 USA' },
  { slug: 'uk-vs-canada-income-tax', label: '🇬🇧 UK vs 🇨🇦 Canada' },
  { slug: 'uk-vs-germany-income-tax', label: '🇬🇧 UK vs 🇩🇪 Germany' },
  { slug: 'usa-vs-canada-income-tax', label: '🇺🇸 USA vs 🇨🇦 Canada' },
  { slug: 'usa-vs-australia-income-tax', label: '🇺🇸 USA vs 🇦🇺 Australia' },
  { slug: 'canada-vs-australia-income-tax', label: '🇨🇦 Canada vs 🇦🇺 Australia' },
];

export default function Home() {
  useSEO({
    title: 'GlobalTax — Free Tax Calculators for UK, USA, Canada, Australia & Germany 2025',
    description: 'Wondering how much tax you actually pay? GlobalTax gives you instant, accurate 2025 tax estimates for 5 countries — no signup, no fees, just real numbers in seconds.',
    canonical: 'https://global-tax-calc.vercel.app/',
  });

  const recentPosts = BLOG_POSTS.slice(0, 6);

  return (
    <div className="min-h-screen">
      <WebsiteSchema />
      <HomeFAQSchema />

      {/* Hero */}
      <section className="bg-white border-b border-[#e2e8f0] py-16">
        <div className="max-w-[1120px] mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4 leading-tight" data-testid="hero-headline">
            See Exactly How Much Tax You Pay
          </h1>
          <p className="text-lg text-[#334155] mb-8 max-w-2xl mx-auto leading-relaxed">
            Free, instant tax calculators for the USA, UK, Canada, Australia, and Germany. Enter your salary and get a full 2025 breakdown in seconds — no account needed.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {COUNTRIES.map(c => (
              <a
                key={c.id}
                href={`#country-${c.id}`}
                className="inline-flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#1d4ed8] hover:bg-[#dbeafe] rounded-lg px-4 py-2.5 text-sm font-medium text-[#334155] hover:text-[#1d4ed8] transition-all"
                data-testid={`link-hero-country-${c.id}`}
              >
                <span>{c.flag}</span>
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Country Tool Sections */}
      <section className="py-12 bg-white">
        <div className="max-w-[1120px] mx-auto px-4">
          {COUNTRIES.map(country => {
            const tools = TOOLS.filter(t => t.country === country.id);
            return (
              <div key={country.id} id={`country-${country.id}`} className="mb-12">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{country.flag}</span>
                  <h2 className="text-2xl font-bold text-[#0f172a]">{country.name} Tax Calculators</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tools.map(tool => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#1d4ed8] hover:shadow-sm rounded-xl p-5 transition-all"
                      data-testid={`tool-card-${tool.slug}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors leading-snug">
                          {tool.title}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-[#94a3b8] group-hover:text-[#1d4ed8] flex-shrink-0 ml-2 mt-0.5 transition-colors" />
                      </div>
                      <p className="text-sm text-[#64748b] leading-relaxed line-clamp-2">{tool.intro}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Points */}
      <section className="bg-[#f8fafc] border-y border-[#e2e8f0] py-12">
        <div className="max-w-[1120px] mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#0f172a] text-center mb-8">Why People Use GlobalTax</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '✓', title: 'Always Free', desc: 'Every calculator, every country. No hidden charges, ever.' },
              { icon: '✓', title: 'No Signup Needed', desc: 'Just open and use. No email, no account, no fuss.' },
              { icon: '✓', title: 'Updated for 2025', desc: 'Rates are pulled directly from official government sources.' },
              { icon: '✓', title: 'Genuinely Accurate', desc: 'Built on the same formulas tax authorities actually use.' },
            ].map(p => (
              <div key={p.title} className="text-center" data-testid={`trust-point-${p.title.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="w-10 h-10 rounded-full bg-[#dbeafe] text-[#1d4ed8] flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="font-semibold text-[#0f172a] mb-1">{p.title}</div>
                <div className="text-sm text-[#64748b]">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter + Tax Calendar */}
      <section className="py-12 bg-white">
        <div className="max-w-[680px] mx-auto px-4">
          <NewsletterSignup />
          <TaxCalendar />
        </div>
      </section>

      {/* Comparison CTA */}
      <section className="py-12 bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="max-w-[1120px] mx-auto px-4">
          <div className="bg-[#1d4ed8] rounded-2xl p-8 text-white text-center">
            <Globe className="w-10 h-10 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold mb-2">How Does Your Tax Compare Abroad?</h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Type in your salary once and see your take-home pay in two countries side by side. Useful if you're thinking about relocating or just curious.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {COMPARISONS.map(c => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  data-testid={`comparison-link-${c.slug}`}
                >
                  {c.label}
                </Link>
              ))}
            </div>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 bg-white text-[#1d4ed8] font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              data-testid="link-compare-cta"
            >
              View All Comparisons
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-12 bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="max-w-[1120px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#0f172a]">Tax Guides & Articles</h2>
            <Link href="/blog" className="text-sm font-medium text-[#1d4ed8] hover:underline">
              View all articles
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white border-t border-[#e2e8f0]">
        <div className="max-w-[720px] mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-6 text-center">Frequently Asked Questions</h2>
          <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
            {HOME_FAQS.map((faq, i) => (
              <details key={i} className="group border-b last:border-b-0 border-[#e2e8f0]">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-[#0f172a] hover:bg-[#f8fafc] transition-colors text-sm">
                  {faq.q}
                  <span className="ml-4 text-[#94a3b8] group-open:rotate-180 transition-transform flex-shrink-0 text-xs">▼</span>
                </summary>
                <div className="px-5 pb-4 pt-1 text-[#334155] text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-white border-t border-[#e2e8f0]">
        <div className="max-w-[1120px] mx-auto px-4">
          <p className="text-sm text-[#64748b] text-center max-w-3xl mx-auto leading-relaxed">
            <strong>Disclaimer:</strong> GlobalTax provides estimates for informational purposes only. Results are not financial or legal advice. Tax rules change frequently — always verify with HMRC, IRS, CRA, ATO, or your national tax authority. Consult a qualified tax professional for personalised advice.
          </p>
        </div>
      </section>
    </div>
  );
}
