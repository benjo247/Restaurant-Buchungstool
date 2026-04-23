export default function MetricTiles({ reservations = [], tables = [] }) {
  const guestTotal = reservations.reduce((sum, item) => sum + Number(item.guest_count || 0), 0);
  const occupiedTables = new Set(
    reservations
      .filter((item) => item.table_id && item.status !== 'finished' && item.status !== 'no_show')
      .map((item) => item.table_id)
  ).size;

  const totalTables = tables.length || 0;
  const occupancy = totalTables ? Math.round((occupiedTables / totalTables) * 100) : 0;

  const tiles = [
    { label: 'Gesamtauslastung', value: `${occupancy}%`, helper: `${occupiedTables} von ${totalTables}` , sub: 'Tische aktuell belegt'},
    { label: 'Reservierungen', value: reservations.length, helper: 'heute', sub: 'geladen und einsatzbereit' },
    { label: 'Gäste heute', value: guestTotal, helper: 'Covers', sub: 'erwartete Personen' },
    { label: 'Bald frei', value: reservations.filter((item) => item.end_time).length, helper: 'Forecast', sub: 'berechnete Freigaben aktiv' }
  ];

  return (
    <div className="metric-grid">
      {tiles.map((tile) => (
        <div key={tile.label} className="metric-tile metric-tile-polished panel">
          <span className="metric-label">{tile.label}</span>
          <div className="metric-value-row">
            <strong>{tile.value}</strong>
            <span className="metric-helper">{tile.helper}</span>
          </div>
          <span className="metric-subline">{tile.sub}</span>
        </div>
      ))}
    </div>
  );
}
