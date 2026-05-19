import { ExternalLink } from 'lucide-react';

type AffiliateOffer = {
  name: string;
  tagline: string;
  cta: string;
  url: string;
  badge?: string;
};

const AFFILIATE_OFFERS: Record<string, AffiliateOffer[]> = {
  uk: [
    { name: 'TaxScouts', tagline: 'UK self-assessment tax returns sorted in 30 minutes.', cta: 'File your return →', url: 'https://taxscouts.com', badge: 'Popular' },
    { name: 'GoSimpleTax', tagline: 'The simplest way to complete your UK self-assessment.', cta: 'Try free →', url: 'https://gosimpletax.com' },
  ],
  usa: [
    { name: 'TurboTax', tagline: 'America\'s #1 tax prep software. Get your max refund.', cta: 'Start free →', url: 'https://turbotax.intuit.com', badge: '#1 Rated' },
    { name: 'H&R Block', tagline: 'File online or with a tax pro. Guaranteed accuracy.', cta: 'File now →', url: 'https://hrblock.com' },
  ],
  canada: [
    { name: 'TurboTax Canada', tagline: 'Canada\'s most popular tax software. Fast refunds.', cta: 'Start free →', url: 'https://turbotax.intuit.ca', badge: 'Popular' },
    { name: 'Wealthsimple Tax', tagline: 'Free Canadian tax filing — no upsells.', cta: 'File free →', url: 'https://wealthsimple.com/en-ca/tax' },
  ],
  australia: [
    { name: 'myTax', tagline: 'Lodge your Australian tax return online via the ATO.', cta: 'Visit myTax →', url: 'https://www.ato.gov.au/individuals-and-families/lodging-your-tax-return/lodge-your-tax-return-online-with-mytax', badge: 'Official' },
    { name: 'H&R Block AU', tagline: 'Expert tax agents for your Australian return.', cta: 'Get started →', url: 'https://hrblock.com.au' },
  ],
  germany: [
    { name: 'ELSTER', tagline: 'Official German tax portal — file your Steuererklärung.', cta: 'Visit ELSTER →', url: 'https://elster.de', badge: 'Official' },
    { name: 'Taxfix', tagline: 'German tax return in under 22 minutes. Average refund €1,095.', cta: 'File now →', url: 'https://taxfix.de' },
  ],
};

type Props = {
  country: string;
};

export function AffiliateBar({ country }: Props) {
  const offers = AFFILIATE_OFFERS[country];
  if (!offers) return null;

  return (
    <div className="my-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-3">
        Sponsored — Ready to file your taxes?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {offers.map(offer => (
          <a
            key={offer.name}
            href={offer.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group flex items-start justify-between gap-3 rounded-lg bg-white border border-amber-200 hover:border-amber-400 hover:shadow-sm p-4 transition-all"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-slate-900 text-sm">{offer.name}</span>
                {offer.badge && (
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                    {offer.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{offer.tagline}</p>
              <span className="inline-block mt-2 text-xs font-semibold text-blue-600 group-hover:underline">
                {offer.cta}
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-1 group-hover:text-blue-400" />
          </a>
        ))}
      </div>
      <p className="text-[10px] text-amber-600 mt-3">
        * Affiliate links — we may earn a commission if you sign up. This does not affect your price or our calculator results.
      </p>
    </div>
  );
}
