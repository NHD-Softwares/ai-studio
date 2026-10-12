import axios from 'axios';

import { env } from '../env';

export const api = axios.create({
  baseURL: `${env.NEXT_PUBLIC_APP_URL}/api/v1`,
  withCredentials: true,
  timeout: 15_000,
});

// Forward cookies when running on the server
if (typeof window === 'undefined') {
  api.interceptors.request.use(async (config) => {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    config.headers.set('Cookie', cookieStore.toString());
    return config;
  });
}

api.interceptors.response.use(
  (res) => {
    const body = res.data;
    if (body && typeof body === 'object' && 'success' in body) {
      res.data = 'data' in body ? body.data : { message: body.message };
    }
    return res;
  },
  (error) => {
    const message = error.response?.data?.message;
    if (typeof message === 'string')
      error.message =
        typeof message === 'string' ? message : 'Something went wrong. Please try again.';
    return Promise.reject(error);
  }
);
