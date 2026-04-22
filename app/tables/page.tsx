const tables = [
  { name: "Tisch 1", capacity: 2 },
  { name: "Tisch 2", capacity: 4 },
  { name: "Tisch 3", capacity: 6 },
];

export default function TablesPage() {
  return (
    <section className="card">
      <div className="reservation-row">
        <div>
          <h2 className="section-title">Tische</h2>
          <p className="section-subtitle">Einfache Verwaltung für den MVP.</p>
        </div>
        <button className="primary-button" type="button">
          + Tisch anlegen
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        {tables.map((table) => (
          <div className="table-row" key={table.name}>
            <div>
              <strong>{table.name}</strong>
              <p className="muted">{table.capacity} Plätze</p>
            </div>
            <button className="secondary-button" type="button">
              Bearbeiten
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
