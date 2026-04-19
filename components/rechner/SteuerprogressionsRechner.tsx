'use client';

import { useState, useMemo, useId } from 'react';
import { berechneSteuerprogression } from '@/lib/berechnungen/steuerprogression';
import { BUNDESLAENDER, type Bundesland } from '@/lib/berechnungen/einkommensteuer';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

// SVG chart dimensions
const SVG_W = 600;
const SVG_H = 300;
const PAD_LEFT = 52;
const PAD_RIGHT = 16;
const PAD_TOP = 16;
const PAD_BOTTOM = 40;
const CHART_W = SVG_W - PAD_LEFT - PAD_RIGHT;
const CHART_H = SVG_H - PAD_TOP - PAD_BOTTOM;

const MAX_EINKOMMEN = 200000;
const MAX_SATZ = 50; // %

// Tariff zone boundaries (zvE values)
const ZONEN = [
  { bis: 12096, farbe: '#f0fdf4' },   // Grundfreibetrag (grün)
  { bis: 29538, farbe: '#eff6ff' },   // Zone 1 14-24% (blau)
  { bis: 66153, farbe: '#fefce8' },   // Zone 2 ~24-42% (gelb)
  { bis: 255810, farbe: '#fff7ed' },  // Zone 3 42% (orange)
];

function xPos(einkommen: number): number {
  return PAD_LEFT + (einkommen / MAX_EINKOMMEN) * CHART_W;
}

function yPos(satz: number): number {
  return PAD_TOP + CHART_H - (satz / MAX_SATZ) * CHART_H;
}

