import { useLocation, Link } from 'wouter';
import { ArrowRight, Clock } from 'lucide-react';
import { TOOLS, COUNTRIES } from '@/data/tools/tools-manifest';
import { BLOG_POSTS } from '@/data/blog/blog-manifest';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { AffiliateBar } from '@/components/monetization/AffiliateBar';
import { LeadMagnet } from '@/components/monetization/LeadMagnet';
import { TaxDeadlines } from '@/components/content/TaxDeadlines';
import { useSEO } from '@/hooks/use-seo';

const COUNTRY_META: Record<string, {
  name: string; flag: string; currency: string; authority: string; authorityUrl: string;
  description: string; taxYear: string; headline: string; intro: string;
  faqs: { q: string; a: string }[];
}> = {
  uk: {
    name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP (£)', authority: 'HMRC', authorityUrl: 'https://www.gov.uk/government/organisations/hm-revenue-customs',
    taxYear: '2025/26 (6 April 2025 – 5 April 2026)',
    headline: 'UK Tax Calculators 2025/26',
    description: 'Free UK tax calculators for 2025/26. Calculate income tax, salary after tax, and VAT using official HMRC rates.',
    intro: 'Free, accurate tools for UK taxpayers using official HMRC rates for 2025/26. Calculate your income tax, take-home salary, and VAT instantly — no sign-up required.',
    faqs: [
      { q: 'What is the personal allowance in the UK for 2025/26?', a: 'The standard personal allowance is £12,570. You pay no income tax on income below this amount. It is gradually reduced for incomes above £100,000.' },
      { q: 'What are the UK income tax bands for 2025/26?', a: 'Basic rate: 20% (£12,571–£50,270). Higher rate: 40% (£50,271–£125,140). Additional rate: 45% (above £125,140).' },
      { q: 'How much National Insurance do I pay?', a: 'Employees pay 8% NI on earnings between £12,570 and £50,270, and 2% on earnings above £50,270. These are the Class 1 employee rates for 2025/26.' },
      { q: 'When is the UK Self Assessment tax return deadline?', a: 'The online Self Assessment deadline is 31 January each year. The paper return deadline is 31 October. Payment of tax owed is also due by 31 January.' },
      { q: 'Is the UK tax calculator free to use?', a: 'Yes, all GlobalTax calculators are completely free. No sign-up or account required.' },
    ],
  },
  usa: {
    name: 'United States', flag: '🇺🇸', currency: 'USD ($)', authority: 'IRS', authorityUrl: 'https://www.irs.gov',
    taxYear: '2025 (January 1 – December 31, 2025)',
    headline: 'US Tax Calculators 2025',
    description: 'Free US federal income tax calculators for 2025. Calculate take-home pay, federal tax, and capital gains using official IRS rates.',
    intro: 'Free US federal tax calculators using official 2025 IRS rates. Calculate your take-home pay, federal income tax, and capital gains tax instantly.',
    faqs: [
      { q: 'What is the standard deduction for 2025?', a: 'The standard deduction for 2025 is $14,600 for single filers and $29,200 for married filing jointly.' },
      { q: 'What are the federal tax brackets for 2025?', a: 'The 2025 brackets are: 10% (up to $11,925 single), 12% ($11,926–$48,475), 22% ($48,476–$103,350), 24% ($103,351–$197,300), 32% ($197,301–$250,525), 35% ($250,526–$626,350), 37% (above $626,350) for single filers.' },
      { q: 'What is FICA tax?', a: 'FICA is 7.65% total: Social Security (6.2%) on wages up to $168,600 and Medicare (1.45%) on all wages. High earners pay an additional 0.9% Medicare surtax above $200,000.' },
      { q: 'When is the US federal tax return due?', a: 'Federal tax returns are due April 15, 2026. You can file for a 6-month extension to October 15, but any tax owed is still due April 15.' },
      { q: 'Does this calculator include state income tax?', a: 'No — only federal income tax is included. State income taxes vary significantly by state and are not included in these calculations.' },
    ],
  },
  canada: {
    name: 'Canada', flag: '🇨🇦', currency: 'CAD (CA$)', authority: 'CRA', authorityUrl: 'https://www.canada.ca/en/revenue-agency.html',
    taxYear: '2025 (January 1 – December 31, 2025)',
    headline: 'Canadian Tax Calculators 2025',
    description: 'Free Canadian income tax calculators for 2025. Calculate federal tax, Ontario provincial tax, CPP, and EI using official CRA rates.',
    intro: 'Free Canadian tax calculators using official 2025 CRA rates. Calculate your federal income tax, Ontario provincial tax, CPP, and EI contributions.',
    faqs: [
      { q: 'What is the basic personal amount in Canada for 2025?', a: 'The federal basic personal amount is $15,705 for 2025. This credit effectively means you pay no federal tax on the first $15,705 of income.' },
      { q: 'What are the 2025 federal tax brackets in Canada?', a: 'Canada\'s 2025 federal brackets: 15% (first $57,375), 20.5% ($57,376–$114,750), 26% ($114,751–$158,519), 29% ($158,520–$220,000), 33% (above $220,000).' },
      { q: 'How much is CPP in 2025?', a: 'The 2025 CPP rate is 5.95% on earnings between $3,500 and $71,300 (the maximum pensionable earnings). The maximum CPP contribution for 2025 is approximately $4,034.' },
      { q: 'When is the Canadian tax return filing deadline?', a: 'The Canadian T1 income tax return is due April 30, 2026. Self-employed individuals have until June 15 to file, but any balance owed is still due April 30.' },
      { q: 'Does this calculator include Quebec provincial tax?', a: 'The calculator uses Ontario provincial tax rates as a representative example. Quebec has significantly different rates and a separate provincial return.' },
    ],
  },
  australia: {
    name: 'Australia', flag: '🇦🇺', currency: 'AUD (A$)', authority: 'ATO', authorityUrl: 'https://www.ato.gov.au',
    taxYear: '2024-25 (1 July 2024 – 30 June 2025)',
    headline: 'Australian Tax Calculators 2024-25',
    description: 'Free Australian income tax calculators for 2024-25. Calculate take-home pay, superannuation, and Medicare levy using official ATO rates.',
    intro: 'Free Australian tax calculators using official 2024-25 ATO rates. Calculate your income tax, Medicare levy, and superannuation contributions instantly.',
    faqs: [
      { q: 'What is the tax-free threshold in Australia for 2024-25?', a: 'The tax-free threshold is $18,200. If you are an Australian resident and your income is below this, you pay no income tax.' },
      { q: 'What are the Australian tax brackets for 2024-25?', a: '0% (up to $18,200), 19% ($18,201–$45,000), 32.5% ($45,001–$120,000), 37% ($120,001–$180,000), 45% (above $180,000). The 2024-25 year saw the Stage 3 tax cuts reduce the 32.5% bracket threshold.' },
      { q: 'What is the Medicare levy?', a: 'The Medicare levy is 2% of your taxable income. It funds Australia\'s public healthcare system. Some low-income earners are exempt or pay a reduced amount.' },
      { q: 'What is superannuation?', a: 'Superannuation is Australia\'s mandatory retirement savings system. Your employer contributes 11.5% of your salary on top of your wages directly to your super fund. This does not reduce your take-home pay.' },
      { q: 'When is the Australian tax return due?', a: 'If lodging yourself, the 2024-25 tax return is due 31 October 2025. If using a registered tax agent, the deadline may be extended to 15 May 2026.' },
    ],
  },
  germany: {
    name: 'Germany', flag: '🇩🇪', currency: 'EUR (€)', authority: 'Finanzamt', authorityUrl: 'https://www.elster.de',
    taxYear: '2025 (1 January – 31 December 2025)',
    headline: 'German Tax Calculators 2025',
    description: 'Free German income tax calculators for 2025. Calculate Einkommensteuer, social contributions, and VAT using official German rates.',
    intro: 'Free German tax calculators using official 2025 rates. Calculate your income tax (Einkommensteuer), social contributions, solidarity surcharge, and VAT.',
    faqs: [
      { q: 'How does German income tax work?', a: 'Germany uses a progressive formula rather than fixed bands. Rates start at 0% for income up to the basic allowance (€11,784 in 2025), rise from 14% to 42% progressively, and reach 45% for income above €277,826.' },
      { q: 'What is the Solidaritätszuschlag (solidarity surcharge)?', a: 'The solidarity surcharge is 5.5% of your income tax bill. Since 2021, it only applies if your income tax exceeds €18,130 — meaning most employees no longer pay it.' },
      { q: 'What social contributions do German employees pay?', a: 'German employees pay roughly 20% of gross salary in social contributions: pension insurance (9.3%), health insurance (~7.3%), unemployment insurance (1.3%), and nursing care insurance (~1.7%).' },
      { q: 'When is the German tax return due?', a: 'If filing yourself, the Steuererklärung (tax return) for 2025 is due 31 July 2026. With a tax advisor, the deadline extends to 28/29 February 2027.' },
      { q: 'What is the standard VAT rate in Germany?', a: 'The standard VAT rate (Mehrwertsteuer) is 19%. A reduced rate of 7% applies to essentials such as food, books, and public transport.' },
    ],
  },
};

