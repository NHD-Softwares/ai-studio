'use client';

import { ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useMeQuery, useResendVerificationMutation } from '@/hooks/useAuth';
import { Link, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const RESEND_COOLDOWN = 60;

interface CheckEmailCardProps {
  initialEmail?: string;
  className?: string;
}

export function CheckEmailCard({ initialEmail, className }: CheckEmailCardProps) {
  const { refetch: refetchUser } = useMeQuery();
  const resendVerification = useResendVerificationMutation();

  const t = useTranslations('Auth.checkEmail');
  const router = useRouter();

  const email = initialEmail;

  const [countdown, setCountdown] = useState(email ? RESEND_COOLDOWN : 0);
  const [isChecking, setIsChecking] = useState(false);
  const [notVerified, setNotVerified] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  const handleResend = () => {
    if (!email || countdown > 0 || resendVerification.isPending) return;
    setNotVerified(false);
    resendVerification.mutate({ email }, { onSuccess: () => setCountdown(RESEND_COOLDOWN) });
  };

  const handleCheckAgain = async () => {
    if (isChecking) return;
    setIsChecking(true);
    setNotVerified(false);

    const { data } = await refetchUser();
    if (data?.user.emailVerified) {
      router.replace('/app');
      return;
    }
    setNotVerified(true);
    setIsChecking(false);
  };

  return (
    <Card
      className={cn('border-none bg-card/70 px-8 py-8 shadow-2xl backdrop-blur-2xl', className)}
    >
      <Link
        href={'/login'}
        className="group mb-6 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-0.5 rtl:mr-0 rtl:ml-1.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />
        {t('backToLogin')}
      </Link>

      <div className="mb-8 space-y-2 text-center md:text-start">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t('title')}
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{t('subtitle')}</p>
      </div>

      <CardContent className="space-y-6 p-0">
        {email ? (
          <>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t('sentTo')}</p>
              <p className="text-base font-semibold break-all text-foreground">{email}</p>
              <p className="text-xs text-muted-foreground">
                {t('wrongEmail')}{' '}
                <Link
                  href={'/signup'}
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {t('signUpAgain')}
                </Link>
              </p>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">{t('instructions')}</p>

            <div aria-live="polite" className="min-h-5 text-sm">
              {notVerified && <p className="text-muted-foreground">{t('notVerifiedYet')}</p>}
              {resendVerification.isError && (
                <p role="alert" className="text-destructive">
                  {resendVerification.error?.message}
                </p>
              )}
              {resendVerification.isSuccess && !notVerified && !resendVerification.isError && (
                <p className="text-emerald-600 dark:text-emerald-400">{t('resent')}</p>
              )}
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                onClick={handleCheckAgain}
                disabled={isChecking}
                className="h-12 w-full bg-[#1A2B33] text-base font-bold text-white transition-all hover:bg-[#1A2B33]/90"
              >
                {isChecking && <Loader2 className="mr-2 h-4 w-4 animate-spin rtl:mr-0 rtl:ml-2" />}
                {t('checkAgain')}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={handleResend}
                disabled={countdown > 0 || resendVerification.isPending}
                className="h-10 w-full text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                {resendVerification.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin rtl:mr-0 rtl:ml-2" />
                )}
                {countdown > 0 ? t('resendIn', { seconds: countdown }) : t('resend')}
              </Button>
            </div>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('noEmail')}
            <Link
              href={'/signup'}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {t('signUpAgain')}
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
