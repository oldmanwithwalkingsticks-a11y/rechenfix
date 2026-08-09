'use client';

import { useEffect } from 'react';

/**
 * Registriert den Service Worker ausschließlich dann automatisch, wenn Rechenfix
 * bereits installiert vom Startbildschirm gestartet wurde (W69).
 *
 * Begründung nach § 25 Abs. 2 Nr. 2 TDDDG: Wer die Anwendung installiert hat, hat den
 * Offline-Dienst ausdrücklich gewünscht — ohne Zwischenspeicher gäbe es ihn nicht. Für
 * diesen Fall ist die Speicherung auf dem Endgerät unbedingt erforderlich und damit
 * einwilligungsfrei.
 *
 * Im gewöhnlichen Browserfenster passiert hier NICHTS. Dort entscheidet allein der
 * Schalter unter /offline-nutzung. Diese Trennung ist beabsichtigt und darf nicht
 * „vereinfacht" werden, indem die Registrierung ins Layout gezogen wird.
 */
export default function PwaStart() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    const installiert =
      window.matchMedia?.('(display-mode: standalone)').matches === true ||
      // iOS meldet den installierten Zustand über eine eigene Eigenschaft.
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (!installiert) return;

    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
      // Stillschweigend ignorieren: Ohne Service Worker funktioniert die Seite
      // vollständig, nur eben ohne Offline-Fähigkeit.
    });
  }, []);

  return null;
}
