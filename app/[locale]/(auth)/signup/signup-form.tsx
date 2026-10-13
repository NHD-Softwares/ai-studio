'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignUpMutation } from '@/hooks/useAuth';
import { useRouter } from '@/i18n/navigation';

import { PasswordInput } from '../components/password-input';

const inputClass =
  'h-12 border-border/50 bg-background/40 px-4 text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary';

export function SignupForm() {
  const signUp = useSignUpMutation();

  const t = useTranslations('Auth.signup');
  const router = useRouter();

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email'));

    signUp.mutate(
      {
        name: String(fd.get('name')),
        email,
        password: String(fd.get('password')),
        isTermsAccepted,
      },
      {
        onSuccess: () => router.push(`/verify?email=${encodeURIComponent(email)}&source=signup`),
      }
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-sm font-semibold text-foreground/80">
          {t('nameLabel')}
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={t('namePlaceholder')}
          required
          className={inputClass}
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
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
          required
          className={inputClass}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-sm font-semibold text-foreground/80">
          {t('passwordLabel')}
        </Label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          placeholder={t('passwordPlaceholder')}
          required
          className={inputClass}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="terms"
          checked={isTermsAccepted}
          onCheckedChange={(c) => setIsTermsAccepted(c === true)}
        />
        <Label htmlFor="terms" className="text-sm text-muted-foreground">
          {t('termsLabel')}
        </Label>
      </div>

      {signUp.isError && (
        <p role="alert" className="text-sm text-destructive">
          {signUp.error?.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={signUp.isPending || !isTermsAccepted}
        className="h-12 w-full bg-[#1A2B33] text-base font-bold text-white transition-all hover:bg-[#1A2B33]/90"
      >
        {signUp.isPending ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
