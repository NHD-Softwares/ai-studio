import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/index';

export function PricingSection() {
  const t = useTranslations('Landing');

  const pricingTiers = [
    {
      name: t('Pricing.starter'),
      price: t('Pricing.starterPrice'),
      features: [
        t('Pricing.featCredits10'),
        t('Pricing.featProjects1'),
        t('Pricing.featTypeSolid'),
        t('Pricing.featVibeNature'),
      ],
      cta: t('Pricing.ctaStarter'),
      href: '/app',
      highlight: false,
    },
    {
      name: t('Pricing.pro'),
      price: t('Pricing.proPrice'),
      suffix: t('Pricing.proSuffix'),
      badge: t('Pricing.mostPopular'),
      features: [
        t('Pricing.featCredits200'),
        t('Pricing.featProjectsUnlimited'),
        t('Pricing.featTypeAll'),
        t('Pricing.featVibeAll'),
        t('Pricing.featPrompt'),
      ],
      cta: t('Pricing.ctaPro'),
      href: '/app',
      highlight: true,
    },
    {
      name: t('Pricing.studio'),
      price: t('Pricing.studioPrice'),
      suffix: t('Pricing.studioSuffix'),
      features: [
        t('Pricing.featCredits600'),
        t('Pricing.featProjectsUnlimited'),
        t('Pricing.featTypeAll'),
        t('Pricing.featVibeAll'),
        t('Pricing.featCustomColor'),
        t('Pricing.featPrompt'),
        t('Pricing.featPriority'),
        t('Pricing.featSupportDedicated'),
      ],
      cta: t('Pricing.ctaStudio'),
      href: '/contact',
      highlight: false,
    },
  ];

  return (
    <section className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <h2 className="mb-16 text-center text-4xl font-bold md:text-5xl">{t('Pricing.title')}</h2>
        </FadeIn>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-8 md:grid-cols-3">
          {pricingTiers.map((tier, idx) => (
            <FadeIn key={idx} delay={0.1 * (idx + 1)}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border bg-card p-8 ${tier.highlight ? 'z-10 border-primary shadow-lg ring-1 ring-primary md:scale-105' : 'border-border shadow-sm'}`}
              >
                {tier.highlight && (
                  <div className="absolute start-1/2 -top-4 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground rtl:translate-x-1/2">
                    {tier.badge}
                  </div>
                )}

                <h3 className="mb-2 text-2xl font-semibold">{tier.name}</h3>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.suffix && <span className="text-muted-foreground">{tier.suffix}</span>}
                </div>

                <ul className="mb-8 flex-1 space-y-4">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-sm md:text-base">
                      <CheckCircle2 className="me-3 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={`w-full rounded-xl px-4 py-3 text-center font-medium transition-colors ${
                    tier.highlight
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
