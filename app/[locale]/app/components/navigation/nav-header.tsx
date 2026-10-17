import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

type NavHeaderProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export const NavHeader = ({ collapsed, onToggle }: NavHeaderProps) => {
  const t = useTranslations('Nav');
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <div className={cn('flex w-full justify-between', collapsed && 'flex-col')}>
      <Logo collapsed={collapsed} href="/app" />

      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? t('expand') : t('collapse')}
        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <ToggleIcon className="mx-auto size-4.5 rtl:rotate-180" />
      </button>
    </div>
  );
};
