const rows = [
  ["17:30", "Anna Becker", "2 Pers.", "Tisch 3"],
  ["18:00", "Thomas Klein", "4 Pers.", "Tisch 6"],
  ["18:30", "Familie Yilmaz", "5 Pers.", "Tisch 8"],
];

export default function ReservationsPage() {
  return (
    <section className="card">
      <h2 className="section-title">Reservierungen</h2>
      <p className="section-subtitle">Übersicht und spätere Filteransicht.</p>

      <div style={{ marginTop: 20 }}>
        {rows.map((row) => (
          <div className="list-row" key={row.join("-")}>
            <strong>{row[0]}</strong>
            <span>{row[1]}</span>
            <span className="muted">{row[2]}</span>
            <span className="muted">{row[3]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
