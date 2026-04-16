'use client';

import { useState, useMemo, useCallback } from 'react';
import { berechneAbos, VORDEFINIERTE_ABOS, type Abo } from '@/lib/berechnungen/abo';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

let nextId = 1;
function makeId() {
  return `abo-${nextId++}`;
}

export default function AboRechner() {
  const [abos, setAbos] = useState<Abo[]>([]);
  const [eigenName, setEigenName] = useState('');
  const [eigenBetrag, setEigenBetrag] = useState('');

  const toggleAbo = useCallback((name: string, betrag: number) => {
    setAbos(prev => {
      const existing = prev.find(a => a.name === name);
      if (existing) {
        return prev.map(a => a.name === name ? { ...a, aktiv: !a.aktiv } : a);
      }
      return [...prev, { id: makeId(), name, betrag, aktiv: true }];
    });
  }, []);

  const removeAbo = useCallback((id: string) => {
    setAbos(prev => prev.filter(a => a.id !== id));
  }, []);

  const updateBetrag = useCallback((id: string, betrag: number) => {
    setAbos(prev => prev.map(a => a.id === id ? { ...a, betrag } : a));
  }, []);

  const addEigenesAbo = useCallback(() => {
    const betrag = parseFloat(eigenBetrag.replace(',', '.'));
    if (!eigenName.trim() || !betrag || betrag <= 0) return;
    setAbos(prev => [...prev, { id: makeId(), name: eigenName.trim(), betrag, aktiv: true }]);
    setEigenName('');
    setEigenBetrag('');
  }, [eigenName, eigenBetrag]);

  const ergebnis = useMemo(() => berechneAbos(abos), [abos]);

  const isActive = (name: string) => abos.find(a => a.name === name)?.aktiv === true;

  // SVG Tortendiagramm
  const renderPie = () => {
    if (!ergebnis || ergebnis.anteile.length === 0) return null;
    const size = 200;
    const cx = size / 2;
    const cy = size / 2;
    const r = 80;
    let cumAngle = -90;

    const slices = ergebnis.anteile.map((a) => {
      const angle = (a.prozent / 100) * 360;
      const startAngle = cumAngle;
      cumAngle += angle;
      const endAngle = cumAngle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);

      const largeArc = angle > 180 ? 1 : 0;

      // Full circle edge case
      if (ergebnis!.anteile.length === 1) {
        return (
          <circle key={a.name} cx={cx} cy={cy} r={r} fill={a.farbe} />
        );
      }

      const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      return <path key={a.name} d={d} fill={a.farbe} />;
    });

    return (
      <svg viewBox={`0 0 ${size} ${size}`} className="w-48 h-48 mx-auto">
        {slices}
      </svg>
    );
  };

  return (
    <div>
      {/* Vordefinierte Abos */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Wählen Sie Ihre Abos</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {VORDEFINIERTE_ABOS.map(v => (
            <button
              key={v.name}
              onClick={() => toggleAbo(v.name, v.betrag)}
              className={`p-3 rounded-xl text-sm font-medium border-2 transition-all text-center ${
                isActive(v.name)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 ring-1 ring-blue-500/30'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-300'
              }`}
            >
              <span className="block text-xs">{v.name}</span>
              <span className="block text-sm font-bold mt-1">{fmt(v.betrag)} €</span>
            </button>
          ))}
        </div>
      </div>

      {/* Eigenes Abo hinzufügen */}
      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 mb-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Eigenes Abo hinzufügen</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={eigenName}
            onChange={e => setEigenName(e.target.value)}
            className="input-field flex-1"
            placeholder="Name (z. B. DAZN)"
          />
          <div className="relative w-28">
            <input
              type="text"
              value={eigenBetrag}
              onChange={e => setEigenBetrag(e.target.value)}
              className="input-field pr-8"
              placeholder="€/Mon."
              onKeyDown={e => e.key === 'Enter' && addEigenesAbo()}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">€</span>
          </div>
          <button
            onClick={addEigenesAbo}
            className="px-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
          >
            +
          </button>
        </div>
      </div>

      {/* Aktive Abos Liste mit editierbaren Beträgen */}
      {abos.filter(a => a.aktiv).length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ihre aktiven Abos</p>
          <div className="space-y-1.5">
            {abos.filter(a => a.aktiv).map(a => (
              <div key={a.id} className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2">
                <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{a.name}</span>
                <div className="relative w-24">
                  <input
                    type="text"
                    value={a.betrag}
                    onChange={e => {
                      const v = parseFloat(e.target.value.replace(',', '.'));
                      if (!isNaN(v)) updateBetrag(a.id, v);
                    }}
                    className="input-field text-sm py-1 pr-7 text-right"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 text-xs">€</span>
                </div>
                <button
                  onClick={() => {
                    const vordefiniert = VORDEFINIERTE_ABOS.find(v => v.name === a.name);
                    if (vordefiniert) {
                      toggleAbo(a.name, a.betrag);
                    } else {
                      removeAbo(a.id);
                    }
                  }}
                  className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors text-sm font-bold flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Ihre monatlichen Abo-Kosten</p>
            <p className="text-4xl font-bold">{fmt(ergebnis.gesamtMonatlich)} €</p>
            <p className="text-white/70 text-sm mt-1">
              {abos.filter(a => a.aktiv).length} aktive Abos
            </p>
          </div>

          {/* Zeitraum-Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/15 rounded-xl p-3 text-center">
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Pro Monat</p>
              <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{fmt(ergebnis.gesamtMonatlich)} €</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/15 rounded-xl p-3 text-center">
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Pro Jahr</p>
              <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{fmt(ergebnis.gesamtJaehrlich)} €</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/15 rounded-xl p-3 text-center">
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">In 10 Jahren</p>
              <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{fmt(ergebnis.gesamtIn10Jahren)} €</p>
            </div>
          </div>

          {/* 10-Jahres-Highlight */}
          <div className="bg-red-50 dark:bg-red-900/15 border border-red-200 dark:border-red-700/30 rounded-xl p-4 mb-6">
            <p className="text-sm text-red-800 dark:text-red-300">
              💸 In <strong>10 Jahren</strong> geben Sie für Ihre Abos aus:
            </p>
            <p className="text-2xl font-bold text-red-700 dark:text-red-400 mt-1">
              {fmt(ergebnis.gesamtIn10Jahren)} €
            </p>
            <p className="text-xs text-red-600/70 dark:text-red-400/60 mt-1">
              {ergebnis.gesamtIn10Jahren >= 30000
                ? 'Das ist ein neues Auto!'
                : ergebnis.gesamtIn10Jahren >= 15000
                ? 'Das ist ein Kleinwagen!'
                : ergebnis.gesamtIn10Jahren >= 8000
                ? 'Das sind mehrere Traumurlaube!'
                : ergebnis.gesamtIn10Jahren >= 3000
                ? 'Das ist ein schöner Urlaub!'
                : 'Immerhin ein Wochenendtrip!'}
            </p>
          </div>

          {/* Tortendiagramm */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-4">📊 Anteile Ihrer Abo-Kosten</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {renderPie()}
              <div className="flex-1 space-y-1.5 w-full">
                {ergebnis.anteile.map(a => (
                  <div key={a.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: a.farbe }} />
                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{a.name}</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{fmt(a.betrag)} €</span>
                    <span className="text-xs text-gray-600 w-10 text-right">{Math.round(a.prozent)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ranking */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-3">🏆 Ranking: Teuerstes Abo zuerst</h3>
            <div className="space-y-2">
              {ergebnis.ranking.map((a, i) => {
                const maxBetrag = ergebnis!.ranking[0].betrag;
                const width = maxBetrag > 0 ? (a.betrag / maxBetrag) * 100 : 0;
                return (
                  <div key={a.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">
                        {i + 1}. {a.name}
                      </span>
                      <span className="font-bold text-gray-800 dark:text-gray-200">{fmt(a.betrag)} €/Mon.</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kündigungsempfehlung */}
          {ergebnis.kuendigungsEmpfehlung.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/15 border border-green-200 dark:border-green-700/30 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-sm text-green-800 dark:text-green-300 mb-2">💡 Nutzen Sie alle Abos wirklich?</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Kündigen Sie{' '}
                {ergebnis.kuendigungsEmpfehlung.map((a, i) => (
                  <span key={a.name}>
                    {i > 0 && ' und '}
                    <strong>{a.name}</strong> ({fmt(a.betrag)} €/Mon.)
                  </span>
                ))}
                {' '}und sparen Sie <strong>{fmt(ergebnis.kuendigungsErsparnis)} € pro Jahr</strong>.
              </p>
              <p className="text-xs text-green-600/70 dark:text-green-400/60 mt-2">
                Tipp: Prüfen Sie bei jedem Abo, ob Sie es in den letzten 30 Tagen wirklich genutzt haben.
              </p>
            </div>
          )}

          {/* Fun Facts */}
          <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-sm text-blue-800 dark:text-blue-300 mb-2">📋 Wussten Sie schon?</h3>
            <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li>• Deutsche haben im Schnitt 8–10 laufende Abos gleichzeitig</li>
              <li>• 40 % aller Abos werden selten oder nie genutzt</li>
              <li>• Der durchschnittliche Haushalt gibt 150–200 € monatlich für Abos aus</li>
              <li>• Viele vergessen kostenlose Testphasen zu kündigen — das kostet Millionen</li>
            </ul>
          </div>

          <CrossLink href="/alltag/handykosten-rechner" emoji="📱" text="Handykosten berechnen und Tarif optimieren" />
          <CrossLink href="/alltag/streaming-kosten-rechner" emoji="📺" text="Streaming-Kosten vergleichen" />

          {/* AI Explain */}
          <div className="flex flex-wrap gap-3">
            <AiExplain
              rechnerName="Abo-Rechner"
              eingaben={{
                anzahlAbos: abos.filter(a => a.aktiv).length,
                abos: abos.filter(a => a.aktiv).map(a => `${a.name}: ${fmt(a.betrag)} €`).join(', '),
              }}
              ergebnis={{
                gesamtMonatlich: ergebnis.gesamtMonatlich,
                gesamtJaehrlich: ergebnis.gesamtJaehrlich,
                gesamtIn10Jahren: ergebnis.gesamtIn10Jahren,
                teuerstesAbo: ergebnis.ranking[0]?.name,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
