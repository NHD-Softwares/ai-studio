import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AppLocales } from './globals';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract locale from path
  const segments = pathname.split('/');
  const currentLocale = segments[1];
  const isSupportedLocale = routing.locales.includes(currentLocale as AppLocales);
  const locale = isSupportedLocale ? currentLocale : routing.defaultLocale;

  const token = request.cookies.get('jwt_token')?.value;

  const isAppRoute = request.nextUrl.pathname.startsWith(`/${locale}/app`);

  if (!token && isAppRoute) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  const authRoutes = ['login', 'signup', 'forgot-password'];

  if (token && authRoutes.includes(segments[2])) {
    return NextResponse.redirect(new URL(`/${locale}/app`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
