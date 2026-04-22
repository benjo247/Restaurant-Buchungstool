export default function SettingsPage() {
  return (
    <section className="card">
      <h2 className="section-title">Einstellungen</h2>
      <p className="section-subtitle">Nur die Felder, die direkt die Reservierungslogik beeinflussen.</p>

      <form className="form-grid" style={{ marginTop: 20 }}>
        <label className="label">
          Restaurantname
          <input className="input" defaultValue="Restaurant Muster" />
        </label>

        <div className="split">
          <label className="label">
            Standarddauer (Minuten)
            <select className="select" defaultValue="120">
              <option value="90">90</option>
              <option value="120">120</option>
              <option value="150">150</option>
            </select>
          </label>

          <label className="label">
            Pufferzeit (Minuten)
            <select className="select" defaultValue="15">
              <option value="0">0</option>
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
          </label>
        </div>

        <button className="primary-button" type="submit">
          Speichern
        </button>
      </form>
    </section>
  );
}
