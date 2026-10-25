import { setRequestLocale } from 'next-intl/server';

import { AppLocales } from '@/globals';
import { redirect } from '@/i18n/navigation';
import { me } from '@/lib/api/services/auth';
import { getQueryClient } from '@/lib/get-query-client';

import { Nav } from './components/navigation/nav';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function layout({ children, params }: Props) {
  const { locale } = (await params) as { locale: AppLocales };
  setRequestLocale(locale);

  const queryClient = getQueryClient();

  const data = await queryClient.query({
    queryKey: me.keys,
    queryFn: me.fn,
  });

  if (!data) {
    return redirect({ href: '/login?session=expired', locale });
  }

  return (
    <div className="flex min-h-screen w-full">
      <Nav />
      <main className="my-5 ml-5 min-w-0 flex-1">{children}</main>
    </div>
  );
}
