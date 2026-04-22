import "./globals.css";
import NavTabs from "../components/NavTabs";

export const metadata = {
  title: "Restaurant App",
  description: "Reservierungssystem für iPad und Web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div>
              <div className="eyebrow">Restaurant App</div>
              <h1>Reservierungsdashboard</h1>
            </div>
          </header>
          <NavTabs />
          <main className="page-wrap">{children}</main>
        </div>
      </body>
    </html>
  );
}
