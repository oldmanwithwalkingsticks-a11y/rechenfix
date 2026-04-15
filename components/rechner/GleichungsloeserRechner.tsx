'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Typ = 'linear' | 'quadratisch';

export default function GleichungsloeserRechner() {
  const [typ, setTyp] = useState<Typ>('linear');
  const [a, setA] = useState('2');
  const [b, setB] = useState('5');
  const [c, setC] = useState('11');
  const [qa, setQa] = useState('1');
  const [qb, setQb] = useState('-5');
  const [qc, setQc] = useState('6');

  const linErgebnis = useMemo(() => {
    const na = parseDeutscheZahl(a);
    const nb = parseDeutscheZahl(b);
    const nc = parseDeutscheZahl(c);
    if (na === 0) {
      return { na, nb, nc, x: null, fehler: 'Bei a = 0 ist die Gleichung nicht linear.' };
    }
    const x = (nc - nb) / na;
    return { na, nb, nc, x, fehler: null };
  }, [a, b, c]);

  const quadErgebnis = useMemo(() => {
    const na = parseDeutscheZahl(qa);
    const nb = parseDeutscheZahl(qb);
    const nc = parseDeutscheZahl(qc);
    if (na === 0) {
      return { na, nb, nc, D: 0, x1: null, x2: null, xs: 0, ys: 0, fehler: 'Bei a = 0 ist die Gleichung nicht quadratisch (setzen Sie oben auf „Linear").' };
    }
    const D = nb * nb - 4 * na * nc;
    const xs = -nb / (2 * na);
    const ys = nc - (nb * nb) / (4 * na);
    let x1: number | null = null;
    let x2: number | null = null;
    if (D > 0) {
      x1 = (-nb + Math.sqrt(D)) / (2 * na);
      x2 = (-nb - Math.sqrt(D)) / (2 * na);
    } else if (D === 0) {
      x1 = -nb / (2 * na);
    }
    return { na, nb, nc, D, x1, x2, xs, ys, fehler: null };
  }, [qa, qb, qc]);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 4 });
  const fmtSigned = (n: number) => (n >= 0 ? `+ ${fmt(n)}` : `− ${fmt(Math.abs(n))}`);

  // Parabel-SVG-Berechnung
  const svgParabel = useMemo(() => {
    if (typ !== 'quadratisch' || quadErgebnis.fehler) return null;
    const { na, nb, nc, xs, x1, x2, ys } = quadErgebnis;
    // Range: 4 units left/right of vertex, but cover nullstellen
    let xMin = xs - 5;
    let xMax = xs + 5;
    if (x1 !== null) { xMin = Math.min(xMin, x1 - 1); xMax = Math.max(xMax, x1 + 1); }
    if (x2 !== null) { xMin = Math.min(xMin, x2 - 1); xMax = Math.max(xMax, x2 + 1); }
    const points: { x: number; y: number }[] = [];
    const N = 80;
    for (let i = 0; i <= N; i++) {
      const x = xMin + (xMax - xMin) * (i / N);
      const y = na * x * x + nb * x + nc;
      points.push({ x, y });
    }
    const ys_arr = points.map(p => p.y);
    let yMin = Math.min(...ys_arr, 0);
    let yMax = Math.max(...ys_arr, 0);
    // Pad y range
    const pad = (yMax - yMin) * 0.1 || 1;
    yMin -= pad;
    yMax += pad;
    const W = 320;
    const H = 240;
    const px = (x: number) => ((x - xMin) / (xMax - xMin)) * W;
    const py = (y: number) => H - ((y - yMin) / (yMax - yMin)) * H;
    const path = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${px(p.x).toFixed(1)} ${py(p.y).toFixed(1)}`)
      .join(' ');
    return {
      path,
      W,
      H,
      xAxisY: py(0),
      yAxisX: px(0),
      xMin,
      xMax,
      yMin,
      yMax,
      px,
      py,
      xs,
      ys,
      x1,
      x2,
    };
  }, [typ, quadErgebnis]);

  return (
    <div>
      {/* Typ */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gleichungstyp</label>
        <div className="flex flex-col sm:flex-row gap-2">
          {[
            { val: 'linear' as Typ, label: 'Linear (ax + b = c)' },
            { val: 'quadratisch' as Typ, label: 'Quadratisch (ax² + bx + c = 0)' },
          ].map(opt => (
            <button
              key={opt.val}
              onClick={() => setTyp(opt.val)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                typ === opt.val
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {typ === 'linear' ? (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">a</label>
              <NummerEingabe value={a} onChange={setA} placeholder="2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">b</label>
              <NummerEingabe value={b} onChange={setB} placeholder="5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">c</label>
              <NummerEingabe value={c} onChange={setC} placeholder="11" />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6 text-center text-lg font-semibold text-gray-800 dark:text-gray-200 tabular-nums">
            {fmt(linErgebnis.na)}x {fmtSigned(linErgebnis.nb)} = {fmt(linErgebnis.nc)}
          </div>

          {linErgebnis.fehler ? (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-700 dark:text-red-300 text-sm font-semibold">⚠️ {linErgebnis.fehler}</p>
            </div>
          ) : (
            <>
              <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <p className="text-white/90 text-sm mb-1">Lösung</p>
                <p className="text-5xl font-bold">x = {fmt(linErgebnis.x!)}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
                <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Rechenweg</h3>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 tabular-nums">
                  <p><strong>1.</strong> {fmt(linErgebnis.na)}x {fmtSigned(linErgebnis.nb)} = {fmt(linErgebnis.nc)}</p>
                  <p><strong>2.</strong> {fmt(linErgebnis.na)}x = {fmt(linErgebnis.nc)} {fmtSigned(-linErgebnis.nb)} = {fmt(linErgebnis.nc - linErgebnis.nb)} <span className="text-gray-500"> | {linErgebnis.nb >= 0 ? '−' : '+'} {fmt(Math.abs(linErgebnis.nb))}</span></p>
                  <p><strong>3.</strong> x = {fmt(linErgebnis.nc - linErgebnis.nb)} / {fmt(linErgebnis.na)} <span className="text-gray-500"> | ÷ {fmt(linErgebnis.na)}</span></p>
                  <p><strong>4.</strong> <strong>x = {fmt(linErgebnis.x!)}</strong></p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
                <p className="text-blue-800 dark:text-blue-300 text-sm">
                  <strong>Probe:</strong> {fmt(linErgebnis.na)} × {fmt(linErgebnis.x!)} {fmtSigned(linErgebnis.nb)} = {fmt(linErgebnis.na * linErgebnis.x! + linErgebnis.nb)} ✓
                </p>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">a</label>
              <NummerEingabe value={qa} onChange={setQa} placeholder="1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">b</label>
              <NummerEingabe value={qb} onChange={setQb} placeholder="-5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">c</label>
              <NummerEingabe value={qc} onChange={setQc} placeholder="6" />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6 text-center text-lg font-semibold text-gray-800 dark:text-gray-200 tabular-nums">
            {fmt(quadErgebnis.na)}x² {fmtSigned(quadErgebnis.nb)}x {fmtSigned(quadErgebnis.nc)} = 0
          </div>

          {quadErgebnis.fehler ? (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-700 dark:text-red-300 text-sm font-semibold">⚠️ {quadErgebnis.fehler}</p>
            </div>
          ) : quadErgebnis.D < 0 ? (
            <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}>
              <p className="text-white/90 text-sm mb-1">Diskriminante D = {fmt(quadErgebnis.D)}</p>
              <p className="text-3xl font-bold">Keine reelle Lösung</p>
              <p className="text-white/90 text-sm mt-2">Die Parabel schneidet die x-Achse nicht.</p>
            </div>
          ) : (
            <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <p className="text-white/90 text-sm mb-1">
                {quadErgebnis.D === 0 ? 'Eine doppelte Lösung' : 'Zwei Lösungen'}
              </p>
              <p className="text-5xl font-bold">
                {quadErgebnis.D === 0 ? (
                  <>x = {fmt(quadErgebnis.x1!)}</>
                ) : (
                  <>x₁ = {fmt(quadErgebnis.x1!)}<br />x₂ = {fmt(quadErgebnis.x2!)}</>
                )}
              </p>
            </div>
          )}

          {!quadErgebnis.fehler && (
            <>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
                <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Rechenweg (Mitternachtsformel)</h3>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 tabular-nums">
                  <p><strong>1.</strong> ax² + bx + c = 0 mit a = {fmt(quadErgebnis.na)}, b = {fmt(quadErgebnis.nb)}, c = {fmt(quadErgebnis.nc)}</p>
                  <p><strong>2.</strong> Diskriminante: D = b² − 4ac = {fmt(quadErgebnis.nb * quadErgebnis.nb)} − {fmt(4 * quadErgebnis.na * quadErgebnis.nc)} = <strong>{fmt(quadErgebnis.D)}</strong></p>
                  {quadErgebnis.D > 0 && (
                    <>
                      <p><strong>3.</strong> D &gt; 0 → zwei Lösungen</p>
                      <p><strong>4.</strong> x₁,₂ = (−b ± √D) / (2a) = ({fmt(-quadErgebnis.nb)} ± √{fmt(quadErgebnis.D)}) / {fmt(2 * quadErgebnis.na)}</p>
                      <p><strong>5.</strong> <strong>x₁ = {fmt(quadErgebnis.x1!)}</strong>, <strong>x₂ = {fmt(quadErgebnis.x2!)}</strong></p>
                    </>
                  )}
                  {quadErgebnis.D === 0 && (
                    <>
                      <p><strong>3.</strong> D = 0 → eine doppelte Lösung</p>
                      <p><strong>4.</strong> x = −b / (2a) = {fmt(-quadErgebnis.nb)} / {fmt(2 * quadErgebnis.na)}</p>
                      <p><strong>5.</strong> <strong>x = {fmt(quadErgebnis.x1!)}</strong></p>
                    </>
                  )}
                  {quadErgebnis.D < 0 && (
                    <>
                      <p><strong>3.</strong> D &lt; 0 → keine reelle Lösung (die Parabel schneidet die x-Achse nicht)</p>
                    </>
                  )}
                  <p className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <strong>Scheitelpunkt:</strong> S = ({fmt(quadErgebnis.xs)} | {fmt(quadErgebnis.ys)})
                  </p>
                </div>
              </div>

              {/* Parabel-Grafik */}
              {svgParabel && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
                  <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Parabel</h3>
                  <div className="flex justify-center">
                    <svg viewBox={`-20 -10 ${svgParabel.W + 40} ${svgParabel.H + 30}`} className="w-full max-w-md h-auto">
                      {/* Achsen */}
                      <line x1={0} y1={svgParabel.xAxisY} x2={svgParabel.W} y2={svgParabel.xAxisY} stroke="#94a3b8" strokeWidth="1" />
                      {svgParabel.yAxisX >= 0 && svgParabel.yAxisX <= svgParabel.W && (
                        <line x1={svgParabel.yAxisX} y1={0} x2={svgParabel.yAxisX} y2={svgParabel.H} stroke="#94a3b8" strokeWidth="1" />
                      )}
                      {/* Parabel */}
                      <path d={svgParabel.path} fill="none" stroke="#6366f1" strokeWidth="2.5" />
                      {/* Nullstellen */}
                      {svgParabel.x1 !== null && (
                        <g>
                          <circle cx={svgParabel.px(svgParabel.x1)} cy={svgParabel.xAxisY} r="5" fill="#10b981" />
                          <text x={svgParabel.px(svgParabel.x1)} y={svgParabel.xAxisY + 18} textAnchor="middle" fontSize="11" className="fill-gray-700 dark:fill-gray-200">
                            x = {fmt(svgParabel.x1)}
                          </text>
                        </g>
                      )}
                      {svgParabel.x2 !== null && svgParabel.x2 !== svgParabel.x1 && (
                        <g>
                          <circle cx={svgParabel.px(svgParabel.x2)} cy={svgParabel.xAxisY} r="5" fill="#10b981" />
                          <text x={svgParabel.px(svgParabel.x2)} y={svgParabel.xAxisY + 18} textAnchor="middle" fontSize="11" className="fill-gray-700 dark:fill-gray-200">
                            x = {fmt(svgParabel.x2)}
                          </text>
                        </g>
                      )}
                      {/* Scheitelpunkt */}
                      <circle cx={svgParabel.px(svgParabel.xs)} cy={svgParabel.py(svgParabel.ys)} r="5" fill="#dc2626" />
                      <text x={svgParabel.px(svgParabel.xs)} y={svgParabel.py(svgParabel.ys) - 10} textAnchor="middle" fontSize="11" className="fill-red-600 dark:fill-red-400">
                        S ({fmt(svgParabel.xs)} | {fmt(svgParabel.ys)})
                      </text>
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    🟢 Nullstellen · 🔴 Scheitelpunkt
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}

      <CrossLink href="/alltag/prozentrechner" emoji="%" text="Prozentrechner: Prozentwerte und Veränderungen" />
      <CrossLink href="/mathe/pythagoras-rechner" emoji="📐" text="Pythagoras-Rechner: Rechtwinkliges Dreieck" />
      <CrossLink href="/mathe/wissenschaftlicher-taschenrechner" emoji="🔬" text="Wissenschaftlicher Taschenrechner: sin, cos, log, √" />

      <ErgebnisAktionen
        ergebnisText={
          typ === 'linear'
            ? linErgebnis.fehler
              ? `Gleichungslöser: ${linErgebnis.fehler}`
              : `Lineare Gleichung ${fmt(linErgebnis.na)}x ${fmtSigned(linErgebnis.nb)} = ${fmt(linErgebnis.nc)} → x = ${fmt(linErgebnis.x!)}`
            : quadErgebnis.fehler
              ? `Gleichungslöser: ${quadErgebnis.fehler}`
              : quadErgebnis.D < 0
                ? `Quadratische Gleichung ${fmt(quadErgebnis.na)}x² ${fmtSigned(quadErgebnis.nb)}x ${fmtSigned(quadErgebnis.nc)} = 0 hat keine reelle Lösung (D = ${fmt(quadErgebnis.D)})`
                : quadErgebnis.D === 0
                  ? `Quadratische Gleichung: x = ${fmt(quadErgebnis.x1!)} (doppelte Lösung)`
                  : `Quadratische Gleichung: x₁ = ${fmt(quadErgebnis.x1!)}, x₂ = ${fmt(quadErgebnis.x2!)}`
        }
        seitenTitel="Gleichungslöser"
      />

      <AiExplain
        rechnerName="Gleichungslöser"
        eingaben={
          typ === 'linear'
            ? {
                typ: 'Linear (ax + b = c)',
                a: fmt(linErgebnis.na),
                b: fmt(linErgebnis.nb),
                c: fmt(linErgebnis.nc),
              }
            : {
                typ: 'Quadratisch (ax² + bx + c = 0)',
                a: fmt(quadErgebnis.na),
                b: fmt(quadErgebnis.nb),
                c: fmt(quadErgebnis.nc),
              }
        }
        ergebnis={
          typ === 'linear'
            ? linErgebnis.fehler
              ? { fehler: linErgebnis.fehler }
              : { loesung: fmt(linErgebnis.x!) }
            : quadErgebnis.fehler
              ? { fehler: quadErgebnis.fehler }
              : {
                  diskriminante: fmt(quadErgebnis.D),
                  loesung1: quadErgebnis.x1 !== null ? fmt(quadErgebnis.x1) : 'keine',
                  loesung2: quadErgebnis.x2 !== null ? fmt(quadErgebnis.x2) : 'keine',
                  scheitelpunktX: fmt(quadErgebnis.xs),
                  scheitelpunktY: fmt(quadErgebnis.ys),
                }
        }
      />
    </div>
  );
}
