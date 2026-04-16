'use client';

import { useState, useCallback } from 'react';
import {
  generiereZufallszahlen,
  wuerfeln,
  muenzwurf,
  losziehung,
  generierePasswort,
  type ZufallszahlErgebnis,
  type WuerfelErgebnis,
  type MuenzwurfErgebnis,
  type LosziehungErgebnis,
  type PasswortErgebnis,
} from '@/lib/berechnungen/zufallszahl';
import NummerEingabe from '@/components/ui/NummerEingabe';
import TabGroup from '@/components/ui/TabGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const TABS = [
  { id: 'zufallszahl', label: 'Zufallszahl' },
  { id: 'wuerfel', label: 'Würfel 🎲' },
  { id: 'muenzwurf', label: 'Münzwurf' },
  { id: 'losziehung', label: 'Losziehung' },
  { id: 'passwort', label: 'Passwort' },
];

const SEITENOPTIONEN = [
  { value: '4', label: 'W4 (Tetraeder)' },
  { value: '6', label: 'W6 (Standard)' },
  { value: '8', label: 'W8 (Oktaeder)' },
  { value: '10', label: 'W10 (Dekaeder)' },
  { value: '12', label: 'W12 (Dodekaeder)' },
  { value: '20', label: 'W20 (Ikosaeder)' },
];

const fmt = (n: number) => n.toLocaleString('de-DE');

