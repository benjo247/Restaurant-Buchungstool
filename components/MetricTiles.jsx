export default function MetricTiles({ reservations = [] }) {
  const guestTotal = reservations.reduce((sum, item) => sum + Number(item.guest_count || 0), 0);
  const tiles = [
    { label: 'Reservierungen', value: reservations.length || 0 },
    { label: 'Gäste heute', value: guestTotal || 0 },
    { label: 'Wartezeit', value: '12m' },
    { label: 'Auslastung', value: '78%' }
  ];

  return (
    <div className="metric-grid">
      {tiles.map((tile) => (
        <div key={tile.label} className="metric-tile panel-light">
          <span className="metric-label">{tile.label}</span>
          <strong>{tile.value}</strong>
        </div>
      ))}
    </div>
  );
}
