'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  variant?: 'minimal' | 'extended';
  className?: string;
};

export function ToggleTheme({ variant = 'minimal', className }: Props) {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isExtended = variant === 'extended';

  return (
    <Button
      variant="outline"
      size={isExtended ? 'default' : 'icon'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(isExtended && 'w-full justify-start gap-3', className)}
      aria-label="theme"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <Sun className="absolute h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      </span>
      {isExtended && (
        <span className="text-sm font-medium">{resolvedTheme === 'dark' ? 'Light' : 'Dark'}</span>
      )}
    </Button>
  );
}
