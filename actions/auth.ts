'use server';

import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';

export async function handleLogin() {
  const locale = await getLocale();
  const cookieStore = await cookies();
  const jwtToken = 'SUPER UNENCRYPTED SUPER SAFE TOKEN';

  cookieStore.set('jwt_token', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  redirect({ href: '/app', locale });
}

export async function handleLogout() {
  const locale = await getLocale();
  const cookieStore = await cookies();

  cookieStore.delete('jwt_token');
  redirect({ href: '/login', locale });
}

export async function handleSignup() {
  const locale = await getLocale();
  const cookieStore = await cookies();
  const jwtToken = 'SUPER UNENCRYPTED SUPER SAFE TOKEN';

  cookieStore.set('jwt_token', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  redirect({ href: '/app', locale });
}

export async function handleForgotPassword(formData: FormData) {
  const locale = await getLocale();
  const identifier = formData.get('identifier');
  redirect({ href: `/verify-otp?identifier=${identifier}`, locale });
}
