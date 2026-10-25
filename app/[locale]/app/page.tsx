import { setRequestLocale } from 'next-intl/server';

import { AppLocales } from '@/globals';

export default async function App({ params }: { params: Promise<{ locale: AppLocales }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex h-full items-center justify-center">
      <h1>Welcome to Ai Studio, The app is still in early development phase</h1>
    </div>
  );
}
