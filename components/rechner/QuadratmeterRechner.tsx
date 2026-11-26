'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import {
  berechneQuadratmeter,
  type FormTyp,
  type FlaechenEingabe,
  type Einheit,
} from '@/lib/berechnungen/quadratmeter';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

interface FlaechenFormular {
  id: number;
  form: FormTyp;
  // Rechteck
  laenge: string;
  breite: string;
  // Kreis
  radius: string;
  durchmesser: string;
  kreisMode: 'radius' | 'durchmesser';
  // Dreieck
  grundseite: string;
  hoehe: string;
  // L-Form
  r1Laenge: string;
  r1Breite: string;
  r2Laenge: string;
  r2Breite: string;
  // Trapez
  seiteA: string;
  seiteC: string;
  trapezHoehe: string;
}

function leereFlaeche(id: number): FlaechenFormular {
  return {
    id,
    form: 'rechteck',
    laenge: '', breite: '',
    radius: '', durchmesser: '', kreisMode: 'radius',
    grundseite: '', hoehe: '',
    r1Laenge: '', r1Breite: '', r2Laenge: '', r2Breite: '',
    seiteA: '', seiteC: '', trapezHoehe: '',
  };
}

function formularZuEingabe(f: FlaechenFormular): FlaechenEingabe | null {
  switch (f.form) {
    case 'rechteck': {
      const l = parseDeutscheZahl(f.laenge);
      const b = parseDeutscheZahl(f.breite);
      if (l <= 0 || b <= 0) return null;
      return { form: 'rechteck', laenge: l, breite: b };
    }
    case 'kreis': {
      const r = f.kreisMode === 'durchmesser'
        ? parseDeutscheZahl(f.durchmesser) / 2
        : parseDeutscheZahl(f.radius);
      if (r <= 0) return null;
      return { form: 'kreis', radius: r };
    }
    case 'dreieck': {
      const g = parseDeutscheZahl(f.grundseite);
      const h = parseDeutscheZahl(f.hoehe);
      if (g <= 0 || h <= 0) return null;
      return { form: 'dreieck', grundseite: g, hoehe: h };
    }
    case 'lform': {
      const l1 = parseDeutscheZahl(f.r1Laenge);
      const b1 = parseDeutscheZahl(f.r1Breite);
      const l2 = parseDeutscheZahl(f.r2Laenge);
      const b2 = parseDeutscheZahl(f.r2Breite);
      if (l1 <= 0 || b1 <= 0 || l2 <= 0 || b2 <= 0) return null;
      return { form: 'lform', r1Laenge: l1, r1Breite: b1, r2Laenge: l2, r2Breite: b2 };
    }
    case 'trapez': {
      const a = parseDeutscheZahl(f.seiteA);
      const c = parseDeutscheZahl(f.seiteC);
      const h = parseDeutscheZahl(f.trapezHoehe);
      if (a <= 0 || c <= 0 || h <= 0) return null;
      return { form: 'trapez', seiteA: a, seiteC: c, hoehe: h };
    }
  }
}

const formOptionen: { key: FormTyp; label: string }[] = [
  { key: 'rechteck', label: 'Rechteck' },
  { key: 'kreis', label: 'Kreis' },
  { key: 'dreieck', label: 'Dreieck' },
  { key: 'lform', label: 'L-Form' },
  { key: 'trapez', label: 'Trapez' },
];

const einheitOptionen: { key: Einheit; label: string }[] = [
  { key: 'm', label: 'Meter' },
  { key: 'cm', label: 'Zentimeter' },
  { key: 'mm', label: 'Millimeter' },
];

