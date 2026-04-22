export default function SettingsPage() {
  return (
    <section className="stack-lg">
      <div className="section-head">
        <div>
          <p className="eyebrow">Einstellungen</p>
          <h2>Restaurant-Einstellungen</h2>
          <p className="section-copy">Diese Seite ist als Platzhalter schon im neuen Look gestaltet.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="panel settings-card">
          <h3>Betrieb</h3>
          <p className="muted">Öffnungszeiten, Servicezeiten und Slot-Längen kannst du hier später hinterlegen.</p>
        </div>
        <div className="panel settings-card">
          <h3>Web-Buchungen</h3>
          <p className="muted">Später verbinden wir hier Website, Google Buchung und externe Quellen.</p>
        </div>
        <div className="panel settings-card">
          <h3>Team & Rechte</h3>
          <p className="muted">Hier können später Mitarbeiter-Zugänge und Rollen ergänzt werden.</p>
        </div>
      </div>
    </section>
  );
}
