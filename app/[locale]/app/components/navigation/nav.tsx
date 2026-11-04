'use client';

import { CircleHelp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useMeQuery } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

import { Credits } from './credits';
import { NavHeader } from './nav-header';
import { NavItem } from './nav-item';
import { NavLinks } from './nav-links';
import { Profile } from './profile';
import { ProfileSkeleton } from './skeletons/profile-skeleton';

const MOCK_CREDITS = { credits: 0, total: 200 };

type NavProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
};

export const Nav = ({ mobileOpen, onMobileClose }: NavProps) => {
  const t = useTranslations('Nav');
  const [collapsed, setCollapsed] = useState(false);

  const { data, isLoading } = useMeQuery();
  const { name = 'Guest', image = null } = data?.user ?? {};

  // The compact desktop state should not carry over to mobile.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleBreakpointChange = () => {
      if (mediaQuery.matches) {
        setCollapsed(false);
      }
    };

    handleBreakpointChange();

    mediaQuery.addEventListener('change', handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener('change', handleBreakpointChange);
    };
  }, []);

  return (
    <aside
      id="app-sidebar"
      role={mobileOpen ? 'dialog' : 'complementary'}
      aria-label={t('label')}
      aria-modal={mobileOpen || undefined}
      className={cn(
        'fixed inset-y-0 start-0 z-50 flex h-dvh w-[17rem] max-w-[85vw] shrink-0 flex-col gap-5 border-e border-sidebar-border bg-sidebar p-3 text-sidebar-foreground',
        'transition-transform duration-300 ease-in-out',
        mobileOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full',
        'md:sticky md:top-0 md:h-screen md:max-w-none md:translate-x-0 md:transition-[width] md:duration-200',
        collapsed ? 'md:w-16 md:items-center' : 'md:w-66'
      )}
    >
      <NavHeader
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
        onMobileClose={onMobileClose}
      />

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
