'use client';

import { useState, useRef, useEffect } from 'react';

interface Props {
  ergebnisText: string;
  seitenTitel?: string;
  drucken?: boolean;
}

export default function ErgebnisAktionen({ ergebnisText, seitenTitel, drucken }: Props) {
  const [kopiert, setKopiert] = useState(false);
  const [linkKopiert, setLinkKopiert] = useState(false);
  const [teilenOffen, setTeilenOffen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTeilenOffen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const text = `${ergebnisText} — rechenfix.de`;
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const titel = seitenTitel || 'Berechnung auf Rechenfix.de';

  const handleKopieren = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch { /* ignore */ }
  };

  const handleLinkKopieren = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setLinkKopiert(true);
      setTeilenOffen(false);
      setTimeout(() => setLinkKopiert(false), 2000);
    } catch { /* ignore */ }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`, '_blank');
    setTeilenOffen(false);
  };

  const handleEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(titel)}&body=${encodeURIComponent(text + '\n\n' + url)}`, '_blank');
    setTeilenOffen(false);
  };

  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      {/* Kopieren */}
      <button
        onClick={handleKopieren}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        {kopiert ? (
          <><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Kopiert!</>
        ) : (
          <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Ergebnis kopieren</>
        )}
      </button>

      {/* Teilen Dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setTeilenOffen(!teilenOffen)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          Teilen
          <svg className={`w-3 h-3 transition-transform ${teilenOffen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>

        {teilenOffen && (
          <div className="absolute left-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden min-w-[180px]">
            <button onClick={handleWhatsApp} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2.5">
              <span className="text-base">💬</span>WhatsApp
            </button>
            <button onClick={handleEmail} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2.5 border-t border-gray-50 dark:border-gray-700">
              <span className="text-base">✉️</span>E-Mail
            </button>
            <button onClick={handleLinkKopieren} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2.5 border-t border-gray-50 dark:border-gray-700">
              <span className="text-base">{linkKopiert ? '✅' : '🔗'}</span>{linkKopiert ? 'Link kopiert!' : 'Link kopieren'}
            </button>
          </div>
        )}
      </div>

      {/* Drucken */}
      {drucken && (
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Als PDF drucken
        </button>
      )}
    </div>
  );
}
