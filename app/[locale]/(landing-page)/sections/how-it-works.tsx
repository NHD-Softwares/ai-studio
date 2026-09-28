import { Download, FolderPlus, Settings2, Type, UploadCloud } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/index';

export function HowItWorksSection() {
  const t = useTranslations('Landing');

  const howItWorksSteps = [
    {
      icon: <FolderPlus className="h-6 w-6 text-white dark:text-black" />,
      title: t('HowItWorks.step1Title'),
      desc: t('HowItWorks.step1Desc'),
    },
    {
      icon: <UploadCloud className="h-6 w-6 text-white dark:text-black" />,
      title: t('HowItWorks.step2Title'),
      desc: t('HowItWorks.step2Desc'),
    },
    {
      icon: <Settings2 className="h-6 w-6 text-white dark:text-black" />,
      title: t('HowItWorks.step3Title'),
      desc: t('HowItWorks.step3Desc'),
    },
    {
      icon: <Type className="h-6 w-6 text-white dark:text-black" />,
      title: t('HowItWorks.step4Title'),
      desc: t('HowItWorks.step4Desc'),
    },
    {
      icon: <Download className="h-6 w-6 text-white dark:text-black" />,
      title: t('HowItWorks.step5Title'),
      desc: t('HowItWorks.step5Desc'),
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-20 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">{t('HowItWorks.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('HowItWorks.subheading')}</p>
          </div>
        </FadeIn>

        <div className="relative flex flex-wrap justify-center gap-8">
          {howItWorksSteps.map((step, idx) => (
            <FadeIn
              key={idx}
              delay={0.1 * idx}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
            >
              <div className="relative flex h-full flex-col items-start rounded-3xl border border-border/50 bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-violet-500 shadow-inner">
                  {step.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
