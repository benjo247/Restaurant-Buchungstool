import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Heute" },
  { href: "/new", label: "Neue Reservierung" },
  { href: "/reservations", label: "Reservierungen" },
  { href: "/tables", label: "Tische" },
  { href: "/settings", label: "Einstellungen" },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Restaurant App</p>
          <h1 className="title">Reservierungsdashboard</h1>
        </div>
      </header>

      <nav className="tabs">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="tab-link">
            {item.label}
          </Link>
        ))}
      </nav>

      <main className="content">{children}</main>
    </div>
  );
}
