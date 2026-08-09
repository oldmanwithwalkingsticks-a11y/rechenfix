'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Steuerung der Offline-Nutzung (W69).
 *
 * RECHTLICHER HINTERGRUND — bitte vor Änderungen lesen:
 *
 * Ein Service Worker speichert Dateien auf dem Endgerät des Besuchers. Damit ist
 * § 25 TDDDG eröffnet, und zwar unabhängig davon, dass keine personenbezogenen Daten
 * verarbeitet und keine Daten übermittelt werden. § 25 kennt KEIN berechtigtes
 * Interesse: Entweder die Ausnahme nach Absatz 2 greift, oder es braucht eine
 * Einwilligung.
 *
 * Für einen gewöhnlichen Besucher, der über die Suche kommt und einmal rechnen will,
 * ist ein Offline-Cache nicht „unbedingt erforderlich" — die Seite funktioniert ohne
 * ihn vollständig. Deshalb registriert sich der Service Worker NICHT automatisch,
 * sondern erst auf ausdrücklichen Wunsch (dieser Schalter) oder wenn die Anwendung
 * bereits installiert vom Startbildschirm gestartet wurde. Im installierten Zustand
 * ist die Offline-Fähigkeit genau der Dienst, den der Nutzer ausdrücklich gewünscht
 * hat; dort trägt die Ausnahme.
 *
 * Der Widerruf muss so einfach sein wie die Erteilung — deshalb steht das Abschalten
 * gleichberechtigt auf derselben Seite und leert zugleich alle Zwischenspeicher.
 */

const SCHLUESSEL = 'rechenfix-offline-einwilligung';

type Zustand = 'unbekannt' | 'aus' | 'an' | 'laeuft' | 'nicht-unterstuetzt';

export default function OfflineSchalter() {
  const [zustand, setZustand] = useState<Zustand>('unbekannt');
  const [meldung, setMeldung] = useState('');

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
      setZustand('nicht-unterstuetzt');
      return;
    }
    navigator.serviceWorker.getRegistrations().then((rs) => {
      setZustand(rs.length > 0 ? 'an' : 'aus');
    });
  }, []);

  const einschalten = useCallback(async () => {
    setZustand('laeuft');
    setMeldung('');
    try {
      await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      // Speicherung der Entscheidung selbst: für die Umsetzung des erklärten Willens
      // erforderlich und damit von § 25 Abs. 2 Nr. 2 TDDDG gedeckt.
      window.localStorage.setItem(SCHLUESSEL, new Date().toISOString());
      setZustand('an');
      setMeldung(
        'Offline-Nutzung ist aktiv. Seiten, die Sie ab jetzt besuchen, stehen auch ohne Verbindung zur Verfügung.'
      );
    } catch (fehler) {
      setZustand('aus');
      setMeldung(
        fehler instanceof Error ? `Das hat nicht geklappt: ${fehler.message}` : 'Das hat nicht geklappt.'
      );
    }
  }, []);

  const ausschalten = useCallback(async () => {
    setZustand('laeuft');
    setMeldung('');
    const protokoll: string[] = [];
    try {
      const rs = await navigator.serviceWorker.getRegistrations();
      for (const r of rs) await r.unregister();
      protokoll.push(`${rs.length} Hintergrunddienst abgemeldet`);

      if ('caches' in window) {
        const namen = await caches.keys();
        for (const n of namen) await caches.delete(n);
        protokoll.push(`${namen.length} Zwischenspeicher geleert`);
      }
      window.localStorage.removeItem(SCHLUESSEL);

      setZustand('aus');
      setMeldung(`${protokoll.join(', ')}. Bitte laden Sie die Seite einmal neu.`);
    } catch (fehler) {
      setMeldung(
        fehler instanceof Error ? `Das hat nicht geklappt: ${fehler.message}` : 'Das hat nicht geklappt.'
      );
      setZustand('an');
    }
  }, []);

  if (zustand === 'nicht-unterstuetzt') {
    return (
      <p className="rounded-xl border border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
        Dieser Browser unterstützt die Offline-Nutzung nicht.
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        Status:{' '}
        {zustand === 'an' ? (
          <span className="text-primary-700 dark:text-primary-400">aktiv</span>
        ) : zustand === 'laeuft' ? (
          <span className="text-gray-500">wird geändert …</span>
        ) : zustand === 'unbekannt' ? (
          <span className="text-gray-500">wird geprüft …</span>
        ) : (
          <span className="text-gray-600 dark:text-gray-400">nicht aktiv</span>
        )}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={einschalten}
          disabled={zustand === 'an' || zustand === 'laeuft' || zustand === 'unbekannt'}
          className="rounded-xl bg-primary-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
        >
          Offline-Nutzung aktivieren
        </button>
        <button
          type="button"
          onClick={ausschalten}
          disabled={zustand === 'aus' || zustand === 'laeuft' || zustand === 'unbekannt'}
          className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Abschalten und gespeicherte Daten löschen
        </button>
      </div>

      {meldung && (
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{meldung}</p>
      )}
    </div>
  );
}
