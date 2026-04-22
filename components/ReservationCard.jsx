import StatusBadge from './StatusBadge';

function formatTime(value) {
  return new Date(value).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function ReservationCard({ reservation }) {
  const start = formatTime(reservation.start_time);

  return (
    <article className="reservation-row">
      <div className="row-time">{start}</div>
      <div className="row-main">
        <div className="row-name-block">
          <h4>{reservation.guest_name}</h4>
          <p>{reservation.notes || 'Keine interne Notiz'}</p>
        </div>
        <div className="row-meta-block">
          <span>{reservation.guest_count} Pers.</span>
          <span>{reservation.table_name || 'Tisch offen'}</span>
          <span>{reservation.guest_phone || 'Kein Telefon'}</span>
        </div>
      </div>
      <div className="row-status"><StatusBadge status={reservation.status} /></div>
    </article>
  );
}
