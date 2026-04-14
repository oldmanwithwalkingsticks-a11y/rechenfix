'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

// Düsseldorfer Tabelle 2026 (vereinfacht, prüfe bei Änderung)
type Altersstufe = '0-5' | '6-11' | '12-17' | '18+';

interface Tabellenzeile {
  max: number; // Obergrenze des Einkommens
  betraege: Record<Altersstufe, number>;
}

const DUESSELDORFER_TABELLE_2026: Tabellenzeile[] = [
  { max: 2100, betraege: { '0-5': 482, '6-11': 554, '12-17': 649, '18+': 693 } },
  { max: 2500, betraege: { '0-5': 507, '6-11': 582, '12-17': 682, '18+': 728 } },
  { max: 2900, betraege: { '0-5': 531, '6-11': 610, '12-17': 714, '18+': 762 } },
  { max: 3300, betraege: { '0-5': 555, '6-11': 638, '12-17': 747, '18+': 797 } },
  { max: 3700, betraege: { '0-5': 580, '6-11': 666, '12-17': 779, '18+': 832 } },
  { max: 4100, betraege: { '0-5': 618, '6-11': 710, '12-17': 831, '18+': 887 } },
  { max: 4500, betraege: { '0-5': 657, '6-11': 754, '12-17': 883, '18+': 942 } },
  { max: 4900, betraege: { '0-5': 695, '6-11': 798, '12-17': 935, '18+': 998 } },
  { max: 5300, betraege: { '0-5': 734, '6-11': 842, '12-17': 987, '18+': 1053 } },
  { max: 5700, betraege: { '0-5': 772, '6-11': 887, '12-17': 1039, '18+': 1109 } },
  { max: 6400, betraege: { '0-5': 811, '6-11': 931, '12-17': 1091, '18+': 1164 } },
  { max: 7200, betraege: { '0-5': 849, '6-11': 975, '12-17': 1143, '18+': 1219 } },
  { max: 8200, betraege: { '0-5': 888, '6-11': 1019, '12-17': 1195, '18+': 1275 } },
  { max: 9700, betraege: { '0-5': 926, '6-11': 1063, '12-17': 1247, '18+': 1330 } },
  { max: 11200, betraege: { '0-5': 965, '6-11': 1108, '12-17': 1299, '18+': 1386 } },
  { max: Infinity, betraege: { '0-5': 1003, '6-11': 1152, '12-17': 1351, '18+': 1441 } },
];

const KINDERGELD = 255;
const SELBSTBEHALT_ERWERBSTAETIG = 1450;

const ALTERS_LABELS: Record<Altersstufe, string> = {
  '0-5': '0–5 Jahre',
  '6-11': '6–11 Jahre',
  '12-17': '12–17 Jahre',
  '18+': 'ab 18 Jahre',
};

function findeZeile(einkommen: number): { zeile: Tabellenzeile; index: number } {
  for (let i = 0; i < DUESSELDORFER_TABELLE_2026.length; i++) {
    if (einkommen <= DUESSELDORFER_TABELLE_2026[i].max) return { zeile: DUESSELDORFER_TABELLE_2026[i], index: i };
  }
  return { zeile: DUESSELDORFER_TABELLE_2026[DUESSELDORFER_TABELLE_2026.length - 1], index: DUESSELDORFER_TABELLE_2026.length - 1 };
}

