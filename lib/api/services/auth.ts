import axios from 'axios';

import { api } from '../client';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  token: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
}

export interface MeResult {
  user: User;
  session: Session;
}

export interface SignInResult {
  user: User;
  session: Session;
  token: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  isTermsAccepted: boolean;
}

export interface SignInInput {
  email: string;
  password: string;
  rememberMe?: boolean;
  callbackURL?: string;
}

interface MessageResult {
  message: string;
}

export const authApi = {
  signUp: (body: SignUpInput) => api.post('/auth/sign-up/email', body).then((r) => r.data),

  signIn: (body: SignInInput) =>
    api.post<SignInResult>('/auth/sign-in/email', body).then((r) => r.data),

  signOut: () => api.post<MessageResult>('/auth/sign-out').then((r) => r.data),

  resendVerification: (body: { email: string }) =>
    api.post<MessageResult>('/auth/resend-verification', body).then((r) => r.data),

  requestPasswordReset: (body: { email: string }) =>
    api.post<MessageResult>('/auth/request-reset-password', body).then((r) => r.data),

  resetPassword: (body: { newPassword: string }, token: string) =>
    api
      .post<MessageResult>('/auth/reset-password', body, { params: { token } })
      .then((r) => r.data),

  me: () =>
    api
      .get<MeResult>('/users/me')
      .then((r) => r.data)
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) return null;
        throw error;
      }),
};
