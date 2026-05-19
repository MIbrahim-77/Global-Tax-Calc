import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { TOOLS, COUNTRIES } from '@/data/tools/tools-manifest';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { useSEO } from '@/hooks/use-seo';

export default function ToolsIndex() {
  useSEO({
    title: 'Free Tax Calculators — UK, USA, Canada, Australia & Germany | GlobalTax',
    description: 'Browse all 15 free tax calculators on GlobalTax. Income tax, take-home pay, VAT, capital gains, and more — accurate 2025 rates for 5 countries.',
    canonical: 'https://taxnova.com/tools',
  });

  const [activeCountry, setActiveCountry] = useState<string>('all');

  const filteredCountries = activeCountry === 'all'
    ? COUNTRIES
    : COUNTRIES.filter(c => c.id === activeCountry);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1120px] mx-auto px-4 py-8">
        <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'All Calculators', url: '/tools' }]} />
        <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Tax Calculators</h1>
        <p className="text-[#334155] mb-8">Free, accurate tax calculators for 5 countries — 15 tools total.</p>

        {/* Country Filter */}
        <div className="flex flex-wrap gap-2 mb-8" data-testid="country-filter">
          <button
            onClick={() => setActiveCountry('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCountry === 'all' ? 'bg-[#1d4ed8] text-white' : 'bg-[#f1f5f9] text-[#334155] hover:bg-[#dbeafe] hover:text-[#1d4ed8]'}`}
            data-testid="filter-all"
          >
            All Countries
          </button>
          {COUNTRIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCountry(c.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCountry === c.id ? 'bg-[#1d4ed8] text-white' : 'bg-[#f1f5f9] text-[#334155] hover:bg-[#dbeafe] hover:text-[#1d4ed8]'}`}
              data-testid={`filter-${c.id}`}
            >
              {c.flag} {c.name}
            </button>
          ))}
        </div>

        {/* Tool grids by country */}
        {filteredCountries.map(country => {
          const tools = TOOLS.filter(t => t.country === country.id);
          return (
            <div key={country.id} className="mb-10">
              <h2 className="flex items-center gap-2 text-xl font-bold text-[#0f172a] mb-4">
                <span>{country.flag}</span>
                {country.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tools.map(tool => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#1d4ed8] hover:shadow-sm rounded-xl p-5 transition-all"
                    data-testid={`tool-card-${tool.slug}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors leading-snug">
                        {tool.title}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-[#94a3b8] group-hover:text-[#1d4ed8] flex-shrink-0 ml-2 mt-0.5 transition-colors" />
                    </div>
                    <p className="text-sm text-[#64748b] leading-relaxed line-clamp-3">{tool.intro}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
