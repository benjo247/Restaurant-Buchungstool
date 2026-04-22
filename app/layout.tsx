import "./globals.css";
import type { Metadata } from "next";
import NavTabs from "../components/NavTabs";

export const metadata: Metadata = {
  title: "Restaurant App",
  description: "Reservierungssystem für Restaurants",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div>
              <p className="eyebrow">Restaurant</p>
              <h1>Reservierungssystem</h1>
            </div>
          </header>
          <NavTabs />
          <main className="container">{children}</main>
        </div>
      </body>
    </html>
  );
}
