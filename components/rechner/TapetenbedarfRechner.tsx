'use client';

import { useState, useMemo } from 'react';
import { berechneTapetenbedarf } from '@/lib/berechnungen/tapetenbedarf';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';

type Eingabemodus = 'schnell' | 'detail';

export default function TapetenbedarfRechner() {
  const [modus, setModus] = useState<Eingabemodus>('schnell');

  // Schnelleingabe
  const [raumLaenge, setRaumLaenge] = useState('5');
  const [raumBreite, setRaumBreite] = useState('4');
  const [raumHoehe, setRaumHoehe] = useState('2,50');

  // Detaileingabe (4 Wände)
  const [w1b, setW1b] = useState('5');
  const [w1h, setW1h] = useState('2,50');
  const [w2b, setW2b] = useState('4');
  const [w2h, setW2h] = useState('2,50');
  const [w3b, setW3b] = useState('5');
  const [w3h, setW3h] = useState('2,50');
  const [w4b, setW4b] = useState('4');
  const [w4h, setW4h] = useState('2,50');

  // Abzüge
  const [fenster, setFenster] = useState('1');
  const [fensterB, setFensterB] = useState('1,2');
  const [fensterH, setFensterH] = useState('1,4');
  const [tueren, setTueren] = useState('1');
  const [tuerB, setTuerB] = useState('0,9');
  const [tuerH, setTuerH] = useState('2,1');

  // Tapete
  const [rollenBreite, setRollenBreite] = useState('0,53');
  const [rollenLaenge, setRollenLaenge] = useState('10,05');
  const [rapport, setRapport] = useState('0');
  const [verschnitt, setVerschnitt] = useState('10');
  const [preisProRolle, setPreisProRolle] = useState('0');

  const waende = useMemo(() => {
    if (modus === 'schnell') {
      const l = parseDeutscheZahl(raumLaenge);
      const b = parseDeutscheZahl(raumBreite);
      const h = parseDeutscheZahl(raumHoehe);
      return [
        { breite: l, hoehe: h },
        { breite: b, hoehe: h },
        { breite: l, hoehe: h },
        { breite: b, hoehe: h },
      ];
    }
    return [
      { breite: parseDeutscheZahl(w1b), hoehe: parseDeutscheZahl(w1h) },
      { breite: parseDeutscheZahl(w2b), hoehe: parseDeutscheZahl(w2h) },
      { breite: parseDeutscheZahl(w3b), hoehe: parseDeutscheZahl(w3h) },
      { breite: parseDeutscheZahl(w4b), hoehe: parseDeutscheZahl(w4h) },
    ];
  }, [modus, raumLaenge, raumBreite, raumHoehe, w1b, w1h, w2b, w2h, w3b, w3h, w4b, w4h]);

  const ergebnis = useMemo(
    () => berechneTapetenbedarf({
      waende,
      fensterAnzahl: parseDeutscheZahl(fenster),
      fensterBreite: parseDeutscheZahl(fensterB),
      fensterHoehe: parseDeutscheZahl(fensterH),
      tuerenAnzahl: parseDeutscheZahl(tueren),
      tuerBreite: parseDeutscheZahl(tuerB),
      tuerHoehe: parseDeutscheZahl(tuerH),
      rollenBreite: parseDeutscheZahl(rollenBreite),
      rollenLaenge: parseDeutscheZahl(rollenLaenge),
      rapport: parseDeutscheZahl(rapport),
      verschnitt: parseDeutscheZahl(verschnitt),
      preisProRolle: parseDeutscheZahl(preisProRolle),
    }),
    [waende, fenster, fensterB, fensterH, tueren, tuerB, tuerH, rollenBreite, rollenLaenge, rapport, verschnitt, preisProRolle]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Modus */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Raumeingabe</label>
        <div className="flex gap-2">
          <button
            onClick={() => setModus('schnell')}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              modus === 'schnell'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Schnelleingabe
          </button>
          <button
            onClick={() => setModus('detail')}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              modus === 'detail'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            4 Wände einzeln
          </button>
        </div>
      </div>

      {/* Raum */}
      {modus === 'schnell' ? (
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Raumlänge</label>
            <NummerEingabe value={raumLaenge} onChange={setRaumLaenge} placeholder="5" einheit="m" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Raumbreite</label>
            <NummerEingabe value={raumBreite} onChange={setRaumBreite} placeholder="4" einheit="m" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Raumhöhe</label>
            <NummerEingabe value={raumHoehe} onChange={setRaumHoehe} placeholder="2,50" einheit="m" />
          </div>
        </div>
      ) : (
        <div className="space-y-2 mb-5">
          {[
            { label: 'Wand 1', b: w1b, setB: setW1b, h: w1h, setH: setW1h },
            { label: 'Wand 2', b: w2b, setB: setW2b, h: w2h, setH: setW2h },
            { label: 'Wand 3', b: w3b, setB: setW3b, h: w3h, setH: setW3h },
            { label: 'Wand 4', b: w4b, setB: setW4b, h: w4h, setH: setW4h },
          ].map(w => (
            <div key={w.label} className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-16 shrink-0">{w.label}</span>
              <div className="flex-1">
                <NummerEingabe value={w.b} onChange={w.setB} placeholder="Breite" einheit="m" />
              </div>
              <span className="text-gray-400">×</span>
              <div className="flex-1">
                <NummerEingabe value={w.h} onChange={w.setH} placeholder="Höhe" einheit="m" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Abzüge */}
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Abzüge</p>
      <div className="grid grid-cols-2 gap-3 mb-2">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Fenster (Anzahl)</label>
          <NummerEingabe value={fenster} onChange={setFenster} placeholder="1" einheit="Stk" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Türen (Anzahl)</label>
          <NummerEingabe value={tueren} onChange={setTueren} placeholder="1" einheit="Stk" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-5">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Fenster B</label>
          <NummerEingabe value={fensterB} onChange={setFensterB} placeholder="1,2" einheit="m" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Fenster H</label>
          <NummerEingabe value={fensterH} onChange={setFensterH} placeholder="1,4" einheit="m" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Tür B</label>
          <NummerEingabe value={tuerB} onChange={setTuerB} placeholder="0,9" einheit="m" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Tür H</label>
          <NummerEingabe value={tuerH} onChange={setTuerH} placeholder="2,1" einheit="m" />
        </div>
      </div>

      {/* Tapete */}
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tapete</p>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Rollenbreite</label>
          <div className="flex gap-1.5">
            {['0,53', '1,06'].map(v => (
              <button
                key={v}
                onClick={() => setRollenBreite(v)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                  rollenBreite === v
                    ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 ring-1 ring-primary-300 dark:ring-primary-500/40'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {v} m
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Rollenlänge</label>
          <div className="flex gap-1.5">
            {['10,05', '25'].map(v => (
              <button
                key={v}
                onClick={() => setRollenLaenge(v)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                  rollenLaenge === v
                    ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 ring-1 ring-primary-300 dark:ring-primary-500/40'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {v} m
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Rapport</label>
          <NummerEingabe value={rapport} onChange={setRapport} placeholder="0" einheit="cm" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Verschnitt</label>
          <NummerEingabe value={verschnitt} onChange={setVerschnitt} placeholder="10" einheit="%" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Preis/Rolle</label>
          <NummerEingabe value={preisProRolle} onChange={setPreisProRolle} placeholder="0" einheit="€" />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4">
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Benötigte Tapetenrollen</p>
            <p className="text-5xl font-extrabold text-primary-700 dark:text-primary-300">
              {ergebnis.rollenBenoetigt}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Rollen ({parseDeutscheZahl(rollenBreite).toLocaleString('de-DE')} m × {parseDeutscheZahl(rollenLaenge).toLocaleString('de-DE')} m)
            </p>
          </div>

          {/* Detail-Kacheln */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tapezierfläche</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.tapezierFlaeche)} m²</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bahnen</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{ergebnis.bahnenBenoetigt}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Verschnitt</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.verschnittFlaeche)} m²</p>
            </div>
          </div>

          {/* Kosten */}
          {ergebnis.kosten !== null && (
            <div className="bg-accent-50 dark:bg-accent-500/10 border border-accent-200 dark:border-accent-500/30 rounded-xl p-4 flex justify-between items-center">
              <span className="text-sm font-medium text-accent-700 dark:text-accent-400">Geschätzte Kosten</span>
              <span className="text-xl font-bold text-accent-700 dark:text-accent-400">
                {fmt(ergebnis.kosten)} €
              </span>
            </div>
          )}

          {/* Aufschlüsselung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Gesamtwandfläche</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamtWandflaeche)} m²</span>
              </div>
              {ergebnis.fensterFlaeche > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Fenster ({parseDeutscheZahl(fenster)}×)</span>
                  <span className="font-medium text-red-500 dark:text-red-400">−{fmt(ergebnis.fensterFlaeche)} m²</span>
                </div>
              )}
              {ergebnis.tuerFlaeche > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Türen ({parseDeutscheZahl(tueren)}×)</span>
                  <span className="font-medium text-red-500 dark:text-red-400">−{fmt(ergebnis.tuerFlaeche)} m²</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3 text-sm font-semibold">
                <span className="text-gray-700 dark:text-gray-200">Zu tapezierende Fläche</span>
                <span className="text-gray-800 dark:text-gray-100">{fmt(ergebnis.tapezierFlaeche)} m²</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Bahnen pro Rolle</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.bahnenProRolle}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Bahnen benötigt</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.bahnenBenoetigt}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Verschnitt</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.verschnittProzent.toLocaleString('de-DE')} %</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Rollen benötigt</span>
                <span className="text-primary-600 dark:text-primary-400">{ergebnis.rollenBenoetigt} Rollen</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
