export default function ReservationList({ reservations = [], selectedReservationId = '', onSelectReservation, onEditReservation }) {
  return (
    <div className="reservation-list panel-light">
      <div className="reservation-list-head">
        <span>Zeit</span>
        <span>Gast</span>
        <span>Personen</span>
        <span>Tisch</span>
        <span>Status</span>
        <span>Aktion</span>
      </div>

      {reservations.length === 0 ? (
        <div className="reservation-row reservation-empty">Noch keine Reservierungen vorhanden.</div>
      ) : (
        reservations.slice(0, 12).map((item) => (
          <div
            className={`reservation-row ${selectedReservationId === item.id ? 'reservation-row-active' : ''}`}
            key={item.id}
            onClick={() => onSelectReservation?.(item.id)}
          >
            <span>{new Date(item.start_time).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
            <span>{item.guest_name}</span>
            <span>{item.guest_count}</span>
            <span>{item.table_name || 'Offen'}</span>
            <span className={`list-status list-status-${item.status}`}>{item.status}</span>
            <span>
              <button
                className="row-action"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditReservation?.(item.id);
                }}
              >
                Bearbeiten
              </button>
            </span>
          </div>
        ))
      )}
    </div>
  );
}
