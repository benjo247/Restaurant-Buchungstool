export default function RightRail({ reservations = [] }) {
  return (
    <aside className="right-rail panel-light">
      <div className="rail-section">
        <p className="eyebrow">Nächste Reservierungen</p>
        <div className="rail-list">
          {reservations.length === 0 ? (
            <p className="muted">Keine Reservierungen geladen.</p>
          ) : (
            reservations.slice(0, 5).map((item) => (
              <div className="rail-item" key={item.id}>
                <strong>{item.guest_name}</strong>
                <span>{new Date(item.start_time).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rail-section">
        <p className="eyebrow">Service Hinweise</p>
        <div className="hint-card">2 Tische ohne Zuweisung</div>
        <div className="hint-card">1 Rechnung angefordert</div>
      </div>
    </aside>
  );
}
