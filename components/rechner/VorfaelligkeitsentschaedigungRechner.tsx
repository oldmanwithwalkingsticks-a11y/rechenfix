'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const BEARBEITUNG = 300;
const FAKTOR_KOSTEN = 0.85;

export default function VorfaelligkeitsentschaedigungRechner() {
  const [restschuld, setRestschuld] = useState<string>('150000');
  const [altZins, setAltZins] = useState<string>('2,5');
  const [restlaufzeit, setRestlaufzeit] = useState<string>('5');
  const [marktZins, setMarktZins] = useState<string>('3,5');

  const result = useMemo(() => {
    const rs = parseDeutscheZahl(restschuld) || 0;
    const alt = parseDeutscheZahl(altZins) || 0;
    const rl = parseDeutscheZahl(restlaufzeit) || 0;
    const markt = parseDeutscheZahl(marktZins) || 0;

    const zinsmarge = alt - markt;
    const keineVfe = zinsmarge <= 0;

    const jaehrlicherVerlust = keineVfe ? 0 : (rs * zinsmarge) / 100;
    const vfe = keineVfe ? 0 : jaehrlicherVerlust * rl * FAKTOR_KOSTEN;
    const gesamt = keineVfe ? 0 : vfe + BEARBEITUNG;

    return {
      rs, alt, rl, markt, zinsmarge, keineVfe, jaehrlicherVerlust, vfe, gesamt,
    };
  }, [restschuld, altZins, restlaufzeit, marktZins]);

  const fmtEuro = (n: number) =>
    n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  const ergebnis = result.keineVfe
    ? `Keine Vorfälligkeitsentschädigung: Marktzins (${result.markt.toLocaleString('de-DE')} %) liegt über dem Vertragszins (${result.alt.toLocaleString('de-DE')} %) — die Bank hat keinen Zinsnachteil.`
    : `Vorfälligkeitsentschädigung (geschätzt): ${fmtEuro(result.vfe)} + ${fmtEuro(BEARBEITUNG)} Bearbeitung = ${fmtEuro(result.gesamt)}. Basis: Restschuld ${fmtEuro(result.rs)}, Zinsmarge ${result.zinsmarge.toLocaleString('de-DE', { maximumFractionDigits: 2 })} %, Restlaufzeit ${result.rl} Jahre.`;

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Restschuld</label>
        <NummerEingabe value={restschuld} onChange={setRestschuld} placeholder="150000" einheit="€" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktueller Zinssatz (Vertrag)</label>
        <NummerEingabe value={altZins} onChange={setAltZins} placeholder="2,5" einheit="%" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Restlaufzeit der Zinsbindung</label>
        <NummerEingabe value={restlaufzeit} onChange={setRestlaufzeit} placeholder="5" einheit="Jahre" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktueller Marktzins (Wiederanlage)</label>
        <NummerEingabe value={marktZins} onChange={setMarktZins} placeholder="3,5" einheit="%" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Aktueller Bauzins für die Restlaufzeit</p>
      </div>

      {/* Ergebnis */}
      <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #1e3a8a, #7c3aed)' }}>
        <p className="text-white/90 text-sm mb-1">Geschätzte Vorfälligkeitsentschädigung</p>
        <p className="text-4xl font-bold text-white mb-3">
          {result.keineVfe ? '0 €' : fmtEuro(result.gesamt)}
        </p>
        {!result.keineVfe && (
          <div className="grid grid-cols-2 gap-3 text-white text-sm">
            <div>
              <p className="opacity-80 text-xs">VFE (ohne Gebühr)</p>
              <p className="text-lg font-semibold">{fmtEuro(result.vfe)}</p>
            </div>
            <div>
              <p className="opacity-80 text-xs">Bearbeitungsgebühr</p>
              <p className="text-lg font-semibold">{fmtEuro(BEARBEITUNG)}</p>
            </div>
          </div>
        )}
        {result.keineVfe && (
          <p className="text-white/90 text-sm">Marktzins ≥ Vertragszins — die Bank kann das Geld zu besseren Konditionen wiederanlegen und darf keine VFE verlangen.</p>
        )}
      </div>

      {/* Rechenweg */}
      <div className="mb-6 p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rechenweg (Aktiv-Passiv-Methode, vereinfacht)</p>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <li>1. Zinsmarge der Bank = {result.alt.toLocaleString('de-DE')} % − {result.markt.toLocaleString('de-DE')} % = {result.zinsmarge.toLocaleString('de-DE', { maximumFractionDigits: 2 })} %</li>
          {result.keineVfe ? (
            <li className="text-emerald-700 dark:text-emerald-400">✓ Zinsmarge ≤ 0 → keine VFE zulässig</li>
          ) : (
            <>
              <li>2. Jährlicher Zinsverlust = {fmtEuro(result.rs)} × {result.zinsmarge.toLocaleString('de-DE', { maximumFractionDigits: 2 })} % = {fmtEuro(result.jaehrlicherVerlust)}</li>
              <li>3. Über {result.rl} Jahre × Faktor 0,85 (ersparte Verwaltung + Risiko) = {fmtEuro(result.vfe)}</li>
              <li>4. + Bearbeitungsgebühr {fmtEuro(BEARBEITUNG)} → Gesamt {fmtEuro(result.gesamt)}</li>
            </>
          )}
        </ul>
      </div>

      {/* Sonderkündigungsrecht */}
      <div className="mb-6 p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">💡 § 489 BGB — Sonderkündigungsrecht</p>
        <p className="text-xs text-amber-800 dark:text-amber-300">
          Nach <strong>10 Jahren Zinsbindung</strong> können Sie mit 6 Monaten Frist kündigen — <strong>komplett ohne Vorfälligkeitsentschädigung</strong>.
          Prüfen Sie daher vor einer Ablösung, ob die 10-Jahres-Grenze bereits erreicht ist.
        </p>
      </div>

      <CrossLink href="/wohnen/baufinanzierung-rechner" emoji="🏠" text="Baufinanzierungsrechner: Tilgung und Zinsen kalkulieren" />
      <CrossLink href="/finanzen/kreditrechner" emoji="💶" text="Kreditrechner: Monatliche Rate und Gesamtkosten" />
      <CrossLink href="/finanzen/zinsrechner" emoji="📈" text="Zinsrechner: Zinsen und Kapitalentwicklung berechnen" />

      <ErgebnisAktionen ergebnisText={ergebnis} seitenTitel="Vorfälligkeitsentschädigung-Rechner" />
      <AiExplain
        rechnerName="Vorfälligkeitsentschädigung-Rechner"
        eingaben={{
          Restschuld: `${result.rs} €`,
          'Vertragszins': `${result.alt} %`,
          'Restlaufzeit': `${result.rl} Jahre`,
          'Marktzins': `${result.markt} %`,
        }}
        ergebnis={{
          Zinsmarge: `${result.zinsmarge.toFixed(2)} %`,
          'Jährlicher Zinsverlust': `${result.jaehrlicherVerlust.toFixed(2)} €`,
          VFE: `${result.vfe.toFixed(2)} €`,
          Bearbeitungsgebühr: `${BEARBEITUNG} €`,
          Gesamt: `${result.gesamt.toFixed(2)} €`,
          Sonderkuendigung: 'nach 10 Jahren Zinsbindung ohne VFE möglich (§ 489 BGB)',
        }}
      />

      <div className="mt-6">
        <AffiliateBox programId="check24" context="vorfaelligkeit" />
        <AffiliateBox programId="cosmosdirekt" context="risikolebensversicherung" />
      </div>
    </div>
  );
}
