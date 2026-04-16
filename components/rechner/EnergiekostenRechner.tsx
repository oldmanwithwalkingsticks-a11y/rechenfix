'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

interface Geraet {
  id: number;
  preset: string;
  leistung: string;
  stunden: string;
  tage: string;
}

const PRESETS: Record<string, { leistung: string; stunden: string; label: string }> = {
  eigene: { leistung: '100', stunden: '4', label: 'Eigene Angabe' },
  kuehlschrank: { leistung: '150', stunden: '24', label: 'Kühlschrank' },
  waschmaschine: { leistung: '2000', stunden: '1', label: 'Waschmaschine' },
  trockner: { leistung: '2500', stunden: '1', label: 'Trockner' },
  fernseher: { leistung: '100', stunden: '4', label: 'Fernseher' },
  pc: { leistung: '200', stunden: '6', label: 'PC/Laptop' },
  router: { leistung: '10', stunden: '24', label: 'Router' },
  led: { leistung: '10', stunden: '5', label: 'LED-Lampe' },
  herd: { leistung: '2000', stunden: '1', label: 'Elektroherd' },
  spuelmaschine: { leistung: '1800', stunden: '1', label: 'Spülmaschine' },
};

let nextId = 1;
const makeId = () => nextId++;

export default function EnergiekostenRechner() {
  const [geraete, setGeraete] = useState<Geraet[]>([
    { id: makeId(), preset: 'eigene', leistung: '100', stunden: '4', tage: '7' },
  ]);
  const [strompreis, setStrompreis] = useState<string>('32');

  const updateGeraet = (id: number, patch: Partial<Geraet>) => {
    setGeraete(prev => prev.map(g => (g.id === id ? { ...g, ...patch } : g)));
  };

  const setPreset = (id: number, preset: string) => {
    const p = PRESETS[preset];
    if (!p) return;
    if (preset === 'eigene') {
      updateGeraet(id, { preset });
    } else {
      updateGeraet(id, { preset, leistung: p.leistung, stunden: p.stunden });
    }
  };

  const addGeraet = () => {
    if (geraete.length >= 10) return;
    setGeraete(prev => [...prev, { id: makeId(), preset: 'eigene', leistung: '100', stunden: '4', tage: '7' }]);
  };

  const removeGeraet = (id: number) => {
    setGeraete(prev => (prev.length <= 1 ? prev : prev.filter(g => g.id !== id)));
  };

  const result = useMemo(() => {
    const preis = parseDeutscheZahl(strompreis) || 0;
    const rows = geraete.map(g => {
      const w = parseDeutscheZahl(g.leistung) || 0;
      const h = parseDeutscheZahl(g.stunden) || 0;
      const t = Math.max(0, Math.min(7, parseInt(g.tage) || 0));
      const kwhTag = (w * h) / 1000;
      const kwhWoche = kwhTag * t;
      const kwhMonat = kwhWoche * 4.33;
      const kwhJahr = kwhWoche * 52;
      const kostenTag = (kwhTag * preis) / 100;
      const kostenMonat = (kwhMonat * preis) / 100;
      const kostenJahr = (kwhJahr * preis) / 100;
      return { id: g.id, label: PRESETS[g.preset]?.label || 'Gerät', w, h, t, kwhJahr, kostenTag, kostenMonat, kostenJahr };
    });

    const gesamtKwhJahr = rows.reduce((s, r) => s + r.kwhJahr, 0);
    const gesamtJahr = rows.reduce((s, r) => s + r.kostenJahr, 0);
    const gesamtMonat = rows.reduce((s, r) => s + r.kostenMonat, 0);
    const gesamtTag = rows.reduce((s, r) => s + r.kostenTag, 0);

    return { rows, gesamtKwhJahr, gesamtJahr, gesamtMonat, gesamtTag };
  }, [geraete, strompreis]);

  const fmtEuro = (n: number) =>
    n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });
  const fmtKwh = (n: number) => `${n.toLocaleString('de-DE', { maximumFractionDigits: 0 })} kWh`;

  const ergebnis =
    `Energiekosten ${geraete.length === 1 ? 'für 1 Gerät' : `für ${geraete.length} Geräte`}: ` +
    `${fmtEuro(result.gesamtJahr)}/Jahr (${fmtEuro(result.gesamtMonat)}/Monat) bei ${fmtKwh(result.gesamtKwhJahr)} und ${strompreis} ct/kWh.`;

  return (
    <div>
      {/* Geräte-Liste */}
      {geraete.map((g, idx) => (
        <div key={g.id} className="mb-5 p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/40">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Gerät {idx + 1}</p>
            {geraete.length > 1 && (
              <button
                onClick={() => removeGeraet(g.id)}
                className="text-xs text-red-600 dark:text-red-400 underline"
              >
                ✕ Entfernen
              </button>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor={`energiekosten-geraet-${g.id}-typ`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gerätetyp</label>
            <select id={`energiekosten-geraet-${g.id}-typ`}
              value={g.preset}
              onChange={e => setPreset(g.id, e.target.value)}
              className="w-full min-h-[48px] px-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {Object.entries(PRESETS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                  {k !== 'eigene' ? ` (${v.leistung} W, ${v.stunden} h)` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leistung</label>
              <NummerEingabe value={g.leistung} onChange={v => updateGeraet(g.id, { leistung: v, preset: 'eigene' })} placeholder="100" einheit="W" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nutzung pro Tag</label>
              <NummerEingabe value={g.stunden} onChange={v => updateGeraet(g.id, { stunden: v, preset: 'eigene' })} placeholder="4" einheit="h" />
            </div>
          </div>

          <div>
            <label htmlFor={`energiekosten-geraet-${g.id}-tage`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nutzungstage pro Woche</label>
            <select id={`energiekosten-geraet-${g.id}-tage`}
              value={g.tage}
              onChange={e => updateGeraet(g.id, { tage: e.target.value })}
              className="w-full min-h-[48px] px-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {[1, 2, 3, 4, 5, 6, 7].map(n => (
                <option key={n} value={String(n)}>{n} Tag{n > 1 ? 'e' : ''}/Woche</option>
              ))}
            </select>
          </div>
        </div>
      ))}

      {geraete.length < 10 && (
        <button
          onClick={addGeraet}
          className="w-full mb-5 px-4 py-3 rounded-xl border-2 border-dashed border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors min-h-[48px]"
        >
          + Gerät hinzufügen
        </button>
      )}

      {/* Strompreis */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Strompreis</label>
        <NummerEingabe value={strompreis} onChange={setStrompreis} placeholder="32" einheit="ct/kWh" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Aktueller Durchschnitt in Deutschland: ca. 32 ct/kWh (Grundversorgung höher)</p>
      </div>

      {/* Gesamt-Ergebnis */}
      <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
        <p className="text-white/90 text-sm mb-1">Gesamte Energiekosten pro Jahr</p>
        <p className="text-4xl font-bold text-white mb-3">{fmtEuro(result.gesamtJahr)}</p>
        <div className="grid grid-cols-3 gap-3 text-white text-sm">
          <div>
            <p className="opacity-80 text-xs">Pro Tag</p>
            <p className="text-lg font-semibold">{fmtEuro(result.gesamtTag)}</p>
          </div>
          <div>
            <p className="opacity-80 text-xs">Pro Monat</p>
            <p className="text-lg font-semibold">{fmtEuro(result.gesamtMonat)}</p>
          </div>
          <div>
            <p className="opacity-80 text-xs">Verbrauch</p>
            <p className="text-lg font-semibold">{fmtKwh(result.gesamtKwhJahr)}</p>
          </div>
        </div>
      </div>

      {/* Tabelle pro Gerät + Anteil */}
      {result.rows.length > 0 && result.gesamtJahr > 0 && (
        <div className="mb-6 p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 overflow-x-auto">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Aufschlüsselung pro Gerät</p>
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                <th className="py-1 pr-2">Gerät</th>
                <th className="py-1 pr-2 text-right">kWh/Jahr</th>
                <th className="py-1 pr-2 text-right">€/Monat</th>
                <th className="py-1 pr-2 text-right">€/Jahr</th>
                <th className="py-1 pl-2">Anteil</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((r, i) => {
                const anteil = result.gesamtJahr > 0 ? (r.kostenJahr / result.gesamtJahr) * 100 : 0;
                return (
                  <tr key={r.id} className="border-b border-gray-100 dark:border-gray-700/50">
                    <td className="py-1 pr-2 text-gray-700 dark:text-gray-300">Gerät {i + 1} ({r.label})</td>
                    <td className="py-1 pr-2 text-right text-gray-700 dark:text-gray-300">{fmtKwh(r.kwhJahr)}</td>
                    <td className="py-1 pr-2 text-right text-gray-700 dark:text-gray-300">{fmtEuro(r.kostenMonat)}</td>
                    <td className="py-1 pr-2 text-right text-gray-700 dark:text-gray-300">{fmtEuro(r.kostenJahr)}</td>
                    <td className="py-1 pl-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-orange-200 dark:bg-orange-900/40 rounded">
                          <div className="h-2 bg-orange-500 rounded" style={{ width: `${anteil}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-600 dark:text-gray-400 w-10 text-right">{anteil.toFixed(0)} %</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Spartipp */}
      <div className="mb-6 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20">
        <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-1">💡 Spartipp</p>
        <p className="text-xs text-emerald-800 dark:text-emerald-300">
          Ein Wechsel von Energieeffizienzklasse F auf A spart bei Kühlschrank, Waschmaschine und Trockner
          typischerweise <strong>30–60 %</strong> Strom. Auch LED statt Glühbirne (−85 %) und Smart-Stecker
          gegen Stand-by-Verluste (ca. 50–100 €/Jahr) lohnen sich sofort.
        </p>
      </div>

      <CrossLink href="/wohnen/stromkosten-rechner" emoji="⚡" text="Stromkosten-Rechner: Gesamter Haushaltsverbrauch" />
      <CrossLink href="/wohnen/stromvergleich-rechner" emoji="🔄" text="Stromvergleich: Den besten Tarif finden" />
      <CrossLink href="/wohnen/photovoltaik-rechner" emoji="☀️" text="Photovoltaik-Rechner: Eigenen Solarstrom erzeugen" />

      <ErgebnisAktionen ergebnisText={ergebnis} seitenTitel="Energiekosten-Rechner" />
      <AiExplain
        rechnerName="Energiekosten-Rechner"
        eingaben={{
          Geraete: String(geraete.length),
          Strompreis: `${strompreis} ct/kWh`,
          Details: result.rows.map((r, i) => `Gerät ${i + 1}: ${r.label}, ${r.w} W, ${r.h} h/Tag, ${r.t} Tage/Woche`).join(' | '),
        }}
        ergebnis={{
          'Verbrauch/Jahr': fmtKwh(result.gesamtKwhJahr),
          'Kosten/Jahr': `${result.gesamtJahr.toFixed(2)} €`,
          'Kosten/Monat': `${result.gesamtMonat.toFixed(2)} €`,
          'Kosten/Tag': `${result.gesamtTag.toFixed(2)} €`,
        }}
      />

      <div className="mt-6">
        <AffiliateBox programId="check24" context="energiekosten" />
      </div>
    </div>
  );
}
