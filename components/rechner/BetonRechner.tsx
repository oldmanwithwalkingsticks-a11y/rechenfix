'use client';

import { useState, useMemo } from 'react';
import { berechneBeton } from '@/lib/berechnungen/beton';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt3 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

export default function BetonRechner() {
  const [form, setForm] = useState('rechteck');
  // Rechteck
  const [laenge, setLaenge] = useState('3');
  const [breite, setBreite] = useState('2');
  const [hoehe, setHoehe] = useState('0,15');
  // Rund
  const [durchmesser, setDurchmesser] = useState('0,3');
  const [rundHoehe, setRundHoehe] = useState('0,8');
  // L-Form
  const [l1Laenge, setL1Laenge] = useState('3');
  const [l1Breite, setL1Breite] = useState('1');
  const [l2Laenge, setL2Laenge] = useState('2');
  const [l2Breite, setL2Breite] = useState('1');
  const [lDicke, setLDicke] = useState('0,15');
  // Optionen
  const [zuschlag, setZuschlag] = useState('10');
  const [sackgroesse, setSackgroesse] = useState('25');

  const ergebnis = useMemo(() => {
    const masse = form === 'rechteck'
      ? { laenge: parseDeutscheZahl(laenge), breite: parseDeutscheZahl(breite), hoehe: parseDeutscheZahl(hoehe) }
      : form === 'rund'
      ? { durchmesser: parseDeutscheZahl(durchmesser), hoehe: parseDeutscheZahl(rundHoehe) }
      : { l1Laenge: parseDeutscheZahl(l1Laenge), l1Breite: parseDeutscheZahl(l1Breite), l2Laenge: parseDeutscheZahl(l2Laenge), l2Breite: parseDeutscheZahl(l2Breite), lDicke: parseDeutscheZahl(lDicke) };

    return berechneBeton(
      form as 'rechteck' | 'rund' | 'lform',
      masse,
      parseInt(zuschlag),
      parseInt(sackgroesse)
    );
  }, [form, laenge, breite, hoehe, durchmesser, rundHoehe, l1Laenge, l1Breite, l2Laenge, l2Breite, lDicke, zuschlag, sackgroesse]);

  return (
    <div>
      <div className="space-y-4 mb-6">
        <RadioToggleGroup
          legend="Form"
          name="form"
          options={[
            { value: 'rechteck', label: 'Rechteckig' },
            { value: 'rund', label: 'Rund (Säule)' },
            { value: 'lform', label: 'L-Form' },
          ]}
          value={form}
          onChange={setForm}
        />

        {form === 'rechteck' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Länge (m)</label>
              <NummerEingabe value={laenge} onChange={setLaenge} placeholder="3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Breite (m)</label>
              <NummerEingabe value={breite} onChange={setBreite} placeholder="2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Höhe/Dicke (m)</label>
              <NummerEingabe value={hoehe} onChange={setHoehe} placeholder="0,15" />
            </div>
          </div>
        )}

        {form === 'rund' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Durchmesser (m)</label>
              <NummerEingabe value={durchmesser} onChange={setDurchmesser} placeholder="0,3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Höhe (m)</label>
              <NummerEingabe value={rundHoehe} onChange={setRundHoehe} placeholder="0,8" />
            </div>
          </div>
        )}

        {form === 'lform' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400">Schenkel 1</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Länge (m)</label>
                <NummerEingabe value={l1Laenge} onChange={setL1Laenge} placeholder="3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Breite (m)</label>
                <NummerEingabe value={l1Breite} onChange={setL1Breite} placeholder="1" />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Schenkel 2</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Länge (m)</label>
                <NummerEingabe value={l2Laenge} onChange={setL2Laenge} placeholder="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Breite (m)</label>
                <NummerEingabe value={l2Breite} onChange={setL2Breite} placeholder="1" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dicke (m)</label>
              <NummerEingabe value={lDicke} onChange={setLDicke} placeholder="0,15" />
            </div>
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="zuschlag" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zuschlag</label>
            <select id="zuschlag" value={zuschlag} onChange={e => setZuschlag(e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base">
              <option value="0">0 % (kein Zuschlag)</option>
              <option value="5">5 % (Standard)</option>
              <option value="10">10 % (Sicherheit)</option>
            </select>
          </div>
          <div>
            <label htmlFor="sackgroesse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sackgröße</label>
            <select id="sackgroesse" value={sackgroesse} onChange={e => setSackgroesse(e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base">
              <option value="25">25 kg</option>
              <option value="40">40 kg</option>
            </select>
          </div>
        </div>
      </div>

      {ergebnis && (
        <>
          <div className="result-box mb-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-white/70 text-sm mb-1">Volumen</p>
                <p className="text-2xl sm:text-3xl font-bold">{fmt3(ergebnis.volumenMitZuschlag)}</p>
                <p className="text-white/60 text-xs">m³</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Gewicht</p>
                <p className="text-2xl sm:text-3xl font-bold">{ergebnis.gewichtKg.toLocaleString('de-DE')}</p>
                <p className="text-white/60 text-xs">kg ({ergebnis.gewichtTonnen} t)</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Säcke ({ergebnis.sackgroesseKg} kg)</p>
                <p className="text-2xl sm:text-3xl font-bold">{ergebnis.anzahlSaecke}</p>
                <p className="text-white/60 text-xs">Stück</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Kosten (Sack)</p>
                <p className="text-2xl sm:text-3xl font-bold">{fmt(ergebnis.kostenSaecke)}</p>
                <p className="text-white/60 text-xs">€</p>
              </div>
            </div>
          </div>

          {/* Empfehlung */}
          {ergebnis.empfehlungLieferbeton && (
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-4">
              <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">💡 Lieferbeton empfohlen</p>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Ab 0,5 m³ ist Lieferbeton oft günstiger und bequemer: ca. <strong>{fmt(ergebnis.kostenLieferbeton)} €</strong> (80–120 €/m³) statt {fmt(ergebnis.kostenSaecke)} € für {ergebnis.anzahlSaecke} Säcke.
              </p>
            </div>
          )}

          {/* Rechenweg */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Rechenweg</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.rechenweg.map((s, i) => (
                <div key={i} className="px-4 py-2 text-sm font-mono text-gray-700 dark:text-gray-300">{s}</div>
              ))}
            </div>
          </div>

          <CrossLink href="/mathe/volumenrechner" emoji="📐" text="Volumen berechnen" />
          <CrossLink href="/mathe/flaechenrechner" emoji="📐" text="Fläche berechnen" />
          <CrossLink href="/wohnen/quadratmeter-rechner" emoji="📏" text="Quadratmeter berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Beton: ${fmt3(ergebnis.volumenMitZuschlag)} m³, ${ergebnis.gewichtKg.toLocaleString('de-DE')} kg, ${ergebnis.anzahlSaecke} Säcke (${ergebnis.sackgroesseKg} kg)`}
            seitenTitel="Beton-Rechner"
          />

          <AiExplain
            rechnerName="Beton-Rechner"
            eingaben={{ form: ergebnis.form, zuschlag: ergebnis.zuschlagProzent, sackgroesse: ergebnis.sackgroesseKg }}
            ergebnis={{
              volumen: ergebnis.volumenMitZuschlag,
              gewichtKg: ergebnis.gewichtKg,
              saecke: ergebnis.anzahlSaecke,
              kostenSaecke: ergebnis.kostenSaecke,
              kostenLieferbeton: ergebnis.kostenLieferbeton,
            }}
          />
        </>
      )}
    </div>
  );
}
