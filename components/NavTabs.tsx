import Link from "next/link";

const tabs = [
  { href: "/", label: "Heute" },
  { href: "/new", label: "Neue Reservierung" },
  { href: "/reservations", label: "Reservierungen" },
  { href: "/tables", label: "Tische" },
  { href: "/settings", label: "Einstellungen" },
];

export default function NavTabs() {
  return (
    <nav className="nav-tabs">
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href} className="nav-tab">
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
