'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Gesucht = 'c' | 'a' | 'b';
type Einheit = 'mm' | 'cm' | 'm' | 'km';

export default function PythagorasRechner() {
  const [gesucht, setGesucht] = useState<Gesucht>('c');
  const [inputA, setInputA] = useState('3');
  const [inputB, setInputB] = useState('4');
  const [inputC, setInputC] = useState('5');
  const [einheit, setEinheit] = useState<Einheit>('cm');

  const ergebnis = useMemo(() => {
    const a0 = parseDeutscheZahl(inputA);
    const b0 = parseDeutscheZahl(inputB);
    const c0 = parseDeutscheZahl(inputC);

    let a = a0, b = b0, c = c0;
    let fehler: string | null = null;

    if (gesucht === 'c') {
      c = Math.sqrt(a * a + b * b);
    } else if (gesucht === 'a') {
      if (c <= b) fehler = 'Die Hypotenuse c muss länger sein als die Kathete b.';
      else a = Math.sqrt(c * c - b * b);
    } else {
      if (c <= a) fehler = 'Die Hypotenuse c muss länger sein als die Kathete a.';
      else b = Math.sqrt(c * c - a * a);
    }

    const flaeche = (a * b) / 2;
    const alpha = (Math.atan2(a, b) * 180) / Math.PI;
    const beta = 90 - alpha;
    const umfang = a + b + c;

    return { a, b, c, flaeche, alpha, beta, umfang, fehler };
  }, [gesucht, inputA, inputB, inputC]);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 4 });
  const fmt2 = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // SVG viewBox scale
  const maxSide = Math.max(ergebnis.a, ergebnis.b, 1);
  const scale = 220 / maxSide;
  const svgA = ergebnis.a * scale;
  const svgB = ergebnis.b * scale;

  const gesuchtLabel = gesucht === 'c' ? 'Hypotenuse c' : gesucht === 'a' ? 'Kathete a' : 'Kathete b';
  const gesuchtWert = gesucht === 'c' ? ergebnis.c : gesucht === 'a' ? ergebnis.a : ergebnis.b;

  return (
    <div>
      {/* Gesucht */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Welche Seite soll berechnet werden?</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { val: 'c' as Gesucht, label: 'Hypotenuse (c)' },
            { val: 'a' as Gesucht, label: 'Kathete (a)' },
            { val: 'b' as Gesucht, label: 'Kathete (b)' },
          ].map(opt => (
            <button
              key={opt.val}
              onClick={() => setGesucht(opt.val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                gesucht === opt.val
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {gesucht !== 'a' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kathete a</label>
            <NummerEingabe value={inputA} onChange={setInputA} placeholder="3" einheit={einheit} />
          </div>
        )}
        {gesucht !== 'b' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kathete b</label>
            <NummerEingabe value={inputB} onChange={setInputB} placeholder="4" einheit={einheit} />
          </div>
        )}
        {gesucht !== 'c' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hypotenuse c</label>
            <NummerEingabe value={inputC} onChange={setInputC} placeholder="5" einheit={einheit} />
          </div>
        )}
      </div>

      {/* Einheit */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Einheit</label>
        <div className="grid grid-cols-4 gap-2">
          {(['mm', 'cm', 'm', 'km'] as Einheit[]).map(e => (
            <button
              key={e}
              onClick={() => setEinheit(e)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                einheit === e
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Fehler */}
      {ergebnis.fehler ? (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-700 dark:text-red-300 text-sm font-semibold">⚠️ {ergebnis.fehler}</p>
        </div>
      ) : (
        <>
          {/* Ergebnis */}
          <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <p className="text-white/90 text-sm mb-1">{gesuchtLabel}</p>
            <p className="text-5xl font-bold">{fmt(gesuchtWert)} {einheit}</p>
            <p className="text-white/90 text-sm mt-2">
              Fläche: {fmt(ergebnis.flaeche)} {einheit}² · α ≈ {fmt2(ergebnis.alpha)}° · β ≈ {fmt2(ergebnis.beta)}°
            </p>
          </div>

          {/* Dreieck SVG */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6 flex justify-center">
            <svg viewBox="0 0 320 280" className="w-full max-w-md h-auto">
              {/* Dreieck */}
              <polygon
                points={`40,${40 + svgA} ${40 + svgB},${40 + svgA} 40,40`}
                fill="rgba(99,102,241,0.15)"
                stroke="#6366f1"
                strokeWidth="2"
              />
              {/* Rechter Winkel */}
              <rect x="40" y={40 + svgA - 14} width="14" height="14" fill="none" stroke="#6366f1" strokeWidth="1.5" />
              {/* Labels */}
              <text x={40 + svgB / 2} y={40 + svgA + 22} textAnchor="middle" className="fill-gray-700 dark:fill-gray-200" fontSize="14" fontWeight="600">
                b = {fmt(ergebnis.b)} {einheit}
              </text>
              <text x="22" y={40 + svgA / 2} textAnchor="middle" className="fill-gray-700 dark:fill-gray-200" fontSize="14" fontWeight="600" transform={`rotate(-90, 22, ${40 + svgA / 2})`}>
                a = {fmt(ergebnis.a)} {einheit}
              </text>
              <text x={40 + svgB / 2 + 10} y={40 + svgA / 2 - 8} textAnchor="middle" className="fill-primary-700 dark:fill-primary-300" fontSize="14" fontWeight="700">
                c = {fmt(ergebnis.c)} {einheit}
              </text>
              {/* Ecken */}
              <text x="30" y="32" className="fill-gray-500" fontSize="12">A</text>
              <text x={45 + svgB} y={45 + svgA} className="fill-gray-500" fontSize="12">B</text>
              <text x="30" y={50 + svgA}  className="fill-gray-500" fontSize="12">C</text>
            </svg>
          </div>

          {/* Rechenweg */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Rechenweg</h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>1.</strong> Satz des Pythagoras: <em>a² + b² = c²</em></p>
              {gesucht === 'c' && (
                <>
                  <p><strong>2.</strong> Nach c umstellen: <em>c = √(a² + b²)</em></p>
                  <p><strong>3.</strong> Einsetzen: c = √({fmt(ergebnis.a)}² + {fmt(ergebnis.b)}²)</p>
                  <p><strong>4.</strong> Quadrate: c = √({fmt(ergebnis.a * ergebnis.a)} + {fmt(ergebnis.b * ergebnis.b)})</p>
                  <p><strong>5.</strong> Summe: c = √{fmt(ergebnis.a * ergebnis.a + ergebnis.b * ergebnis.b)}</p>
                  <p><strong>6.</strong> Wurzel: <strong>c = {fmt(ergebnis.c)} {einheit}</strong></p>
                </>
              )}
              {gesucht === 'a' && (
                <>
                  <p><strong>2.</strong> Nach a umstellen: <em>a = √(c² − b²)</em></p>
                  <p><strong>3.</strong> Einsetzen: a = √({fmt(ergebnis.c)}² − {fmt(ergebnis.b)}²)</p>
                  <p><strong>4.</strong> Quadrate: a = √({fmt(ergebnis.c * ergebnis.c)} − {fmt(ergebnis.b * ergebnis.b)})</p>
                  <p><strong>5.</strong> Differenz: a = √{fmt(ergebnis.c * ergebnis.c - ergebnis.b * ergebnis.b)}</p>
                  <p><strong>6.</strong> Wurzel: <strong>a = {fmt(ergebnis.a)} {einheit}</strong></p>
                </>
              )}
              {gesucht === 'b' && (
                <>
                  <p><strong>2.</strong> Nach b umstellen: <em>b = √(c² − a²)</em></p>
                  <p><strong>3.</strong> Einsetzen: b = √({fmt(ergebnis.c)}² − {fmt(ergebnis.a)}²)</p>
                  <p><strong>4.</strong> Quadrate: b = √({fmt(ergebnis.c * ergebnis.c)} − {fmt(ergebnis.a * ergebnis.a)})</p>
                  <p><strong>5.</strong> Differenz: b = √{fmt(ergebnis.c * ergebnis.c - ergebnis.a * ergebnis.a)}</p>
                  <p><strong>6.</strong> Wurzel: <strong>b = {fmt(ergebnis.b)} {einheit}</strong></p>
                </>
              )}
            </div>
          </div>

          {/* Kennwerte */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Kennwerte</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="text-gray-600 dark:text-gray-400">
                  <td className="py-2">Fläche</td>
                  <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt(ergebnis.flaeche)} {einheit}²</td>
                </tr>
                <tr className="text-gray-600 dark:text-gray-400">
                  <td className="py-2">Umfang</td>
                  <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt(ergebnis.umfang)} {einheit}</td>
                </tr>
                <tr className="text-gray-600 dark:text-gray-400">
                  <td className="py-2">Winkel α (bei B)</td>
                  <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt2(ergebnis.alpha)}°</td>
                </tr>
                <tr className="text-gray-600 dark:text-gray-400">
                  <td className="py-2">Winkel β (bei A)</td>
                  <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt2(ergebnis.beta)}°</td>
                </tr>
                <tr className="text-gray-600 dark:text-gray-400">
                  <td className="py-2">Winkel γ (rechter Winkel)</td>
                  <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">90,00°</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      <CrossLink href="/mathe/flaechenrechner" emoji="📐" text="Flächenrechner: Rechteck, Dreieck, Kreis und mehr" />
      <CrossLink href="/mathe/volumenrechner" emoji="🧊" text="Volumenrechner: Würfel, Zylinder, Kugel" />
      <CrossLink href="/mathe/einheiten-umrechner" emoji="📏" text="Einheiten-Umrechner: Länge, Fläche, Volumen" />

      <ErgebnisAktionen
        ergebnisText={
          ergebnis.fehler
            ? `Pythagoras: ${ergebnis.fehler}`
            : `Pythagoras: ${gesuchtLabel} = ${fmt(gesuchtWert)} ${einheit} (a=${fmt(ergebnis.a)}, b=${fmt(ergebnis.b)}, c=${fmt(ergebnis.c)})`
        }
        seitenTitel="Pythagoras-Rechner"
      />

      <AiExplain
        rechnerName="Pythagoras-Rechner"
        eingaben={{
          gesucht: gesuchtLabel,
          katheteA: fmt(ergebnis.a),
          katheteB: fmt(ergebnis.b),
          hypotenuseC: fmt(ergebnis.c),
          einheit,
        }}
        ergebnis={{
          gesuchteSeite: `${fmt(gesuchtWert)} ${einheit}`,
          flaeche: `${fmt(ergebnis.flaeche)} ${einheit}²`,
          umfang: `${fmt(ergebnis.umfang)} ${einheit}`,
          alphaGrad: fmt2(ergebnis.alpha),
          betaGrad: fmt2(ergebnis.beta),
        }}
      />
    </div>
  );
}
