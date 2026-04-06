import Breadcrumbs from '@/components/layout/Breadcrumbs';
import FeedbackClient from './FeedbackClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feedback | Rechenfix.de',
  description: 'Geben Sie uns Feedback zu Rechenfix.de — Rechner-Wünsche, Fehler melden, Bewertungen und Verbesserungsvorschläge.',
  alternates: { canonical: 'https://www.rechenfix.de/feedback' },
  openGraph: {
    title: 'Feedback | Rechenfix.de',
    description: 'Geben Sie uns Feedback zu Rechenfix.de — Rechner-Wünsche, Fehler melden, Bewertungen und Verbesserungsvorschläge.',
    url: 'https://www.rechenfix.de/feedback',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'Feedback | Rechenfix.de' }],
  },
};

export default function FeedbackSeite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Feedback' }]} />

      <div className="card p-6 md:p-8">
        <FeedbackClient />
      </div>
    </div>
  );
}
