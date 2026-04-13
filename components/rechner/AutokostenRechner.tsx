'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  berechneAutokosten,
  STANDARD_PREISE,
  ANTRIEB_EINHEITEN,
  VERBRAUCH_EINHEITEN,
  type Antriebsart,
  type FinanzierungsModus,
} from '@/lib/berechnungen/autokosten';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const FAHRLEISTUNG_SCHNELLWAHL = [10000, 15000, 20000, 30000];

export default function AutokostenRechner() {
  // Fahrzeug
  const [kaufpreis, setKaufpreis] = useState('25000');
  const [fahrzeugAlter, setFahrzeugAlter] = useState('0');
  const [haltedauer, setHaltedauer] = useState('5');
  const [finanzierung, setFinanzierung] = useState<FinanzierungsModus>('bar');
  const [monatlicheRate, setMonatlicheRate] = useState('350');

  // Versicherung & Steuer
  const [versicherung, setVersicherung] = useState('80');
  const [kfzSteuer, setKfzSteuer] = useState('150');

  // Kraftstoff
  const [fahrleistung, setFahrleistung] = useState('15000');
  const [verbrauch, setVerbrauch] = useState('7');
  const [antrieb, setAntrieb] = useState<Antriebsart>('benzin');
  const [kraftstoffpreis, setKraftstoffpreis] = useState('1,75');

  // Laufende Kosten
  const [wartung, setWartung] = useState('600');
  const [reifen, setReifen] = useState('400');
  const [tuev, setTuev] = useState('120');
  const [parkkosten, setParkkosten] = useState('0');
  const [waschanlage, setWaschanlage] = useState('15');

  // Kraftstoffpreis automatisch anpassen bei Antriebswechsel
  useEffect(() => {
    setKraftstoffpreis(STANDARD_PREISE[antrieb].toLocaleString('de-DE', { minimumFractionDigits: 2 }));
    if (antrieb === 'elektro') {
      setVerbrauch('18');
    } else if (antrieb === 'hybrid') {
      setVerbrauch('5,5');
    } else if (antrieb === 'diesel') {
      setVerbrauch('6');
    } else {
      setVerbrauch('7');
    }
  }, [antrieb]);

  const ergebnis = useMemo(
    () => berechneAutokosten({
      kaufpreis: parseDeutscheZahl(kaufpreis),
      fahrzeugAlter: parseDeutscheZahl(fahrzeugAlter),
      haltedauer: parseDeutscheZahl(haltedauer),
      finanzierung,
      monatlicheRate: parseDeutscheZahl(monatlicheRate),
      versicherungMonat: parseDeutscheZahl(versicherung),
      kfzSteuerJahr: parseDeutscheZahl(kfzSteuer),
      fahrleistungJahr: parseDeutscheZahl(fahrleistung),
      verbrauch: parseDeutscheZahl(verbrauch),
      antrieb,
      kraftstoffpreis: parseDeutscheZahl(kraftstoffpreis),
      wartungJahr: parseDeutscheZahl(wartung),
      reifenJahr: parseDeutscheZahl(reifen),
      tuevZweiJahre: parseDeutscheZahl(tuev),
      parkkostenMonat: parseDeutscheZahl(parkkosten),
      waschanlagePflegeMonat: parseDeutscheZahl(waschanlage),
    }),
    [kaufpreis, fahrzeugAlter, haltedauer, finanzierung, monatlicheRate, versicherung, kfzSteuer, fahrleistung, verbrauch, antrieb, kraftstoffpreis, wartung, reifen, tuev, parkkosten, waschanlage],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtEuro2 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* === Bereich 1: Fahrzeug === */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Fahrzeug &amp; Anschaffung
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kaufpreis / aktueller Wert</label>
            <div className="w-full sm:w-1/2"><NummerEingabe value={kaufpreis} onChange={setKaufpreis} placeholder="z.B. 25.000" einheit="€" /></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fahrzeugalter</label>
              <NummerEingabe value={fahrzeugAlter} onChange={setFahrzeugAlter} placeholder="0" einheit="Jahre" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geplante Haltedauer</label>
              <NummerEingabe value={haltedauer} onChange={setHaltedauer} placeholder="5" einheit="Jahre" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Finanzierung</label>
            <div className="flex gap-2">
              {(['bar', 'finanziert'] as FinanzierungsModus[]).map(f => (
                <button key={f} onClick={() => setFinanzierung(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${finanzierung === f ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}>
                  {f === 'bar' ? 'Bar bezahlt' : 'Finanziert / Leasing'}
                </button>
              ))}
            </div>
            {finanzierung === 'finanziert' && (
              <div className="mt-3 w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatliche Rate</label>
                <NummerEingabe value={monatlicheRate} onChange={setMonatlicheRate} placeholder="350" einheit="€/Monat" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* === Bereich 2: Versicherung & Steuer === */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Versicherung &amp; Steuer
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kfz-Versicherung</label>
            <NummerEingabe value={versicherung} onChange={setVersicherung} placeholder="80" einheit="€/Monat" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Haftpflicht + Teilkasko/Vollkasko</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kfz-Steuer</label>
            <NummerEingabe value={kfzSteuer} onChange={setKfzSteuer} placeholder="150" einheit="€/Jahr" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">→ <a href="/auto/kfz-steuer-rechner" className="text-primary-500 hover:underline">Kfz-Steuer-Rechner</a></p>
          </div>
        </div>
      </div>

      {/* === Bereich 3: Kraftstoff === */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Kraftstoff
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jährliche Fahrleistung</label>
            <div className="w-full sm:w-1/2"><NummerEingabe value={fahrleistung} onChange={setFahrleistung} placeholder="15.000" einheit="km" /></div>
            <div className="flex flex-wrap gap-2 mt-2">
              {FAHRLEISTUNG_SCHNELLWAHL.map(km => (
                <button key={km} onClick={() => setFahrleistung(String(km))}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${parseDeutscheZahl(fahrleistung) === km ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}>
                  {km.toLocaleString('de-DE')} km
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Antriebsart</label>
            <div className="flex flex-wrap gap-2">
              {(['benzin', 'diesel', 'elektro', 'hybrid'] as Antriebsart[]).map(a => (
                <button key={a} onClick={() => setAntrieb(a)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${antrieb === a ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}>
                  {a === 'benzin' ? '⛽ Benzin' : a === 'diesel' ? '⛽ Diesel' : a === 'elektro' ? '⚡ Elektro' : '🔋 Hybrid'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verbrauch</label>
              <NummerEingabe value={verbrauch} onChange={setVerbrauch} placeholder="7" einheit={VERBRAUCH_EINHEITEN[antrieb]} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kraftstoffpreis</label>
              <NummerEingabe value={kraftstoffpreis} onChange={setKraftstoffpreis} placeholder="1,75" einheit={ANTRIEB_EINHEITEN[antrieb]} />
            </div>
          </div>
        </div>
      </div>

      {/* === Bereich 4: Laufende Kosten === */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Laufende Kosten
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wartung &amp; Inspektion</label>
            <NummerEingabe value={wartung} onChange={setWartung} placeholder="600" einheit="€/Jahr" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ölwechsel, Inspektion, Verschleißteile</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reifen</label>
            <NummerEingabe value={reifen} onChange={setReifen} placeholder="400" einheit="€/Jahr" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Reifenwechsel + anteilige Neuanschaffung</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">TÜV / HU+AU</label>
            <NummerEingabe value={tuev} onChange={setTuev} placeholder="120" einheit="€ / 2 Jahre" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parkkosten <span className="text-gray-400 font-normal">(optional)</span></label>
            <NummerEingabe value={parkkosten} onChange={setParkkosten} placeholder="0" einheit="€/Monat" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Waschanlage / Pflege <span className="text-gray-400 font-normal">(optional)</span></label>
            <NummerEingabe value={waschanlage} onChange={setWaschanlage} placeholder="15" einheit="€/Monat" />
          </div>
        </div>
      </div>

      {/* === ERGEBNIS === */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-white/80 text-sm mb-1">Monatliche Gesamtkosten</p>
                <p className="text-5xl font-bold">{fmtEuro(ergebnis.gesamtMonat)} €</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmtEuro2(ergebnis.kostenProKm)} €/km
                </span>
                <div>
                  <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    {fmtEuro(ergebnis.gesamtJahr)} €/Jahr
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Kennzahlen */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Monat</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.gesamtMonat)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Kilometer</p>
              <p className="text-xl font-bold text-primary-600 dark:text-primary-400">{fmtEuro2(ergebnis.kostenProKm)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Tag</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{fmtEuro2(ergebnis.kostenProTag)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Restwert</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.restwert)} €</p>
            </div>
          </div>

          {/* Kostenverteilung (Tortendiagramm) */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-4 flex flex-col items-center">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3 self-start">Kostenverteilung</h3>
            <svg viewBox="0 0 200 200" className="w-44 h-44">
              {(() => {
                let cum = 0;
                return ergebnis.kostenBloecke.filter(b => b.anteilProzent > 0).map((block) => {
                  const startAngle = (cum / 100) * 360;
                  cum += block.anteilProzent;
                  const endAngle = (cum / 100) * 360;
                  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                  const r = 90;
                  const cx = 100, cy = 100;
                  const x1 = cx + r * Math.cos((startAngle - 90) * Math.PI / 180);
                  const y1 = cy + r * Math.sin((startAngle - 90) * Math.PI / 180);
                  const x2 = cx + r * Math.cos((endAngle - 90) * Math.PI / 180);
                  const y2 = cy + r * Math.sin((endAngle - 90) * Math.PI / 180);
                  const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
                  return <path key={block.label} d={d} fill={block.farbe} stroke="white" strokeWidth="1" />;
                });
              })()}
            </svg>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 justify-center">
              {ergebnis.kostenBloecke.filter(b => b.anteilProzent > 0).map(b => (
                <span key={b.label} className="flex items-center gap-1 text-[11px] text-gray-600 dark:text-gray-400">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block flex-shrink-0" style={{ backgroundColor: b.farbe }} />
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Aufschlüsselungs-Tabelle (volle Breite) */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-4 pt-4 pb-1">
              <h3 className="font-bold text-gray-700 dark:text-gray-200">Aufschlüsselung</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                    <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Position</th>
                    <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 text-right whitespace-nowrap">Monat</th>
                    <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 text-right whitespace-nowrap">Jahr</th>
                    <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 text-right whitespace-nowrap">Anteil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {ergebnis.kostenBloecke.map(b => (
                    <tr key={b.label}>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-sm inline-block flex-shrink-0" style={{ backgroundColor: b.farbe }} />
                          {b.label}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(b.monat)} €</td>
                      <td className="px-4 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(b.jahr)} €</td>
                      <td className="px-4 py-2 text-right tabular-nums text-gray-500 dark:text-gray-400 whitespace-nowrap">{Math.round(b.anteilProzent)} %</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 dark:bg-gray-700/30 font-bold">
                    <td className="px-4 py-2.5 text-gray-800 dark:text-gray-200">Gesamt</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-primary-600 dark:text-primary-400 whitespace-nowrap">{fmtEuro(ergebnis.gesamtMonat)} €</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-primary-600 dark:text-primary-400 whitespace-nowrap">{fmtEuro(ergebnis.gesamtJahr)} €</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-500 dark:text-gray-400">100 %</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Kraftstoffverbrauch-Detail */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-amber-800 dark:text-amber-300 text-sm mb-2">⛽ Kraftstoffverbrauch</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div>
                <p className="text-amber-700/70 dark:text-amber-400/70 text-xs">Verbrauch</p>
                <p className="font-semibold text-amber-800 dark:text-amber-300">{verbrauch} {VERBRAUCH_EINHEITEN[antrieb]}</p>
              </div>
              <div>
                <p className="text-amber-700/70 dark:text-amber-400/70 text-xs">Preis</p>
                <p className="font-semibold text-amber-800 dark:text-amber-300">{kraftstoffpreis} {ANTRIEB_EINHEITEN[antrieb]}</p>
              </div>
              <div>
                <p className="text-amber-700/70 dark:text-amber-400/70 text-xs">{antrieb === 'elektro' ? 'kWh / Jahr' : 'Liter / Jahr'}</p>
                <p className="font-semibold text-amber-800 dark:text-amber-300">{fmtEuro(ergebnis.kraftstoffVerbrauchJahr)}</p>
              </div>
              <div>
                <p className="text-amber-700/70 dark:text-amber-400/70 text-xs">Spritkosten / km</p>
                <p className="font-semibold text-amber-800 dark:text-amber-300">{fmtEuro2(ergebnis.kraftstoffProKm)} €</p>
              </div>
            </div>
          </div>

          <CrossLink href="/auto/spritkosten-rechner" emoji="⛽" text="Spritkosten für einzelne Fahrten genau berechnen" />

          {/* Wertverlust-Highlight */}
          {!ergebnis.istFinanziert && ergebnis.kostenBloecke[0] && ergebnis.kostenBloecke[0].anteilProzent > 20 && (
            <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-4 mb-6">
              <p className="text-indigo-800 dark:text-indigo-300 text-sm">
                <strong>💡 Wussten Sie?</strong> Der Wertverlust macht ca. <strong>{Math.round(ergebnis.kostenBloecke[0].anteilProzent)}%</strong> Ihrer Autokosten aus ({fmtEuro(ergebnis.wertverlustMonat)} €/Monat). Bei einem Neuwagen für {fmtEuro(parseDeutscheZahl(kaufpreis))} € verlieren Sie in {parseDeutscheZahl(haltedauer)} Jahren insgesamt <strong>{fmtEuro(ergebnis.gesamtWertverlust)} €</strong> an Wert.
              </p>
            </div>
          )}

          {/* Vergleich */}
          <div className={`rounded-xl p-4 mb-6 border ${ergebnis.vergleichProzent <= -5 ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30' : ergebnis.vergleichProzent >= 5 ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30' : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700'}`}>
            <p className={`text-sm font-medium ${ergebnis.vergleichProzent <= -5 ? 'text-green-800 dark:text-green-300' : ergebnis.vergleichProzent >= 5 ? 'text-red-800 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'}`}>
              {ergebnis.vergleichText}
            </p>
          </div>

          {/* Kosten pro Strecke */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-1">🛣️ Spritkosten pro Strecke</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Reine Kraftstoffkosten — ohne Fixkosten wie Versicherung oder Wertverlust</p>
            <div className="space-y-3">
              {ergebnis.streckenKosten.map(s => (
                <div key={s.label} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{s.label}</span>
                    <span className="text-gray-400 dark:text-gray-500 text-xs ml-1">({s.km} km{s.hinweis ? `, ${s.hinweis}` : ''})</span>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-gray-200 tabular-nums">{fmtEuro2(s.kosten)} €</span>
                </div>
              ))}
            </div>
          </div>

          <CrossLink href="/auto/bussgeldrechner" emoji="🚨" text="Bußgeld bei Verkehrsverstoß berechnen" />

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>⚠️ Hinweis:</strong> Die Berechnung basiert auf Durchschnittswerten und Ihren Angaben. Der tatsächliche Wertverlust hängt von Marke, Modell, Zustand und Nachfrage ab. Reparaturkosten und unvorhergesehene Ausgaben sind nicht eingerechnet. Für den exakten Spritverbrauch nutzen Sie unseren <a href="/auto/spritkosten-rechner" className="underline">Spritkostenrechner</a>.
            </p>
          </div>

          <AffiliateBox programId="check24" context="autokosten" />

          <ErgebnisAktionen
            ergebnisText={`Autokosten: ${fmtEuro(ergebnis.gesamtMonat)} €/Monat | ${fmtEuro(ergebnis.gesamtJahr)} €/Jahr | ${fmtEuro2(ergebnis.kostenProKm)} €/km | Wertverlust: ${fmtEuro(ergebnis.wertverlustJahr)} €/Jahr`}
            seitenTitel="Autokosten-Rechner"
          />

          <AiExplain
            rechnerName="Autokosten-Rechner"
            eingaben={{
              kaufpreis: `${fmtEuro(parseDeutscheZahl(kaufpreis))} €`,
              haltedauer: `${parseDeutscheZahl(haltedauer)} Jahre`,
              fahrleistung: `${fahrleistung} km/Jahr`,
              antrieb: antrieb,
              verbrauch: `${verbrauch} ${VERBRAUCH_EINHEITEN[antrieb]}`,
            }}
            ergebnis={{
              gesamtMonat: `${ergebnis.gesamtMonat} €`,
              kostenProKm: `${ergebnis.kostenProKm} €`,
              wertverlust: `${ergebnis.wertverlustJahr} €/Jahr`,
            }}
          />
        </>
      )}
    </div>
  );
}
