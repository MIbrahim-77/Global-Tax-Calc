export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://global-tax-calc.vercel.app/#website',
        url: 'https://global-tax-calc.vercel.app/',
        name: 'GlobalTax',
        description: 'Free, accurate tax calculators for the USA, UK, Canada, Australia, and Germany. Get instant 2025 tax estimates with no signup required.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://global-tax-calc.vercel.app/tools?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://global-tax-calc.vercel.app/#organization',
        name: 'GlobalTax',
        url: 'https://global-tax-calc.vercel.app/',
        logo: 'https://global-tax-calc.vercel.app/favicon.svg',
        sameAs: [],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
