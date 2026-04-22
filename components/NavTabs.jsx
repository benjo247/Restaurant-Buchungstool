const tabs = [
  { href: '/', label: 'Heute' },
  { href: '/new', label: 'Neu' },
  { href: '/reservations', label: 'Reservierungen' },
  { href: '/tables', label: 'Tische' },
  { href: '/settings', label: 'Einstellungen' }
];

export default function NavTabs() {
  return (
    <nav className="tabs">
      {tabs.map((tab) => (
        <a key={tab.href} href={tab.href} className="tab-link">
          {tab.label}
        </a>
      ))}
    </nav>
  );
}
