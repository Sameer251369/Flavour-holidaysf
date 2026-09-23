import React from 'react';

const BrandMark = ({ compact = false }) => (
  <span className={`brand-lockup${compact ? ' brand-lockup--compact' : ''}`}>
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-mark__letters">FH</span>
      <span className="brand-mark__route" />
    </span>
    {!compact && (
      <span className="brand-lockup__text">
        <span>Flavour</span>
        <small>Holidays</small>
      </span>
    )}
  </span>
);

export default BrandMark;
