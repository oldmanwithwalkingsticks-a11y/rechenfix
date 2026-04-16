'use client';

import { useState, useMemo } from 'react';
import { berechneGgtKgv } from '@/lib/berechnungen/ggt-kgv';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

export default function GgtKgvRechner() {
  const [zahl1, setZahl1] = useState('24');
  const [zahl2, setZahl2] = useState('36');
  const [zahl3, setZahl3] = useState('');
  const [zahl4, setZahl4] = useState('');

  const ergebnis = useMemo(() => {
    const zahlen = [zahl1, zahl2, zahl3, zahl4]
      .map(z => parseDeutscheZahl(z))
      .filter(z => z > 0 && Number.isInteger(z));
    if (zahlen.length < 2) return null;
    return berechneGgtKgv(zahlen);
  }, [zahl1, zahl2, zahl3, zahl4]);

  const fmt = (n: number) => n.toLocaleString('de-DE');

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zahl 1</label>
            <NummerEingabe value={zahl1} onChange={setZahl1} placeholder="24" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zahl 2</label>
            <NummerEingabe value={zahl2} onChange={setZahl2} placeholder="36" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zahl 3 (optional)</label>
            <NummerEingabe value={zahl3} onChange={setZahl3} placeholder="" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zahl 4 (optional)</label>
            <NummerEingabe value={zahl4} onChange={setZahl4} placeholder="" />
          </div>
        </div>
      </div>

      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-white/70 text-sm mb-1">ggT</p>
                <p className="text-4xl font-bold">{fmt(ergebnis.ggt)}</p>
                <p className="text-white/60 text-xs mt-1">Größter gemeinsamer Teiler</p>
              </div>
              <div className="text-center">
                <p className="text-white/70 text-sm mb-1">kgV</p>
                <p className="text-4xl font-bold">{fmt(ergebnis.kgv)}</p>
                <p className="text-white/60 text-xs mt-1">Kleinstes gemeinsames Vielfaches</p>
              </div>
            </div>
          </div>

          {/* Euklidischer Algorithmus */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Euklidischer Algorithmus</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.euklid.map((s, i) => (
                <div key={i} className={`px-4 py-2 text-sm font-mono ${s.startsWith('→') ? 'font-bold text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-500/5' : 'text-gray-700 dark:text-gray-300'}`}>
                  {s}
                </div>
              ))}
              <div className="px-4 py-2 text-sm font-mono font-bold text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-500/5">
                kgV = {ergebnis.zahlen.join(' × ')} ÷ ggT-Kette = {fmt(ergebnis.kgv)}
              </div>
            </div>
          </div>

          {/* Primfaktorzerlegung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Primfaktorzerlegung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.primfaktoren.map(p => (
                <div key={p.zahl} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{fmt(p.zahl)}</span>
                  <span className="font-mono font-medium text-gray-800 dark:text-gray-200">{p.darstellung}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Teilermengen */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Teilermengen</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.teilermengen.map(t => (
                <div key={t.zahl} className="px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">T({fmt(t.zahl)}) = </span>
                  <span className="font-mono text-gray-800 dark:text-gray-200">
                    {'{'}{t.teiler.map(d => {
                      const istGemeinsam = ergebnis.teilermengen.every(tm => tm.teiler.includes(d));
                      return istGemeinsam
                        ? <strong key={d} className="text-primary-600 dark:text-primary-400">{fmt(d)}</strong>
                        : <span key={d}>{fmt(d)}</span>;
                    }).reduce<React.ReactNode[]>((prev, curr, i) => i === 0 ? [curr] : [...prev, ', ', curr], [])}
                    {'}'}
                  </span>
                </div>
              ))}
              <div className="px-4 py-2 text-xs text-gray-600 dark:text-gray-500">
                <strong className="text-primary-600 dark:text-primary-400">Fett</strong> = gemeinsame Teiler (der größte ist der ggT)
              </div>
            </div>
          </div>

          <CrossLink href="/mathe/bruchrechner" emoji="🔢" text="Brüche kürzen mit dem ggT" />
          <CrossLink href="/mathe/primzahl-rechner" emoji="🔢" text="Primzahlen prüfen" />

          <ErgebnisAktionen
            ergebnisText={`ggT(${ergebnis.zahlen.join(', ')}) = ${fmt(ergebnis.ggt)} | kgV(${ergebnis.zahlen.join(', ')}) = ${fmt(ergebnis.kgv)}`}
            seitenTitel="ggT/kgV-Rechner"
          />

          <AiExplain
            rechnerName="ggT/kgV-Rechner"
            eingaben={{ zahlen: ergebnis.zahlen }}
            ergebnis={{
              ggt: ergebnis.ggt,
              kgv: ergebnis.kgv,
              primfaktoren: ergebnis.primfaktoren.map(p => `${p.zahl} = ${p.darstellung}`),
            }}
          />
        </>
      )}
    </div>
  );
}
