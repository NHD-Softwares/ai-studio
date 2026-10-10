import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/index';

import { CTAButton } from '../components/cta-button';

export function HeroSection() {
  const t = useTranslations('Landing');

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-12 text-center md:px-8">
      {/* Emerald blob — top left */}
      <div className="pointer-events-none absolute -top-60 -left-60 h-[600px] w-[600px] animate-[drift-tl_8s_ease-in-out_infinite_alternate] rounded-full bg-primary opacity-30 blur-[170px]" />

      {/* Purple blob — bottom right */}
      <div className="pointer-events-none absolute -right-60 -bottom-60 h-[600px] w-[600px] animate-[drift-br_9s_ease-in-out_infinite_alternate] rounded-full bg-secondary opacity-25 blur-[170px]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
        <FadeIn direction="up">
          <span className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {t('Hero.badge')}
          </span>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <h1 className="mb-6 bg-gradient-to-br from-primary to-secondary bg-clip-text pb-2 text-5xl leading-tight font-bold tracking-tight text-transparent md:text-7xl">
            {t('Hero.headline')}
          </h1>
        </FadeIn>

        <FadeIn delay={0.4} direction="up">
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
            {t('Hero.subheading')}
          </p>
        </FadeIn>

        <FadeIn delay={0.6} direction="up">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <CTAButton content={t('Hero.ctaSecondary')} />

            <Link
              href="/app"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              {t('Hero.ctaPrimary')}
              <ArrowRight className="ms-2 h-5 w-5 rtl:-scale-x-100" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
