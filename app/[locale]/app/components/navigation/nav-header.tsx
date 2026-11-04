import { PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

type NavHeaderProps = {
  collapsed: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
};

export const NavHeader = ({ collapsed, onToggle, onMobileClose }: NavHeaderProps) => {
  const t = useTranslations('Nav');
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <div className={cn('flex w-full items-center justify-between', collapsed && 'md:flex-col')}>
      <Logo collapsed={collapsed} href="/app" />

      {/* Desktop collapse */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? t('expand') : t('collapse')}
        className="hidden rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:inline-flex"
      >
        <ToggleIcon className="mx-auto size-4.5 rtl:rotate-180" />
      </button>

      {/* Mobile close */}
      <button
        type="button"
        onClick={onMobileClose}
        aria-label={t('collapse')}
        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:hidden"
      >
        <X className="size-5" />
      </button>
    </div>
  );
};
