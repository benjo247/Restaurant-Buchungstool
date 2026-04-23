function addMinutes(startTime, minutes) {
  const date = new Date(startTime);
  return new Date(date.getTime() + minutes * 60000);
}

function getForecastFreeAt(reservation) {
  if (!reservation) return null;
  if (reservation.end_time) return new Date(reservation.end_time);

  const guestCount = Number(reservation.guest_count || 2);
  const plannedDurationMinutes = guestCount <= 2 ? 90 : guestCount <= 4 ? 120 : 150;
  return addMinutes(reservation.start_time, plannedDurationMinutes);
}

export default function MetricTiles({ reservations = [], tables = [] }) {
  const guestTotal = reservations.reduce((sum, item) => sum + Number(item.guest_count || 0), 0);

  const activeReservations = reservations.filter(
    (item) => item.status !== 'finished' && item.status !== 'no_show'
  );

  const occupiedTableIds = new Set(
    activeReservations
      .map((item) => item.table_id)
      .filter(Boolean)
  );

  const totalTables = tables.length || 0;
  const occupiedTables = occupiedTableIds.size;
  const occupancyPercent = totalTables ? Math.round((occupiedTables / totalTables) * 100) : 0;

  const now = new Date();
  const in30Min = new Date(now.getTime() + 30 * 60000);

  const soonFreeCount = activeReservations.filter((item) => {
    const freeAt = getForecastFreeAt(item);
    return freeAt && freeAt <= in30Min;
  }).length;

  const tiles = [
    {
      label: 'Gesamtauslastung',
      value: `${occupancyPercent}%`,
      subtext: `${occupiedTables} von ${totalTables} Tischen belegt`
    },
    {
      label: 'Reservierungen',
      value: reservations.length || 0,
      subtext: 'heute geladen'
    },
    {
      label: 'Gäste heute',
      value: guestTotal || 0,
      subtext: 'erwartete Covers'
    },
    {
      label: 'Bald frei',
      value: soonFreeCount,
      subtext: 'voraussichtlich in 30 Min'
    }
  ];

  return (
    <div className="metric-grid">
      {tiles.map((tile) => (
        <div key={tile.label} className="metric-tile panel-light">
          <span className="metric-label">{tile.label}</span>
          <strong>{tile.value}</strong>
          <span className="metric-subtext">{tile.subtext}</span>
        </div>
      ))}
    </div>
  );
}
