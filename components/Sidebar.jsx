'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/floor', label: 'Floor' },
  { href: '/reservations', label: 'Reservierungen' },
  { href: '/new', label: 'Neu' },
  { href: '/tables', label: 'Tische' },
  { href: '/settings', label: 'Einstellungen' }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-mark">R</div>
        <div>
          <div className="sidebar-kicker">Restaurant OS</div>
          <h2>Control Center</h2>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => {
          const active = pathname === item.href || (item.href === '/floor' && pathname === '/');
          return (
            <Link key={item.href} href={item.href} className={`sidebar-link ${active ? 'sidebar-link-active' : ''}`}>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
