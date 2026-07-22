'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const f2 = (n: number): string => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const euro = (n: number): string => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

type Bewertung = { label: string; farbe: string };

function bewerten(faktor: number): Bewertung {
  if (faktor < 0.5) return { label: 'Top-Angebot', farbe: 'green' };
  if (faktor < 0.7) return { label: 'sehr gut', farbe: 'green' };
  if (faktor < 0.9) return { label: 'gut', farbe: 'lime' };
  if (faktor <= 1.0) return { label: 'okay', farbe: 'amber' };
  return { label: 'eher teuer', farbe: 'red' };
}

const SKALA: Array<{ bereich: string; label: string }> = [
  { bereich: 'unter 0,5', label: 'Top-Angebot' },
  { bereich: '0,5 – 0,7', label: 'sehr gut' },
  { bereich: '0,7 – 0,9', label: 'gut' },
  { bereich: '0,9 – 1,0', label: 'okay' },
  { bereich: 'über 1,0', label: 'eher teuer' },
];

const BOX_FARBE: Record<string, string> = {
  green: 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30 text-green-800 dark:text-green-300',
  lime:  'bg-lime-50 dark:bg-lime-500/10 border-lime-200 dark:border-lime-500/30 text-lime-800 dark:text-lime-300',
  amber: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300',
  red:   'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-800 dark:text-red-300',
};

