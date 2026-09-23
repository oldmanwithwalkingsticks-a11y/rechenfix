'use client';

import { useState, useMemo } from 'react';
import {
  berechneBrueche,
  kuerzeBruch,
  dezimalTextZuBruch,
  bruchZuDezimal,
  vergleicheBrueche,
  gemischtZuBruch,
  zuGemischt,
  kuerzen,
  type Operation,
  type Bruch,
  type BruchRechenErgebnis,
  type KuerzenErgebnis,
  type GemischteZahl,
  type VergleichErgebnis,
} from '@/lib/berechnungen/bruchrechnung';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

type Tab = 'rechnen' | 'kuerzen' | 'dezimal' | 'vergleichen';

function BruchAnzeige({ zaehler, nenner, className = '' }: { zaehler: number; nenner: number; className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center mx-1 ${className}`}>
      <span className="text-center px-1 leading-tight">{zaehler}</span>
      <span className="w-full border-t-2 border-current" />
      <span className="text-center px-1 leading-tight">{nenner}</span>
    </span>
  );
}

function GemischtAnzeige({ ganz, zaehler, nenner, className = '' }: { ganz: number; zaehler: number; nenner: number; className?: string }) {
  if (zaehler === 0) {
    return <span className={className}>{ganz}</span>;
  }
  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className="mr-0.5">{ganz}</span>
      <BruchAnzeige zaehler={Math.abs(zaehler)} nenner={nenner} />
    </span>
  );
}

/**
 * Ganzzahl aus einem Bruchfeld (W150). Kommazahlen und ungültige Eingaben ergeben null —
 * früher wurde hier stumm gerundet, aus „0,75“ wurde 1 und das Ergebnis war falsch.
 */
function ganzzahl(text: string): number | null {
  const v = parseDeutscheZahl(text);
  return Number.isInteger(v) ? v : null;
}

const HINWEIS_GANZZAHL = 'Zähler, Nenner und ganze Zahl bitte als ganze Zahlen eingeben.';
const HINWEIS_ZN = 'Zähler und Nenner bitte als ganze Zahlen eingeben.';

function Hinweis({ text }: { text: string }) {
  return (
    <div
      role="status"
      className="rounded-xl border border-amber-200 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200"
    >
      {text}
    </div>
  );
}

type OperandModus = 'bruch' | 'dezimal';

type OperandOk = { ok: true; bruch: Bruch; text: string; umwandlung: string | null };
type Operand = OperandOk | { ok: false; fehler: string };

/** Ergebnis eines Tabs: entweder ein sichtbarer Hinweis oder die Werte (W150, nie stumm leer). */
type Pruefung<T> = { ok: false; fehler: string } | ({ ok: true } & T);

/** Liest eine Seite der Rechnung — als Bruch (auch gemischt) oder als Dezimalzahl (W150). */
function leseOperand(
  name: string, modus: OperandModus, dezimal: string, z: string, n: string, g: string,
): Operand {
  if (modus === 'dezimal') {
    const r = dezimalTextZuBruch(dezimal);
    if (!r) {
      return { ok: false, fehler: `${name}: bitte eine Dezimalzahl mit höchstens neun Nachkommastellen eingeben, zum Beispiel 0,75.` };
    }
    const text = dezimal.trim();
    const roh = `${r.roh.zaehler}/${r.roh.nenner}`;
    const gekuerzt = `${r.bruch.zaehler}/${r.bruch.nenner}`;
    return { ok: true, bruch: r.bruch, text, umwandlung: roh === gekuerzt ? `${text} = ${gekuerzt}` : `${text} = ${roh} = ${gekuerzt}` };
  }
  const zaehler = ganzzahl(z);
  const nenner = ganzzahl(n);
  const ganz = g.trim() ? ganzzahl(g) : 0;
  if (zaehler === null || nenner === null || ganz === null) {
    return { ok: false, fehler: `${name}: ${HINWEIS_GANZZAHL} Für Kommazahlen auf „Dezimalzahl“ umschalten.` };
  }
  if (nenner === 0) return { ok: false, fehler: `${name}: Der Nenner darf nicht 0 sein.` };
  const bruch: Bruch = ganz !== 0 ? gemischtZuBruch(ganz, zaehler, nenner) : { zaehler, nenner };
  return { ok: true, bruch, text: ganz !== 0 ? `${ganz} ${zaehler}/${nenner}` : `${zaehler}/${nenner}`, umwandlung: null };
}

function OperandEingabe({
  nr, modus, setModus, dezimal, setDezimal, zaehler, setZaehler, nenner, setNenner, ganz, setGanz,
}: {
  nr: 1 | 2;
  modus: OperandModus; setModus: (m: OperandModus) => void;
  dezimal: string; setDezimal: (v: string) => void;
  zaehler: string; setZaehler: (v: string) => void;
  nenner: string; setNenner: (v: string) => void;
  ganz: string; setGanz: (v: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <RadioToggleGroup
        name={`bruch-modus-${nr}`}
        legend={`Zahl ${nr} eingeben als`}
        srOnlyLegend
        options={[
          { value: 'bruch', label: 'Bruch' },
          { value: 'dezimal', label: 'Dezimalzahl' },
        ]}
        value={modus}
        onChange={(v) => setModus(v as OperandModus)}
      />
      {modus === 'dezimal' ? (
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Zahl {nr} (Dezimalzahl)</p>
          <div className="w-32">
            <NummerEingabe value={dezimal} onChange={setDezimal} placeholder="0,75" />
          </div>
        </div>
      ) : (
        <BruchEingabe zaehler={zaehler} setZaehler={setZaehler} nenner={nenner} setNenner={setNenner} ganz={ganz} setGanz={setGanz} label={`Bruch ${nr}`} />
      )}
    </div>
  );
}

function BruchEingabe({
  zaehler, setZaehler, nenner, setNenner, ganz, setGanz, label,
}: {
  zaehler: string; setZaehler: (v: string) => void;
  nenner: string; setNenner: (v: string) => void;
  ganz?: string; setGanz?: (v: string) => void;
  label: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">{label}</p>
      <div className="flex items-center gap-2">
        {ganz !== undefined && setGanz && (
          <div className="w-14">
            <NummerEingabe value={ganz} onChange={setGanz} placeholder="0" />
          </div>
        )}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-16">
            <NummerEingabe value={zaehler} onChange={setZaehler} placeholder="1" />
          </div>
          <div className="w-16 border-t-2 border-gray-400 dark:border-gray-500" />
          <div className="w-16">
            <NummerEingabe value={nenner} onChange={setNenner} placeholder="2" />
          </div>
        </div>
      </div>
    </div>
  );
}

const tabOptionen: { key: Tab; label: string }[] = [
  { key: 'rechnen', label: 'Brüche rechnen' },
  { key: 'kuerzen', label: 'Kürzen' },
  { key: 'dezimal', label: 'Dezimal ↔ Bruch' },
  { key: 'vergleichen', label: 'Vergleichen' },
];

const operationen: Operation[] = ['+', '-', '×', '÷'];

export default function BruchRechner() {
  const [tab, setTab] = useState<Tab>('rechnen');

  // Tab 1: Rechnen
  const [z1, setZ1] = useState('1');
  const [n1, setN1] = useState('3');
  const [g1, setG1] = useState('');
  const [op, setOp] = useState<Operation>('+');
  const [z2, setZ2] = useState('2');
  const [n2, setN2] = useState('5');
  const [g2, setG2] = useState('');
  const [modus1, setModus1] = useState<OperandModus>('bruch');
  const [modus2, setModus2] = useState<OperandModus>('bruch');
  const [d1, setD1] = useState('0,75');
  const [d2, setD2] = useState('0,5');

  // Tab 2: Kürzen
  const [kz, setKz] = useState('12');
  const [kn, setKn] = useState('18');

  // Tab 3: Dezimal
  const [dezMode, setDezMode] = useState<'zuBruch' | 'zuDezimal'>('zuBruch');
  const [dezWert, setDezWert] = useState('0,75');
  const [dz, setDz] = useState('3');
  const [dn, setDn] = useState('4');

  // Tab 4: Vergleichen
  const [vz1, setVz1] = useState('2');
  const [vn1, setVn1] = useState('3');
  const [vz2, setVz2] = useState('3');
  const [vn2, setVn2] = useState('4');

  // Ergebnis Tab 1
  const rechnung = useMemo<Pruefung<{ o1: OperandOk; o2: OperandOk; ergebnis: BruchRechenErgebnis }>>(() => {
    const o1 = leseOperand(modus1 === 'dezimal' ? 'Zahl 1' : 'Bruch 1', modus1, d1, z1, n1, g1);
    const o2 = leseOperand(modus2 === 'dezimal' ? 'Zahl 2' : 'Bruch 2', modus2, d2, z2, n2, g2);
    if (!o1.ok) return { ok: false, fehler: o1.fehler };
    if (!o2.ok) return { ok: false, fehler: o2.fehler };
    if (op === '÷' && o2.bruch.zaehler === 0) return { ok: false, fehler: 'Durch 0 kann man nicht teilen.' };
    const ergebnis = berechneBrueche(o1.bruch, op, o2.bruch);
    if (!ergebnis) return { ok: false, fehler: 'Diese Aufgabe lässt sich nicht berechnen.' };
    return { ok: true, o1, o2, ergebnis };
  }, [modus1, d1, z1, n1, g1, op, modus2, d2, z2, n2, g2]);
  const rechenErgebnis = rechnung.ok ? rechnung.ergebnis : null;

  // Ergebnis Tab 2
  const kuerzen2 = useMemo<Pruefung<{ e: KuerzenErgebnis }>>(() => {
    const z = ganzzahl(kz);
    const n = ganzzahl(kn);
    if (z === null || n === null) return { ok: false, fehler: HINWEIS_ZN };
    if (n === 0) return { ok: false, fehler: 'Der Nenner darf nicht 0 sein.' };
    const e = kuerzeBruch({ zaehler: z, nenner: n });
    return e ? { ok: true, e } : { ok: false, fehler: 'Dieser Bruch lässt sich nicht kürzen.' };
  }, [kz, kn]);
  const kuerzenErgebnis = kuerzen2.ok ? kuerzen2.e : null;

  // Ergebnis Tab 3
  const dezimal3 = useMemo<Pruefung<{ e: { bruch: Bruch; dezimal: number; gemischt: GemischteZahl | null } }>>(() => {
    if (dezMode === 'zuBruch') {
      // Exakt aus den Ziffern (W150) statt über die Gleitkommazahl
      const r = dezimalTextZuBruch(dezWert);
      if (!r) return { ok: false, fehler: 'Bitte eine Dezimalzahl mit höchstens neun Nachkommastellen eingeben, zum Beispiel 0,75.' };
      return { ok: true, e: { bruch: r.bruch, dezimal: parseDeutscheZahl(dezWert), gemischt: zuGemischt(r.bruch) } };
    } else {
      const z = ganzzahl(dz);
      const n = ganzzahl(dn);
      if (z === null || n === null) return { ok: false, fehler: HINWEIS_ZN };
      if (n === 0) return { ok: false, fehler: 'Der Nenner darf nicht 0 sein.' };
      const b = kuerzen({ zaehler: z, nenner: n });
      const d = bruchZuDezimal(b);
      if (d === null) return { ok: false, fehler: 'Dieser Bruch lässt sich nicht umrechnen.' };
      return { ok: true, e: { bruch: b, dezimal: Math.round(d * 1000000) / 1000000, gemischt: zuGemischt(b) } };
    }
  }, [dezMode, dezWert, dz, dn]);
  const dezimalErgebnis = dezimal3.ok ? dezimal3.e : null;

  // Ergebnis Tab 4
  const vergleich4 = useMemo<Pruefung<{ e: VergleichErgebnis; b1: Bruch; b2: Bruch }>>(() => {
    const z1v = ganzzahl(vz1);
    const n1v = ganzzahl(vn1);
    const z2v = ganzzahl(vz2);
    const n2v = ganzzahl(vn2);
    if (z1v === null || n1v === null || z2v === null || n2v === null) return { ok: false, fehler: HINWEIS_ZN };
    if (n1v === 0 || n2v === 0) return { ok: false, fehler: 'Der Nenner darf nicht 0 sein.' };
    const e = vergleicheBrueche({ zaehler: z1v, nenner: n1v }, { zaehler: z2v, nenner: n2v });
    return e ? { ok: true, e, b1: { zaehler: z1v, nenner: n1v }, b2: { zaehler: z2v, nenner: n2v } } : { ok: false, fehler: 'Diese Brüche lassen sich nicht vergleichen.' };
  }, [vz1, vn1, vz2, vn2]);
  const vergleichErgebnis = vergleich4.ok ? vergleich4.e : null;

  const fmtDez = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 6 });

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {tabOptionen.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === t.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Brüche rechnen */}
      {tab === 'rechnen' && (
        <div>
          <div className="flex flex-wrap items-end justify-center gap-3 mb-6">
            <OperandEingabe nr={1} modus={modus1} setModus={setModus1} dezimal={d1} setDezimal={setD1} zaehler={z1} setZaehler={setZ1} nenner={n1} setNenner={setN1} ganz={g1} setGanz={setG1} />

            <div className="flex gap-1 pb-4">
              {operationen.map(o => (
                <button
                  key={o}
                  onClick={() => setOp(o)}
                  className={`w-10 h-10 rounded-lg text-lg font-bold transition-all ${
                    op === o
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>

            <OperandEingabe nr={2} modus={modus2} setModus={setModus2} dezimal={d2} setDezimal={setD2} zaehler={z2} setZaehler={setZ2} nenner={n2} setNenner={setN2} ganz={g2} setGanz={setG2} />
          </div>

          {!rechnung.ok && <Hinweis text={rechnung.fehler} />}

          {rechenErgebnis && rechnung.ok && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">Ergebnis</p>
                <div className="flex items-center justify-center text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  <BruchAnzeige zaehler={rechenErgebnis.ergebnis.zaehler} nenner={rechenErgebnis.ergebnis.nenner} />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                  <span>= {fmtDez(rechenErgebnis.dezimal)}</span>
                  {rechenErgebnis.gemischt && (
                    <span className="inline-flex items-center">
                      = <GemischtAnzeige
                        ganz={rechenErgebnis.gemischt.ganz}
                        zaehler={rechenErgebnis.gemischt.zaehler}
                        nenner={rechenErgebnis.gemischt.nenner}
                      />
                    </span>
                  )}
                </div>
              </div>

              <CrossLink href="/alltag/prozentrechner" emoji="%" text="Bruch in Prozent umrechnen" />

              <ErgebnisAktionen
                ergebnisText={`${rechnung.o1.text} ${op} ${rechnung.o2.text} = ${rechenErgebnis.ergebnis.zaehler}/${rechenErgebnis.ergebnis.nenner} (${fmtDez(rechenErgebnis.dezimal)})`}
                seitenTitel="Bruchrechner"
              />

              <AiExplain
                rechnerName="Bruchrechner"
                eingaben={{ eingabe1: rechnung.o1.text, bruch1Zaehler: rechnung.o1.bruch.zaehler, bruch1Nenner: rechnung.o1.bruch.nenner, operation: op, eingabe2: rechnung.o2.text, bruch2Zaehler: rechnung.o2.bruch.zaehler, bruch2Nenner: rechnung.o2.bruch.nenner }}
                ergebnis={{ ergebnisZaehler: rechenErgebnis.ergebnis.zaehler, ergebnisNenner: rechenErgebnis.ergebnis.nenner, dezimal: rechenErgebnis.dezimal }}
              />

              {/* Rechenweg */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Rechenweg</p>
                </div>
                <div className="px-4 py-3 space-y-2 text-sm">
                  {[rechnung.o1.umwandlung, rechnung.o2.umwandlung].filter(Boolean).map((u) => (
                    <p key={u} className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-800 dark:text-gray-200">Umwandlung:</span>{' '}
                      {u}
                    </p>
                  ))}
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-800 dark:text-gray-200">Aufgabe:</span>{' '}
                    {rechenErgebnis.schritte.eingabe}
                  </p>
                  {rechenErgebnis.schritte.hauptnenner && (
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-800 dark:text-gray-200">Schritt 1:</span>{' '}
                      {rechenErgebnis.schritte.hauptnenner}
                    </p>
                  )}
                  {rechenErgebnis.schritte.erweitert && (
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-800 dark:text-gray-200">Erweitert:</span>{' '}
                      {rechenErgebnis.schritte.erweitert}
                    </p>
                  )}
                  {rechenErgebnis.schritte.ungekuerzt && (
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-800 dark:text-gray-200">Ungekürzt:</span>{' '}
                      {rechenErgebnis.schritte.ungekuerzt}
                    </p>
                  )}
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-primary-600 dark:text-primary-400">Ergebnis:</span>{' '}
                    {rechenErgebnis.schritte.gekuerzt}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Kürzen */}
      {tab === 'kuerzen' && (
        <div>
          <div className="flex justify-center mb-6">
            <BruchEingabe zaehler={kz} setZaehler={setKz} nenner={kn} setNenner={setKn} label="Bruch eingeben" />
          </div>

          {!kuerzen2.ok && <Hinweis text={kuerzen2.fehler} />}

          {kuerzenErgebnis && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">Gekürzter Bruch</p>
                <div className="flex items-center justify-center text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  <BruchAnzeige zaehler={kuerzenErgebnis.gekuerzt.zaehler} nenner={kuerzenErgebnis.gekuerzt.nenner} />
                </div>
                {kuerzenErgebnis.istBereitsGekuerzt ? (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-3">Der Bruch ist bereits vollständig gekürzt.</p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    Gekürzt mit GGT {kuerzenErgebnis.teilGgt} — Zähler und Nenner durch {kuerzenErgebnis.teilGgt} geteilt.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Dezimal ↔ Bruch */}
      {tab === 'dezimal' && (
        <div>
          <div className="mb-4">
            <RadioToggleGroup
              name="bruch-dezmode"
              legend="Umrechnungsrichtung"
              options={[
                { value: 'zuBruch', label: 'Dezimal → Bruch' },
                { value: 'zuDezimal', label: 'Bruch → Dezimal' },
              ]}
              value={dezMode}
              onChange={(v) => setDezMode(v as 'zuBruch' | 'zuDezimal')}
              activeColor="accent"
            />
          </div>

          <div className="flex justify-center mb-6">
            {dezMode === 'zuBruch' ? (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Dezimalzahl</p>
                <div className="w-32">
                  <NummerEingabe value={dezWert} onChange={setDezWert} placeholder="0,75" />
                </div>
              </div>
            ) : (
              <BruchEingabe zaehler={dz} setZaehler={setDz} nenner={dn} setNenner={setDn} label="Bruch eingeben" />
            )}
          </div>

          {!dezimal3.ok && <Hinweis text={dezimal3.fehler} />}

          {dezimalErgebnis && (
            <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
              {dezMode === 'zuBruch' ? (
                <>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">Als Bruch</p>
                  <div className="flex items-center justify-center text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                    <BruchAnzeige zaehler={dezimalErgebnis.bruch.zaehler} nenner={dezimalErgebnis.bruch.nenner} />
                  </div>
                  {dezimalErgebnis.gemischt && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 inline-flex items-center justify-center">
                      = <GemischtAnzeige ganz={dezimalErgebnis.gemischt.ganz} zaehler={dezimalErgebnis.gemischt.zaehler} nenner={dezimalErgebnis.gemischt.nenner} />
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">Als Dezimalzahl</p>
                  <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                    {fmtDez(dezimalErgebnis.dezimal)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 inline-flex items-center justify-center">
                    <BruchAnzeige zaehler={dezimalErgebnis.bruch.zaehler} nenner={dezimalErgebnis.bruch.nenner} className="text-base" />
                    <span className="ml-1">= {fmtDez(dezimalErgebnis.dezimal)}</span>
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Vergleichen */}
      {tab === 'vergleichen' && (
        <div>
          <div className="flex flex-wrap items-end justify-center gap-4 mb-6">
            <BruchEingabe zaehler={vz1} setZaehler={setVz1} nenner={vn1} setNenner={setVn1} label="Bruch 1" />
            <div className="pb-4 text-2xl font-bold text-gray-600">?</div>
            <BruchEingabe zaehler={vz2} setZaehler={setVz2} nenner={vn2} setNenner={setVn2} label="Bruch 2" />
          </div>

          {!vergleich4.ok && <Hinweis text={vergleich4.fehler} />}

          {vergleichErgebnis && vergleich4.ok && (
            <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-4 text-3xl font-extrabold text-primary-700 dark:text-primary-300">
                <BruchAnzeige zaehler={vergleich4.b1.zaehler} nenner={vergleich4.b1.nenner} />
                <span className={`text-4xl ${
                  vergleichErgebnis.zeichen === '='
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-accent-600 dark:text-accent-400'
                }`}>
                  {vergleichErgebnis.zeichen}
                </span>
                <BruchAnzeige zaehler={vergleich4.b2.zaehler} nenner={vergleich4.b2.nenner} />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                {fmtDez(vergleichErgebnis.b1Dezimal)} {vergleichErgebnis.zeichen} {fmtDez(vergleichErgebnis.b2Dezimal)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