function formatEuro(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatEuroFull(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatProzent(n: number, dec = 1): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function SteuerprogressionsRechner() {
  const [zveStr, setZveStr] = useState('50000');
  const [veranlagung, setVeranlagung] = useState<'einzel' | 'splitting'>('einzel');
  const [kirchensteuer, setKirchensteuer] = useState<'nein' | 'ja'>('nein');
  const [bundesland, setBundesland] = useState<Bundesland>('Nordrhein-Westfalen');
  const sliderId = useId();

  const zve = parseDeutscheZahl(zveStr);
  const splitting = veranlagung === 'splitting';
  const hatKirchensteuer = kirchensteuer === 'ja';
  const kistSatzProzent = bundesland === 'Bayern' || bundesland === 'Baden-Württemberg' ? 8 : 9;

  const ergebnis = useMemo(
    () => berechneSteuerprogression(zve, splitting, hatKirchensteuer, bundesland),
    [zve, splitting, hatKirchensteuer, bundesland],
  );

  // Slider sync
  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    setZveStr(val.toLocaleString('de-DE'));
  }

  function handleNummerChange(val: string) {
    setZveStr(val);
  }

  // Chart polyline points
  const durchschnittPoints = useMemo(() => {
    if (!ergebnis) return '';
    return ergebnis.kurvenDaten
      .map(d => `${xPos(d.einkommen)},${yPos(d.durchschnitt)}`)
      .join(' ');
  }, [ergebnis]);

  const grenzPoints = useMemo(() => {
    if (!ergebnis) return '';
    return ergebnis.kurvenDaten
      .map(d => `${xPos(d.einkommen)},${yPos(d.grenz)}`)
      .join(' ');
  }, [ergebnis]);

  // Current zvE x position (clamped)
  const currentX = xPos(Math.min(zve, MAX_EINKOMMEN));
  const currentDurchschnitt = ergebnis ? yPos(ergebnis.durchschnittssteuersatz) : PAD_TOP + CHART_H;
  const currentGrenz = ergebnis ? yPos(ergebnis.grenzsteuersatz) : PAD_TOP + CHART_H;

  // Row closest to input in table
  const closestTableRow = useMemo(() => {
    if (!ergebnis) return -1;
    let minDiff = Infinity;
    let idx = 0;
    ergebnis.tabelleDaten.forEach((row, i) => {
      const diff = Math.abs(row.einkommen - zve);
      if (diff < minDiff) { minDiff = diff; idx = i; }
    });
    return idx;
  }, [ergebnis, zve]);

  // X-Achsen-Labels
  const xLabels = [0, 50000, 100000, 150000, 200000];
  // Y-Achsen-Labels
  const yLabels = [0, 10, 20, 30, 40, 50];

  return (
    <div>
      {/* Eingaben */}
      <div className="space-y-5 mb-6">
        {/* ZvE + Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Zu versteuerndes Einkommen (€/Jahr)
          </label>
          <NummerEingabe
            value={zveStr}
            onChange={handleNummerChange}
            einheit="€"
            placeholder="z.B. 50.000"
          />
          <div className="mt-3">
            <label htmlFor={sliderId} className="sr-only">
              Zu versteuerndes Einkommen per Schieberegler
            </label>
            <input
              id={sliderId}
              type="range"
              min={0}
              max={200000}
              step={1000}
              value={Math.min(Math.max(0, Math.round(zve / 1000) * 1000), 200000)}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary-600"
              aria-label="Zu versteuerndes Einkommen per Schieberegler"
            />
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-500 mt-1">
              <span>0 €</span>
              <span>100.000 €</span>
              <span>200.000 €</span>
            </div>
          </div>
        </div>

        {/* Veranlagung */}
        <RadioToggleGroup
          name="steuerprogression-veranlagung"
          legend="Veranlagung"
          options={[
            { value: 'einzel', label: 'Einzelveranlagung' },
            { value: 'splitting', label: 'Zusammenveranlagung (Splitting)' },
          ]}
          value={veranlagung}
          onChange={(v) => setVeranlagung(v as 'einzel' | 'splitting')}
          columns={2}
        />

        {/* Kirchensteuer */}
        <RadioToggleGroup
          name="steuerprogression-kirchensteuer"
          legend="Kirchensteuer"
          options={[
            { value: 'nein', label: 'Nein' },
            { value: 'ja', label: `Ja (${kistSatzProzent} %)` },
          ]}
          value={kirchensteuer}
          onChange={(v) => setKirchensteuer(v as 'nein' | 'ja')}
          columns={2}
        />

        {hatKirchensteuer && (
          <div>
            <label htmlFor="steuerprogression-bundesland" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bundesland
            </label>
            <select
              id="steuerprogression-bundesland"
              value={bundesland}
              onChange={e => setBundesland(e.target.value as Bundesland)}
              className="w-full sm:w-2/3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm min-h-[48px]"
            >
              {BUNDESLAENDER.map(bl => (
                <option key={bl} value={bl}>{bl}</option>
              ))}
            </select>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Bayern und Baden-Württemberg: 8 %, sonst 9 %.</p>
          </div>
        )}
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4" aria-live="polite" aria-atomic="true">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-white/70 text-xs mb-1">Einkommensteuer</p>
                <p className="text-2xl font-bold">{formatEuro(ergebnis.einkommensteuer)} €</p>
              </div>
              <div>
                <p className="text-white/70 text-xs mb-1">Durchschnittssteuersatz</p>
                <p className="text-2xl font-bold">{formatProzent(ergebnis.durchschnittssteuersatz)} %</p>
              </div>
              <div>
                <p className="text-white/70 text-xs mb-1">Grenzsteuersatz</p>
                <p className="text-2xl font-bold">{formatProzent(ergebnis.grenzsteuersatz)} %</p>
              </div>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Steuerverlauf: Durchschnitts- und Grenzsteuersatz
            </h2>
            <div className="w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                className="w-full"
                aria-label={`Steuerkurven-Diagramm: Durchschnittssteuersatz ${formatProzent(ergebnis.durchschnittssteuersatz)}% und Grenzsteuersatz ${formatProzent(ergebnis.grenzsteuersatz)}% bei ${formatEuro(zve)} €`}
                role="img"
              >
                {/* Tariff zone backgrounds */}
                {ZONEN.map((zone, i) => {
                  const vonEink = i === 0 ? 0 : ZONEN[i - 1].bis;
                  const bisEink = Math.min(zone.bis, MAX_EINKOMMEN);
                  const x1 = xPos(vonEink);
                  const x2 = xPos(bisEink);
                  return (
                    <rect
                      key={i}
                      x={x1}
                      y={PAD_TOP}
                      width={Math.max(0, x2 - x1)}
                      height={CHART_H}
                      fill={zone.farbe}
                      opacity={0.7}
                    />
                  );
                })}

                {/* Y grid lines */}
                {yLabels.map(pct => (
                  <g key={pct}>
                    <line
                      x1={PAD_LEFT}
                      y1={yPos(pct)}
                      x2={PAD_LEFT + CHART_W}
                      y2={yPos(pct)}
                      stroke="#e5e7eb"
                      strokeWidth={1}
                    />
                    <text
                      x={PAD_LEFT - 6}
                      y={yPos(pct)}
                      textAnchor="end"
                      dominantBaseline="middle"
                      fontSize={10}
                      fill="#6b7280"
                    >
                      {pct}%
                    </text>
                  </g>
                ))}

                {/* X grid lines */}
                {xLabels.map(eink => (
                  <g key={eink}>
                    <line
                      x1={xPos(eink)}
                      y1={PAD_TOP}
                      x2={xPos(eink)}
                      y2={PAD_TOP + CHART_H}
                      stroke="#e5e7eb"
                      strokeWidth={1}
                    />
                    <text
                      x={xPos(eink)}
                      y={PAD_TOP + CHART_H + 14}
                      textAnchor="middle"
                      fontSize={10}
                      fill="#6b7280"
                    >
                      {eink === 0 ? '0' : `${eink / 1000}k`}
                    </text>
                  </g>
                ))}

                {/* Durchschnittssteuersatz Kurve (blau) */}
                <polyline
                  points={durchschnittPoints}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                />

                {/* Grenzsteuersatz Kurve (rot) */}
                <polyline
                  points={grenzPoints}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                />

                {/* Vertikale Linie am aktuellen zvE */}
                {zve >= 0 && zve <= MAX_EINKOMMEN && (
                  <>
                    <line
                      x1={currentX}
                      y1={PAD_TOP}
                      x2={currentX}
                      y2={PAD_TOP + CHART_H}
                      stroke="#374151"
                      strokeWidth={1.5}
                      strokeDasharray="5,4"
                    />
                    {/* Punkt auf Durchschnittskurve */}
                    <circle
                      cx={currentX}
                      cy={currentDurchschnitt}
                      r={5}
                      fill="#2563eb"
                      stroke="white"
                      strokeWidth={2}
                    />
                    {/* Punkt auf Grenzkurve */}
                    <circle
                      cx={currentX}
                      cy={currentGrenz}
                      r={5}
                      fill="#dc2626"
                      stroke="white"
                      strokeWidth={2}
                    />
                  </>
                )}

                {/* Achsenbeschriftung X */}
                <text
                  x={PAD_LEFT + CHART_W / 2}
                  y={SVG_H - 2}
                  textAnchor="middle"
                  fontSize={10}
                  fill="#6b7280"
                >
                  Zu versteuerndes Einkommen (€)
                </text>

                {/* Chart-Legende */}
                <g transform={`translate(${PAD_LEFT + 10}, ${PAD_TOP + 10})`}>
                  <rect width={120} height={46} rx={4} fill="white" fillOpacity={0.85} />
                  <circle cx={14} cy={14} r={5} fill="#2563eb" />
                  <text x={24} y={18} fontSize={10} fill="#374151">Durchschnittssteuersatz</text>
                  <circle cx={14} cy={32} r={5} fill="#dc2626" />
                  <text x={24} y={36} fontSize={10} fill="#374151">Grenzsteuersatz</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Detail-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Ihre Steuerbelastung im Detail
              </h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">Zu versteuerndes Einkommen</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formatEuro(ergebnis.zvE)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">Einkommensteuer</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formatEuro(ergebnis.einkommensteuer)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">Solidaritätszuschlag</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formatEuroFull(ergebnis.solidaritaetszuschlag)} €</span>
              </div>
              {hatKirchensteuer && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">Kirchensteuer ({kistSatzProzent} %)</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{formatEuroFull(ergebnis.kirchensteuer)} €</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Gesamt Steuerlast</span>
                <span className="text-primary-600 dark:text-primary-400">{formatEuroFull(ergebnis.gesamtSteuer)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">Durchschnittssteuersatz (ESt)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formatProzent(ergebnis.durchschnittssteuersatz)} %</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">Grenzsteuersatz</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formatProzent(ergebnis.grenzsteuersatz)} %</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">Effektiver Gesamtsteuersatz</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formatProzent(ergebnis.effektiverSteuersatz)} %</span>
              </div>
            </div>
          </div>

          {/* Splitting-Vergleich */}
          {ergebnis.splittingVergleich && ergebnis.splittingVergleich.vorteil > 0 && (
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-4">
              <h2 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
                Splitting-Vergleich
              </h2>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Bei Zusammenveranlagung (Splitting) würden Sie{' '}
                <strong>{formatEuro(ergebnis.splittingVergleich.vorteil)} € weniger Einkommensteuer</strong> zahlen
                ({formatEuro(ergebnis.splittingVergleich.estMit)} € statt{' '}
                {formatEuro(ergebnis.splittingVergleich.estOhne)} €).
              </p>
            </div>
          )}
          {ergebnis.splittingVergleich && ergebnis.splittingVergleich.vorteil === 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bei Zusammenveranlagung (Splitting) ergibt sich in diesem Fall kein steuerlicher Unterschied.
              </p>
            </div>
          )}

          <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💰" text="Brutto-Netto berechnen" />
          <CrossLink href="/finanzen/gehaltserhoehung-rechner" emoji="📈" text="Grenzsteuersatz bei Gehaltserhöhung berechnen" />
          <CrossLink href="/finanzen/splitting-rechner" emoji="💑" text="Splitting-Vorteil berechnen" />

          {/* Stufen-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4 mt-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Steuertabelle nach Einkommenshöhe
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Steuertabelle nach Einkommenshöhe">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                    <th scope="col" className="text-left px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                      Einkommen
                    </th>
                    <th scope="col" className="text-right px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                      ESt
                    </th>
                    <th scope="col" className="text-right px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                      Durchschnitt
                    </th>
                    <th scope="col" className="text-right px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                      Grenzsteuer
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {ergebnis.tabelleDaten.map((row, i) => {
                    const isHighlight = i === closestTableRow;
                    return (
                      <tr
                        key={row.einkommen}
                        className={isHighlight
                          ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                        }
                      >
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                          {formatEuro(row.einkommen)} €
                          {isHighlight && (
                            <span className="ml-1 text-xs text-primary-600 dark:text-primary-400">← Ihr Wert</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                          {formatEuro(row.est)} €
                        </td>
                        <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                          {formatProzent(row.durchschnitt)} %
                        </td>
                        <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                          {formatProzent(row.grenz)} %
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Steuerprogression bei ${formatEuro(zve)} € zvE (${splitting ? 'Splitting' : 'Einzelveranlagung'}): ESt ${formatEuro(ergebnis.einkommensteuer)} €, Durchschnittssteuersatz ${formatProzent(ergebnis.durchschnittssteuersatz)} %, Grenzsteuersatz ${formatProzent(ergebnis.grenzsteuersatz)} %`}
            seitenTitel="Steuerprogression-Rechner"
          />

          <AffiliateBox programId="wiso" context="steuerprogression" />

          <AiExplain
            rechnerName="Steuerprogression-Rechner"
            eingaben={{
              zuVersteuerndesEinkommenEuro: zve,
              veranlagung: splitting ? 'Zusammenveranlagung (Splitting)' : 'Einzelveranlagung',
              kirchensteuer: hatKirchensteuer ? `Ja (${kistSatzProzent} %, ${bundesland})` : 'Nein',
            }}
            ergebnis={{
              einkommensteuerEuro: ergebnis.einkommensteuer,
              solidaritaetszuschlagEuro: ergebnis.solidaritaetszuschlag,
              kirchensteuerEuro: ergebnis.kirchensteuer,
              gesamtSteuerEuro: ergebnis.gesamtSteuer,
              durchschnittssteuersatzProzent: ergebnis.durchschnittssteuersatz,
              grenzsteuersatzProzent: ergebnis.grenzsteuersatz,
              effektiverSteuersatzProzent: ergebnis.effektiverSteuersatz,
            }}
          />
        </>
      )}
    </div>
  );
}
