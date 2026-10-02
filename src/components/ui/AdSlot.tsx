import React from 'react';
import { cn } from '@/lib/utils';

interface AdSlotProps {
  slotId?: string;
  format?: 'horizontal-banner' | 'sidebar-card' | 'in-feed';
  className?: string;
}

export function AdSlot({ slotId = 'default-slot', format = 'horizontal-banner', className }: AdSlotProps) {
  // If ads are disabled or during development placeholder
  const isAdsenseEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true';

  const formatStyles = {
    'horizontal-banner': 'w-full h-24 my-6',
    'sidebar-card': 'w-full h-64 my-4',
    'in-feed': 'w-full h-32 my-4',
  };

  return (
    <div
      className={cn(
        'relative rounded-xl border border-dashed border-slate-800/80 bg-slate-900/30 flex flex-col items-center justify-center p-3 text-center overflow-hidden select-none',
        formatStyles[format],
        className
      )}
      aria-label="Advertisement"
    >
      <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">
        Sponsored / Partner Advertisement
      </div>

      {isAdsenseEnabled ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Ad Slot Reserved</span>
          <span className="text-slate-600">•</span>
          <span>Google AdSense Ready ({format})</span>
        </div>
      )}
    </div>
  );
}
