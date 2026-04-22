import './globals.css';
import Sidebar from '../components/Sidebar';
import HeaderBrand from '../components/HeaderBrand';

export const metadata = {
  title: 'Restaurant Buchungstool',
  description: 'Floor Control für Restaurants'
};

function getDateLabel() {
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
        <div className="app-layout">
          <Sidebar />
          <div className="main-shell">
            <header className="shell-header">
              <HeaderBrand />
              <div className="header-meta">
                <div className="date-pill">{getDateLabel()}</div>
                <div className="date-pill accent">Live Service</div>
              </div>
            </header>
            <main className="page-content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
