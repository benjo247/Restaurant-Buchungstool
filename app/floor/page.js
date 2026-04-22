import { sql } from '../../lib/db';
import TopBar from '../../components/TopBar';
import MetricTiles from '../../components/MetricTiles';
import FloorPlan from '../../components/FloorPlan';
import RightRail from '../../components/RightRail';
import BottomDock from '../../components/BottomDock';
import ReservationList from '../../components/ReservationList';

export const dynamic = 'force-dynamic';

async function getReservations() {
  return sql`
    SELECT r.id, r.guest_name, r.guest_count, r.start_time, r.status, t.name as table_name
    FROM reservations r
    LEFT JOIN restaurant_tables t ON r.table_id = t.id
    ORDER BY r.start_time ASC
    LIMIT 20
  `;
}

export default async function FloorPage() {
  const reservations = await getReservations();

  return (
    <section className="floor-page">
      <TopBar />
      <MetricTiles reservations={reservations} />
      <div className="floor-layout">
        <div className="floor-main">
          <FloorPlan />
          <ReservationList reservations={reservations} />
        </div>
        <RightRail reservations={reservations} />
      </div>
      <BottomDock />
    </section>
  );
}
