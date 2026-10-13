'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRequestPasswordResetMutation } from '@/hooks/useAuth';
import { Link } from '@/i18n/navigation';

const RESEND_COOLDOWN = 60;

export function RequestResetForm() {
  const requestPasswordReset = useRequestPasswordResetMutation();

  const t = useTranslations('Auth.requestResetPassword');

  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'form' | 'sent'>('form');
  const [countdown, setCountdown] = useState(0);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestPasswordReset.mutate(
      { email },
      {
        onSuccess: () => {
          setStep('sent');
          setCountdown(RESEND_COOLDOWN);
        },
      }
    );
  };

  const handleResend = () => {
    if (countdown > 0 || requestPasswordReset.isPending) return;
    setResent(false);
    requestPasswordReset.mutate(
      { email },
      {
        onSuccess: () => {
          setResent(true);
          setCountdown(RESEND_COOLDOWN);
        },
      }
    );
  };

  const handleChangeEmail = () => {
    requestPasswordReset.reset();
    setResent(false);
    setCountdown(0);
    setStep('form');
  };

  const isPending = requestPasswordReset.isPending;

  return (
    <>
      <div className="mb-6 space-y-2 text-center md:text-start">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {step === 'form' ? t('title') : t('sentTitle')}
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {step === 'form' ? t('subtitle') : t('sentSubtitle')}
        </p>
      </div>

      <CardContent className="p-0">
        {step === 'form' ? (
          <form onSubmit={onSubmit} className="space-y-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-border/50 bg-background/40 px-4 text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {requestPasswordReset.isError && (
              <p role="alert" className="text-sm text-destructive">
                {requestPasswordReset.error?.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="h-12 w-full bg-[#1A2B33] text-base font-bold text-white transition-all hover:bg-[#1A2B33]/90"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin rtl:mr-0 rtl:ml-2" />}
              {isPending ? t('submitting') : t('submit')}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t('sentTo')}</p>
              <p className="text-base font-semibold break-all text-foreground">{email}</p>
              <button
                type="button"
                onClick={handleChangeEmail}
                className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                {t('changeEmail')}
              </button>
            </div>

            <div aria-live="polite" className="min-h-5 text-sm">
              {requestPasswordReset.isError && (
                <p role="alert" className="text-destructive">
                  {requestPasswordReset.error?.message}
                </p>
              )}
              {resent && !requestPasswordReset.isError && (
                <p className="text-emerald-600 dark:text-emerald-400">{t('resent')}</p>
              )}
            </div>

            <Button
              type="button"
              onClick={handleResend}
              disabled={countdown > 0 || isPending}
              className="h-12 w-full bg-[#1A2B33] text-base font-bold text-white transition-all hover:bg-[#1A2B33]/90"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin rtl:mr-0 rtl:ml-2" />}
              {countdown > 0 ? t('resendIn', { seconds: countdown }) : t('resend')}
            </Button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href={'/login'}
            className="text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
          >
            {t('backToLogin')}
          </Link>
        </div>
      </CardContent>
    </>
  );
}
