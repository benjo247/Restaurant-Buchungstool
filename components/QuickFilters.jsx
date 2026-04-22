export default function QuickFilters() {
  return (
    <div className="quickfilters panel-light">
      <div className="quickfilters-left">
        <span className="filter-chip filter-chip-active">Alle</span>
        <span className="filter-chip">Frühstück</span>
        <span className="filter-chip">Mittag</span>
        <span className="filter-chip">Abend</span>
      </div>
      <div className="quickfilters-right">
        <span className="filter-meta">Status: offen</span>
        <span className="filter-meta">Ansicht: Liste</span>
      </div>
    </div>
  );
}
