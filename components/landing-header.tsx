import { LanguageSwitcher } from './language-switcher';
import { Logo } from './logo';
import { ToggleTheme } from './ui/toggle-theme';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-4xl items-center justify-between rounded-full border border-border/80 bg-background/60 px-6 py-3 shadow-sm backdrop-blur-md">
        <Logo collapsed={false} href="/" />

        <div className="flex items-center gap-2">
          <LanguageSwitcher variant="minimal" />
          <div className="h-4.5 w-px bg-border" />
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
}
