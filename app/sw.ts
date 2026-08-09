/// <reference lib="webworker" />

/**
 * Service Worker (W69), gebaut mit Serwist — dem gepflegten Nachfolger von next-pwa,
 * das seit August 2023 archiviert ist.
 *
 * ZENTRALE ENTSCHEIDUNG: bewusst zurückhaltendes Caching.
 *
 * rechenfix rechnet mit gesetzlich festgelegten Werten — Sozialversicherungsbeiträge,
 * Steuertabellen, Freibeträge. Änderten sich diese zum Jahreswechsel und ein Besucher
 * bekäme aus dem Cache noch die alte Seite, würde er falsch rechnen, ohne es zu
 * bemerken. Ein aggressiver Cache würde also genau die Sorgfalt unterlaufen, die in
 * lib/berechnungen/sv-parameter.ts steckt.
 *
 * Deshalb gilt:
 *   - Seiten IMMER zuerst aus dem Netz (NetworkFirst). Der Cache greift nur, wenn
 *     keine Verbindung besteht.
 *   - Nur unveränderliche Dateien (/_next/static/*, Hash im Dateinamen) dürfen zuerst
 *     aus dem Cache kommen — sie können sich per Definition nie ändern.
 *   - API-Routen NIEMALS cachen: KI-Rechner, Feedback, Zähler und Cron-Endpunkte
 *     müssen jede Anfrage wirklich stellen.
 *
 * RECHTLICHER HINWEIS: Dieser Worker registriert sich NICHT von selbst. Ein Service
 * Worker speichert Dateien auf dem Endgerät, damit gilt § 25 TDDDG — und dieser kennt
 * kein berechtigtes Interesse. Registriert wird nur nach ausdrücklicher Zustimmung
 * (components/pwa/OfflineSchalter.tsx) oder im bereits installierten Zustand
 * (components/pwa/PwaStart.tsx). In next.config.mjs steht deshalb `register: false`.
 * Diese Einstellung bitte nicht „vereinfachen".
 */
import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, RuntimeCaching, SerwistGlobalConfig } from 'serwist';
import { CacheFirst, ExpirationPlugin, NetworkFirst, NetworkOnly, Serwist } from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}
declare const self: ServiceWorkerGlobalScope;

const runtimeCaching: RuntimeCaching[] = [
  // 1) API-Routen: niemals aus dem Cache. Steht bewusst an erster Stelle.
  {
    matcher: ({ sameOrigin, url }) => sameOrigin && url.pathname.startsWith('/api/'),
    handler: new NetworkOnly(),
  },

  // 2) Unveränderliche Build-Dateien: Hash im Namen, dürfen dauerhaft aus dem Cache.
  {
    matcher: ({ sameOrigin, url }) => sameOrigin && url.pathname.startsWith('/_next/static/'),
    handler: new CacheFirst({
      cacheName: 'rf-static',
      plugins: [new ExpirationPlugin({ maxEntries: 250, maxAgeSeconds: 60 * 60 * 24 * 365 })],
    }),
  },

  // 3) Seitenaufrufe: immer erst das Netz fragen, Cache nur als Rückfallebene.
  //    Drei Sekunden Wartezeit, damit ein hängendes Mobilfunknetz nicht zur
  //    weißen Seite führt.
  {
    matcher: ({ request, sameOrigin }) => sameOrigin && request.mode === 'navigate',
    handler: new NetworkFirst({
      cacheName: 'rf-seiten',
      networkTimeoutSeconds: 3,
      plugins: [new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 7 })],
    }),
  },

  // 4) Alles Übrige (Bilder, Schriften, Videos): Serwists Voreinstellungen.
  ...defaultCache,
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
  fallbacks: {
    entries: [
      {
        url: '/offline',
        matcher: ({ request }) => request.destination === 'document',
      },
    ],
  },
});

serwist.addEventListeners();
