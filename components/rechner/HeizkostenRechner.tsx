'use client';

import { useState, useMemo, useEffect } from 'react';
import { berechneHeizkosten, getEnergietraegerDefaults, getAlleEnergietraeger, type Energietraeger } from '@/lib/berechnungen/heizkosten';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';

export default function HeizkostenRechner() {
  const [wohnflaeche, setWohnflaeche] = useState('80');
  const [energietraeger, setEnergietraeger] = useState<Energietraeger>('gas');
  const [verbrauch, setVerbrauch] = useState('140');
  const [preis, setPreis] = useState('12');

  useEffect(() => {
    const d = getEnergietraegerDefaults(energietraeger);
    setVerbrauch(String(d.verbrauch));
    setPreis(String(d.preis));
  }, [energietraeger]);

  const ergebnis = useMemo(
    () => berechneHeizkosten({
      wohnflaeche: parseDeutscheZahl(wohnflaeche),
      energietraeger,
      verbrauchProQm: parseDeutscheZahl(verbrauch),
      preisProKwh: parseDeutscheZahl(preis),
    }),
    [wohnflaeche, energietraeger, verbrauch, preis]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const alle = getAlleEnergietraeger();

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wohnfläche</label>
        <NummerEingabe value={wohnflaeche} onChange={setWohnflaeche} placeholder="80" einheit="m²" />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Energieträger</label>
        <div className="flex flex-wrap gap-2">
          {alle.map(e => (
            <button
              key={e.key}
              onClick={() => setEnergietraeger(e.key)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                energietraeger === e.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verbrauch</label>
          <NummerEingabe value={verbrauch} onChange={setVerbrauch} placeholder="140" einheit="kWh/m²" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Energiepreis</label>
          <NummerEingabe value={preis} onChange={setPreis} placeholder="12" einheit="ct/kWh" />
        </div>
      </div>

      {ergebnis && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Heizkosten pro Jahr</p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">{fmt(ergebnis.kostenJahr)} €</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Monat</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.kostenMonat)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro m²/Jahr</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.kostenProQm)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Verbrauch</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{ergebnis.verbrauchGesamt.toLocaleString('de-DE')} kWh</p>
            </div>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Heizkosten pro Jahr: ${fmt(ergebnis.kostenJahr)} € (${fmt(ergebnis.kostenMonat)} €/Monat, ${fmt(ergebnis.kostenProQm)} €/m²)`}
            seitenTitel="Heizkostenrechner"
          />
          <AiExplain
            rechnerName="Heizkosten-Rechner"
            eingaben={{
              wohnflaeche: parseDeutscheZahl(wohnflaeche),
              energietraeger,
              verbrauchProQm: parseDeutscheZahl(verbrauch),
              preisProKwh: parseDeutscheZahl(preis),
            }}
            ergebnis={{
              kostenJahr: ergebnis.kostenJahr,
              kostenMonat: ergebnis.kostenMonat,
              kostenProQm: ergebnis.kostenProQm,
              verbrauchGesamt: ergebnis.verbrauchGesamt,
            }}
          />

          {/* Vergleichstabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Energieträger-Vergleich für {parseDeutscheZahl(wohnflaeche).toLocaleString('de-DE')} m²</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <th className="text-left px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">Energieträger</th>
                    <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">ct/kWh</th>
                    <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">Kosten/Jahr</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {alle.map(e => {
                    const fl = parseDeutscheZahl(wohnflaeche);
                    const kosten = fl * e.verbrauch * (e.preis / 100);
                    return (
                      <tr key={e.key} className={energietraeger === e.key ? 'bg-primary-50/50 dark:bg-primary-500/5' : ''}>
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                          {e.label} {energietraeger === e.key && '←'}
                        </td>
                        <td className="px-4 py-2.5 text-right text-gray-600 dark:text-gray-400">{e.preis} ct</td>
                        <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">{fmt(kosten)} €</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {ergebnis && (
        <AffiliateBox programId="check24" context="heizkosten" />
      )}
    </div>
  );
}
