'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

// Düsseldorfer Tabelle 2026 (vereinfacht, prüfe bei Änderung)
type Altersstufe = '0-5' | '6-11' | '12-17' | '18-24' | '25-30';
type TabellenSpalte = '0-5' | '6-11' | '12-17' | '18+';

interface Tabellenzeile {
  max: number; // Obergrenze des Einkommens
  betraege: Record<TabellenSpalte, number>;
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
const SELBSTBEHALT_RANG1 = 1450; // minderjährig + privilegiert volljährig (erwerbstätig)
const SELBSTBEHALT_RANG2 = 1750; // nicht-privilegiert volljährig
const AUSBILDUNGS_PAUSCHALE = 100;

const ALTERS_LABELS: Record<Altersstufe, string> = {
  '0-5': '0–5 Jahre',
  '6-11': '6–11 Jahre',
  '12-17': '12–17 Jahre',
  '18-24': '18–24 Jahre (Erstausbildung/Studium)',
  '25-30': '25–30 Jahre (Erstausbildung/Studium)',
};

function tabellenSpalte(a: Altersstufe): TabellenSpalte {
  if (a === '18-24' || a === '25-30') return '18+';
  return a;
}

function istVolljaehrig(a: Altersstufe): boolean {
  return a === '18-24' || a === '25-30';
}

function istPrivilegiert(a: Altersstufe): boolean {
  return a === '0-5' || a === '6-11' || a === '12-17' || a === '18-24';
}

function findeZeile(einkommen: number): { zeile: Tabellenzeile; index: number } {
  for (let i = 0; i < DUESSELDORFER_TABELLE_2026.length; i++) {
    if (einkommen <= DUESSELDORFER_TABELLE_2026[i].max) return { zeile: DUESSELDORFER_TABELLE_2026[i], index: i };
  }
  return { zeile: DUESSELDORFER_TABELLE_2026[DUESSELDORFER_TABELLE_2026.length - 1], index: DUESSELDORFER_TABELLE_2026.length - 1 };
}

interface KindState {
  alter: Altersstufe;
  kindergeldJa: boolean;
  kindergeldVoll: boolean; // nur relevant wenn kindergeldJa
  eigenesEinkommen: string;
}

function defaultKind(alter: Altersstufe = '6-11'): KindState {
  return {
    alter,
    kindergeldJa: alter !== '25-30',
    kindergeldVoll: istVolljaehrig(alter),
    eigenesEinkommen: '0',
  };
}

export default function UnterhaltsRechner() {
  const [netto, setNetto] = useState('3000');
  const [anzahlKinder, setAnzahlKinder] = useState(1);
  const [kinder, setKinder] = useState<KindState[]>([defaultKind('6-11')]);

  const handleAnzahlChange = (n: number) => {
    setAnzahlKinder(n);
    setKinder(prev => {
      const next = [...prev];
      while (next.length < n) next.push(defaultKind('6-11'));
      return next.slice(0, n);
    });
  };

  const updateKind = (i: number, patch: Partial<KindState>) => {
    setKinder(prev => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch };
      return next;
    });
  };

  const handleAlterChange = (i: number, val: Altersstufe) => {
    setKinder(prev => {
      const next = [...prev];
      const alt = next[i];
      next[i] = {
        ...alt,
        alter: val,
        // Defaults beim Alterswechsel anpassen
        kindergeldJa: val !== '25-30',
        kindergeldVoll: istVolljaehrig(val),
      };
      return next;
    });
  };

  const ergebnis = useMemo(() => {
    const einkommen = parseDeutscheZahl(netto) || 0;
    const { zeile, index } = findeZeile(einkommen);

    const berechnet = Array.from({ length: anzahlKinder }).map((_, i) => {
      const k = kinder[i] || defaultKind('6-11');
      const spalte = tabellenSpalte(k.alter);
      const tabellen = zeile.betraege[spalte];

      const kgAbzug = k.kindergeldJa ? (k.kindergeldVoll ? KINDERGELD : KINDERGELD / 2) : 0;

      const eigen = istVolljaehrig(k.alter) ? (parseDeutscheZahl(k.eigenesEinkommen) || 0) : 0;
      const anrechenbar = Math.max(0, eigen - AUSBILDUNGS_PAUSCHALE);

      const zahl = Math.max(0, tabellen - kgAbzug - anrechenbar);

      return {
        index: i + 1,
        alter: k.alter,
        privilegiert: istPrivilegiert(k.alter),
        volljaehrig: istVolljaehrig(k.alter),
        tabellen,
        kgAbzug,
        eigenesEinkommen: eigen,
        anrechenbar,
        zahl,
      };
    });

    // Rangfolge: Rang 1 = minderjährig + privilegiert; Rang 2 = nicht-privilegiert volljährig
    const rang1 = berechnet.filter(k => k.privilegiert);
    const rang2 = berechnet.filter(k => !k.privilegiert);

    const summeRang1 = rang1.reduce((a, b) => a + b.zahl, 0);
    const summeRang2 = rang2.reduce((a, b) => a + b.zahl, 0);

    // Rang 1 Prüfung (Selbstbehalt 1450)
    const verfuegbarRang1 = Math.max(0, einkommen - SELBSTBEHALT_RANG1);
    let quotientRang1 = 1;
    if (summeRang1 > verfuegbarRang1 && summeRang1 > 0) {
      quotientRang1 = verfuegbarRang1 / summeRang1;
    }
    const gezahltRang1 = rang1.map(k => ({ ...k, zahl: Math.round(k.zahl * quotientRang1) }));
    const summeRang1Gezahlt = gezahltRang1.reduce((a, b) => a + b.zahl, 0);

    // Rang 2 bekommt nur etwas, wenn Einkommen − 1750 − Rang1 > 0
    const verfuegbarRang2 = Math.max(0, einkommen - SELBSTBEHALT_RANG2 - summeRang1Gezahlt);
    let quotientRang2 = 1;
    if (summeRang2 > verfuegbarRang2 && summeRang2 > 0) {
      quotientRang2 = verfuegbarRang2 / summeRang2;
    }
    const gezahltRang2 = rang2.map(k => ({ ...k, zahl: Math.round(k.zahl * quotientRang2) }));

    // Zusammenführen in ursprünglicher Reihenfolge
    const angepasst = berechnet.map(b => {
      const r1 = gezahltRang1.find(x => x.index === b.index);
      if (r1) return r1;
      const r2 = gezahltRang2.find(x => x.index === b.index);
      return r2 || b;
    });

    const summeRegulaer = berechnet.reduce((a, b) => a + b.zahl, 0);
    const summe = angepasst.reduce((a, b) => a + b.zahl, 0);
    const istMangelfall = quotientRang1 < 1 || quotientRang2 < 1;

    return {
      einkommen,
      einkommensgruppe: index + 1,
      kinder: angepasst,
      summe,
      summeRegulaer,
      istMangelfall,
      quotientRang1,
      quotientRang2,
      hatRang2: rang2.length > 0,
    };
  }, [netto, anzahlKinder, kinder]);

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* 1: Nettoeinkommen */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Bereinigtes Nettoeinkommen des Unterhaltspflichtigen
        </h2>
        <NummerEingabe value={netto} onChange={setNetto} placeholder="3000" einheit="€/Monat" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Nach Abzug berufsbedingter Aufwendungen (5 % pauschal) und Schulden.</p>
      </div>

      {/* 2: Anzahl Kinder */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Anzahl unterhaltsberechtigter Kinder
        </h2>
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

      {/* 3: Einstellungen je Kind */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Einstellungen je Kind
        </h2>
        <div className="space-y-4">
          {Array.from({ length: anzahlKinder }).map((_, i) => {
            const k = kinder[i] || defaultKind('6-11');
            const voll = istVolljaehrig(k.alter);
            return (
              <div key={i} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 w-16">Kind {i + 1}</span>
                  <select
                    value={k.alter}
                    onChange={e => handleAlterChange(i, e.target.value as Altersstufe)}
                    className="flex-1 min-h-[48px] px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200"
                  >
                    {(Object.keys(ALTERS_LABELS) as Altersstufe[]).map(key => (
                      <option key={key} value={key}>{ALTERS_LABELS[key]}</option>
                    ))}
                  </select>
                </div>

                {voll && (
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${istPrivilegiert(k.alter) ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300' : 'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300'}`}>
                      {istPrivilegiert(k.alter) ? 'Privilegiert volljährig' : 'Nicht-privilegiert volljährig'}
                    </span>
                  </div>
                )}

                {k.alter === '25-30' && (
                  <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg p-2">
                    ⚠️ Ab 25 entfällt das Kindergeld. Der Unterhaltsanspruch kann bei zielstrebiger Erstausbildung fortbestehen.
                  </p>
                )}

                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">Erhält das Kind Kindergeld?</label>
                  <div className="flex gap-2">
                    {([
                      [true, 'Ja'],
                      [false, 'Nein'],
                    ] as const).map(([val, label]) => (
                      <button
                        key={String(val)}
                        onClick={() => updateKind(i, { kindergeldJa: val })}
                        className={`flex-1 min-h-[48px] px-4 rounded-xl text-sm font-medium transition-all ${k.kindergeldJa === val ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Kindergeld wird i. d. R. bis 25 gezahlt, wenn das Kind in Ausbildung/Studium ist.</p>
                </div>

                {k.kindergeldJa && (
                  <div>
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">Verrechnung</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {([
                        [false, 'Hälftig (127,50 €)'],
                        [true, 'Voll (255 €)'],
                      ] as const).map(([val, label]) => (
                        <button
                          key={String(val)}
                          onClick={() => updateKind(i, { kindergeldVoll: val })}
                          className={`flex-1 min-h-[48px] px-4 rounded-xl text-sm font-medium transition-all ${k.kindergeldVoll === val ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {voll && (
                  <div>
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">Eigenes Einkommen des Kindes</label>
                    <NummerEingabe
                      value={k.eigenesEinkommen}
                      onChange={v => updateKind(i, { eigenesEinkommen: v })}
                      placeholder="0"
                      einheit="€/Monat"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ausbildungsvergütung, Nebenjob etc. Mindert den Unterhaltsanspruch (100 € ausbildungsbedingter Mehrbedarf werden pauschal abgezogen).</p>
                  </div>
                )}
              </div>
            );
          })}
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
            <strong>⚠️ Mangelfall:</strong> Der reguläre Tabellenunterhalt ({fmtEuro(ergebnis.summeRegulaer)} €) kann nicht voll gezahlt werden. Selbstbehalt {fmtEuro(SELBSTBEHALT_RANG1)} € (gegenüber Minderjährigen/privilegiert Volljährigen){ergebnis.hatRang2 ? ` bzw. ${fmtEuro(SELBSTBEHALT_RANG2)} € (gegenüber nicht-privilegiert Volljährigen)` : ''}. Rang&nbsp;1 hat Vorrang vor Rang&nbsp;2; die Beträge werden anteilig gekürzt (Quotelung).
          </p>
        </div>
      )}

      {/* Tabelle pro Kind */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Aufschlüsselung pro Kind</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-3 py-2 text-left font-semibold">Kind</th>
                <th className="px-3 py-2 text-left font-semibold">Alter</th>
                <th className="px-3 py-2 text-right font-semibold">Tabelle</th>
                <th className="px-3 py-2 text-right font-semibold">− KG</th>
                <th className="px-3 py-2 text-right font-semibold">− Eig. Eink.</th>
                <th className="px-3 py-2 text-right font-semibold">Zahlbetrag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.kinder.map(k => (
                <tr key={k.index}>
                  <td className="px-3 py-2.5 text-gray-700 dark:text-gray-300">
                    Kind {k.index}
                    {k.volljaehrig && (
                      <span className={`ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${k.privilegiert ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300' : 'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300'}`}>
                        {k.privilegiert ? 'privilegiert' : 'nicht-privilegiert'}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">{ALTERS_LABELS[k.alter]}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(k.tabellen)} €</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">{k.kgAbzug > 0 ? `−${fmtEuro(k.kgAbzug)} €` : '—'}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">{k.anrechenbar > 0 ? `−${fmtEuro(k.anrechenbar)} €` : '—'}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-gray-900 dark:text-gray-100">{fmtEuro(k.zahl)} €</td>
                </tr>
              ))}
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
                <td className="px-3 py-3 text-blue-800 dark:text-blue-300" colSpan={5}>= Gesamtsumme</td>
                <td className="px-3 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.summe)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {ergebnis.kinder.some(k => k.alter === '25-30') && (
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
          <p className="text-amber-800 dark:text-amber-300 text-xs">
            ⚠️ Kein Kindergeld-Anspruch ab 25. Unterhaltsanspruch nur bei laufender Erstausbildung/Studium und zielstrebiger Durchführung.
          </p>
        </div>
      )}

      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Berechnung nach Düsseldorfer Tabelle 2026. Sonderbedarf und Mehrbedarf (z.&nbsp;B. Kita, Nachhilfe, Zahnspange, Studiengebühren) sind nicht berücksichtigt. Selbstbehalt {fmtEuro(SELBSTBEHALT_RANG1)} € (erwerbstätig, gegenüber minderjährigen & privilegiert volljährigen Kindern) bzw. {fmtEuro(SELBSTBEHALT_RANG2)} € (gegenüber nicht-privilegiert volljährigen Kindern).
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
          kinder: kinder.slice(0, anzahlKinder).map((k, i) => `Kind ${i + 1}: ${ALTERS_LABELS[k.alter]}${k.kindergeldJa ? `, KG ${k.kindergeldVoll ? 'voll' : 'hälftig'}` : ', kein KG'}${istVolljaehrig(k.alter) && parseDeutscheZahl(k.eigenesEinkommen) > 0 ? `, eig. Eink. ${k.eigenesEinkommen} €` : ''}`).join(' | '),
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
