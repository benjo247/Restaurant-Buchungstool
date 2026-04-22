'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'restaurant_logo_data_url';

export default function LogoUploader() {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setPreview(saved);
  }, []);

  function onChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result || '');
      window.localStorage.setItem(STORAGE_KEY, value);
      setPreview(value);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="panel form-shell">
      <div className="logo-preview">
        {preview ? <img src={preview} alt="Logo Vorschau" className="logo-preview-image" /> : <div className="logo-placeholder">Logo</div>}
      </div>
      <label className="primary-button upload-button">
        Logo auswählen
        <input type="file" accept="image/*" onChange={onChange} />
      </label>
    </div>
  );
}
