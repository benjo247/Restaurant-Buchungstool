import './globals.css';
import NavTabs from '../components/NavTabs';

export const metadata = {
  title: 'Restaurant Buchungstool',
  description: 'Moderne Desktop- und iPad-Oberfläche für Reservierungen'
};

function getTodayLabel() {
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  }).format(new Date());
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <div className="background-orb background-orb-a" />
        <div className="background-orb background-orb-b" />
        <div className="background-grid" />

        <div className="app-shell">
          <header className="app-header panel">
            <div className="brand-block">
              <div className="brand-mark">R</div>
              <div>
                <p className="eyebrow">Single Restaurant Suite</p>
                <h1>Reservierungsdashboard</h1>
                <p className="header-subtitle">
                  Behalte Ankünfte, Tische und Gästedaten auf iPad und Desktop im Blick.
                </p>
              </div>
            </div>

            <div className="header-side">
              <div className="status-chip">
                <span className="status-dot" />
                Live Betrieb
              </div>
              <div className="date-chip">{getTodayLabel()}</div>
            </div>
          </header>

          <NavTabs />
          <main className="container">{children}</main>
        </div>
      </body>
    </html>
  );
}
