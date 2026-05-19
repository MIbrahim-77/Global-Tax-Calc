import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { useSEO } from '@/hooks/use-seo';

export default function Privacy() {
  useSEO({
    title: 'Privacy Policy — GlobalTax',
    description: 'GlobalTax privacy policy. We do not collect or store any personal financial data. All calculations happen entirely in your browser.',
    canonical: 'https://taxnova.com/privacy',
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[680px] mx-auto px-4 py-12">
        <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy' }]} />
        <h1 className="text-3xl font-bold text-[#0f172a] mb-6">Privacy Policy</h1>
        <div className="text-[#334155] leading-relaxed space-y-4">
          <p className="font-medium text-[#0f172a]">Last updated: January 2025</p>
          <p>
            GlobalTax is committed to protecting your privacy. This policy explains what data we collect (very little) and how we handle it.
          </p>
          <h2 className="text-xl font-bold text-[#0f172a] mt-6 mb-2">No Personal Data Collection</h2>
          <p>
            GlobalTax does not collect, store, or transmit any personal financial information you enter into our calculators. All calculations happen entirely in your browser. No salary figures, tax results, or input values are ever sent to any server.
          </p>
          <h2 className="text-xl font-bold text-[#0f172a] mt-6 mb-2">Analytics</h2>
          <p>
            We may use anonymous analytics tools to understand how visitors use GlobalTax — which pages are viewed, general geographic regions, and browser types. This data is aggregated and cannot identify individuals. We do not sell or share analytics data with third parties for marketing purposes.
          </p>
          <h2 className="text-xl font-bold text-[#0f172a] mt-6 mb-2">Advertising</h2>
          <p>
            GlobalTax displays advertisements to support the free service. Our advertising partners (including Google AdSense) may use cookies to show you relevant ads based on your browsing behaviour. These cookies are managed by the advertising platform, not by GlobalTax. You can opt out of personalized advertising through your browser settings or the advertising platform's opt-out tools.
          </p>
          <h2 className="text-xl font-bold text-[#0f172a] mt-6 mb-2">Affiliate Links</h2>
          <p>
            Some pages on GlobalTax contain affiliate links to third-party tax software and services. If you click these links and make a purchase, we may earn a small commission at no extra cost to you. We only recommend services we believe are genuinely useful, and affiliate relationships do not influence our calculator results.
          </p>
          <h2 className="text-xl font-bold text-[#0f172a] mt-6 mb-2">Cookies</h2>
          <p>
            GlobalTax uses minimal cookies — primarily for analytics and advertising purposes as described above. We do not use cookies to store any financial information you enter.
          </p>
          <h2 className="text-xl font-bold text-[#0f172a] mt-6 mb-2">Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us through our <a href="/contact" className="text-[#1d4ed8] hover:underline">contact page</a>. We will respond within 30 days.
          </p>
        </div>
      </div>
    </div>
  );
}
