'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignInMutation } from '@/hooks/useAuth';
import { Link, useRouter } from '@/i18n/navigation';

import { PasswordInput } from '../components/password-input';

const inputClass =
  'h-12 border-border/50 bg-background/40 px-4 text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary';

export function LoginForm() {
  const signIn = useSignInMutation();

  const t = useTranslations('Auth.login');
  const router = useRouter();

  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email'));

    signIn.mutate(
      {
        email,
        password: String(fd.get('password')),
        rememberMe,
      },
      {
        onSuccess: ({ user }) => {
          router.refresh();
          if (!user.emailVerified) {
            router.push(`/verify?email=${user.email}`);
            return;
          }
          router.replace('/app');
        },
      }
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-semibold text-foreground/80">
          {t('emailLabel')}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
          required
          className={inputClass}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-sm font-semibold text-foreground/80">
          {t('passwordLabel')}
        </Label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder={t('passwordPlaceholder')}
          required
          className={inputClass}
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(c) => setRememberMe(c === true)}
          />
          <Label htmlFor="rememberMe" className="text-xs font-medium text-muted-foreground">
            {t('rememberMe')}
          </Label>
        </div>
        <Link
          href={'request-reset-password'}
          className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
        >
          {t('forgotPassword')}
        </Link>
      </div>

      {signIn.isError && (
        <p role="alert" className="text-sm text-destructive">
          {signIn.error.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={signIn.isPending}
        className="h-12 w-full bg-[#1A2B33] text-base font-bold text-white transition-all hover:bg-[#1A2B33]/90"
      >
        {signIn.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin rtl:mr-0 rtl:ml-2" />}
        {signIn.isPending ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
