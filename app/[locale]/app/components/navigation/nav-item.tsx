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
        'flex items-center rounded-xl py-2 text-sm text-muted-foreground',
        'transition-[color,background-color,gap,padding] duration-200',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        collapsed ? 'justify-center gap-0 px-2' : 'gap-3 px-3',
        variant === 'dashed' && 'border border-dashed border-sidebar-border',
        isActive && 'bg-primary/15 text-sidebar-foreground'
      )}
    >
      <Icon className={cn('size-4.5 shrink-0', isActive && 'text-primary')} />

      <span
        aria-hidden={collapsed}
        className={cn(
          'min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ease-in-out',
          collapsed ? 'max-w-0 opacity-0' : 'max-w-48 opacity-100'
        )}
      >
        {label}
      </span>
    </Link>
  );
};
