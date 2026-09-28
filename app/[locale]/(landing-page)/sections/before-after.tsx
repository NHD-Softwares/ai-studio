import { useTranslations } from 'next-intl';

import { BeforeAfterSlider, FadeIn } from '@/components/index';

export function BeforeAfterSection() {
  const t = useTranslations('Landing');

  return (
    <section className="border-y border-border/50 bg-card/30 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-full">
        <FadeIn>
          <h2 className="mb-16 text-center text-4xl font-bold md:text-5xl">{t('Slider.title')}</h2>
        </FadeIn>

        <div className="flex w-full flex-wrap items-center justify-center gap-10">
          <FadeIn
            delay={0.2}
            className="flex w-[30%] max-w-[500px] min-w-[320px] flex-col items-center justify-center gap-5"
          >
            <BeforeAfterSlider
              title={t('Slider.solid')}
              imageBefore={
                'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=2000'
              }
              imageAfter={
                'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000'
              }
            />
          </FadeIn>

          <FadeIn
            delay={0.4}
            className="flex w-[30%] max-w-[500px] min-w-[300px] flex-col items-center justify-center gap-5"
          >
            <BeforeAfterSlider
              title={t('Slider.wearable')}
              imageBefore={
                'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=2000'
              }
              imageAfter={
                'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000'
              }
            />
          </FadeIn>

          <FadeIn
            delay={0.6}
            className="flex w-[30%] max-w-[500px] min-w-[300px] flex-col items-center justify-center gap-5"
          >
            <BeforeAfterSlider
              title={t('Slider.mafraresh')}
              imageBefore={
                'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=2000'
              }
              imageAfter={
                'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000'
              }
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
