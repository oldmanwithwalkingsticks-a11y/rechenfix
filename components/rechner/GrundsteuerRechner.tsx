'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import {
  berechneGrundsteuer,
  type GrundsteuerModell,
  type Grundstuecksart,
} from '@/lib/berechnungen/grundsteuer';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

type Modell = GrundsteuerModell;

export default function GrundsteuerRechner() {
  const [modell, setModell] = useState<Modell>('bund');
  const [art, setArt] = useState<Grundstuecksart>('etw');
  const [bodenrichtwert, setBodenrichtwert] = useState('200');
  const [grundflaeche, setGrundflaeche] = useState('400');
  const [wohnflaeche, setWohnflaeche] = useState('120');
  const [baujahr, setBaujahr] = useState('1990');
  const [hebesatz, setHebesatz] = useState('500');

  const ergebnis = useMemo(
    () =>
      berechneGrundsteuer({
        modell,
        art,
        bodenrichtwert: parseDeutscheZahl(bodenrichtwert) || 0,
        grundflaeche: parseDeutscheZahl(grundflaeche) || 0,
        wohnflaeche: parseDeutscheZahl(wohnflaeche) || 0,
        baujahr: parseDeutscheZahl(baujahr) || 2000,
        hebesatz: parseDeutscheZahl(hebesatz) || 0,
      }),
    [modell, art, bodenrichtwert, grundflaeche, wohnflaeche, baujahr, hebesatz],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtEuro2 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* 1: Modell */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Berechnungsmodell
        </h2>
        <RadioToggleGroup
          name="grundsteuer-modell"
          legend="Berechnungsmodell"
          srOnlyLegend
          options={[
            { value: 'bund', label: 'Bundesmodell', description: 'Die meisten Länder' },
            { value: 'bayern', label: 'Bayern', description: 'Flächenmodell' },
            { value: 'bw', label: 'Baden-Württemberg', description: 'Bodenwertmodell' },
          ]}
          value={modell}
          onChange={(v) => setModell(v as Modell)}
          columns={3}
        />
      </div>

      {/* 2: Grundstücksart */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Grundstücksart
        </h2>
        <select id="grundsteuer-select-1" aria-label="Grundstücksart"
          value={art}
          onChange={e => setArt(e.target.value as Grundstuecksart)}
          className="w-full min-h-[48px] px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200"
        >
          <option value="efh">Ein-/Zweifamilienhaus</option>
          <option value="etw">Eigentumswohnung</option>
          <option value="miet">Mietwohngrundstück</option>
          <option value="unbebaut">Unbebautes Grundstück</option>
        </select>
      </div>

      {/* 3: Bodenrichtwert */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Bodenrichtwert
        </h2>
        <NummerEingabe value={bodenrichtwert} onChange={setBodenrichtwert} placeholder="200" einheit="€/m²" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Finden Sie auf boris.de oder beim Gutachterausschuss Ihrer Gemeinde.</p>
      </div>

      {/* 4: Grundfläche */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Grundstücksfläche
        </h2>
        <NummerEingabe value={grundflaeche} onChange={setGrundflaeche} placeholder="400" einheit="m²" />
      </div>

      {art !== 'unbebaut' && (
        <>
          {/* 5: Wohnfläche */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
              Wohnfläche
            </h2>
            <NummerEingabe value={wohnflaeche} onChange={setWohnflaeche} placeholder="120" einheit="m²" />
          </div>

          {/* 6: Baujahr */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">6</span>
              Baujahr
            </h2>
            <NummerEingabe value={baujahr} onChange={setBaujahr} placeholder="1990" einheit="" />
          </div>
        </>
      )}

      {/* 7: Hebesatz */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">7</span>
          Hebesatz der Gemeinde
        </h2>
        <NummerEingabe value={hebesatz} onChange={setHebesatz} placeholder="500" einheit="%" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Finden Sie auf der Website Ihrer Gemeinde. Durchschnitt: ca. 500 %.</p>
      </div>

      {/* ERGEBNIS */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Grundsteuer pro Jahr</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.grundsteuerJahr)} €</p>
        <p className="text-white/80 text-sm mt-1">
          Vierteljährlich: <strong>{fmtEuro2(ergebnis.quartal)} €</strong> · Monatlich: <strong>{fmtEuro2(ergebnis.monat)} €</strong>
        </p>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h2>
        </div>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Grundsteuerwert</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.grundsteuerwert)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Steuermessbetrag</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro2(ergebnis.messbetrag)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">× Hebesatz {parseDeutscheZahl(hebesatz)} %</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro2(ergebnis.grundsteuerJahr)} €</td>
            </tr>
            <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
              <td className="px-4 py-3 text-blue-800 dark:text-blue-300">= Grundsteuer / Jahr</td>
              <td className="px-4 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.grundsteuerJahr)} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Stark vereinfachte Berechnung. Der tatsächliche Grundsteuerwert wird vom Finanzamt festgestellt und kann abweichen.
        </p>
      </div>

      <CrossLink href="/wohnen/grunderwerbsteuer-rechner" emoji="🏠" text="Beim Kauf: Grunderwerbsteuer berechnen" />
      <CrossLink href="/wohnen/baufinanzierung-rechner" emoji="💰" text="Baufinanzierung berechnen" />
      <CrossLink href="/wohnen/nebenkosten-rechner" emoji="📊" text="Nebenkosten berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Grundsteuer 2026 (${modell === 'bund' ? 'Bundesmodell' : modell === 'bayern' ? 'Bayern' : 'BW'}): ${fmtEuro(ergebnis.grundsteuerJahr)} €/Jahr | Grundsteuerwert ${fmtEuro(ergebnis.grundsteuerwert)} € | Messbetrag ${fmtEuro2(ergebnis.messbetrag)} € × Hebesatz ${parseDeutscheZahl(hebesatz)} %`}
        seitenTitel="Grundsteuer-Rechner"
      />

      <AiExplain
        rechnerName="Grundsteuer-Rechner"
        eingaben={{
          modell,
          art,
          bodenrichtwert: `${bodenrichtwert} €/m²`,
          grundflaeche: `${grundflaeche} m²`,
          wohnflaeche: `${wohnflaeche} m²`,
          baujahr,
          hebesatz: `${hebesatz} %`,
        }}
        ergebnis={{
          grundsteuerwert: `${fmtEuro(ergebnis.grundsteuerwert)} €`,
          messbetrag: `${fmtEuro2(ergebnis.messbetrag)} €`,
          grundsteuerJahr: `${fmtEuro(ergebnis.grundsteuerJahr)} €`,
        }}
      />
    </div>
  );
}
