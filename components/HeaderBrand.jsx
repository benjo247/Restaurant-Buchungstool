'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'restaurant_logo_data_url';

export default function HeaderBrand() {
  const [logo, setLogo] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setLogo(saved);
  }, []);

  return (
    <div className="header-brand">
      <div className="header-logo-shell brand-frame">
        {logo ? (
          <img src={logo} alt="Restaurant Logo" className="header-logo brand-logo" />
        ) : (
          <div className="header-logo-fallback brand-fallback">R</div>
        )}
      </div>

      <div className="header-brand-copy">
        <p className="eyebrow">Single Restaurant Suite</p>
        <h1>Floor Control</h1>
        <span className="header-brand-subline">Schnell. Klar. Service-tauglich auf iPad.</span>
      </div>
    </div>
  );
}
