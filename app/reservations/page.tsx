import { getSql } from "@/lib/db";
import ReservationCard from "@/components/ReservationCard";

export const dynamic = "force-dynamic";

export default async function ReservationsPage() {
  let reservations: any[] = [];
  let error = "";

  try {
    const sql = getSql();
    reservations = await sql`
      select
        r.id,
        r.guest_name,
        r.guest_phone,
        r.guest_count,
        r.reservation_date::text,
        r.reservation_time,
        r.status,
        r.notes,
        t.name as table_name
      from reservations r
      left join restaurant_tables t on t.id = r.table_id
      order by r.reservation_date asc, r.reservation_time asc
    `;
  } catch (e: any) {
    error = e?.message ?? "Unbekannter Fehler";
  }

  return (
    <>
      <div className="card">
        <h2>Reservierungen</h2>
      </div>
      {error ? <div className="notice">Datenbankfehler: {error}</div> : null}
      {reservations.length === 0 ? (
        <div className="empty">Noch keine Reservierungen vorhanden.</div>
      ) : (
        <div className="card-list">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </div>
      )}
    </>
  );
}
