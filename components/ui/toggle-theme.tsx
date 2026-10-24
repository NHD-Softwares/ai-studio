'use client';

import { Moon, Sun } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Tooltip } from '../tooltip';

type Props = {
  variant?: 'minimal' | 'extended';
  className?: string;
};

export function ToggleTheme({ variant = 'minimal', className }: Props) {
  const [isLabelVisible, setIsLabelVisible] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isExtended = variant === 'extended';
  const locale = useLocale();

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
      text={
        locale === 'en'
          ? isDark
            ? 'Switch Theme to Light'
            : 'Switch Theme to Dark'
          : isDark
            ? 'تحويل المظهر إلى فاتح'
            : 'تحويل المظهر إلى داكن'
      }
      isVisible={isLabelVisible}
      side="bottom"
    >
      <Button
        variant="outline"
        size={isExtended ? 'default' : 'icon'}
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={cn(isExtended && 'w-full justify-start gap-3', className)}
        aria-label="theme"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="relative flex h-4 w-4 items-center justify-center">
          <Sun className="absolute h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </span>
        {isExtended && (
          <span className="text-sm font-medium">{resolvedTheme === 'dark' ? 'Light' : 'Dark'}</span>
        )}
      </Button>
    </Tooltip>
  );
}
