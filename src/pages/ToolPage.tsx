import { useParams, Link } from 'wouter';
import { TOOLS } from '@/data/tools/tools-manifest';
import { CalculatorShell } from '@/components/calculator/CalculatorShell';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdUnit } from '@/components/layout/AdUnit';
import { AffiliateBar } from '@/components/monetization/AffiliateBar';
import { NewsletterSignup } from '@/components/monetization/NewsletterSignup';
import { LeadMagnet } from '@/components/monetization/LeadMagnet';
import { RelatedContent } from '@/components/content/RelatedContent';
import { calculateUKTax } from '@/lib/calculators/uk';
import { calculateUSATax } from '@/lib/calculators/usa';
import { calculateCanadaTax } from '@/lib/calculators/canada';
import { calculateAustraliaTax } from '@/lib/calculators/australia';
import { calculateGermanyTax } from '@/lib/calculators/germany';
import { formatCurrency } from '@/lib/formatters';
import { useSEO } from '@/hooks/use-seo';

const COUNTRY_NAMES: Record<string, string> = {
  uk: 'United Kingdom', usa: 'United States', canada: 'Canada', australia: 'Australia', germany: 'Germany',
};

function getExamples(tool: ReturnType<typeof TOOLS.find>) {
  if (!tool) return [];
  const { country } = tool;
  if (country === 'uk' && tool.calculatorType !== 'vat') {
    return [30000, 50000, 85000].map(s => {
      const r = calculateUKTax(s);
      return { salary: s, net: r.netSalary, tax: r.incomeTax, symbol: '£', effectiveRate: r.effectiveRate };
    });
  }
  if (country === 'usa' && tool.calculatorType !== 'capital-gains') {
    return [50000, 80000, 120000].map(s => {
      const r = calculateUSATax(s, 'single');
      return { salary: s, net: r.netSalary, tax: r.federalIncomeTax, symbol: '$', effectiveRate: r.effectiveRate };
    });
  }
  if (country === 'canada' && tool.calculatorType !== 'vat') {
    return [55000, 80000, 120000].map(s => {
      const r = calculateCanadaTax(s, 'ontario');
      return { salary: s, net: r.netSalary, tax: r.federalTax + r.provincialTax, symbol: 'CA$', effectiveRate: r.effectiveRate };
    });
  }
  if (country === 'australia' && tool.calculatorType !== 'super') {
    return [45000, 85000, 150000].map(s => {
      const r = calculateAustraliaTax(s);
      return { salary: s, net: r.netSalary, tax: r.netIncomeTax, symbol: 'A$', effectiveRate: r.effectiveRate };
    });
  }
  if (country === 'germany' && tool.calculatorType !== 'vat') {
    return [35000, 60000, 100000].map(s => {
      const r = calculateGermanyTax(s, false);
      return { salary: s, net: r.netSalary, tax: r.incomeTax, symbol: '€', effectiveRate: r.effectiveRate };
    });
  }
  return [];
}

