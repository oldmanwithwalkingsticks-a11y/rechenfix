'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type Fahrprofil = 'stadt' | 'gemischt' | 'autobahn';
type TempBereich = 'unter0' | '0bis10' | '10bis25' | 'ueber25';

const FAHRPROFIL_FAKTOR: Record<Fahrprofil, number> = {
  stadt: 1.05,
  gemischt: 0.85,
  autobahn: 0.70,
};

const TEMP_FAKTOR: Record<TempBereich, number> = {
  unter0: 0.70,
  '0bis10': 0.85,
  '10bis25': 1.00,
  ueber25: 0.90,
};

const TEMP_LABEL: Record<TempBereich, string> = {
  unter0: 'Unter 0 °C',
  '0bis10': '0 – 10 °C',
  '10bis25': '10 – 25 °C',
  ueber25: 'Über 25 °C (mit Klima)',
};

export default function ReichweitenRechner() {
  const [akku, setAkku] = useState('60');
  const [wltp, setWltp] = useState('400');
  const [profil, setProfil] = useState<Fahrprofil>('gemischt');
  const [temp, setTemp] = useState<TempBereich>('10bis25');
  const [klima, setKlima] = useState(false);
  const [strompreis, setStrompreis] = useState('32');

  const nAkku = parseDeutscheZahl(akku);
  const nWltp = parseDeutscheZahl(wltp);
  const nPreis = parseDeutscheZahl(strompreis);

  const ergebnis = useMemo(() => {
    if (nAkku <= 0 || nWltp <= 0) {
      return null;
    }
    const wltpVerbrauch = (nAkku / nWltp) * 100; // kWh/100km WLTP
    const gesamtFaktor = FAHRPROFIL_FAKTOR[profil] * TEMP_FAKTOR[temp] * (klima ? 0.90 : 1.00);
    const realVerbrauch = wltpVerbrauch / gesamtFaktor;
    const realReichweite = (nAkku / realVerbrauch) * 100;
    const ladekosten100 = (realVerbrauch * nPreis) / 100;
    const ladekostenVoll = (nAkku * nPreis) / 100;
    const verlust = nWltp - realReichweite;
    const verlustProzent = (verlust / nWltp) * 100;
    return {
      wltpVerbrauch,
      realVerbrauch,
      realReichweite,
      ladekosten100,
      ladekostenVoll,
      verlust,
      verlustProzent,
    };
  }, [nAkku, nWltp, profil, temp, klima, nPreis]);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* Akku */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Akkukapazität</label>
        <NummerEingabe value={akku} onChange={setAkku} placeholder="60" einheit="kWh" />
        <div className="flex flex-wrap gap-2 mt-2">
          {['40', '60', '77', '100'].map(v => (
            <button
              key={v}
              onClick={() => setAkku(v)}
              className={`px-3 py-1.5 text-xs rounded-lg ${akku === v ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
            >
              {v} kWh
            </button>
          ))}
        </div>
      </div>

      {/* WLTP */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WLTP-Reichweite (Herstellerangabe)</label>
        <NummerEingabe value={wltp} onChange={setWltp} placeholder="400" einheit="km" />
      </div>

      {/* Fahrprofil */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fahrprofil</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { val: 'stadt' as Fahrprofil, label: 'Stadt' },
            { val: 'gemischt' as Fahrprofil, label: 'Gemischt' },
            { val: 'autobahn' as Fahrprofil, label: 'Autobahn' },
          ].map(opt => (
            <button
              key={opt.val}
              onClick={() => setProfil(opt.val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                profil === opt.val
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Temperatur */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Außentemperatur</label>
        <select
          value={temp}
          onChange={e => setTemp(e.target.value as TempBereich)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {(Object.keys(TEMP_LABEL) as TempBereich[]).map(k => (
            <option key={k} value={k}>{TEMP_LABEL[k]}</option>
          ))}
        </select>
      </div>

      {/* Klima */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Heizung / Klimaanlage</label>
        <div className="flex gap-2">
          {[
            { val: false, label: 'Aus' },
            { val: true, label: 'An (−10 %)' },
          ].map(opt => (
            <button
              key={String(opt.val)}
              onClick={() => setKlima(opt.val)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                klima === opt.val
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Strompreis */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Strompreis</label>
        <NummerEingabe value={strompreis} onChange={setStrompreis} placeholder="32" einheit="ct/kWh" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Haushaltsstrom ≈ 32 ct, Wallbox-Sondertarif ≈ 28 ct, öffentlich AC ≈ 45 ct, DC-Schnelllader ≈ 60 ct.</p>
      </div>

      {ergebnis && (
        <>
          {/* Ergebnis */}
          <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)' }}>
            <p className="text-white/90 text-sm mb-1">Reale Reichweite</p>
            <p className="text-5xl font-bold">{fmt0(ergebnis.realReichweite)} km</p>
            <p className="text-white/90 text-sm mt-2">
              {fmt0(ergebnis.verlust)} km weniger als WLTP ({fmt0(ergebnis.verlustProzent)} % Abschlag)
            </p>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Details</h2>
            <table className="w-full text-sm">
              <tbody>
                <tr className="text-gray-600 dark:text-gray-400">
                  <td className="py-2">WLTP-Verbrauch</td>
                  <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt(ergebnis.wltpVerbrauch)} kWh/100 km</td>
                </tr>
                <tr className="text-gray-600 dark:text-gray-400">
                  <td className="py-2">Realer Verbrauch</td>
                  <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt(ergebnis.realVerbrauch)} kWh/100 km</td>
                </tr>
                <tr className="text-gray-600 dark:text-gray-400">
                  <td className="py-2">Ladekosten pro 100 km</td>
                  <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt(ergebnis.ladekosten100)} €</td>
                </tr>
                <tr className="text-gray-600 dark:text-gray-400">
                  <td className="py-2">Volle Ladung ({fmt0(nAkku)} kWh)</td>
                  <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt(ergebnis.ladekostenVoll)} €</td>
                </tr>
                <tr className="border-t-2 border-primary-200 dark:border-primary-500/40 font-bold">
                  <td className="py-2 text-primary-700 dark:text-primary-300">WLTP vs. Real</td>
                  <td className="py-2 text-right text-primary-700 dark:text-primary-300 tabular-nums">{fmt0(nWltp)} km → {fmt0(ergebnis.realReichweite)} km</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      <CrossLink href="/auto/autokosten-rechner" emoji="🚗" text="Autokosten-Rechner: Alle Kosten inkl. Wertverlust" />
      <CrossLink href="/wohnen/stromkosten-rechner" emoji="💡" text="Stromkosten-Rechner: Jahresverbrauch und Kosten" />
      <CrossLink href="/auto/kfz-steuer-rechner" emoji="📄" text="Kfz-Steuer-Rechner: Steuer für E-Autos und Verbrenner" />

      <ErgebnisAktionen
        ergebnisText={
          ergebnis
            ? `E-Auto-Reichweite: ${fmt0(ergebnis.realReichweite)} km real (WLTP ${fmt0(nWltp)} km) bei ${fmt(ergebnis.realVerbrauch)} kWh/100 km — Ladekosten ${fmt(ergebnis.ladekosten100)} €/100 km`
            : 'Bitte Akkukapazität und WLTP-Reichweite angeben.'
        }
        seitenTitel="Reichweiten-Rechner E-Auto"
      />

      <AffiliateBox programId="check24" context="eauto" />

      <AiExplain
        rechnerName="Reichweiten-Rechner E-Auto"
        eingaben={{
          akkukapazitaetKwh: fmt0(nAkku),
          wltpKm: fmt0(nWltp),
          fahrprofil: profil,
          temperatur: TEMP_LABEL[temp],
          klimaHeizung: klima ? 'An' : 'Aus',
          strompreisCtProKwh: fmt(nPreis),
        }}
        ergebnis={
          ergebnis
            ? {
                realReichweiteKm: fmt0(ergebnis.realReichweite),
                realVerbrauchKwhPro100Km: fmt(ergebnis.realVerbrauch),
                wltpVerbrauchKwhPro100Km: fmt(ergebnis.wltpVerbrauch),
                ladekosten100KmEuro: fmt(ergebnis.ladekosten100),
                ladekostenVollEuro: fmt(ergebnis.ladekostenVoll),
                abschlagProzent: fmt0(ergebnis.verlustProzent),
              }
            : { hinweis: 'Keine Eingabe' }
        }
      />
    </div>
  );
}