export default function UnterhaltsRechner() {
  const [netto, setNetto] = useState('3000');
  const [anzahlKinder, setAnzahlKinder] = useState(1);
  const [alter, setAlter] = useState<Altersstufe[]>(['6-11']);
  const [kindergeldVoll, setKindergeldVoll] = useState(false);

  const handleAnzahlChange = (n: number) => {
    setAnzahlKinder(n);
    setAlter(prev => {
      const next = [...prev];
      while (next.length < n) next.push('6-11');
      return next.slice(0, n);
    });
  };

  const handleAlterChange = (i: number, val: Altersstufe) => {
    setAlter(prev => {
      const next = [...prev];
      next[i] = val;
      return next;
    });
  };

  const ergebnis = useMemo(() => {
    const einkommen = parseDeutscheZahl(netto) || 0;
    const { zeile, index } = findeZeile(einkommen);
    const kindergeldAbzug = kindergeldVoll ? KINDERGELD : KINDERGELD / 2;

    const kinder = Array.from({ length: anzahlKinder }).map((_, i) => {
      const stufe = alter[i] || '6-11';
      const tabellen = zeile.betraege[stufe];
      const zahl = Math.max(0, tabellen - kindergeldAbzug);
      return { index: i + 1, stufe, tabellen, kindergeldAbzug, zahl };
    });

    const summeZahl = kinder.reduce((a, b) => a + b.zahl, 0);

    // Mangelfall
    const verfuegbar = Math.max(0, einkommen - SELBSTBEHALT_ERWERBSTAETIG);
    const istMangelfall = summeZahl > verfuegbar;

    let kinderAngepasst = kinder;
    let summeAngepasst = summeZahl;
    if (istMangelfall && summeZahl > 0) {
      const quote = verfuegbar / summeZahl;
      kinderAngepasst = kinder.map(k => ({ ...k, zahl: Math.round(k.zahl * quote) }));
      summeAngepasst = kinderAngepasst.reduce((a, b) => a + b.zahl, 0);
    }

    return { einkommen, einkommensgruppe: index + 1, obergrenze: zeile.max, kinder: kinderAngepasst, summe: summeAngepasst, summeRegulaer: summeZahl, verfuegbar, istMangelfall };
  }, [netto, anzahlKinder, alter, kindergeldVoll]);

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* 1: Nettoeinkommen */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Bereinigtes Nettoeinkommen des Unterhaltspflichtigen
        </h3>
        <NummerEingabe value={netto} onChange={setNetto} placeholder="3000" einheit="€/Monat" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Nach Abzug berufsbedingter Aufwendungen (5 % pauschal) und Schulden.</p>
      </div>

      {/* 2: Anzahl Kinder */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Anzahl unterhaltsberechtigter Kinder
        </h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => handleAnzahlChange(n)}
              className={`min-w-[48px] min-h-[48px] px-4 rounded-xl text-sm font-medium transition-all ${anzahlKinder === n ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* 3: Alter je Kind */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Alter der Kinder
        </h3>
        <div className="space-y-2">
          {Array.from({ length: anzahlKinder }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-300 w-16">Kind {i + 1}</span>
              <select
                value={alter[i] || '6-11'}
                onChange={e => handleAlterChange(i, e.target.value as Altersstufe)}
                className="flex-1 min-h-[48px] px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200"
              >
                {(Object.keys(ALTERS_LABELS) as Altersstufe[]).map(key => (
                  <option key={key} value={key}>{ALTERS_LABELS[key]}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* 4: Kindergeld-Verrechnung */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Kindergeld-Verrechnung
        </h3>
        <div className="flex flex-col sm:flex-row gap-2">
          {([
            [false, 'Hälftig (minderjährig)'],
            [true, 'Voll (volljährig)'],
          ] as const).map(([val, label]) => (
            <button
              key={String(val)}
              onClick={() => setKindergeldVoll(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${kindergeldVoll === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ERGEBNIS */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Monatlicher Unterhalt gesamt</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.summe)} €</p>
        <p className="text-white/80 text-sm mt-1">
          Einkommensgruppe <strong>{ergebnis.einkommensgruppe}</strong> der Düsseldorfer Tabelle 2026
        </p>
      </div>

      {ergebnis.istMangelfall && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-800 dark:text-red-300 text-sm">
            <strong>⚠️ Mangelfall:</strong> Nach Abzug des Selbstbehalts von {fmtEuro(SELBSTBEHALT_ERWERBSTAETIG)} € bleiben nur {fmtEuro(ergebnis.verfuegbar)} € für den Unterhalt. Der reguläre Tabellenunterhalt ({fmtEuro(ergebnis.summeRegulaer)} €) kann nicht voll gezahlt werden — die Beträge werden anteilig gekürzt (Quotelung).
          </p>
        </div>
      )}

      {/* Tabelle pro Kind */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h3 className="font-bold text-gray-700 dark:text-gray-200">Aufschlüsselung pro Kind</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Kind</th>
                <th className="px-4 py-2 text-left font-semibold">Alter</th>
                <th className="px-4 py-2 text-right font-semibold">Tabelle</th>
                <th className="px-4 py-2 text-right font-semibold">− Kindergeld</th>
                <th className="px-4 py-2 text-right font-semibold">Zahlbetrag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.kinder.map(k => (
                <tr key={k.index}>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">Kind {k.index}</td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{ALTERS_LABELS[k.stufe as Altersstufe]}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(k.tabellen)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmtEuro(k.kindergeldAbzug)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-gray-900 dark:text-gray-100">{fmtEuro(k.zahl)} €</td>
                </tr>
              ))}
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
                <td className="px-4 py-3 text-blue-800 dark:text-blue-300" colSpan={4}>= Gesamtsumme</td>
                <td className="px-4 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.summe)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Berechnung nach Düsseldorfer Tabelle 2026. Sonderbedarf und Mehrbedarf (z.&nbsp;B. Kita, Nachhilfe, Zahnspange) sind nicht berücksichtigt. Der Selbstbehalt beträgt {fmtEuro(SELBSTBEHALT_ERWERBSTAETIG)} € (erwerbstätig).
        </p>
      </div>

      <CrossLink href="/arbeit/scheidungskosten-rechner" emoji="⚖️" text="Scheidungskosten berechnen" />
      <CrossLink href="/arbeit/zugewinnausgleich-rechner" emoji="💍" text="Zugewinnausgleich berechnen" />
      <CrossLink href="/finanzen/kindergeld-rechner" emoji="👶" text="Kindergeld-Höhe prüfen" />

      <ErgebnisAktionen
        ergebnisText={`Kindesunterhalt (Düsseldorfer Tabelle 2026): ${fmtEuro(ergebnis.summe)} €/Monat für ${anzahlKinder} Kind(er) | Netto ${fmtEuro(ergebnis.einkommen)} € | Einkommensgruppe ${ergebnis.einkommensgruppe}${ergebnis.istMangelfall ? ' | Mangelfall (quotiert)' : ''}`}
        seitenTitel="Unterhaltsrechner"
      />

      <AffiliateBox programId="ks-auxilia" context="unterhalt" />

      <AiExplain
        rechnerName="Unterhaltsrechner"
        eingaben={{
          netto: `${fmtEuro(ergebnis.einkommen)} €`,
          anzahlKinder: String(anzahlKinder),
          alter: alter.slice(0, anzahlKinder).map(a => ALTERS_LABELS[a]).join(', '),
          kindergeld: kindergeldVoll ? 'voll' : 'hälftig',
        }}
        ergebnis={{
          gesamt: `${fmtEuro(ergebnis.summe)} €`,
          einkommensgruppe: String(ergebnis.einkommensgruppe),
          mangelfall: ergebnis.istMangelfall ? 'ja' : 'nein',
        }}
      />
    </div>
  );
}
