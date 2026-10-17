'use client';

import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Props = {
  variant?: 'minimal' | 'extended';
  className?: string;
};

export function LanguageSwitcher({ variant = 'extended', className }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isExtended = variant === 'extended';

  function toggleLocale() {
    router.replace({ pathname }, { locale: locale === 'en' ? 'ar' : 'en' });
  }

  return (
    <Button
      variant="outline"
      size={isExtended ? 'default' : 'icon'}
      onClick={toggleLocale}
      className={cn(isExtended && 'w-full justify-start gap-3', className)}
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Languages className="h-4 w-4 text-primary" />
      {isExtended && (
        <span className="text-sm font-medium">{locale === 'en' ? 'العربية' : 'English'}</span>
      )}
    </Button>
  );
}
