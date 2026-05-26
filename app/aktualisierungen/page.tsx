import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ZurueckButton from '@/components/layout/ZurueckButton';
import StructuredData from '@/components/seo/StructuredData';
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
  SITE_URL,
  SITE_NAME,
} from '@/lib/seo';
import {
  FEEDBACK_LOG,
  getLatestFeedbackDate,
  type FeedbackStatus,
  type FeedbackEntry,
} from '@/lib/feedback-log';
import { formatGermanDate } from '@/lib/format-date';

const PAGE_TITLE = 'Aktualisierungen & Nutzer-Feedback';
const PAGE_DESC =
  'Wünsche, Verbesserungen und Korrekturen aus unserer Community — ' +
  'transparent dokumentiert mit Datum der Anfrage und Umsetzung.';
const PAGE_URL = `${SITE_URL}/aktualisierungen`;

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ${SITE_NAME}`,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESC,
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'de_DE',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${PAGE_TITLE} — ${SITE_NAME}`,
      },
    ],
  },
};

const STATUS_BADGE: Record<FeedbackStatus, { label: string; classes: string }> = {
  'umgesetzt':    { label: 'Umgesetzt',    classes: 'bg-green-100 text-green-800' },
  'in-umsetzung': { label: 'In Umsetzung', classes: 'bg-blue-100 text-blue-800' },
  'eingegangen':  { label: 'Eingegangen',  classes: 'bg-amber-100 text-amber-800' },
  'abgelehnt':    { label: 'Abgelehnt',    classes: 'bg-slate-100 text-slate-700' },
};

const SLUG_PATTERN = /^([a-z0-9-]+)\/([a-z0-9-]+)$/;

function renderBereich(bereich: string) {
  const match = SLUG_PATTERN.exec(bereich);
  if (!match) {
    return <span className="text-gray-600">{bereich}</span>;
  }
  return (
    <Link
      href={`/${match[1]}/${match[2]}`}
      className="text-primary-700 hover:underline"
    >
      /{match[1]}/{match[2]}
    </Link>
  );
}

function sortedEntries(): FeedbackEntry[] {
  return [...FEEDBACK_LOG].sort((a, b) => {
    const da = a.datumUmsetzung ?? a.datumAnfrage;
    const db = b.datumUmsetzung ?? b.datumAnfrage;
    return db.localeCompare(da);
  });
}

export default function AktualisierungenPage() {
  const eintraege = sortedEntries();
  const dateModified = getLatestFeedbackDate();

  const webPageSchema = generateWebPageSchema({
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESC,
    dateModified,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Start', url: '/' },
    { name: 'Aktualisierungen', url: '/aktualisierungen' },
  ]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <StructuredData data={webPageSchema} />
      <StructuredData data={breadcrumbSchema} />

      <Breadcrumbs items={[{ label: 'Aktualisierungen' }]} />
      <ZurueckButton />

      <main>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          {PAGE_TITLE}
        </h1>

        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none mb-10 text-gray-700 dark:text-gray-300">
          <p>
            Rechenfix lebt vom Feedback seiner Nutzerinnen und Nutzer. Wünsche
            und Hinweise erreichen uns per E-Mail an{' '}
            <a href="mailto:info@rechenfix.de" className="text-primary-700 hover:underline">
              info@rechenfix.de
            </a>{' '}
            oder über den Feedback-Button am Ende jeder Rechner-Seite. Wir
            antworten in der Regel innerhalb von 48 Stunden und setzen
            sinnvolle Anpassungen je nach Aufwand zeitnah um.
          </p>
          <p>
            Auf dieser Seite dokumentieren wir transparent, welche Wünsche
            eingegangen sind, was umgesetzt wurde und was wir bewusst
            zurückgestellt oder abgelehnt haben — inklusive Begründung. So
            ist nachvollziehbar, wie Rechenfix mit Community-Input umgeht und
            in welche Richtung sich die Rechner weiterentwickeln.
          </p>
        </div>

        <ul className="space-y-6">
          {eintraege.map(eintrag => {
            const badge = STATUS_BADGE[eintrag.status];
            return (
              <li
                key={eintrag.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
                  <time
                    dateTime={eintrag.datumAnfrage}
                    className="text-gray-500 dark:text-gray-400 font-medium"
                  >
                    {formatGermanDate(eintrag.datumAnfrage)}
                  </time>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full font-semibold ${badge.classes}`}
                  >
                    {badge.label}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    Bereich: {renderBereich(eintrag.bereich)}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {eintrag.wunsch}
                </h2>

                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {eintrag.kommentar}
                </p>

                {eintrag.datumUmsetzung && (
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Umgesetzt am:{' '}
                    <time dateTime={eintrag.datumUmsetzung}>
                      {formatGermanDate(eintrag.datumUmsetzung)}
                    </time>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
