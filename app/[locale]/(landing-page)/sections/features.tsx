import { Coins, Globe2, Image as ImageIcon, Layers, RefreshCcw, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/index';

export function FeaturesSection() {
  const t = useTranslations('Landing');

  const features = [
    {
      icon: <ImageIcon className="h-8 w-8 text-primary" />,
      title: t('Features.feat1Title'),
      desc: t('Features.feat1Desc'),
    },
    {
      icon: <Layers className="h-8 w-8 text-secondary" />,
      title: t('Features.feat2Title'),
      desc: t('Features.feat2Desc'),
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: t('Features.feat3Title'),
      desc: t('Features.feat3Desc'),
    },
    {
      icon: <Globe2 className="h-8 w-8 text-secondary" />,
      title: t('Features.feat4Title'),
      desc: t('Features.feat4Desc'),
    },
    {
      icon: <RefreshCcw className="h-8 w-8 text-primary" />,
      title: t('Features.feat5Title'),
      desc: t('Features.feat5Desc'),
    },
    {
      icon: <Coins className="h-8 w-8 text-secondary" />,
      title: t('Features.feat6Title'),
      desc: t('Features.feat6Desc'),
    },
  ];

  return (
    <section className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <h2 className="mb-16 text-center text-4xl font-bold md:text-5xl">
            {t('Features.title')}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <FadeIn key={idx} delay={0.1 * (idx + 1)}>
              <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 inline-block rounded-2xl bg-primary/10 p-4">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{feature.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
