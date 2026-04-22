import { sql } from "../../../lib/db";
import { createId } from "../../../lib/id";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = getSql();
    const rows = await sql`
      select
        r.id,
        r.guest_name,
        r.guest_phone,
        r.guest_count,
        r.reservation_date::text,
        r.reservation_time,
        r.duration_minutes,
        r.status,
        r.notes,
        r.source,
        r.created_at,
        r.updated_at,
        t.name as table_name
      from reservations r
      left join restaurant_tables t on t.id = r.table_id
      order by r.reservation_date asc, r.reservation_time asc
    `;
    return Response.json(rows);
  } catch (e: any) {
    return Response.json({ error: e?.message ?? "GET fehlgeschlagen" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.guestName || !body.guestCount || !body.reservationDate || !body.reservationTime) {
      return Response.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
    }

    const sql = getSql();
    const id = makeId("res");

    const rows = await sql`
      insert into reservations (
        id,
        guest_name,
        guest_phone,
        guest_count,
        reservation_date,
        reservation_time,
        duration_minutes,
        status,
        notes,
        source,
        updated_at
      ) values (
        ${id},
        ${body.guestName},
        ${body.guestPhone || null},
        ${Number(body.guestCount)},
        ${body.reservationDate},
        ${body.reservationTime},
        ${Number(body.durationMinutes || 120)},
        'booked',
        ${body.notes || null},
        'web',
        now()
      )
      returning id, guest_name, guest_count, reservation_date::text, reservation_time, status
    `;

    return Response.json(rows[0], { status: 201 });
  } catch (e: any) {
    return Response.json({ error: e?.message ?? "POST fehlgeschlagen" }, { status: 500 });
  }
}
