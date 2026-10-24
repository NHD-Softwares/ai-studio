import { setRequestLocale } from 'next-intl/server';

import { AppLocales } from '@/globals';

import { Nav } from './components/navigation/nav';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function layout({ children, params }: Props) {
  const { locale } = (await params) as { locale: AppLocales };
  setRequestLocale(locale);

  return (
    <div className="flex h-lvh w-full flex-row">
      <Nav />
      <div className="my-5 ml-5 h-full w-full">{children}</div>
    </div>
  );
}
