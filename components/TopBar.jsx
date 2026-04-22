function todayLabel() {
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date());
}

export default function TopBar() {
  return (
    <div className="topbar panel-dark">
      <div className="topbar-left">
        <div>
          <p className="topbar-kicker">Tagessteuerung</p>
          <h2 className="topbar-title">Heute im Service</h2>
        </div>
        <div className="topbar-date-pill">{todayLabel()}</div>
      </div>

      <div className="topbar-actions">
        <button className="topbar-ghost">Timeline</button>
        <button className="topbar-ghost">Tag</button>
        <a href="/new" className="topbar-primary">+ Neue Reservierung</a>
      </div>
    </div>
  );
}
