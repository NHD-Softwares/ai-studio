import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
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
    },
  },
  // ── Enforce centralized env access ────────────────────────────────────────
  // Ban direct process.env access everywhere EXCEPT:
  //   • lib/env.ts    – the single source of truth (reads process.env directly)
  //   • instrumentation.ts – must read NEXT_RUNTIME from process.env
  //
  // All env vars must be read via `import { env } from '@/lib/env'`.
  //
  // The rule uses no-restricted-syntax to ban any MemberExpression that accesses
  // a property on process.env that is NOT a NEXT_PUBLIC_ prefixed var.
  // (NEXT_PUBLIC_ vars are inlined at build time in the client bundle and are
  //  the only legitimate reason to read process.env outside lib/env.ts.)
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    ignores: ['lib/env.ts', 'instrumentation.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          // Matches: process.env.SOME_VAR where SOME_VAR does NOT start with NEXT_PUBLIC_
          // AST: MemberExpression { object: MemberExpression { object: process, property: env }, property: SOME_VAR }
          selector:
            "MemberExpression[object.object.name='process'][object.property.name='env']:not([property.name=/^NEXT_PUBLIC_/]):not([property.name='NEXT_RUNTIME'])",
          message:
            "Direct process.env access is banned outside lib/env.ts. " +
            "Import from '@/lib/env' instead. " +
            "Only NEXT_PUBLIC_ variables may be accessed via process.env in client components.",
        },
      ],
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

