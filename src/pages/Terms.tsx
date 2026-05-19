import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { useSEO } from '@/hooks/use-seo';

export default function Terms() {
  useSEO({
    title: 'Terms of Service — GlobalTax',
    description: 'GlobalTax terms of service. By using our free tax calculators you agree to these terms. Our tools are for informational purposes only.',
    canonical: 'https://globaltax.app/terms',
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[680px] mx-auto px-4 py-12">
        <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Terms of Service', url: '/terms' }]} />
        <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Terms of Service</h1>
        <p className="text-sm text-[#64748b] mb-8">Last updated: January 2025</p>

        <div className="prose max-w-none text-[#334155] leading-relaxed space-y-6">
          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using GlobalTax ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-3">2. Description of Service</h2>
            <p>
              GlobalTax provides free online tax calculators and educational content covering income tax, take-home pay, VAT, and other tax-related calculations for the United Kingdom, United States, Canada, Australia, and Germany. All calculations are estimates based on official published tax rates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-3">3. Not Professional Advice</h2>
            <p>
              The information and results provided by GlobalTax are for <strong>informational and educational purposes only</strong>. Nothing on this site constitutes financial, legal, or tax advice. You should always consult a qualified tax professional or your national tax authority before making financial decisions. GlobalTax is not responsible for any decisions made based on the results of our calculators.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-3">4. Accuracy of Information</h2>
            <p>
              While we make every effort to keep our tax rates accurate and up to date, GlobalTax makes no warranties or representations regarding the accuracy, completeness, or suitability of any information. Tax laws change frequently and our calculators may not reflect the most recent changes at all times. Always verify figures with the relevant tax authority: HMRC (UK), IRS (USA), CRA (Canada), ATO (Australia), or BMF (Germany).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-3">5. No Data Collection</h2>
            <p>
              All tax calculations on GlobalTax are performed entirely within your browser. We do not transmit, store, or retain any financial figures you enter into our calculators. Your data never leaves your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-3">6. Advertising</h2>
            <p>
              GlobalTax is supported by advertising, including Google AdSense ads and affiliate links to third-party tax software products. Affiliate links are clearly marked as sponsored. We only recommend products we believe are genuinely useful. We receive a commission if you purchase through an affiliate link, at no extra cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-3">7. Intellectual Property</h2>
            <p>
              All content on GlobalTax — including text, code, design, and blog articles — is the property of GlobalTax and protected by copyright. You may not reproduce or redistribute any content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-3">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, GlobalTax and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this service or from reliance on any information provided.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-3">9. Third-Party Links</h2>
            <p>
              Our site contains links to third-party websites. These links are provided for your convenience and do not constitute an endorsement. We have no control over the content of those sites and accept no responsibility for them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-3">10. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Continued use of the site following any changes constitutes your acceptance of the revised terms. The date at the top of this page reflects when these terms were last updated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f172a] mb-3">11. Contact</h2>
            <p>
              If you have any questions about these terms, please <a href="/contact" className="text-[#1d4ed8] hover:underline">contact us</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
