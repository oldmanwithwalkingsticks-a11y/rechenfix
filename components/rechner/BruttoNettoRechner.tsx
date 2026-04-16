'use client';

import { useState, useMemo } from 'react';
import { berechneBruttoNetto, BUNDESLAENDER } from '@/lib/berechnungen/brutto-netto';
import type { BruttoNettoErgebnis } from '@/lib/berechnungen/brutto-netto';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import AiExplain from '@/components/rechner/AiExplain';
import WasWaereWenn from '@/components/rechner/WasWaereWenn';
import SchnellCheck from '@/components/rechner/SchnellCheck';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const TABELLEN_WERTE = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000];

function berechneSchnell(brutto: number, sk: 1 | 3 | 5): BruttoNettoErgebnis {
  return berechneBruttoNetto({
    bruttoMonat: brutto,
    steuerklasse: sk,
    kirchensteuer: false,
    kirchensteuersatz: 9,
    kinderfreibetraege: 0,
    bundesland: 'NW',
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: 1.7,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
  });
}

export default function BruttoNettoRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [steuerklasse, setSteuerklasse] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [kinder, setKinder] = useState(0);
  const [bundesland, setBundesland] = useState('NW');
  const [kvArt, setKvArt] = useState<'gesetzlich' | 'privat'>('gesetzlich');
  const [kvZusatzbeitrag, setKvZusatzbeitrag] = useState('1.7');
  const [kvPrivatBeitrag, setKvPrivatBeitrag] = useState('');
  const [rvBefreit, setRvBefreit] = useState(false);
  const [abrechnungszeitraum, setAbrechnungszeitraum] = useState<'monat' | 'jahr'>('monat');
  const [kopiert, setKopiert] = useState(false);
  const [weihnachtsgeldAktiv, setWeihnachtsgeldAktiv] = useState(false);
  const [weihnachtsgeldHoehe, setWeihnachtsgeldHoehe] = useState<'100' | '50' | 'eigen'>('100');
  const [weihnachtsgeldBetrag, setWeihnachtsgeldBetrag] = useState('');


  const bruttoNum = parseDeutscheZahl(brutto);
  const bl = BUNDESLAENDER.find(b => b.kuerzel === bundesland);
  const kstSatz = bl?.kirchensteuersatz ?? 9;

  const kvZusatzbeitragNum = parseDeutscheZahl(kvZusatzbeitrag);
  const kvPrivatBeitragNum = parseDeutscheZahl(kvPrivatBeitrag);
  const weihnachtsgeldBetragNum = parseDeutscheZahl(weihnachtsgeldBetrag);

  const weihnachtsgeldWert = useMemo(() => {
    if (!weihnachtsgeldAktiv) return 0;
    const monatsBrutto = abrechnungszeitraum === 'jahr' ? bruttoNum / 12 : bruttoNum;
    if (weihnachtsgeldHoehe === '100') return monatsBrutto;
    if (weihnachtsgeldHoehe === '50') return Math.round(monatsBrutto * 50) / 100;
    return weihnachtsgeldBetragNum;
  }, [weihnachtsgeldAktiv, weihnachtsgeldHoehe, weihnachtsgeldBetragNum, bruttoNum, abrechnungszeitraum]);

  const ergebnis = useMemo(() => berechneBruttoNetto({
    bruttoMonat: bruttoNum, steuerklasse, kirchensteuer, kirchensteuersatz: kstSatz,
    kinderfreibetraege: kinder, bundesland, kvArt, kvZusatzbeitrag: kvZusatzbeitragNum,
    kvPrivatBeitrag: kvPrivatBeitragNum, rvBefreit, abrechnungszeitraum,
    weihnachtsgeld: weihnachtsgeldWert > 0 ? weihnachtsgeldWert : undefined,
  }), [bruttoNum, steuerklasse, kirchensteuer, kstSatz, kinder, bundesland, kvArt, kvZusatzbeitragNum, kvPrivatBeitragNum, rvBefreit, abrechnungszeitraum, weihnachtsgeldWert]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pct = (n: number, base: number) => base > 0 ? ((n / base) * 100).toFixed(1) : '0.0';

  const skLabel = (sk: number) => {
    const labels: Record<number, string> = { 1: 'SK1', 2: 'SK2', 3: 'SK3', 4: 'SK4', 5: 'SK5', 6: 'SK6' };
    return labels[sk] || `SK${sk}`;
  };

  function handleCopy() {
    const blName = bl?.name || bundesland;
    let text = `Brutto: ${fmt(ergebnis.bruttoMonat)} € → Netto: ${fmt(ergebnis.nettoMonat)} € (${skLabel(steuerklasse)}, ${blName}, 2026)`;
    if (ergebnis.weihnachtsgeld) {
      text += ` | Weihnachtsgeld: ${fmt(ergebnis.weihnachtsgeld.brutto)} € brutto → ${fmt(ergebnis.weihnachtsgeld.netto)} € netto`;
    }
    navigator.clipboard.writeText(text);
    setKopiert(true);
    setTimeout(() => setKopiert(false), 2000);
  }

  function handlePrint() {
    window.print();
  }

  function handleShare() {
    const blName = bl?.name || bundesland;
    const text = `Mein Nettogehalt bei ${fmt(ergebnis.bruttoMonat)} € brutto: ${fmt(ergebnis.nettoMonat)} € (${skLabel(steuerklasse)}, ${blName}) — berechnet auf rechenfix.de/finanzen/brutto-netto-rechner`;
    if (navigator.share) {
      navigator.share({ title: 'Brutto-Netto-Berechnung', text });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  }

  return (
    <div>
      {/* Abrechnungszeitraum */}
      <div className="flex gap-2 mb-6 no-print">
        <button
          onClick={() => setAbrechnungszeitraum('monat')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            abrechnungszeitraum === 'monat'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Monatsgehalt
        </button>
        <button
          onClick={() => setAbrechnungszeitraum('jahr')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            abrechnungszeitraum === 'jahr'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Jahresgehalt
        </button>
      </div>

      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 no-print">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bruttogehalt ({abrechnungszeitraum === 'monat' ? 'monatlich' : 'jährlich'})
          </label>
          <NummerEingabe value={brutto} onChange={setBrutto} placeholder={abrechnungszeitraum === 'monat' ? 'z.B. 3500' : 'z.B. 42000'} einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Steuerklasse</label>
          <select value={steuerklasse} onChange={e => setSteuerklasse(Number(e.target.value) as 1|2|3|4|5|6)} className="input-field">
            <option value={1}>Steuerklasse 1 — Ledig</option>
            <option value={2}>Steuerklasse 2 — Alleinerziehend</option>
            <option value={3}>Steuerklasse 3 — Verheiratet (mehr)</option>
            <option value={4}>Steuerklasse 4 — Verheiratet (gleich)</option>
            <option value={5}>Steuerklasse 5 — Verheiratet (weniger)</option>
            <option value={6}>Steuerklasse 6 — Zweitjob</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bundesland</label>
          <select value={bundesland} onChange={e => setBundesland(e.target.value)} className="input-field">
            {BUNDESLAENDER.map(bl => (
              <option key={bl.kuerzel} value={bl.kuerzel}>{bl.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kinder (Freibeträge)</label>
          <select value={kinder} onChange={e => setKinder(Number(e.target.value))} className="input-field">
            <option value={0}>Keine Kinder</option>
            <option value={0.5}>0,5</option>
            <option value={1}>1</option>
            <option value={1.5}>1,5</option>
            <option value={2}>2</option>
            <option value={2.5}>2,5</option>
            <option value={3}>3+</option>
          </select>
        </div>
      </div>

      {/* Erweiterte Optionen */}
      <details className="mb-6 group no-print">
        <summary className="cursor-pointer text-sm font-medium text-primary-500 dark:text-primary-400 hover:text-primary-600 transition-colors list-none flex items-center gap-2">
          <svg className="w-4 h-4 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Erweiterte Optionen (KV, RV, Kirchensteuer, Weihnachtsgeld)
        </summary>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kirchensteuer</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={kirchensteuer} onChange={e => setKirchensteuer(e.target.checked)} className="w-5 h-5 rounded text-primary-500 focus:ring-primary-200" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Ja ({kstSatz}% in {bl?.name})</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Krankenversicherung</label>
            <div className="flex gap-2">
              <button onClick={() => setKvArt('gesetzlich')} className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${kvArt === 'gesetzlich' ? 'bg-accent-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>Gesetzlich</button>
              <button onClick={() => setKvArt('privat')} className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${kvArt === 'privat' ? 'bg-accent-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>Privat</button>
            </div>
          </div>
          {kvArt === 'gesetzlich' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">KV-Zusatzbeitrag (AN-Anteil)</label>
              <NummerEingabe value={kvZusatzbeitrag} onChange={setKvZusatzbeitrag} placeholder="z.B. 1,7" einheit="%" />
              <p className="text-xs text-gray-600 mt-1">Durchschnitt 2025: 1,7%</p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PKV-Beitrag (AN-Anteil)</label>
              <NummerEingabe value={kvPrivatBeitrag} onChange={setKvPrivatBeitrag} placeholder="z.B. 350" einheit="€" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rentenversicherung</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={rvBefreit} onChange={e => setRvBefreit(e.target.checked)} className="w-5 h-5 rounded text-primary-500 focus:ring-primary-200" />
              <span className="text-sm text-gray-700 dark:text-gray-300">RV-befreit (z. B. Beamte)</span>
            </label>
          </div>
          <div className="sm:col-span-2 border-t border-gray-200 dark:border-gray-600 pt-4 mt-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weihnachtsgeld</label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setWeihnachtsgeldAktiv(false)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${!weihnachtsgeldAktiv ? 'bg-accent-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}
              >
                Nein
              </button>
              <button
                type="button"
                onClick={() => setWeihnachtsgeldAktiv(true)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${weihnachtsgeldAktiv ? 'bg-accent-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}
              >
                Ja
              </button>
            </div>
            {weihnachtsgeldAktiv && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Höhe</label>
                  <select
                    value={weihnachtsgeldHoehe}
                    onChange={e => setWeihnachtsgeldHoehe(e.target.value as '100' | '50' | 'eigen')}
                    className="input-field"
                  >
                    <option value="100">Volles 13. Gehalt (100%)</option>
                    <option value="50">Halbes (50%)</option>
                    <option value="eigen">Eigener Betrag</option>
                  </select>
                </div>
                {weihnachtsgeldHoehe === 'eigen' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Betrag (brutto)</label>
                    <NummerEingabe value={weihnachtsgeldBetrag} onChange={setWeihnachtsgeldBetrag} placeholder="z.B. 2000" einheit="€" />
                  </div>
                )}
                {weihnachtsgeldHoehe !== 'eigen' && weihnachtsgeldWert > 0 && (
                  <div className="flex items-end">
                    <p className="text-sm text-gray-500 dark:text-gray-400 pb-2">
                      = {fmt(weihnachtsgeldWert)} € brutto
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </details>

      {/* KI-Schnellcheck Tipps */}
      {bruttoNum > 0 && (
        <SchnellCheck
          brutto={bruttoNum}
          steuerklasse={steuerklasse}
          kirchensteuer={kirchensteuer}
          kirchensteuersatz={kstSatz}
          kinder={kinder}
          kirchensteuerBetrag={ergebnis.kirchensteuer}
        />
      )}

      {/* Ergebnis */}
      {bruttoNum > 0 && (
        <>
          <div className="result-box mb-4" id="brutto-netto-ergebnis">
            <p className="text-white/80 text-sm mb-1">Dein Nettogehalt (monatlich)</p>
            <p className="text-4xl font-bold">{fmt(ergebnis.nettoMonat)} &euro;</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/70 text-sm mt-2">
              <span>{fmt(ergebnis.nettoJahr)} € / Jahr</span>
              <span>|</span>
              <span>~{fmt(ergebnis.nettoProStunde)} € / Stunde</span>
              <span>|</span>
              <span>{ergebnis.abzuegeProzent}% Abzüge</span>
            </div>
          </div>

          {/* Action-Buttons */}
          <div className="flex flex-wrap gap-3 mb-4 no-print">
            <button onClick={handleCopy} className="text-sm text-primary-500 dark:text-primary-400 hover:text-primary-600 font-medium transition-colors">
              {kopiert ? '✓ Kopiert' : 'Ergebnis kopieren'}
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button onClick={handleShare} className="text-sm text-primary-500 dark:text-primary-400 hover:text-primary-600 font-medium transition-colors">
              Ergebnis teilen
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button onClick={handlePrint} className="text-sm text-primary-500 dark:text-primary-400 hover:text-primary-600 font-medium transition-colors">
              Als PDF drucken
            </button>
          </div>

          {/* Prozentbalken */}
          <div className="mb-6">
            <div className="flex rounded-xl overflow-hidden h-8 text-xs font-medium">
              <div className="bg-green-500 flex items-center justify-center text-white transition-all" style={{ width: `${100 - ergebnis.abzuegeProzent}%` }}>
                {(100 - ergebnis.abzuegeProzent).toFixed(1)}% Netto
              </div>
              <div className="bg-red-400 flex items-center justify-center text-white transition-all" style={{ width: `${ergebnis.bruttoMonat > 0 ? (ergebnis.steuernGesamt / ergebnis.bruttoMonat * 100) : 0}%` }}>
                Steuern
              </div>
              <div className="bg-amber-400 flex items-center justify-center text-white transition-all" style={{ width: `${ergebnis.bruttoMonat > 0 ? (ergebnis.sozialabgabenGesamt / ergebnis.bruttoMonat * 100) : 0}%` }}>
                Sozial
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-green-500 inline-block" /> Netto</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-400 inline-block" /> Steuern</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-400 inline-block" /> Sozialabgaben</span>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5" id="brutto-netto-tabelle">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Aufschlüsselung (monatlich)</h3>
            <table className="w-full text-sm">
              <tbody>
                <Zeile label="Bruttogehalt" wert={ergebnis.bruttoMonat} hervorgehoben />
                <tr><td colSpan={3} className="pt-3 pb-1 text-xs font-semibold text-gray-600 dark:text-gray-500 uppercase tracking-wider">Steuern</td></tr>
                <Zeile label="Lohnsteuer" wert={-ergebnis.lohnsteuer} brutto={ergebnis.bruttoMonat} />
                <Zeile label="Solidaritätszuschlag" wert={-ergebnis.solidaritaet} brutto={ergebnis.bruttoMonat} />
                {kirchensteuer && <Zeile label={`Kirchensteuer (${kstSatz}%)`} wert={-ergebnis.kirchensteuer} brutto={ergebnis.bruttoMonat} />}
                <tr><td colSpan={3} className="pt-3 pb-1 text-xs font-semibold text-gray-600 dark:text-gray-500 uppercase tracking-wider">Sozialabgaben</td></tr>
                <Zeile label={kvArt === 'privat' ? 'Private KV (AN-Anteil)' : 'Krankenversicherung'} wert={-ergebnis.krankenversicherung} brutto={ergebnis.bruttoMonat} />
                <Zeile label="Rentenversicherung" wert={-ergebnis.rentenversicherung} brutto={ergebnis.bruttoMonat} />
                <Zeile label="Arbeitslosenversicherung" wert={-ergebnis.arbeitslosenversicherung} brutto={ergebnis.bruttoMonat} />
                <Zeile label="Pflegeversicherung" wert={-ergebnis.pflegeversicherung} brutto={ergebnis.bruttoMonat} />
                <tr className="border-t-2 border-primary-200 dark:border-primary-500/40 font-bold text-primary-700 dark:text-primary-300">
                  <td className="py-2">Nettogehalt</td>
                  <td className="py-2 text-right">{fmt(ergebnis.nettoMonat)} &euro;</td>
                  <td className="py-2 text-right text-xs">{pct(ergebnis.nettoMonat, ergebnis.bruttoMonat)}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Weihnachtsgeld-Ergebnis */}
          {ergebnis.weihnachtsgeld && (() => {
            const wg = ergebnis.weihnachtsgeld!;
            const wgAbzuegePct = wg.brutto > 0 ? Math.round((wg.abzuege / wg.brutto) * 1000) / 10 : 0;
            const wgSteuern = wg.lohnsteuer + wg.solidaritaet + wg.kirchensteuer;
            const effektiverSteuersatz = wg.brutto > 0 ? Math.round((wgSteuern / wg.brutto) * 1000) / 10 : 0;
            const regelSteuersatz = ergebnis.bruttoMonat > 0 ? Math.round((ergebnis.steuernGesamt / ergebnis.bruttoMonat) * 1000) / 10 : 0;
            const jahresBruttoMitWg = ergebnis.bruttoJahr + wg.brutto;
            const jahresNettoMitWg = ergebnis.nettoJahr + wg.netto;

            return (
              <>
                {/* Sonderzahlung Zusammenfassung */}
                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-5 mt-4">
                  <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
                    <span>🎄</span> Sonderzahlung Weihnachtsgeld
                  </h3>

                  {/* Übersichtskarten */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Brutto</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(wg.brutto)} €</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Abzüge</p>
                      <p className="text-lg font-bold text-red-500 dark:text-red-400">{fmt(wg.abzuege)} €</p>
                      <p className="text-xs text-gray-600">{wgAbzuegePct}%</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Netto</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">{fmt(wg.netto)} €</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Eff. Steuersatz</p>
                      <p className="text-lg font-bold text-amber-700 dark:text-amber-300">{effektiverSteuersatz}%</p>
                    </div>
                  </div>

                  {/* Hinweis Progression */}
                  {effektiverSteuersatz > regelSteuersatz && (
                    <div className="bg-amber-100 dark:bg-amber-500/20 rounded-lg px-4 py-2.5 mb-4 text-sm text-amber-800 dark:text-amber-200">
                      <strong>Hinweis:</strong> Der effektive Steuersatz auf das Weihnachtsgeld ({effektiverSteuersatz}%) ist höher als auf Ihr reguläres Gehalt ({regelSteuersatz}%). Das liegt an der Steuerprogression — die Sonderzahlung wird zum Jahresgehalt addiert und fällt damit in eine höhere Steuerzone.
                    </div>
                  )}

                  {/* Detaillierte Aufschlüsselung */}
                  <table className="w-full text-sm">
                    <tbody>
                      <Zeile label="Weihnachtsgeld (brutto)" wert={wg.brutto} hervorgehoben />
                      <tr><td colSpan={3} className="pt-3 pb-1 text-xs font-semibold text-gray-600 dark:text-gray-500 uppercase tracking-wider">Steuern</td></tr>
                      <Zeile label="Lohnsteuer" wert={-wg.lohnsteuer} brutto={wg.brutto} />
                      <Zeile label="Solidaritätszuschlag" wert={-wg.solidaritaet} brutto={wg.brutto} />
                      {wg.kirchensteuer > 0 && <Zeile label={`Kirchensteuer (${kstSatz}%)`} wert={-wg.kirchensteuer} brutto={wg.brutto} />}
                      <tr><td colSpan={3} className="pt-3 pb-1 text-xs font-semibold text-gray-600 dark:text-gray-500 uppercase tracking-wider">Sozialabgaben</td></tr>
                      <Zeile label="Krankenversicherung" wert={-wg.krankenversicherung} brutto={wg.brutto} />
                      <Zeile label="Rentenversicherung" wert={-wg.rentenversicherung} brutto={wg.brutto} />
                      <Zeile label="Arbeitslosenversicherung" wert={-wg.arbeitslosenversicherung} brutto={wg.brutto} />
                      <Zeile label="Pflegeversicherung" wert={-wg.pflegeversicherung} brutto={wg.brutto} />
                      <tr className="border-t-2 border-amber-300 dark:border-amber-500/40 font-bold text-amber-800 dark:text-amber-300">
                        <td className="py-2">Weihnachtsgeld (netto)</td>
                        <td className="py-2 text-right">{fmt(wg.netto)} &euro;</td>
                        <td className="py-2 text-right text-xs">{pct(wg.netto, wg.brutto)}%</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-amber-600 dark:text-amber-400/70 mt-3">
                    Berechnung nach der Jahreslohnsteuer-Differenzmethode: Jahressteuer mit Weihnachtsgeld minus Jahressteuer ohne Weihnachtsgeld.
                  </p>
                </div>

                {/* Jahresübersicht inkl. Weihnachtsgeld */}
                <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-5 mt-4">
                  <h3 className="font-bold text-primary-800 dark:text-primary-300 mb-3">Jahresübersicht inkl. Weihnachtsgeld</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Jahresbrutto inkl. Weihnachtsgeld</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{fmt(jahresBruttoMitWg)} €</p>
                      <p className="text-xs text-gray-600 mt-1">{fmt(ergebnis.bruttoJahr)} € Gehalt + {fmt(wg.brutto)} € Weihnachtsgeld</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Jahresnetto inkl. Weihnachtsgeld</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{fmt(jahresNettoMitWg)} €</p>
                      <p className="text-xs text-gray-600 mt-1">{fmt(ergebnis.nettoJahr)} € Gehalt + {fmt(wg.netto)} € Weihnachtsgeld</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}

          <p className="text-xs text-gray-600 dark:text-gray-500 mt-4 no-print">
            * Vereinfachte Berechnung zur Orientierung. Für eine exakte Berechnung wenden Sie sich an Ihren Steuerberater oder nutzen Sie ELSTER.
          </p>

          <CrossLink href="/finanzen/steuererstattung-rechner" emoji="💰" text="Wie viel bekommen Sie vom Finanzamt zurück?" />
          <CrossLink href="/finanzen/gehaltsvergleich" emoji="📊" text="Verdienen Sie genug? Gehalt vergleichen" />

          <div className="mt-4 no-print flex flex-wrap gap-3">
            <AiExplain
              rechnerName="Brutto-Netto-Rechner"
              eingaben={{
                bruttogehalt: bruttoNum,
                steuerklasse,
                bundesland: bl?.name ?? bundesland,
                kirchensteuer,
                kinder,
                kvArt,
                kvZusatzbeitrag: kvZusatzbeitragNum,
              }}
              ergebnis={{
                nettogehalt: ergebnis.nettoMonat,
                lohnsteuer: ergebnis.lohnsteuer,
                solidaritaetszuschlag: ergebnis.solidaritaet,
                kirchensteuerBetrag: ergebnis.kirchensteuer,
                krankenversicherung: ergebnis.krankenversicherung,
                rentenversicherung: ergebnis.rentenversicherung,
                arbeitslosenversicherung: ergebnis.arbeitslosenversicherung,
                pflegeversicherung: ergebnis.pflegeversicherung,
                gesamtabzuegeProzent: ergebnis.abzuegeProzent,
              }}
            />
            <WasWaereWenn
              eingaben={{
                bruttogehalt: bruttoNum,
                steuerklasse,
                bundesland: bl?.name ?? bundesland,
                kirchensteuer,
                kinder,
                kvArt,
                kvZusatzbeitrag: kvZusatzbeitragNum,
              }}
              ergebnis={{
                nettogehalt: ergebnis.nettoMonat,
                lohnsteuer: ergebnis.lohnsteuer,
                solidaritaetszuschlag: ergebnis.solidaritaet,
                kirchensteuerBetrag: ergebnis.kirchensteuer,
                krankenversicherung: ergebnis.krankenversicherung,
                rentenversicherung: ergebnis.rentenversicherung,
                arbeitslosenversicherung: ergebnis.arbeitslosenversicherung,
                pflegeversicherung: ergebnis.pflegeversicherung,
                gesamtabzuegeProzent: ergebnis.abzuegeProzent,
              }}
            />
          </div>
        </>
      )}

      {/* Affiliate-Boxen */}
      {ergebnis && (
        <>
          <AffiliateBox programId="wiso" context="brutto-netto" />
          <AffiliateBox programId="smartsteuer" context="brutto-netto" />
        </>
      )}

      {/* Brutto-Netto-Tabelle (SEO) */}
      <div className="mt-8 no-print">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Brutto-Netto-Tabelle 2026</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Wie viel Netto bleibt vom Brutto? Übersicht für Steuerklasse 1, 3 und 5 (ohne Kirchensteuer, GKV, NRW).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary-50 dark:bg-primary-500/10">
                <th className="text-left p-2.5 font-semibold text-gray-700 dark:text-gray-200 rounded-tl-lg">Brutto / Monat</th>
                <th className="text-right p-2.5 font-semibold text-gray-700 dark:text-gray-200">Netto SK 1</th>
                <th className="text-right p-2.5 font-semibold text-gray-700 dark:text-gray-200">Netto SK 3</th>
                <th className="text-right p-2.5 font-semibold text-gray-700 dark:text-gray-200 rounded-tr-lg">Netto SK 5</th>
              </tr>
            </thead>
            <tbody>
              {TABELLEN_WERTE.map((b, i) => {
                const sk1 = berechneSchnell(b, 1);
                const sk3 = berechneSchnell(b, 3);
                const sk5 = berechneSchnell(b, 5);
                return (
                  <tr key={b} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : ''}>
                    <td className="p-2.5 font-medium text-gray-800 dark:text-gray-200">{b.toLocaleString('de-DE')} €</td>
                    <td className="p-2.5 text-right text-gray-600 dark:text-gray-400">{fmt(sk1.nettoMonat)} €</td>
                    <td className="p-2.5 text-right text-gray-600 dark:text-gray-400">{fmt(sk3.nettoMonat)} €</td>
                    <td className="p-2.5 text-right text-gray-600 dark:text-gray-400">{fmt(sk5.nettoMonat)} €</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-500 mt-2">
          Werte gerundet, ohne Kirchensteuer, GKV mit 1,7% Zusatzbeitrag, keine Kinder, NRW. Stand 2025/2026.
        </p>
      </div>
    </div>
  );
}

function Zeile({ label, wert, hervorgehoben = false, brutto }: { label: string; wert: number; hervorgehoben?: boolean; brutto?: number }) {
  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const prozent = brutto && brutto > 0 ? ((Math.abs(wert) / brutto) * 100).toFixed(1) : null;
  return (
    <tr className={hervorgehoben ? 'font-semibold text-gray-800 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}>
      <td className="py-1.5">{label}</td>
      <td className={`py-1.5 text-right ${wert < 0 ? 'text-red-500 dark:text-red-400' : ''}`}>
        {wert < 0 ? `−${fmt(Math.abs(wert))}` : fmt(wert)} &euro;
      </td>
      <td className="py-1.5 text-right text-xs text-gray-600 dark:text-gray-500 w-16">
        {prozent ? `${prozent}%` : ''}
      </td>
    </tr>
  );
}
