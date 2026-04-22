import './globals.css';
import AppSidebar from '../components/AppSidebar';
import TopBar from '../components/TopBar';

export const metadata = {
  title: 'Restaurant Buchungstool',
  description: 'Moderne Desktop- und iPad-Oberfläche für Reservierungen'
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <div className="control-shell">
          <AppSidebar />
          <div className="workspace-shell">
            <TopBar />
            <main className="workspace-content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
