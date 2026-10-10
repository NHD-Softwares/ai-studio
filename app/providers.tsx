'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextIntlClientProvider } from 'next-intl';
import * as React from 'react';

import { ThemeProvider } from '@/components/index';
import { isDev } from '@/lib/env';
import { getQueryClient } from '@/lib/get-query-client';

interface ProvidersProps {
  children: React.ReactNode;
  locale?: React.ComponentProps<typeof NextIntlClientProvider>['locale'];
  messages?: React.ComponentProps<typeof NextIntlClientProvider>['messages'];
  themeProps?: Partial<React.ComponentProps<typeof ThemeProvider>>;
}

export function Providers({ children, locale, messages, themeProps }: ProvidersProps) {
  const queryClient = getQueryClient();

  const content = (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...themeProps}
    >
      {children}
    </ThemeProvider>
  );

  return (
    <QueryClientProvider client={queryClient}>
      {locale ? (
        <NextIntlClientProvider locale={locale} messages={messages}>
          {content}
        </NextIntlClientProvider>
      ) : (
        content
      )}
      {isDev && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default Providers;
