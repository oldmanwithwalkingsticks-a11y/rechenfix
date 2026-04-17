'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type FormTyp = 'rund' | 'rechteckig' | 'kasten';

interface FormState {
  typ: FormTyp;
  durchmesser: string;
  laenge: string;
  breite: string;
  hoehe: string;
}

const fmt = (n: number, d = 0): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });

function berechneFlaeche(f: FormState): number {
  const d = parseDeutscheZahl(f.durchmesser);
  const l = parseDeutscheZahl(f.laenge);
  const b = parseDeutscheZahl(f.breite);
  switch (f.typ) {
    case 'rund':        return Math.PI * (d / 2) ** 2;
    case 'rechteckig':  return l * b;
    case 'kasten':      return l * b;
  }
}

function formBeschreibung(f: FormState): string {
  switch (f.typ) {
    case 'rund':        return `Rund, Ø ${f.durchmesser} cm`;
    case 'rechteckig':  return `Rechteckig, ${f.laenge} × ${f.breite} cm`;
    case 'kasten':      return `Kastenform, ${f.laenge} × ${f.breite} × ${f.hoehe} cm`;
  }
}

export default function BackformUmrechner() {
  const [original, setOriginal] = useState<FormState>({
    typ: 'rund', durchmesser: '26', laenge: '30', breite: '20', hoehe: '7',
  });
  const [ziel, setZiel] = useState<FormState>({
    typ: 'rund', durchmesser: '20', laenge: '30', breite: '20', hoehe: '7',
  });

  const ergebnis = useMemo(() => {
    const flaecheOrig = berechneFlaeche(original);
    const flaecheZiel = berechneFlaeche(ziel);
    const faktor = flaecheOrig > 0 ? flaecheZiel / flaecheOrig : 1;

    // Prozentuale Abweichung
    const abweichung = Math.abs(faktor - 1) * 100;

    // Backzeit-Empfehlung
    let backzeitHinweis = '';
    if (faktor < 0.85) {
      backzeitHinweis = `Zielform ${fmt((1 - faktor) * 100)} % kleiner. Da die Zutaten entsprechend reduziert werden, bleibt die Teighöhe ähnlich → Backzeit und Temperatur bleiben weitgehend gleich (ggf. 2–5 Min kürzer, weil weniger Masse).`;
    } else if (faktor > 1.15) {
      backzeitHinweis = `Zielform ${fmt((faktor - 1) * 100)} % größer. Da die Zutaten entsprechend erhöht werden, bleibt die Teighöhe ähnlich → Backzeit und Temperatur bleiben weitgehend gleich (ggf. 2–5 Min länger, weil mehr Masse).`;
    } else {
      backzeitHinweis = 'Formen sind ähnlich groß — Backzeit und Temperatur bleiben unverändert.';
    }

    return { flaecheOrig, flaecheZiel, faktor, abweichung, backzeitHinweis };
  }, [original, ziel]);

  // Zutaten-Beispiele mit Faktor umgerechnet
  const beispiele = [
    { name: 'Mehl',    original: 250, einheit: 'g' },
    { name: 'Zucker',  original: 150, einheit: 'g' },
    { name: 'Butter',  original: 125, einheit: 'g' },
    { name: 'Eier',    original: 4,   einheit: 'Stück' },
    { name: 'Milch',   original: 150, einheit: 'ml' },
  ];

  // SVG-Größenvergleich
  const maxFlaeche = Math.max(ergebnis.flaecheOrig, ergebnis.flaecheZiel, 1);
  const origSkala = Math.sqrt(ergebnis.flaecheOrig / maxFlaeche);
  const zielSkala = Math.sqrt(ergebnis.flaecheZiel / maxFlaeche);

  return (
    <div>
      {/* === ORIGINAL === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Originalform (aus dem Rezept)
        </h2>
        <FormEingabe form={original} setForm={setOriginal} prefix="orig" />
      </div>

      {/* === ZIEL === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Zielform (Ihre Form)
        </h2>
        <FormEingabe form={ziel} setForm={setZiel} prefix="ziel" />
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6 text-center">
        <p className="text-white/80 text-sm mb-1">Umrechnungsfaktor</p>
        <p className="text-5xl font-bold">× {fmt(ergebnis.faktor, 2).replace(',00', '')}</p>
        <p className="text-white/90 text-sm mt-2">
          {formBeschreibung(original)} ({fmt(ergebnis.flaecheOrig)} cm²) → {formBeschreibung(ziel)} ({fmt(ergebnis.flaecheZiel)} cm²)
        </p>
      </div>

      {/* Visueller Größenvergleich */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Größenvergleich (maßstabsgetreu)</h2>
        <div className="flex items-end justify-around gap-4" style={{ height: '200px' }}>
          <FormSvg form={original} skala={origSkala} farbe="#2563eb" label="Original" />
          <FormSvg form={ziel} skala={zielSkala} farbe="#16a34a" label="Ziel" />
        </div>
      </div>

      {/* Zutatenbeispiele */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Zutatenmengen umgerechnet</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Zutat</th>
                <th className="px-4 py-2 text-right font-semibold">Original</th>
                <th className="px-4 py-2 text-right font-semibold">Umgerechnet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {beispiele.map(b => {
                const neu = b.original * ergebnis.faktor;
                const neuGerundet = b.einheit === 'Stück' ? Math.round(neu) : Math.round(neu / 5) * 5;
                return (
                  <tr key={b.name}>
                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{b.name}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-500 dark:text-gray-400 whitespace-nowrap">{b.original} {b.einheit}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-primary-700 dark:text-primary-300 font-semibold whitespace-nowrap">{b.einheit === 'Stück' ? neuGerundet : neuGerundet} {b.einheit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backzeit-Hinweis */}
      <div className="rounded-xl border p-4 mb-6 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>⏲️ Backzeit-Hinweis:</strong> {ergebnis.backzeitHinweis} Für exakte Anpassung bei geänderter Temperatur nutzen Sie den Backzeit-Rechner.
        </p>
      </div>

      {/* Springform-Standardgrößen */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Gängige Springform-Größen</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Durchmesser</th>
                <th className="px-4 py-2 text-right font-semibold">Fläche</th>
                <th className="px-4 py-2 text-left font-semibold">Typisch für</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {[
                { d: 18, nutzen: 'Mini-Kuchen, 4–6 Portionen' },
                { d: 20, nutzen: 'Kleiner Haushalt, 6–8 Portionen' },
                { d: 22, nutzen: 'Standard klein' },
                { d: 24, nutzen: 'Mittelgroße Familie' },
                { d: 26, nutzen: 'DEUTSCHER STANDARD, 8–12 Portionen' },
                { d: 28, nutzen: 'Große Kuchen, Partys' },
                { d: 30, nutzen: 'XXL, Festgebäck' },
              ].map(row => (
                <tr key={row.d}>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.d} cm</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmt(Math.PI * (row.d / 2) ** 2)} cm²</td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 text-xs">{row.nutzen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CrossLink href="/kochen/backzeit-rechner" emoji="⏲️" text="Backzeit anpassen" />
      <CrossLink href="/kochen/rezept-umrechner" emoji="📝" text="Rezept auf Portionen umrechnen" />
      <CrossLink href="/kochen/cups-umrechner" emoji="🥣" text="Cups in Gramm umrechnen" />
      <CrossLink href="/alltag/flaechenrechner" emoji="📐" text="Flächenrechner" />

      <ErgebnisAktionen
        ergebnisText={`Backform-Umrechner: ${formBeschreibung(original)} (${fmt(ergebnis.flaecheOrig)} cm²) → ${formBeschreibung(ziel)} (${fmt(ergebnis.flaecheZiel)} cm²) | Faktor × ${fmt(ergebnis.faktor, 2)}`}
        seitenTitel="Backform-Umrechner"
      />

      <AiExplain
        rechnerName="Backform-Umrechner"
        eingaben={{
          originalform: formBeschreibung(original),
          zielform: formBeschreibung(ziel),
        }}
        ergebnis={{
          flaecheOriginal: `${fmt(ergebnis.flaecheOrig)} cm²`,
          flaecheZiel: `${fmt(ergebnis.flaecheZiel)} cm²`,
          faktor: `× ${fmt(ergebnis.faktor, 2)}`,
          abweichung: `${fmt(ergebnis.abweichung)} %`,
        }}
      />
    </div>
  );
}

function FormEingabe({
  form, setForm, prefix,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
  prefix: string;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor={`${prefix}-typ`} className="sr-only">Formtyp</label>
        <select
          id={`${prefix}-typ`}
          value={form.typ}
          onChange={e => setForm({ ...form, typ: e.target.value as FormTyp })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          <option value="rund">⭕ Rund (Springform, Tortenring)</option>
          <option value="rechteckig">▬ Rechteckig (Blech, Auflaufform)</option>
          <option value="kasten">📦 Kastenform</option>
        </select>
      </div>

      {form.typ === 'rund' && (
        <div>
          <label htmlFor={`${prefix}-d`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Durchmesser (cm)</label>
          <NummerEingabe value={form.durchmesser} onChange={v => setForm({ ...form, durchmesser: v })} placeholder="26" einheit="cm" />
        </div>
      )}

      {form.typ === 'rechteckig' && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor={`${prefix}-l`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Länge (cm)</label>
            <NummerEingabe value={form.laenge} onChange={v => setForm({ ...form, laenge: v })} placeholder="30" einheit="cm" />
          </div>
          <div>
            <label htmlFor={`${prefix}-b`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Breite (cm)</label>
            <NummerEingabe value={form.breite} onChange={v => setForm({ ...form, breite: v })} placeholder="20" einheit="cm" />
          </div>
        </div>
      )}

      {form.typ === 'kasten' && (
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label htmlFor={`${prefix}-kl`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Länge</label>
            <NummerEingabe value={form.laenge} onChange={v => setForm({ ...form, laenge: v })} placeholder="30" einheit="cm" />
          </div>
          <div>
            <label htmlFor={`${prefix}-kb`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Breite</label>
            <NummerEingabe value={form.breite} onChange={v => setForm({ ...form, breite: v })} placeholder="11" einheit="cm" />
          </div>
          <div>
            <label htmlFor={`${prefix}-kh`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Höhe</label>
            <NummerEingabe value={form.hoehe} onChange={v => setForm({ ...form, hoehe: v })} placeholder="7" einheit="cm" />
          </div>
        </div>
      )}
    </div>
  );
}

function FormSvg({
  form, skala, farbe, label,
}: {
  form: FormState;
  skala: number;
  farbe: string;
  label: string;
}) {
  const maxSize = 150; // max SVG-Größe
  const size = Math.max(skala * maxSize, 20);

  return (
    <div className="text-center">
      <svg width={maxSize} height={maxSize} viewBox={`0 0 ${maxSize} ${maxSize}`}>
        {form.typ === 'rund' && (
          <circle
            cx={maxSize / 2}
            cy={maxSize / 2}
            r={size / 2}
            fill={farbe}
            fillOpacity={0.3}
            stroke={farbe}
            strokeWidth={2}
          />
        )}
        {(form.typ === 'rechteckig' || form.typ === 'kasten') && (() => {
          const l = parseDeutscheZahl(form.laenge);
          const b = parseDeutscheZahl(form.breite);
          const ratio = b > 0 ? l / b : 1;
          const width = size * Math.min(ratio, 1.5);
          const height = size / Math.min(ratio, 1.5);
          return (
            <rect
              x={(maxSize - width) / 2}
              y={(maxSize - height) / 2}
              width={width}
              height={height}
              fill={farbe}
              fillOpacity={0.3}
              stroke={farbe}
              strokeWidth={2}
            />
          );
        })()}
      </svg>
      <p className="text-xs font-semibold mt-1" style={{ color: farbe }}>{label}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{formBeschreibung(form)}</p>
    </div>
  );
}
