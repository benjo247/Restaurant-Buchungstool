export default function ReservationList({
  reservations = [],
  selectedReservationId = '',
  onSelectReservation,
  onEditReservation,
  onSetStatus
}) {
  const canSelect = typeof onSelectReservation === 'function';
  const canEdit = typeof onEditReservation === 'function';
  const canSetStatus = typeof onSetStatus === 'function';

  return (
    <div className="reservation-list panel">
      <div className="reservation-list-head">
        <span>Zeit</span>
        <span>Gast</span>
        <span>Personen</span>
        <span>Tisch</span>
        <span>Status</span>
        <span>Mitarbeiter</span>
        <span>Aktionen</span>
      </div>

      {reservations.length === 0 ? (
        <div className="reservation-empty">Noch keine Reservierungen vorhanden.</div>
      ) : (
        reservations.map((item) => (
          <div
            key={item.id}
            className={`reservation-row ${selectedReservationId === item.id ? 'reservation-row-active' : ''}`}
            onClick={() => canSelect && onSelectReservation(item.id)}
          >
            <span>
              {new Date(item.start_time).toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>

            <span>{item.guest_name}</span>
            <span>{item.guest_count}</span>
            <span>{item.table_name || 'Offen'}</span>
            <span className={`status-pill status-pill-${item.status}`}>{item.status}</span>
            <span>{item.staff_name || '—'}</span>

            <span className="reservation-actions-cell">
              {canEdit ? (
                <button
                  className="row-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEditReservation(item.id);
                  }}
                >
                  Bearbeiten
                </button>
              ) : null}

              {canSetStatus ? (
                <>
                  <button
                    className="row-button row-button-soft"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSetStatus(item.id, 'seated');
                    }}
                  >
                    Eingetroffen
                  </button>

                  <button
                    className="row-button row-button-soft"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSetStatus(item.id, 'finished');
                    }}
                  >
                    Fertig
                  </button>

                  <button
                    className="row-button row-button-soft"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSetStatus(item.id, 'no_show');
                    }}
                  >
                    No-Show
                  </button>
                </>
              ) : null}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
