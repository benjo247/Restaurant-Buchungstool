import StatusBadge from './StatusBadge';

function formatTime(value) {
  return new Date(value).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function ReservationCard({ reservation }) {
  const start = formatTime(reservation.start_time);
  const end = formatTime(reservation.end_time);

  return (
    <article className="reservation-card">
      <div className="reservation-time-block">
        <div className="reservation-time-large">{start}</div>
        <div className="reservation-time-small">bis {end}</div>
      </div>

      <div className="reservation-main">
        <div className="reservation-top">
          <div>
            <p className="reservation-kicker">Reservierung</p>
            <h3>{reservation.guest_name}</h3>
          </div>
          <StatusBadge status={reservation.status} />
        </div>

        <div className="reservation-meta-grid">
          <div className="meta-pill">
            <span className="meta-label">Gäste</span>
            <strong>{reservation.guest_count}</strong>
          </div>
          <div className="meta-pill">
            <span className="meta-label">Tisch</span>
            <strong>{reservation.table_name || 'Offen'}</strong>
          </div>
          <div className="meta-pill meta-pill-wide">
            <span className="meta-label">Telefon</span>
            <strong>{reservation.guest_phone || 'Nicht hinterlegt'}</strong>
          </div>
        </div>

        {reservation.notes ? (
          <div className="reservation-note">
            <span className="meta-label">Notiz</span>
            <p>{reservation.notes}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
}
