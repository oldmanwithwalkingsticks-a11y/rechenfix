'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Grafik: Animierter Aufbau der Triangulationskette mit Replay-Knopf.
 * Client-Komponente (Replay über key-Remount). CSS-Keyframes im scoped <style>.
 * Zeigt: erst die Basislinie, dann Dreieck für Dreieck echte Dreiecke.
 */
export default function MeterTriangulationAnimiert() {
  const [runde, setRunde] = useState(0);
  const [sichtbar, setSichtbar] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSichtbar(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <figure className="my-8" ref={ref}>
      <style>{`
        @keyframes triDraw { to { stroke-dashoffset: 0; } }
        @keyframes triPop { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: scale(1); } }
        @keyframes triFade { to { opacity: 1; } }
        .tri-run .tri-seg { stroke-dasharray: 340; stroke-dashoffset: 340; animation: triDraw 0.9s ease-out forwards; }
        .tri-run .base-seg { stroke-dasharray: 140; stroke-dashoffset: 140; animation: triDraw 0.8s ease-out forwards; }
        .tri-run .pt { opacity: 0; transform-box: fill-box; transform-origin: center; animation: triPop 0.4s ease-out forwards; }
        .tri-run .lbl { opacity: 0; animation: triFade 0.6s ease-out forwards; }
        .tri-run .s1{animation-delay:.2s}.tri-run .s2{animation-delay:1.0s}.tri-run .s3{animation-delay:1.7s}.tri-run .s4{animation-delay:2.4s}.tri-run .s5{animation-delay:3.1s}.tri-run .s6{animation-delay:3.8s}.tri-run .s7{animation-delay:4.5s}.tri-run .s8{animation-delay:5.2s}.tri-run .s9{animation-delay:5.9s}
        .tri-run .p0{animation-delay:.1s}.tri-run .p1{animation-delay:.9s}.tri-run .p3{animation-delay:2.1s}.tri-run .p4{animation-delay:2.8s}.tri-run .p6{animation-delay:4.2s}.tri-run .p7{animation-delay:4.9s}
        .tri-run .lblBase{animation-delay:.6s}.tri-run .lblApex{animation-delay:1.2s}.tri-run .lblFoot{animation-delay:6.4s}
        @media (prefers-reduced-motion: reduce){.tri-run .tri-seg,.tri-run .base-seg{stroke-dashoffset:0}.tri-run .pt,.tri-run .lbl{opacity:1}}
      `}</style>
      <svg key={runde} className={`rounded-xl text-gray-900 dark:text-gray-100${sichtbar ? ' tri-run' : ''}`} width="100%" viewBox="0 0 680 360" role="img" xmlns="http://www.w3.org/2000/svg">
        <title>Aufbau der Triangulationskette</title>
        <desc>Von einer einzigen gemessenen Basislinie entsteht Dreieck für Dreieck eine Kette echter Dreiecke entlang des Meridians.</desc>
        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Wie sich die Dreieckskette aufbaut</text>
        <line className="base-seg s1" x1="90" y1="250" x2="210" y2="250" stroke="#D85A30" strokeWidth="3" strokeLinecap="round" />
        <line className="tri-seg s2" x1="90" y1="250" x2="150" y2="110" stroke="#185FA5" strokeWidth="1.5" />
        <line className="tri-seg s2" x1="210" y1="250" x2="150" y2="110" stroke="#185FA5" strokeWidth="1.5" />
        <line className="tri-seg s3" x1="210" y1="250" x2="330" y2="150" stroke="#185FA5" strokeWidth="1.5" />
        <line className="tri-seg s4" x1="150" y1="110" x2="330" y2="150" stroke="#185FA5" strokeWidth="1.5" />
        <line className="tri-seg s5" x1="330" y1="150" x2="400" y2="270" stroke="#185FA5" strokeWidth="1.5" />
        <line className="tri-seg s5" x1="210" y1="250" x2="400" y2="270" stroke="#185FA5" strokeWidth="1.5" />
        <line className="tri-seg s6" x1="400" y1="270" x2="500" y2="120" stroke="#185FA5" strokeWidth="1.5" />
        <line className="tri-seg s7" x1="330" y1="150" x2="500" y2="120" stroke="#185FA5" strokeWidth="1.5" />
        <line className="tri-seg s8" x1="500" y1="120" x2="570" y2="240" stroke="#185FA5" strokeWidth="1.5" />
        <line className="tri-seg s9" x1="400" y1="270" x2="570" y2="240" stroke="#185FA5" strokeWidth="1.5" />
        <circle className="pt p0" cx="90" cy="250" r="4" fill="#993C1D" />
        <circle className="pt p0" cx="210" cy="250" r="4" fill="#993C1D" />
        <circle className="pt p1" cx="150" cy="110" r="4" fill="#0C447C" />
        <circle className="pt p3" cx="330" cy="150" r="4" fill="#0C447C" />
        <circle className="pt p4" cx="400" cy="270" r="4" fill="#0C447C" />
        <circle className="pt p6" cx="500" cy="120" r="4" fill="#0C447C" />
        <circle className="pt p7" cx="570" cy="240" r="4" fill="#0C447C" />
        <text className="lbl lblBase" x="150" y="272" fontSize="14" fontWeight="500" fill="#993C1D" textAnchor="middle">Basislinie</text>
        <text className="lbl lblBase" x="150" y="288" fontSize="12" fill="#993C1D" textAnchor="middle">einzige gemessene Strecke</text>
        <text className="lbl lblApex" x="150" y="100" fontSize="12" fill="#0C447C" textAnchor="middle">Kirchturm, Bergkuppe …</text>
        <text className="lbl lblFoot" x="300" y="330" fontSize="12" fill="#9ca3af" textAnchor="middle">Jede berechnete Seite wird zur Basis des nächsten Dreiecks — von Dünkirchen bis Barcelona.</text>
      </svg>
      <div className="mt-3">
        <button
          type="button"
          onClick={() => { setSichtbar(true); setRunde((r) => r + 1); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Aufbau erneut abspielen
        </button>
      </div>
    </figure>
  );
}
