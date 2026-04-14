'use client';

import { useState, useMemo } from 'react';
import {
  berechneBrueche,
  kuerzeBruch,
  dezimalZuBruch,
  bruchZuDezimal,
  vergleicheBrueche,
  gemischtZuBruch,
  zuGemischt,
  kuerzen,
  type Operation,
  type Bruch,
} from '@/lib/berechnungen/bruchrechnung';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

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
  const rechenErgebnis = useMemo(() => {
    const zaehler1 = Math.round(parseDeutscheZahl(z1));
    const nenner1 = Math.round(parseDeutscheZahl(n1));
    const ganz1 = g1.trim() ? Math.round(parseDeutscheZahl(g1)) : 0;
    const zaehler2 = Math.round(parseDeutscheZahl(z2));
    const nenner2 = Math.round(parseDeutscheZahl(n2));
    const ganz2 = g2.trim() ? Math.round(parseDeutscheZahl(g2)) : 0;

    if (nenner1 === 0 || nenner2 === 0) return null;

    const b1: Bruch = ganz1 !== 0
      ? gemischtZuBruch(ganz1, zaehler1, nenner1)
      : { zaehler: zaehler1, nenner: nenner1 };
    const b2: Bruch = ganz2 !== 0
      ? gemischtZuBruch(ganz2, zaehler2, nenner2)
      : { zaehler: zaehler2, nenner: nenner2 };

    return berechneBrueche(b1, op, b2);
  }, [z1, n1, g1, op, z2, n2, g2]);

  // Ergebnis Tab 2
  const kuerzenErgebnis = useMemo(() => {
    const z = Math.round(parseDeutscheZahl(kz));
    const n = Math.round(parseDeutscheZahl(kn));
    if (n === 0) return null;
    return kuerzeBruch({ zaehler: z, nenner: n });
  }, [kz, kn]);

  // Ergebnis Tab 3
  const dezimalErgebnis = useMemo(() => {
    if (dezMode === 'zuBruch') {
      const wert = parseDeutscheZahl(dezWert);
      if (isNaN(wert)) return null;
      const bruch = dezimalZuBruch(wert);
      if (!bruch) return null;
      return { bruch, dezimal: wert, gemischt: zuGemischt(bruch) };
    } else {
      const z = Math.round(parseDeutscheZahl(dz));
      const n = Math.round(parseDeutscheZahl(dn));
      if (n === 0) return null;
      const b = kuerzen({ zaehler: z, nenner: n });
      const d = bruchZuDezimal(b);
      if (d === null) return null;
      return { bruch: b, dezimal: Math.round(d * 1000000) / 1000000, gemischt: zuGemischt(b) };
    }
  }, [dezMode, dezWert, dz, dn]);

  // Ergebnis Tab 4
  const vergleichErgebnis = useMemo(() => {
    const z1v = Math.round(parseDeutscheZahl(vz1));
    const n1v = Math.round(parseDeutscheZahl(vn1));
    const z2v = Math.round(parseDeutscheZahl(vz2));
    const n2v = Math.round(parseDeutscheZahl(vn2));
    if (n1v === 0 || n2v === 0) return null;
    return vergleicheBrueche({ zaehler: z1v, nenner: n1v }, { zaehler: z2v, nenner: n2v });
  }, [vz1, vn1, vz2, vn2]);

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
            <BruchEingabe zaehler={z1} setZaehler={setZ1} nenner={n1} setNenner={setN1} ganz={g1} setGanz={setG1} label="Bruch 1" />

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

            <BruchEingabe zaehler={z2} setZaehler={setZ2} nenner={n2} setNenner={setN2} ganz={g2} setGanz={setG2} label="Bruch 2" />
          </div>

          {rechenErgebnis && (
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
                ergebnisText={`${rechenErgebnis.schritte.eingabe} = ${rechenErgebnis.ergebnis.zaehler}/${rechenErgebnis.ergebnis.nenner} (${fmtDez(rechenErgebnis.dezimal)})`}
                seitenTitel="Bruchrechner"
              />

              <AiExplain
                rechnerName="Bruchrechner"
                eingaben={{ bruch1Zaehler: Math.round(parseDeutscheZahl(z1)), bruch1Nenner: Math.round(parseDeutscheZahl(n1)), operation: op, bruch2Zaehler: Math.round(parseDeutscheZahl(z2)), bruch2Nenner: Math.round(parseDeutscheZahl(n2)) }}
                ergebnis={{ ergebnisZaehler: rechenErgebnis.ergebnis.zaehler, ergebnisNenner: rechenErgebnis.ergebnis.nenner, dezimal: rechenErgebnis.dezimal }}
              />

              {/* Rechenweg */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Rechenweg</p>
                </div>
                <div className="px-4 py-3 space-y-2 text-sm">
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
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setDezMode('zuBruch')}
              className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                dezMode === 'zuBruch'
                  ? 'bg-accent-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              Dezimal → Bruch
            </button>
            <button
              onClick={() => setDezMode('zuDezimal')}
              className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                dezMode === 'zuDezimal'
                  ? 'bg-accent-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              Bruch → Dezimal
            </button>
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
            <div className="pb-4 text-2xl font-bold text-gray-400">?</div>
            <BruchEingabe zaehler={vz2} setZaehler={setVz2} nenner={vn2} setNenner={setVn2} label="Bruch 2" />
          </div>

          {vergleichErgebnis && (
            <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-4 text-3xl font-extrabold text-primary-700 dark:text-primary-300">
                <BruchAnzeige zaehler={Math.round(parseDeutscheZahl(vz1))} nenner={Math.round(parseDeutscheZahl(vn1))} />
                <span className={`text-4xl ${
                  vergleichErgebnis.zeichen === '='
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-accent-600 dark:text-accent-400'
                }`}>
                  {vergleichErgebnis.zeichen}
                </span>
                <BruchAnzeige zaehler={Math.round(parseDeutscheZahl(vz2))} nenner={Math.round(parseDeutscheZahl(vn2))} />
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
