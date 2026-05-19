import { Link } from 'wouter';
import { ExternalLink, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { useSEO } from '@/hooks/use-seo';

type Software = {
  name: string;
  tagline: string;
  pros: string[];
  cons: string[];
  price: string;
  rating: number;
  url: string;
  badge?: string;
  bestFor: string;
};

const SOFTWARE: Record<string, { heading: string; flag: string; tools: Software[] }> = {
  uk: {
    heading: 'Best UK Self-Assessment Tax Software 2025',
    flag: '🇬🇧',
    tools: [
      {
        name: 'TaxScouts',
        tagline: 'Fully managed self-assessment for £169. A real accountant files for you.',
        pros: ['Accountant reviews and files your return', 'HMRC-compliant', 'Handles most income types', 'Fixed price, no surprises'],
        cons: ['Not free', 'Not suitable for very complex tax affairs'],
        price: 'From £169/year',
        rating: 4.8,
        url: 'https://taxscouts.com',
        badge: 'Best Overall',
        bestFor: 'Employed + side income, landlords, freelancers',
      },
      {
        name: 'GoSimpleTax',
        tagline: 'UK self-assessment done yourself in minutes. HMRC-recognised.',
        pros: ['DIY at a low price', 'HMRC-recognised', 'Import from HMRC directly', 'Good for straightforward returns'],
        cons: ['No accountant review', 'Less guidance for complex cases'],
        price: 'From £47.99/year',
        rating: 4.5,
        url: 'https://gosimpletax.com',
        bestFor: 'Simple self-assessment returns',
      },
      {
        name: 'TaxCalc',
        tagline: 'Professional-grade UK tax software used by accountants.',
        pros: ['Very accurate', 'Used by professional accountants', 'Supports all tax schedules', 'Good customer support'],
        cons: ['More complex interface', 'Higher price'],
        price: 'From £59.99/year',
        rating: 4.6,
        url: 'https://www.taxcalc.com',
        badge: 'Best for Complex',
        bestFor: 'Multiple income streams, landlords, directors',
      },
    ],
  },
  usa: {
    heading: 'Best US Tax Software 2025',
    flag: '🇺🇸',
    tools: [
      {
        name: 'TurboTax',
        tagline: 'America\'s #1 tax prep software. Get your maximum refund guaranteed.',
        pros: ['Easiest to use', 'Maximum refund guarantee', 'Import W-2s automatically', 'Audit support included'],
        cons: ['Can be expensive for complex returns', 'Upsells aggressively'],
        price: 'Free – $129+',
        rating: 4.7,
        url: 'https://turbotax.intuit.com',
        badge: '#1 Rated',
        bestFor: 'Most US taxpayers, especially W-2 employees',
      },
      {
        name: 'H&R Block',
        tagline: 'File online or in-person. Guaranteed accuracy or they pay penalties.',
        pros: ['In-person option at 9,000+ locations', 'Accuracy guarantee', 'Free tier available', 'Good self-employed support'],
        cons: ['Interface less polished than TurboTax', 'Some features cost extra'],
        price: 'Free – $99+',
        rating: 4.5,
        url: 'https://hrblock.com',
        bestFor: 'People who want in-person backup',
      },
      {
        name: 'FreeTaxUSA',
        tagline: 'Truly free federal filing. State filing just $14.99.',
        pros: ['Free federal filing for everyone', 'Very affordable state filing', 'No income limit for free tier', 'Supports most forms'],
        cons: ['Less user-friendly', 'No import from prior software', 'Limited audit support'],
        price: 'Free federal / $14.99 state',
        rating: 4.3,
        url: 'https://www.freetaxusa.com',
        badge: 'Best Free',
        bestFor: 'Budget-conscious filers with straightforward returns',
      },
    ],
  },
  canada: {
    heading: 'Best Canadian Tax Software 2025',
    flag: '🇨🇦',
    tools: [
      {
        name: 'Wealthsimple Tax',
        tagline: 'Free Canadian tax filing. No upsells, ever.',
        pros: ['Completely free', 'Pay-what-you-want model', 'CRA-certified NETFILE', 'Autofill from CRA'],
        cons: ['No phone support', 'Less guidance than TurboTax'],
        price: 'Free (pay what you want)',
        rating: 4.7,
        url: 'https://wealthsimple.com/en-ca/tax',
        badge: 'Best Free',
        bestFor: 'Most Canadian filers, especially employed individuals',
      },
      {
        name: 'TurboTax Canada',
        tagline: 'Canada\'s most popular tax software. Average refund found: $1,789.',
        pros: ['Most popular in Canada', 'Easy to use', 'CRA-certified', 'Refund optimiser', 'Free tier available'],
        cons: ['Paid tiers expensive', 'Aggressive upsells'],
        price: 'Free – $79.99+',
        rating: 4.5,
        url: 'https://turbotax.intuit.ca',
        badge: 'Most Popular',
        bestFor: 'First-time filers and families',
      },
      {
        name: 'H&R Block Canada',
        tagline: 'Professional Canadian tax help online or in-store.',
        pros: ['In-store option available', 'Good for self-employed', 'Accuracy guarantee', 'Import slips from CRA'],
        cons: ['More expensive for complex returns', 'Some features cost extra'],
        price: 'Free – $99.99+',
        rating: 4.3,
        url: 'https://hrblock.ca',
        bestFor: 'Self-employed and complex returns',
      },
    ],
  },
  australia: {
    heading: 'Best Australian Tax Software 2024-25',
    flag: '🇦🇺',
    tools: [
      {
        name: 'myTax (ATO)',
        tagline: 'Free official ATO tax return. Pre-fills most information automatically.',
        pros: ['Completely free', 'Pre-fills from employers, banks', 'Directly lodges with ATO', 'No third-party involved'],
        cons: ['Requires myGov account', 'Less guidance for complex situations'],
        price: 'Free',
        rating: 4.6,
        url: 'https://www.ato.gov.au/individuals-and-families/lodging-your-tax-return/lodge-your-tax-return-online-with-mytax',
        badge: 'Official & Free',
        bestFor: 'Employees with straightforward returns',
      },
      {
        name: 'H&R Block Australia',
        tagline: 'Expert tax agents for your Australian return. Online or in-store.',
        pros: ['Expert review option', 'In-store locations nationwide', 'Good for complex returns', 'Rental property support'],
        cons: ['Not free', 'In-store can be slow'],
        price: 'From $89',
        rating: 4.3,
        url: 'https://hrblock.com.au',
        bestFor: 'Investors, landlords, self-employed',
      },
      {
        name: 'Etax',
        tagline: 'Australia\'s highest-rated online tax return service.',
        pros: ['Highest-rated online service', 'Accountant reviews return', 'Good deduction finder', 'Mobile-friendly'],
        cons: ['Not the cheapest option', 'Takes a day or two'],
        price: 'From $89',
        rating: 4.7,
        url: 'https://etax.com.au',
        badge: 'Highest Rated',
        bestFor: 'People who want an accountant without visiting one',
      },
    ],
  },
  germany: {
    heading: 'Best German Tax Software 2025',
    flag: '🇩🇪',
    tools: [
      {
        name: 'Taxfix',
        tagline: 'German tax return in under 22 minutes. Average refund €1,095.',
        pros: ['Very fast and easy', 'Average refund €1,095', 'Available in English', 'Mobile app'],
        cons: ['Not for complex tax situations', 'Subscription model'],
        price: 'From €39.99',
        rating: 4.7,
        url: 'https://taxfix.de',
        badge: 'Best Overall',
        bestFor: 'Employees, expats, straightforward returns',
      },
      {
        name: 'WISO Steuer',
        tagline: 'Germany\'s most comprehensive tax software. Used by professionals.',
        pros: ['Very comprehensive', 'Handles all income types', 'Direct ELSTER submission', 'Good tax advice'],
        cons: ['Learning curve', 'German language only'],
        price: 'From €29.99',
        rating: 4.5,
        url: 'https://www.wiso-steuer.de',
        badge: 'Most Complete',
        bestFor: 'Self-employed, rental income, complex situations',
      },
      {
        name: 'ELSTER (Official)',
        tagline: 'Free official German tax portal. Direct submission to Finanzamt.',
        pros: ['Completely free', 'Official government portal', 'No third party', 'Handles all return types'],
        cons: ['Complex interface', 'German language only', 'Steep learning curve'],
        price: 'Free',
        rating: 3.9,
        url: 'https://elster.de',
        badge: 'Free & Official',
        bestFor: 'German speakers comfortable with tax concepts',
      },
    ],
  },
};

const FAQS = [
  { q: 'What is the best free tax software in the UK?', a: 'GoSimpleTax and TaxCalc both have affordable options for UK self-assessment. HMRC\'s own online filing is free for simpler returns. For a fully managed service, TaxScouts starts at £169 and includes an accountant.' },
  { q: 'What is the best free US tax software?', a: 'FreeTaxUSA offers genuinely free federal filing for all income levels. TurboTax and H&R Block both have free tiers but restrict which forms they support for free. The IRS Free File program is also available for incomes under $79,000.' },
  { q: 'Is TurboTax worth it?', a: 'TurboTax is worth it if you have a moderately complex return (investments, self-employment, multiple W-2s) and want a guided experience. For simple W-2-only returns, a free alternative like FreeTaxUSA or Wealthsimple Tax (Canada) will get you the same result for much less.' },
  { q: 'Can I file my own tax return in the UK?', a: 'Yes. If you are in self-assessment, you can file directly through HMRC\'s online portal for free. Software like GoSimpleTax or TaxScouts can help if you want guidance or a professional review.' },
  { q: 'What is the best tax software for self-employed people?', a: 'For the UK: TaxScouts or TaxCalc. For the USA: TurboTax Self-Employed or H&R Block Self-Employed. For Canada: TurboTax Self-Employed or H&R Block Canada. For Australia: Etax or H&R Block AU. For Germany: WISO Steuer.' },
];

const COUNTRY_TOOLS: Record<string, string[]> = {
  uk: ['uk-income-tax-calculator', 'uk-salary-after-tax-calculator', 'uk-vat-calculator'],
  usa: ['us-federal-income-tax-calculator', 'us-paycheck-calculator', 'us-capital-gains-tax-calculator'],
  canada: ['canada-income-tax-calculator', 'canada-provincial-tax-calculator', 'canada-gst-hst-calculator'],
  australia: ['australia-income-tax-calculator', 'australia-superannuation-calculator'],
  germany: ['germany-income-tax-calculator', 'germany-vat-calculator'],
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-[#e2e8f0]'}`}
        />
      ))}
      <span className="text-xs font-semibold text-[#334155] ml-1">{rating}</span>
    </div>
  );
}

