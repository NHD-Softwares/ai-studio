import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

import requireSetRequestLocale from './eslint-rules/require-set-request-locale.mjs';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ── General project rules ─────────────────────────────────────────────────
  {
    plugins: {
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Set import sorting rules to warn instead of error
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // Turn off built-in unused vars rules so unused-imports takes over
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // Configure unused-imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Other rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@next/next/no-html-link-for-pages': 'off',
      'react/no-unescaped-entities': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // i18n: force locale-aware navigation helpers
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'next/link',
              message: "Use { Link } from '@/i18n/navigation' so the locale is kept.",
            },
            {
              name: 'next/navigation',
              importNames: ['useRouter', 'redirect', 'permanentRedirect', 'usePathname'],
              message: "Use the helpers from '@/i18n/navigation' so the locale is kept.",
            },
          ],
        },
      ],
    },
  },

  // ── no-restricted-syntax (ALL selectors live in ONE array) ────────────────
  // This rule can only be configured once per file. If it appears in two
  // config blocks, the later one REPLACES the earlier one, so every selector
  // (env access + i18n) is kept together here.
  //
  // Env: ban direct process.env access everywhere EXCEPT:
  //   • lib/env.ts         – the single source of truth
  //   • instrumentation.ts – must read NEXT_RUNTIME from process.env
  // i18n: ban patterns that drop the locale.
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    ignores: ['lib/env.ts', 'instrumentation.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          // Matches: process.env.SOME_VAR where SOME_VAR does NOT start with NEXT_PUBLIC_
          selector:
            "MemberExpression[object.object.name='process'][object.property.name='env']:not([property.name=/^NEXT_PUBLIC_/]):not([property.name='NEXT_RUNTIME'])",
          message:
            'Direct process.env access is banned outside lib/env.ts. ' +
            "Import from '@/lib/env' instead. " +
            'Only NEXT_PUBLIC_ variables may be accessed via process.env in client components.',
        },
        {
          // Matches: export const dynamic = 'force-static'
          selector:
            "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[id.name='dynamic'][init.value='force-static']",
          message:
            "Don't use force-static on [locale] pages. It bakes the default locale into the build. Use setRequestLocale(locale) instead.",
        },
        {
          // Matches: window.location (hard redirects skip the locale)
          selector: "MemberExpression[object.name='window'][property.name='location']",
          message: 'window.location skips the locale. Use the router from @/i18n/navigation.',
        },
        {
          // Matches: href="signup" / href="request-reset-password" (no leading slash)
          selector: "JSXAttribute[name.name='href'][value.value=/^[a-z][a-z0-9-]*$/]",
          message: "Relative href. Use an absolute path like href='/signup'.",
        },
      ],
    },
  },

  // ── Custom rule: pages/layouts under [locale] must call setRequestLocale ──
  // Registered as a plugin named "local"; the rule key is pluginName/ruleName.
  // The double backslashes make [locale] literal in the glob.
  {
    files: ['app/\\[locale\\]/**/page.tsx', 'app/\\[locale\\]/**/layout.tsx'],
    plugins: {
      local: {
        rules: { 'require-set-request-locale': requireSetRequestLocale },
      },
    },
    rules: {
      'local/require-set-request-locale': 'error',
    },
  },

  prettier,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    '*.config.js',
    'public/**',
    'scripts/**',
  ]),
]);

export default eslintConfig;
