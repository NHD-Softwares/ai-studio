import { setRequestLocale } from 'next-intl/server';

import { AppLocales } from '@/globals';
import { routing } from '@/i18n/routing';

import {
  BeforeAfterSection,
  FeaturesSection,
  FooterSection,
  HeroSection,
  HowItWorksSection,
  PricingSection,
  SocialProofSection,
  TestimonialsSection,
} from './sections';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: AppLocales }>;
};

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <HeroSection />
      <SocialProofSection />
      <HowItWorksSection />
      <BeforeAfterSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
}
