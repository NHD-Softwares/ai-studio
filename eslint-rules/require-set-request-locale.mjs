// eslint-rules/require-set-request-locale.mjs

// next-intl functions that need to know the locale
const INTL_CALLS = new Set([
  'getTranslations',
  'getMessages',
  'getFormatter',
  'getLocale',
  'getNow',
  'getTimeZone',
  'useTranslations',
  'useFormatter',
  'useLocale',
]);

export default {
  meta: {
    type: 'problem',
    schema: [], // this rule takes no options
    messages: {
      missing:
        'Pages and layouts under [locale] must call setRequestLocale(locale), or static rendering falls back to the default locale.',
      tooLate:
        'This next-intl call runs before setRequestLocale(locale). Move setRequestLocale above it.',
    },
  },

  create(context) {
    let isClientFile = false; // true if the file starts with 'use client'
    let firstSetCallStart = null; // character position of the first setRequestLocale() call
    const intlCalls = []; // every next-intl call found in the file

    return {
      // Runs once at the top of the file
      Program(node) {
        isClientFile = node.body.some(
          (stmt) => stmt.type === 'ExpressionStatement' && stmt.directive === 'use client'
        );
      },

      // Runs for every function call in the file
      CallExpression(node) {
        if (node.callee.type !== 'Identifier') return; // ignore things like obj.method()
        const name = node.callee.name;

        if (name === 'setRequestLocale') {
          if (firstSetCallStart === null) firstSetCallStart = node.range[0];
        } else if (INTL_CALLS.has(name)) {
          intlCalls.push(node);
        }
      },

      // Runs once at the end, after the whole file has been scanned
      'Program:exit'(node) {
        if (isClientFile) return; // client components get the locale from the provider

        if (firstSetCallStart === null) {
          context.report({ node, messageId: 'missing' });
          return;
        }

        for (const call of intlCalls) {
          if (call.range[0] < firstSetCallStart) {
            context.report({ node: call, messageId: 'tooLate' });
          }
        }
      },
    };
  },
};
