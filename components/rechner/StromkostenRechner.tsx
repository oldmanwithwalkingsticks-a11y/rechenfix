'use client';

import { useState, useMemo } from 'react';
import { berechneStromkosten } from '@/lib/berechnungen/stromkosten';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import StromSpartipp from '@/components/rechner/StromSpartipp';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const SCHNELLWAHL = [
  { label: '1 Person', kwh: '1500' },
  { label: '2 Personen', kwh: '2500' },
  { label: '3 Personen', kwh: '3500' },
  { label: '4 Personen', kwh: '4500' },
];

export default function StromkostenRechner() {
  const [verbrauch, setVerbrauch] = useState('2500');
  const [preisProKwh, setPreisProKwh] = useState('36');
  const [grundpreis, setGrundpreis] = useState('12');

  const ergebnis = useMemo(
    () => berechneStromkosten({
      verbrauch: parseDeutscheZahl(verbrauch),
      preisProKwh: parseDeutscheZahl(preisProKwh),
      grundpreis: parseDeutscheZahl(grundpreis),
    }),
    [verbrauch, preisProKwh, grundpreis]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Schnellwahl */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Haushaltsgröße (Schnellwahl)</label>
        <div className="flex gap-2">
          {SCHNELLWAHL.map(s => (
            <button
              key={s.kwh}
              onClick={() => setVerbrauch(s.kwh)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                verbrauch === s.kwh
                  ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 ring-1 ring-primary-300 dark:ring-primary-500/40'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stromverbrauch pro Jahr</label>
        <NummerEingabe value={verbrauch} onChange={setVerbrauch} placeholder="2500" einheit="kWh" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Arbeitspreis</label>
          <NummerEingabe value={preisProKwh} onChange={setPreisProKwh} placeholder="36" einheit="ct/kWh" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grundpreis</label>
          <NummerEingabe value={grundpreis} onChange={setGrundpreis} placeholder="12" einheit="€/Monat" />
        </div>
      </div>

      {ergebnis && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Stromkosten pro Jahr</p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">{fmt(ergebnis.kostenJahr)} €</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Monat</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.kostenMonat)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Tag</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.kostenTag)} €</p>
            </div>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Stromkosten pro Jahr: ${fmt(ergebnis.kostenJahr)} € (${fmt(ergebnis.kostenMonat)} €/Monat, ${fmt(ergebnis.kostenTag)} €/Tag)`}
            seitenTitel="Stromkostenrechner"
          />
          <div className="flex flex-wrap gap-3">
            <AiExplain
              rechnerName="Stromkosten-Rechner"
              eingaben={{
                verbrauchKwh: parseDeutscheZahl(verbrauch),
                arbeitspreisCtKwh: parseDeutscheZahl(preisProKwh),
                grundpreisMonat: parseDeutscheZahl(grundpreis),
              }}
              ergebnis={{
                kostenJahr: ergebnis.kostenJahr,
                kostenMonat: ergebnis.kostenMonat,
                kostenTag: ergebnis.kostenTag,
                arbeitspreis: ergebnis.arbeitspreis,
                grundpreisJahr: ergebnis.grundpreisJahr,
                kostenProKwh: ergebnis.kostenProKwh,
              }}
            />
            <StromSpartipp
              eingaben={{
                verbrauchKwh: parseDeutscheZahl(verbrauch),
                arbeitspreisCtKwh: parseDeutscheZahl(preisProKwh),
                grundpreisMonat: parseDeutscheZahl(grundpreis),
              }}
              ergebnis={{
                kostenJahr: ergebnis.kostenJahr,
                kostenMonat: ergebnis.kostenMonat,
                kostenTag: ergebnis.kostenTag,
                arbeitspreis: ergebnis.arbeitspreis,
                grundpreisJahr: ergebnis.grundpreisJahr,
                kostenProKwh: ergebnis.kostenProKwh,
              }}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Arbeitspreis ({parseDeutscheZahl(verbrauch).toLocaleString('de-DE')} kWh)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.arbeitspreis)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Grundpreis (12 Monate)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.grundpreisJahr)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Effektiver Preis pro kWh</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.kostenProKwh.toLocaleString('de-DE')} ct</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Gesamtkosten/Jahr</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.kostenJahr)} €</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Durchschnittlicher Stromverbrauch in Deutschland</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    ['1-Personen-Haushalt', '1.500 kWh'],
                    ['2-Personen-Haushalt', '2.500 kWh'],
                    ['3-Personen-Haushalt', '3.500 kWh'],
                    ['4-Personen-Haushalt', '4.500 kWh'],
                    ['5-Personen-Haushalt', '5.500 kWh'],
                  ].map(([label, wert]) => (
                    <tr key={label}>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{label}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">{wert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {ergebnis && (
        <>
          <CrossLink href="/wohnen/stromvergleich-rechner" emoji="🔌" text="Stromanbieter wechseln und bis zu 500 € sparen" />
          <CrossLink href="/wohnen/photovoltaik-rechner" emoji="☀️" text="Eigenen Strom produzieren mit PV-Anlage" />
          <AffiliateBox programId="check24" context="strom" />
        </>
      )}
    </div>
  );
}
