import { FadeIn } from '@/components/index';
import { Card } from '@/components/ui/card';

import { RequestResetForm } from './request-reset-password-form';

export const dynamic = 'force-static';

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4">
      <FadeIn direction="up" className="z-10 w-full max-w-xl">
        <Card className="border-none bg-card/70 px-8 py-8 shadow-2xl backdrop-blur-2xl">
          <RequestResetForm />
        </Card>
      </FadeIn>
    </div>
  );
}
