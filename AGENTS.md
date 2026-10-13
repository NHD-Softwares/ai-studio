<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## i18n rules

- Never import Link/useRouter/redirect/usePathname from next/link or next/navigation. Use '@/i18n/navigation'.
- Every page and layout under app/[locale] must `await params`, call `setRequestLocale(locale)`, and pass locale to getTranslations.
- Never use `export const dynamic = 'force-static'` on a [locale] page.
- Never hard-code a path without going through the i18n Link/redirect helpers.
<!-- END:nextjs-agent-rules -->
