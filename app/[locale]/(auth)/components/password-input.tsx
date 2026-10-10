'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { forwardRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, 'type'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const t = useTranslations('Auth.common');
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={cn('pe-12', className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? t('hidePassword') : t('showPassword')}
          aria-pressed={visible}
          className="absolute inset-y-0 end-0 flex w-12 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
