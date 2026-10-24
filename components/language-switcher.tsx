'use client';

import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { Tooltip } from './tooltip';

type Props = {
  variant?: 'minimal' | 'extended';
  className?: string;
};

export function LanguageSwitcher({ variant = 'extended', className }: Props) {
  const [isLabelVisible, setIsLabelVisible] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isExtended = variant === 'extended';

  function toggleLocale() {
    router.replace({ pathname }, { locale: locale === 'en' ? 'ar' : 'en' });
  }

  const handleMouseEnter = () => {
    if (isExtended) return;
    setIsLabelVisible(true);
  };

  const handleMouseLeave = () => {
    if (isExtended) return;
    setIsLabelVisible(false);
  };

  return (
    <Tooltip
      text={locale === 'en' ? 'حول اللغة الي العربية' : 'Switch Language to English'}
      isVisible={isLabelVisible}
      side="bottom"
    >
      <Button
        variant="outline"
        size={isExtended ? 'default' : 'icon'}
        onClick={toggleLocale}
        className={cn(isExtended && 'w-full justify-start gap-3', className)}
        aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Languages className="h-4 w-4 text-primary" />
        {isExtended && (
          <span className="text-sm font-medium">{locale === 'en' ? 'العربية' : 'English'}</span>
        )}
      </Button>
    </Tooltip>
  );
}
