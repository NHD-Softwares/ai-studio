'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Logo } from '@/components/logo';
import { usePathname } from '@/i18n/navigation';

import { Nav } from './navigation/nav';

type AppShellProps = {
  children: React.ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  const t = useTranslations('Nav');
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the drawer after navigating.
  const [previousPathname, setPreviousPathname] = useState(pathname);

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setMobileOpen(false);
  }

  // Lock background scrolling and support Escape.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-dvh w-full">
      <Nav mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label={t('collapse')}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-black/40 md:hidden"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile toolbar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 md:hidden">
          <Logo collapsed={false} href="/app" />

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={t('expand')}
            aria-expanded={mobileOpen}
            aria-controls="app-sidebar"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Menu className="size-5" />
          </button>
        </header>

        <main className="my-4 min-w-0 flex-1 px-4 md:my-5 md:ms-5 md:px-0">{children}</main>
      </div>
    </div>
  );
};
