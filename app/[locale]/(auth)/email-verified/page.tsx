'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export default function EmailVerifiedPage() {
  const t = useTranslations('Auth.emailVerified');
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>
        <Button onClick={() => router.push('/app')} className="w-full" size="lg">
          {t('cta')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
