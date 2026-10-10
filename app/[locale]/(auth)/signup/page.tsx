import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/index';
import { Card, CardContent } from '@/components/ui/card';

import { SignupForm } from './signup-form';

export default function SignupPage() {
  const t = useTranslations('Auth.signup');
  const common = useTranslations('Auth.common');

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4">
      <FadeIn direction="up" className="z-10 w-full max-w-xl">
        <Card className="border-none bg-card/70 px-8 py-8 shadow-2xl backdrop-blur-2xl">
          <div className="mb-6 space-y-2 text-center md:text-start">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t('title')}
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>

          <CardContent className="p-0">
            <SignupForm />

            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/40" />
              </div>
              <span className="relative bg-card/0 px-4 text-xs font-medium text-muted-foreground backdrop-blur-none">
                {common('or')}
              </span>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {t('haveAccount')}{' '}
              <Link
                href="login"
                className="font-bold text-primary transition-colors hover:text-primary/80"
              >
                {t('loginLink')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
