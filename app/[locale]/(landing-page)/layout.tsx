import { Header } from '@/components/index';

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
