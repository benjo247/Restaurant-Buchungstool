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
    <div className="sidebar-brand">
      <div className="sidebar-logo-shell">
        {logo ? (
          <img src={logo} alt="Restaurant Logo" className="sidebar-logo" />
        ) : (
          <div className="sidebar-logo-fallback">R</div>
        )}
      </div>
      <div>
        <p className="sidebar-overline">Restaurant</p>
        <h1 className="sidebar-title">Mein Betrieb</h1>
        <p className="sidebar-subtitle">Reservierungen & Service</p>
      </div>
    </div>
  );
}
