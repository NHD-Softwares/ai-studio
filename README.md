This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Copy the example env file and fill in the values:

```bash
cp .env.example .env.development
```

2. Run the development server:

```bash
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## Environment Variables

All environment variables are validated at startup using [Zod](https://zod.dev). The app will **fail fast** with a clear error listing every missing or invalid variable if the environment is misconfigured.

**Single source of truth:** [`lib/env.ts`](lib/env.ts)  
**Do not use `process.env` directly** anywhere outside `lib/env.ts`. Import `env` instead:

```ts
import { env, isProd, isDev } from '@/lib/env';

// ✅ correct
const secret = env.JWT_ENCRYPTION_SECRET;

// ❌ banned by ESLint
const secret = process.env.JWT_ENCRYPTION_SECRET;
```

### Variable Reference

| Variable                | Type                                      | Required                    | Dev | Prod | Notes                                         |
| ----------------------- | ----------------------------------------- | --------------------------- | --- | ---- | --------------------------------------------- |
| `NODE_ENV`              | `"development" \| "production" \| "test"` | No (default: `development`) | ✅  | ✅   | Set automatically by npm scripts              |
| `NEXT_PUBLIC_NODE_ENV`  | `"development" \| "production" \| "test"` | No (default: `development`) | ✅  | ✅   | Mirrors `NODE_ENV` for client bundle          |
| `NEXT_PUBLIC_APP_URL`   | `string` (URL)                            | **Yes**                     | ✅  | ✅   | Full base URL; cannot be localhost in prod    |
| `JWT_ENCRYPTION_SECRET` | `string`                                  | **Yes**                     | ✅  | ✅   | Min 32 chars in dev; **min 64 chars** in prod |

### Environment Files

| File                      | Committed? | Purpose                                               |
| ------------------------- | ---------- | ----------------------------------------------------- |
| `.env.example`            | ✅ Yes     | Template with all variables (no real secrets)         |
| `.env.production.example` | ✅ Yes     | Production template documenting prod requirements     |
| `.env.development`        | ❌ No      | Local dev values – gitignored                         |
| `.env.production`         | ❌ No      | Production values – gitignored (use platform secrets) |

### How to Add a New Variable

1. Add it to the `envSchema` in [`lib/env.ts`](lib/env.ts)
2. Add a placeholder entry to [`.env.example`](.env.example) with a comment
3. Add it to [`.env.production.example`](.env.production.example) if it's needed in prod
4. Add it to your local `.env.development`
5. Use `env.YOUR_VAR` throughout the codebase

### Validate the Environment

```bash
npm run env:check
```

This runs without starting the server and exits 0 on success, 1 on failure.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Zod Documentation](https://zod.dev)

## Deploy on Vercel

Set all required environment variables in your Vercel project settings (never commit `.env.production`).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
