'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import ThemeToggle from './ThemeToggle';

// Mega-Menu-Dropdown wird erst beim ersten Trigger-Klick nachgeladen
// (W15C-T1-Phase-2-M4). Spart ~96 KB Client-Data-Bundle aus dem Header-
// Initial-Render, das auf jeder Page rendert. ssr: false ist OK, weil
// das Menu rein interaktiv ist und nicht im SSR-Crawl-Pfad gebraucht wird.
const MegaMenuContent = dynamic(() => import('./MegaMenuContent'), {
  ssr: false,
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);


  return (
    <div ref={headerRef} className="sticky top-0 z-50 no-print">
      <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMenuOpen(false)}>
            <Image src="/logo.svg" alt="Rechenfix Logo" width={40} height={40} className="shrink-0 w-10 h-10" priority />
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <span className="text-3xl font-extrabold text-primary-600">Rechen</span>
                <span className="text-3xl font-extrabold text-accent-700 dark:text-accent-400">fix</span>
                <span className="text-sm text-gray-600 hidden sm:inline">.de</span>
              </div>
              <span className="text-[11px] tracking-widest uppercase text-gray-600 dark:text-gray-500 font-medium -mt-1">
                Fix gerechnet!
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Alle Rechner Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                menuOpen
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              aria-expanded={menuOpen}
              aria-label="Alle Rechner anzeigen"
            >
              {menuOpen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              )}
              <span className="hidden sm:inline">Alle Rechner</span>
              <svg className={`w-3 h-3 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <ThemeToggle />
          </div>
        </div>

        {/* Mega Menu — dynamic-loaded, only rendered when open */}
        {menuOpen && <MegaMenuContent onClose={() => setMenuOpen(false)} />}
      </header>
    </div>
  );
}
