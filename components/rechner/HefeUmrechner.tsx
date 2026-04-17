'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type HefeTyp = 'frisch' | 'trocken' | 'lievito' | 'sauerteig';

const HEFE_LABEL: Record<HefeTyp, string> = {
  frisch:    'Frischhefe (Würfel)',
  trocken:   'Trockenhefe (Päckchen)',
  lievito:   'Lievito Madre',
  sauerteig: 'Sauerteig',
};

const fmt = (n: number, d = 1): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: d });

// Umrechnung: alles relativ zur Frischhefe-Menge in Gramm
function toFrisch(menge: number, typ: HefeTyp): number {
  switch (typ) {
    case 'frisch':    return menge;
    case 'trocken':   return menge * 3;          // 1 g Trocken = 3 g Frisch
    case 'lievito':   return menge / 6;          // 1 g Lievito Madre ≈ 1/6 g Frisch (Faktor 5–7, Mittelwert 6)
    case 'sauerteig': return menge / 10;         // grobe Näherung
  }
}

function fromFrisch(frischMenge: number, typ: HefeTyp): number {
  switch (typ) {
    case 'frisch':    return frischMenge;
    case 'trocken':   return frischMenge / 3;
    case 'lievito':   return frischMenge * 6;
    case 'sauerteig': return frischMenge * 10;
  }
}

