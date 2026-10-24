import { setRequestLocale } from 'next-intl/server';

import { AppLocales } from '@/globals';
import { redirect } from '@/i18n/navigation';
import { me } from '@/lib/api/services/auth';
import { getQueryClient } from '@/lib/get-query-client';

export default async function App({ params }: { params: Promise<{ locale: AppLocales }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const queryClient = getQueryClient();

  const data = await queryClient.query({ queryKey: me.keys, queryFn: me.fn });

  if (!data) redirect({ href: `/login?session=expired`, locale });

  if (!data?.user?.emailVerified) {
    redirect({ href: `/verify?email=${encodeURIComponent(data?.user?.email ?? '')}`, locale });
  }

  return (
    <div className="flex h-full items-center justify-center">
      <h1>Welcome to Ai Studio, The app is still in early development phase</h1>
    </div>
  );
}