export default function BestTaxSoftware() {
  useSEO({
    title: 'Best Tax Software 2025 — UK, USA, Canada, Australia & Germany | GlobalTax',
    description: 'Compare the best tax filing software for 2025. Honest reviews of TurboTax, H&R Block, TaxScouts, Wealthsimple Tax, Taxfix, and more. Find the right tool for your country.',
    canonical: 'https://taxnova.com/best-tax-software',
  });

  const countryOrder = ['uk', 'usa', 'canada', 'australia', 'germany'];

  return (
    <>
      <FAQSchema faqs={FAQS} />

      <div className="min-h-screen bg-white">
        <div className="max-w-[1120px] mx-auto px-4 py-8">
          <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Best Tax Software', url: '/best-tax-software' }]} />

          <h1 className="text-3xl font-bold text-[#0f172a] mb-3">Best Tax Software 2025</h1>
          <p className="text-[#334155] mb-2 max-w-2xl leading-relaxed">
            Honest, up-to-date comparisons of the top tax filing tools for every country we cover. We rate each tool on ease of use, accuracy, price, and support.
          </p>
          <p className="text-xs text-[#94a3b8] mb-8">
            * Some links are affiliate links — we may earn a commission if you sign up. This does not affect our rankings or ratings.
          </p>

          {/* Jump links */}
          <div className="flex flex-wrap gap-2 mb-10">
            {countryOrder.map(id => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm font-medium bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#1d4ed8] hover:bg-[#dbeafe] hover:text-[#1d4ed8] px-3 py-1.5 rounded-lg transition-all text-[#334155]"
              >
                {SOFTWARE[id].flag} {id === 'uk' ? 'UK' : id === 'usa' ? 'USA' : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>

          {/* Country sections */}
          {countryOrder.map(id => {
            const section = SOFTWARE[id];
            return (
              <section key={id} id={id} className="mb-16 scroll-mt-20">
                <h2 className="text-2xl font-bold text-[#0f172a] mb-6">
                  {section.flag} {section.heading}
                </h2>

                <div className="space-y-5">
                  {section.tools.map(tool => (
                    <div key={tool.name} className="border border-[#e2e8f0] rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow">
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-lg font-bold text-[#0f172a]">{tool.name}</h3>
                              {tool.badge && (
                                <span className="text-[10px] font-bold bg-[#dbeafe] text-[#1d4ed8] px-2 py-0.5 rounded-full">
                                  {tool.badge}
                                </span>
                              )}
                            </div>
                            <StarRating rating={tool.rating} />
                            <p className="text-sm text-[#334155] mt-2 leading-relaxed">{tool.tagline}</p>
                            <p className="text-xs text-[#64748b] mt-1">
                              <strong className="text-[#0f172a]">Best for:</strong> {tool.bestFor}
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-right sm:text-left">
                            <div className="text-sm font-bold text-[#0f172a] mb-3">{tool.price}</div>
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className="inline-flex items-center gap-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                            >
                              Visit Site
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-5 border-t border-[#f1f5f9]">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-2">Pros</p>
                            <ul className="space-y-1.5">
                              {tool.pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">Cons</p>
                            <ul className="space-y-1.5">
                              {tool.cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                                  <span className="w-3.5 h-3.5 rounded-full border-2 border-red-300 flex-shrink-0 mt-0.5 inline-block" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Related calculators for this country */}
                <div className="mt-6 p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl">
                  <p className="text-sm font-semibold text-[#0f172a] mb-3">
                    Calculate your {id === 'uk' ? 'UK' : id === 'usa' ? 'US' : section.flag.replace(/\s/g, '')} tax first, then choose the right software:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(COUNTRY_TOOLS[id] ?? []).map(slug => (
                      <Link
                        key={slug}
                        href={`/tools/${slug}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#1d4ed8] border border-[#dbeafe] bg-white hover:bg-[#dbeafe] px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {slug.split('-').slice(-3).join(' ').replace(/\b\w/g, c => c.toUpperCase())}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Frequently Asked Questions</h2>
            <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
              {FAQS.map((faq, i) => (
                <details key={i} className="group border-b last:border-b-0 border-[#e2e8f0]">
                  <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-[#0f172a] hover:bg-[#f8fafc] transition-colors">
                    {faq.q}
                    <span className="ml-4 text-[#94a3b8] group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                  </summary>
                  <div className="px-5 pb-4 pt-1 text-[#334155] text-sm leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 text-sm text-[#64748b]">
            <strong className="text-[#0f172a]">Disclosure:</strong> Some links on this page are affiliate links. We may earn a commission if you purchase through them, at no extra cost to you. Our ratings and opinions are independent and not influenced by affiliate relationships.
          </div>
        </div>
      </div>
    </>
  );
}
