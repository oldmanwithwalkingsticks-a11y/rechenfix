'use client';

import { useState, useMemo } from 'react';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '@/lib/berechnungen/sv-parameter';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type StKl = 1 | 2 | 3 | 4 | 5 | 6;

// Pauschaler AG-SV-Anteil (grob ~20 %): KV 7,3 + Zusatz 0,85 + RV 9,3 + ALV 1,3 + PV 1,8
const AG_SV_QUOTE = 0.2035;

interface Option {
  id: string;
  label: string;
  beschreibung: string;
  nettoZugewinn: number;
  agKosten: number;
  rente?: boolean;
}

export default function NettolohnOptimiererRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [steuerklasse, setSteuerklasse] = useState<StKl>(1);
  const [agBetrag, setAgBetrag] = useState('200');
  const [kirchensteuer, setKirchensteuer] = useState(false);

  const bruttoAlt = parseDeutscheZahl(brutto);
  const betrag = Math.max(0, parseDeutscheZahl(agBetrag));

  const common = {
    steuerklasse,
    kirchensteuer,
    kirchensteuersatz: 9 as const,
    kinderfreibetraege: 0,
    bundesland: 'NW',
    kvArt: 'gesetzlich' as const,
    kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat' as const,
  };

  const alt = useMemo(
    () => berechneBruttoNetto({ ...common, bruttoMonat: bruttoAlt }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bruttoAlt, steuerklasse, kirchensteuer]
  );
  const neu = useMemo(
    () => berechneBruttoNetto({ ...common, bruttoMonat: bruttoAlt + betrag }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bruttoAlt, betrag, steuerklasse, kirchensteuer]
  );

  const nettoDiffBrutto = Math.max(0, neu.nettoMonat - alt.nettoMonat);
  const agKostenBrutto = betrag * (1 + AG_SV_QUOTE);

  const optionen: Option[] = useMemo(() => {
    const cap = (grenze: number) => Math.min(betrag, grenze);
    return [
      {
        id: 'brutto',
        label: 'Brutto-Gehaltserhöhung',
        beschreibung: 'Klassische Lohnerhöhung — voll steuer- und sozialabgabenpflichtig.',
        nettoZugewinn: nettoDiffBrutto,
        agKosten: agKostenBrutto,
      },
      {
        id: 'sachbezug',
        label: 'Sachbezug 50 € (§ 8 Abs. 2 EStG)',
        beschreibung: 'Gutschein bis 50 €/Monat — steuer- und SV-frei für AN und AG.',
        nettoZugewinn: cap(50),
        agKosten: cap(50),
      },
      {
        id: 'jobticket',
        label: 'Jobticket / Deutschlandticket',
        beschreibung: 'Deutschlandticket steuerfrei bis 63 €/Monat (Stand 2026, ÖPNV-Zuschuss).',
        nettoZugewinn: cap(63),
        agKosten: cap(63),
      },
      {
        id: 'essen',
        label: 'Essenszuschuss (Restaurantschecks)',
        beschreibung: 'Bis 7,23 €/Arbeitstag steuerfrei — bei 20 Tagen = 144,60 €/Monat.',
        nettoZugewinn: cap(144.6),
        agKosten: cap(144.6),
      },
      {
        id: 'internet',
        label: 'Internet-Pauschale',
        beschreibung: 'Pauschal 50 €/Monat steuerfrei für berufliche Internetnutzung.',
        nettoZugewinn: cap(50),
        agKosten: cap(50),
      },
      {
        id: 'bav',
        label: 'Betriebliche Altersvorsorge (BAV)',
        beschreibung: 'Bis 302 €/Monat steuer- und SV-frei — fließt aber in die Rente, heute 0 € netto.',
        nettoZugewinn: 0,
        agKosten: cap(302),
        rente: true,
      },
    ];
  }, [betrag, nettoDiffBrutto, agKostenBrutto]);

  const ranking = useMemo(
    () =>
      [...optionen]
        .filter(o => o.agKosten > 0 || o.nettoZugewinn > 0)
        .sort((a, b) => b.nettoZugewinn - a.nettoZugewinn),
    [optionen]
  );

  const sieger = ranking[0];
  const maxNetto = Math.max(...optionen.map(o => o.nettoZugewinn), 1);
  const vorteilVsBrutto = sieger ? sieger.nettoZugewinn - nettoDiffBrutto : 0;

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmt2 = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Monatsbrutto */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktuelles Monatsbrutto</label>
        <NummerEingabe value={brutto} onChange={setBrutto} placeholder="3500" einheit="€/Monat" />
      </div>

      {/* Steuerklasse */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Steuerklasse</label>
        <div className="flex flex-wrap gap-2">
          {([1, 2, 3, 4, 5, 6] as StKl[]).map(k => (
            <button
              key={k}
              onClick={() => setSteuerklasse(k)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] min-w-[48px] ${
                steuerklasse === k
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* AG-Budget */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geplanter Betrag vom Arbeitgeber</label>
        <NummerEingabe value={agBetrag} onChange={setAgBetrag} placeholder="200" einheit="€/Monat" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Budget, das der Arbeitgeber für Sie bereitstellt — als Gehaltserhöhung ODER Sachbezug.</p>
      </div>

      {/* Kirchensteuer */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kirchensteuer</label>
        <div className="flex gap-2">
          {([
            [false, 'Nein'],
            [true, 'Ja (9 %)'],
          ] as const).map(([val, label]) => (
            <button
              key={String(val)}
              onClick={() => setKirchensteuer(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                kirchensteuer === val
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Gewinner-Box */}
      {sieger && (
        <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
          <p className="text-white/80 text-sm mb-1">Optimale Strategie für {fmt(betrag)} € AG-Budget</p>
          <p className="text-3xl md:text-4xl font-bold">{sieger.label}</p>
          <p className="text-white/90 mt-2">
            Netto-Zugewinn: <strong>{fmt2(sieger.nettoZugewinn)} €/Monat</strong>
            {vorteilVsBrutto > 0.5 && (
              <> — das sind <strong>{fmt2(vorteilVsBrutto)} €/Monat mehr</strong> als bei einer Brutto-Gehaltserhöhung.</>
            )}
          </p>
        </div>
      )}

      {/* Vergleichstabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich aller Optionen</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-3 py-2 text-left font-semibold">#</th>
                <th className="px-3 py-2 text-left font-semibold">Option</th>
                <th className="px-3 py-2 text-right font-semibold">Netto AN</th>
                <th className="px-3 py-2 text-right font-semibold">Kosten AG</th>
                <th className="px-3 py-2 text-right font-semibold">vs. Brutto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ranking.map((o, i) => {
                const diff = o.nettoZugewinn - nettoDiffBrutto;
                return (
                  <tr key={o.id} className={i === 0 ? 'bg-green-50 dark:bg-green-500/10 font-semibold' : ''}>
                    <td className="px-3 py-2.5 text-gray-500 dark:text-gray-400 tabular-nums">{i + 1}</td>
                    <td className="px-3 py-2.5 text-gray-800 dark:text-gray-200">
                      {o.label}
                      {o.rente && <span className="block text-[11px] font-normal text-gray-500 dark:text-gray-400">(fließt in Rente)</span>}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400">+{fmt2(o.nettoZugewinn)} €</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400">{fmt2(o.agKosten)} €</td>
                    <td className={`px-3 py-2.5 text-right tabular-nums ${diff > 0 ? 'text-green-600 dark:text-green-400' : diff < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-500'}`}>
                      {diff > 0 ? '+' : ''}{fmt2(diff)} €
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Balkendiagramm */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Netto-Zugewinn pro Option</h2>
        <div className="space-y-2">
          {ranking.map(o => (
            <div key={o.id}>
              <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-400">
                <span className="truncate pr-2">{o.label}</span>
                <span className="tabular-nums whitespace-nowrap">+{fmt2(o.nettoZugewinn)} €</span>
              </div>
              <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${(o.nettoZugewinn / maxNetto) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hinweis-Box */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>Hinweis:</strong> Steuerfreie Sachbezüge haben feste Obergrenzen und sind an Bedingungen geknüpft (z. B. zusätzlich zum ohnehin geschuldeten Arbeitslohn). Die BAV führt heute zu 0 € netto, senkt aber AG-SV-Kosten und baut Rente auf. Werte sind Orientierungswerte für 2026 — prüfen Sie aktuelle Freigrenzen.
        </p>
      </div>

      <CrossLink href="/finanzen/gehaltserhoehung-rechner" emoji="📈" text="Gehaltserhöhung-Rechner: Was bleibt netto von der Erhöhung?" />
      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💰" text="Brutto-Netto-Rechner: Alle Abzüge im Detail" />
      <CrossLink href="/finanzen/firmenwagenrechner" emoji="🚗" text="Firmenwagen-Rechner: Lohnt sich der Dienstwagen?" />

      <ErgebnisAktionen
        ergebnisText={sieger ? `Nettolohn-Optimierer: Bei ${fmt(betrag)} € AG-Budget ist "${sieger.label}" am besten — +${fmt2(sieger.nettoZugewinn)} €/Monat netto (${fmt2(vorteilVsBrutto)} € mehr als Brutto-Erhöhung)` : 'Nettolohn-Optimierer'}
        seitenTitel="Nettolohn-Optimierer"
      />

      <AffiliateBox programId="wiso" context="nettolohn" />

      <AiExplain
        rechnerName="Nettolohn-Optimierer"
        eingaben={{
          bruttoMonat: `${fmt(bruttoAlt)} €`,
          steuerklasse,
          agBudget: `${fmt(betrag)} €/Monat`,
          kirchensteuer: kirchensteuer ? 'Ja' : 'Nein',
        }}
        ergebnis={{
          bestOption: sieger?.label ?? '—',
          nettoZugewinnBrutto: `${fmt2(nettoDiffBrutto)} €`,
          nettoZugewinnBeste: sieger ? `${fmt2(sieger.nettoZugewinn)} €` : '—',
          vorteilVsBrutto: `${fmt2(vorteilVsBrutto)} €`,
        }}
      />
    </div>
  );
}
