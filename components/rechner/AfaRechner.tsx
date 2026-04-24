'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type Methode = 'linear' | 'degressiv' | 'gwg' | 'wohngebaeude-5' | 'sammelposten';

// Wohngebäude-Sonder-AfA § 7 Abs. 5a EStG: 5 % linear p. a. für neue
// Mietwohngebäude mit Bauantrag 01.10.2023 bis 30.09.2029.
const WOHNGEBAEUDE_SATZ_PROZENT = 5;

// Sammelposten-Pool § 6 Abs. 2a EStG: WG mit Anschaffungskosten netto
// 250,01 € bis 1.000 € werden in einem Pool zusammengefasst und über
// 5 Jahre linear mit 20 % p. a. abgeschrieben. Keine anteilige Jahres-AfA.
const SAMMELPOSTEN_MIN = 250.01;
const SAMMELPOSTEN_MAX = 1000;
const SAMMELPOSTEN_JAHRE = 5;

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

    // Sammelposten-Pool § 6 Abs. 2a EStG: 20 % linear über 5 Jahre,
    // keine anteilige Erstjahres-AfA (Pool wird zum Jahresende angelegt).
    if (methodeEffektiv === 'sammelposten') {
      const sammelOk = k >= SAMMELPOSTEN_MIN && k <= SAMMELPOSTEN_MAX;
      if (sammelOk) {
        const jaehrlich = k / SAMMELPOSTEN_JAHRE;
        let kum = 0;
        let rest = k;
        for (let i = 0; i < SAMMELPOSTEN_JAHRE; i++) {
          const afa = Math.min(jaehrlich, rest);
          kum += afa;
          rest -= afa;
          rows.push({ jahr: startJahr + i, afa, kumuliert: kum, restwert: rest });
        }
      }
      return {
        k, nd, methode: methodeEffektiv, rows,
        jaehrlich: sammelOk ? k / SAMMELPOSTEN_JAHRE : 0,
        linSatz: sammelOk ? 100 / SAMMELPOSTEN_JAHRE : 0,
        degSatzNum: 0, anteilErstjahr, startJahr,
        gwgOk: sammelOk, degressivGesperrt,
      };
    }

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

    if (methodeEffektiv === 'wohngebaeude-5') {
      // § 7 Abs. 5a EStG: 5 % linear p. a., Laufzeit automatisch 20 Jahre.
      // Der nd-Input wird ignoriert, weil der Satz durch das Gesetz fest ist.
      const jaehrlich = k * (WOHNGEBAEUDE_SATZ_PROZENT / 100);
      let kum = 0;
      let rest = k;
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
      return {
        k, nd, methode: methodeEffektiv, rows, jaehrlich,
        linSatz: WOHNGEBAEUDE_SATZ_PROZENT, degSatzNum: 0,
        anteilErstjahr, startJahr, gwgOk: true, degressivGesperrt,
      };
    }

    // Degressiv — Wechsel zu linear, wenn günstiger
    const linSatz = 100 / nd;
    const degNum = Math.min(parseDeutscheZahl(degSatz) || 0, 20);
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
    result.methode === 'wohngebaeude-5' ? 'Wohngebäude (5 % linear, § 7 Abs. 5a EStG)' :
    result.methode === 'sammelposten' ? 'Sammelposten-Pool (20 % über 5 Jahre, § 6 Abs. 2a EStG)' :
    'GWG (Sofortabschreibung)';

  const afaJahr1 = result.rows[0]?.afa ?? 0;
  const afaTypisch =
    result.methode === 'linear' ? (result.k / result.nd) :
    result.methode === 'wohngebaeude-5' ? (result.k * WOHNGEBAEUDE_SATZ_PROZENT / 100) :
    result.methode === 'sammelposten' ? (result.gwgOk ? result.k / SAMMELPOSTEN_JAHRE : 0) :
    afaJahr1;

  const ergebnis =
    result.methode === 'gwg'
      ? (result.gwgOk
          ? `GWG-Sofortabschreibung: ${fmtEuro(result.k)} im Jahr ${result.startJahr}.`
          : `GWG nicht möglich — Anschaffungskosten über 800 € netto.`)
      : result.methode === 'wohngebaeude-5'
      ? `AfA (${labelMethode}): ${fmtEuro(afaTypisch)} pro Jahr, ${fmtEuro(afaTypisch / 12)} pro Monat. Anschaffung ${fmtEuro(result.k)}, Laufzeit 20 Jahre.`
      : result.methode === 'sammelposten'
      ? (result.gwgOk
          ? `AfA (${labelMethode}): ${fmtEuro(afaTypisch)} pro Jahr über 5 Jahre. Anschaffung ${fmtEuro(result.k)}.`
          : `Sammelposten nicht möglich — Anschaffungskosten außerhalb 250,01 € bis 1.000 € netto.`)
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {([
            { key: 'linear', label: 'Linear' },
            { key: 'degressiv', label: 'Degressiv' },
            { key: 'gwg', label: 'GWG (bis 800 €)' },
            { key: 'wohngebaeude-5', label: 'Wohngebäude (5 %)' },
            { key: 'sammelposten', label: 'Sammelposten' },
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
        {methode === 'wohngebaeude-5' && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            5 % p. a. linear für neue Mietwohngebäude mit Bauantrag zwischen 01.10.2023 und 30.09.2029 (§ 7 Abs. 5a EStG). Voraussetzung: Effizienzhaus-Standards nach Förderrichtlinien. Die Nutzungsdauer-Eingabe wirkt hier nicht — der Plan läuft gesetzlich 20 Jahre.
          </p>
        )}
        {methode === 'sammelposten' && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            Sammelposten-Pool § 6 Abs. 2a EStG: 20 % p. a. linear über 5 Jahre, unabhängig von Nutzungsdauer. Alle WG eines Wirtschaftsjahres zusammen in einen Pool — Einzel-Anlagenbuchhaltung entfällt. Zulässig nur für WG mit Anschaffungskosten 250,01 € bis 1.000 € netto.
          </p>
        )}
      </div>

      {methode === 'degressiv' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Degressiver Satz (max. 20 %, höchstens 2× linearer Satz)
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
            : methode === 'sammelposten' && !result.gwgOk
            ? '—'
            : fmtEuro(afaTypisch)}
        </p>
        {methode !== 'gwg' && !(methode === 'sammelposten' && !result.gwgOk) && (
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
        {methode === 'sammelposten' && !result.gwgOk && (
          <p className="text-white/90 text-sm">Sammelposten nur für WG mit 250,01 € bis 1.000 € netto — bitte Methode wechseln.</p>
        )}
      </div>

      {/* AfA-Plan Tabelle */}
      {result.rows.length > 0 && result.methode !== 'gwg' && !(result.methode === 'sammelposten' && !result.gwgOk) && (
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
      <CrossLink href="/arbeit/freelancer-stundensatz-rechner" emoji="🧮" text="Freelancer-Stundensatz: Der faire Stundenlohn für Selbstständige" />

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
        <AffiliateBox programId="cosmosdirekt" context="wohngebaeude" />
      </div>
    </div>
  );
}
