'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { SignInResult, SignUpResult } from '@/lib/api/services/auth';
import {
  me,
  requestPasswordReset,
  resendVerification,
  resetPassword,
  signIn,
  signOut,
  signUp,
} from '@/lib/api/services/auth';

export const useMeQuery = () =>
  useQuery({
    queryKey: me.keys,
    queryFn: me.fn,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

export const useSignInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn.fn,
    onSuccess: (data: SignInResult) => {
      queryClient.setQueryData(me.keys, data.user);
    },
  });
};

export const useSignUpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUp.fn,
    onSuccess: (data: SignUpResult) => {
      queryClient.setQueryData(me.keys, data.user);
    },
  });
};

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut.fn,
    onSettled: () => {
      queryClient.clear();
    },
  });
};

export const useResendVerificationMutation = () =>
  useMutation({
    mutationFn: resendVerification.fn,
  });

export const useRequestPasswordResetMutation = () =>
  useMutation({
    mutationFn: requestPasswordReset.fn,
  });

export const useResetPasswordMutation = () =>
  useMutation({
    mutationFn: ({ newPassword, token }: { newPassword: string; token: string }) =>
      resetPassword.fn({ newPassword }, token),
  });
