import StatusBadge from "./StatusBadge";

type Reservation = {
  id: string;
  guest_name: string;
  guest_phone: string | null;
  guest_count: number;
  reservation_date: string;
  reservation_time: string;
  status: string;
  table_name?: string | null;
  notes?: string | null;
};

export default function ReservationCard({ reservation }: { reservation: Reservation }) {
  return (
    <div className="card">
      <div className="row">
        <div>
          <div className="muted">{reservation.reservation_date}</div>
          <h3>{reservation.reservation_time} · {reservation.guest_name}</h3>
        </div>
        <StatusBadge status={reservation.status} />
      </div>

      <div style={{ height: 10 }} />

      <p>{reservation.guest_count} Personen{reservation.table_name ? ` · ${reservation.table_name}` : ""}</p>
      {reservation.guest_phone ? <p className="muted">{reservation.guest_phone}</p> : null}
      {reservation.notes ? <p className="muted">{reservation.notes}</p> : null}
    </div>
  );
}
