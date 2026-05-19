export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://taxnova.com/#website',
        url: 'https://taxnova.com/',
        name: 'GlobalTax',
        description: 'Free tax calculators for the USA, UK, Canada, Australia, and Germany.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://taxnova.com/tools?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://taxnova.com/#organization',
        name: 'GlobalTax',
        url: 'https://taxnova.com/',
        logo: 'https://taxnova.com/favicon.svg',
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
