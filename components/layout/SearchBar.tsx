'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { rechner as alleRechner } from '@/lib/rechner-config/client-data';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  grosse?: 'normal' | 'gross';
  style?: React.CSSProperties;
}

export default function SearchBar({ className = '', placeholder = 'Was möchten Sie berechnen?', grosse = 'normal', style }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [offen, setOffen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const ergebnisse = query.length >= 2
    ? alleRechner.filter(r =>
        r.titel.toLowerCase().includes(query.toLowerCase()) ||
        r.beschreibung.toLowerCase().includes(query.toLowerCase()) ||
        r.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOffen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navigiere = (slug: string, kategorieSlug: string) => {
    setQuery('');
    setOffen(false);
    router.push(`/${kategorieSlug}/${slug}`);
  };

  return (
    <div ref={ref} className={`relative ${className}`} style={style}>
      <div className="relative">
        <svg className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none ${grosse === 'gross' ? 'w-5 h-5' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOffen(true); }}
          onFocus={() => setOffen(true)}
          onKeyDown={e => {
            if (e.key === 'Enter' && ergebnisse.length > 0) {
              navigiere(ergebnisse[0].slug, ergebnisse[0].kategorieSlug);
            }
          }}
          placeholder={placeholder}
          className={`w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-500 focus:border-primary-400 dark:focus:border-primary-500 outline-none transition-all ${
            grosse === 'gross'
              ? 'pl-12 pr-4 py-2.5 text-base'
              : 'pl-11 pr-4 py-2.5 text-sm'
          }`}
        />
      </div>

      {/* Auto-Suggest Dropdown */}
      {offen && ergebnisse.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
          {ergebnisse.map(r => (
            <button
              key={r.slug}
              onClick={() => navigiere(r.slug, r.kategorieSlug)}
              className="w-full text-left px-4 py-3 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors flex items-center gap-3 border-b border-gray-50 dark:border-gray-700/50 last:border-0"
            >
              <span className="text-xl shrink-0">{r.icon}</span>
              <div className="min-w-0">
                <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{r.titel}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{r.beschreibung}</p>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-500 shrink-0 ml-auto">{r.kategorie}</span>
            </button>
          ))}
        </div>
      )}

      {offen && query.length >= 2 && ergebnisse.length === 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Kein Rechner gefunden für &bdquo;{query}&ldquo;
        </div>
      )}
    </div>
  );
}
