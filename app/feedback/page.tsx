import Breadcrumbs from '@/components/layout/Breadcrumbs';
import FeedbackClient from './FeedbackClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feedback | Rechenfix.de',
  description: 'Geben Sie uns Feedback zu Rechenfix.de — Rechner-Wünsche, Fehler melden, Bewertungen und Verbesserungsvorschläge.',
  alternates: { canonical: 'https://rechenfix.de/feedback' },
  openGraph: {
    title: 'Feedback | Rechenfix.de',
    description: 'Geben Sie uns Feedback zu Rechenfix.de — Rechner-Wünsche, Fehler melden, Bewertungen und Verbesserungsvorschläge.',
    url: 'https://rechenfix.de/feedback',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'Feedback | Rechenfix.de' }],
  },
};

export default function FeedbackSeite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Feedback' }]} />

      <div className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
          Ihr Feedback macht uns besser
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Wählen Sie eine Kategorie und teilen Sie uns Ihre Gedanken mit. Jedes Feedback hilft uns, Rechenfix zu verbessern.
        </p>

        <FeedbackClient />
      </div>
    </div>
  );
}
