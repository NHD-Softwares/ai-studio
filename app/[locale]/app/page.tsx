import { redirect } from 'next/navigation';

import { authKeys } from '@/hooks/useAuth';
import { authApi } from '@/lib/api/services/auth';
import { getQueryClient } from '@/lib/get-query-client';

import { LogoutButton } from '../(auth)/components/logout';

export default async function App({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const queryClient = getQueryClient();
  const data = await queryClient.query({ queryKey: authKeys.me, queryFn: authApi.me });

  if (!data) redirect(`/${locale}/login?session=expired`);

  if (!data?.user.emailVerified)
    redirect(`/${locale}/verify?email=${encodeURIComponent(data.user.email)}`);

  return (
    <div>
      <h1>App</h1>
      <LogoutButton />
    </div>
  );
}
