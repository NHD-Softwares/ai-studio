import { LayoutDashboard, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { NavItem } from './nav-item';
import { Projects } from './projects';

export const NavLinks = ({ collapsed }: { collapsed: boolean }) => {
  const t = useTranslations('Nav');

  return (
    <nav aria-label={t('label')} className="flex w-full flex-col gap-1">
      <NavItem
        href="/dashboard"
        icon={LayoutDashboard}
        label={t('dashboard')}
        collapsed={collapsed}
      />

      <Projects collapsed={collapsed} />

      <div className="mt-2">
        <NavItem
          href="/projects/new"
          icon={Plus}
          label={t('createProject')}
          collapsed={collapsed}
          variant="dashed"
        />
      </div>
    </nav>
  );
};
