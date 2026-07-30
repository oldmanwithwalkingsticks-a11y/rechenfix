'use client';

/**
 * Daumen-Bewertung unter jedem Rechner. Bei „Nein" öffnet sich an Ort und
 * Stelle ein kleines Formular — bewusst kein Seitenwechsel, weil dabei die
 * Eingaben im Rechner verloren gingen und die meisten Nutzer abbrechen.
 *
 * Überarbeitet in Welle 44:
 * - Fehlgeschlagene Sendungen werden als Fehler angezeigt, nicht mehr als
 *   Erfolg. Vorher setzte der catch-Zweig `gesendet` auf true: Der Nutzer sah
 *   eine Dankesmeldung, der Text war weg, und bei uns kam nie eine Mail an.
 *   Ausgerechnet Rückmeldungen zu kaputten Rechnern gingen so lautlos verloren.
 * - Es wird jetzt zusätzlich `res.ok` geprüft. Ein 400er oder 500er löst kein
 *   throw aus und galt vorher ebenfalls als Erfolg.
 * - Die Nachricht bleibt im Fehlerfall erhalten, ein erneuter Versuch ist
 *   möglich.
 * - „Überspringen" verabschiedet neutral, statt sich für nicht gegebenes
 *   Feedback zu bedanken.
 * - Optionales E-Mail-Feld für Rückfragen. Freiwillig, leer voreingestellt,
 *   in der Datenschutzerklärung ausgewiesen.
 */

import { useState } from 'react';

const MAX_ZEICHEN = 1000;

export default function FeedbackButtons() {
  const [feedback, setFeedback] = useState<'ja' | 'nein' | null>(null);
  const [nachricht, setNachricht] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sendet' | 'ok' | 'fehler'>('idle');
  const [uebersprungen, setUebersprungen] = useState(false);

  if (feedback === 'ja') {
    return (
      <div className="text-center py-4 text-sm text-green-600 dark:text-green-400 font-medium">
        Danke für Ihr Feedback! Schön, dass der Rechner hilfreich war.
      </div>
    );
  }

  if (status === 'ok') {
    return (
      <div className="text-center py-4 text-sm text-green-600 dark:text-green-400 font-medium">
        Vielen Dank! Ihr Feedback hilft uns, diesen Rechner zu verbessern.
      </div>
    );
  }

  if (uebersprungen) {
    return (
      <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        Alles klar. Falls Ihnen später doch noch etwas auffällt, freuen wir uns über eine
        Nachricht.
      </div>
    );
  }

  if (feedback === 'nein') {
    const absenden = async () => {
      if (!nachricht.trim()) return;
      setStatus('sendet');
      try {
        const res = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            typ: 'Rechner verbessern',
            felder: {
              rechner: window.location.pathname,
              wasFehlt: nachricht.trim().slice(0, MAX_ZEICHEN),
            },
            email: email.trim(),
          }),
        });
        // Ein 400er oder 500er löst kein throw aus — deshalb res.ok prüfen.
        setStatus(res.ok ? 'ok' : 'fehler');
      } catch {
        setStatus('fehler');
      }
    };

    const sendet = status === 'sendet';
    const absendbar = nachricht.trim().length > 0 && !sendet;

    return (
      <div className="py-4 no-print">
        <div className="max-w-md mx-auto bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
            Schade, dass der Rechner nicht hilfreich war!
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-400 mb-3">
            Was können wir verbessern? Ihr Feedback hilft uns direkt weiter.
          </p>

          <textarea
            value={nachricht}
            onChange={(e) => setNachricht(e.target.value.slice(0, MAX_ZEICHEN))}
            maxLength={MAX_ZEICHEN}
            placeholder="z.B. Ergebnis war falsch, Eingabefeld fehlt, Berechnung unklar..."
            className="w-full px-3 py-2 text-sm border border-amber-200 dark:border-amber-500/30 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500/50 resize-none min-h-[80px]"
          />

          <label className="block mt-2">
            <span className="text-xs text-amber-700 dark:text-amber-400">
              E-Mail für Rückfragen — freiwillig
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="optional"
              autoComplete="email"
              className="w-full mt-1 px-3 py-2 text-sm border border-amber-200 dark:border-amber-500/30 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500/50"
            />
          </label>

          {status === 'fehler' && (
            <p
              role="alert"
              className="mt-3 text-xs text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg px-3 py-2"
            >
              Das Absenden hat nicht geklappt — Ihre Nachricht ist noch da. Bitte versuchen Sie es
              noch einmal, oder schreiben Sie an info@rechenfix.de.
            </p>
          )}

          <div className="flex gap-2 mt-2">
            <button
              onClick={absenden}
              disabled={!absendbar}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                absendbar
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 cursor-not-allowed'
              }`}
            >
              {sendet
                ? 'Wird gesendet...'
                : status === 'fehler'
                  ? 'Erneut versuchen'
                  : 'Feedback absenden'}
            </button>
            <button
              onClick={() => setUebersprungen(true)}
              className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Überspringen
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFeedback = (wert: 'ja' | 'nein') => {
    setFeedback(wert);
    // Fire-and-forget Tracking — keine personenbezogenen Daten
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'feedback',
          feedback: wert,
          rechner: window.location.pathname,
        }),
        keepalive: true,
      }).catch(() => {
        /* ignore */
      });
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="text-center py-4 no-print">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">War dieser Rechner hilfreich?</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => handleFeedback('ja')}
          className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-xl bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors"
        >
          <span className="text-base">👍</span> Ja
        </button>
        <button
          onClick={() => handleFeedback('nein')}
          className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <span className="text-base">👎</span> Nein
        </button>
      </div>
    </div>
  );
}
