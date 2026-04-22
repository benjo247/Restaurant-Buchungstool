export default function TopBar() {
  return (
    <div className="topbar panel-light">
      <div className="topbar-left">
        <div className="chip strong-chip">Heute</div>
        <div className="chip">Dinner Shift</div>
        <div className="chip">Innenbereich</div>
      </div>
      <div className="topbar-right">
        <a href="/new" className="primary-button">+ Neue Reservierung</a>
      </div>
    </div>
  );
}
