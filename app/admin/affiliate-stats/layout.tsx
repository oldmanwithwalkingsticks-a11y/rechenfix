import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate-Statistiken (Admin)',
  robots: 'noindex, nofollow',
};

export default function AffiliateStatsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
