'use client';

import { useState, useMemo } from 'react';
import { berechneUmzugskosten, type UmzugsArt, type Etage } from '@/lib/berechnungen/umzugskosten';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const GROESSE_SCHNELLWAHL = [
  { label: '30 m² (1 Zi.)', wert: 30 },
  { label: '60 m² (2 Zi.)', wert: 60 },
  { label: '80 m² (3 Zi.)', wert: 80 },
  { label: '100 m² (4 Zi.)', wert: 100 },
  { label: '120+ m²', wert: 120 },
];

const ENTFERNUNG_SCHNELLWAHL = [
  { label: 'Gleiche Stadt', wert: 10 },
  { label: 'Nachbarstadt', wert: 50 },
  { label: '100+ km', wert: 100 },
  { label: 'Fernumzug', wert: 500 },
];

const ETAGE_OPTIONEN: { key: Etage; label: string }[] = [
  { key: 'eg', label: 'Erdgeschoss' },
  { key: '1og', label: '1. OG' },
  { key: '2og', label: '2. OG' },
  { key: '3og', label: '3. OG' },
  { key: '4og', label: '4. OG+' },
  { key: 'aufzug', label: 'Mit Aufzug' },
];

export default function UmzugskostenRechner() {
  const [wohnungsgroesse, setWohnungsgroesse] = useState('60');
  const [entfernung, setEntfernung] = useState('50');
  const [art, setArt] = useState<UmzugsArt>('firma');
  const [etageAlt, setEtageAlt] = useState<Etage>('2og');
  const [etageNeu, setEtageNeu] = useState<Etage>('1og');
  const [einpackservice, setEinpackservice] = useState(false);
  const [moebelmontage, setMoebelmontage] = useState(false);
  const [halteverbotszone, setHalteverbotszone] = useState(false);
  const [klaviertransport, setKlaviertransport] = useState(false);

  const nWohnungsgroesse = parseDeutscheZahl(wohnungsgroesse);
  const nEntfernung = parseDeutscheZahl(entfernung);

  const ergebnis = useMemo(
    () => berechneUmzugskosten({
      wohnungsgroesse: nWohnungsgroesse,
      entfernung: nEntfernung,
      art,
      etageAlt,
      etageNeu,
      einpackservice,
      moebelmontage,
      halteverbotszone,
      klaviertransport,
    }),
    [nWohnungsgroesse, nEntfernung, art, etageAlt, etageNeu, einpackservice, moebelmontage, halteverbotszone, klaviertransport],
  );

  const fmt = (n: number) => Math.round(n).toLocaleString('de-DE');

  return (
    <div>
      {/* Wohnungsgröße */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wohnungsgröße</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {GROESSE_SCHNELLWAHL.map(g => (
            <button
              key={g.wert}
              onClick={() => setWohnungsgroesse(String(g.wert))}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                nWohnungsgroesse === g.wert
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={wohnungsgroesse} onChange={setWohnungsgroesse} placeholder="z.B. 60" einheit="m²" />
        </div>
      </div>

      {/* Entfernung */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Entfernung</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {ENTFERNUNG_SCHNELLWAHL.map(e => (
            <button
              key={e.wert}
              onClick={() => setEntfernung(String(e.wert))}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                nEntfernung === e.wert
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={entfernung} onChange={setEntfernung} placeholder="z.B. 50" einheit="km" />
        </div>
      </div>

      {/* Art des Umzugs */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Art des Umzugs</label>
        <div className="flex gap-2">
          <button
            onClick={() => setArt('firma')}
            className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
              art === 'firma'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
            }`}
          >
            Mit Umzugsfirma
          </button>
          <button
            onClick={() => setArt('selbst')}
            className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
              art === 'selbst'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
            }`}
          >
            Selbst organisiert
          </button>
        </div>
      </div>

      {/* Etagen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Etage (alte Wohnung)</label>
          <select
            value={etageAlt}
            onChange={e => setEtageAlt(e.target.value as Etage)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {ETAGE_OPTIONEN.map(e => (
              <option key={e.key} value={e.key}>{e.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Etage (neue Wohnung)</label>
          <select
            value={etageNeu}
            onChange={e => setEtageNeu(e.target.value as Etage)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {ETAGE_OPTIONEN.map(e => (
              <option key={e.key} value={e.key}>{e.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Zusatzleistungen (nur bei Firma) */}
      {art === 'firma' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Zusatzleistungen</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { id: 'einpack', label: 'Einpackservice', hint: `+${fmt(nWohnungsgroesse * 4)} €`, checked: einpackservice, set: setEinpackservice },
              { id: 'moebel', label: 'Möbelmontage/-demontage', hint: '+250 €', checked: moebelmontage, set: setMoebelmontage },
              { id: 'halte', label: 'Halteverbotszone (×2)', hint: '+300 €', checked: halteverbotszone, set: setHalteverbotszone },
              { id: 'klavier', label: 'Klaviertransport', hint: '+350 €', checked: klaviertransport, set: setKlaviertransport },
            ].map(z => (
              <label
                key={z.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                  z.checked
                    ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-300 dark:border-primary-500/50'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={z.checked}
                  onChange={e => z.set(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-400"
                />
                <span className="text-sm text-gray-800 dark:text-gray-200">{z.label}</span>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{z.hint}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {art === 'selbst' && <div className="mb-6" />}

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Gesamtkosten */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">
              Geschätzte Umzugskosten {art === 'firma' ? '(Umzugsfirma)' : '(selbst organisiert)'}
            </p>
            <p className="text-5xl font-bold">{fmt(ergebnis.gesamtkosten)} €</p>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Kostenaufschlüsselung</h3>
            <div className="space-y-3">
              {art === 'firma' ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Basiskosten ({nWohnungsgroesse} m² × {ergebnis.kostenProQm} €)</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.basiskosten)} €</span>
                  </div>
                  {ergebnis.etagenzuschlag > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Etagenzuschlag</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">+{fmt(ergebnis.etagenzuschlag)} €</span>
                    </div>
                  )}
                  {ergebnis.einpackservice > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Einpackservice</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">+{fmt(ergebnis.einpackservice)} €</span>
                    </div>
                  )}
                  {ergebnis.moebelmontage > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Möbelmontage</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">+{fmt(ergebnis.moebelmontage)} €</span>
                    </div>
                  )}
                  {ergebnis.halteverbotszone > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Halteverbotszone (×2)</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">+{fmt(ergebnis.halteverbotszone)} €</span>
                    </div>
                  )}
                  {ergebnis.klaviertransport > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Klaviertransport</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">+{fmt(ergebnis.klaviertransport)} €</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Transporter ({ergebnis.transporterTyp})</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.transporterMiete)} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Km-Kosten ({nEntfernung} km × 2 × 0,35 €)</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.kmKosten)} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Verpackungsmaterial</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.verpackung)} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Verpflegung Helfer</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.verpflegung)} €</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-700 dark:text-gray-200 font-bold">Gesamtkosten Umzug</span>
                <span className="font-bold text-primary-600 dark:text-primary-400">{fmt(ergebnis.gesamtkosten)} €</span>
              </div>
            </div>

            {/* Kostenbalken */}
            {art === 'firma' ? (
              <div className="mt-4">
                {(() => {
                  const teile = [
                    { label: 'Basis', wert: ergebnis.basiskosten, farbe: 'bg-blue-400 dark:bg-blue-500' },
                    { label: 'Etage', wert: ergebnis.etagenzuschlag, farbe: 'bg-orange-400 dark:bg-orange-500' },
                    { label: 'Extras', wert: ergebnis.einpackservice + ergebnis.moebelmontage + ergebnis.halteverbotszone + ergebnis.klaviertransport, farbe: 'bg-green-400 dark:bg-green-500' },
                  ].filter(t => t.wert > 0);
                  return (
                    <>
                      <div className="flex h-5 rounded-full overflow-hidden">
                        {teile.map(t => (
                          <div key={t.label} className={`${t.farbe} h-full transition-all`} style={{ width: `${(t.wert / ergebnis.gesamtkosten) * 100}%` }} />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {teile.map(t => (
                          <span key={t.label} className="flex items-center gap-1">
                            <span className={`w-2.5 h-2.5 rounded-full ${t.farbe} inline-block`} />
                            {t.label} ({fmt(t.wert)} €)
                          </span>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="mt-4">
                {(() => {
                  const teile = [
                    { label: 'Transporter', wert: ergebnis.transporterMiete, farbe: 'bg-blue-400 dark:bg-blue-500' },
                    { label: 'Km-Kosten', wert: ergebnis.kmKosten, farbe: 'bg-orange-400 dark:bg-orange-500' },
                    { label: 'Material', wert: ergebnis.verpackung, farbe: 'bg-green-400 dark:bg-green-500' },
                    { label: 'Verpflegung', wert: ergebnis.verpflegung, farbe: 'bg-purple-400 dark:bg-purple-500' },
                  ].filter(t => t.wert > 0);
                  return (
                    <>
                      <div className="flex h-5 rounded-full overflow-hidden">
                        {teile.map(t => (
                          <div key={t.label} className={`${t.farbe} h-full transition-all`} style={{ width: `${(t.wert / ergebnis.gesamtkosten) * 100}%` }} />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {teile.map(t => (
                          <span key={t.label} className="flex items-center gap-1">
                            <span className={`w-2.5 h-2.5 rounded-full ${t.farbe} inline-block`} />
                            {t.label} ({fmt(t.wert)} €)
                          </span>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Vergleichsbox (bei Firma) */}
          {art === 'firma' && ergebnis.vergleichSelbst !== null && ergebnis.differenz !== null && (
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                <strong>Vergleich:</strong> Selbst organisiert würde ca. <strong>{fmt(ergebnis.vergleichSelbst)} €</strong> kosten —
                {ergebnis.differenz > 0
                  ? ` Sie zahlen mit Umzugsfirma ca. ${fmt(ergebnis.differenz)} € mehr.`
                  : ` Sie sparen mit Umzugsfirma ca. ${fmt(Math.abs(ergebnis.differenz))} €.`
                }
              </p>
            </div>
          )}

          {/* Zusätzliche Kosten */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Weitere Kosten (nicht eingerechnet)</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Nachsendeauftrag (Post)</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.nachsendeauftrag)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Renovierung alte Wohnung (geschätzt)</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">ca. {fmt(ergebnis.renovierung)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Ummeldung beim Einwohnermeldeamt</span>
                <span className="font-semibold text-green-600 dark:text-green-400">kostenlos</span>
              </div>
            </div>
          </div>

          {/* Checkliste */}
          <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-4">
            <p className="font-bold text-green-800 dark:text-green-300 text-sm mb-2">Nicht vergessen:</p>
            <ul className="text-green-700 dark:text-green-400 text-sm space-y-1">
              <li>✓ Nachsendeauftrag bei der Post einrichten</li>
              <li>✓ Wohnsitz innerhalb von 2 Wochen ummelden</li>
              <li>✓ Strom- und Gasanbieter ummelden oder wechseln</li>
              <li>✓ Internet/Telefon am neuen Wohnort anmelden</li>
              <li>✓ Adressänderung bei Bank, Versicherungen, Arbeitgeber</li>
              <li>✓ GEZ-Beitragsnummer aktualisieren</li>
            </ul>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Die Kosten sind Richtwerte und können je nach Region, Saison und Anbieter variieren. Holen Sie mindestens 3 Angebote von Umzugsfirmen ein. In der Hauptsaison (Mai-September) liegen die Preise meist 20-30% höher.
            </p>
          </div>

          <CrossLink href="/wohnen/mietrechner" emoji="🏠" text="Neue Miete berechnen" />
          <CrossLink href="/wohnen/nebenkosten-rechner" emoji="📋" text="Nebenkosten der neuen Wohnung" />

          <ErgebnisAktionen
            ergebnisText={`Umzugskosten (${nWohnungsgroesse} m², ${nEntfernung} km, ${art === 'firma' ? 'Umzugsfirma' : 'selbst organisiert'}): ca. ${fmt(ergebnis.gesamtkosten)} €${art === 'firma' && ergebnis.vergleichSelbst ? ` | Selbst: ca. ${fmt(ergebnis.vergleichSelbst)} €` : ''}`}
            seitenTitel="Umzugskosten-Rechner"
          />

          <AiExplain
            rechnerName="Umzugskosten-Rechner"
            eingaben={{
              wohnungsgroesse: nWohnungsgroesse,
              entfernung: nEntfernung,
              art: art === 'firma' ? 'Mit Umzugsfirma' : 'Selbst organisiert',
              etageAlt: ETAGE_OPTIONEN.find(e => e.key === etageAlt)?.label || etageAlt,
              etageNeu: ETAGE_OPTIONEN.find(e => e.key === etageNeu)?.label || etageNeu,
              zusatzleistungen: [
                einpackservice && 'Einpackservice',
                moebelmontage && 'Möbelmontage',
                halteverbotszone && 'Halteverbotszone',
                klaviertransport && 'Klaviertransport',
              ].filter(Boolean).join(', ') || 'keine',
            }}
            ergebnis={{
              gesamtkosten: ergebnis.gesamtkosten,
              vergleichSelbst: ergebnis.vergleichSelbst,
            }}
          />
        </>
      )}
    </div>
  );
}
