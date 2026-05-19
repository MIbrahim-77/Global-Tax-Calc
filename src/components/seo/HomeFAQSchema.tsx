export const HOME_FAQS = [
  { q: 'Which countries does GlobalTax cover?', a: 'Right now, GlobalTax covers five countries: the United Kingdom, United States, Canada, Australia, and Germany. Across those five, we have 15 calculators covering income tax, take-home pay, VAT, capital gains, and more. We plan to add more countries over time.' },
  { q: 'How accurate are the tax calculators?', a: 'Pretty accurate for most people. We pull our rates directly from HMRC, the IRS, the CRA, the ATO, and the German BMF — so the underlying numbers are official. That said, these calculators are built for standard employed workers. They don\'t factor in state or provincial taxes, pension contributions, or unusual personal circumstances. Think of the result as a reliable estimate, not a certified tax return.' },
  { q: 'Is GlobalTax free to use?', a: 'Yes, completely free. No registration, no subscription, no credit card — nothing. All 15 calculators are open to anyone who visits the site.' },
  { q: 'Do I need to create an account?', a: 'No account needed at all. Open any calculator, type in your income, and you get your result instantly. Nothing is stored on our servers.' },
  { q: 'How often are the tax rates updated?', a: 'We update rates at the start of each tax year and whenever a mid-year change is announced. Everything currently shown reflects the 2025 tax year (2025/26 for the UK).' },
  { q: 'Can I compare taxes between two countries?', a: 'Yes — that\'s one of the more useful things on the site. Head to the Compare section, enter a salary, and you\'ll see your take-home pay in two countries displayed side by side using each country\'s local currency and official rates.' },
  { q: 'Where can I find the best tax software for filing my return?', a: 'Check our Best Tax Software page for a country-by-country breakdown of the most trusted tax filing tools, including TurboTax, H&R Block, TaxScouts, and others.' },
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
