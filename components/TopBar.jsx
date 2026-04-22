export default function TopBar() {
  return (
    <div className="topbar panel">
      <div className="topbar-left">
        <span className="pill pill-active">Heute</span>
        <span className="pill">Dinner Shift</span>
      </div>
      <div className="topbar-right">
        <a href="/new" className="primary-button">+ Neue Reservierung</a>
      </div>
    </div>
  );
}
