import type { LucideIcon } from 'lucide-react';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type NavItemProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
  variant?: 'default' | 'dashed';
};

export const NavItem = ({
  href,
  icon: Icon,
  label,
  collapsed,
  variant = 'default',
}: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        collapsed && 'justify-center px-2',
        variant === 'dashed' && 'border border-dashed border-sidebar-border',
        isActive && 'bg-primary/15 text-sidebar-foreground'
      )}
    >
      <Icon className={cn('size-4.5 shrink-0', isActive && 'text-primary')} />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
};