const COUNTRY_COMPARE_SLUGS: Record<string, string[]> = {
  uk: ['uk-vs-usa-income-tax', 'uk-vs-canada-income-tax', 'uk-vs-germany-income-tax'],
  usa: ['uk-vs-usa-income-tax', 'usa-vs-canada-income-tax', 'usa-vs-australia-income-tax'],
  canada: ['uk-vs-canada-income-tax', 'usa-vs-canada-income-tax', 'canada-vs-australia-income-tax'],
  australia: ['usa-vs-australia-income-tax', 'canada-vs-australia-income-tax'],
  germany: ['uk-vs-germany-income-tax'],
};

function CompareLabel(slug: string): string {
  return slug.split('-vs-').map(part =>
    part.replace('-income-tax', '').replace(/\b\w/g, c => c.toUpperCase())
  ).join(' vs ');
}

export default function CountryPage() {
  const [location] = useLocation();
  const country = location.replace(/^\//, '').split('/')[0];
  const meta = COUNTRY_META[country ?? ''];

  const tools = TOOLS.filter(t => t.country === country);
  const posts = BLOG_POSTS.filter(p => p.country.toLowerCase() === country?.toLowerCase()).slice(0, 6);
  const compareSlugs = COUNTRY_COMPARE_SLUGS[country ?? ''] ?? [];

  useSEO({
    title: meta ? `${meta.headline} — Free, Accurate | GlobalTax` : 'Country Not Found — GlobalTax',
    description: meta?.description,
    canonical: meta ? `https://taxnova.com/${country}` : undefined,
  });

  if (!meta) {
    return (
      <div className="max-w-[1120px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#0f172a] mb-4">Country Not Found</h1>
        <Link href="/" className="text-[#1d4ed8] hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      <FAQSchema faqs={meta.faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: meta.name, url: `/${country}` }]} />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-b from-[#f8fafc] to-white border-b border-[#e2e8f0]">
          <div className="max-w-[1120px] mx-auto px-4 py-10">
            <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: meta.name, url: `/${country}` }]} />
            <div className="flex items-center gap-3 mt-4 mb-2">
              <span className="text-4xl">{meta.flag}</span>
              <h1 className="text-3xl font-bold text-[#0f172a]">{meta.headline}</h1>
            </div>
            <p className="text-[#334155] max-w-2xl leading-relaxed mb-4">{meta.intro}</p>
            <div className="flex flex-wrap gap-3 text-xs text-[#64748b]">
              <span className="bg-[#dbeafe] text-[#1d4ed8] font-medium px-2.5 py-1 rounded-full">Tax Year: {meta.taxYear}</span>
              <span className="bg-[#f1f5f9] px-2.5 py-1 rounded-full">Currency: {meta.currency}</span>
              <a href={meta.authorityUrl} target="_blank" rel="noopener noreferrer" className="bg-[#f1f5f9] hover:bg-[#dbeafe] hover:text-[#1d4ed8] px-2.5 py-1 rounded-full transition-colors">
                Source: {meta.authority} ↗
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[1120px] mx-auto px-4 py-10">
          {/* Calculators */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#0f172a] mb-4">{meta.name} Calculators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map(tool => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#1d4ed8] hover:shadow-sm rounded-xl p-5 transition-all"
                  data-testid={`country-tool-${tool.slug}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors leading-snug">{tool.title}</h3>
                    <ArrowRight className="w-4 h-4 text-[#94a3b8] group-hover:text-[#1d4ed8] flex-shrink-0 ml-2 mt-0.5 transition-colors" />
                  </div>
                  <p className="text-sm text-[#64748b] leading-relaxed line-clamp-2">{tool.intro}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Tax Deadlines */}
          <section className="mb-12">
            <TaxDeadlines country={country ?? ''} />
          </section>

          {/* Compare */}
          {compareSlugs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#0f172a] mb-4">Compare {meta.name} with Other Countries</h2>
              <div className="flex flex-wrap gap-3">
                {compareSlugs.map(slug => (
                  <Link
                    key={slug}
                    href={`/compare/${slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1d4ed8] border border-[#dbeafe] bg-[#f8fafc] hover:bg-[#dbeafe] px-3 py-2 rounded-xl transition-colors"
                  >
                    {CompareLabel(slug)} →
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Affiliate bar */}
          <section className="mb-12">
            <AffiliateBar country={country ?? ''} />
          </section>

          {/* Blog posts */}
          {posts.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#0f172a]">{meta.name} Tax Guides</h2>
                <Link href="/blog" className="text-sm text-[#1d4ed8] hover:underline">All guides →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map(post => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#1d4ed8] rounded-xl p-4 transition-all"
                  >
                    <span className="text-xs font-medium bg-[#dbeafe] text-[#1d4ed8] px-2 py-0.5 rounded-full">{post.category}</span>
                    <h3 className="font-semibold text-[#0f172a] group-hover:text-[#1d4ed8] text-sm mt-2 mb-1 leading-snug transition-colors">{post.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                      <Clock className="w-3 h-3" />{post.readingTime}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Lead magnet */}
          <LeadMagnet country={country ?? 'uk'} />

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f172a] mb-4">{meta.name} Tax — Frequently Asked Questions</h2>
            <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
              {meta.faqs.map((faq, i) => (
                <details key={i} className="group border-b last:border-b-0 border-[#e2e8f0]">
                  <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-[#0f172a] hover:bg-[#f8fafc] transition-colors text-sm">
                    {faq.q}
                    <span className="ml-4 text-[#94a3b8] group-open:rotate-180 transition-transform flex-shrink-0 text-xs">▼</span>
                  </summary>
                  <div className="px-5 pb-4 pt-1 text-[#334155] text-sm leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Other countries */}
          <section className="py-8 border-t border-[#e2e8f0]">
            <h3 className="text-sm font-semibold text-[#0f172a] mb-3">Other Country Tax Calculators</h3>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES.filter(c => c.id !== country).map(c => (
                <Link key={c.id} href={`/${c.id}`}
                  className="text-sm text-[#64748b] hover:text-[#1d4ed8] border border-[#e2e8f0] hover:border-[#1d4ed8] bg-[#f8fafc] hover:bg-[#dbeafe] px-3 py-1.5 rounded-lg transition-colors">
                  {c.flag} {c.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
