export default function TopBar() {
  return (
    <div className="topbar topbar-polished panel">
      <div className="topbar-left">
        <div className="topbar-context">
          <span className="topbar-title">Tagessteuerung</span>
          <span className="topbar-subtitle">Heute im Service</span>
        </div>
        <span className="pill pill-active">Heute</span>
        <span className="pill">Dinner Shift</span>
        <span className="pill">Innenbereich</span>
      </div>

      <div className="topbar-right">
        <a href="/new" className="primary-button">+ Neue Reservierung</a>
      </div>
    </div>
  );
}
