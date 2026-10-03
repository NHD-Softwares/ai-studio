import { z } from 'zod';

const isServer = typeof window === 'undefined';
const nodeEnv = z.enum(['development', 'production', 'test']).default('development');
const localHosts = ['localhost', '127.0.0.1', '0.0.0.0', '[::1]'];

const clientShape = z.object({
  NODE_ENV: nodeEnv,
  NEXT_PUBLIC_NODE_ENV: nodeEnv,
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

const serverShape = clientShape.extend({
  JWT_ENCRYPTION_SECRET: z.string().min(32),
});

function checkAppUrl(v: z.infer<typeof clientShape>, ctx: z.RefinementCtx) {
  if (v.NODE_ENV !== 'production' || !URL.canParse(v.NEXT_PUBLIC_APP_URL)) return;
  const url = new URL(v.NEXT_PUBLIC_APP_URL);
  if (localHosts.includes(url.hostname) || url.protocol !== 'https:') {
    ctx.addIssue({
      code: 'custom',
      path: ['NEXT_PUBLIC_APP_URL'],
      message: 'must be an https URL and not point to localhost in production',
    });
  }
}

const clientSchema = clientShape.superRefine(checkAppUrl);

const serverSchema = serverShape.superRefine((v, ctx) => {
  checkAppUrl(v, ctx);
  if (v.NODE_ENV === 'production' && v.JWT_ENCRYPTION_SECRET.length < 64) {
    ctx.addIssue({
      code: 'custom',
      path: ['JWT_ENCRYPTION_SECRET'],
      message: 'must be at least 64 characters in production',
    });
  }
});

export type Env = z.infer<typeof serverSchema>;

// NEXT_PUBLIC_* must be referenced explicitly or Next won't inline them in the browser
const rawEnv = {
  ...(isServer ? process.env : {}),
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

const result = (isServer ? serverSchema : clientSchema).safeParse(rawEnv);
const skipValidation = process.env.SKIP_ENV_VALIDATION === '1';

if (!result.success && !skipValidation) {
  const problems = result.error.issues
    .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
    .join('\n');
  throw new Error(`Invalid environment variables:\n${problems}\nCheck .env.example`);
}

export const env = Object.freeze(skipValidation ? (rawEnv as Env) : (result.data as Env));

export const isProd = env.NODE_ENV === 'production';
export const isDev = env.NODE_ENV === 'development';
export const isTest = env.NODE_ENV === 'test';
