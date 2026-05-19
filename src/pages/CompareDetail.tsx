import { useParams, Link } from 'wouter';
import { CompareShell } from '@/components/compare/CompareShell';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdUnit } from '@/components/layout/AdUnit';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { FAQSchema } from '@/components/seo/FAQSchema';

const COUNTRY_META: Record<string, { name: string; flag: string }> = {
  uk: { name: 'United Kingdom', flag: '🇬🇧' },
  usa: { name: 'United States', flag: '🇺🇸' },
  canada: { name: 'Canada', flag: '🇨🇦' },
  australia: { name: 'Australia', flag: '🇦🇺' },
  germany: { name: 'Germany', flag: '🇩🇪' },
};

function parseSlug(slug: string): { countryA: string; countryB: string } | null {
  const knownCountries = ['uk', 'usa', 'canada', 'australia', 'germany'];
  for (const a of knownCountries) {
    for (const b of knownCountries) {
      if (a !== b && slug.startsWith(`${a}-vs-${b}`)) {
        return { countryA: a, countryB: b };
      }
    }
  }
  return null;
}

export default function CompareDetail() {
  const { slug } = useParams<{ slug: string }>();
  const parsed = parseSlug(slug ?? '');

  if (!parsed) {
    return (
      <div className="max-w-[1120px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#0f172a] mb-4">Comparison Not Found</h1>
        <Link href="/compare" className="text-[#1d4ed8] hover:underline">View all comparisons</Link>
      </div>
    );
  }

  const { countryA, countryB } = parsed;
  const metaA = COUNTRY_META[countryA] ?? { name: countryA, flag: '' };
  const metaB = COUNTRY_META[countryB] ?? { name: countryB, flag: '' };
  const title = `${metaA.name} vs ${metaB.name} Income Tax`;

  const COUNTRY_TOOL_MAP: Record<string, string[]> = {
    uk: ['uk-income-tax-calculator', 'uk-salary-after-tax-calculator', 'uk-vat-calculator'],
    usa: ['us-federal-income-tax-calculator', 'us-paycheck-calculator', 'us-capital-gains-tax-calculator'],
    canada: ['canada-income-tax-calculator', 'canada-provincial-tax-calculator'],
    australia: ['australia-income-tax-calculator', 'australia-superannuation-calculator'],
    germany: ['germany-income-tax-calculator', 'germany-vat-calculator'],
  };

  const COUNTRY_TOOL_LABELS: Record<string, string> = {
    'uk-income-tax-calculator': 'UK Income Tax Calculator',
    'uk-salary-after-tax-calculator': 'UK Salary After Tax',
    'uk-vat-calculator': 'UK VAT Calculator',
    'us-federal-income-tax-calculator': 'US Federal Tax Calculator',
    'us-paycheck-calculator': 'US Paycheck Calculator',
    'us-capital-gains-tax-calculator': 'US Capital Gains Tax',
    'canada-income-tax-calculator': 'Canada Income Tax Calculator',
    'canada-provincial-tax-calculator': 'Canada Provincial Tax',
    'australia-income-tax-calculator': 'Australia Tax Calculator',
    'australia-superannuation-calculator': 'Australia Super Calculator',
    'germany-income-tax-calculator': 'Germany Tax Calculator',
    'germany-vat-calculator': 'Germany VAT Calculator',
  };

  const relatedTools = [
    ...new Set([...(COUNTRY_TOOL_MAP[countryA] ?? []), ...(COUNTRY_TOOL_MAP[countryB] ?? [])])
  ].slice(0, 4);

  const compareFAQs = [
    { q: `How does ${metaA.name} income tax compare to ${metaB.name}?`, a: `${metaA.name} and ${metaB.name} have different tax brackets, rates, and contribution structures. Use the calculator above to compare them on your specific income. Generally, the effective rate (total deductions as a percentage of gross salary) is the most meaningful figure to compare across countries.` },
    { q: 'Are the figures shown in the same currency?', a: `No. ${metaA.name} figures are shown in ${metaA.name}'s local currency, and ${metaB.name} figures are shown in ${metaB.name}'s local currency. Exchange rates are deliberately excluded so you can focus on the tax burden as a percentage of income rather than being influenced by currency fluctuations.` },
    { q: 'Does this include social security and national insurance?', a: 'Yes. For all countries, the calculator deducts the standard employee social contributions: National Insurance (UK), FICA/Social Security + Medicare (USA), CPP + EI (Canada), Medicare Levy (Australia), and full social contributions (Germany).' },
    { q: 'Which country has higher taxes overall?', a: `It depends on the income level and what counts as "tax." Germany typically has the highest combined deductions, while the USA has the lowest among the five countries at equivalent incomes. Use the comparison above for a precise answer at your specific salary.` },
  ];

  return (
    <>
      <FAQSchema faqs={compareFAQs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Compare', url: '/compare' },
        { name: title, url: `/compare/${slug}` },
      ]} />

      <div className="max-w-[1120px] mx-auto px-4 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Compare', url: '/compare' },
          { name: title, url: `/compare/${slug}` },
        ]} />

        <AdUnit slot="top-banner" className="mb-6" />

        <h1 className="text-3xl font-bold text-[#0f172a] mb-2" data-testid="compare-h1">
          {metaA.flag} {metaA.name} vs {metaB.flag} {metaB.name} — Income Tax Comparison
        </h1>
        <p className="text-[#334155] mb-6 leading-relaxed">
          Enter a salary amount to compare take-home pay, total tax, and effective tax rate between {metaA.name} and {metaB.name}. Each country uses its official 2025 tax rates. Figures are shown in each country's local currency — exchange rates are not applied.
        </p>

        <CompareShell countryA={countryA} countryB={countryB} />

        <div className="mt-8 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 text-sm text-[#64748b]">
          <strong className="text-[#0f172a]">Note:</strong> This comparison is for employed individuals using standard deductions. It does not account for state/provincial taxes (USA, Canada), pension contributions, or country-specific allowances beyond the standard deductions. For a precise personal calculation, consult a tax professional.
        </div>

        {/* Individual calculators */}
        {relatedTools.length > 0 && (
          <div className="mt-6 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4">
            <p className="text-sm font-semibold text-[#0f172a] mb-3">Individual Country Calculators</p>
            <div className="flex flex-wrap gap-2">
              {relatedTools.map(s => (
                <Link
                  key={s}
                  href={`/tools/${s}`}
                  className="text-sm text-[#1d4ed8] border border-[#dbeafe] bg-white hover:bg-[#dbeafe] px-3 py-1.5 rounded-lg transition-colors"
                >
                  {COUNTRY_TOOL_LABELS[s] ?? s} →
                </Link>
              ))}
              <Link href="/best-tax-software" className="text-sm text-[#1d4ed8] border border-[#dbeafe] bg-white hover:bg-[#dbeafe] px-3 py-1.5 rounded-lg transition-colors">
                Best Tax Software →
              </Link>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mt-10 mb-4">
          <h2 className="text-xl font-bold text-[#0f172a] mb-4">Frequently Asked Questions</h2>
          <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
            {compareFAQs.map((faq, i) => (
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

        <AdUnit slot="below-article" className="mt-8" />
      </div>
    </>
  );
}
