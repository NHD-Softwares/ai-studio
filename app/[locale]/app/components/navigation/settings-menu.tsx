'use client';

import { Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToggleTheme } from '@/components/ui/toggle-theme';

export function SettingsMenu() {
  const t = useTranslations('Nav.settings');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('title')}>
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="top" align="end" className="w-48 space-y-2 p-2">
        <LanguageSwitcher variant="extended" />
        <ToggleTheme variant="extended" />
      </PopoverContent>
    </Popover>
  );
}
