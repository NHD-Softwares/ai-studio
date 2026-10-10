import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function FooterSection() {
  const t = useTranslations('Landing');

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/20 px-4 py-16 md:px-8">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="col-span-1 md:col-span-1">
          <h2 className="mb-4 text-2xl font-bold text-foreground">AI Studio</h2>
          <p className="mb-6 text-sm text-muted-foreground">{t('Footer.tagline')}</p>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-foreground">{t('Footer.company')}</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="transition-colors hover:text-primary">
                {t('Footer.about')}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-primary">
                {t('Footer.blog')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-primary">
                {t('Footer.contact')}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-foreground">{t('Footer.legal')}</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy" className="transition-colors hover:text-primary">
                {t('Footer.privacy')}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-primary">
                {t('Footer.terms')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
