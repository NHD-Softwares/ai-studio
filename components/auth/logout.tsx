'use client';

import { Loader2, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useSignOutMutation } from '@/hooks/useAuth';
import { useRouter } from '@/i18n/navigation';

export function LogoutButton({ className, minimal }: { className?: string; minimal?: boolean }) {
  const router = useRouter();

  const signOut = useSignOutMutation();

  const t = useTranslations('Auth.common');

  const handleLogout = () => {
    signOut.mutate(undefined, {
      onSuccess: () => {
        router.replace('/login?session=expired');
      },
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleLogout}
      disabled={signOut.isPending}
      className={className}
    >
      {signOut.isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin rtl:mr-0 rtl:ml-2" />
      ) : (
        <LogOut className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
      )}
      {!minimal && (signOut.isPending ? t('loggingOut') : t('logout'))}
    </Button>
  );
}
