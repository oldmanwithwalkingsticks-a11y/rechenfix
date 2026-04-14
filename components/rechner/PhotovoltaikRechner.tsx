'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';

const AUSRICHTUNGEN = [
  { id: 'sued', label: 'Süd (optimal)', faktor: 1.0 },
  { id: 'swso', label: 'Süd-West / Süd-Ost', faktor: 0.95 },
  { id: 'wo', label: 'West / Ost', faktor: 0.85 },
  { id: 'nwno', label: 'Nord-West / Nord-Ost', faktor: 0.65 },
  { id: 'nord', label: 'Nord', faktor: 0.55 },
];

const NEIGUNGEN = [
  { id: 'flach', label: 'Flachdach (0–10°)', faktor: 0.87 },
  { id: 'leicht', label: 'Leicht geneigt (15–25°)', faktor: 0.95 },
  { id: 'optimal', label: 'Optimal (30–35°)', faktor: 1.0 },
  { id: 'steil', label: 'Steil (40–50°)', faktor: 0.95 },
  { id: 'sehrsteil', label: 'Sehr steil (>50°)', faktor: 0.85 },
];

const fmt = (n: number, d = 0) => n.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtEur = (n: number) => fmt(Math.round(n)) + ' €';

export default function PhotovoltaikRechner() {
  const [dachflaeche, setDachflaeche] = useState('40');
  const [ausrichtung, setAusrichtung] = useState('sued');
  const [neigung, setNeigung] = useState('optimal');
  const [verbrauch, setVerbrauch] = useState('4000');
  const [strompreis, setStrompreis] = useState('32');
  const [kwp, setKwp] = useState('');
  const [kosten, setKosten] = useState('');
  const [mitSpeicher, setMitSpeicher] = useState(false);
  const [speicherKwh, setSpeicherKwh] = useState('8');
  const [speicherKostenProKwh, setSpeicherKostenProKwh] = useState('800');

  const ergebnis = useMemo(() => {
    const dach = parseDeutscheZahl(dachflaeche) || 0;
    const verb = parseDeutscheZahl(verbrauch) || 0;
    const preis = parseDeutscheZahl(strompreis) || 0;

    const kwpAuto = dach / 5.5;
    const kwpWert = parseDeutscheZahl(kwp) || kwpAuto;
    const kostenAuto = kwpWert * 1300;
    const kostenWert = parseDeutscheZahl(kosten) || kostenAuto;

    const aFaktor = AUSRICHTUNGEN.find(a => a.id === ausrichtung)?.faktor || 1;
    const nFaktor = NEIGUNGEN.find(n => n.id === neigung)?.faktor || 1;
    const ausrichtungsfaktor = aFaktor * nFaktor;

    const bruttoErtrag = kwpWert * 1000 * ausrichtungsfaktor;
    const nettoErtrag = bruttoErtrag * 0.85;

    // Eigenverbrauchsquote
    let quote: number;
    if (mitSpeicher) {
      quote = Math.min(0.75, 0.6 + (parseDeutscheZahl(speicherKwh) || 0) * 0.015);
    } else {
      if (nettoErtrag === 0) quote = 0;
      else quote = Math.min(0.4, Math.max(0.25, 0.3 * (verb / nettoErtrag)));
    }

    const eigenverbrauch = nettoErtrag * quote;
    const einspeisung = Math.max(0, nettoErtrag - eigenverbrauch);
    const rest = Math.max(0, verb - eigenverbrauch);

    // Einspeisevergütung 2026: 8,03 ct/kWh bis 10 kWp, darüber 6,95 ct/kWh
    let verguetungCt: number;
    if (kwpWert <= 10) {
      verguetungCt = 8.03;
    } else {
      const bis10Anteil = 10 / kwpWert;
      verguetungCt = bis10Anteil * 8.03 + (1 - bis10Anteil) * 6.95;
    }

    const ersparnis = eigenverbrauch * preis / 100;
    const einnahmen = einspeisung * verguetungCt / 100;

    const speicherKosten = mitSpeicher
      ? (parseDeutscheZahl(speicherKwh) || 0) * (parseDeutscheZahl(speicherKostenProKwh) || 0)
      : 0;
    const gesamtInvest = kostenWert + speicherKosten;
    const wartung = gesamtInvest * 0.015;
    const gesamtertrag = ersparnis + einnahmen;
    const nettoertrag = gesamtertrag - wartung;
    const amortisation = nettoertrag > 0 ? gesamtInvest / nettoertrag : 0;
    const gewinn20 = nettoertrag * 20 - gesamtInvest;

    const co2 = nettoErtrag * 0.38 / 1000; // Tonnen

    return {
      kwpWert,
      kostenWert,
      bruttoErtrag,
      nettoErtrag,
      quote,
      eigenverbrauch,
      einspeisung,
      rest,
      ersparnis,
      einnahmen,
      wartung,
      nettoertrag,
      gesamtInvest,
      amortisation,
      gewinn20,
      co2,
      verguetungCt,
    };
  }, [dachflaeche, ausrichtung, neigung, verbrauch, strompreis, kwp, kosten, mitSpeicher, speicherKwh, speicherKostenProKwh]);

  return (
    <div>
      <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Verfügbare Dachfläche</label>
          <NummerEingabe value={dachflaeche} onChange={setDachflaeche} einheit="m²" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Dachausrichtung</label>
          <select value={ausrichtung} onChange={e => setAusrichtung(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {AUSRICHTUNGEN.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Dachneigung</label>
          <select value={neigung} onChange={e => setNeigung(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {NEIGUNGEN.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Jährlicher Stromverbrauch</label>
          <NummerEingabe value={verbrauch} onChange={setVerbrauch} einheit="kWh" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[{ l: '1 Pers.', v: '2000' }, { l: '2 Pers.', v: '3500' }, { l: '3–4 Pers.', v: '4500' }, { l: '5+ Pers.', v: '6000' }].map(p => (
              <button key={p.v} onClick={() => setVerbrauch(p.v)} className="text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 hover:border-primary-400">{p.l}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Aktueller Strompreis</label>
          <NummerEingabe value={strompreis} onChange={setStrompreis} einheit="ct/kWh" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Anlagengröße (leer = automatisch)</label>
          <NummerEingabe value={kwp} onChange={setKwp} einheit="kWp" placeholder={`Ø ${fmt(ergebnis.kwpWert, 1)}`} />
          <div className="flex flex-wrap gap-2 mt-2">
            {['5', '8', '10', '15'].map(v => (
              <button key={v} onClick={() => setKwp(v)} className="text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 hover:border-primary-400">{v} kWp</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Anlagenkosten (leer = ca. 1.300 €/kWp)</label>
          <NummerEingabe value={kosten} onChange={setKosten} einheit="€" placeholder={`Ø ${fmt(ergebnis.kostenWert)}`} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Batteriespeicher?</label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setMitSpeicher(false)} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${!mitSpeicher ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>Ohne Speicher</button>
            <button onClick={() => setMitSpeicher(true)} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${mitSpeicher ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>Mit Speicher</button>
          </div>
        </div>
        {mitSpeicher && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Speicherkapazität</label>
              <NummerEingabe value={speicherKwh} onChange={setSpeicherKwh} einheit="kWh" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Speicherkosten</label>
              <NummerEingabe value={speicherKostenProKwh} onChange={setSpeicherKostenProKwh} einheit="€/kWh" />
            </div>
          </div>
        )}
      </div>

      {/* Haupt-Ergebnis */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Amortisation nach ca.</p>
        <p className="text-5xl font-bold">
          {ergebnis.amortisation > 0 ? `${fmt(ergebnis.amortisation, 1)} Jahren` : '—'}
        </p>
        <p className="text-white/80 text-sm mt-2">
          Jahresertrag: {fmt(ergebnis.nettoErtrag)} kWh · Eigenverbrauch: {Math.round(ergebnis.quote * 100)}%
        </p>
      </div>

      {/* Ertrags-Übersicht */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Ertrags-Übersicht (pro Jahr)</h3>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            <tr><td className="py-1.5 text-gray-600 dark:text-gray-400">PV-Ertrag</td><td className="py-1.5 text-right font-medium">{fmt(ergebnis.nettoErtrag)} kWh</td></tr>
            <tr><td className="py-1.5 text-gray-600 dark:text-gray-400">Eigenverbrauch ({Math.round(ergebnis.quote * 100)}%)</td><td className="py-1.5 text-right font-medium">{fmt(ergebnis.eigenverbrauch)} kWh</td></tr>
            <tr><td className="py-1.5 text-gray-600 dark:text-gray-400">Einspeisung</td><td className="py-1.5 text-right font-medium">{fmt(ergebnis.einspeisung)} kWh</td></tr>
            <tr><td className="py-1.5 text-gray-600 dark:text-gray-400">Reststrombedarf</td><td className="py-1.5 text-right font-medium">{fmt(ergebnis.rest)} kWh</td></tr>
          </tbody>
        </table>
      </div>

      {/* Finanz-Übersicht */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Finanz-Übersicht</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-500">
              <th></th>
              <th className="text-right font-normal">pro Jahr</th>
              <th className="text-right font-normal">über 20 Jahre</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            <tr><td className="py-1.5 text-gray-600 dark:text-gray-400">Ersparnis Eigenverbrauch</td><td className="py-1.5 text-right">{fmtEur(ergebnis.ersparnis)}</td><td className="py-1.5 text-right">{fmtEur(ergebnis.ersparnis * 20)}</td></tr>
            <tr><td className="py-1.5 text-gray-600 dark:text-gray-400">Einspeisung ({fmt(ergebnis.verguetungCt, 2)} ct/kWh)</td><td className="py-1.5 text-right">{fmtEur(ergebnis.einnahmen)}</td><td className="py-1.5 text-right">{fmtEur(ergebnis.einnahmen * 20)}</td></tr>
            <tr><td className="py-1.5 text-gray-600 dark:text-gray-400">Wartung</td><td className="py-1.5 text-right">−{fmtEur(ergebnis.wartung)}</td><td className="py-1.5 text-right">−{fmtEur(ergebnis.wartung * 20)}</td></tr>
            <tr className="font-semibold"><td className="py-1.5">Nettoertrag</td><td className="py-1.5 text-right text-green-600 dark:text-green-400">{fmtEur(ergebnis.nettoertrag)}</td><td className="py-1.5 text-right text-green-600 dark:text-green-400">{fmtEur(ergebnis.nettoertrag * 20)}</td></tr>
            <tr><td className="py-1.5 text-gray-600 dark:text-gray-400">Investition</td><td className="py-1.5 text-right">—</td><td className="py-1.5 text-right">−{fmtEur(ergebnis.gesamtInvest)}</td></tr>
            <tr className="font-bold"><td className="py-2">Gewinn nach 20 Jahren</td><td></td><td className={`py-2 text-right ${ergebnis.gewinn20 >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{fmtEur(ergebnis.gewinn20)}</td></tr>
          </tbody>
        </table>
      </div>

      {/* CO2 */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4 mb-4">
        <p className="text-sm text-green-800 dark:text-green-200">
          🌱 Jährliche CO₂-Ersparnis: <strong>{fmt(ergebnis.co2, 2)} Tonnen</strong>
        </p>
      </div>

      <p className="text-xs text-gray-500 mb-6">
        ⚠️ Vereinfachte Berechnung. Der tatsächliche Ertrag hängt von Standort, Verschattung und Wetterbedingungen ab. Lassen Sie sich ein individuelles Angebot erstellen.
      </p>

      <AffiliateBox programId="check24" context="photovoltaik" />

      <ErgebnisAktionen
        ergebnisText={`PV-Anlage ${fmt(ergebnis.kwpWert, 1)} kWp — Amortisation: ${fmt(ergebnis.amortisation, 1)} Jahre, Gewinn nach 20 Jahren: ${fmtEur(ergebnis.gewinn20)}`}
        seitenTitel="Photovoltaik-Rechner"
      />

      <AiExplain
        rechnerName="Photovoltaik-Rechner"
        eingaben={{
          Dachfläche: `${dachflaeche} m²`,
          Anlagengröße: `${fmt(ergebnis.kwpWert, 1)} kWp`,
          Stromverbrauch: `${verbrauch} kWh`,
          Strompreis: `${strompreis} ct/kWh`,
          Speicher: mitSpeicher ? `${speicherKwh} kWh` : 'Nein',
        }}
        ergebnis={{
          Jahresertrag: `${fmt(ergebnis.nettoErtrag)} kWh`,
          'Amortisation': `${fmt(ergebnis.amortisation, 1)} Jahre`,
          'Gewinn 20 Jahre': fmtEur(ergebnis.gewinn20),
          'CO₂/Jahr': `${fmt(ergebnis.co2, 2)} t`,
        }}
      />
    </div>
  );
}
