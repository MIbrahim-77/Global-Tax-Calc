import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FAQSchema } from '@/components/seo/FAQSchema';

const COMPARISONS = [
  { slug: 'uk-vs-usa-income-tax', label: 'UK vs USA Income Tax', flags: '🇬🇧 vs 🇺🇸', desc: 'Compare take-home pay and effective tax rates between the United Kingdom and United States.' },
  { slug: 'uk-vs-canada-income-tax', label: 'UK vs Canada Income Tax', flags: '🇬🇧 vs 🇨🇦', desc: 'See how UK and Canadian income tax compares on the same salary.' },
  { slug: 'uk-vs-germany-income-tax', label: 'UK vs Germany Income Tax', flags: '🇬🇧 vs 🇩🇪', desc: 'Compare UK and German tax systems — including social contributions.' },
  { slug: 'usa-vs-canada-income-tax', label: 'USA vs Canada Income Tax', flags: '🇺🇸 vs 🇨🇦', desc: 'Federal tax and total deductions compared between the US and Canada.' },
  { slug: 'usa-vs-australia-income-tax', label: 'USA vs Australia Income Tax', flags: '🇺🇸 vs 🇦🇺', desc: 'Compare American and Australian take-home pay side by side.' },
  { slug: 'canada-vs-australia-income-tax', label: 'Canada vs Australia Income Tax', flags: '🇨🇦 vs 🇦🇺', desc: 'See how Canadian and Australian income tax stacks up on the same gross salary.' },
];

const FAQS = [
  { q: 'How does GlobalTax compare taxes between two countries?', a: 'Enter a salary in your chosen currency and select two countries. GlobalTax applies each country\'s official 2025 tax rates — including income tax, social contributions, and standard deductions — and shows the resulting take-home pay side by side in each country\'s local currency. Exchange rates are not applied.' },
  { q: 'Why are figures shown in local currency instead of being converted?', a: 'Converting currencies would add another variable (fluctuating exchange rates) that changes constantly and would make the comparison misleading. Showing each country\'s result in its own currency lets you focus on the percentage difference in take-home pay rather than exchange-rate noise.' },
  { q: 'Does the comparison include state or provincial taxes?', a: 'For the United States, only federal income tax is included, not state income tax. For Canada, Ontario provincial tax is used as a representative example. The UK, Australia, and Germany have single national tax systems, so the comparison is complete for those countries.' },
  { q: 'Which countries can I compare?', a: 'You can compare any two of the five countries GlobalTax covers: the United Kingdom, United States, Canada, Australia, and Germany. That gives you 10 possible comparison combinations.' },
  { q: 'Is the take-home pay comparison accurate for self-employed people?', a: 'The comparison is designed for employed workers under standard PAYE/withholding arrangements. Self-employed people typically face different contribution structures and deductions. The results are a useful directional guide but may not be precise for the self-employed.' },
  { q: 'Where can I find the best tax software to file in one of these countries?', a: 'Visit our Best Tax Software page for a detailed comparison of the top-rated tools in each country, from TurboTax and H&R Block (USA/Canada) to TaxScouts (UK), Etax (Australia), and Taxfix (Germany).' },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={FAQS} />
      <div className="max-w-[1120px] mx-auto px-4 py-8">
        <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Compare', url: '/compare' }]} />
        <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Compare Tax Across Countries</h1>
        <p className="text-[#334155] mb-8 max-w-2xl leading-relaxed">
          Enter a salary once and see your take-home pay in two countries, side by side. Each country uses its own official 2025 tax rates. Exchange rates are not applied — figures are shown in each country's local currency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {COMPARISONS.map(c => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="group bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#1d4ed8] hover:shadow-sm rounded-xl p-5 transition-all"
              data-testid={`compare-card-${c.slug}`}
            >
              <div className="text-2xl mb-3">{c.flags}</div>
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-semibold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors">{c.label}</h2>
                <ArrowRight className="w-4 h-4 text-[#94a3b8] group-hover:text-[#1d4ed8] flex-shrink-0 ml-2 mt-0.5" />
              </div>
              <p className="text-sm text-[#64748b] leading-relaxed">{c.desc}</p>
            </Link>
          ))}
        </div>

        {/* Helpful links */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5 mb-10">
          <p className="text-sm font-semibold text-[#0f172a] mb-3">Related Resources</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/tools', label: 'All Tax Calculators' },
              { href: '/blog', label: 'Tax Guides & Articles' },
              { href: '/best-tax-software', label: 'Best Tax Software' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="text-sm text-[#1d4ed8] border border-[#dbeafe] bg-white hover:bg-[#dbeafe] px-3 py-1.5 rounded-lg transition-colors">
                {l.label} →
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Frequently Asked Questions</h2>
          <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
            {FAQS.map((faq, i) => (
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
      </div>
    </div>
  );
}
