import KiRechnerClient from './KiRechnerClient';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KI-Rechner — Fragen Sie einfach! | Rechenfix',
  description: 'KI-Rechner: Stellen Sie eine Rechenfrage in natürlicher Sprache und erhalten Sie sofort die Antwort. Kostenlos und auf Deutsch.',
  alternates: { canonical: 'https://rechenfix.de/ki-rechner' },
  openGraph: {
    title: 'KI-Rechner — Fragen Sie einfach!',
    description: 'Stellen Sie eine Rechenfrage in natürlicher Sprache und erhalten Sie sofort die Antwort. Kostenlos und auf Deutsch.',
    url: 'https://rechenfix.de/ki-rechner',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'KI-Rechner von Rechenfix.de' }],
  },
};

export default function KiRechnerPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Startseite', href: '/' },
          { label: 'KI-Rechner' },
        ]}
      />

      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span>✨</span> Powered by KI
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          KI-Rechner — Fragen Sie einfach!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
          Stellen Sie eine Rechenfrage in natürlicher Sprache. Die KI berechnet die Antwort und verlinkt Sie zum passenden Rechner.
        </p>
      </div>

      <KiRechnerClient />

      {/* SEO Text */}
      <div className="mt-12 prose prose-sm dark:prose-invert max-w-none">
        <h2>Wie funktioniert der KI-Rechner?</h2>
        <p>
          Der KI-Rechner von Rechenfix.de versteht Ihre Fragen in natürlicher Sprache — so wie Sie sie einem Freund stellen würden.
          Anstatt Zahlen in Formularfelder einzugeben, schreiben Sie einfach Ihre Frage: &bdquo;Wie viel netto bleiben bei 3.500 Euro brutto?&ldquo;
          oder &bdquo;Was kostet mich Rauchen pro Jahr bei einer Schachtel am Tag?&ldquo;
        </p>
        <p>
          Die KI analysiert Ihre Frage, erkennt den passenden Rechentyp und liefert Ihnen eine präzise Antwort in Sekundenschnelle.
          Am Ende jeder Antwort finden Sie einen Link zum detaillierten Rechner, mit dem Sie Ihre Berechnung weiter anpassen können.
        </p>

        <h2>Welche Fragen kann ich stellen?</h2>
        <p>Der KI-Rechner beantwortet alle Fragen rund um:</p>
        <ul>
          <li><strong>Finanzen:</strong> Brutto-Netto, Zinsen, Inflation, Sparplan, Elterngeld, Bürgergeld</li>
          <li><strong>Alltag:</strong> Prozentrechnung, Dreisatz, Rabatte, Einheiten, Tage zwischen Daten</li>
          <li><strong>Auto:</strong> Spritkosten, Kfz-Steuer, kW/PS-Umrechnung, Pendlerpauschale</li>
          <li><strong>Wohnen:</strong> Stromkosten, Heizkosten, Nebenkosten, Miete, Grunderwerbsteuer</li>
          <li><strong>Gesundheit:</strong> BMI, Promille, Schlafzyklen, Raucherkosten</li>
          <li><strong>Mathe:</strong> Bruchrechnung, Durchschnitt, Notenschlüssel</li>
          <li><strong>Arbeit:</strong> Stundenlohn, Arbeitszeit, Urlaubstage, Überstunden</li>
        </ul>

        <h2>Vorteile des KI-Rechners</h2>
        <p>
          <strong>Schnell:</strong> Keine Formularfelder, keine Dropdowns — einfach fragen und die Antwort erhalten.
          <strong>Verständlich:</strong> Die Antwort kommt in einfachem Deutsch, nicht in Fachsprache.
          <strong>Weiterführend:</strong> Jede Antwort verlinkt auf den passenden Detailrechner für eine exakte Berechnung mit allen Optionen.
        </p>
        <p>
          Der KI-Rechner ist kostenlos, ohne Anmeldung nutzbar und speichert keine persönlichen Daten.
          Probieren Sie es aus — stellen Sie Ihre erste Frage!
        </p>
      </div>
    </div>
  );
}
