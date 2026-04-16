'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type Ausnahme = 'keine' | 'neubau' | 'modernisierung' | 'vormiete';

const AUSNAHMEN: { key: Ausnahme; label: string; text: string }[] = [
  { key: 'keine', label: 'Keine Ausnahme', text: 'Die Mietpreisbremse greift voll.' },
  { key: 'neubau', label: 'Neubau (Erstbezug nach 01.10.2014)', text: 'Neubauten mit Erstbezug nach dem 01.10.2014 sind von der Mietpreisbremse ausgenommen.' },
  { key: 'modernisierung', label: 'Umfassende Modernisierung', text: 'Nach einer umfassenden Modernisierung (Investition ≥ 1/3 eines vergleichbaren Neubaus) gilt die Mietpreisbremse nicht.' },
  { key: 'vormiete', label: 'Vormiete war bereits höher', text: 'Lag die Vormiete bereits über 110 % der Vergleichsmiete, darf der Vermieter diese höhere Miete weiter verlangen (Bestandsschutz).' },
];

export default function MietpreisbremseRechner() {
  const [vergleichsmiete, setVergleichsmiete] = useState('10');
  const [aktuelleMiete, setAktuelleMiete] = useState('12');
  const [wohnflaeche, setWohnflaeche] = useState('65');
  const [giltBremse, setGiltBremse] = useState(true);
  const [ausnahme, setAusnahme] = useState<Ausnahme>('keine');

  const nVergleich = parseDeutscheZahl(vergleichsmiete);
  const nMiete = parseDeutscheZahl(aktuelleMiete);
  const nFlaeche = parseDeutscheZahl(wohnflaeche);

  const ergebnis = useMemo(() => {
    const maxProM2 = nVergleich * 1.1;
    const ueberhoehungProM2 = Math.max(0, nMiete - maxProM2);
    const maxMonat = maxProM2 * nFlaeche;
    const istMonat = nMiete * nFlaeche;
    const ueberhoehungMonat = ueberhoehungProM2 * nFlaeche;
    const ueberhoehungJahr = ueberhoehungMonat * 12;
    const greiftBremse = giltBremse && ausnahme === 'keine';
    return {
      maxProM2,
      maxMonat,
      istMonat,
      ueberhoehungProM2,
      ueberhoehungMonat,
      ueberhoehungJahr,
      greiftBremse,
    };
  }, [nVergleich, nMiete, nFlaeche, giltBremse, ausnahme]);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const zuHoch = ergebnis.greiftBremse && ergebnis.ueberhoehungMonat > 0;
  const aktAusnahme = AUSNAHMEN.find(a => a.key === ausnahme)!;

  return (
    <div>
      {/* Vergleichsmiete */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ortsübliche Vergleichsmiete</label>
        <NummerEingabe value={vergleichsmiete} onChange={setVergleichsmiete} placeholder="10" einheit="€/m² kalt" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Finden Sie im Mietspiegel Ihrer Stadt (oft kostenlos online).</p>
      </div>

      {/* Aktuelle Miete */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ihre aktuelle Kaltmiete</label>
        <NummerEingabe value={aktuelleMiete} onChange={setAktuelleMiete} placeholder="12" einheit="€/m²" />
      </div>

      {/* Wohnfläche */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wohnfläche</label>
        <NummerEingabe value={wohnflaeche} onChange={setWohnflaeche} placeholder="65" einheit="m²" />
      </div>

      {/* Gilt Bremse */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mietpreisbremse gilt am Ort?</label>
        <div className="flex flex-col sm:flex-row gap-2">
          {[
            { val: true, label: 'Ja (angespannter Wohnungsmarkt)' },
            { val: false, label: 'Nein / Unsicher' },
          ].map(opt => (
            <button
              key={String(opt.val)}
              onClick={() => setGiltBremse(opt.val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                giltBremse === opt.val
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Gilt in den meisten Großstädten und Ballungsräumen — Liste auf der Website Ihres Bundeslandes.</p>
      </div>

      {/* Ausnahme */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ausnahme?</label>
        <select
          value={ausnahme}
          onChange={e => setAusnahme(e.target.value as Ausnahme)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {AUSNAHMEN.map(a => (
            <option key={a.key} value={a.key}>{a.label}</option>
          ))}
        </select>
      </div>

      {/* Ergebnis */}
      {!ergebnis.greiftBremse ? (
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-5 mb-6">
          <h2 className="font-bold text-amber-800 dark:text-amber-300 mb-1">Mietpreisbremse greift nicht</h2>
          <p className="text-amber-800 dark:text-amber-300 text-sm">{giltBremse ? aktAusnahme.text : 'An Ihrem Ort gilt die Mietpreisbremse nach Angabe nicht. Der Vermieter darf grundsätzlich frei vereinbaren — Grenze bildet die Wuchermiete (> 20 % Überhöhung strafbar).'}</p>
        </div>
      ) : zuHoch ? (
        <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
          <p className="text-white/90 text-sm mb-1">Ihre Miete ist zu hoch um</p>
          <p className="text-5xl font-bold">{fmt(ergebnis.ueberhoehungMonat)} €/Monat</p>
          <p className="text-white/90 text-sm mt-1">
            Jährliche Überzahlung: <strong>{fmt0(ergebnis.ueberhoehungJahr)} €</strong>
          </p>
        </div>
      ) : (
        <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
          <p className="text-white/90 text-sm mb-1">Gute Nachricht</p>
          <p className="text-3xl md:text-4xl font-bold">Ihre Miete ist zulässig.</p>
          <p className="text-white/90 text-sm mt-2">Sie liegen innerhalb der 110 %-Grenze der Mietpreisbremse.</p>
        </div>
      )}

      {/* Aufschlüsselung */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Aufschlüsselung</h2>
        <table className="w-full text-sm">
          <tbody>
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">Ortsübliche Vergleichsmiete</td>
              <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt(nVergleich)} €/m²</td>
            </tr>
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">Max. zulässige Miete (110 %)</td>
              <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt(ergebnis.maxProM2)} €/m²</td>
            </tr>
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">Max. Kaltmiete/Monat ({fmt0(nFlaeche)} m²)</td>
              <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt(ergebnis.maxMonat)} €</td>
            </tr>
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">Ihre aktuelle Kaltmiete/Monat</td>
              <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt(ergebnis.istMonat)} €</td>
            </tr>
            <tr className="border-t-2 border-primary-200 dark:border-primary-500/40 font-bold">
              <td className="py-2 text-primary-700 dark:text-primary-300">Differenz / Monat</td>
              <td className={`py-2 text-right tabular-nums ${zuHoch ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                {zuHoch ? '+' : ''}{fmt(ergebnis.ueberhoehungMonat)} €
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Hinweis Rüge */}
      {zuHoch && (
        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
          <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-1">So gehen Sie vor</p>
          <p className="text-blue-800 dark:text-blue-300 text-sm">
            Sie müssen den Vermieter <strong>schriftlich rügen</strong> (am besten per Einschreiben). Erst <strong>ab dem Zeitpunkt der Rüge</strong> können Sie die Differenz einfordern — rückwirkend vor der Rüge leider nicht. Eine qualifizierte Rüge nennt den konkreten Verstoß gegen § 556d BGB und die Höhe der geforderten Rückzahlung.
          </p>
        </div>
      )}

      <CrossLink href="/wohnen/mietrechner" emoji="🏠" text="Mietrechner: Warm- und Kaltmiete, Nebenkosten inkl." />
      <CrossLink href="/wohnen/indexmiete-rechner" emoji="📊" text="Indexmiete-Rechner: Zulässige Erhöhung prüfen" />
      <CrossLink href="/wohnen/nebenkosten-rechner" emoji="💡" text="Nebenkosten-Rechner: Was darf der Vermieter umlegen?" />

      <ErgebnisAktionen
        ergebnisText={
          !ergebnis.greiftBremse
            ? `Mietpreisbremse greift nicht: ${aktAusnahme.label}`
            : zuHoch
              ? `Mietpreisbremse: Ihre Miete ist ${fmt(ergebnis.ueberhoehungMonat)} €/Monat zu hoch (${fmt0(ergebnis.ueberhoehungJahr)} €/Jahr). Max. zulässig: ${fmt(ergebnis.maxProM2)} €/m²`
              : `Mietpreisbremse: Miete ist zulässig (${fmt(nMiete)} €/m² ≤ ${fmt(ergebnis.maxProM2)} €/m²)`
        }
        seitenTitel="Mietpreisbremse-Rechner"
      />

      <AffiliateBox programId="ks-auxilia" context="mietpreisbremse" />

      <AiExplain
        rechnerName="Mietpreisbremse-Rechner"
        eingaben={{
          vergleichsmieteEuroProM2: fmt(nVergleich),
          aktuelleMieteEuroProM2: fmt(nMiete),
          wohnflaecheM2: fmt0(nFlaeche),
          mietpreisbremseGilt: giltBremse ? 'Ja' : 'Nein',
          ausnahme: aktAusnahme.label,
        }}
        ergebnis={{
          maxZulaessigEuroProM2: fmt(ergebnis.maxProM2),
          maxMietMonatEuro: fmt(ergebnis.maxMonat),
          aktuellMonatEuro: fmt(ergebnis.istMonat),
          ueberhoehungMonatEuro: fmt(ergebnis.ueberhoehungMonat),
          ueberhoehungJahrEuro: fmt0(ergebnis.ueberhoehungJahr),
          bremseGreift: ergebnis.greiftBremse ? 'Ja' : 'Nein',
        }}
      />
    </div>
  );
}
