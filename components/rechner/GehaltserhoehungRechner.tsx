'use client';

import { useState, useMemo } from 'react';
import { berechneBruttoNetto, BUNDESLAENDER } from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '@/lib/berechnungen/sv-parameter';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type StKl = 1 | 2 | 3 | 4 | 5 | 6;
type Modus = 'euro' | 'prozent';

const INFLATION_2025 = 2.5;

export default function GehaltserhoehungRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [modus, setModus] = useState<Modus>('euro');
  const [erhoehungEuro, setErhoehungEuro] = useState('300');
  const [erhoehungProzent, setErhoehungProzent] = useState('8');
  const [steuerklasse, setSteuerklasse] = useState<StKl>(1);
  const [bundesland, setBundesland] = useState('NW');
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [kinder, setKinder] = useState('0');

  const bruttoAlt = parseDeutscheZahl(brutto);
  const bruttoNeu = modus === 'euro'
    ? bruttoAlt + parseDeutscheZahl(erhoehungEuro)
    : bruttoAlt * (1 + parseDeutscheZahl(erhoehungProzent) / 100);

  const kirchensteuersatz = (BUNDESLAENDER.find(b => b.kuerzel === bundesland)?.kirchensteuersatz ?? 9) as 8 | 9;

  const common = {
    steuerklasse,
    kirchensteuer,
    kirchensteuersatz,
    kinderfreibetraege: parseInt(kinder, 10) || 0,
    bundesland,
    kvArt: 'gesetzlich' as const,
    kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat' as const,
  };

  const alt = useMemo(() => berechneBruttoNetto({ ...common, bruttoMonat: bruttoAlt }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bruttoAlt, steuerklasse, kirchensteuer, kirchensteuersatz, kinder, bundesland]);

  const neu = useMemo(() => berechneBruttoNetto({ ...common, bruttoMonat: bruttoNeu }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bruttoNeu, steuerklasse, kirchensteuer, kirchensteuersatz, kinder, bundesland]);

  const bruttoDiff = bruttoNeu - bruttoAlt;
  const bruttoDiffProzent = bruttoAlt > 0 ? (bruttoDiff / bruttoAlt) * 100 : 0;
  const nettoDiff = neu.nettoMonat - alt.nettoMonat;
  const lstDiff = neu.lohnsteuer - alt.lohnsteuer;
  const soliDiff = neu.solidaritaet - alt.solidaritaet;
  const kstDiff = neu.kirchensteuer - alt.kirchensteuer;
  const svDiff = (neu.krankenversicherung + neu.rentenversicherung + neu.arbeitslosenversicherung + neu.pflegeversicherung)
    - (alt.krankenversicherung + alt.rentenversicherung + alt.arbeitslosenversicherung + alt.pflegeversicherung);
  const abgabenAufErhoehung = bruttoDiff - nettoDiff;
  const grenzbelastung = bruttoDiff > 0 ? (abgabenAufErhoehung / bruttoDiff) * 100 : 0;
  const nettoQuote = bruttoDiff > 0 ? (nettoDiff / bruttoDiff) * 100 : 0;

  const reallohnDiff = bruttoDiffProzent - INFLATION_2025;

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtProz = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  // Balken-Verhältnis Netto vs. Abgaben
  const nettoPct = Math.max(0, Math.min(100, nettoQuote));
  const abgabenPct = 100 - nettoPct;

  return (
    <div>
      {/* === 1: Brutto === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Aktuelles Monatsbrutto
        </h2>
        <NummerEingabe value={brutto} onChange={setBrutto} placeholder="3500" einheit="€/Monat" />
      </div>

      {/* === 2: Erhöhung === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Gehaltserhöhung
        </h2>
        <div className="flex gap-2 mb-2">
          {([['euro', 'In Euro'], ['prozent', 'In Prozent']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setModus(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[44px] ${modus === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
        {modus === 'euro' ? (
          <NummerEingabe value={erhoehungEuro} onChange={setErhoehungEuro} placeholder="300" einheit="€/Monat" />
        ) : (
          <NummerEingabe value={erhoehungProzent} onChange={setErhoehungProzent} placeholder="8" einheit="%" />
        )}
      </div>

      {/* === 3: Steuerklasse === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Steuerklasse
        </h2>
        <div className="flex flex-wrap gap-2">
          {([1, 2, 3, 4, 5, 6] as StKl[]).map(k => (
            <button
              key={k}
              onClick={() => setSteuerklasse(k)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[44px] min-w-[48px] ${steuerklasse === k ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* === 4: Bundesland === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Bundesland
        </h2>
        <select id="gehaltserhoehung-select-1" aria-label="Bundesland"
          value={bundesland}
          onChange={e => setBundesland(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {BUNDESLAENDER.map(b => (
            <option key={b.kuerzel} value={b.kuerzel}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* === 5: Kirchensteuer === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
          Kirchensteuer
        </h2>
        <div className="flex gap-2">
          {([[false, 'Nein'], [true, `Ja (${kirchensteuersatz} %)`]] as const).map(([val, label]) => (
            <button
              key={String(val)}
              onClick={() => setKirchensteuer(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${kirchensteuer === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* === 6: Kinderfreibeträge === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">6</span>
          Kinderfreibeträge
        </h2>
        <div className="flex flex-wrap gap-2">
          {['0', '1', '2', '3', '4'].map(k => (
            <button
              key={k}
              onClick={() => setKinder(k)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[44px] min-w-[48px] ${kinder === k ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6" style={nettoDiff > 0 ? { background: 'linear-gradient(135deg, #059669, #10b981)' } : undefined}>
        <p className="text-white/80 text-sm mb-1">Netto-Erhöhung pro Monat</p>
        <p className="text-5xl font-bold">{nettoDiff >= 0 ? '+' : ''}{fmtEuro(nettoDiff)} €</p>
        <p className="text-white/80 text-sm mt-1">
          Brutto-Erhöhung: <strong>+{fmtEuro(bruttoDiff)} €</strong> ({fmtProz(bruttoDiffProzent)} %) · pro Jahr: <strong>+{fmtEuro(nettoDiff * 12)} €</strong>
        </p>
      </div>

      {/* Highlight-Box */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          Von <strong>{fmtEuro(bruttoDiff)} € Brutto-Erhöhung</strong> bleiben <strong className="text-green-600 dark:text-green-400">{fmtEuro(nettoDiff)} € Netto</strong> — der Staat bekommt <strong className="text-red-600 dark:text-red-400">{fmtEuro(abgabenAufErhoehung)} € ({fmtProz(grenzbelastung)} %)</strong>.
        </p>
        <div className="flex h-8 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
          <div className="bg-green-700 flex items-center justify-center text-white text-xs font-semibold" style={{ width: `${nettoPct}%` }}>
            {nettoPct >= 15 ? `Netto ${fmtProz(nettoPct)} %` : ''}
          </div>
          <div className="bg-red-700 flex items-center justify-center text-white text-xs font-semibold" style={{ width: `${abgabenPct}%` }}>
            {abgabenPct >= 15 ? `Abgaben ${fmtProz(abgabenPct)} %` : ''}
          </div>
        </div>
      </div>

      {/* Vergleichstabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich: vorher / nachher</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-3 py-2 text-left font-semibold">Position</th>
                <th className="px-3 py-2 text-right font-semibold">Aktuell</th>
                <th className="px-3 py-2 text-right font-semibold">Nach Erhöhung</th>
                <th className="px-3 py-2 text-right font-semibold">Differenz</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="px-3 py-2.5 text-gray-700 dark:text-gray-300">Brutto/Monat</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(bruttoAlt)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(bruttoNeu)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400">+{fmtEuro(bruttoDiff)} €</td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Lohnsteuer</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(alt.lohnsteuer)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(neu.lohnsteuer)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">+{fmtEuro(lstDiff)} €</td>
              </tr>
              {neu.solidaritaet + alt.solidaritaet > 0 && (
                <tr>
                  <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Solidaritätszuschlag</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(alt.solidaritaet)} €</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(neu.solidaritaet)} €</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">+{fmtEuro(soliDiff)} €</td>
                </tr>
              )}
              {kirchensteuer && (
                <tr>
                  <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Kirchensteuer</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(alt.kirchensteuer)} €</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(neu.kirchensteuer)} €</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">+{fmtEuro(kstDiff)} €</td>
                </tr>
              )}
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Sozialabgaben</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(alt.sozialabgabenGesamt)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(neu.sozialabgabenGesamt)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">+{fmtEuro(svDiff)} €</td>
              </tr>
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
                <td className="px-3 py-3 text-blue-800 dark:text-blue-300">Netto/Monat</td>
                <td className="px-3 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(alt.nettoMonat)} €</td>
                <td className="px-3 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(neu.nettoMonat)} €</td>
                <td className="px-3 py-3 text-right tabular-nums text-green-600 dark:text-green-400">+{fmtEuro(nettoDiff)} €</td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Netto/Jahr</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(alt.nettoJahr)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(neu.nettoJahr)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400">+{fmtEuro(nettoDiff * 12)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Balkendiagramm Altes vs. Neues Netto */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Netto-Vergleich</h2>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-400">
              <span>Aktuell</span>
              <span className="tabular-nums">{fmtEuro(alt.nettoMonat)} €</span>
            </div>
            <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div className="h-full bg-gray-400" style={{ width: `${(alt.nettoMonat / Math.max(alt.nettoMonat, neu.nettoMonat, 1)) * 100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-400">
              <span>Nach Erhöhung</span>
              <span className="tabular-nums font-semibold">{fmtEuro(neu.nettoMonat)} € (+{fmtEuro(nettoDiff)} €)</span>
            </div>
            <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${(neu.nettoMonat / Math.max(alt.nettoMonat, neu.nettoMonat, 1)) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Inflationscheck */}
      <div className={`border rounded-xl p-4 mb-6 ${reallohnDiff >= 0 ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30' : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'}`}>
        <p className={`text-sm ${reallohnDiff >= 0 ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
          <strong>📊 Inflationscheck:</strong> Die Inflation lag 2025 bei ca. {fmtProz(INFLATION_2025)} %. Ihre Erhöhung von {fmtProz(bruttoDiffProzent)} % liegt {reallohnDiff >= 0 ? 'über' : 'unter'} der Inflation — Ihr Reallohn {reallohnDiff >= 0 ? 'steigt' : 'sinkt'} um ca. {fmtProz(Math.abs(reallohnDiff))} Prozentpunkte. Prüfen Sie den <a href="/finanzen/inflationsrechner" className="underline">Inflationsrechner</a> für langfristige Effekte.
        </p>
      </div>

      {/* Tipp steuerfreie Alternativen */}
      <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-4 mb-6">
        <p className="text-indigo-800 dark:text-indigo-300 text-sm">
          <strong>💡 Tipp:</strong> Alternative zur Gehaltserhöhung: Steuerfreie Zuschüsse wie Jobticket, Essenszuschuss, Kindergarten-Zuschuss oder betriebliche Altersvorsorge sind oft effektiver, weil keine Steuern und Sozialabgaben anfallen — netto kommt bei Ihnen mehr an.
        </p>
      </div>

      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💰" text="Brutto-Netto-Rechner: Details zu allen Abgaben" />
      <CrossLink href="/finanzen/inflationsrechner" emoji="📈" text="Inflationsrechner: Reale Kaufkraft prüfen" />
      <CrossLink href="/finanzen/gehaltsvergleich" emoji="⚖️" text="Gehaltsvergleich nach Beruf und Region" />

      <ErgebnisAktionen
        ergebnisText={`Gehaltserhöhung: +${fmtEuro(bruttoDiff)} € brutto → +${fmtEuro(nettoDiff)} € netto/Monat (+${fmtEuro(nettoDiff * 12)} €/Jahr) | Grenzbelastung ${fmtProz(grenzbelastung)} % | Altes Netto ${fmtEuro(alt.nettoMonat)} € → Neues Netto ${fmtEuro(neu.nettoMonat)} €`}
        seitenTitel="Gehaltserhöhung-Rechner"
      />

      <AffiliateBox programId="wiso" context="gehaltserhoehung" />

      <AiExplain
        rechnerName="Gehaltserhöhung-Rechner"
        eingaben={{
          bruttoAlt: `${fmtEuro(bruttoAlt)} €/Monat`,
          erhoehung: modus === 'euro' ? `${erhoehungEuro} €` : `${erhoehungProzent} %`,
          bruttoNeu: `${fmtEuro(bruttoNeu)} €/Monat`,
          steuerklasse,
          bundesland,
          kirchensteuer: kirchensteuer ? `Ja (${kirchensteuersatz} %)` : 'Nein',
          kinder,
        }}
        ergebnis={{
          bruttoDiff: `+${fmtEuro(bruttoDiff)} €`,
          nettoDiff: `+${fmtEuro(nettoDiff)} €`,
          nettoDiffJahr: `+${fmtEuro(nettoDiff * 12)} €`,
          grenzbelastung: `${fmtProz(grenzbelastung)} %`,
          nettoQuote: `${fmtProz(nettoQuote)} %`,
          altNetto: `${fmtEuro(alt.nettoMonat)} €`,
          neuNetto: `${fmtEuro(neu.nettoMonat)} €`,
        }}
      />
    </div>
  );
}
