'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { BUNDESLAENDER } from '@/lib/berechnungen/einkommensteuer';
import { berechneKurzarbeitergeld } from '@/lib/berechnungen/kurzarbeitergeld';

type Steuerklasse = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

// W168: Rechnung in lib/berechnungen/kurzarbeitergeld.ts (§§ 105, 106, 153 SGB III): pauschaliertes
// Netto mit 20 % SV-Pauschale, Lohnsteuer und Soli, ohne Kirchensteuer, Entgelte auf 20 € gerundet.
// Kirchensteuer und Bundesland wirken nur auf das echte Netto (Soll und Ist).
const SK_MAP: Record<Steuerklasse, 1 | 2 | 3 | 4 | 5 | 6> = {
  'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6,
};

const LAENDER_8_PROZENT = ['Bayern', 'Baden-Württemberg'];

export default function KurzarbeitergeldRechner() {
  const [sollBrutto, setSollBrutto] = useState('3500');
  const [istBrutto, setIstBrutto] = useState('1750');
  const [steuerklasse, setSteuerklasse] = useState<Steuerklasse>('I');
  const [mitKind, setMitKind] = useState(false);
  const [bundesland, setBundesland] = useState('Nordrhein-Westfalen');
  const [kirchensteuer, setKirchensteuer] = useState(false);

  const sB = parseDeutscheZahl(sollBrutto);
  const iB = parseDeutscheZahl(istBrutto);
  const kstSatz: 8 | 9 = LAENDER_8_PROZENT.includes(bundesland) ? 8 : 9;

  const ergebnis = useMemo(() => {
    const r = berechneKurzarbeitergeld({
      sollBrutto: sB, istBrutto: iB, steuerklasse: SK_MAP[steuerklasse], mitKind, kirchensteuer, kirchensteuersatz: kstSatz,
    });
    if (!r) return null;
    return { ...r, sollNetto: r.nettoSoll, istNetto: r.nettoIst };
  }, [sB, iB, steuerklasse, mitKind, kirchensteuer, kstSatz]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtP = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div>
      {/* Soll-Brutto */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Soll-Brutto (normales Monatsgehalt)
        </label>
        <NummerEingabe value={sollBrutto} onChange={setSollBrutto} placeholder="3500" einheit="€" />
        <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Brutto-Netto berechnen" />
      </div>

      {/* Ist-Brutto */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Ist-Brutto (reduziertes Gehalt während Kurzarbeit)
        </label>
        <NummerEingabe value={istBrutto} onChange={setIstBrutto} placeholder="1750" einheit="€" />
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Gehalt für die tatsächlich geleisteten Stunden (z. B. bei 50 % Kurzarbeit = halbes Brutto)
        </p>
      </div>

      {/* Steuerklasse + Kind-Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="kurzarbeitergeld-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Steuerklasse</label>
          <select id="kurzarbeitergeld-select-1"
            value={steuerklasse}
            onChange={e => setSteuerklasse(e.target.value as Steuerklasse)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value="I">I (ledig)</option>
            <option value="II">II (Alleinerziehend)</option>
            <option value="III">III (verheiratet, Hauptverdiener)</option>
            <option value="IV">IV (verheiratet, gleich)</option>
            <option value="V">V (verheiratet, Zweitverdiener)</option>
            <option value="VI">VI (Zweitjob)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kinder auf Lohnsteuerkarte?</label>
          <button
            onClick={() => setMitKind(!mitKind)}
            className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
              mitKind
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            {mitKind ? 'Ja — 67 % KuG' : 'Nein — 60 % KuG'}
          </button>
        </div>
      </div>

      {/* Bundesland + Kirchensteuer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="kurzarbeitergeld-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bundesland</label>
          <select id="kurzarbeitergeld-select-2"
            value={bundesland}
            onChange={e => setBundesland(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {BUNDESLAENDER.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Nur für den Kirchensteuer-Satz Ihres echten Nettos (Bayern/BW 8 %, sonst 9 %). Das Kurzarbeitergeld selbst rechnet ohne Kirchensteuer.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kirchensteuerpflichtig?</label>
          <button
            onClick={() => setKirchensteuer(!kirchensteuer)}
            className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
              kirchensteuer
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            {kirchensteuer ? `Ja — ${LAENDER_8_PROZENT.includes(bundesland) ? '8' : '9'} %` : 'Nein'}
          </button>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center mb-4">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
              Kurzarbeitergeld ({(ergebnis.satz * 100).toLocaleString('de-DE')} %)
            </p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {fmt(ergebnis.kug)} €
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">pro Monat</p>
          </div>

          {/* Vergleich */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Einkommensvergleich</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Normales Netto (aus dem Soll-Brutto)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.sollNetto)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Netto aus dem Ist-Brutto</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.istNetto)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">+ Kurzarbeitergeld ({(ergebnis.satz * 100).toLocaleString('de-DE')} %)</span>
                <span className="font-medium text-green-700 dark:text-green-400">+{fmt(ergebnis.kug)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Gesamteinkommen während Kurzarbeit</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.gesamtEinkommen)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Verlust gegenüber normalem Netto</span>
                <span className="font-medium text-red-700 dark:text-red-300">−{fmt(ergebnis.verlust)} € ({fmtP(ergebnis.verlustProzent)} %)</span>
              </div>
            </div>
          </div>

          {/* W168: KuG-Berechnung mit pauschalierten Nettobeträgen (§ 106, § 153 SGB III) */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">So entsteht das Kurzarbeitergeld</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Pauschaliertes Netto aus {fmt(ergebnis.sollGerundet)} € Soll-Entgelt</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.pauschalNettoSoll)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Pauschaliertes Netto aus {fmt(ergebnis.istGerundet)} € Ist-Entgelt</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.pauschalNettoIst)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Nettoentgeltdifferenz × {(ergebnis.satz * 100).toLocaleString('de-DE')} %</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.differenz)} € → {fmt(ergebnis.kug)} €</span>
              </div>
            </div>
            <p className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
              Soll- und Ist-Entgelt auf volle 20 € gerundet; pauschaliertes Netto = Entgelt minus 20 % Sozialversicherungspauschale, Lohnsteuer und Solidaritätszuschlag, ohne Kirchensteuer (§ 106 Abs. 1 und § 153 Abs. 1 SGB III).
            </p>
          </div>

          {/* Balkenvergleich */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 mb-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Visueller Vergleich</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Normales Netto</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.sollNetto)} €</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Ist-Netto + KuG</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamtEinkommen)} €</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-500"
                    style={{ width: `${ergebnis.sollNetto > 0 ? (ergebnis.gesamtEinkommen / ergebnis.sollNetto) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-3">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Das Kurzarbeitergeld folgt dem Pauschalverfahren der Agentur für Arbeit; gegenüber ihrer Kug-Tabelle sind Abweichungen um wenige Cent möglich, maßgeblich ist die Abrechnung. Das echte Netto rechnet mit durchschnittlichem Zusatzbeitrag. Auf das Kurzarbeitergeld selbst fallen keine Abzüge an; die Sozialbeiträge für den Ausfall (aus 80 % des Unterschieds zwischen Soll- und Ist-Entgelt) trägt der Arbeitgeber allein.
            </p>
          </div>

          <CrossLink href="/finanzen/arbeitslosengeld-rechner" emoji="📉" text="Nach Kurzarbeit: ALG I berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Kurzarbeitergeld: ${fmt(ergebnis.kug)} €/Monat (${(ergebnis.satz * 100).toLocaleString('de-DE')} %). Gesamteinkommen: ${fmt(ergebnis.gesamtEinkommen)} € (Verlust ${fmt(ergebnis.verlust)} € / ${fmtP(ergebnis.verlustProzent)} %).`}
            seitenTitel="Kurzarbeitergeld-Rechner"
            pdfDaten={[
              {
                titel: 'Kurzarbeitergeld',
                zeilen: [
                  { label: 'Leistungssatz', wert: `${(ergebnis.satz * 100).toLocaleString('de-DE')} %` },
                  { label: 'Kurzarbeitergeld pro Monat', wert: `${fmt(ergebnis.kug)} €`, highlight: true },
                  { label: 'Gesamteinkommen (mit KuG)', wert: `${fmt(ergebnis.gesamtEinkommen)} €` },
                ],
              },
              {
                titel: 'Vergleich Soll/Ist',
                zeilen: [
                  { label: 'Soll-Netto (ohne Kurzarbeit)', wert: `${fmt(ergebnis.sollNetto)} €` },
                  { label: 'Ist-Netto (mit Kurzarbeit)', wert: `${fmt(ergebnis.istNetto)} €` },
                  { label: 'Verlust', wert: `- ${fmt(ergebnis.verlust)} € (${fmtP(ergebnis.verlustProzent)} %)` },
                ],
              },
            ]}
          />

          <AiExplain
            rechnerName="Kurzarbeitergeld-Rechner"
            eingaben={{
              sollBrutto: sB,
              istBrutto: iB,
              steuerklasse,
              mitKind,
              bundesland,
              kirchensteuer,
            }}
            ergebnis={{
              kug: ergebnis.kug,
              satz: ergebnis.satz,
              nettoentgeltdifferenz: ergebnis.differenz,
              sollNetto: ergebnis.sollNetto,
              istNetto: ergebnis.istNetto,
              gesamtEinkommen: ergebnis.gesamtEinkommen,
              verlust: ergebnis.verlust,
            }}
          />
        </>
      )}
    </div>
  );
}
