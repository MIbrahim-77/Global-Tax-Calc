import { useEffect, useRef } from 'react';

type AdUnitProps = {
  slot: 'top-banner' | 'mid-content' | 'sidebar' | 'below-article';
  className?: string;
};

// ─── AdSense Configuration ────────────────────────────────────────────────────
// To activate real ads:
// 1. Get approved at https://adsense.google.com
// 2. Replace the ADSENSE_CLIENT value with your publisher ID (ca-pub-XXXXXXXXXX)
// 3. Replace each ADSENSE_SLOTS value with your real ad slot IDs
// 4. Uncomment the <script> tag in index.html
const ADSENSE_CLIENT = ''; // e.g. 'ca-pub-1234567890123456'
const ADSENSE_SLOTS: Record<string, string> = {
  'top-banner':    '', // e.g. '1234567890'
  'mid-content':   '',
  'sidebar':       '',
  'below-article': '',
};
// ─────────────────────────────────────────────────────────────────────────────

const slotConfig: Record<string, {
  height: string;
  format: string;
  responsive: boolean;
  width?: string;
}> = {
  'top-banner':    { height: 'min-h-[90px]',  format: 'horizontal',  responsive: true },
  'mid-content':   { height: 'min-h-[90px]',  format: 'auto',        responsive: true },
  'sidebar':       { height: 'min-h-[250px]', format: 'rectangle',   responsive: false, width: 'w-[300px]' },
  'below-article': { height: 'min-h-[90px]',  format: 'horizontal',  responsive: true },
};

const isLive = Boolean(ADSENSE_CLIENT && ADSENSE_SLOTS['top-banner']);

function LiveAd({ slot, config }: { slot: string; config: typeof slotConfig[string] }) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // silently ignore if AdSense not loaded
    }
  }, []);

  return (
    <ins
      ref={ref}
      className="adsbygoogle block"
      style={{ display: 'block' }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={ADSENSE_SLOTS[slot]}
      data-ad-format={config.format}
      data-full-width-responsive={config.responsive ? 'true' : 'false'}
    />
  );
}

function PlaceholderAd({ slot, config }: { slot: string; config: typeof slotConfig[string] }) {
  const labels: Record<string, string> = {
    'top-banner':    'Banner Ad — 728×90',
    'mid-content':   'In-Content Ad — 728×90',
    'sidebar':       'Sidebar Ad — 300×250',
    'below-article': 'Below-Article Ad — 728×90',
  };
  return (
    <div
      className={`${config.height} ${config.width ?? 'w-full'} relative bg-gradient-to-br from-slate-50 to-slate-100 border border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-1 overflow-hidden`}
      aria-label="Advertisement placeholder"
    >
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold select-none">Advertisement</span>
      <span className="text-[10px] text-slate-300 select-none">{labels[slot]}</span>
    </div>
  );
}

export function AdUnit({ slot, className }: AdUnitProps) {
  const config = slotConfig[slot];
  return (
    <div
      className={`overflow-hidden ${className ?? ''}`}
      data-testid={`ad-unit-${slot}`}
    >
      {isLive
        ? <LiveAd slot={slot} config={config} />
        : <PlaceholderAd slot={slot} config={config} />
      }
    </div>
  );
}
