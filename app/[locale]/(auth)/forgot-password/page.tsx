import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { handleForgotPassword } from '@/actions/auth';
import { FadeIn } from '@/components/index';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const dynamic = 'force-static';

export default async function ForgotPasswordPage() {
  const t = await getTranslations('Auth.forgotPassword');

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
            <form action={handleForgotPassword} className="space-y-6">
              <div className="space-y-1.5">
                <Label htmlFor="identifier" className="text-sm font-semibold text-foreground/80">
                  {t('identifierLabel')}
                </Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder={t('identifierPlaceholder')}
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

            <div className="mt-6 text-center">
              <Link
                href="login"
                className="text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
              >
                {t('backToLogin')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
