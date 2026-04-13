'use client';

import { useState, useMemo } from 'react';
import {
  berechneWohngeld,
  MIETSTUFE_OPTIONEN,
  type Mietstufe,
} from '@/lib/berechnungen/wohngeld';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

export default function WohngeldRechner() {
  const [personen, setPersonen] = useState('2');
  const [einkommen, setEinkommen] = useState('2000');
  const [miete, setMiete] = useState('600');
  const [mietstufe, setMietstufe] = useState<Mietstufe>('III');
  const [heizkosten, setHeizkosten] = useState(true);
  const [schwerbehindert, setSchwerbehindert] = useState(false);
  const [alleinerziehend, setAlleinerziehend] = useState(false);
  const [erwerbstaetig, setErwerbstaetig] = useState(true);

  const ergebnis = useMemo(
    () => berechneWohngeld({
      haushaltsmitglieder: parseInt(personen) || 1,
      bruttoEinkommen: parseDeutscheZahl(einkommen),
      miete: parseDeutscheZahl(miete),
      mietstufe,
      heizkostenpauschale: heizkosten,
      freibetragSchwerbehindert: schwerbehindert,
      freibetragAlleinerziehend: alleinerziehend,
      freibetragErwerbstaetig: erwerbstaetig,
    }),
    [personen, einkommen, miete, mietstufe, heizkosten, schwerbehindert, alleinerziehend, erwerbstaetig],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtEuro2 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* === Haushalt === */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Haushalt
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Haushaltsmitglieder</label>
            <select
              value={personen}
              onChange={e => setPersonen(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
            >
              {[1,2,3,4,5,6,7,8].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Personen'}{n === 8 ? '+' : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatliches Bruttoeinkommen</label>
            <NummerEingabe value={einkommen} onChange={setEinkommen} placeholder="2.000" einheit="€" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Gesamteinkommen aller Haushaltsmitglieder</p>
          </div>
        </div>
      </div>

      {/* === Miete & Mietstufe === */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Miete &amp; Wohnort
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatliche Miete (kalt + kalte NK)</label>
            <NummerEingabe value={miete} onChange={setMiete} placeholder="600" einheit="€" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Kaltmiete + kalte Nebenkosten, oder Belastung bei Eigentum</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mietstufe der Gemeinde</label>
            <select
              value={mietstufe}
              onChange={e => setMietstufe(e.target.value as Mietstufe)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
            >
              {MIETSTUFE_OPTIONEN.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <a href="https://www.bmwsb.bund.de/SharedDocs/downloads/Webs/BMWSB/DE/veroeffentlichungen/wohnen/wohngeld-mietstufen.html" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Mietstufe Ihrer Gemeinde prüfen → bmwsb.bund.de</a>
            </p>
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={heizkosten}
              onChange={e => setHeizkosten(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Heizkostenpauschale einrechnen <span className="text-gray-400">(Wohngeld-Plus)</span></span>
          </label>
        </div>

        <CrossLink href="/wohnen/mietrechner" emoji="🏠" text="Warmmiete und Mietkosten berechnen" />
      </div>

      {/* === Freibeträge === */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Freibeträge <span className="text-gray-400 font-normal text-xs">(optional)</span>
        </h3>

        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={erwerbstaetig}
              onChange={e => setErwerbstaetig(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Erwerbstätig <span className="text-gray-400">(Erwerbstätigenfreibetrag)</span></span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={alleinerziehend}
              onChange={e => setAlleinerziehend(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Alleinerziehend</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={schwerbehindert}
              onChange={e => setSchwerbehindert(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Schwerbehindert <span className="text-gray-400">(GdB ≥ 50)</span></span>
          </label>
        </div>
      </div>

      {/* === ERGEBNIS === */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          {ergebnis.hatAnspruch ? (
            <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <p className="text-white/80 text-sm mb-1">Geschätztes monatliches Wohngeld</p>
                  <p className="text-5xl font-bold">{fmtEuro(ergebnis.wohngeldMonat)} €</p>
                </div>
                <div className="sm:text-right">
                  <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    {fmtEuro(ergebnis.wohngeldJahr)} €/Jahr
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
              <p className="text-white/80 text-sm mb-1">Ergebnis</p>
              <p className="text-2xl sm:text-3xl font-bold">Voraussichtlich kein Wohngeld-Anspruch</p>
              {ergebnis.ablehnungsGrund && (
                <p className="text-white/70 text-sm mt-2">{ergebnis.ablehnungsGrund}</p>
              )}
            </div>
          )}

          {/* Detail-Karten */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bereinigtes Einkommen</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.bereinigtesEinkommen)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Berücksichtigte Miete</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.beruecksichtigteMiete)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Höchstbetrag (Stufe {mietstufe})</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.hoechstbetragMiete)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Freibeträge</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.freibetraege)} €</p>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-4 pt-4 pb-1">
              <h3 className="font-bold text-gray-700 dark:text-gray-200">Berechnungsdetails</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Bruttoeinkommen</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(parseDeutscheZahl(einkommen))} €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">− Pauschalabzug (10%)</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-red-500 whitespace-nowrap">−{fmtEuro(Math.round(parseDeutscheZahl(einkommen) * 0.10))} €</td>
                  </tr>
                  {ergebnis.freibetraege > 0 && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">− Freibeträge</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-red-500 whitespace-nowrap">−{fmtEuro(ergebnis.freibetraege)} €</td>
                    </tr>
                  )}
                  <tr className="bg-gray-50 dark:bg-gray-700/30 font-medium">
                    <td className="px-4 py-2.5 text-gray-800 dark:text-gray-200">= Bereinigtes Einkommen</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.bereinigtesEinkommen)} €</td>
                  </tr>
                  <tr><td colSpan={2} className="h-2" /></tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Tatsächliche Miete</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(parseDeutscheZahl(miete))} €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Höchstbetrag Mietstufe {mietstufe}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.hoechstbetragMiete)} €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Berücksichtigte Miete</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.beruecksichtigteMiete)} €</td>
                  </tr>
                  {ergebnis.heizkostenZuschlag > 0 && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">+ Heizkostenpauschale</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">+{fmtEuro2(ergebnis.heizkostenZuschlag)} €</td>
                    </tr>
                  )}
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">+ Klimakomponente</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">+{fmtEuro2(ergebnis.klimaKomponente)} €</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 font-medium">
                    <td className="px-4 py-2.5 text-gray-800 dark:text-gray-200">= Zu berücksichtigende Miete</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro2(ergebnis.gesamtMiete)} €</td>
                  </tr>
                  <tr><td colSpan={2} className="h-2" /></tr>
                  <tr className="bg-green-50 dark:bg-green-500/10 font-bold">
                    <td className="px-4 py-3 text-green-800 dark:text-green-300">Geschätztes Wohngeld</td>
                    <td className="px-4 py-3 text-right tabular-nums text-green-700 dark:text-green-300 whitespace-nowrap text-lg">{fmtEuro(ergebnis.wohngeldMonat)} €/Monat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mietbelastungsquote */}
          {parseDeutscheZahl(einkommen) > 0 && (
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-blue-800 dark:text-blue-300 text-sm mb-2">📊 Mietbelastungsquote</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-blue-700/70 dark:text-blue-400/70">Ohne Wohngeld</p>
                  <p className={`text-xl font-bold ${ergebnis.mietbelastungOhne > 40 ? 'text-red-600 dark:text-red-400' : 'text-blue-800 dark:text-blue-300'}`}>
                    {fmtEuro2(ergebnis.mietbelastungOhne)} %
                  </p>
                  <p className="text-xs text-blue-700/60 dark:text-blue-400/60">{fmtEuro(parseDeutscheZahl(miete))} € von {fmtEuro(parseDeutscheZahl(einkommen))} €</p>
                </div>
                {ergebnis.hatAnspruch && (
                  <div>
                    <p className="text-xs text-blue-700/70 dark:text-blue-400/70">Mit Wohngeld</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      {fmtEuro2(ergebnis.mietbelastungMit)} %
                    </p>
                    <p className="text-xs text-blue-700/60 dark:text-blue-400/60">{fmtEuro(parseDeutscheZahl(miete) - ergebnis.wohngeldMonat)} € von {fmtEuro(parseDeutscheZahl(einkommen))} €</p>
                  </div>
                )}
              </div>
              {ergebnis.mietbelastungOhne > 40 && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">⚠️ Eine Mietbelastung über 40% gilt als kritisch hoch.</p>
              )}
            </div>
          )}

          {/* Tipp */}
          {ergebnis.hatAnspruch && (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
              <p className="text-green-800 dark:text-green-300 text-sm">
                <strong>💡 Tipp:</strong> Wohngeld wird ab dem Monat der Antragstellung gezahlt — stellen Sie den Antrag so früh wie möglich bei Ihrer Gemeinde- oder Stadtverwaltung!
              </p>
            </div>
          )}

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>⚠️ Hinweis:</strong> Dies ist eine vereinfachte Schätzung nach dem Wohngeld-Plus-Gesetz. Die tatsächliche Höhe wird von Ihrer Wohngeldstelle berechnet und kann abweichen. Die Berechnung ersetzt keine offizielle Auskunft. Kein Anspruch besteht bei Bezug von Bürgergeld, Sozialhilfe oder BAföG mit Wohnkostenanteil. → <a href="/finanzen/buergergeld-rechner" className="underline">Bürgergeld-Rechner</a>
            </p>
          </div>

          <CrossLink href="/finanzen/buergergeld-rechner" emoji="📋" text="Bürgergeld berechnen — Alternative zum Wohngeld prüfen" />
          <CrossLink href="/wohnen/nebenkosten-rechner" emoji="🏠" text="Nebenkosten berechnen" />

          <ErgebnisAktionen
            ergebnisText={ergebnis.hatAnspruch
              ? `Wohngeld: ca. ${fmtEuro(ergebnis.wohngeldMonat)} €/Monat (${fmtEuro(ergebnis.wohngeldJahr)} €/Jahr) | ${personen} Personen, ${fmtEuro(parseDeutscheZahl(einkommen))} € Einkommen, ${fmtEuro(parseDeutscheZahl(miete))} € Miete, Mietstufe ${mietstufe}`
              : `Kein Wohngeld-Anspruch | ${personen} Personen, ${fmtEuro(parseDeutscheZahl(einkommen))} € Einkommen, ${fmtEuro(parseDeutscheZahl(miete))} € Miete, Mietstufe ${mietstufe}`
            }
            seitenTitel="Wohngeld-Rechner"
          />

          <AiExplain
            rechnerName="Wohngeld-Rechner"
            eingaben={{
              haushaltsmitglieder: personen,
              einkommen: `${fmtEuro(parseDeutscheZahl(einkommen))} € brutto`,
              miete: `${fmtEuro(parseDeutscheZahl(miete))} €`,
              mietstufe: mietstufe,
              heizkosten: heizkosten ? 'Ja' : 'Nein',
            }}
            ergebnis={{
              wohngeld: ergebnis.hatAnspruch ? `${ergebnis.wohngeldMonat} €/Monat` : 'Kein Anspruch',
              bereinigtesEinkommen: `${ergebnis.bereinigtesEinkommen} €`,
              mietbelastung: `${ergebnis.mietbelastungOhne}% → ${ergebnis.mietbelastungMit}%`,
            }}
          />
        </>
      )}
    </div>
  );
}
