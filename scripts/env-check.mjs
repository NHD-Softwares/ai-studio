/**
 * scripts/env-check.mjs
 * ──────────────────────────────────────────────────────────────────────────────
 * Standalone env:check script.
 *
 * Loads environment variables the same way Next.js does (via @next/env),
 * then validates them against the same schema as lib/env.ts.
 *
 * Run with:
 *   npm run env:check
 *
 * Exits 0 on success, 1 on validation failure.
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Load env files using @next/env (same loader Next.js uses internally)
const require = createRequire(import.meta.url);
const { loadEnvConfig } = require('@next/env');

const { combinedEnv } = loadEnvConfig(projectRoot, /* dev= */ process.env.NODE_ENV !== 'production');

// Merge loaded vars into process.env (loadEnvConfig already does this, but we
// read from combinedEnv for safety)
Object.assign(process.env, combinedEnv);

// Import zod via CJS require
const { z } = require('zod');

// ─── Schema (mirror of lib/env.ts) ───────────────────────────────────────────
// Keep in sync with lib/env.ts. Any new variable added there must be added here.

const SECRET_FIELDS = new Set(['JWT_ENCRYPTION_SECRET']);

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    NEXT_PUBLIC_APP_URL: z.string().url('NEXT_PUBLIC_APP_URL must be a valid URL'),
    NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    JWT_ENCRYPTION_SECRET: z
      .string()
      .min(32, 'JWT_ENCRYPTION_SECRET must be at least 32 characters'),
  })
  .superRefine((values, ctx) => {
    if (values.NODE_ENV !== 'production') return;

    if (values.JWT_ENCRYPTION_SECRET.length < 64) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 64,
        type: 'string',
        inclusive: true,
        path: ['JWT_ENCRYPTION_SECRET'],
        message: '[production] JWT_ENCRYPTION_SECRET must be at least 64 characters',
      });
    }

    try {
      const url = new URL(values.NEXT_PUBLIC_APP_URL);
      if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['NEXT_PUBLIC_APP_URL'],
          message: '[production] NEXT_PUBLIC_APP_URL cannot point to localhost',
        });
      }
    } catch {
      // already caught by .url()
    }
  });

// ─── Parse ────────────────────────────────────────────────────────────────────

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const hr = '═'.repeat(68);
  const subHr = '─'.repeat(68);

  const formattedIssues = parsed.error.issues
    .map((issue) => {
      const path = issue.path.join('.');
      const isSecret = SECRET_FIELDS.has(path);
      const secretNote = isSecret ? ' [secret - value hidden]' : ` (received: ${JSON.stringify(process.env[path])})`;
      return `  • ${path}${secretNote}\n    → ${issue.message}`;
    })
    .join('\n\n');

  console.error([
    '',
    hr,
    ' ❌  env:check – INVALID ENVIRONMENT VARIABLES',
    hr,
    '',
    ' The following environment variables failed validation:',
    '',
    formattedIssues,
    '',
    subHr,
    ' 💡 Action Required:',
    '    1. Check your .env.development (or .env.local / .env) file.',
    '    2. Refer to .env.example for required variables and formats.',
    hr,
    '',
  ].join('\n'));

  process.exit(1);
}

console.log('\n✅  Environment is valid.\n');
console.log('  Variables checked:');
for (const [key, value] of Object.entries(parsed.data)) {
  const isSecret = SECRET_FIELDS.has(key);
  console.log(`    ${key} = ${isSecret ? '***' : JSON.stringify(value)}`);
}
console.log('');
process.exit(0);
