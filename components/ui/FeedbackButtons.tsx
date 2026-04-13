'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FeedbackButtons() {
  const [feedback, setFeedback] = useState<'ja' | 'nein' | null>(null);

  if (feedback === 'ja') {
    return (
      <div className="text-center py-4 text-sm text-green-600 dark:text-green-400 font-medium">
        Danke für Ihr Feedback!
      </div>
    );
  }

  if (feedback === 'nein') {
    return (
      <div className="text-center py-4 space-y-2">
        <p className="text-sm text-green-600 dark:text-green-400 font-medium">Danke für Ihr Feedback!</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Möchten Sie uns mehr verraten?{' '}
          <Link href="/feedback" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
            Zum Feedback-Formular →
          </Link>
        </p>
      </div>
    );
  }

  const handleFeedback = (wert: 'ja' | 'nein') => {
    setFeedback(wert);
    try {
      const entries = JSON.parse(localStorage.getItem('rf_feedback') || '[]');
      entries.push({
        v: wert,
        r: window.location.pathname,
        t: Date.now(),
      });
      if (entries.length > 500) entries.splice(0, entries.length - 500);
      localStorage.setItem('rf_feedback', JSON.stringify(entries));
    } catch { /* localStorage nicht verfügbar */ }
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
