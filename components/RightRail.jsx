export default function RightRail({ reservations = [], selectedReservation, selectedTable }) {
  return (
    <aside className="right-rail right-rail-polished panel">
      <div className="rail-section">
        <p className="eyebrow">Nächste Reservierungen</p>
        <div className="rail-list">
          {reservations.slice(0, 5).map((item) => (
            <div className="rail-item" key={item.id}>
              <div>
                <strong>{item.guest_name}</strong>
                <span>{item.guest_count} Personen · {item.table_name || 'offen'}</span>
              </div>
              <span>{new Date(item.start_time).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          ))}
          {reservations.length === 0 ? <p className="muted">Keine Reservierungen geladen.</p> : null}
        </div>
      </div>

      <div className="rail-section">
        <p className="eyebrow">Aktueller Kontext</p>
        <div className="context-card">
          {selectedReservation ? (
            <>
              <strong>{selectedReservation.guest_name}</strong>
              <span>{selectedReservation.guest_count} Personen</span>
              <span>Status: {selectedReservation.status}</span>
              <span>Tisch: {selectedReservation.table_name || 'offen'}</span>
              <span>Mitarbeiter: {selectedReservation.staff_name || '—'}</span>
            </>
          ) : selectedTable ? (
            <>
              <strong>{selectedTable.name}</strong>
              <span>{selectedTable.capacity} Plätze</span>
              <span>Kein Gast ausgewählt</span>
            </>
          ) : (
            <span className="muted">Wähle eine Reservierung oder einen Tisch.</span>
          )}
        </div>
      </div>
    </aside>
  );
}
