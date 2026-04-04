'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { kategorien, getRechnerByKategorie } from '@/lib/rechner-config';
import ThemeToggle from './ThemeToggle';

const farbMap: Record<string, string> = {
  alltag: 'border-blue-200 dark:border-blue-500/30',
  finanzen: 'border-amber-200 dark:border-amber-500/30',
  gesundheit: 'border-green-200 dark:border-green-500/30',
  auto: 'border-red-200 dark:border-red-500/30',
  wohnen: 'border-orange-200 dark:border-orange-500/30',
  mathe: 'border-violet-200 dark:border-violet-500/30',
  arbeit: 'border-teal-200 dark:border-teal-500/30',
};

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
    <div ref={headerRef} className="sticky top-0 z-50">
      <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMenuOpen(false)}>
            <Image src="/logo.svg" alt="Rechenfix Logo" width={40} height={40} className="shrink-0" priority />
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <span className="text-3xl font-extrabold text-primary-500">Rechen</span>
                <span className="text-3xl font-extrabold text-accent-500">fix</span>
                <span className="text-sm text-gray-400 hidden sm:inline">.de</span>
              </div>
              <span className="text-[11px] tracking-widest uppercase text-gray-400 dark:text-gray-500 font-medium -mt-1">
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

        {/* Mega Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-6 max-h-[75vh] overflow-y-auto">
              {/* Kategorie-Kacheln */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {kategorien.map(k => {
                  const katRechner = getRechnerByKategorie(k.slug);
                  const borderColor = farbMap[k.slug] || 'border-gray-200 dark:border-gray-700';
                  return (
                    <div
                      key={k.slug}
                      className={`bg-white dark:bg-gray-800 rounded-xl border-l-4 ${borderColor} shadow-sm p-4`}
                    >
                      <Link
                        href={`/${k.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors mb-3 text-sm"
                      >
                        <span className="text-lg">{k.icon}</span>
                        {k.name}
                        <span className="text-xs font-normal text-gray-400 ml-auto">{katRechner.length}</span>
                      </Link>
                      <ul className="space-y-0.5">
                        {katRechner.map(r => (
                          <li key={r.slug}>
                            <Link
                              href={`/${r.kategorieSlug}/${r.slug}`}
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center gap-2 py-1.5 px-2 -mx-1 rounded-lg text-[13px] text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all"
                            >
                              <span>{r.icon}</span>
                              <span className="truncate">{r.titel}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Invisible click-catcher to close menu on outside click */}
      {menuOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
