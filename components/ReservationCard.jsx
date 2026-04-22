import StatusBadge from './StatusBadge';

export default function ReservationCard({ reservation }) {
  const start = new Date(reservation.start_time);
  const time = start.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

  return (
    <article className="reservation-card">
      <div className="reservation-top">
        <div>
          <p className="reservation-time">{time}</p>
          <h3>{reservation.guest_name}</h3>
        </div>
        <StatusBadge status={reservation.status} />
      </div>
      <p>{reservation.guest_count} Personen · {reservation.table_name || 'Noch kein Tisch'}</p>
      {reservation.guest_phone ? <p>{reservation.guest_phone}</p> : null}
      {reservation.notes ? <p>{reservation.notes}</p> : null}
    </article>
  );
}
