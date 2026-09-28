// components/Header.tsx
'use client';

import { Link } from '@/i18n/navigation';

import { LanguageSwitcher } from './language-switcher';
import { ToggleTheme } from './ui/toggle-theme';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-4xl items-center justify-between rounded-full border border-border/80 bg-background/60 px-6 py-3 shadow-sm backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            Ai <span className="text-primary">Studio</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <div className="h-[18px] w-px bg-border" />
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
}
