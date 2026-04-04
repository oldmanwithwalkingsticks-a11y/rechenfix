'use client';

import { useState, useMemo } from 'react';
import { berechneElterngeld, berechneVergleich, type ElterngeldVariante } from '@/lib/berechnungen/elterngeld';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';

export default function ElterngeldRechner() {
  const [nettoVorGeburt, setNettoVorGeburt] = useState('2500');
  const [nettoDanach, setNettoDanach] = useState('0');
  const [variante, setVariante] = useState<ElterngeldVariante>('basis');
  const [mehrlinge, setMehrlinge] = useState(false);
  const [geschwisterbonus, setGeschwisterbonus] = useState(false);

  const nVor = parseDeutscheZahl(nettoVorGeburt);
  const nNach = parseDeutscheZahl(nettoDanach);

  const ergebnis = useMemo(
    () => berechneElterngeld({ nettoVorGeburt: nVor, nettoDanach: nNach, variante, mehrlinge, geschwisterbonus }),
    [nVor, nNach, variante, mehrlinge, geschwisterbonus]
  );

  const vergleich = useMemo(
    () => berechneVergleich({ nettoVorGeburt: nVor, nettoDanach: nNach, variante, mehrlinge, geschwisterbonus }),
    [nVor, nNach, variante, mehrlinge, geschwisterbonus]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Elterngeld-Variante */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Elterngeld-Variante</label>
        <div className="flex gap-2">
          <button
            onClick={() => setVariante('basis')}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              variante === 'basis'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Basiselterngeld
          </button>
          <button
            onClick={() => setVariante('plus')}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              variante === 'plus'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            ElterngeldPlus
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
          {variante === 'basis'
            ? '12+2 Monate, 300–1.800 € pro Monat'
            : '24+4 Monate, 150–900 € pro Monat'}
        </p>
      </div>

      {/* Nettoeinkommen vor der Geburt */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nettoeinkommen vor der Geburt (monatlich)
        </label>
        <NummerEingabe
          value={nettoVorGeburt}
          onChange={setNettoVorGeburt}
          placeholder="z. B. 2500"
          einheit="€"
        />
      </div>

      {/* Nettoeinkommen während Elternzeit */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nettoeinkommen während Elternzeit (monatlich)
        </label>
        <NummerEingabe
          value={nettoDanach}
          onChange={setNettoDanach}
          placeholder="0 wenn nicht arbeitend"
          einheit="€"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Bei Teilzeit in der Elternzeit: Ihr voraussichtliches Netto eingeben
        </p>
      </div>

      {/* Toggles */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <ToggleButton
          label="Mehrlingsgeburt"
          sublabel="Zwillinge, Drillinge etc."
          checked={mehrlinge}
          onChange={setMehrlinge}
        />
        <ToggleButton
          label="Geschwisterbonus"
          sublabel="Weiteres Kind unter 3 Jahren"
          checked={geschwisterbonus}
          onChange={setGeschwisterbonus}
        />
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4">
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
              Monatliches {variante === 'basis' ? 'Basiselterngeld' : 'ElterngeldPlus'}
            </p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {fmt(ergebnis.monatlich)} €
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Ersatzrate: {ergebnis.ersatzrate.toLocaleString('de-DE')} %
            </p>
          </div>

          {/* Detail-Kacheln */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bezugsdauer</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{ergebnis.bezugsMonate} Monate</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {variante === 'basis' ? '(12+2 Partnermonate)' : '(24+4 Partnermonate)'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gesamt-Elterngeld</p>
              <p className="text-xl font-bold text-accent-600 dark:text-accent-400">{fmt(ergebnis.gesamt)} €</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">über {ergebnis.bezugsMonate} Monate</p>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Relevantes Einkommen</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.relevantesEinkommen)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Ersatzrate</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.ersatzrate.toLocaleString('de-DE')} %</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {variante === 'basis' ? 'Basiselterngeld' : 'ElterngeldPlus'}
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.basisBetrag)} €</span>
              </div>
              {ergebnis.geschwisterbonusBetrag > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Geschwisterbonus (+10%)</span>
                  <span className="font-medium text-green-600 dark:text-green-400">+{fmt(ergebnis.geschwisterbonusBetrag)} €</span>
                </div>
              )}
              {ergebnis.mehrlingszuschlag > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Mehrlingszuschlag</span>
                  <span className="font-medium text-green-600 dark:text-green-400">+{fmt(ergebnis.mehrlingszuschlag)} €</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Elterngeld pro Monat</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.monatlich)} €</span>
              </div>
            </div>
          </div>

          {/* Vergleichstabelle */}
          {vergleich && (
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Vergleich: Basiselterngeld vs. ElterngeldPlus</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <th className="text-left px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium"></th>
                      <th className={`text-right px-4 py-2.5 font-semibold ${variante === 'basis' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>
                        Basiselterngeld
                      </th>
                      <th className={`text-right px-4 py-2.5 font-semibold ${variante === 'plus' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>
                        ElterngeldPlus
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Pro Monat</td>
                      <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">{fmt(vergleich.basis.monatlich)} €</td>
                      <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">{fmt(vergleich.plus.monatlich)} €</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Bezugsdauer</td>
                      <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">{vergleich.basis.bezugsMonate} Monate</td>
                      <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">{vergleich.plus.bezugsMonate} Monate</td>
                    </tr>
                    <tr className="bg-primary-50/30 dark:bg-primary-500/5">
                      <td className="px-4 py-2.5 font-semibold text-gray-800 dark:text-gray-100">Gesamt</td>
                      <td className="px-4 py-2.5 text-right font-bold text-gray-800 dark:text-gray-200">{fmt(vergleich.basis.gesamt)} €</td>
                      <td className="px-4 py-2.5 text-right font-bold text-gray-800 dark:text-gray-200">{fmt(vergleich.plus.gesamt)} €</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Min/Max pro Monat</td>
                      <td className="px-4 py-2.5 text-right text-gray-500 dark:text-gray-400">300–1.800 €</td>
                      <td className="px-4 py-2.5 text-right text-gray-500 dark:text-gray-400">150–900 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Vereinfachte Berechnung. Maßgeblich ist der Bescheid der Elterngeldstelle.
              Wenden Sie sich für verbindliche Auskünfte an Ihre zuständige Elterngeldstelle.
            </p>
          </div>

          <ErgebnisAktionen
            ergebnisText={`${variante === 'basis' ? 'Basiselterngeld' : 'ElterngeldPlus'}: ${fmt(ergebnis.monatlich)} € / Monat, ${fmt(ergebnis.gesamt)} € gesamt (${ergebnis.bezugsMonate} Monate)`}
            seitenTitel="Elterngeld-Rechner"
          />
        </div>
      )}
    </div>
  );
}

function ToggleButton({
  label,
  sublabel,
  checked,
  onChange,
}: {
  label: string;
  sublabel: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`flex-1 flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
        checked
          ? 'border-primary-300 dark:border-primary-500/50 bg-primary-50 dark:bg-primary-500/10'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <div className={`w-10 h-6 rounded-full shrink-0 relative transition-colors duration-200 ${
        checked ? 'bg-green-500' : 'bg-red-400'
      }`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{sublabel}</p>
      </div>
    </button>
  );
}
