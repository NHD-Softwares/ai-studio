import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

import { FadeIn } from '@/components/index';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const dynamic = 'force-static';

export default async function SignupPage() {
  const t = await getTranslations('Auth.signup');
  const common = await getTranslations('Auth.common');

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
            <form action="" className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-semibold text-foreground/80">
                  {t('nameLabel')}
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t('namePlaceholder')}
                  required
                  className="h-12 border-border/50 bg-background/40 px-4 text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground/80">
                  {t('emailLabel')}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  required
                  className="h-12 border-border/50 bg-background/40 px-4 text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground/80">
                  {t('passwordLabel')}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t('passwordPlaceholder')}
                  required
                  className="h-12 border-border/50 bg-background/40 px-4 text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <Button
                type="submit"
                className="h-12 w-full bg-[#1A2B33] text-base font-bold text-white transition-all hover:bg-[#1A2B33]/90"
              >
                {t('submit')}
              </Button>
            </form>

            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/40" />
              </div>
              <span className="relative bg-card/0 px-4 text-xs font-medium text-muted-foreground backdrop-blur-none">
                {common('or')}
              </span>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="h-12 w-full border-border/30 bg-background/30 text-sm font-semibold hover:bg-background/50"
              >
                <FaGoogle className="mr-3 h-4 w-4" />
                {common('socialGoogle')}
              </Button>
              <Button
                variant="outline"
                className="h-12 w-full border-border/30 bg-background/30 text-sm font-semibold hover:bg-background/50"
              >
                <FaFacebook className="mr-3 h-4 w-4" />
                {common('socialFacebook')}
              </Button>
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