export default function QuadratmeterRechner() {
  const [flaechen, setFlaechen] = useState<FlaechenFormular[]>([leereFlaeche(1)]);
  const [einheit, setEinheit] = useState<Einheit>('m');
  const nextId = flaechen.length > 0 ? Math.max(...flaechen.map(f => f.id)) + 1 : 1;

  const updateFlaeche = (id: number, updates: Partial<FlaechenFormular>) => {
    setFlaechen(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const entferneFlaeche = (id: number) => {
    setFlaechen(prev => prev.filter(f => f.id !== id));
  };

  const fuegeHinzu = () => {
    setFlaechen(prev => [...prev, leereFlaeche(nextId)]);
  };

  const ergebnis = useMemo(() => {
    const eingaben: FlaechenEingabe[] = [];
    for (const f of flaechen) {
      const e = formularZuEingabe(f);
      if (!e) return null;
      eingaben.push(e);
    }
    return berechneQuadratmeter(eingaben, einheit);
  }, [flaechen, einheit]);

  const fmt = (n: number, digits = 4) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: digits });

  const einheitLabel = einheit === 'm' ? 'm' : einheit;

  return (
    <div>
      {/* Einheit */}
      <div className="mb-4">
        <RadioToggleGroup
          name="quadratmeter-einheit"
          legend="Eingabe-Einheit"
          options={einheitOptionen.map(o => ({ value: o.key, label: o.label }))}
          value={einheit}
          onChange={v => setEinheit(v as Einheit)}
        />
      </div>

      {/* Flächen */}
      {flaechen.map((f, idx) => (
        <div key={f.id} className="mb-4 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {flaechen.length > 1 ? `Fläche ${idx + 1}` : 'Fläche'}
            </p>
            {flaechen.length > 1 && (
              <button
                onClick={() => entferneFlaeche(f.id)}
                className="text-xs text-red-700 dark:text-red-300 hover:text-red-700 dark:hover:text-red-400 transition-colors"
              >
                Entfernen
              </button>
            )}
          </div>

          {/* Form-Tabs */}
          <div className="mb-4">
            <RadioToggleGroup
              name={`quadratmeter-form-${f.id}`}
              legend={flaechen.length > 1 ? `Form von Fläche ${idx + 1}` : 'Form der Fläche'}
              srOnlyLegend
              options={formOptionen.map(o => ({ value: o.key, label: o.label }))}
              value={f.form}
              onChange={v => updateFlaeche(f.id, { form: v as FormTyp })}
            />
          </div>

          {/* Form-spezifische Eingaben */}
          {f.form === 'rechteck' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={`quadratmeter-${f.id}-laenge`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Länge</label>
                <NummerEingabe id={`quadratmeter-${f.id}-laenge`} value={f.laenge} onChange={v => updateFlaeche(f.id, { laenge: v })} placeholder="5" einheit={einheitLabel} />
              </div>
              <div>
                <label htmlFor={`quadratmeter-${f.id}-breite`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Breite</label>
                <NummerEingabe id={`quadratmeter-${f.id}-breite`} value={f.breite} onChange={v => updateFlaeche(f.id, { breite: v })} placeholder="4" einheit={einheitLabel} />
              </div>
            </div>
          )}

          {f.form === 'kreis' && (
            <div>
              <div className="mb-3">
                <RadioToggleGroup
                  name={`quadratmeter-kreismass-${f.id}`}
                  legend={flaechen.length > 1 ? `Kreis von Fläche ${idx + 1} angeben über` : 'Kreis angeben über'}
                  srOnlyLegend
                  activeColor="accent"
                  options={[
                    { value: 'radius', label: 'Radius' },
                    { value: 'durchmesser', label: 'Durchmesser' },
                  ]}
                  value={f.kreisMode}
                  onChange={v => updateFlaeche(f.id, { kreisMode: v as 'radius' | 'durchmesser' })}
                />
              </div>
              {f.kreisMode === 'radius' ? (
                <div>
                  <label htmlFor={`quadratmeter-${f.id}-radius`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Radius</label>
                  <NummerEingabe id={`quadratmeter-${f.id}-radius`} value={f.radius} onChange={v => updateFlaeche(f.id, { radius: v })} placeholder="3" einheit={einheitLabel} />
                </div>
              ) : (
                <div>
                  <label htmlFor={`quadratmeter-${f.id}-durchmesser`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Durchmesser</label>
                  <NummerEingabe id={`quadratmeter-${f.id}-durchmesser`} value={f.durchmesser} onChange={v => updateFlaeche(f.id, { durchmesser: v })} placeholder="6" einheit={einheitLabel} />
                </div>
              )}
            </div>
          )}

          {f.form === 'dreieck' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={`quadratmeter-${f.id}-grundseite`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Grundseite</label>
                <NummerEingabe id={`quadratmeter-${f.id}-grundseite`} value={f.grundseite} onChange={v => updateFlaeche(f.id, { grundseite: v })} placeholder="6" einheit={einheitLabel} />
              </div>
              <div>
                <label htmlFor={`quadratmeter-${f.id}-hoehe`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Höhe</label>
                <NummerEingabe id={`quadratmeter-${f.id}-hoehe`} value={f.hoehe} onChange={v => updateFlaeche(f.id, { hoehe: v })} placeholder="4" einheit={einheitLabel} />
              </div>
            </div>
          )}

          {f.form === 'lform' && (
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Teilen Sie Ihren L-förmigen Raum in zwei Rechtecke auf</p>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">Rechteck 1</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label htmlFor={`quadratmeter-${f.id}-laenge-2`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Länge</label>
                  <NummerEingabe id={`quadratmeter-${f.id}-laenge-2`} value={f.r1Laenge} onChange={v => updateFlaeche(f.id, { r1Laenge: v })} placeholder="5" einheit={einheitLabel} />
                </div>
                <div>
                  <label htmlFor={`quadratmeter-${f.id}-breite-2`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Breite</label>
                  <NummerEingabe id={`quadratmeter-${f.id}-breite-2`} value={f.r1Breite} onChange={v => updateFlaeche(f.id, { r1Breite: v })} placeholder="3" einheit={einheitLabel} />
                </div>
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">Rechteck 2</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`quadratmeter-${f.id}-laenge-3`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Länge</label>
                  <NummerEingabe id={`quadratmeter-${f.id}-laenge-3`} value={f.r2Laenge} onChange={v => updateFlaeche(f.id, { r2Laenge: v })} placeholder="3" einheit={einheitLabel} />
                </div>
                <div>
                  <label htmlFor={`quadratmeter-${f.id}-breite-3`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Breite</label>
                  <NummerEingabe id={`quadratmeter-${f.id}-breite-3`} value={f.r2Breite} onChange={v => updateFlaeche(f.id, { r2Breite: v })} placeholder="2" einheit={einheitLabel} />
                </div>
              </div>
            </div>
          )}

          {f.form === 'trapez' && (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor={`quadratmeter-${f.id}-seite-a`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Seite a (oben)</label>
                <NummerEingabe id={`quadratmeter-${f.id}-seite-a`} value={f.seiteA} onChange={v => updateFlaeche(f.id, { seiteA: v })} placeholder="3" einheit={einheitLabel} />
              </div>
              <div>
                <label htmlFor={`quadratmeter-${f.id}-seite-c`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Seite c (unten)</label>
                <NummerEingabe id={`quadratmeter-${f.id}-seite-c`} value={f.seiteC} onChange={v => updateFlaeche(f.id, { seiteC: v })} placeholder="5" einheit={einheitLabel} />
              </div>
              <div>
                <label htmlFor={`quadratmeter-${f.id}-hoehe-2`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Höhe</label>
                <NummerEingabe id={`quadratmeter-${f.id}-hoehe-2`} value={f.trapezHoehe} onChange={v => updateFlaeche(f.id, { trapezHoehe: v })} placeholder="4" einheit={einheitLabel} />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Weitere Fläche hinzufügen */}
      <button
        onClick={fuegeHinzu}
        className="w-full py-2.5 mb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-primary-400 hover:text-primary-600 dark:hover:border-primary-500 dark:hover:text-primary-400 transition-all"
      >
        + Weitere Fläche hinzufügen
      </button>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
              {ergebnis.einzelFlaechen.length > 1 ? 'Gesamtfläche' : 'Fläche'}
            </p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {fmt(ergebnis.gesamtFlaeche)} m²
            </p>
            {ergebnis.einzelFlaechen.length === 1 && ergebnis.einzelFlaechen[0].umfang !== null && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Umfang: {fmt(ergebnis.einzelFlaechen[0].umfang)} m
              </p>
            )}
          </div>

          <CrossLink href="/wohnen/tapetenbedarf-rechner" emoji="🧻" text="Tapetenbedarf für die Fläche berechnen" />
          <CrossLink href="/wohnen/mietrechner" emoji="🏠" text="Miete pro m² vergleichen" />

          <ErgebnisAktionen
            ergebnisText={`${ergebnis.einzelFlaechen.length > 1 ? 'Gesamtfläche' : 'Fläche'}: ${fmt(ergebnis.gesamtFlaeche)} m²`}
            seitenTitel="Quadratmeterrechner"
          />
          <AiExplain
            rechnerName="Quadratmeter-Rechner"
            eingaben={{
              anzahlFlaechen: ergebnis.einzelFlaechen.length,
              einheit,
              flaechen: ergebnis.einzelFlaechen.map(ef => ({ form: ef.label, flaeche: ef.flaeche })),
            }}
            ergebnis={{
              gesamtFlaeche: ergebnis.gesamtFlaeche,
              inCm2: ergebnis.inCm2,
              inAr: ergebnis.inAr,
              inHektar: ergebnis.inHektar,
            }}
          />

          {/* Einzelflächen bei mehreren */}
          {ergebnis.einzelFlaechen.length > 1 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Einzelflächen</p>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {ergebnis.einzelFlaechen.map((ef, i) => (
                  <div key={i} className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{ef.label}</span>
                    <div className="text-right">
                      <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ef.flaeche)} m²</span>
                      {ef.umfang !== null && (
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">(U: {fmt(ef.umfang)} m)</span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                  <span className="text-gray-800 dark:text-gray-100">Gesamtfläche</span>
                  <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.gesamtFlaeche)} m²</span>
                </div>
              </div>
            </div>
          )}

          {/* Umrechnungen */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Quadratzentimeter</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.inCm2, 2)} cm²</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Quadratmillimeter</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.inMm2, 2)} mm²</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Ar</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.inAr)} a</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Hektar</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{ergebnis.inHektar.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ha</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
