'use client';

import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    router.replace(
      { pathname },
      {
        locale: locale === 'en' ? 'ar' : 'en',
      }
    );
  }

  return (
    <Button
      variant="outline"
      onClick={toggleLocale}
      className={cn(
        'gap-2 rounded-full px-4 transition-all duration-300',
        'border-border bg-card text-card-foreground shadow-sm',
        'hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-md',
        'focus-visible:ring-ring'
      )}
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Languages className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium">{locale === 'en' ? 'العربية' : 'English'}</span>
    </Button>
  );
}
