'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'restaurant_logo_data_url';

export default function LogoUploader() {
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setPreview(saved);
  }, []);

  function handleFileChange(event) {
    setError('');
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Bitte eine Bilddatei auswählen.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Bitte ein Logo unter 2 MB verwenden.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      setPreview(result);
      window.localStorage.setItem(STORAGE_KEY, result);
    };
    reader.readAsDataURL(file);
  }

  function clearLogo() {
    setPreview('');
    setError('');
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="panel settings-card settings-card-large">
      <div className="settings-card-head">
        <div>
          <h3>Branding & Logo</h3>
          <p className="muted">
            Lade ein Logo für dein internes Dashboard hoch. Die Vorschau wird lokal im Browser gespeichert.
          </p>
        </div>
        <span className="accent-chip">Brand</span>
      </div>

      <div className="logo-uploader">
        <div className="logo-preview-shell">
          {preview ? (
            <img src={preview} alt="Restaurant Logo" className="logo-preview" />
          ) : (
            <div className="logo-placeholder">
              <span>Logo</span>
            </div>
          )}
        </div>

        <div className="logo-actions">
          <label className="primary-button file-button">
            Logo auswählen
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
          <button type="button" className="ghost-button" onClick={clearLogo}>
            Entfernen
          </button>
        </div>

        <p className="muted small-text">
          Empfohlen: PNG oder SVG mit transparentem Hintergrund.
        </p>

        {error ? <p className="form-message form-error">{error}</p> : null}
      </div>
    </div>
  );
}
