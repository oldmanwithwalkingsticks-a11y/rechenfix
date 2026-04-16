'use client';

import { useState } from 'react';

export default function FeedbackButtons() {
  const [feedback, setFeedback] = useState<'ja' | 'nein' | null>(null);
  const [nachricht, setNachricht] = useState('');
  const [sending, setSending] = useState(false);
  const [gesendet, setGesendet] = useState(false);

  if (feedback === 'ja') {
    return (
      <div className="text-center py-4 text-sm text-green-600 dark:text-green-400 font-medium">
        Danke für Ihr Feedback! Schön, dass der Rechner hilfreich war.
      </div>
    );
  }

  if (gesendet) {
    return (
      <div className="text-center py-4 text-sm text-green-600 dark:text-green-400 font-medium">
        Vielen Dank! Ihr Feedback hilft uns, diesen Rechner zu verbessern.
      </div>
    );
  }

  if (feedback === 'nein') {
    const absenden = async () => {
      if (!nachricht.trim()) return;
      setSending(true);
      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            typ: 'Rechner verbessern',
            felder: {
              rechner: window.location.pathname,
              wasFehlt: nachricht.trim(),
            },
            email: '',
          }),
        });
        setGesendet(true);
      } catch {
        setGesendet(true);
      }
      setSending(false);
    };

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
            onChange={e => setNachricht(e.target.value)}
            placeholder="z.B. Ergebnis war falsch, Eingabefeld fehlt, Berechnung unklar..."
            className="w-full px-3 py-2 text-sm border border-amber-200 dark:border-amber-500/30 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500/50 resize-none min-h-[80px]"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={absenden}
              disabled={!nachricht.trim() || sending}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                nachricht.trim() && !sending
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 cursor-not-allowed'
              }`}
            >
              {sending ? 'Wird gesendet...' : 'Feedback absenden'}
            </button>
            <button
              onClick={() => setGesendet(true)}
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
      }).catch(() => { /* ignore */ });
    } catch { /* ignore */ }
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