export default function HefeUmrechner() {
  const [menge, setMenge] = useState('42');
  const [quellTyp, setQuellTyp] = useState<HefeTyp>('frisch');
  const [zielTyp, setZielTyp] = useState<HefeTyp>('trocken');

  const ergebnis = useMemo(() => {
    const m = parseDeutscheZahl(menge);
    const frischAequivalent = toFrisch(m, quellTyp);
    const zielMenge = fromFrisch(frischAequivalent, zielTyp);

    // Für Mehlmenge-Referenz: 21 g Frisch = 500 g Mehl (Standard)
    const mehlMenge = frischAequivalent * (500 / 21);

    // Päckchen-Angabe bei Trockenhefe
    const paeckchen = zielTyp === 'trocken' ? zielMenge / 7 : 0;
    const wuerfel = zielTyp === 'frisch' ? zielMenge / 42 : 0;

    return { zielMenge, frischAequivalent, mehlMenge, paeckchen, wuerfel };
  }, [menge, quellTyp, zielTyp]);

  // Referenztabelle: gängige Mehlmengen und passende Hefemengen
  const mehlmengen = [250, 500, 750, 1000];

  const sauerteigWarnung = quellTyp === 'sauerteig' || zielTyp === 'sauerteig';

  return (
    <div>
      {/* === 1: Menge === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Menge
        </h2>
        <NummerEingabe value={menge} onChange={setMenge} placeholder="42" einheit="g" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Tipp: 1 Würfel Frischhefe = 42 g. 1 Päckchen Trockenhefe = 7 g.
        </p>
      </div>

      {/* === 2: Quelltyp === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Ihre Hefe (Quelle)
        </h2>
        <label htmlFor="hefe-quell" className="sr-only">Quelltyp</label>
        <select
          id="hefe-quell"
          value={quellTyp}
          onChange={e => setQuellTyp(e.target.value as HefeTyp)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          <option value="frisch">🧊 Frischhefe (Würfel)</option>
          <option value="trocken">🌾 Trockenhefe (Päckchen)</option>
          <option value="lievito">🍕 Lievito Madre</option>
          <option value="sauerteig">🍞 Sauerteig</option>
        </select>
      </div>

      {/* === 3: Zieltyp === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Gesuchte Hefe (Ziel)
        </h2>
        <label htmlFor="hefe-ziel" className="sr-only">Zieltyp</label>
        <select
          id="hefe-ziel"
          value={zielTyp}
          onChange={e => setZielTyp(e.target.value as HefeTyp)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          <option value="frisch">🧊 Frischhefe (Würfel)</option>
          <option value="trocken">🌾 Trockenhefe (Päckchen)</option>
          <option value="lievito">🍕 Lievito Madre</option>
        </select>
      </div>

      {/* Sauerteig-Warnung */}
      {sauerteigWarnung && (
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
          <p className="text-amber-800 dark:text-amber-300 text-sm">
            <strong>⚠️ Sauerteig:</strong> Sauerteig lässt sich nicht direkt in Hefe umrechnen. Sauerteig nutzt wilde Mikroorganismen (Hefen + Milchsäurebakterien) und entwickelt Säure, die dem Brot Charakter gibt — das können Sie mit Hefe nicht reproduzieren. Die angegebene Umrechnung ist eine grobe Näherung zur Triebkraft, nicht zum Geschmack.
          </p>
        </div>
      )}

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6 text-center">
        <p className="text-white/80 text-sm mb-1">
          {fmt(parseDeutscheZahl(menge))} g {HEFE_LABEL[quellTyp]} entspricht
        </p>
        <p className="text-5xl font-bold">{fmt(ergebnis.zielMenge)} g {HEFE_LABEL[zielTyp]}</p>
        {ergebnis.paeckchen > 0 && (
          <p className="text-white/90 text-sm mt-2">
            = {fmt(ergebnis.paeckchen, 1)} Päckchen (à 7 g)
          </p>
        )}
        {ergebnis.wuerfel > 0 && (
          <p className="text-white/90 text-sm mt-2">
            = {fmt(ergebnis.wuerfel, 2)} Würfel (à 42 g)
          </p>
        )}
        <p className="text-white/80 text-xs mt-3">
          Reicht für ca. {fmt(ergebnis.mehlMenge, 0)} g Mehl
        </p>
      </div>

      {/* Umrechnungsformel */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Umrechnungsformeln</h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• <strong>Frischhefe → Trockenhefe:</strong> ÷ 3 (42 g Frisch = 14 g Trocken = 2 Päckchen)</li>
          <li>• <strong>Trockenhefe → Frischhefe:</strong> × 3 (7 g Trocken = 21 g Frisch = ½ Würfel)</li>
          <li>• <strong>Frischhefe → Lievito Madre:</strong> × 5–7 (42 g Frisch ≈ 200–300 g Lievito Madre)</li>
          <li>• <strong>Lievito Madre → Frischhefe:</strong> ÷ 5–7</li>
          <li>• <strong>1 Würfel Frischhefe (42 g):</strong> reicht für 500–1.000 g Mehl</li>
        </ul>
      </div>

      {/* Mehlmengen-Tabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Hefe-Mengen für gängige Mehlmengen</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Mehlmenge</th>
                <th className="px-4 py-2 text-right font-semibold">Frischhefe</th>
                <th className="px-4 py-2 text-right font-semibold">Trockenhefe</th>
                <th className="px-4 py-2 text-right font-semibold">Päckchen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mehlmengen.map(mehl => {
                const frisch = mehl * (21 / 500); // 21 g Frisch pro 500 g Mehl
                const trocken = frisch / 3;
                const paeck = trocken / 7;
                return (
                  <tr key={mehl}>
                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{mehl} g Mehl</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmt(frisch)} g ({fmt(frisch / 42, 2)} Würfel)</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmt(trocken)} g</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmt(paeck, 1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verarbeitungstipps */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Verarbeitung</h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• <strong>Frischhefe:</strong> In lauwarmem Wasser/Milch (max. 35 °C) auflösen, etwas Zucker zufüttern, 5–10 Min ruhen. Schaumig = aktiv.</li>
          <li>• <strong>Trockenhefe:</strong> Direkt ins Mehl mischen, dann Flüssigkeit dazu. Kein Auflösen nötig (bei Instanthefe).</li>
          <li>• <strong>Lievito Madre:</strong> Direkt in den Teig, eventuell mit etwas Wasser lösen.</li>
          <li>• <strong>Achtung:</strong> Hefe niemals direkt mit Salz in Kontakt bringen — Salz tötet die Hefe. Erst Hefe mit Mehl mischen, Salz später dazu.</li>
        </ul>
      </div>

      {/* Tipp lange Gehzeit */}
      <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-4 mb-6">
        <p className="text-indigo-800 dark:text-indigo-300 text-sm">
          <strong>💡 Weniger Hefe = mehr Aroma:</strong> Für beste Ergebnisse weniger Hefe nehmen und länger gehen lassen. Für neapolitanische Pizza reichen 1–2 g Frischhefe pro 500 g Mehl bei 24 h Gehzeit (im Kühlschrank). Das Aroma wird deutlich komplexer.
        </p>
      </div>

      <CrossLink href="/kochen/rezept-umrechner" emoji="📝" text="Rezept auf Portionen umrechnen" />
      <CrossLink href="/kochen/backzeit-rechner" emoji="⏲️" text="Backzeit anpassen" />
      <CrossLink href="/kochen/cups-umrechner" emoji="🥣" text="Cups in Gramm umrechnen" />

      <ErgebnisAktionen
        ergebnisText={`Hefe-Umrechner: ${fmt(parseDeutscheZahl(menge))} g ${HEFE_LABEL[quellTyp]} = ${fmt(ergebnis.zielMenge)} g ${HEFE_LABEL[zielTyp]}${ergebnis.paeckchen > 0 ? ` (${fmt(ergebnis.paeckchen, 1)} Päckchen)` : ''} | Reicht für ca. ${fmt(ergebnis.mehlMenge, 0)} g Mehl`}
        seitenTitel="Hefe-Umrechner"
      />

      <AiExplain
        rechnerName="Hefe-Umrechner"
        eingaben={{
          menge: `${menge} g`,
          quelltyp: HEFE_LABEL[quellTyp],
          zieltyp: HEFE_LABEL[zielTyp],
        }}
        ergebnis={{
          zielmenge: `${fmt(ergebnis.zielMenge)} g ${HEFE_LABEL[zielTyp]}`,
          paeckchen: ergebnis.paeckchen > 0 ? `${fmt(ergebnis.paeckchen, 1)} Päckchen` : '—',
          wuerfel: ergebnis.wuerfel > 0 ? `${fmt(ergebnis.wuerfel, 2)} Würfel` : '—',
          mehlmenge: `${fmt(ergebnis.mehlMenge, 0)} g Mehl`,
        }}
      />
    </div>
  );
}
