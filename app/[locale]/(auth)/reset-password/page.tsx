import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { FadeIn } from '@/components/index';
import { Card } from '@/components/ui/card';
import { AppLocales } from '@/globals';

import { ResetPasswordForm } from './reset-password-form';

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ locale: AppLocales }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4">
      <FadeIn direction="up" className="z-10 w-full max-w-xl">
        <Card className="border-none bg-card/70 px-8 py-8 shadow-2xl backdrop-blur-2xl">
          <Suspense fallback={null}>
            <ResetPasswordForm />
          </Suspense>
        </Card>
      </FadeIn>
    </div>
  );
}
