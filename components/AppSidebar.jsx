'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeaderBrand from './HeaderBrand';

const mainItems = [
  { href: '/', label: 'Reservierungen' },
  { href: '/new', label: 'Neue Reservierung' },
  { href: '/reservations', label: 'Alle Buchungen' },
  { href: '/tables', label: 'Tische' }
];

const secondaryItems = [
  { href: '/settings', label: 'Einstellungen' }
];

function SidebarLink({ href, label, pathname }) {
  const active = pathname === href;
  return (
    <Link href={href} className={`sidebar-link ${active ? 'sidebar-link-active' : ''}`}>
      <span className="sidebar-link-dot" />
      {label}
    </Link>
  );
}

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar-shell">
      <HeaderBrand />

      <div className="sidebar-section">
        <p className="sidebar-section-label">Betrieb</p>
        <div className="sidebar-nav">
          {mainItems.map((item) => (
            <SidebarLink key={item.href} {...item} pathname={pathname} />
          ))}
        </div>
      </div>

      <div className="sidebar-divider" />

      <div className="sidebar-section sidebar-section-bottom">
        <p className="sidebar-section-label">System</p>
        <div className="sidebar-nav">
          {secondaryItems.map((item) => (
            <SidebarLink key={item.href} {...item} pathname={pathname} />
          ))}
        </div>
      </div>
    </aside>
  );
}
