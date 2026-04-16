'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { AffiliateBox } from '@/components/AffiliateBox';

// Einkommensteuer §32a EStG 2026 (Grundtarif, vereinfacht)
function estGrund(zvE: number): number {
  if (zvE <= 12096) return 0;
  if (zvE <= 17443) {
    const y = (zvE - 12096) / 10000;
    return Math.max(0, (932.3 * y + 1400) * y);
  }
  if (zvE <= 68480) {
    const z = (zvE - 17443) / 10000;
    return (176.64 * z + 2397) * z + 1015.13;
  }
  if (zvE <= 277825) {
    return 0.42 * zvE - 10911.92;
  }
  return 0.45 * zvE - 19246.67;
}

const fmtEur = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
const fmt0 = (n: number) => Math.round(n).toLocaleString('de-DE') + ' €';

export default function GmbhGfRechner() {
  const [brutto, setBrutto] = useState('6000'); // Monatsgehalt
  const [beherrschend, setBeherrschend] = useState(true);
  const [kv, setKv] = useState<'gkv' | 'pkv'>('gkv');
  const [kvZusatz, setKvZusatz] = useState('1.7');
  const [kirche, setKirche] = useState(false);
  const [kinder, setKinder] = useState('0');
  const [firmenwagen, setFirmenwagen] = useState(false);
  const [listenpreis, setListenpreis] = useState('45000');
  const [km, setKm] = useState('20');

  const ergebnis = useMemo(() => {
    const monBrutto = parseDeutscheZahl(brutto) || 0;
    const jahresBrutto = monBrutto * 12;

    // Firmenwagen: geldwerter Vorteil (1% Listenpreis + 0,03% × km × Listenpreis) pro Monat
    const listen = parseDeutscheZahl(listenpreis) || 0;
    const kmWert = parseDeutscheZahl(km) || 0;
    const gwVMonat = firmenwagen ? (0.01 * listen + 0.0003 * kmWert * listen) : 0;
    const gwVJahr = gwVMonat * 12;

    // Steuerpflichtiges Brutto (inkl. Firmenwagen)
    const steuerBruttoJahr = jahresBrutto + gwVJahr;

    // Sozialabgaben 2026 (vereinfacht)
    const bbgKVPV = 5850 * 12; // BBG KV/PV monatlich 5.850 €
    const bbgRVAV = 8550 * 12; // BBG RV/AV (West) 8.550 €

    const kvBasis = Math.min(steuerBruttoJahr, bbgKVPV);
    const rvBasis = Math.min(steuerBruttoJahr, bbgRVAV);

    const kvAllg = 0.146;
    const kvZusatzSatz = (parseDeutscheZahl(kvZusatz) || 0) / 100;
    const pvSatz = 0.036; // + Zuschlag bei kinderlos
    const anzKinder = Math.max(0, Math.floor(parseDeutscheZahl(kinder) || 0));
    const pvZuschlag = anzKinder === 0 ? 0.006 : 0;
    const pvAbschlag = anzKinder >= 2 ? (Math.min(anzKinder, 5) - 1) * 0.0025 : 0;

    const rvSatz = 0.093;
    const avSatz = 0.013;

    let anKv = 0, anPv = 0, anRv = 0, anAv = 0;

    if (beherrschend) {
      // Beherrschender GGF: SV-frei (Standard). Keine gesetzlichen Abgaben.
      anRv = 0;
      anAv = 0;
      anKv = 0;
      anPv = 0;
    } else {
      // Nicht-beherrschend: normaler AN-Anteil
      if (kv === 'gkv') {
        anKv = kvBasis * (kvAllg / 2 + kvZusatzSatz / 2);
      }
      anPv = kvBasis * ((pvSatz / 2) + pvZuschlag - pvAbschlag / 2);
      anRv = rvBasis * (rvSatz / 2);
      anAv = rvBasis * (avSatz / 2);
    }

    // PKV: pauschaler Schätzwert wenn gewählt (Single ca. 650 €/Monat)
    const pkvMonat = kv === 'pkv' ? 650 : 0;
    const pkvJahr = pkvMonat * 12;

    // Werbungskostenpauschale + Sonderausgaben (vereinfacht)
    const werbungskosten = 1230;
    // Vorsorgepauschale grob: Summe der SV-Beiträge oder geschätzt
    const vorsorge = beherrschend ? Math.min(pkvJahr, 7000) : (anRv + anKv + anPv);

    const zvE = Math.max(0, steuerBruttoJahr - werbungskosten - vorsorge);
    const est = estGrund(zvE);
    const soli = est > 19950 ? est * 0.055 : 0;
    const kirchensteuer = kirche ? est * 0.09 : 0;

    const summeAbgabenJahr = anKv + anPv + anRv + anAv + est + soli + kirchensteuer + pkvJahr;
    const nettoJahr = jahresBrutto - (anKv + anPv + anRv + anAv) - est - soli - kirchensteuer - pkvJahr;
    const nettoMonat = nettoJahr / 12;

    const quote = jahresBrutto > 0 ? (summeAbgabenJahr / jahresBrutto) * 100 : 0;

    return {
      jahresBrutto,
      gwVMonat,
      gwVJahr,
      steuerBruttoJahr,
      anKv, anPv, anRv, anAv,
      pkvJahr,
      est, soli, kirchensteuer,
      zvE,
      nettoMonat,
      nettoJahr,
      summeAbgabenJahr,
      quote,
    };
  }, [brutto, beherrschend, kv, kvZusatz, kirche, kinder, firmenwagen, listenpreis, km]);

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">GF-Bruttogehalt / Monat</label>
          <NummerEingabe value={brutto} onChange={setBrutto} einheit="€" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Beteiligung</label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setBeherrschend(true)} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${beherrschend ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>Beherrschend (SV-frei)</button>
            <button onClick={() => setBeherrschend(false)} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${!beherrschend ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>Nicht beherrschend</button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Beherrschend = &gt; 50 % Anteile oder Sperrminorität → sozialversicherungsfrei.</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Krankenversicherung</label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setKv('gkv')} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${kv === 'gkv' ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>GKV</button>
            <button onClick={() => setKv('pkv')} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${kv === 'pkv' ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>PKV (≈ 650 €/Mon.)</button>
          </div>
        </div>

        {kv === 'gkv' && !beherrschend && (
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">KV-Zusatzbeitrag</label>
            <NummerEingabe value={kvZusatz} onChange={setKvZusatz} einheit="%" />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Anzahl Kinder</label>
          <NummerEingabe value={kinder} onChange={setKinder} einheit="" />
        </div>

        <div className="flex items-center gap-2">
          <input id="kirche" type="checkbox" checked={kirche} onChange={e => setKirche(e.target.checked)} className="w-5 h-5" />
          <label htmlFor="kirche" className="text-sm text-gray-700 dark:text-gray-300">Kirchensteuer (9 %)</label>
        </div>

        <div className="flex items-center gap-2">
          <input id="fw" type="checkbox" checked={firmenwagen} onChange={e => setFirmenwagen(e.target.checked)} className="w-5 h-5" />
          <label htmlFor="fw" className="text-sm text-gray-700 dark:text-gray-300">Firmenwagen (1-%-Regelung)</label>
        </div>

        {firmenwagen && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Listenpreis</label>
              <NummerEingabe value={listenpreis} onChange={setListenpreis} einheit="€" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Entfernung Arbeit</label>
              <NummerEingabe value={km} onChange={setKm} einheit="km" />
            </div>
          </div>
        )}
      </div>

      {/* Ergebnis */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Ihr Netto / Monat</p>
        <p className="text-5xl font-bold">{fmt0(ergebnis.nettoMonat)}</p>
        <p className="text-white/80 text-sm mt-2">
          Jahresnetto: <strong>{fmt0(ergebnis.nettoJahr)}</strong> · Abgabenquote: <strong>{ergebnis.quote.toFixed(1)} %</strong>
        </p>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Aufschlüsselung (Jahreswerte)</h2>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Jahresbrutto</span><span className="font-medium">{fmtEur(ergebnis.jahresBrutto)}</span></div>
          {ergebnis.gwVJahr > 0 && (
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">+ Geldwerter Vorteil Firmenwagen</span><span className="font-medium">{fmtEur(ergebnis.gwVJahr)}</span></div>
          )}
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">zu versteuerndes Einkommen</span><span className="font-medium">{fmtEur(ergebnis.zvE)}</span></div>
          <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Einkommensteuer</span><span className="font-medium text-red-600 dark:text-red-400">− {fmtEur(ergebnis.est)}</span></div>
          {ergebnis.soli > 0 && <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Soli</span><span className="font-medium text-red-600 dark:text-red-400">− {fmtEur(ergebnis.soli)}</span></div>}
          {ergebnis.kirchensteuer > 0 && <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Kirchensteuer</span><span className="font-medium text-red-600 dark:text-red-400">− {fmtEur(ergebnis.kirchensteuer)}</span></div>}
          {ergebnis.anRv > 0 && <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Rentenversicherung (AN)</span><span className="font-medium text-red-600 dark:text-red-400">− {fmtEur(ergebnis.anRv)}</span></div>}
          {ergebnis.anAv > 0 && <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Arbeitslosenvers. (AN)</span><span className="font-medium text-red-600 dark:text-red-400">− {fmtEur(ergebnis.anAv)}</span></div>}
          {ergebnis.anKv > 0 && <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">GKV (AN)</span><span className="font-medium text-red-600 dark:text-red-400">− {fmtEur(ergebnis.anKv)}</span></div>}
          {ergebnis.anPv > 0 && <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Pflegeversicherung (AN)</span><span className="font-medium text-red-600 dark:text-red-400">− {fmtEur(ergebnis.anPv)}</span></div>}
          {ergebnis.pkvJahr > 0 && <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">PKV-Beitrag (geschätzt)</span><span className="font-medium text-red-600 dark:text-red-400">− {fmtEur(ergebnis.pkvJahr)}</span></div>}
          <div className="border-t border-gray-200 dark:border-gray-600 mt-2 pt-2 flex justify-between font-bold">
            <span className="text-gray-800 dark:text-gray-100">= Jahresnetto</span>
            <span className="text-primary-600 dark:text-primary-400">{fmtEur(ergebnis.nettoJahr)}</span>
          </div>
        </div>
      </div>

      {beherrschend && (
        <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4 text-sm text-green-800 dark:text-green-200">
          <strong>Beherrschender GGF:</strong> sozialversicherungsfrei. Sie müssen sich eigenständig um Kranken-, Pflege- und Altersvorsorge kümmern (häufig PKV + private/bAV).
        </div>
      )}

      <p className="text-xs text-gray-500 mb-6">
        ⚠️ Hinweis: Vereinfachte Schätzung auf Basis §32a EStG 2026. PKV-Beitrag ist eine Pauschale. Für die genaue Berechnung Ihres Gehalts empfehlen wir eine Lohnbuchhaltung oder einen Steuerberater.
      </p>

      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Brutto-Netto-Rechner" />
      <CrossLink href="/finanzen/gehaltsvergleich" emoji="📊" text="Gehaltsvergleich" />
      <CrossLink href="/finanzen/minijob-rechner" emoji="💼" text="Minijob-Rechner" />

      <AffiliateBox programId="lexware" context="gmbh" />

      <ErgebnisAktionen
        ergebnisText={`GmbH-GF-Gehalt: ${fmt0(ergebnis.nettoMonat)} netto/Monat bei ${brutto} € brutto (${ergebnis.quote.toFixed(1)} % Abgabenquote)`}
        seitenTitel="GmbH-Geschäftsführer-Rechner"
      />

      <AiExplain
        rechnerName="GmbH-Geschäftsführer-Rechner"
        eingaben={{
          'GF-Brutto/Monat': `${brutto} €`,
          'Beteiligung': beherrschend ? 'Beherrschend (SV-frei)' : 'Nicht beherrschend',
          'KV': kv === 'gkv' ? 'GKV' : 'PKV',
          'Kirchensteuer': kirche ? 'Ja' : 'Nein',
          'Firmenwagen': firmenwagen ? `Ja (${listenpreis} €, ${km} km)` : 'Nein',
        }}
        ergebnis={{
          'Netto/Monat': fmt0(ergebnis.nettoMonat),
          'Netto/Jahr': fmt0(ergebnis.nettoJahr),
          'Abgabenquote': `${ergebnis.quote.toFixed(1)} %`,
        }}
      />
    </div>
  );
}
