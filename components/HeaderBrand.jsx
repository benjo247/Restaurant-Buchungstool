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
      <div className="header-logo-shell">
        {logo ? <img src={logo} alt="Restaurant Logo" className="header-logo" /> : <div className="header-logo-fallback">R</div>}
      </div>
      <div>
        <p className="eyebrow">Single Restaurant Suite</p>
        <h1>Floor Control</h1>
      </div>
    </div>
  );
}
