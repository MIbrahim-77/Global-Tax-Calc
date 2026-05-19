import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { useSEO } from '@/hooks/use-seo';

export default function About() {
  useSEO({
    title: 'About GlobalTax — Free Tax Calculators for 5 Countries',
    description: 'Learn about GlobalTax — who we are, how our tax calculators work, and what countries and tools we cover. Free, accurate, and no signup required.',
    canonical: 'https://taxnova.com/about',
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[680px] mx-auto px-4 py-12">
        <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]} />
        <h1 className="text-3xl font-bold text-[#0f172a] mb-6">About GlobalTax</h1>
        <div className="prose max-w-none text-[#334155] leading-relaxed space-y-4">
          <p>
            GlobalTax is a free tax calculator platform covering five major English-speaking markets: the United Kingdom, United States, Canada, Australia, and Germany. We built GlobalTax because we believe everyone should have access to accurate, easy-to-understand tax estimates — without paying for software, registering for an account, or waiting for a professional.
          </p>
          <p>
            All calculations happen instantly in your browser using the latest official tax rates and formulas. We update our tax data as soon as new rates are published by HMRC, the IRS, the CRA, the ATO, and the German Bundesfinanzministerium.
          </p>
          <h2 className="text-xl font-bold text-[#0f172a] mt-8 mb-3">What GlobalTax Covers</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>15 tax calculators across 5 countries</li>
            <li>Income tax, salary, VAT, capital gains, superannuation, and provincial tax tools</li>
            <li>Side-by-side country comparisons</li>
            <li>18 plain-English tax guides</li>
          </ul>
          <h2 className="text-xl font-bold text-[#0f172a] mt-8 mb-3">How We Keep Data Accurate</h2>
          <p>
            Each calculator is built directly from the official tax authority publications — HMRC for the UK, the IRS for the USA, the CRA for Canada, the ATO for Australia, and the BMF for Germany. We review all rates at the start of each tax year and update them immediately when interim changes are announced.
          </p>
          <h2 className="text-xl font-bold text-[#0f172a] mt-8 mb-3">Our Limitations</h2>
          <p>
            GlobalTax is for estimation and educational purposes only. Our calculators are accurate for standard employed workers using default deductions. They do not account for pension contributions, student loan repayments, state/provincial income tax (for USA/Canada), Scotland-specific UK rates, or complex tax situations. Always verify with the relevant tax authority or a qualified tax professional before making financial decisions.
          </p>
          <h2 className="text-xl font-bold text-[#0f172a] mt-8 mb-3">Contact Us</h2>
          <p>
            Have a question, spotted an error, or want to suggest a new calculator? Visit our <a href="/contact" className="text-[#1d4ed8] hover:underline">contact page</a> and we'll get back to you within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
