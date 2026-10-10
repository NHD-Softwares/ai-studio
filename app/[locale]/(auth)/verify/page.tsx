import { setRequestLocale } from 'next-intl/server';

import { FadeIn } from '@/components/index';
import { AppLocales } from '@/globals';

import { CheckEmailCard } from './check-email-card';

type Props = {
  params: Promise<{ locale: AppLocales }>;
  searchParams?: Promise<{ email?: string }>;
};

export default async function PleaseVerifyPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const email = searchParams ? (await searchParams).email : undefined;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4">
      <FadeIn direction="up" className="z-10 w-full max-w-xl">
        <CheckEmailCard initialEmail={email} />
      </FadeIn>
    </div>
  );
}
