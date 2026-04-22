const tables = [
  { id: 't1', name: 'T01', seats: 2, x: '10%', y: '14%', status: 'free' },
  { id: 't2', name: 'T02', seats: 4, x: '34%', y: '18%', status: 'occupied' },
  { id: 't3', name: 'T03', seats: 4, x: '58%', y: '16%', status: 'bill' },
  { id: 't4', name: 'T04', seats: 6, x: '18%', y: '52%', status: 'reserved' },
  { id: 't5', name: 'T05', seats: 2, x: '47%', y: '56%', status: 'dirty' },
  { id: 't6', name: 'T06', seats: 4, x: '73%', y: '52%', status: 'occupied' }
];

export default function FloorPlan() {
  return (
    <div className="floor-canvas panel-light">
      <div className="floor-zone floor-zone-a">Main Dining</div>
      <div className="floor-zone floor-zone-b">Window</div>
      <div className="floor-zone floor-zone-c">Terrace Flow</div>

      {tables.map((table) => (
        <button key={table.id} className={`table-node status-${table.status}`} style={{ left: table.x, top: table.y }}>
          <span className="table-name">{table.name}</span>
          <span className="table-seats">{table.seats} Plätze</span>
        </button>
      ))}
    </div>
  );
}
