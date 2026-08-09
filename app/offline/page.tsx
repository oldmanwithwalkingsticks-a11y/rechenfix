import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * Offline-Rückfallseite (W69). Wird vom Service Worker ausgeliefert, wenn eine Seite
 * angefordert wird, die weder im Netz erreichbar noch im Cache vorhanden ist.
 *
 * Bewusst ohne dynamische Inhalte, damit sie in jedem Fall funktioniert.
 */
export const metadata: Metadata = {
  title: 'Keine Verbindung | Rechenfix.de',
  description: 'Diese Seite ist ohne Internetverbindung nicht verfügbar.',
  robots: { index: false, follow: false },
};

export default function OfflineSeite() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="text-6xl" aria-hidden="true">
        📡
      </p>

      <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
        Gerade keine Verbindung
      </h1>

      <p className="mx-auto mt-4 max-w-lg leading-relaxed text-gray-600 dark:text-gray-300">
        Diese Seite konnte nicht geladen werden, weil im Moment keine Internetverbindung
        besteht und sie noch nicht auf diesem Gerät gespeichert ist.
      </p>

      <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        Rechner, die Sie schon einmal geöffnet hatten, funktionieren weiterhin — sie rechnen
        vollständig auf Ihrem Gerät und brauchen dafür kein Netz.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-primary-500 px-5 py-3 font-medium text-white transition-colors hover:bg-primary-600"
        >
          Zur Startseite
        </Link>
        <Link
          href="/blog"
          className="rounded-xl border border-gray-200 px-5 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Zum Blog
        </Link>
      </div>

      <p className="mt-10 text-xs text-gray-400 dark:text-gray-500">
        Sobald die Verbindung zurück ist, lädt jede Seite wieder in der aktuellen Fassung.
        Rechenfix zeigt gespeicherte Inhalte nur, wenn kein Netz erreichbar ist.
      </p>
    </div>
  );
}
