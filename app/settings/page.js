import LogoUploader from '../../components/LogoUploader';

export default function SettingsPage() {
  return (
    <section className="stack-lg">
      <div className="section-head">
        <div>
          <p className="eyebrow">Einstellungen</p>
          <h2>Restaurant-Einstellungen</h2>
          <p className="section-copy">
            Optik, Branding und spätere Betriebsparameter zentral an einem Ort.
          </p>
        </div>
      </div>

      <div className="settings-grid settings-grid-wide">
        <LogoUploader />

        <div className="panel settings-card">
          <div className="settings-card-head">
            <div>
              <h3>Akzentfarbe</h3>
              <p className="muted">
                Das Dashboard nutzt jetzt ein kontrastreicheres Farbsystem mit klarer Primärfarbe.
              </p>
            </div>
            <span className="accent-chip">UI</span>
          </div>

          <div className="palette-row">
            <span className="palette-swatch swatch-primary" />
            <span className="palette-swatch swatch-secondary" />
            <span className="palette-swatch swatch-success" />
            <span className="palette-swatch swatch-warning" />
          </div>

          <p className="muted">
            Primäraktionen sind blau-violett betont, Flächen bleiben hell und ruhig, Statusfarben bleiben eindeutig.
          </p>
        </div>

        <div className="panel settings-card">
          <div className="settings-card-head">
            <div>
              <h3>Betrieb</h3>
              <p className="muted">
                Öffnungszeiten, Servicezeiten und Slot-Längen kannst du hier später hinterlegen.
              </p>
            </div>
            <span className="accent-chip">Ops</span>
          </div>
        </div>

        <div className="panel settings-card">
          <div className="settings-card-head">
            <div>
              <h3>Web-Buchungen</h3>
              <p className="muted">
                Später verbinden wir hier Website, Google Buchung und externe Quellen.
              </p>
            </div>
            <span className="accent-chip">Sync</span>
          </div>
        </div>

        <div className="panel settings-card">
          <div className="settings-card-head">
            <div>
              <h3>Team & Rechte</h3>
              <p className="muted">
                Hier können später Mitarbeiter-Zugänge und Rollen ergänzt werden.
              </p>
            </div>
            <span className="accent-chip">Users</span>
          </div>
        </div>
      </div>
    </section>
  );
}
