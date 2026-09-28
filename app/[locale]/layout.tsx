import '../globals.css';

import { Cairo, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { ThemeProvider } from '@/components/index';
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
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="h-full">{children}</div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
