import type { Metadata } from 'next';
import Link from 'next/link';
import OfflineSchalter from '@/components/pwa/OfflineSchalter';

/**
 * Seite zur Steuerung der Offline-Nutzung (W69). Aus der Datenschutzerklärung
 * verlinkt, damit der Widerruf ebenso einfach erreichbar ist wie die Erteilung.
 */
export const metadata: Metadata = {
  title: 'Offline-Nutzung',
  description:
    'Rechenfix auf dem Gerät speichern und ohne Internetverbindung nutzen — aktivieren, Status prüfen und jederzeit widerrufen.',
  alternates: { canonical: 'https://www.rechenfix.de/offline-nutzung' },
  robots: { index: true, follow: true },
};

export default function OfflineNutzungSeite() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
        Offline-Nutzung
      </h1>

      <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
        Rechenfix kann Seiten auf Ihrem Gerät speichern, sodass Sie bereits besuchte Rechner
        auch ohne Internetverbindung weiterverwenden können. Das passt gut, weil die Rechner
        ohnehin vollständig auf Ihrem Gerät rechnen — Ihre Eingaben verlassen es nicht.
      </p>

      <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
        Diese Funktion ist standardmäßig <strong>ausgeschaltet</strong>. Sie speichert
        Dateien auf Ihrem Gerät und wird deshalb nur auf Ihren ausdrücklichen Wunsch
        aktiviert. Es werden dabei keine personenbezogenen Daten erhoben und nichts an uns
        übertragen; alles bleibt lokal.
      </p>

      <div className="mt-8">
        <OfflineSchalter />
      </div>

      <h2 className="mt-12 text-lg font-bold text-gray-900 dark:text-gray-100">
        Wichtig zur Aktualität
      </h2>
      <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
        Solange eine Verbindung besteht, wird jede Seite frisch geladen — Sie sehen immer den
        aktuellen Stand. Gespeicherte Fassungen kommen ausschließlich dann zum Einsatz, wenn
        kein Netz erreichbar ist.
      </p>
      <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
        Das ist bei Rechnern wichtiger als bei anderen Seiten: Viele Berechnungen beruhen auf
        gesetzlich festgelegten Werten, die sich zum Jahreswechsel ändern können. Wer offline
        rechnet, rechnet unter Umständen mit dem Stand des letzten Besuchs. Prüfen Sie
        Ergebnisse, auf die es ankommt, deshalb noch einmal mit bestehender Verbindung.
      </p>

      <h2 className="mt-10 text-lg font-bold text-gray-900 dark:text-gray-100">
        Auf dem Startbildschirm ablegen
      </h2>
      <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
        Sie können Rechenfix wie eine App auf den Startbildschirm legen. Unter Android bietet
        Chrome das von sich aus an, alternativ über das Menü mit den drei Punkten. Auf iPhone
        und iPad öffnen Sie in Safari das Teilen-Menü und wählen dort
        „Zum Home-Bildschirm“. Beim Start über dieses Symbol wird die Offline-Funktion
        automatisch verwendet, weil sie dann zum ausdrücklich gewünschten Dienst gehört.
      </p>

      <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
        Einzelheiten zur Rechtsgrundlage stehen in der{' '}
        <Link href="/datenschutz" className="text-primary-600 underline dark:text-primary-400">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </div>
  );
}
