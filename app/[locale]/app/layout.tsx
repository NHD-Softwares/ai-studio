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
    <>
      <Nav />
      {children}
    </>
  );
}
