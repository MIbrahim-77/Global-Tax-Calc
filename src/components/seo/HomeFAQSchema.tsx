export const HOME_FAQS = [
  { q: 'Which countries does GlobalTax cover?', a: 'GlobalTax covers five countries: the United Kingdom, United States, Canada, Australia, and Germany. We have 15 calculators in total, including income tax, take-home pay, VAT, capital gains, and more.' },
  { q: 'How accurate are GlobalTax\'s tax calculators?', a: 'Our calculators use official 2025 tax rates directly from HMRC (UK), the IRS (USA), the CRA (Canada), the ATO (Australia), and the German BMF. They are accurate for standard employed workers. They do not account for state/provincial taxes, pension contributions, or complex personal circumstances.' },
  { q: 'Is GlobalTax free to use?', a: 'Yes, completely free. No registration, no subscription, no credit card required. All 15 calculators are available instantly at no cost.' },
  { q: 'Do I need to create an account?', a: 'No account is needed. Just visit any calculator page, enter your salary or income, and get instant results. Nothing is saved to any server.' },
  { q: 'How often are the tax rates updated?', a: 'We update all tax rates at the start of each tax year and whenever a mid-year change is announced. All current rates reflect the 2025 tax year (2025/26 for the UK).' },
  { q: 'Can I compare taxes between two countries?', a: 'Yes. GlobalTax has a dedicated Compare section where you can enter one salary and see the take-home pay side by side in two different countries using that country\'s local currency and official rates.' },
  { q: 'Where can I find the best tax software for filing my return?', a: 'Visit our Best Tax Software page for a country-by-country comparison of the top-rated tax filing tools, including TurboTax, H&R Block, TaxScouts, and more.' },
];

export function HomeFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
