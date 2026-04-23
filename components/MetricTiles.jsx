export default function MetricTiles({ reservations = [] }) {
  const guestTotal = reservations.reduce((sum, item) => sum + Number(item.guest_count || 0), 0);
  const openTables = reservations.filter((item) => !item.table_id).length;
  const tiles = [
    { label: 'Reservierungen', value: reservations.length },
    { label: 'Gäste heute', value: guestTotal },
    { label: 'Offen', value: openTables },
    { label: 'Wartezeit', value: '12m' }
  ];

  return (
    <div className="metric-grid">
      {tiles.map((tile) => (
        <div key={tile.label} className="metric-tile panel">
          <span className="metric-label">{tile.label}</span>
          <strong>{tile.value}</strong>
        </div>
      ))}
    </div>
  );
}
