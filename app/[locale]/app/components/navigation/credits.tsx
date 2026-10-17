import { ArrowRight } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

type CreditsProps = {
  credits: number;
  total: number;
  collapsed: boolean;
};

export const Credits = ({ credits, total, collapsed }: CreditsProps) => {
  const t = useTranslations('Nav');
  const format = useFormatter();

  const percent = total > 0 ? Math.min(100, Math.max(0, (credits / total) * 100)) : 0;
  const label = t('creditsAria', { credits, total });

  if (collapsed) {
    return (
      <Link
        href="/plans"
        title={label}
        aria-label={label}
        className="flex size-10 items-center justify-center rounded-full border-2 border-primary text-xs font-medium"
      >
        {format.number(credits)}
      </Link>
    );
  }

  return (
    <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-3">
      <div className="flex w-28 flex-col items-center">
        <div className="relative w-full">
          <svg
            viewBox="0 0 100 56"
            role="img"
            aria-label={label}
            className="w-full rtl:-scale-x-100"
          >
            <path
              d="M10 50 A40 40 0 0 1 90 50"
              pathLength={100}
              fill="none"
              strokeWidth={8}
              strokeLinecap="round"
              className="stroke-sidebar-border"
            />
            {percent > 0 && (
              <path
                d="M10 50 A40 40 0 0 1 90 50"
                pathLength={100}
                fill="none"
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray={`${percent} 100`}
                className="stroke-primary"
              />
            )}
          </svg>
          <span className="absolute inset-x-0 bottom-0 text-center text-xl font-medium">
            {format.number(credits)}
          </span>
        </div>
        <span className="mt-1 text-xs text-muted-foreground">{t('creditsLeft')}</span>
      </div>

      <Link
        href="/plans"
        className="group flex items-center gap-1 justify-self-start text-xs font-medium whitespace-nowrap text-primary"
      >
        {t('managePlan')}
        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
      </Link>
    </div>
  );
};
