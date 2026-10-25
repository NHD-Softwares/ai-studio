import { type NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

const SESSION_COOKIES = ['better-auth.session_token', '__Secure-better-auth.session_token'];

const PROTECTED_PREFIX = '/app';

const AUTH_ROUTES = ['/login', '/signup', '/forgot-password'];

function splitLocale(pathname: string): { locale: string | null; path: string } {
  const [, first, ...rest] = pathname.split('/');
  const locale = (routing.locales as readonly string[]).includes(first) ? first : null;
  return locale ? { locale, path: '/' + rest.join('/') } : { locale: null, path: pathname };
}

function isUnder(path: string, base: string) {
  return path === base || path.startsWith(base + '/');
}

export default function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const { locale, path } = splitLocale(pathname);

  if (!locale) return intlMiddleware(request);

  if (
    (pathname.endsWith('/login') || pathname.endsWith('/login/')) &&
    searchParams.get('session') === 'expired'
  ) {
    const response = NextResponse.redirect(new URL(pathname, request.url));

    const cookieNames = [
      'better-auth.session_token',
      'better-auth.session_data',
      'better-auth.dont_remember',
      '__Secure-better-auth.session_token',
      '__Secure-better-auth.session_data',
    ];

    for (const name of cookieNames) {
      response.cookies.set({
        name,
        value: '',
        path: '/',
        expires: new Date(0),
        maxAge: 0,
      });
    }

    return response;
  }

  const hasSession = SESSION_COOKIES.some((n) => request.cookies.has(n));

  if (isUnder(path, PROTECTED_PREFIX) && !hasSession) {
    const url = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(url);
  }

  if (AUTH_ROUTES.some((r) => isUnder(path, r))) {
    const isExpiredSession = request.nextUrl.searchParams.get('session') === 'expired';

    if (hasSession && !isExpiredSession) {
      return NextResponse.redirect(new URL(`/${locale}/app`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