export default function ZufallszahlRechner() {
  const [tab, setTab] = useState('zufallszahl');

  // Zufallszahl
  const [zMin, setZMin] = useState('1');
  const [zMax, setZMax] = useState('100');
  const [zAnzahl, setZAnzahl] = useState('1');
  const [zErgebnis, setZErgebnis] = useState<ZufallszahlErgebnis | null>(null);

  // Würfel
  const [wAnzahl, setWAnzahl] = useState('2');
  const [wSeiten, setWSeiten] = useState('6');
  const [wErgebnis, setWErgebnis] = useState<WuerfelErgebnis | null>(null);

  // Münzwurf
  const [mAnzahl, setMAnzahl] = useState('1');
  const [mErgebnis, setMErgebnis] = useState<MuenzwurfErgebnis | null>(null);

  // Losziehung
  const [lAus, setLAus] = useState('49');
  const [lAnzahl, setLAnzahl] = useState('6');
  const [lErgebnis, setLErgebnis] = useState<LosziehungErgebnis | null>(null);

  // Passwort
  const [pLaenge, setPLaenge] = useState('16');
  const [pGross, setPGross] = useState(true);
  const [pKlein, setPKlein] = useState(true);
  const [pZahlen, setPZahlen] = useState(true);
  const [pSonder, setPSonder] = useState(true);
  const [pErgebnis, setPErgebnis] = useState<PasswortErgebnis | null>(null);

  const genZufallszahl = useCallback(() => {
    const min = parseInt(zMin) || 1;
    const max = parseInt(zMax) || 100;
    const anz = parseInt(zAnzahl) || 1;
    if (min > max) return;
    setZErgebnis(generiereZufallszahlen(min, max, anz));
  }, [zMin, zMax, zAnzahl]);

  const genWuerfel = useCallback(() => {
    const anz = parseInt(wAnzahl) || 2;
    const s = parseInt(wSeiten) || 6;
    setWErgebnis(wuerfeln(anz, s));
  }, [wAnzahl, wSeiten]);

  const genMuenzwurf = useCallback(() => {
    const anz = parseInt(mAnzahl) || 1;
    setMErgebnis(muenzwurf(anz));
  }, [mAnzahl]);

  const genLosziehung = useCallback(() => {
    const aus = parseInt(lAus) || 49;
    const anz = parseInt(lAnzahl) || 6;
    if (anz > aus) return;
    setLErgebnis(losziehung(aus, anz));
  }, [lAus, lAnzahl]);

  const genPasswort = useCallback(() => {
    const len = parseInt(pLaenge) || 16;
    setPErgebnis(generierePasswort(len, { gross: pGross, klein: pKlein, zahlen: pZahlen, sonder: pSonder }));
  }, [pLaenge, pGross, pKlein, pZahlen, pSonder]);

  const hatErgebnis = (tab === 'zufallszahl' && zErgebnis) ||
    (tab === 'wuerfel' && wErgebnis) ||
    (tab === 'muenzwurf' && mErgebnis) ||
    (tab === 'losziehung' && lErgebnis) ||
    (tab === 'passwort' && pErgebnis);

  const ergebnisText = (() => {
    if (tab === 'zufallszahl' && zErgebnis) return `Zufallszahl(en): ${zErgebnis.zahlen.join(', ')}`;
    if (tab === 'wuerfel' && wErgebnis) return `Würfel: ${wErgebnis.wuerfe.join(', ')} (Summe: ${wErgebnis.summe})`;
    if (tab === 'muenzwurf' && mErgebnis) return `Münzwurf: ${mErgebnis.wuerfe.join(', ')} (${mErgebnis.anzahlKopf}× Kopf, ${mErgebnis.anzahlZahl}× Zahl)`;
    if (tab === 'losziehung' && lErgebnis) return `Losziehung ${lErgebnis.anzahl} aus ${lErgebnis.aus}: ${lErgebnis.gezogene.join(', ')}`;
    if (tab === 'passwort' && pErgebnis) return `Passwort (${pErgebnis.laenge} Zeichen): ${pErgebnis.passwort}`;
    return '';
  })();

  return (
    <div>
      <TabGroup tabs={TABS} activeId={tab} onChange={setTab} ariaLabel="Modus wählen">
        {/* Zufallszahl */}
        {tab === 'zufallszahl' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minimum</label>
                <NummerEingabe value={zMin} onChange={setZMin} placeholder="1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maximum</label>
                <NummerEingabe value={zMax} onChange={setZMax} placeholder="100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anzahl</label>
                <NummerEingabe value={zAnzahl} onChange={setZAnzahl} placeholder="1" />
              </div>
            </div>
            <button onClick={genZufallszahl} className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors">
              🎲 Generieren
            </button>
            {zErgebnis && (
              <>
                <div className="result-box text-center">
                  <p className="text-white/70 text-sm mb-2">
                    {zErgebnis.zahlen.length === 1 ? 'Zufallszahl' : `${zErgebnis.zahlen.length} Zufallszahlen`} ({fmt(zErgebnis.min)} – {fmt(zErgebnis.max)})
                  </p>
                  {zErgebnis.zahlen.length === 1 ? (
                    <p className="text-5xl font-bold">{fmt(zErgebnis.zahlen[0])}</p>
                  ) : (
                    <div className="flex flex-wrap justify-center gap-2">
                      {zErgebnis.zahlen.map((z, i) => (
                        <span key={i} className="inline-block bg-white/20 rounded-lg px-3 py-1 text-lg font-bold">{fmt(z)}</span>
                      ))}
                    </div>
                  )}
                </div>
                {zErgebnis.zahlen.length > 1 && (
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Statistik</p>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Kleinste</p>
                        <p className="font-bold text-gray-800 dark:text-gray-200">{fmt(zErgebnis.kleinste)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Durchschnitt</p>
                        <p className="font-bold text-gray-800 dark:text-gray-200">{zErgebnis.durchschnitt.toLocaleString('de-DE')}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Größte</p>
                        <p className="font-bold text-gray-800 dark:text-gray-200">{fmt(zErgebnis.groesste)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Würfel */}
        {tab === 'wuerfel' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anzahl Würfel (1–10)</label>
                <NummerEingabe value={wAnzahl} onChange={setWAnzahl} placeholder="2" />
              </div>
              <div>
                <label htmlFor="wuerfel-seiten" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Seitenanzahl</label>
                <select
                  id="wuerfel-seiten"
                  value={wSeiten}
                  onChange={e => setWSeiten(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
                >
                  {SEITENOPTIONEN.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={genWuerfel} className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors">
              🎲 Würfeln
            </button>
            {wErgebnis && (
              <>
                <div className="result-box text-center">
                  <p className="text-white/70 text-sm mb-3">{wErgebnis.anzahl}× W{wErgebnis.seiten}</p>
                  <div className="flex justify-center gap-3 flex-wrap">
                    {wErgebnis.wuerfe.map((w, i) => (
                      <div key={i} className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
                        {w}
                      </div>
                    ))}
                  </div>
                  {wErgebnis.anzahl > 1 && (
                    <p className="text-white/80 text-lg mt-3">Summe: <strong>{fmt(wErgebnis.summe)}</strong> · Ø {wErgebnis.durchschnitt.toLocaleString('de-DE')}</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Münzwurf */}
        {tab === 'muenzwurf' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anzahl Würfe (1–100)</label>
              <NummerEingabe value={mAnzahl} onChange={setMAnzahl} placeholder="1" />
            </div>
            <button onClick={genMuenzwurf} className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors">
              🪙 Werfen
            </button>
            {mErgebnis && (
              <>
                <div className="result-box text-center">
                  {mErgebnis.gesamt === 1 ? (
                    <p className="text-5xl font-bold">{mErgebnis.wuerfe[0] === 'Kopf' ? '👑 Kopf' : '🔢 Zahl'}</p>
                  ) : (
                    <>
                      <div className="flex flex-wrap justify-center gap-2 mb-3">
                        {mErgebnis.wuerfe.map((w, i) => (
                          <span key={i} className={`inline-block rounded-lg px-2 py-1 text-sm font-medium ${w === 'Kopf' ? 'bg-amber-400/30 text-amber-100' : 'bg-blue-400/30 text-blue-100'}`}>
                            {w === 'Kopf' ? '👑' : '🔢'} {w}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-white/70 text-sm">Kopf</p>
                          <p className="text-2xl font-bold">{mErgebnis.anzahlKopf}× <span className="text-white/60 text-base">({Math.round(mErgebnis.anzahlKopf / mErgebnis.gesamt * 100)} %)</span></p>
                        </div>
                        <div>
                          <p className="text-white/70 text-sm">Zahl</p>
                          <p className="text-2xl font-bold">{mErgebnis.anzahlZahl}× <span className="text-white/60 text-base">({Math.round(mErgebnis.anzahlZahl / mErgebnis.gesamt * 100)} %)</span></p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Losziehung */}
        {tab === 'losziehung' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zahlen ziehen</label>
                <NummerEingabe value={lAnzahl} onChange={setLAnzahl} placeholder="6" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">aus 1 bis …</label>
                <NummerEingabe value={lAus} onChange={setLAus} placeholder="49" />
              </div>
            </div>
            <button onClick={genLosziehung} className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors">
              🎰 Ziehen
            </button>
            {lErgebnis && (
              <div className="result-box text-center">
                <p className="text-white/70 text-sm mb-3">{lErgebnis.anzahl} aus {lErgebnis.aus}</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {lErgebnis.gezogene.map(z => (
                    <div key={z} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                      {z}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Passwort */}
        {tab === 'passwort' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Passwort-Länge (8–64)</label>
              <NummerEingabe value={pLaenge} onChange={setPLaenge} placeholder="16" />
            </div>
            <fieldset>
              <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Zeichenarten</legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Großbuchstaben (A–Z)', checked: pGross, onChange: setPGross },
                  { label: 'Kleinbuchstaben (a–z)', checked: pKlein, onChange: setPKlein },
                  { label: 'Zahlen (0–9)', checked: pZahlen, onChange: setPZahlen },
                  { label: 'Sonderzeichen (!@#…)', checked: pSonder, onChange: setPSonder },
                ].map(opt => (
                  <label key={opt.label} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={opt.checked}
                      onChange={e => opt.onChange(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <button onClick={genPasswort} className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors">
              🔑 Generieren
            </button>
            {pErgebnis && (
              <div className="result-box text-center">
                <p className="text-white/70 text-sm mb-2">Passwort ({pErgebnis.laenge} Zeichen)</p>
                <p className="text-lg sm:text-xl font-mono font-bold break-all select-all">{pErgebnis.passwort}</p>
                <p className="mt-2 text-sm">
                  Stärke:{' '}
                  <span className={
                    pErgebnis.staerke === 'sehr stark' ? 'text-green-300 font-semibold' :
                    pErgebnis.staerke === 'stark' ? 'text-green-400 font-semibold' :
                    pErgebnis.staerke === 'mittel' ? 'text-amber-300 font-semibold' :
                    'text-red-300 font-semibold'
                  }>
                    {pErgebnis.staerke.charAt(0).toUpperCase() + pErgebnis.staerke.slice(1)}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </TabGroup>

      {hatErgebnis && (
        <div className="mt-4">
          <CrossLink href="/mathe/durchschnitt-rechner" emoji="📊" text="Durchschnitt berechnen" />
          <CrossLink href="/alltag/prozentrechner" emoji="%" text="Wahrscheinlichkeit berechnen" />

          <ErgebnisAktionen ergebnisText={ergebnisText} seitenTitel="Zufallszahl-Generator" />

          <AiExplain
            rechnerName="Zufallszahl-Generator"
            eingaben={{
              modus: tab,
              ...(tab === 'zufallszahl' ? { min: parseInt(zMin), max: parseInt(zMax), anzahl: parseInt(zAnzahl) } : {}),
              ...(tab === 'wuerfel' ? { anzahl: parseInt(wAnzahl), seiten: parseInt(wSeiten) } : {}),
              ...(tab === 'muenzwurf' ? { anzahl: parseInt(mAnzahl) } : {}),
              ...(tab === 'losziehung' ? { aus: parseInt(lAus), ziehen: parseInt(lAnzahl) } : {}),
              ...(tab === 'passwort' ? { laenge: parseInt(pLaenge) } : {}),
            }}
            ergebnis={{
              ...(tab === 'zufallszahl' && zErgebnis ? { zahlen: zErgebnis.zahlen } : {}),
              ...(tab === 'wuerfel' && wErgebnis ? { wuerfe: wErgebnis.wuerfe, summe: wErgebnis.summe } : {}),
              ...(tab === 'muenzwurf' && mErgebnis ? { kopf: mErgebnis.anzahlKopf, zahl: mErgebnis.anzahlZahl } : {}),
              ...(tab === 'losziehung' && lErgebnis ? { gezogene: lErgebnis.gezogene } : {}),
              ...(tab === 'passwort' && pErgebnis ? { staerke: pErgebnis.staerke } : {}),
            }}
          />
        </div>
      )}
    </div>
  );
}
