'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { SignInResult } from '@/lib/api/services/auth';
import { authApi } from '@/lib/api/services/auth';

export const authKeys = {
  me: ['auth', 'me'] as const,
};

export function useAuth() {
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.me,
    staleTime: 5 * 60 * 1000,

    retry: false,
  });

  const signUp = useMutation({
    mutationFn: authApi.signUp,
  });

  const signIn = useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data: SignInResult) => {
      queryClient.setQueryData(authKeys.me, data.user);
    },
  });

  const signOut = useMutation({
    mutationFn: authApi.signOut,
    onSettled: () => {
      queryClient.clear();
    },
  });

  const resendVerification = useMutation({
    mutationFn: authApi.resendVerification,
  });

  const requestPasswordReset = useMutation({
    mutationFn: authApi.requestPasswordReset,
  });

  const resetPassword = useMutation({
    mutationFn: ({ newPassword, token }: { newPassword: string; token: string }) =>
      authApi.resetPassword({ newPassword }, token),
  });

  return {
    user: meQuery.data ?? null,
    isAuthenticated: !!meQuery.data,
    isLoading: meQuery.isPending,
    refetchUser: meQuery.refetch,

    signUp,
    signIn,
    signOut,
    resendVerification,
    requestPasswordReset,
    resetPassword,
  };
}
