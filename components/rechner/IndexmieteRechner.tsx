'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  berechneIndexmiete,
  defaultDatumLetzteAnpassung,
} from '@/lib/berechnungen/indexmiete';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

export default function IndexmieteRechner() {
  const [kaltmiete, setKaltmiete] = useState('800');
  const [vpiAlt, setVpiAlt] = useState('117,4');
  const [vpiNeu, setVpiNeu] = useState('127,8');
  // SSG-Hydration-Guard: Datum leer initialisieren, client-seitig setzen.
  const [datumLetzteAnpassung, setDatumLetzteAnpassung] = useState('');

  useEffect(() => {
    setDatumLetzteAnpassung(defaultDatumLetzteAnpassung());
  }, []);

  const ergebnis = useMemo(
    () => berechneIndexmiete({
      kaltmiete: parseDeutscheZahl(kaltmiete),
      vpiAlt: parseDeutscheZahl(vpiAlt),
      vpiNeu: parseDeutscheZahl(vpiNeu),
      datumLetzteAnpassung,
    }),
    [kaltmiete, vpiAlt, vpiNeu, datumLetzteAnpassung],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtProzent = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtDatum = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div>
      {/* === 1: Kaltmiete === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Aktuelle Kaltmiete
        </h2>
        <NummerEingabe value={kaltmiete} onChange={setKaltmiete} placeholder="800" einheit="€/Monat" />
      </div>

      {/* === 2: VPI alt === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          VPI bei Vertragsabschluss / letzter Anpassung
        </h2>
        <NummerEingabe value={vpiAlt} onChange={setVpiAlt} placeholder="117,4" einheit="Punkte" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Steht in Ihrem Mietvertrag oder der letzten Anpassungsmitteilung. VPI-Werte finden Sie beim Statistischen Bundesamt (destatis.de).
        </p>
      </div>

      {/* === 3: VPI neu === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Aktueller VPI
        </h2>
        <NummerEingabe value={vpiNeu} onChange={setVpiNeu} placeholder="127,8" einheit="Punkte" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Aktuellen Wert prüfen auf destatis.de → Verbraucherpreisindex (Basisjahr 2020 = 100).
        </p>
      </div>

      {/* === 4: Datum letzte Anpassung === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Datum der letzten Anpassung
        </h2>
        <input
          type="date"
          value={datumLetzteAnpassung}
          onChange={e => setDatumLetzteAnpassung(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Eine Anpassung ist frühestens 12 Monate nach der letzten möglich.
        </p>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Neue Kaltmiete</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.kaltmieteNeu)} €</p>
        <p className="text-white/80 text-sm mt-1">pro Monat</p>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Bisherige Kaltmiete</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.kaltmieteAlt)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">VPI-Veränderung</td>
                <td className={`px-4 py-2.5 text-right tabular-nums whitespace-nowrap ${ergebnis.vpiVeraenderung >= 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                  {ergebnis.vpiVeraenderung >= 0 ? '+' : ''}{fmtProzent(ergebnis.vpiVeraenderung)} %
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Erhöhung absolut</td>
                <td className={`px-4 py-2.5 text-right tabular-nums whitespace-nowrap ${ergebnis.erhoehungAbsolut >= 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                  {ergebnis.erhoehungAbsolut >= 0 ? '+' : ''}{fmtEuro(ergebnis.erhoehungAbsolut)} € ({ergebnis.erhoehungProzent >= 0 ? '+' : ''}{fmtProzent(ergebnis.erhoehungProzent)} %)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Mehrkosten pro Jahr</td>
                <td className={`px-4 py-2.5 text-right tabular-nums whitespace-nowrap ${ergebnis.erhoehungProJahr >= 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                  {ergebnis.erhoehungProJahr >= 0 ? '+' : ''}{fmtEuro(ergebnis.erhoehungProJahr)} €
                </td>
              </tr>
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-semibold">
                <td className="px-4 py-2.5 text-blue-800 dark:text-blue-300 whitespace-nowrap">= Neue Kaltmiete</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-blue-800 dark:text-blue-300 whitespace-nowrap">{fmtEuro(ergebnis.kaltmieteNeu)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Anpassung möglich? */}
      {ergebnis.anpassungMoeglich ? (
        <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
          <p className="text-green-800 dark:text-green-300 text-sm">
            <strong>✓ Anpassung möglich:</strong> Eine Anpassung ist ab {fmtDatum(ergebnis.fruehestmoeglicheAnpassung)} möglich.
          </p>
        </div>
      ) : (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-800 dark:text-red-300 text-sm">
            <strong>✗ Noch nicht möglich:</strong> Nächste Anpassung erst ab {fmtDatum(ergebnis.fruehestmoeglicheAnpassung)} möglich (noch {ergebnis.monateBisAnpassung} {ergebnis.monateBisAnpassung === 1 ? 'Monat' : 'Monate'}).
          </p>
        </div>
      )}

      {/* VPI-Info */}
      <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-4 mb-6">
        <p className="text-indigo-800 dark:text-indigo-300 text-sm">
          <strong>📊 Verbraucherpreisindex:</strong> Der VPI (Basis 2020 = 100) misst die Preisentwicklung aller Waren und Dienstleistungen. Er wird monatlich vom Statistischen Bundesamt veröffentlicht.
        </p>
      </div>

      {/* Rechtshinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Die Mieterhöhung muss vom Vermieter schriftlich erklärt und begründet werden. Die Erhöhung greift frühestens im übernächsten Monat nach Zugang der Erklärung.
        </p>
      </div>

      <CrossLink href="/wohnen/mietrechner" emoji="🏠" text="Mietrechner: Kaltmiete, Warmmiete und Nebenkosten" />
      <CrossLink href="/wohnen/nebenkosten-rechner" emoji="💡" text="Nebenkosten-Rechner für die Betriebskostenabrechnung" />
      <CrossLink href="/finanzen/inflationsrechner" emoji="📈" text="Inflationsrechner: Kaufkraftverlust berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Neue Kaltmiete: ${fmtEuro(ergebnis.kaltmieteNeu)} € (vorher ${fmtEuro(ergebnis.kaltmieteAlt)} €) | Erhöhung: ${ergebnis.erhoehungAbsolut >= 0 ? '+' : ''}${fmtEuro(ergebnis.erhoehungAbsolut)} €/Monat (${ergebnis.erhoehungProzent >= 0 ? '+' : ''}${fmtProzent(ergebnis.erhoehungProzent)} %) | Mehrkosten/Jahr: ${fmtEuro(ergebnis.erhoehungProJahr)} € | VPI-Veränderung: ${fmtProzent(ergebnis.vpiVeraenderung)} %`}
        seitenTitel="Indexmiete-Rechner"
      />

      <AiExplain
        rechnerName="Indexmiete-Rechner"
        eingaben={{
          kaltmiete: `${fmtEuro(parseDeutscheZahl(kaltmiete))} €/Monat`,
          vpiAlt,
          vpiNeu,
          datumLetzteAnpassung: fmtDatum(datumLetzteAnpassung),
        }}
        ergebnis={{
          kaltmieteNeu: `${fmtEuro(ergebnis.kaltmieteNeu)} €`,
          erhoehung: `${fmtEuro(ergebnis.erhoehungAbsolut)} € (${fmtProzent(ergebnis.erhoehungProzent)} %)`,
          proJahr: `${fmtEuro(ergebnis.erhoehungProJahr)} €`,
          vpiVeraenderung: `${fmtProzent(ergebnis.vpiVeraenderung)} %`,
          anpassungMoeglich: ergebnis.anpassungMoeglich ? 'Ja' : `Nein (noch ${ergebnis.monateBisAnpassung} Monate)`,
        }}
      />
    </div>
  );
}
