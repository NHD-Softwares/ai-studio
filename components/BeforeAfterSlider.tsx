import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ReactCompareSlider } from 'react-compare-slider';

interface Props {
  title?: string;
  imageBefore: string;
  imageAfter: string;
}

export function BeforeAfterSlider({ title, imageBefore, imageAfter }: Props) {
  const t = useTranslations('Globals');

  return (
    <>
      {title && <h2 className="text-center text-2xl font-bold">{title}</h2>}

      <ReactCompareSlider
        suppressHydrationWarning
        className="w-full rounded-3xl"
        itemOne={
          <div className="relative h-80 w-full bg-purple-500 max-[1200px]:h-64">
            <span className="absolute top-4 left-4 z-10 rounded-4xl bg-purple-500 p-1.5 text-sm">
              {t('before')}
            </span>
            <Image
              src={imageBefore}
              alt="before"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        }
        itemTwo={
          <div className="relative h-80 w-full bg-emerald-500 max-[1200px]:h-64">
            <span className="absolute top-4 right-4 z-10 rounded-4xl bg-emerald-500 p-1.5 text-sm">
              {t('after')}
            </span>
            <Image
              src={imageAfter}
              alt="after"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        }
      />
    </>
  );
}
