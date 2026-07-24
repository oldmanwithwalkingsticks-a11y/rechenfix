'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Grafik: Animierter Aufbau von Watts Rechnung zur Pferdestärke mit Replay-Knopf.
 * Client-Komponente (Replay über key-Remount). CSS-Keyframes im scoped <style>.
 * Zeigt: die vier Faktoren erscheinen nacheinander, dann das Ergebnis 32.400,
 * dann der Rundungspfeil zur bis heute gültigen 33.000.
 * Muster: components/blog/grafik/MeterTriangulationAnimiert.tsx.
 */
export default function HerleitungPS() {
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
        @keyframes psPop { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes psFade { to { opacity: 1; } }
        .ps-run .fac { opacity: 0; transform-box: fill-box; transform-origin: center; animation: psPop 0.5s ease-out forwards; }
        .ps-run .res { opacity: 0; animation: psFade 0.7s ease-out forwards; }
        .ps-run .f1{animation-delay:.2s}.ps-run .f2{animation-delay:.9s}.ps-run .f3{animation-delay:1.6s}.ps-run .f4{animation-delay:2.3s}
        .ps-run .rEq{animation-delay:3.1s}.ps-run .rVal{animation-delay:3.5s}
        .ps-run .rArrow{animation-delay:4.4s}.ps-run .rRound{animation-delay:4.9s}
        @media (prefers-reduced-motion: reduce){.ps-run .fac,.ps-run .res{opacity:1;transform:none}}
        .t-brown { fill: #854F0B; }
        .t-teal  { fill: #0F6E56; }
        .dark .t-brown { fill: #FAC775; }
        .dark .t-teal  { fill: #5DCAA5; }
      `}</style>
      <svg key={runde} className={`rounded-xl text-gray-900 dark:text-gray-100${sichtbar ? ' ps-run' : ''}`} width="100%" viewBox="0 0 680 320" role="img" xmlns="http://www.w3.org/2000/svg">
        <title>Wie Watt auf 32.400 kam – und daraus 33.000 wurde</title>
        <desc>
          Watt multiplizierte den Kreisdurchmesser 24 Fuß mit π = 3, mit 2½ Umläufen pro Minute
          und mit 180 Pfund Zugkraft und erhielt 32.400 Fuß-Pfund pro Minute. Diesen Wert rundete
          er später bewusst auf 33.000.
        </desc>
        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Watts Rechnung, Schritt für Schritt</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Aus den Angaben des Mühlenbauers wird durch eine einzige Multiplikation die Leistung.</text>

        {/* Die vier Faktoren als Kästchen mit Erläuterung darunter */}
        <g className="fac f1">
          <text x="70" y="130" fontSize="26" fontWeight="700" textAnchor="middle" fill="currentColor">24</text>
          <text x="70" y="158" fontSize="11" textAnchor="middle" fill="#9ca3af">Fuß</text>
          <text x="70" y="172" fontSize="11" textAnchor="middle" fill="#9ca3af">Durchmesser</text>
        </g>
        <text className="fac f1" x="120" y="130" fontSize="22" textAnchor="middle" fill="#9ca3af">×</text>

        <g className="fac f2">
          <text x="170" y="130" fontSize="26" fontWeight="700" textAnchor="middle" className="t-brown">3</text>
          <text x="170" y="158" fontSize="11" textAnchor="middle" fill="#9ca3af">π ≈ 3</text>
          <text x="170" y="172" fontSize="11" textAnchor="middle" fill="#9ca3af">(grob)</text>
        </g>
        <text className="fac f2" x="220" y="130" fontSize="22" textAnchor="middle" fill="#9ca3af">×</text>

        <g className="fac f3">
          <text x="270" y="130" fontSize="26" fontWeight="700" textAnchor="middle" fill="currentColor">2½</text>
          <text x="270" y="158" fontSize="11" textAnchor="middle" fill="#9ca3af">Umläufe</text>
          <text x="270" y="172" fontSize="11" textAnchor="middle" fill="#9ca3af">pro Minute</text>
        </g>
        <text className="fac f3" x="320" y="130" fontSize="22" textAnchor="middle" fill="#9ca3af">×</text>

        <g className="fac f4">
          <text x="370" y="130" fontSize="26" fontWeight="700" textAnchor="middle" fill="currentColor">180</text>
          <text x="370" y="158" fontSize="11" textAnchor="middle" fill="#9ca3af">Pfund</text>
          <text x="370" y="172" fontSize="11" textAnchor="middle" fill="#9ca3af">Zugkraft</text>
        </g>

        {/* Ergebnis */}
        <text className="res rEq" x="440" y="130" fontSize="22" textAnchor="middle" fill="#9ca3af">=</text>
        <text className="res rVal t-teal" x="560" y="126" fontSize="30" fontWeight="700" textAnchor="middle">32.400</text>
        <text className="res rVal" x="560" y="150" fontSize="11" textAnchor="middle" fill="#9ca3af">Fuß-Pfund / Minute</text>

        {/* Rundungsschritt */}
        <text className="res rArrow" x="340" y="232" fontSize="13" textAnchor="middle" fill="#9ca3af">September 1783: bewusst gerundet auf eine glatte, großzügige Zahl</text>
        <text className="res rRound" x="340" y="278" fontSize="34" fontWeight="800" textAnchor="middle" fill="currentColor">33.000</text>
        <text className="res rRound" x="340" y="300" fontSize="11" textAnchor="middle" fill="#9ca3af">der bis heute gültige Wert einer Pferdestärke</text>
      </svg>
      <div className="mt-3">
        <button
          type="button"
          onClick={() => { setSichtbar(true); setRunde((r) => r + 1); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Rechnung erneut abspielen
        </button>
      </div>
    </figure>
  );
}
