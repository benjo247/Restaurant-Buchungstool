import StatusBadge from "./StatusBadge";

type Reservation = {
  id: string;
  guest_name: string;
  guest_phone: string | null;
  guest_count: number;
  start_time: string;
  notes: string | null;
  table_name: string | null;
  status: string;
};

function formatTime(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function ReservationCard({ reservation }: { reservation: Reservation }) {
  return (
    <article className="reservation-card">
      <div className="reservation-time">{formatTime(reservation.start_time)}</div>
      <div className="reservation-main">
        <div className="reservation-topline">
          <h3>{reservation.guest_name}</h3>
          <StatusBadge status={reservation.status} />
        </div>
        <p>
          {reservation.guest_count} Personen
          {reservation.table_name ? ` · ${reservation.table_name}` : ""}
        </p>
        {reservation.guest_phone ? <p>{reservation.guest_phone}</p> : null}
        {reservation.notes ? <p>{reservation.notes}</p> : null}
      </div>
    </article>
  );
}
