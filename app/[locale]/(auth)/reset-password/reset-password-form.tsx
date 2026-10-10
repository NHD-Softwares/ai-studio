'use client';

import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';

import { PasswordInput } from '../components/password-input';

export function ResetPasswordForm() {
  const { resetPassword } = useAuth();

  const t = useTranslations('Auth.resetPassword');
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const hasInvalidLink = !token || searchParams.get('error') !== null;

  useEffect(() => {
    if (!resetPassword.isSuccess) return;
    const id = setTimeout(() => router.replace('/login'), 1500);
    return () => clearTimeout(id);
  }, [resetPassword.isSuccess, router]);

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    const fd = new FormData(e.currentTarget);
    resetPassword.mutate({ newPassword: String(fd.get('password')), token });
  };

  const isPending = resetPassword.isPending;
  const isSuccess = resetPassword.isSuccess;

  if (hasInvalidLink) {
    return (
      <>
        <div className="mb-6 space-y-2 text-center md:text-start">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t('invalidLinkTitle')}
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {t('invalidLinkMessage')}
          </p>
        </div>
        <CardContent className="p-0">
          <Button
            asChild
            className="h-12 w-full bg-[#1A2B33] text-base font-bold text-white transition-all hover:bg-[#1A2B33]/90"
          >
            <Link href="request-reset-password">{t('requestNewLink')}</Link>
          </Button>
        </CardContent>
      </>
    );
  }

  return (
    <>
      <div className="mb-6 space-y-2 text-center md:text-start">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t('title')}
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{t('subtitle')}</p>
      </div>

      <CardContent className="p-0">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-semibold text-foreground/80">
              {t('passwordLabel')}
            </Label>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="new-password"
              minLength={8}
              placeholder={t('passwordPlaceholder')}
              required
              disabled={isPending || isSuccess}
              className="h-12 border-border/50 bg-background/40 px-4 text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">{t('redirectNote')}</p>
          </div>

          <div aria-live="polite" className="min-h-5 text-sm">
            {resetPassword.isError && (
              <p role="alert" className="text-destructive">
                {resetPassword.error?.message}
              </p>
            )}
            {isSuccess && <p className="text-emerald-600 dark:text-emerald-400">{t('success')}</p>}
          </div>

          <Button
            type="submit"
            disabled={isPending || isSuccess}
            className="h-12 w-full bg-[#1A2B33] text-base font-bold text-white transition-all hover:bg-[#1A2B33]/90"
          >
            {(isPending || isSuccess) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin rtl:mr-0 rtl:ml-2" />
            )}
            {isSuccess ? t('redirecting') : isPending ? t('submitting') : t('submit')}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {t('rememberPassword')}{' '}
          <Link
            href="login"
            className="font-bold text-primary transition-colors hover:text-primary/80"
          >
            {t('loginLink')}
          </Link>
        </div>
      </CardContent>
    </>
  );
}
