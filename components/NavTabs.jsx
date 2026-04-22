'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Heute' },
  { href: '/new', label: 'Neu' },
  { href: '/reservations', label: 'Reservierungen' },
  { href: '/tables', label: 'Tische' },
  { href: '/settings', label: 'Einstellungen' }
];

export default function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="tabs" aria-label="Hauptnavigation">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`tab-link ${isActive ? 'tab-link-active' : ''}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
