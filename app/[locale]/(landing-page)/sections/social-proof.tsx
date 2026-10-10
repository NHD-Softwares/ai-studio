import { ShoppingCart, Star as Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function SocialProofSection() {
  const t = useTranslations('Landing');

  return (
    <section className="border-y border-border/50 bg-card/30 py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-center justify-center gap-4 opacity-70 md:flex-row md:gap-8">
          <p className="text-sm font-medium whitespace-nowrap text-muted-foreground">
            {t('SocialProof.label')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['Salla', 'Zid', 'Amazon.sa', 'Noon'].map((brand) => (
              <div
                key={brand}
                className="flex items-center rounded-full bg-muted px-4 py-1.5 text-sm font-semibold"
              >
                <ShoppingCart className="me-2 h-4 w-4 text-muted-foreground" />
                {brand}
              </div>
            ))}
            <div className="flex items-center rounded-full bg-muted px-4 py-1.5 text-sm font-semibold">
              <Instagram className="me-2 h-4 w-4 text-muted-foreground" />
              Instagram
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