export default function LeasingfaktorRechner() {
  const [rate, setRate] = useState('250');
  const [blp, setBlp] = useState('40000');
  const [anzahlung, setAnzahlung] = useState('0');
  const [laufzeit, setLaufzeit] = useState('36');

  const ergebnis = useMemo(() => {
    const r = parseDeutscheZahl(rate);
    const b = parseDeutscheZahl(blp);
    const a = parseDeutscheZahl(anzahlung);
    const lz = parseDeutscheZahl(laufzeit);
    if (r <= 0 || b <= 0) return null;
    const leasingfaktor = Math.round((r / b) * 100 * 100) / 100;
    const mitAnzahlung = a > 0 && lz > 0;
    const gesamtkostenfaktor = mitAnzahlung
      ? Math.round(((r + a / lz) / b) * 100 * 100) / 100
      : leasingfaktor;
    const massgeblich = mitAnzahlung ? gesamtkostenfaktor : leasingfaktor;
    return { r, b, a, lz, leasingfaktor, gesamtkostenfaktor, mitAnzahlung, massgeblich, bewertung: bewerten(massgeblich) };
  }, [rate, blp, anzahlung, laufzeit]);

  return (
    <div>
      {/* === 1: Monatliche Rate === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Monatliche Leasingrate
        </h2>
        <NummerEingabe value={rate} onChange={setRate} placeholder="250" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Privat die Brutto-Rate verwenden (inkl. MwSt.), passend zum Bruttolistenpreis.
        </p>
      </div>

      {/* === 2: Bruttolistenpreis === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Bruttolistenpreis (BLP)
        </h2>
        <NummerEingabe value={blp} onChange={setBlp} placeholder="40000" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Der Listenpreis des Fahrzeugs inkl. Sonderausstattung — nicht der reduzierte Angebotspreis.
        </p>
      </div>

      {/* === 3: Anzahlung (optional) === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Anzahlung / Sonderzahlung <span className="font-normal text-gray-400">(optional)</span>
        </h2>
        <NummerEingabe value={anzahlung} onChange={setAnzahlung} placeholder="0" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Bei einer Sonderzahlung wird der Gesamtkostenfaktor maßgeblich.
        </p>
      </div>

      {/* === 4: Laufzeit (nur bei Anzahlung relevant) === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Laufzeit (Monate)
        </h2>
        <NummerEingabe value={laufzeit} onChange={setLaufzeit} placeholder="36" einheit="Monate" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Wird nur für den Gesamtkostenfaktor gebraucht (verteilt die Anzahlung auf die Laufzeit).
        </p>
      </div>

      {ergebnis && (
        <>
          {/* === ERGEBNIS === */}
          <div className="result-box mb-4 text-center">
            <p className="text-white/80 text-sm mb-1">
              {ergebnis.mitAnzahlung ? 'Gesamtkostenfaktor' : 'Leasingfaktor'}
            </p>
            <p className="text-5xl font-bold">{f2(ergebnis.massgeblich)}</p>
            <p className="text-white/90 text-sm mt-2">{ergebnis.bewertung.label}</p>
            {ergebnis.mitAnzahlung && (
              <p className="text-white/70 text-xs mt-2">
                Reiner Leasingfaktor (ohne Anzahlung): {f2(ergebnis.leasingfaktor)}
              </p>
            )}
          </div>

          {/* Bewertungs-Box */}
          <div className={`rounded-xl p-4 mb-4 border ${BOX_FARBE[ergebnis.bewertung.farbe]}`}>
            <p className="text-sm">
              <strong>Einordnung: {ergebnis.bewertung.label}.</strong>{' '}
              Der Branchenschnitt liegt bei etwa 0,63. Ein niedrigerer Faktor bedeutet ein günstigeres Angebot
              im Verhältnis zum Fahrzeugpreis. Die Schwellen sind Markt-Faustregeln, keine festen Grenzen.
            </p>
          </div>

          {/* Rechenweg */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Rechenweg:</strong>{' '}
              ({euro(ergebnis.r)} ÷ {euro(ergebnis.b)}) × 100 = {f2(ergebnis.leasingfaktor)}
              {ergebnis.mitAnzahlung && (
                <>
                  {' '}· mit Anzahlung: (({euro(ergebnis.r)} + {euro(ergebnis.a)} ÷ {euro(ergebnis.lz)}) ÷ {euro(ergebnis.b)}) × 100 = {f2(ergebnis.gesamtkostenfaktor)}
                </>
              )}
            </p>
          </div>

          {/* PFLICHT: Finanz-Zeile */}
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              <strong>Hinweis:</strong> Orientierungs-Kennzahl, keine Finanzberatung. Nebenkosten (Überführung,
              Zulassung, Wartung, Versicherung, Reifen), die Kilometerleistung und der Restwert sind nicht enthalten.
              Bei einer Anzahlung ist der Gesamtkostenfaktor maßgeblich. Angaben ohne Gewähr.
            </p>
          </div>

          {/* Bewertungsskala-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 pt-4 pb-1">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">Bewertungsskala (Privat, brutto)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <th className="px-4 py-2 text-left font-semibold">Leasingfaktor</th>
                    <th className="px-4 py-2 text-left font-semibold">Einordnung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {SKALA.map(s => {
                    const aktiv = s.label === ergebnis.bewertung.label;
                    return (
                      <tr key={s.label} className={aktiv ? 'bg-primary-50 dark:bg-primary-500/10' : ''}>
                        <td className={`px-4 py-2.5 whitespace-nowrap tabular-nums ${aktiv ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>{s.bereich}</td>
                        <td className={`px-4 py-2.5 whitespace-nowrap ${aktiv ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>{s.label}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="px-4 pb-3 pt-1 text-xs text-gray-500 dark:text-gray-400">
              Branchenschnitt rund 0,63. Faustregeln für private Brutto-Angebote — Gewerbe-Netto nicht direkt vergleichbar.
            </p>
          </div>

          <CrossLink href="/auto/leasing-rechner" emoji="📄" text="Leasingrate & Restwert" />
          <CrossLink href="/auto/autokosten-rechner" emoji="💶" text="Autokosten gesamt" />

          <ErgebnisAktionen
            ergebnisText={`Leasingfaktor-Rechner: ${euro(ergebnis.r)} € Rate bei ${euro(ergebnis.b)} € BLP = Leasingfaktor ${f2(ergebnis.leasingfaktor)}${ergebnis.mitAnzahlung ? ` (Gesamtkostenfaktor ${f2(ergebnis.gesamtkostenfaktor)})` : ''} — ${ergebnis.bewertung.label}. Branchenschnitt ~0,63.`}
            seitenTitel="Leasingfaktor-Rechner"
            pdfDaten={[
              {
                titel: 'Leasingfaktor-Bewertung',
                wertSpalte: 'Wert',
                zeilen: [
                  { label: 'Monatsrate', wert: `${euro(ergebnis.r)} €` },
                  { label: 'Bruttolistenpreis (BLP)', wert: `${euro(ergebnis.b)} €` },
                  { label: 'Leasingfaktor', wert: `${f2(ergebnis.leasingfaktor)}` },
                  { label: 'Maßgeblicher Faktor', wert: `${f2(ergebnis.massgeblich)}`, highlight: true },
                  { label: 'Einordnung', wert: `${ergebnis.bewertung.label}` },
                ],
              },
            ]}
          />

          <AiExplain
            rechnerName="Leasingfaktor-Rechner"
            eingaben={{
              rate: `${euro(ergebnis.r)} €`,
              bruttolistenpreis: `${euro(ergebnis.b)} €`,
              anzahlung: ergebnis.mitAnzahlung ? `${euro(ergebnis.a)} €` : '—',
              laufzeit: ergebnis.mitAnzahlung ? `${euro(ergebnis.lz)} Monate` : '—',
            }}
            ergebnis={{
              leasingfaktor: f2(ergebnis.leasingfaktor),
              gesamtkostenfaktor: ergebnis.mitAnzahlung ? f2(ergebnis.gesamtkostenfaktor) : '—',
              einordnung: ergebnis.bewertung.label,
              hinweis: 'Orientierungs-Kennzahl ohne Nebenkosten, Kilometer und Restwert — keine Finanzberatung.',
            }}
          />
        </>
      )}
    </div>
  );
}
