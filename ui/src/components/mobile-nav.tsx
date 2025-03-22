import * as React from 'react';
import { Home, Search, Library, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

const navItems: NavItem[] = [
  {
    icon: Home,
    label: 'Home',
    href: '/'
  },
  {
    icon: Search,
    label: 'Search',
    href: '/search'
  },
  {
    icon: Library,
    label: 'Library',
    href: '/library'
  },
  {
    icon: Plus,
    label: 'Create',
    href: '/create'
  }
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-around px-4">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1',
              'text-muted-foreground transition-colors hover:text-primary',
              item.isActive && 'text-primary'
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
