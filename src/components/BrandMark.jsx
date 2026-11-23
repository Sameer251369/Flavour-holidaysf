import React from 'react';
import OptimizedImage from './OptimizedImage';

const BrandMark = ({ compact = false }) => (
  <span className="inline-flex items-center gap-3">
    <span className="flex shrink-0" aria-hidden="true">
      <OptimizedImage
        className="block h-12 w-12 rounded-xl object-cover"
        src="/WhatsApp%20Image%202026-10-29%20at%202.20.15%20PM.jpeg"
        alt=""
        width="48"
        height="48"
        priority
        sizes="48px"
      />
    </span>
    {!compact && (
      <span className="flex -translate-y-0.5 flex-col justify-center leading-none">
        <span className="text-xl font-bold">Flavour</span>
        <small className="mt-1 block text-xs font-semibold uppercase leading-none tracking-[0.25em] text-stone-600">
          Holidays
        </small>
      </span>
    )}
  </span>
);

export default BrandMark;