function ToolPageContent({ slug }: { slug: string }) {
  const tool = TOOLS.find(t => t.slug === slug);

  useSEO({
    title: tool ? tool.metaTitle : 'Calculator Not Found — GlobalTax',
    description: tool?.metaDescription,
    canonical: tool ? `https://taxnova.com/tools/${tool.slug}` : undefined,
  });

  if (!tool) {
    return (
      <div className="max-w-[1120px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#0f172a] mb-4">Calculator Not Found</h1>
        <Link href="/tools" className="text-[#1d4ed8] hover:underline">View all calculators</Link>
      </div>
    );
  }

  const examples = getExamples(tool);
  const isIncomeTool = !['vat', 'capital-gains', 'super', 'gst'].includes(tool.calculatorType);

  return (
    <>
      <FAQSchema faqs={tool.faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: `${COUNTRY_NAMES[tool.country] ?? tool.country} Tools`, url: `/tools?country=${tool.country}` },
        { name: tool.title, url: `/tools/${tool.slug}` },
      ]} />

      <div className="max-w-[1120px] mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main column */}
          <div className="flex-1 min-w-0">
            <Breadcrumb items={[
              { name: 'Home', url: '/' },
              { name: COUNTRY_NAMES[tool.country] ?? tool.country, url: `/tools?country=${tool.country}` },
              { name: tool.title, url: `/tools/${tool.slug}` },
            ]} />

            <AdUnit slot="top-banner" className="mb-6" />

            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{tool.flag}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {COUNTRY_NAMES[tool.country]} Tax Calculator
              </span>
            </div>

            <h1 className="text-3xl font-bold text-[#0f172a] mb-2" data-testid="tool-h1">{tool.h1}</h1>
            <p className="text-[#334155] mb-2 leading-relaxed">{tool.intro}</p>
            <p className="text-xs text-slate-400 mb-6">
              Last updated: <span className="font-medium text-slate-500">May 2025</span> · Rates verified against official {COUNTRY_NAMES[tool.country]} sources
            </p>

            <CalculatorShell tool={tool} />

            <AdUnit slot="mid-content" className="my-8" />

            {/* Affiliate recommendations */}
            <AffiliateBar country={tool.country} />

            {/* How It Works */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">How This Calculator Works</h2>
              {tool.country === 'uk' && isIncomeTool && (
                <div className="prose max-w-none text-[#334155]">
                  <p>This calculator uses the official HMRC tax rates and National Insurance rates for 2025/26. It calculates your taxable income by subtracting the personal allowance (£12,570) from your gross salary, then applies the progressive income tax bands. National Insurance is calculated separately using the Class 1 employee rates.</p>
                </div>
              )}
              {tool.country === 'usa' && isIncomeTool && (
                <div className="text-[#334155]">
                  <p>This calculator applies the 2025 federal tax brackets after subtracting the standard deduction. FICA taxes (Social Security at 6.2% up to $168,600 and Medicare at 1.45%) are calculated on gross wages and added to income tax for your total deductions.</p>
                </div>
              )}
              {tool.country === 'canada' && isIncomeTool && (
                <div className="text-[#334155]">
                  <p>This calculator computes federal income tax using the 2025 federal brackets, then subtracts the basic personal amount credit (15% of $15,705). Ontario provincial tax is calculated separately using Ontario's brackets. CPP and EI premiums are added at their 2025 rates.</p>
                </div>
              )}
              {tool.country === 'australia' && isIncomeTool && (
                <div className="text-[#334155]">
                  <p>This calculator applies the 2024-25 Australian income tax brackets, then applies the Low Income Tax Offset (up to $700), and adds the 2% Medicare levy. Employer superannuation (11.5%) is shown separately as it does not reduce take-home pay.</p>
                </div>
              )}
              {tool.country === 'germany' && isIncomeTool && (
                <div className="text-[#334155]">
                  <p>This calculator applies Germany's 2025 progressive income tax formula across five zones. The solidarity surcharge (5.5%) is applied only if income tax exceeds €18,130. Social contributions (pension, health, unemployment, nursing care) are calculated at the 2025 employee rates.</p>
                </div>
              )}
              {tool.calculatorType === 'vat' && (
                <div className="text-[#334155]">
                  <p>To add VAT: multiply the net amount by (1 + rate). To remove VAT: divide the gross amount by (1 + rate). The VAT amount is the difference between gross and net. Our calculator handles both directions automatically.</p>
                </div>
              )}
            </section>

            {/* Examples */}
            {examples.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Example Calculations</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {examples.map(ex => (
                    <div key={ex.salary} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4">
                      <div className="text-sm text-[#64748b] mb-2">Salary: <span className="font-semibold text-[#0f172a]">{formatCurrency(ex.salary, ex.symbol)}</span></div>
                      <div className="text-sm text-[#64748b] mb-1">Take-home: <span className="font-semibold text-[#059669]">{formatCurrency(ex.net, ex.symbol)}</span></div>
                      <div className="text-sm text-[#64748b] mb-1">Income tax: <span className="font-semibold text-[#d97706]">{formatCurrency(ex.tax, ex.symbol)}</span></div>
                      <div className="text-sm text-[#64748b]">Effective rate: <span className="font-semibold text-[#1d4ed8]">{ex.effectiveRate.toFixed(1)}%</span></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            <section className="mb-8" id="faq">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Frequently Asked Questions</h2>
              <div className="space-y-0 border border-[#e2e8f0] rounded-xl overflow-hidden">
                {tool.faqs.map((faq, i) => (
                  <details key={i} className="group border-b last:border-b-0 border-[#e2e8f0]" data-testid={`faq-item-${i}`}>
                    <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-[#0f172a] hover:bg-[#f8fafc] transition-colors">
                      {faq.q}
                      <span className="ml-4 text-[#94a3b8] group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                    </summary>
                    <div className="px-5 pb-4 pt-1 text-[#334155] text-sm leading-relaxed">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Newsletter */}
            <div className="mb-8">
              <NewsletterSignup />
            </div>

            {/* Disclaimer */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 text-sm text-[#64748b] mb-8">
              <strong className="text-[#0f172a]">Disclaimer:</strong> GlobalTax provides estimates for informational purposes only. Results are not financial or legal advice. Tax rules change frequently — always verify with the relevant tax authority. Consult a qualified tax professional for personalised advice.
            </div>

            {/* Lead Magnet */}
            <LeadMagnet country={tool.country} />

            {/* Related content */}
            <RelatedContent
              heading="Related Calculators & Guides"
              items={[
                ...tool.relatedSlugs.map(s => {
                  const r = TOOLS.find(t => t.slug === s);
                  return r ? { type: 'tool' as const, title: r.title, slug: s, desc: r.intro } : null;
                }).filter(Boolean) as { type: 'tool'; title: string; slug: string; desc: string }[],
                { type: 'compare' as const, title: `Compare ${COUNTRY_NAMES[tool.country] ?? tool.country} Tax with Other Countries`, slug: 'compare', desc: 'See how your take-home pay compares to other countries at the same salary.' },
                { type: 'blog' as const, title: 'Tax Guides & Articles', slug: 'blog', desc: 'In-depth guides on income tax, deductions, and filing requirements.' },
              ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="w-[300px] shrink-0 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <AdUnit slot="sidebar" />
              <div>
                <h3 className="font-semibold text-[#0f172a] mb-3 text-sm">Other {COUNTRY_NAMES[tool.country]} Calculators</h3>
                <div className="space-y-2">
                  {TOOLS.filter(t => t.country === tool.country && t.slug !== tool.slug).map(t => (
                    <Link key={t.slug} href={`/tools/${t.slug}`} className="block text-sm text-[#1d4ed8] hover:underline py-0.5">
                      {t.flag} {t.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
                <h3 className="font-semibold text-[#0f172a] mb-2 text-sm">More Tax Guides</h3>
                <div className="space-y-2">
                  <Link href="/blog" className="block text-sm text-[#1d4ed8] hover:underline">All Tax Articles →</Link>
                  <Link href="/compare" className="block text-sm text-[#1d4ed8] hover:underline">Compare Countries →</Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  return <ToolPageContent slug={slug ?? ''} />;
}
