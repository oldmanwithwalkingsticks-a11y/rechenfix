'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const onScroll = () => setSichtbar(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nachOben = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={nachOben}
      aria-label="Nach oben scrollen"
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-lg transition-all duration-300 flex items-center justify-center ${
        sichtbar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
