import '../globals.css';

import { Cairo, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import Providers from '@/app/providers';
import { AppLocales } from '@/globals';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-ar',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: AppLocales }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),

    favicon: '/favicon.ico',
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={dir}
      className={cn(
        'h-full',
        'antialiased',
        'font-sans',
        locale === 'ar' ? cairo.variable : inter.variable
      )}
    >
      <body className="relative flex min-h-full flex-col">
        <Providers locale={locale} messages={messages}>
          <div className="h-full">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
