export default function RightRail({ reservations = [], selectedReservation, selectedTable }) {
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
        <p className="eyebrow">Aktueller Kontext</p>
        <div className="detail-card">
          {selectedReservation ? (
            <>
              <strong>{selectedReservation.guest_name}</strong>
              <span>{selectedReservation.guest_count} Personen</span>
              <span>Status: {selectedReservation.status}</span>
              <span>Tisch: {selectedReservation.table_name || 'offen'}</span>
            </>
          ) : selectedTable ? (
            <>
              <strong>{selectedTable.name}</strong>
              <span>{selectedTable.capacity} Plätze</span>
              <span>Kein aktiver Gast ausgewählt</span>
            </>
          ) : (
            <span className="muted">Tippe auf einen Tisch oder eine Reservierung.</span>
          )}
        </div>
      </div>
    </aside>
  );
}
