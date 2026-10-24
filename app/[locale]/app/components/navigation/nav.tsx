'use client';

import { CircleHelp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useMeQuery } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

import { Credits } from './credits';
import { NavHeader } from './nav-header';
import { NavItem } from './nav-item';
import { NavLinks } from './nav-links';
import { Profile } from './profile';
import { ProfileSkeleton } from './skeletons/profile-skeleton';

const MOCK_CREDITS = { credits: 120, total: 200 };

export const Nav = () => {
  const t = useTranslations('Nav');
  const [collapsed, setCollapsed] = useState(false);

  const { data, isLoading } = useMeQuery();
  const { name = 'Guest', image = null } = data?.user ?? {};

  return (
    <aside
      className={cn(
        'mr-5 flex h-dvh shrink-0 flex-col gap-5 border-e border-sidebar-border bg-sidebar p-3 text-sidebar-foreground',
        'transition-[width] duration-200',
        collapsed ? 'w-16 items-center' : 'w-66'
      )}
    >
      <NavHeader collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />

      {isLoading && !collapsed ? (
        <ProfileSkeleton />
      ) : (
        <Profile name={name} imageUrl={image} collapsed={collapsed} />
      )}

      <div className="min-h-0 w-full flex-1 overflow-y-auto">
        <NavLinks collapsed={collapsed} />
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <Credits credits={MOCK_CREDITS.credits} total={MOCK_CREDITS.total} collapsed={collapsed} />

        <div className={cn('flex w-full items-center gap-1', collapsed && 'flex-col')}>
          <div className={cn(!collapsed && 'flex-1')}>
            <NavItem href="/help" icon={CircleHelp} label={t('help')} collapsed={collapsed} />
          </div>
        </div>
      </div>
    </aside>
  );
};
