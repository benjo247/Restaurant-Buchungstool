export default function NewReservationPage() {
  return (
    <section className="card">
      <h2 className="section-title">Neue Reservierung</h2>
      <p className="section-subtitle">Schneller Erfassungsflow für das iPad.</p>

      <form className="form-grid" style={{ marginTop: 20 }}>
        <label className="label">
          Name
          <input className="input" placeholder="z. B. Anna Becker" />
        </label>

        <label className="label">
          Telefonnummer
          <input className="input" placeholder="z. B. 0176 12345678" />
        </label>

        <div className="split">
          <label className="label">
            Personen
            <input className="input" type="number" min="1" defaultValue="2" />
          </label>

          <label className="label">
            Dauer (Minuten)
            <select className="select" defaultValue="120">
              <option value="90">90</option>
              <option value="120">120</option>
              <option value="150">150</option>
            </select>
          </label>
        </div>

        <div className="split">
          <label className="label">
            Datum
            <input className="input" type="date" />
          </label>

          <label className="label">
            Uhrzeit
            <input className="input" type="time" />
          </label>
        </div>

        <label className="label">
          Notiz
          <textarea className="textarea" placeholder="Geburtstag, Kinderstuhl, Fensterplatz ..." />
        </label>

        <div className="card" style={{ background: "#fafcff", padding: 16 }}>
          <strong>Tischvorschlag</strong>
          <p className="muted">Tisch 5 · 4 Plätze · verfügbar</p>
        </div>

        <div className="inline-actions">
          <button className="secondary-button" type="button">
            Abbrechen
          </button>
          <button className="primary-button" type="submit">
            Reservierung speichern
          </button>
        </div>
      </form>
    </section>
  );
}
