'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type Methode = 'linear' | 'degressiv' | 'gwg';

interface JahresRow {
  jahr: number;
  afa: number;
  kumuliert: number;
  restwert: number;
}

export default function AfaRechner() {
  const [kosten, setKosten] = useState<string>('10000');
  const [nutzungsdauer, setNutzungsdauer] = useState<string>('5');
  const [methode, setMethode] = useState<Methode>('linear');
  const [degSatz, setDegSatz] = useState<string>('20');
  const [datum, setDatum] = useState<string>('2026-01-01');

  const result = useMemo(() => {
    const k = parseDeutscheZahl(kosten) || 0;
    const nd = Math.max(1, Math.round(parseDeutscheZahl(nutzungsdauer) || 1));
    const startDate = new Date(datum || '2026-01-01');
    const startMonat = isNaN(startDate.getTime()) ? 1 : startDate.getMonth() + 1;
    const startJahr = isNaN(startDate.getTime()) ? 2026 : startDate.getFullYear();
    const restMonate = 13 - startMonat; // z.B. 01. Januar -> 12 Monate
    const anteilErstjahr = restMonate / 12;

    // § 7 Abs. 2 EStG n.F. (Wachstumschancengesetz): degressive AfA für
    // bewegliche Wirtschaftsgüter ist für Anschaffungen ab 01.01.2026
    // nicht mehr zulässig. Fallback auf linear, Button-State bleibt als
    // User-Intention erhalten.
    const degressivGesperrt = methode === 'degressiv' && startJahr >= 2026;
    const methodeEffektiv: Methode = degressivGesperrt ? 'linear' : methode;

    const rows: JahresRow[] = [];

    // GWG (bis 800€ netto): sofort
    if (methodeEffektiv === 'gwg') {
      if (k <= 800) {
        rows.push({ jahr: startJahr, afa: k, kumuliert: k, restwert: 0 });
      } else {
        // Über 800 € nicht zulässig — Hinweis, kein Plan
      }
      const jaehrlich = k <= 800 ? k : 0;
      return {
        k, nd, methode: methodeEffektiv, rows, jaehrlich,
        linSatz: 0, degSatzNum: 0, anteilErstjahr, startJahr,
        gwgOk: k <= 800, degressivGesperrt,
      };
    }

    if (methodeEffektiv === 'linear') {
      const jaehrlich = k / nd;
      let kum = 0;
      let rest = k;
      // Erstes Jahr anteilig
      const erstAfa = Math.min(jaehrlich * anteilErstjahr, rest);
      kum += erstAfa;
      rest -= erstAfa;
      rows.push({ jahr: startJahr, afa: erstAfa, kumuliert: kum, restwert: rest });

      let jahr = startJahr + 1;
      while (rest > 0.01 && rows.length < 60) {
        const afa = Math.min(jaehrlich, rest);
        kum += afa;
        rest -= afa;
        rows.push({ jahr, afa, kumuliert: kum, restwert: rest });
        jahr++;
      }
      return { k, nd, methode: methodeEffektiv, rows, jaehrlich, linSatz: 100 / nd, degSatzNum: 0, anteilErstjahr, startJahr, gwgOk: true, degressivGesperrt };
    }

    // Degressiv — Wechsel zu linear, wenn günstiger
    const linSatz = 100 / nd;
    const degNum = Math.min(parseDeutscheZahl(degSatz) || 0, 25);
    let rest = k;
    let kum = 0;
    // Erstes Jahr anteilig
    const ersteAfa = Math.min(rest * (degNum / 100) * anteilErstjahr, rest);
    kum += ersteAfa;
    rest -= ersteAfa;
    rows.push({ jahr: startJahr, afa: ersteAfa, kumuliert: kum, restwert: rest });
    let jahr = startJahr + 1;
    let restJahre = nd - anteilErstjahr;
    let inLinear = false;
    while (rest > 0.01 && rows.length < 60) {
      const deg = rest * (degNum / 100);
      const lin = rest / Math.max(1, restJahre);
      let afa = deg;
      if (inLinear || lin > deg) {
        afa = lin;
        inLinear = true;
      }
      afa = Math.min(afa, rest);
      kum += afa;
      rest -= afa;
      rows.push({ jahr, afa, kumuliert: kum, restwert: rest });
      jahr++;
      restJahre -= 1;
      if (restJahre <= 0) break;
    }
    return { k, nd, methode: methodeEffektiv, rows, jaehrlich: rows[1]?.afa ?? ersteAfa, linSatz, degSatzNum: degNum, anteilErstjahr, startJahr, gwgOk: true, degressivGesperrt };
  }, [kosten, nutzungsdauer, methode, degSatz, datum]);

  const fmtEuro = (n: number) =>
    n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const fmtEuro2 = (n: number) =>
    n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });

  const labelMethode =
    result.methode === 'linear' ? 'Linear' :
    result.methode === 'degressiv' ? `Degressiv (${result.degSatzNum}%)` :
    'GWG (Sofortabschreibung)';

  const afaJahr1 = result.rows[0]?.afa ?? 0;
  const afaTypisch = result.methode === 'linear' ? (result.k / result.nd) : afaJahr1;

  const ergebnis =
    result.methode === 'gwg'
      ? (result.gwgOk
          ? `GWG-Sofortabschreibung: ${fmtEuro(result.k)} im Jahr ${result.startJahr}.`
          : `GWG nicht möglich — Anschaffungskosten über 800 € netto.`)
      : `AfA (${labelMethode}): ${fmtEuro(afaTypisch)} pro Jahr, ${fmtEuro(afaTypisch / 12)} pro Monat. Anschaffung ${fmtEuro(result.k)}, Nutzungsdauer ${result.nd} Jahre.`;

  // Max für Diagramm
  const maxRest = result.rows.length > 0 ? result.rows[0].restwert + afaJahr1 : result.k;

  return (
    <div>
      {/* Anschaffungskosten */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Anschaffungskosten (netto)
        </label>
        <NummerEingabe value={kosten} onChange={setKosten} placeholder="10000" einheit="€" />
      </div>

      {/* Nutzungsdauer */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nutzungsdauer
        </label>
        <NummerEingabe value={nutzungsdauer} onChange={setNutzungsdauer} placeholder="5" einheit="Jahre" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Laut AfA-Tabelle des BMF</p>
      </div>

      {/* Methode */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Abschreibungsmethode</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {([
            { key: 'linear', label: 'Linear' },
            { key: 'degressiv', label: 'Degressiv' },
            { key: 'gwg', label: 'GWG (bis 800 €)' },
          ] as const).map(o => (
            <button
              key={o.key}
              onClick={() => setMethode(o.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                methode === o.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {methode === 'degressiv' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Degressiver Satz (max. 25 %, höchstens 2× linearer Satz)
          </label>
          <NummerEingabe value={degSatz} onChange={setDegSatz} placeholder="20" einheit="%" />
        </div>
      )}

      {/* Datum */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Anschaffungsdatum
        </label>
        <input
          type="date"
          value={datum}
          onChange={e => setDatum(e.target.value)}
          className="w-full min-h-[48px] px-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Für die anteilige AfA im ersten Jahr (pro rata temporis)</p>
      </div>

      {/* Warn-Banner: Degressive AfA ab 2026 nicht zulässig */}
      {result.degressivGesperrt && (
        <div className="mb-4 p-3 rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/20">
          <p className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-1">
            ⚠️ Degressive AfA nicht mehr zulässig
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300">
            Nach § 7 Abs. 2 EStG n.F. (Wachstumschancengesetz) ist die degressive AfA für bewegliche
            Wirtschaftsgüter nur noch für Anschaffungen bis 31.12.2025 zulässig. Für Ihr
            Anschaffungsdatum wird automatisch linear gerechnet. Um degressiv zu reaktivieren, setzen
            Sie das Anschaffungsdatum auf einen Tag bis 31.12.2025.
          </p>
        </div>
      )}

      {/* Ergebnis */}
      <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #059669, #0d9488)' }}>
        <p className="text-white/90 text-sm mb-1">Jährliche Abschreibung ({labelMethode})</p>
        <p className="text-4xl font-bold text-white mb-3">
          {methode === 'gwg'
            ? (result.gwgOk ? fmtEuro(result.k) : '—')
            : fmtEuro(afaTypisch)}
        </p>
        {methode !== 'gwg' && (
          <div className="grid grid-cols-2 gap-3 text-white text-sm">
            <div>
              <p className="opacity-80 text-xs">Monatliche AfA</p>
              <p className="text-lg font-semibold">{fmtEuro(afaTypisch / 12)}</p>
            </div>
            <div>
              <p className="opacity-80 text-xs">Erstes Jahr (anteilig)</p>
              <p className="text-lg font-semibold">{fmtEuro(afaJahr1)}</p>
            </div>
          </div>
        )}
        {methode === 'gwg' && !result.gwgOk && (
          <p className="text-white/90 text-sm">GWG nur bis 800 € netto zulässig — bitte Methode wechseln.</p>
        )}
      </div>

      {/* AfA-Plan Tabelle */}
      {result.rows.length > 0 && methode !== 'gwg' && (
        <div className="mb-6 p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 overflow-x-auto">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">AfA-Plan</p>
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                <th className="py-1 pr-2">Jahr</th>
                <th className="py-1 pr-2 text-right">AfA</th>
                <th className="py-1 pr-2 text-right">Kumuliert</th>
                <th className="py-1 pr-2 text-right">Restbuchwert</th>
                <th className="py-1 pl-2">Verlauf</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map(r => (
                <tr key={r.jahr} className="border-b border-gray-100 dark:border-gray-700/50">
                  <td className="py-1 pr-2 text-gray-700 dark:text-gray-300">{r.jahr}</td>
                  <td className="py-1 pr-2 text-right text-gray-700 dark:text-gray-300">{fmtEuro2(r.afa)}</td>
                  <td className="py-1 pr-2 text-right text-gray-700 dark:text-gray-300">{fmtEuro2(r.kumuliert)}</td>
                  <td className="py-1 pr-2 text-right text-gray-700 dark:text-gray-300">{fmtEuro2(r.restwert)}</td>
                  <td className="py-1 pl-2">
                    <div className="h-2 bg-emerald-200 dark:bg-emerald-900/40 rounded">
                      <div
                        className="h-2 bg-emerald-500 rounded"
                        style={{ width: `${Math.max(0, Math.min(100, (r.restwert / maxRest) * 100))}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CrossLink href="/finanzen/mwst-rechner" emoji="🧾" text="MwSt-Rechner: Netto, brutto und Umsatzsteuer berechnen" />
      <CrossLink href="/finanzen/gmbh-geschaeftsfuehrer-rechner" emoji="💼" text="GmbH-Geschäftsführer: Vergütung und Steuer berechnen" />
      <CrossLink href="/finanzen/freelancer-stundensatz-rechner" emoji="🧮" text="Freelancer-Stundensatz: Der faire Stundenlohn für Selbstständige" />

      <ErgebnisAktionen ergebnisText={ergebnis} seitenTitel="AfA-Rechner" />
      <AiExplain
        rechnerName="AfA-Rechner"
        eingaben={{
          Anschaffungskosten: `${result.k} €`,
          Nutzungsdauer: `${result.nd} Jahre`,
          Methode: labelMethode,
          Anschaffungsdatum: datum,
        }}
        ergebnis={{
          'Jährliche AfA': methode === 'gwg' ? (result.gwgOk ? `${result.k} € (Sofortabschreibung)` : 'nicht möglich') : `${afaTypisch.toFixed(2)} €`,
          'Monatliche AfA': methode === 'gwg' ? '—' : `${(afaTypisch / 12).toFixed(2)} €`,
          'Erstes Jahr (anteilig)': methode === 'gwg' ? '—' : `${afaJahr1.toFixed(2)} €`,
          'Gesamtlaufzeit': `${result.rows.length} Jahre`,
        }}
      />

      <div className="mt-6">
        <AffiliateBox programId="lexware" context="afa" />
      </div>
    </div>
  );
}
