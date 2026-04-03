'use client';

import { useState } from 'react';
import SearchBar from './SearchBar';

export default function HeaderSearch() {
  const [offen, setOffen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOffen(!offen)}
        className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
        aria-label="Suche öffnen"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {offen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40" onClick={() => setOffen(false)} />
          {/* Search overlay */}
          <div className="absolute left-0 right-0 top-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-700 z-50 px-4 py-3">
            <div className="max-w-2xl mx-auto">
              <SearchBar grosse="normal" placeholder="Rechner suchen..." />
            </div>
          </div>
        </>
      )}
    </>
  );
}
