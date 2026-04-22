import LogoUploader from '../../components/LogoUploader';

export default function SettingsPage() {
  return (
    <section className="content-stack">
      <div className="page-hero panel-light">
        <div>
          <p className="section-kicker">Branding</p>
          <h3>Einstellungen</h3>
          <p>Logo im Header, Systemfarben und spätere Betriebsparameter an einem Ort.</p>
        </div>
      </div>

      <div className="settings-grid control-settings-grid">
        <LogoUploader />

        <div className="panel-light settings-card">
          <div className="settings-card-head">
            <div>
              <h3>Farbsystem</h3>
              <p className="muted">Dunkler Kontrollrahmen, helle Arbeitsfläche und violette Akzentfarbe.</p>
            </div>
            <span className="accent-chip">UI</span>
          </div>
          <div className="palette-row">
            <span className="palette-swatch swatch-primary" />
            <span className="palette-swatch swatch-secondary" />
            <span className="palette-swatch swatch-success" />
            <span className="palette-swatch swatch-warning" />
          </div>
        </div>
      </div>
    </section>
  );
}
