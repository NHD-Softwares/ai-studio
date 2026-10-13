import { ArrowRight } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { AppLocales } from '@/globals';
import { Link } from '@/i18n/navigation';

export default async function EmailVerifiedPage({
  params,
}: {
  params: Promise<{ locale: AppLocales }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Auth.emailVerified');

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <Button className="w-full" size="lg">
          <Link href={'/app'}>{t('cta')}</Link>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
