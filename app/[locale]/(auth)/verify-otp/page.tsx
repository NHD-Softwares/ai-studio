import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { FadeIn } from '@/components/index';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';

export const dynamic = 'force-static';

export default async function VerifyOTPPage() {
  const t = await getTranslations('Auth.verifyOtp');
  const common = await getTranslations('Auth.forgotPassword');

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4">
      <FadeIn direction="up" className="z-10 w-full max-w-xl">
        <Card className="border-none bg-card/70 px-8 py-8 shadow-2xl backdrop-blur-2xl">
          <div className="mb-6 space-y-2 text-center md:text-start">
            <div className="flex h-6 items-center">
              <button className="group flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {common('backToLogin')}
              </button>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t('title')}
            </h1>
          </div>

          <CardContent className="p-0">
            <form className="flex flex-col items-center space-y-8">
              <div className="w-full space-y-3">
                <Label htmlFor="otp" className="block text-center text-sm font-semibold">
                  {t('otpLabel')}
                </Label>
                <div className="flex justify-center">
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="h-12 w-10 border-border/40 bg-background/40 text-xl md:h-14 md:w-12"
                      />
                      <InputOTPSlot
                        index={1}
                        className="h-12 w-10 border-border/40 bg-background/40 text-xl md:h-14 md:w-12"
                      />
                      <InputOTPSlot
                        index={2}
                        className="h-12 w-10 border-border/40 bg-background/40 text-xl md:h-14 md:w-12"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={3}
                        className="h-12 w-10 border-border/40 bg-background/40 text-xl md:h-14 md:w-12"
                      />
                      <InputOTPSlot
                        index={4}
                        className="h-12 w-10 border-border/40 bg-background/40 text-xl md:h-14 md:w-12"
                      />
                      <InputOTPSlot
                        index={5}
                        className="h-12 w-10 border-border/40 bg-background/40 text-xl md:h-14 md:w-12"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <Button
                type="button"
                className="h-12 w-full bg-[#1A2B33] text-base font-bold text-white transition-all hover:bg-[#1A2B33]/90"
              >
                {t('submit')}
              </Button>
              <p className="text-sm text-muted-foreground">
                {t.rich('resend', {
                  resendLink: (chunks) => (
                    <button
                      type="button"
                      className="font-bold text-primary transition-colors hover:underline"
                    >
                      {chunks}
                    </button>
                  ),
                })}
              </p>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="login"
                className="text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
              >
                {common('backToLogin')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
