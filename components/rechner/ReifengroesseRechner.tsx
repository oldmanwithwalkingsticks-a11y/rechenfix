'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const d1 = (n: number): string => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const d0 = (n: number): string => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

function reifenMasse(breite: number, querschnitt: number, zoll: number) {
  const flanke = (breite * querschnitt) / 100;
  const durchmesser = zoll * 25.4 + 2 * flanke;
  const umfang = Math.PI * durchmesser;
  const abrollumfang = umfang * 0.97;
  return { flanke, durchmesser, umfang, abrollumfang };
}

// Referenz-Alternativgrößen zur „alten" Größe
const VERGLEICHS_GROESSEN: Array<{ b: number; q: number; z: number }> = [
  { b: 195, q: 65, z: 15 },
  { b: 205, q: 55, z: 16 },
  { b: 215, q: 55, z: 16 },
  { b: 225, q: 45, z: 17 },
  { b: 225, q: 50, z: 17 },
  { b: 235, q: 45, z: 18 },
];

export default function ReifengroesseRechner() {
  const [bAlt, setBAlt] = useState('205');
  const [qAlt, setQAlt] = useState('55');
  const [zAlt, setZAlt] = useState('16');
  const [bNeu, setBNeu] = useState('225');
  const [qNeu, setQNeu] = useState('45');
  const [zNeu, setZNeu] = useState('17');
  const [tacho, setTacho] = useState('100');

  const ergebnis = useMemo(() => {
    const ba = parseDeutscheZahl(bAlt), qa = parseDeutscheZahl(qAlt), za = parseDeutscheZahl(zAlt);
    const bn = parseDeutscheZahl(bNeu), qn = parseDeutscheZahl(qNeu), zn = parseDeutscheZahl(zNeu);
    const t = parseDeutscheZahl(tacho);
    if (ba <= 0 || qa <= 0 || za <= 0 || bn <= 0 || qn <= 0 || zn <= 0) return null;
    const alt = reifenMasse(ba, qa, za);
    const neu = reifenMasse(bn, qn, zn);
    const abweichung = (neu.durchmesser / alt.durchmesser - 1) * 100;
    const realeGeschw = t * (neu.durchmesser / alt.durchmesser);
    const grenzwertig = Math.abs(abweichung) > 2;
    return { alt, neu, abweichung, realeGeschw, tacho: t, grenzwertig, ba, qa, za, bn, qn, zn };
  }, [bAlt, qAlt, zAlt, bNeu, qNeu, zNeu, tacho]);

  const feldGruppe = (
    titel: string,
    nummer: string,
    b: string, setB: (v: string) => void,
    q: string, setQ: (v: string) => void,
    z: string, setZ: (v: string) => void,
    idPrefix: string,
  ) => (
    <div className="mb-6">
      <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
        <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">{nummer}</span>
        {titel}
      </h2>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label htmlFor={`${idPrefix}-b`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Breite (mm)</label>
          <NummerEingabe value={b} onChange={setB} placeholder="205" />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-q`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Querschnitt (%)</label>
          <NummerEingabe value={q} onChange={setQ} placeholder="55" />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-z`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Zoll (R)</label>
          <NummerEingabe value={z} onChange={setZ} placeholder="16" />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {feldGruppe('Reifen alt', '1', bAlt, setBAlt, qAlt, setQAlt, zAlt, setZAlt, 'alt')}
      {feldGruppe('Reifen neu', '2', bNeu, setBNeu, qNeu, setQNeu, zNeu, setZNeu, 'neu')}

      {/* Tacho-Anzeige */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Tacho-Anzeige (km/h)
        </h2>
        <NummerEingabe value={tacho} onChange={setTacho} placeholder="100" einheit="km/h" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Zeigt die reale Geschwindigkeit mit dem neuen Reifen bei dieser Tacho-Anzeige.
        </p>
      </div>

      {ergebnis && (
        <>
          {/* === ERGEBNIS === */}
          <div className="result-box mb-4 text-center">
            <p className="text-white/80 text-sm mb-1">Durchmesser-Abweichung (neu ggü. alt)</p>
            <p className="text-5xl font-bold">
              {ergebnis.abweichung >= 0 ? '+' : ''}{d1(ergebnis.abweichung)} %
            </p>
            <p className="text-white/90 text-sm mt-2">
              Bei Tacho {d0(ergebnis.tacho)} km/h real {d1(ergebnis.realeGeschw)} km/h
            </p>
          </div>

          {/* Durchmesser/Abrollumfang beider Reifen */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <th className="px-4 py-2 text-left font-semibold">Reifen</th>
                    <th className="px-4 py-2 text-right font-semibold">Flankenhöhe</th>
                    <th className="px-4 py-2 text-right font-semibold">Durchmesser</th>
                    <th className="px-4 py-2 text-right font-semibold">Abrollumfang</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2.5 whitespace-nowrap text-gray-700 dark:text-gray-300">{d0(ergebnis.ba)}/{d0(ergebnis.qa)} R{d0(ergebnis.za)} <span className="text-gray-400">(alt)</span></td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400 whitespace-nowrap">{d1(ergebnis.alt.flanke)} mm</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{d1(ergebnis.alt.durchmesser)} mm</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{d0(ergebnis.alt.abrollumfang)} mm</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 whitespace-nowrap font-medium text-gray-800 dark:text-gray-200">{d0(ergebnis.bn)}/{d0(ergebnis.qn)} R{d0(ergebnis.zn)} <span className="text-primary-500">(neu)</span></td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400 whitespace-nowrap">{d1(ergebnis.neu.flanke)} mm</td>
                    <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">{d1(ergebnis.neu.durchmesser)} mm</td>
                    <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">{d0(ergebnis.neu.abrollumfang)} mm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Rechenweg (alt):</strong>{' '}
              {d0(ergebnis.za)}×25,4 + 2×({d0(ergebnis.ba)}×{d0(ergebnis.qa)}÷100) = {d1(ergebnis.alt.durchmesser)} mm
            </p>
          </div>

          {/* Ampel / Zulässigkeit */}
          <div className={`rounded-xl p-4 mb-4 border ${ergebnis.grenzwertig ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30' : 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'}`}>
            <p className={`text-sm ${ergebnis.grenzwertig ? 'text-amber-800 dark:text-amber-300' : 'text-green-800 dark:text-green-300'}`}>
              {ergebnis.grenzwertig ? (
                <>
                  <strong>⚠️ Technisch grenzwertig:</strong> Die Durchmesser-Abweichung liegt über der Faustregel von ±2 %.
                  Eine solche Größe braucht eine Eintragung im Fahrzeugschein/CoC oder eine Reifenfreigabe/ABE — sonst Eintragung bei TÜV/DEKRA prüfen.
                </>
              ) : (
                <>
                  <strong>✓ Innerhalb der ±2-%-Faustregel.</strong> Die Abweichung ist technisch gering — trotzdem gilt: verbindlich ist,
                  ob die Größe im Fahrzeugschein/CoC eingetragen ist oder eine Freigabe/ABE vorliegt.
                </>
              )}
            </p>
          </div>

          {/* PFLICHT: Zulassungs-Zeile */}
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-4">
            <p className="text-red-800 dark:text-red-300 text-sm">
              <strong>⚠️ Technische Näherung, keine Zulassung.</strong>{' '}
              Verbindlich ist der Fahrzeugschein/CoC. Der Tacho darf nie zu wenig anzeigen (zulässig höchstens +10 % + 4 km/h) —
              ein größerer Reifen lässt den Tacho nacheilen und kann unzulässig sein. Freigängigkeit, Felgenmaulweite und
              Einpresstiefe sind separat zu prüfen. Angaben ohne Gewähr.
            </p>
          </div>

          {/* Tabelle: Gängige Größen im Vergleich zur alten */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 pt-4 pb-1">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">
                Gängige Größen ggü. {d0(ergebnis.ba)}/{d0(ergebnis.qa)} R{d0(ergebnis.za)}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <th className="px-4 py-2 text-left font-semibold">Größe</th>
                    <th className="px-4 py-2 text-right font-semibold">Durchmesser</th>
                    <th className="px-4 py-2 text-right font-semibold">Abweichung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {VERGLEICHS_GROESSEN.map(g => {
                    const m = reifenMasse(g.b, g.q, g.z);
                    const abw = (m.durchmesser / ergebnis.alt.durchmesser - 1) * 100;
                    const grenz = Math.abs(abw) > 2;
                    return (
                      <tr key={`${g.b}-${g.q}-${g.z}`}>
                        <td className="px-4 py-2.5 whitespace-nowrap text-gray-700 dark:text-gray-300">{g.b}/{g.q} R{g.z}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{d1(m.durchmesser)} mm</td>
                        <td className={`px-4 py-2.5 text-right tabular-nums whitespace-nowrap ${grenz ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>
                          {abw >= 0 ? '+' : ''}{d1(abw)} %
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="px-4 pb-3 pt-1 text-xs text-gray-500 dark:text-gray-400">
              Abweichung des Außendurchmessers gegenüber der alten Größe. Ab über ±2 % ist die Größe technisch grenzwertig.
            </p>
          </div>

          <CrossLink href="/auto/bremsweg-rechner" emoji="🛑" text="Bremsweg berechnen" />
          <CrossLink href="/auto/spritkosten-rechner" emoji="⛽" text="Spritkosten berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Reifengrößen-Rechner: ${d0(ergebnis.ba)}/${d0(ergebnis.qa)} R${d0(ergebnis.za)} (Ø ${d1(ergebnis.alt.durchmesser)} mm) → ${d0(ergebnis.bn)}/${d0(ergebnis.qn)} R${d0(ergebnis.zn)} (Ø ${d1(ergebnis.neu.durchmesser)} mm) = ${ergebnis.abweichung >= 0 ? '+' : ''}${d1(ergebnis.abweichung)} %. Bei Tacho ${d0(ergebnis.tacho)} real ${d1(ergebnis.realeGeschw)} km/h. Verbindlich ist der Fahrzeugschein/CoC.`}
            seitenTitel="Reifengrößen-Rechner"
          />

          <AiExplain
            rechnerName="Reifengrößen-Rechner"
            eingaben={{
              reifenAlt: `${d0(ergebnis.ba)}/${d0(ergebnis.qa)} R${d0(ergebnis.za)}`,
              reifenNeu: `${d0(ergebnis.bn)}/${d0(ergebnis.qn)} R${d0(ergebnis.zn)}`,
              tachoAnzeige: `${d0(ergebnis.tacho)} km/h`,
            }}
            ergebnis={{
              durchmesserAlt: `${d1(ergebnis.alt.durchmesser)} mm`,
              durchmesserNeu: `${d1(ergebnis.neu.durchmesser)} mm`,
              abweichung: `${ergebnis.abweichung >= 0 ? '+' : ''}${d1(ergebnis.abweichung)} %`,
              realeGeschwindigkeit: `${d1(ergebnis.realeGeschw)} km/h`,
              hinweis: 'Technische Näherung — verbindlich ist der Fahrzeugschein/CoC, der Tacho darf nie zu wenig anzeigen.',
            }}
          />
        </>
      )}
    </div>
  );
}
