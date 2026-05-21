import { formatGermanDate } from '@/lib/format-date';

interface Props {
  letzteAktualisierung: string;
}

/**
 * Stand-Hinweis „Aktualisiert am …" — wird in der zentralen Rechner-Page
 * zwischen Breadcrumbs und Zurück-Button gerendert, sobald die Config das
 * `letzteAktualisierung`-Feld setzt. Dezent (text-xs, gray-500), no-print.
 *
 * Eingeführt mit W15A.2 als E-E-A-T-Trust-Signal für AdSense + Nutzer.
 */
export default function StandHinweis({ letzteAktualisierung }: Props) {
  return (
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 no-print">
      Aktualisiert am {formatGermanDate(letzteAktualisierung)}
    </p>
  );
}
