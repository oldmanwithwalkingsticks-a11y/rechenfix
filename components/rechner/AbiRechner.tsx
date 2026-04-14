'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Modus = 'schnell' | 'detail';

const PUNKTE_NOTEN: { p: number; note: string }[] = [
  { p: 15, note: '1+' }, { p: 14, note: '1' }, { p: 13, note: '1-' },
  { p: 12, note: '2+' }, { p: 11, note: '2' }, { p: 10, note: '2-' },
  { p: 9, note: '3+' }, { p: 8, note: '3' }, { p: 7, note: '3-' },
  { p: 6, note: '4+' }, { p: 5, note: '4' }, { p: 4, note: '4-' },
  { p: 3, note: '5+' }, { p: 2, note: '5' }, { p: 1, note: '5-' },
  { p: 0, note: '6' },
];

function punkteZuAbiNote(gesamtpunkte: number): number {
  const note = 17 / 3 - gesamtpunkte / 180;
  const gerundet = Math.round(note * 10) / 10;
  return Math.max(1.0, Math.min(4.0, gerundet));
}

function formatNote(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export default function AbiRechner() {
  const [modus, setModus] = useState<Modus>('schnell');

  // Schnellmodus
  const [blockIStr, setBlockIStr] = useState('400');
  const [blockIIStr, setBlockIIStr] = useState('100');

  // Detailmodus
  const [kursDurchschnitt, setKursDurchschnitt] = useState('10');
  const [anzahlKurse, setAnzahlKurse] = useState('40');
  const [p1, setP1] = useState('10');
  const [p2, setP2] = useState('9');
  const [p3, setP3] = useState('8');
  const [p4, setP4] = useState('10');
  const [p5, setP5] = useState('11');

  const ergebnis = useMemo(() => {
    let blockI = 0;
    let blockII = 0;
    let mindestensBestanden = true;
    let hinweise: string[] = [];

    if (modus === 'schnell') {
      blockI = Math.max(0, Math.min(600, parseDeutscheZahl(blockIStr) || 0));
      blockII = Math.max(0, Math.min(300, parseDeutscheZahl(blockIIStr) || 0));
    } else {
      const schnitt = parseDeutscheZahl(kursDurchschnitt) || 0;
      const anz = Math.max(36, Math.min(40, parseDeutscheZahl(anzahlKurse) || 40));
      blockI = Math.round(schnitt * anz);
      // Skala auf 600: Max = 15 × 40 = 600
      blockI = Math.max(0, Math.min(600, blockI));

      const pr = [p1, p2, p3, p4, p5].map(s => Math.max(0, Math.min(15, parseDeutscheZahl(s) || 0)));
      blockII = pr.reduce((a, b) => a + b, 0) * 4;
      blockII = Math.min(300, blockII);

      const anzAusreichend = pr.filter(x => x >= 5).length;
      if (anzAusreichend < 3) {
        mindestensBestanden = false;
        hinweise.push('Mindestens 3 von 5 Prüfungen müssen mit 5 Punkten oder mehr bestanden sein.');
      }
    }

    const gesamt = blockI + blockII;
    const bestanden =
      gesamt >= 300 && blockI >= 200 && blockII >= 100 && mindestensBestanden;

    if (blockI < 200) hinweise.push('Block I muss mindestens 200 Punkte betragen.');
    if (blockII < 100) hinweise.push('Block II muss mindestens 100 Punkte betragen.');
    if (gesamt < 300) hinweise.push('Gesamtpunkte müssen mindestens 300 betragen.');

    const note = bestanden ? punkteZuAbiNote(gesamt) : 5.0;
    const fuerEinsNull = 823; // 17/3 - x/180 = 1,0 → x = (17/3 − 1,0) × 180 ≈ 822,99
    const bisEinsNull = Math.max(0, fuerEinsNull - gesamt);

    return { blockI, blockII, gesamt, bestanden, note, hinweise, bisEinsNull };
  }, [modus, blockIStr, blockIIStr, kursDurchschnitt, anzahlKurse, p1, p2, p3, p4, p5]);

  return (
    <div>
      {/* Modus-Toggle */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Berechnungsmodus</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setModus('schnell')}
            className={`min-h-[48px] px-3 py-2 rounded-xl border text-sm font-medium transition ${modus === 'schnell' ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-400'}`}
          >Schnell (Gesamtpunkte)</button>
          <button
            onClick={() => setModus('detail')}
            className={`min-h-[48px] px-3 py-2 rounded-xl border text-sm font-medium transition ${modus === 'detail' ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-400'}`}
          >Detailliert (Kurse)</button>
        </div>
      </div>

      {/* Eingabe Schnell */}
      {modus === 'schnell' && (
        <div className="mb-6 space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Punkte Block I (Kurse)</label>
            <NummerEingabe value={blockIStr} onChange={setBlockIStr} einheit="Pkt" />
            <p className="text-xs text-gray-500 mt-1">Qualifikationsphase: mind. 200, max. 600 Punkte</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Punkte Block II (Prüfungen)</label>
            <NummerEingabe value={blockIIStr} onChange={setBlockIIStr} einheit="Pkt" />
            <p className="text-xs text-gray-500 mt-1">Abiturprüfungen: mind. 100, max. 300 Punkte</p>
          </div>
        </div>
      )}

      {/* Eingabe Detail */}
      {modus === 'detail' && (
        <div className="mb-6 space-y-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm mb-2">Block I — Kurse</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Ø Punkte pro Kurs</label>
                <NummerEingabe value={kursDurchschnitt} onChange={setKursDurchschnitt} einheit="/15" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Eingebrachte Kurse</label>
                <select value={anzahlKurse} onChange={e => setAnzahlKurse(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  {[36, 37, 38, 39, 40].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm mb-2">Block II — 5 Prüfungen (×4)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Prüfung 1 (schriftlich)', value: p1, setter: setP1 },
                { label: 'Prüfung 2 (schriftlich)', value: p2, setter: setP2 },
                { label: 'Prüfung 3 (schriftlich)', value: p3, setter: setP3 },
                { label: 'Prüfung 4 (mündlich)', value: p4, setter: setP4 },
                { label: 'Prüfung 5 (Präsentation)', value: p5, setter: setP5 },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
                  <NummerEingabe value={f.value} onChange={f.setter} einheit="/15" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ergebnis */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Abi-Note</p>
        <p className="text-5xl font-bold">{formatNote(ergebnis.note)}</p>
        <div className="mt-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${ergebnis.bestanden ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {ergebnis.bestanden ? '✓ Bestanden' : '✗ Nicht bestanden'}
          </span>
        </div>
        <p className="text-white/80 text-sm mt-3">
          Block I: {ergebnis.blockI} / 600 · Block II: {ergebnis.blockII} / 300 · Gesamt: {ergebnis.gesamt} / 900
        </p>
      </div>

      {/* Hinweise */}
      {ergebnis.hinweise.length > 0 && (
        <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4">
          <p className="font-semibold text-yellow-700 dark:text-yellow-400 text-sm mb-2">⚠️ Hinweise</p>
          <ul className="list-disc pl-5 text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
            {ergebnis.hinweise.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>
      )}

      {/* Was wäre wenn */}
      {ergebnis.bestanden && ergebnis.note > 1.0 && (
        <div className="mb-6 bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-4">
          <p className="text-sm text-gray-700 dark:text-gray-200">
            Für eine <strong>1,0</strong> bräuchten Sie ca. <strong>823 Gesamtpunkte</strong>
            {ergebnis.bisEinsNull > 0 && <> (noch {ergebnis.bisEinsNull} Punkte mehr)</>}.
          </p>
        </div>
      )}

      {/* Punkte-Noten-Tabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Punkte-Noten-Tabelle</h3>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-xs">
          {PUNKTE_NOTEN.map(pn => (
            <div key={pn.p} className="text-center bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
              <div className="font-bold text-gray-800 dark:text-gray-200">{pn.p} P.</div>
              <div className="text-gray-500 dark:text-gray-400">{pn.note}</div>
            </div>
          ))}
        </div>
      </div>

      <CrossLink href="/mathe/notenschluessel-rechner" emoji="📊" text="Notenschlüssel berechnen" />
      <CrossLink href="/mathe/durchschnitt-rechner" emoji="🧮" text="Notendurchschnitt berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Abi-Note: ${formatNote(ergebnis.note)} (${ergebnis.gesamt}/900 Punkte)`}
        seitenTitel="Abi-Rechner"
      />

      <AiExplain
        rechnerName="Abi-Rechner"
        eingaben={{
          Modus: modus === 'schnell' ? 'Schnell' : 'Detailliert',
          'Block I': `${ergebnis.blockI} / 600`,
          'Block II': `${ergebnis.blockII} / 300`,
        }}
        ergebnis={{
          'Abi-Note': formatNote(ergebnis.note),
          Gesamtpunkte: `${ergebnis.gesamt} / 900`,
          Status: ergebnis.bestanden ? 'Bestanden' : 'Nicht bestanden',
        }}
      />
    </div>
  );
}
